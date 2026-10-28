---
status: in-progress
branch: task/TASK-027-search-context-relevance
commit: ""
verified-by: npm run verify:task
---

# TASK-027 — Tách Search theo context và giảm nhiễu kết quả

## Bối cảnh

ODS Docs có hai Search API độc lập: `/api/search` cho tài liệu public và
`/api/search/internal` cho Support Wiki. Tuy nhiên Search dialog dùng chung toàn
site đang khởi tạo `fetchClient` mà không truyền `api`, nên Fumadocs luôn gọi
endpoint mặc định `/api/search`, kể cả khi người dùng đang ở `/internal/**`.

Kết quả public hiện cho phép tối đa 8 page và 3 snippet mỗi page. Các truy vấn
phổ biến như `giám` hoặc `tạo nhóm` vì vậy hiển thị 22–28 dòng, làm người dùng có
cảm giác bị trùng và khó xác định kết quả chính.

## Mục tiêu

- Search tại `/internal/**` mặc định gọi `/api/search/internal`.
- Người dùng internal có thể chủ động chuyển sang tài liệu public; public không
  bao giờ được nhìn thấy hoặc gọi scope internal.
- Giảm kết quả xuống tối đa 6 page và 2 snippet mỗi page.
- Ưu tiên page có title chứa trực tiếp query trước page chỉ khớp body.
- Loại bỏ Markdown emphasis còn sót trong snippet mà không làm mất `<mark>` dùng
  để highlight.
- Giữ nguyên loader, Proxy, auth và ranh giới public/internal của ADR-001.

## Phạm vi (Scope)

### Tạo mới

- `.harness/reports/TASK-027-report.md` — báo cáo nghiệm thu.
- `tasks/TASK-027-search-context-relevance.md` — task spec.

### Sửa đổi

- `src/components/search-dialog.tsx` — chọn endpoint và scope theo pathname.
- `src/lib/search-results.ts` — contract scope, ranking, sanitize và giới hạn kết quả.
- `src/app/api/search/route.ts` — áp dụng pipeline kết quả public.
- `src/app/api/search/internal/route.ts` — áp dụng cùng giới hạn cho internal index.
- `harness/tests/search-regression.test.mjs` — regression tests cho context,
  relevance, snippet và security boundary.
- `package.json` — cho phép test Search import helper TypeScript bằng Node type stripping.

### Xóa

- Không có.

## Ngoài phạm vi (Out of Scope)

- Không hợp nhất `source` và `internalSource`.
- Không đưa kết quả internal vào `/api/search`.
- Không thay đổi Proxy, auth, secret, sitemap hoặc `llms.txt`.
- Không migration URL trong task này; URL public được xử lý bằng task riêng để có
  redirect map và rollback độc lập.
- Không thêm dependency.

## Contract Search sau thay đổi

| Context / scope | Endpoint | Tag |
| --- | --- | --- |
| `/docs/**` / Tất cả sản phẩm | `/api/search` | Không |
| `/docs/ai-contact-center/**` | `/api/search` | `ai-contact-center` |
| `/docs/cloudfile/**` | `/api/search` | `cloudfile` |
| `/internal/**` / Nội bộ | `/api/search/internal` | Không |
| `/internal/**` / Tài liệu public | `/api/search` | Theo lựa chọn public |

## Ràng buộc kiến trúc & kỹ thuật

- Tuân thủ [AGENTS.md](../AGENTS.md), [DECISIONS.md](../DECISIONS.md) và ADR-001.
- Public Search tuyệt đối không import hoặc truy vấn `internalSource`.
- Internal endpoint vẫn do `src/proxy.ts` bảo vệ.
- Dùng đúng API `fetchClient({ api, tag })` của Fumadocs 16.15.10.
- Không dùng `any`, không ép type để lách TypeScript.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [ ] `/docs/**` chỉ cấu hình `/api/search` và không cung cấp scope internal.
- [ ] `/internal/**` mặc định cấu hình `/api/search/internal`.
- [ ] Chuyển scope trong internal sang public cấu hình `/api/search` đúng tag.
- [ ] Public query trả tối đa 6 page, tối đa 2 snippet/page và tối đa 18 items.
- [ ] Query `giám` ưu tiên trang `huong-dan-giam-sat-cuoc-goi` trước trang chỉ khớp body.
- [ ] Kết quả không còn Markdown emphasis `**...**` bị render thô.
- [ ] Public Search không trả URL `/internal/**`.
- [ ] Anonymous `/api/search/internal` vẫn trả 401.
- [ ] `npm run verify:task` chạy thành công.

## Điều kiện dừng (Stop Condition)

Dừng lại và xin ý kiến Human nếu:

1. Cần thay đổi `src/proxy.ts`, auth hoặc nguyên tắc tách hai loader.
2. Cần thêm dependency hoặc service Search bên ngoài.
3. Test hiện hữu mâu thuẫn với ADR-001 hoặc phải nới security assertion để pass.

## Báo cáo khi hoàn thành

- Liệt kê file đã sửa.
- Ghi kết quả thực tế của `verify:task` và runtime Search API.
- Ghi rõ giới hạn chưa xử lý, bao gồm URL migration nếu chưa triển khai.
