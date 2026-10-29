# Báo cáo nghiệm thu TASK-029

## Trạng thái

- Branch: `task/TASK-029-network-gated-architecture`
- Task status: `in-progress`
- Phạm vi: tài liệu kiến trúc và mẫu trải nghiệm đọc public/internal docs; không thay đổi
  runtime security boundary
- Ngày kiểm chứng local gần nhất: 2026-10-29

Task chưa được đánh dấu `done` vì chưa có Pull Request và CI xanh.

## Thay đổi

### Tạo mới

- `ARCHITECTURE.md`
- `tasks/TASK-029-network-gated-architecture.md`
- `.harness/reports/TASK-029-report.md`
- `.harness/reports/TASK-029-api-audit.md`
- `.harness/reports/TASK-029-internal-reading-audit.md`

### Sửa đổi

- `README.md`
- `DECISIONS.md`
- `AGENTS.md`
- `DEPLOY_VPS.md`
- `src/app/docs/[[...slug]]/page.tsx`
- `src/app/internal/[[...slug]]/page.tsx`
- `src/app/internal/_components/review-question.tsx`
- `src/app/global.css`
- `src/components/mdx.tsx`
- `src/components/docs/api-endpoint.tsx`
- `src/components/docs/start-campaign-flow.tsx`
- `content/docs/ai-contact-center/api/**` — audit 37 bài và sửa presentation có căn cứ
- `content/docs/ai-contact-center/portal/**` — rollout `ExpectedResult` cho 17 guide
- `content/docs/cloudfile/**` — rollout `ExpectedResult` cho 18 guide
- `content/internal/ai-contact-center/runbooks/calls/**` — presentation cho 36 câu
  hỏi chờ xác nhận trong 4 runbook, không đổi nội dung kỹ thuật

Phần UI chỉ thay đổi presentation: TOC, typography, table overflow, image caption,
Expected Result và touch target. Endpoint, auth, parameters, payload, response,
error code và thứ tự thao tác kỹ thuật không thay đổi.

`next-env.d.ts` không có task diff và không được đưa vào tài liệu/task scope.

## Kết quả kiểm chứng

Kết quả dưới đây là lần kiểm chứng kiến trúc trước khi mở rộng phạm vi UI. Phải chạy
lại toàn bộ chuỗi và cập nhật bảng này trước khi bàn giao TASK-029.

| Lệnh | Kết quả |
| --- | --- |
| `npm run check:links` | PASS — toàn bộ link nội bộ MDX hợp lệ |
| `npm run guard` | PASS — `Guard PASS.` |
| `npm run check:scope` | PASS — toàn bộ file task nằm trong allowlist |
| `$env:ODS_DOCS_SITE_URL='https://ods-docs.example.invalid'; npm run verify:task` | PASS |

`https://ods-docs.example.invalid` là reserved test-only origin dùng cho local
production build; không phải production URL và không được deploy.

Kết quả chi tiết từ `verify:task`:

- Next.js 16.4.3 production build: PASS, 452 static pages generated.
- Route tests: PASS 21/21.
- `/internal`, `/internal/`, `/internal/onboarding`: `401` như kỳ vọng.
- `/api/search/internal` và trailing-slash variant: `401` như kỳ vọng.
- API UI regression: PASS cho desktop/mobile và Light/Dark.
- Search regression: PASS, giữ public/internal boundary.
- Internal content: PASS, 21 flows và 76 valid step links; internal vẫn `401`.
- Flowchart regression: PASS 12 route/viewport/theme cases và 21 process pages.

## Các lần chạy không thành công trước kết quả cuối

1. `npm run verify:task` không có `ODS_DOCS_SITE_URL` dừng tại build theo đúng
   fail-closed validation của metadata.
2. Lần chạy với test-only origin đi đến bước cuối nhưng `test:flowchart` không thể
   mở thêm `next dev` vì workspace đã có dev server tại port 3000.
3. Sau khi xác minh đúng process của repo, dev server được tạm dừng; toàn bộ
   `verify:task` chạy lại PASS. Dev server sau đó được khởi động lại hidden với
   `ODS_INTERNAL_DEV_OPEN=true`; `http://127.0.0.1:3000/internal` trả `200`.

Không sửa test, không nới threshold và không thêm exception để đạt PASS.

## Giới hạn còn lại

- GitHub repository visibility chưa được xác minh hoặc thay đổi trong task này.
- Caddy office WAN/VPN allowlist chưa được triển khai.
- Next.js chưa có trusted gateway assertion.
- `private-media/internal/**` và `/api/media/internal/**` chưa tồn tại.
- Không có production deploy, Pull Request hoặc CI evidence trong báo cáo local này.

