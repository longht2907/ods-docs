---
status: in-progress
branch: task/TASK-023-api-ui-review-fixes
commit: ""
verified-by: npm run verify:task
---

# TASK-023 — Sửa lỗi review API UI, Webhook và metadata

## Bối cảnh

Review snapshot TASK-022 phát hiện sticky Request + Response không hoạt động trên desktop, hướng dẫn Webhook vượt quá phạm vi dịch vụ ODS, một mẫu JavaScript không parse được, metadata social có thể fallback về localhost khi production build, và hồ sơ nghiệm thu chưa phản ánh đúng bằng chứng thực tế. Human đã chốt phạm vi sửa tại TASK-023 và các hạng mục chủ ý hoãn.

## Mục tiêu

1. Sửa đúng hai nguyên nhân của sticky: aside phải chiếm đủ chiều cao grid và wrapper phải có `top`/`max-height` hợp lệ với fallback.
2. Giới hạn tài liệu Webhook ở contract ODS đã được Human xác nhận; không cung cấp backend receiver hoặc áp đặt kiến trúc ứng dụng khách hàng.
3. Giữ loại bỏ `GetCallReport` và `GetCallReportDetail`, xác nhận hai route trả 404 và redirect Click-to-Call cũ vẫn trả 308.
4. Sửa mẫu JavaScript Click-to-Call thành mã backend hợp lệ, kiểm tra đủ hai tầng HTTP/nghiệp vụ và không tự retry.
5. Cấu hình `metadataBase` bằng public origin hợp lệ tại build-time; production không fallback âm thầm về localhost.
6. Đính chính hồ sơ TASK-022 và lập báo cáo TASK-023 dựa trên lệnh/test thực sự đã chạy.
7. Làm sạch Search index và thu gọn Search dialog dựa trên số đo dev/production: không index metadata triển khai của MDX Card, giới hạn kết quả theo bài và giữ nguyên ranh giới public/internal.
8. Mặc định giới hạn Search theo sản phẩm của route hiện tại (`AI Contact Center` hoặc `CloudFile`), đồng thời cho phép người dùng chuyển sang `Tất cả sản phẩm`.

## Phạm vi

### Tạo mới:

- `tasks/TASK-023-api-ui-review-fixes.md`
- `harness/tests/api-ui-regression.test.mjs`
- `harness/tests/search-regression.test.mjs`
- `src/components/search-dialog.tsx`
- `src/lib/search-results.ts`
- `source.config.ts`
- `.harness/reports/TASK-023-report.md`
- `.harness/reports/assets/TASK-023/**`

### Sửa đổi:

- `src/components/docs/api-reference-layout.tsx`
- `src/app/global.css`
- `src/app/layout.tsx`
- `src/app/api/search/route.ts`
- `next.config.mjs`
- `content/docs/ai-contact-center/api/webhook/index.mdx`
- `content/docs/ai-contact-center/api/webhook/popup.mdx`
- `content/docs/ai-contact-center/api/bat-dau/quy-uoc-chung.mdx`
- `harness/tests/routes.test.mjs`
- `package.json`
- `Dockerfile`
- `docker-compose.yml`
- `.github/workflows/ci.yml`
- `DEPLOY_VPS.md`
- `tasks/TASK-022-api-reference-ui.md`
- `.harness/reports/TASK-022-report.md`

## Ngoài phạm vi

- Không sửa nội dung/schema/Action mapping Autocall hoặc tuyên bố chúng đã được kiểm thử API thực tế.
- Không sửa `src/proxy.ts`, auth, session, quyền truy cập hoặc ranh giới public/internal.
- Không phục hồi hay redirect `GetCallReport` và `GetCallReportDetail`; không xóa API report khác.
- Không viết backend receiver Webhook, không áp đặt queue, Redis, database, CRM framework hoặc delivery guarantee chưa xác nhận.
- Không thêm dependency, gọi API ODS, tạo cuộc gọi hoặc gửi Webhook thật.
- Không nâng cấp/thay Search engine, thêm dịch vụ Search trả phí, xóa nội dung tài liệu hoặc dùng CSS để che dữ liệu index sai.
- Không đưa `internalSource` hay nội dung `/internal` vào public Search; không thay proxy/auth để mở internal Search.
- Không đổi DNS, secret hoặc deploy production.
- Không commit, push hoặc merge khi chưa có lệnh Human.

