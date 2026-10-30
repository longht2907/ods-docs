---
status: done
branch: task/TASK-032-search-performance-isolation
commit: 74db5aa
verified-by: npm run verify:task
---

# TASK-032 — Audit và tối ưu Search public/internal

## Bối cảnh

Search dùng chung UI cho `/docs/**` và `/internal/**`, nhưng hai vùng phải giữ loader,
endpoint và quyền truy cập độc lập. Human ghi nhận Search internal phản hồi chậm trên
localhost; cần tách cold compile, debounce, API/index, network và render trước khi sửa.

## Mục tiêu

- Đo Search trong `next dev` và production standalone bằng cùng query set.
- Sửa contract TASK-027 theo phản hồi Human: scope dịch vụ trong `/internal` phải tiếp tục
  dùng internal index, không chuyển sang tài liệu public `/docs`.
- Sửa bottleneck có bằng chứng, xử lý request cũ và trạng thái loading/error đúng.
- Gắn `Cache-Control: private, no-store, must-revalidate` cho response internal Search.
- Bổ sung regression test và báo cáo số đo trước–sau có thể chạy lại.
- Đồng nhất trải nghiệm đọc kết quả giữa public Docs và Support Wiki: highlight rõ,
  nhận diện keyword trong inline code, hiển thị số bài phù hợp và trợ giúp bàn phím.

## Phạm vi (Scope)

### Tạo mới

- `tasks/TASK-032-search-performance-isolation.md`
- `.harness/reports/TASK-032-report.md`
- `harness/benchmarks/search-performance.mjs`
- `src/lib/search-client.ts`

### Sửa đổi

- `package.json` — thêm lệnh benchmark, không thêm dependency.
- `src/components/search-dialog.tsx` — lifecycle query/scope và cancellation nếu baseline xác nhận.
- `src/app/global.css` — hierarchy, highlight, trạng thái chọn và responsive của Search dialog.
- `src/lib/search-results.ts` — contract response private/no-store và service scope internal.
- `src/app/api/search/internal/route.ts` — header private/no-store và filter theo service tag.
- `harness/tests/search-regression.test.mjs` — boundary, cache header và contract endpoint.
- `harness/tests/api-ui-regression.test.mjs` — race, error/empty, scope transition và request cancellation.

### Xóa

- Không có.

## Ngoài phạm vi (Out of Scope)

- Không sửa nội dung `content/docs/**` hoặc `content/internal/**`.
- Không sửa `src/proxy.ts`, auth, network gate, Caddy, sitemap hoặc LLM output.
- Không thêm database, dependency, external Search service hoặc Postman workspace.
- Không giảm phạm vi index, bỏ body search hoặc giảm giới hạn kết quả để làm đẹp benchmark.
- Không merge PR hoặc deploy production.

## Contract Search

| Context / scope | Endpoint | Nguồn | Tag |
| --- | --- | --- | --- |
| `/docs/**` / Tất cả sản phẩm | `/api/search` | public | không |
| `/docs/**` / AI Contact Center | `/api/search` | public | `ai-contact-center` |
| `/docs/**` / CloudFile | `/api/search` | public | `cloudfile` |
| `/internal/**` / Tất cả tài liệu nội bộ | `/api/search/internal` | internal | không |
| `/internal/ai-contact-center/**` | `/api/search/internal` | internal | `ai-contact-center` |
| `/internal/data-center/**` | `/api/search/internal` | internal | `data-center` |
| `/internal/network/**` | `/api/search/internal` | internal | `network` |
| `/internal/software-license/**` | `/api/search/internal` | internal | `software-license` |

Public UI không được cung cấp scope internal. Production tiếp tục fail-closed cho
`/internal/**` và `/api/search/internal/**`; benchmark không tạo bypass production.

## Tiêu chí nghiệm thu

- [x] Có benchmark cold/warm, median, p95, payload, error rate và UI timing trước–sau.
- [x] Public Search không trả token/URL internal; query param không bypass được gate.
- [x] Internal Search được phép trả `Cache-Control: private, no-store, must-revalidate`.
- [x] Query rỗng không fetch; API error khác no-result; stale response không ghi đè.
- [x] Đổi scope hoặc route hủy/bỏ qua request cũ và không giữ kết quả sai trust zone.
- [x] Keyboard, Enter, Esc, focus và mobile overflow tiếp tục hoạt động.
- [x] `npm run verify:task` PASS với output thật trong báo cáo nghiệm thu.
- [x] `/internal` chỉ hiển thị service scope nội bộ và mặc định theo service của route hiện tại.
- [x] Mọi service scope tại `/internal` gọi `/api/search/internal` với tag tương ứng.
- [x] `/docs` và `/internal` có highlight dễ quét, kể cả keyword trong inline code.
- [x] Search hiển thị số bài phù hợp, keyboard help desktop và không tràn ngang mobile.

## Điều kiện dừng

Dừng và hỏi Human nếu cần đổi `src/proxy.ts`, auth/network gate, loader boundary,
thêm dependency/service, hoặc nới test/security assertion hiện có.

## Báo cáo khi hoàn thành

- Root cause theo file/function và sơ đồ `UI → scope → endpoint → index → response → render`.
- Bảng expected/actual cho từng context/scope và direct API.
- Benchmark trước–sau, lệnh đã chạy, file đã sửa và giới hạn chưa kiểm chứng.
- Hướng dẫn ngắn để Human chạy lại benchmark trên localhost.