## Mở rộng phạm vi: trải nghiệm đọc public docs

Human đã duyệt tiếp tục dùng TASK-029/worktree hiện tại để triển khai mẫu cho ba bài:

- Portal: `quan-ly-tin-nhan-cuoc-goi.mdx`
- API Reference: `start-campaign.mdx` thông qua shared API/docs components
- CloudFile: `tai-len-va-quan-ly-tep-tin.mdx`

Thay đổi đã thực hiện:

- TOC của guide chỉ giữ heading cấp section; heading trong Steps vẫn giữ nguyên ID và anchor.
- Bảng 3–4 cột có minimum readable width trên mobile và cuộn trong wrapper riêng.
- Ảnh MDX có caption lấy từ alt text hiện có; ImageZoom vẫn dùng Fumadocs.
- `Kết quả:` trong hai guide mẫu được chuyển thành `ExpectedResult` nhẹ, không dùng card.
- Copy endpoint tăng touch target lên 40px trên mobile và 36px từ breakpoint `sm`.
- Callout bỏ vạch màu 3.5px; icon tiếp tục truyền đạt loại info/warning.
- `Q-UPLOAD-01` được giữ nguyên vì cần Human xác nhận nội dung kỹ thuật.

Không thay đổi endpoint, auth, parameter, payload, response, mã lỗi, route, redirect,
search scope, public/internal boundary, dependency hoặc production config.

### Kiểm tra render production

- Portal TOC: 6 section, không còn Step trong `#nd-toc`.
- CloudFile TOC: 7 section, không còn Step trong `#nd-toc`.
- Deep link `#kiểm-tra-kết-quả`: PASS, target top 112px.
- Image zoom: button keyboard-focusable; mở bằng click và đóng bằng `Escape`: PASS.
- Portal: 4 ảnh/4 caption và 6 Expected Result.
- CloudFile: 2 ảnh/2 caption và 10 Expected Result.
- Mobile table: wrapper 343px; bảng 3 cột 608px, bảng 4 cột 736px; page overflow: false.
- Caption/Expected Result contrast: 6.73:1 Light và 7.53:1 Dark.
- Portal/CloudFile: 1440px và 390px, Light/Dark không tràn viewport.
- API: regression suite kiểm tra 1280/1440/1920 và 390/768, Light/Dark.

### Screenshot trước/sau

| Bài | Trước | Sau |
| --- | --- | --- |
| Portal desktop | `.harness/reports/assets/TASK-029/docs-reading-before/portal-1440-light.png` | `.harness/reports/assets/TASK-029/docs-reading-after/portal-1440-light.png` |
| API mobile | `.harness/reports/assets/TASK-029/docs-reading-before/api-390-light.png` | `.harness/reports/assets/TASK-029/docs-reading-after/api-390-light.png` |
| CloudFile mobile | `.harness/reports/assets/TASK-029/docs-reading-before/cloudfile-390-light.png` | `.harness/reports/assets/TASK-029/docs-reading-after/cloudfile-390-light.png` |

### Kết quả kiểm thử sau thay đổi UI

| Lệnh/kiểm tra | Kết quả |
| --- | --- |
| Impeccable detector | PASS — `[]` |
| `npm run types:check` | PASS |
| `npm run check:env` | PASS |
| `npm run check:links` | PASS |
| `npm run guard` | PASS |
| `npm run build` với test-only origin | PASS — 452 static pages |
| `npm run test:routes` | PASS — 21/21; internal/search internal vẫn `401` |
| `npm run test:api-ui` | PASS khi chạy lại — copy, tabs, sticky panel, mobile và Light/Dark |
| `npm run test:search` | PASS |
| `npm run test:internal-content` | PASS — 21 flows, 76 links |
| `npm run test:flowchart` | PASS — 12 route/viewport/theme cases |
| `npm run check:scope` | FAIL — file có sẵn ngoài scope: `.codex/hooks.json` |
| `$env:ODS_DOCS_SITE_URL='https://ods-docs.example.invalid'; npm run verify:task` | FAIL tại `check:scope` vì `.codex/hooks.json`; `verify:code` trước đó PASS |

Lần chạy `test:api-ui` đầu tiên sau thay đổi trả `Uncaught`; chạy lại nguyên trạng PASS.
Không sửa test, threshold hoặc implementation để che lần FAIL này.

Do `.codex/hooks.json` là thay đổi có sẵn ngoài phạm vi và không thuộc phần triển khai
này, file không bị xóa, sửa hoặc thêm vào allowlist. Vì vậy `verify:task` chưa thể PASS
trọn chuỗi dù các code/build/runtime regression checks còn lại đều đã PASS.

## Rollout dần cho các guide còn lại