## Ràng buộc kiến trúc & kỹ thuật

- Tuân thủ [AGENTS.md](../AGENTS.md), [DECISIONS.md](../DECISIONS.md) và quyết định Human trong review TASK-022.
- Giữ Request + Response trong cùng một sticky wrapper; mobile một cột và không sticky.
- URL metadata phải là origin HTTP(S) hợp lệ, không chứa credentials/query/hash/path; production build thiếu cấu hình phải fail rõ ràng.
- Biến metadata là build-time vì HTML docs được prerender; URL kiểm thử/CI không được mô tả là URL production.
- `status` giữ `in-progress` cho đến khi Pull Request có CI xanh và Human chốt.
- Search dùng built-in ZBSearch và UI primitives của Fumadocs 16.15.10 đang cài; mọi tùy biến extraction/query phải theo type definitions thực tế của phiên bản này.
- Product scope chỉ áp dụng ở cấp sản phẩm, không tự giới hạn sâu theo API/Portal/chuyên mục; route ngoài hai product dùng `Tất cả sản phẩm`.
- Thay đổi structured data chỉ phục vụ Search, không làm thay đổi processed Markdown dùng cho copy Markdown/LLM output.

## Tiêu chí nghiệm thu

- [x] Sticky có `top` và `max-height` computed hợp lệ; panel giữ vị trí sau scroll và dừng trong container.
- [x] Panel dài cuộn nội bộ xem được Response; mobile 390/768 một cột, không sticky, không tràn ngang.
- [x] Click-to-Call và StartCampaign đạt ở 1280/1440/1920, Light/Dark, không có page error.
- [x] Copy URL và lựa chọn tab persist vẫn hoạt động.
- [x] Webhook mô tả đúng `apikey` tùy chọn trong body, ACK 2xx và giới hạn định danh; không còn receiver code/khuyến nghị dedup tuyệt đối.
- [x] Mẫu JavaScript parse được và không gọi API thật trong test.
- [x] Hai route API đã loại bỏ trả 404; redirect `khoi-tao-cuoc-goi` trả 308 đúng đích.
- [x] Production build kiểm thử tạo `og:image`/`twitter:image` không chứa localhost.
- [x] `/internal` và `/api/search/internal` tiếp tục fail-closed khi không có quyền.
- [x] `npm run check:env`, `npm run check:links`, `npm run guard`, `npm run types:check`, `npm run check:scope`, `npm run build`, `npm run test:routes` và `npm run verify:task` chạy đạt ở local.
- [x] Search index giữ title/description/body hữu ích của Card nhưng không còn component name, `href`, `icon`, JSX expression hoặc metadata triển khai.
- [x] Search dialog hiển thị tối đa 8 bài và tối đa 3 snippet mỗi bài, breadcrumb gọn, snippet không tràn, giữ anchor/keyboard/focus và không để response cũ ghi đè query mới.
- [x] Public Search không trả nội dung/URL internal; anonymous internal Search vẫn bị chặn; từ khóa API và truy vấn tiếng Việt có/không dấu vẫn tìm được.
- [x] Có số đo dev cold-warm, production cold-warm sau sửa, response size/result count trước-sau và regression test Search chạy đạt. Production baseline trước sửa không được đo trước mutation và được ghi rõ trong report, không suy diễn thành số liệu đã quan sát.
- [ ] Search tại route AI Contact Center/CloudFile mặc định chỉ trả đúng sản phẩm; người dùng có thể chọn `Tất cả sản phẩm`, và route `/docs` mặc định là All.

## Quyết định Human được giữ nguyên

- F2: Giữ nguyên Autocall contract hiện tại; hoãn xác minh đến khi có case thực tế và không tuyên bố schema verified.
- F3: Không viết backend receiver mẫu.
- F5: Hai API cũ bị loại bỏ vì không còn sử dụng; 404 là kết quả mong muốn.
- F6: Hoãn auth `/internal`; tiếp tục giữ fail-closed.

## Bước còn chờ sau bàn giao

- Human review diff và bằng chứng kiểm thử.
- Commit hash chỉ cập nhật sau khi Human yêu cầu tạo commit; không ghi hash chưa tồn tại vào chính commit đó.
- Push, Pull Request và CI chỉ thực hiện khi có yêu cầu riêng.
