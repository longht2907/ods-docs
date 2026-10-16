# TASK-023 — Báo cáo sửa review API UI, Webhook và metadata

> **Trạng thái**: `in-progress` — local verification đạt; chưa commit, push, mở PR hoặc có CI.<br />
> **Branch**: `task/TASK-023-api-ui-review-fixes`<br />
> **Base snapshot**: `origin/main` tại `47fb8aa`<br />
> **Commit TASK-023**: chưa có theo yêu cầu Human.

## 1. Kết quả theo finding

| Finding | Kết quả thực hiện |
|---|---|
| F1 — Sticky | Code aside dùng `align-self: stretch`; wrapper Request + Response dùng `position: sticky`, offset thực tế `--fd-docs-row-1` với fallback `0px`, `100vh` trước `100dvh`, `max-height` hợp lệ và `overflow-y: auto`. Mobile không áp dụng sticky. |
| F2 — Autocall | Không có file Autocall nào thay đổi. Nội dung/schema/Action mapping được giữ theo quyết định Human, chưa kiểm thử API thực tế và không tuyên bố verified. |
| F3/F4 — Webhook | Giới hạn về endpoint khách hàng cung cấp, ODS gửi HTTP POST JSON, `apikey` tùy chọn trong body, HTTP 2xx chỉ xác nhận tiếp nhận, năm event và giới hạn `LID`/`Uid`/`Ext`. Đã bỏ receiver architecture/code, Redis/TTL và công thức dedup tuyệt đối. |
| F5 — API cũ | Xác nhận hai file không còn và navigation hiện hành không tham chiếu. Route `GetCallReport` và `GetCallReportDetail` trả 404; không redirect. `GetCampaignReport` giữ nguyên. |
| F6 — Internal auth | Không sửa proxy/auth/session/boundary. Năm route internal/search tiếp tục trả 401 khi không có quyền. |
| F7 — JavaScript | Mẫu backend Node.js hợp lệ: POST JSON, credentials từ env, kiểm tra config, HTTP status và `data.result`, không tự retry. Parser Node đạt; test không gọi API thật. |
| F8 — Metadata | Root `metadataBase` đọc `ODS_DOCS_SITE_URL`, validate absolute origin và cấm loopback ở production. Next config đóng gói giá trị build-time cho cả prerendered HTML và dynamic 404. CI dùng origin test `.invalid`; Docker nhận build arg; deploy guide nêu biến bắt buộc lúc build. |
| F9 — Hồ sơ | TASK-022 dùng đúng snapshot `59072a9`, phân biệt baseline `67d8e6b`, sửa count thành 27 endpoint (9 PBX + 18 Autocall), ghi rõ sticky lỗi và các quyết định Human. |
| Search — chất lượng/hiệu năng | Chứng minh `remarkStructure` mặc định giữ nguyên Card/attributes và API không giới hạn dữ liệu khi client không gửi `limit`. Structured data nay chuyển Card thành title + description + body hữu ích; API giới hạn 8 bài × 3 snippets; dialog dùng primitives Fumadocs, breadcrumb gọn, hai dòng/snippet và chống stale response. Không đổi engine/dependency/auth. |

## 2. Search: nguyên nhân, số đo và kết quả

Phiên bản thực tế là `fumadocs-core`/UI `16.15.10`, built-in engine **ZBSearch**. Tên trang hướng dẫn upstream vẫn chứa `orama`, nhưng implementation local không dùng Orama. Hai nguyên nhân đã được tái hiện:

1. `remarkStructure` mặc định giữ `<Card>` như custom element, gồm `title`, `href`, `icon`, `description`; vì vậy các chuỗi triển khai đi thẳng vào index/snippet.
2. Default fetch client không gửi `limit`. Với cách 16.15.10 hợp nhất query options, `limit: undefined` ghi đè default nội bộ, khiến API trả hàng trăm records và UI render danh sách phẳng rất dài.

Sửa tại đúng layer:

- `source.config.ts` override stringifier theo node `Card`, chỉ xuất title/description literal và body; bỏ component name, `href`, `icon`, JSX expression. Đây là namespace structured data cho Search, không thay processed Markdown dùng bởi copy Markdown/LLM.
- Public route vẫn chỉ dùng `source`, module-level `createFromSource` tiếp tục cache index; server lấy tối đa 32 records rồi nhóm còn tối đa 8 bài và 3 snippets/bài.
- Dialog custom ghép từ Search primitives chính thức, giữ highlight/keyboard/focus/navigation. Khi query đang loading hoặc error, kết quả cũ không hiển thị; hook của Fumadocs bỏ response đã bị supersede. Breadcrumb hiển thị product + section gần nhất, full path giữ trong accessible label/tooltip.

### Số đo API trước/sau

Môi trường: Windows, Node theo repo, Next.js 16.3.4. Baseline dev trước sửa gồm 3 warm requests/query; after dev gồm 3 requests/query (cold index đầu tiên tách riêng). Số dưới đây là median quan sát, không phải p95.

| Query | Trước: items / bytes / dev warm | Sau: items / bytes / dev warm | Production sau: warm |
|---|---:|---:|---:|
| `nhân viên` | 604 / 231,595 / 273.2 ms | 27 / 9,839 / 62.7 ms | 36.8 ms |
| `nhóm nhân viên` | 741 / 275,351 / 234.9 ms | 27 / 10,990 / 81.9 ms | 30.9 ms |
| `máy nhánh` | 547 / 209,275 / 197.2 ms | 26 / 9,238 / 54.1 ms | 31.3 ms |
| `click to call` | 456 / 181,328 / 201.6 ms | 27 / 9,314 / 60.8 ms | 25.6 ms |
| `webhook` | 81 / 26,893 / 50.2 ms | 29 / 8,390 / 84.1 ms | 27.8 ms |
| `cloudfile` | 213 / 69,579 / 92.3 ms | 30 / 7,136 / 44.9 ms | 29.1 ms |
| `nhan vien` | 604 / 223,184 / 203.4 ms | 27 / 9,306 / 56.1 ms | 22.0 ms |
| `may nhanh` | 547 / 201,267 / 192.9 ms | 26 / 8,679 / 50.4 ms | 20.0 ms |

- Dev cold Search sau recompile: 2,605.1 ms; production cold Search đầu tiên sau process start: 2,813.1 ms. Đây là khởi tạo index một lần, không phải chi phí từng request.
- Production warm lấy 3 requests sau cold cho query đầu và các samples tiếp theo; toàn bộ response sau sửa từ 2 B (empty) đến 10,990 B.
- Browser production: warm `máy nhánh` từ input đến render ổn định 300.9 ms trong lần `verify:task` cuối.
- Race test cố ý giữ request `webhook` cũ 700 ms trên cold process rồi gửi `cloudfile`: render ổn định 4,087.6 ms; sau khi request cũ hoàn tất, UI vẫn giữ kết quả query mới.
- Baseline production trước sửa không được thu trước mutation. Không suy diễn số dev thành production; đây là giới hạn bằng chứng còn lại.
- Truy vấn vô nghĩa đơn-token `xqzvplmnjk` trả `[]`. Tìm có dấu/không dấu đã hoạt động tương đương nên không thêm normalization/fuzzy tùy biến.

Card regression xác nhận `Xóa liên hệ — Xóa liên hệ khỏi danh bạ.` vẫn searchable, trong khi query `card`, `href`, `description` không còn trả metadata JSX.

Ảnh Search: [desktop light](assets/TASK-023/search-may-nhanh-desktop-light.png), [desktop dark](assets/TASK-023/search-may-nhanh-desktop-dark.png), [mobile light](assets/TASK-023/search-may-nhanh-mobile-light.png), [mobile dark](assets/TASK-023/search-may-nhanh-mobile-dark.png).

## 3. Bằng chứng sticky và UI

Regression test dùng Chrome DevTools Protocol từ Node standard library, không thêm dependency.