Sau khi Human duyệt áp dụng pattern đã kiểm chứng, phần trình bày `Kết quả` được rollout
theo hai batch, không thay nội dung kỹ thuật:

- Portal: chuyển thêm 63 dòng trong 16 guide; toàn vùng hiện có 69 `ExpectedResult`
  trong 17 guide, tính cả bài mẫu.
- CloudFile: chuyển thêm 133 dòng trong 17 guide; toàn vùng hiện có 143
  `ExpectedResult` trong 18 guide, tính cả bài mẫu.
- Tổng cộng: 212 dòng trong 35 guide. Diff-level audit xác nhận đúng 212 dòng cũ bị
  thay và 212 dòng wrapper mới được thêm; không có dòng thêm/xóa ngoài pattern.
- Không còn cú pháp `*Kết quả:` trong hai vùng nội dung mục tiêu.

Kiểm tra ngay sau từng batch:

| Batch | `check:links` | `guard` | `types:check` |
| --- | --- | --- | --- |
| Portal | PASS | PASS | Chạy sau khi hoàn tất cả hai batch |
| CloudFile | PASS | PASS | PASS |

### Spot-check sau rollout

Hai guide chưa thuộc bộ mẫu ban đầu được kiểm tra bằng Chrome headless trên dev server:

- Portal `autocall/tong-quan`: 4/4 `ExpectedResult` hiển thị ở 1440px và 390px,
  Light/Dark; không tràn viewport và không có page error.
- CloudFile `01-tong-quan/truy-cap-he-thong`: 4/4 `ExpectedResult` hiển thị ở
  1440px và 390px, Light/Dark; không tràn viewport và không có page error.
- Visual review xác nhận product accent tiếp tục phân biệt Portal (cam) và CloudFile
  (cyan), nội dung trong Steps giữ nhịp đọc và không biến thành card.

Screenshot rollout:

- `.harness/reports/assets/TASK-029/docs-reading-rollout/portal-autocall-overview-390-light-result.png`
- `.harness/reports/assets/TASK-029/docs-reading-rollout/cloudfile-access-390-light-result.png`
- Cùng thư mục còn có ảnh đầu bài ở 1440px và 390px cho cả hai guide.

Production build sau rollout: PASS — Next.js 16.4.3 compile thành công và generate
452/452 static pages.

Regression sau rollout:

- `npm run test:routes`: PASS 21/21; `/internal/**` và internal search tiếp tục `401`.
- `npm run test:search`: PASS; extraction, anchors, Vietnamese/API keywords và
  public/internal boundary không thay đổi.
- `npm run check:env`: PASS.
- `npm run verify:task`: FAIL tại `check:scope` vì `.codex/hooks.json` có sẵn ngoài
  task; chuỗi `verify:code` chạy trước đó PASS đầy đủ.

## Mở rộng phạm vi: toàn bộ AI Contact Center API

Human yêu cầu xử lý từng bài trong `content/docs/ai-contact-center/api/**`. Kết quả
chi tiết nằm tại `.harness/reports/TASK-029-api-audit.md`.

- Audit 37/37 bài: 27 HTTP endpoint, 6 overview/auth/convention, 1 Webhook contract
  và 3 WebRTC/Widget.
- 37/37 đạt rule cấu trúc tương ứng với article type; overview/Webhook/WebRTC không
  bị ép dùng endpoint template.
- `CreateTTSAudio`: chuẩn hóa persisted tabs thành `cURL / Node.js / Python`; giữ
  nguyên hai payload TTS và Base64 trong tab cURL.
- `StartCampaign`: thêm workflow responsive bốn bước từ contract hiện có.
- `Click-to-Call`: chuẩn hóa heading `Response mẫu`; response JSON không đổi.
- Không gọi API ODS thật và không tự điền Autocall schema, Action mapping, Webhook
  timeout/retry/IP hoặc WebRTC WSS/realm/codec còn thiếu bằng chứng.

### Kiểm tra API sau rollout

| Kiểm tra | Kết quả |
| --- | --- |
| Structural audit 37 MDX | PASS — 37/37 |
| Browser audit 1440/390, Light/Dark | PASS — 148/148 cases, không page overflow/page error |
| Endpoint UI | PASS — 27/27 có grid, copy endpoint và sticky/static đúng breakpoint |
| `CreateTTSAudio` tab persistence | PASS — `cURL / Node.js / Python`; `Node.js` giữ khi chuyển endpoint |
| Impeccable detector | PASS — exit code 0 |
| Production build | PASS — 452/452 static pages |
| `npm run test:api-ui` lần đầu | FAIL — transient `Uncaught`, không có assertion/stack cụ thể |
| `npm run test:api-ui` chạy lại nguyên trạng | PASS — desktop/mobile, Light/Dark, copy/tabs/sticky/panel |
| `npm run test:routes` | PASS — 21/21, internal routes/search vẫn `401` |
| `npm run test:search` | PASS |

Screenshot evidence nằm trong
`.harness/reports/assets/TASK-029/api-reading/`, gồm `StartCampaign`,
`CreateTTSAudio`, Webhook Popup và WebRTC ở mobile Dark.

## Mở rộng phạm vi: trải nghiệm đọc Support Wiki internal

Audit chi tiết nằm tại `.harness/reports/TASK-029-internal-reading-audit.md`.

- Audit 70/70 MDX internal; chọn ba bài đại diện cho runbook dàn ý, Network runbook
  có table/flowchart và Data Center process có checklist/flowchart.
- TOC internal chỉ hiển thị `h2`, giảm lặp từng bước nhưng giữ nguyên mọi heading ID
  và deep link `h3`.
- 36 câu hỏi biên tập trong 4 runbook cuộc gọi được render bằng marker “Chờ xác nhận
  nội dung”; ID và câu chữ không đổi.
- Không thêm animation, dependency, client runtime hoặc thay đổi quy trình kỹ thuật.
- 12 runbook trước đây `Đang soạn` đã được mở rộng thành bản nháp L1 theo yêu cầu
  Human; công cụ, quyền thao tác, SLA và escalation vẫn chờ Human hiệu chỉnh.
- Internal không có image MDX, nên image zoom/caption được ghi `NOT APPLICABLE`.

### Kiểm tra internal reading

| Kiểm tra | Kết quả |
| --- | --- |
| Browser 3 bài × 3 viewport × 2 theme | PASS — 18/18, không viewport overflow |
| TOC và deep link | PASS — TOC `h2`-only, anchor `h3` giữ nguyên |
| Table/flowchart/keyboard | PASS — scroll containment, dialog và focus |
| Hydration/page error | PASS sau khi sửa nested paragraph trong review marker |
| Impeccable detector | PASS — exit code 0 |
| `npm run test:internal-content` | PASS — 21 flows, 76 step links; internal vẫn 401 |
| `npm run test:routes` | PASS — 21/21; internal/search internal vẫn 401 |
| `npm run test:flowchart` lần đầu | FAIL — dev audit server còn giữ Next dev lock |
| `npm run test:flowchart` chạy lại cô lập | PASS — 12 UI cases, 21 process pages |
| Production build sau internal changes | PASS — 452/452 static pages |
| `npm run check:scope` | FAIL — chỉ `.codex/hooks.json` có sẵn ngoài task scope |
| `npm run verify:task` | FAIL tại `check:scope`; `verify:code` PASS |

## Mở rộng phạm vi: 12 runbook Support L1

Chi tiết nằm tại `.harness/reports/TASK-029-runbook-drafts.md`.

- Soạn 12/12 runbook cho máy nhánh/IP Phone/Softphone/ODS Phone, Trunk/đầu số,
  Portal, ghi âm, Auto Call và API/Webhook.
- Mỗi bài có 9 phần dùng chung để L1 tra nhanh nhưng nội dung kiểm tra/xử lý riêng
  theo case; không ép thành flowchart triển khai.
- Mọi bài gắn marker `Bản nháp L1 — chờ xác nhận`; không tự biến đề xuất thành quy
  định ODS.
- Không thêm password, token, IP khách hàng hay dữ liệu nhận diện thật; API mutation,
  Webhook replay và campaign restart đều có guardrail chống thao tác trùng.
- Structural audit PASS 12/12; `types:check`, `check:links`, `guard` và production
  build 452/452 trang đều PASS.
- `npm run test:routes` PASS 21/21 và `npm run test:internal-content` PASS; anonymous
  `/internal/**` cùng internal search tiếp tục bị chặn `401`.
- `npm run verify:task` chạy ngày 2026-10-29: `verify:code` PASS, sau đó dừng tại
  `check:scope` vì `.codex/hooks.json` có sẵn ngoài phạm vi. Không sửa hoặc thêm ngoại lệ
  cho file này; task vẫn `in-progress`.
- Vòng hoàn thiện tiếp theo đã bổ sung bảng `Phân nhánh nhanh` cho 12/12 runbook:
  dấu hiệu → nhận định ban đầu → hành động tiếp theo. Frontmatter đổi từ mô tả
  `Khung L1` thành `Runbook L1`; marker chờ Human xác nhận vẫn được giữ nguyên.
- Kiểm chứng lại sau thay đổi: structural/placeholder audit PASS, `npm run verify:code`
  PASS, production build PASS 452/452, `test:routes` PASS 21/21 và
  `test:internal-content` PASS.