- Trang: Click-to-Call và StartCampaign.
- Desktop: 1280×900, 1440×900, 1920×900; Light và Dark.
- Mobile/Tablet: 390×900, 768×900; Light và Dark; một cột, `position: static`, không overflow ngang.
- Click-to-Call 1440×900: panel `top` từ `265.0px` ở đầu trang xuống `24.0px` tại `scrollY=800`; computed `top=24px`, `max-height=852px`.
- Aside/grid: `2942.6px / 2942.6px`, chứng minh aside stretch theo vùng grid.
- Request + Response cùng wrapper; panel dài cuộn nội bộ; panel không vượt đáy grid.
- Copy URL có feedback; tab Python lưu `api-lang=python` và được khôi phục ở StartCampaign.
- Không có `Runtime.exceptionThrown`/pageerror.
- Chrome có resource warning `/favicon.ico` 404. Đây không phải pageerror và không phát sinh từ thay đổi TASK-023; warning được giữ trong output, không che giấu.

Screenshot: [click-to-call-sticky-1440x900.png](assets/TASK-023/click-to-call-sticky-1440x900.png)

## 4. Metadata build-time

- Biến cấu hình: `ODS_DOCS_SITE_URL`.
- Giá trị dùng cho local verification: `https://ods-docs-test.invalid`.
- Đây là origin kiểm thử dành riêng cho build/test, **không phải URL production** và không được phát hành như production origin.
- HTML Click-to-Call đã kiểm tra:
  - `og:image=https://ods-docs-test.invalid/og/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call/image.png`
  - `twitter:image=https://ods-docs-test.invalid/og/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call/image.png`
- Repo chưa có public origin production đã được xác nhận. Human cần cung cấp giá trị đó trước production build/deploy.

## 5. Lệnh và kết quả thực sự

| Lệnh | Kết quả |
|---|---|
| `npm run check:scope` | PASS — toàn bộ file nằm trong TASK-023 allowlist. |
| Parse JS MDX bằng `node --check -` | PASS. |
| `ODS_DOCS_SITE_URL=https://ods-docs-test.invalid npm run verify:code` | PASS — `types:check`, `check:env`, `check:links`, `guard`. |
| `ODS_DOCS_SITE_URL=https://ods-docs-test.invalid npm run build` | PASS — 422 static pages. |
| `npm run test:routes` | PASS — 16/16 cases. |
| `TASK023_WRITE_SCREENSHOT=1 npm run test:api-ui` | PASS — viewport/theme/sticky/interactions/pageerror. |
| `npm run test:search` | PASS — Card extraction, grouping/limits, anchor, API keywords, tiếng Việt có/không dấu và public/internal boundary. |
| `ODS_DOCS_SITE_URL=https://ods-docs-test.invalid npm run verify:task` | PASS — toàn bộ chuỗi trên chạy lại từ đầu, gồm `test:search`. |

Route evidence quan trọng:

- `/docs/ai-contact-center/api/tong-dai/lich-su-cuoc-goi/get-call-report` → 404.
- `/docs/ai-contact-center/api/tong-dai/lich-su-cuoc-goi/get-call-report-detail` → 404.
- `/docs/ai-contact-center/api/tong-dai/khoi-tao-cuoc-goi` → 308 đến Click-to-Call.
- `/internal`, `/internal/`, `/internal/onboarding`, `/api/search/internal`, `/api/search/internal/` → 401.

## 6. Hạng mục hoãn theo quyết định Human

- Không xác minh API Autocall thật; không thay contract/Action mapping.
- Không viết backend Webhook receiver và không quy định framework/queue/database/CRM architecture.
- Không triển khai auth `/internal`; giữ fail-closed.
- Không xác nhận retry, timeout, exactly-once, ordering tuyệt đối hoặc HMAC cho Webhook.

## 7. Còn chờ sau bàn giao

1. Human cung cấp public origin production đã xác nhận cho `ODS_DOCS_SITE_URL`.
2. Human review diff và bằng chứng local.
3. Chưa có commit TASK-023 nên frontmatter `commit` vẫn để trống đúng quy định.
4. Chưa push, mở Pull Request, chạy CI hoặc merge/deploy. Task giữ `in-progress` cho đến khi PR CI xanh và Human chốt.
