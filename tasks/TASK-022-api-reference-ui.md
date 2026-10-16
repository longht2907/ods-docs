---
status: in-progress
branch: task/TASK-022-api-reference-ui
commit: "59072a9"
verified-by: npm run verify:task
---

# TASK-022 — API Reference UI & Routes

## Đính chính sau review (TASK-023)

- Snapshot TASK-022 được review là commit `59072a9` (`docs(task-022): finalize API reference UI and documentation`). Commit `67d8e6b` là parent/baseline trước implementation, không phải commit hoàn thiện TASK-022.
- Sticky Request + Response của snapshot `59072a9` **có lỗi**: code aside không stretch theo grid và wrapper dùng biến `--fd-nav-height` không tồn tại, làm computed `top: auto` và `max-height: none`. Phần sửa và regression test thuộc TASK-023.
- Human quyết định giữ nguyên nội dung/schema/Action mapping Autocall hiện tại và hoãn xác minh đến khi có case thực tế. Nội dung này chưa được kiểm thử API thực tế và không được mô tả là schema đã verified.
- Human quyết định tài liệu Webhook chỉ mô tả phạm vi dịch vụ ODS; không yêu cầu backend receiver mẫu hoặc kiến trúc ứng dụng khách hàng. Phần đính chính thuộc TASK-023.
- `GetCallReport` và `GetCallReportDetail` bị loại bỏ theo quyết định Human vì không còn sử dụng. Hai route trả 404 là kết quả mong muốn, không redirect hay tuyên bố hợp nhất vào API khác.
- Auth `/internal` được hoãn; hệ thống tiếp tục fail-closed. TASK-023 không sửa proxy, auth, session hoặc public/internal boundary.
- TASK-022 tiếp tục `in-progress`. Việc sửa review được liên kết qua TASK-023; trạng thái `done` chỉ có thể cập nhật sau PR/CI xanh và Human chốt.

## Bối cảnh

Trong TASK-021, toàn bộ 27 tài liệu API Reference của ODS AI Contact Center đã được xây dựng và chuẩn hóa nội dung dựa trên 5 tài liệu nguồn nghiệp vụ.
Tuy nhiên, cấu trúc giao diện hiện tại vẫn sử dụng layout tài liệu phẳng (Callout hiển thị endpoint thô, request mẫu nằm tuần tự sau bảng tham số, URL chưa được chuẩn hóa theo domain chính thức và trang cũ `khoi-tao-cuoc-goi` chưa có redirect).

Khách hàng và lập trình viên tích hợp (CRM, ERP, Webhook) cần một trải nghiệm tra cứu API Reference chuyên nghiệp, hiện đại theo phong cách Claude Docs (`platform.claude.com/docs`) trên nền Fumadocs:
- Desktop: Bố cục 2 cột cân bằng (cột trái: giải thích, bảng tham số, response; cột phải: request mẫu sticky đa ngôn ngữ cURL / Node.js / Python).
- Mobile / Tablet: Thứ tự đọc hợp lý trong 1 cột duy nhất (Tên/mô tả -> Method + Full URL -> Tham số -> Request mẫu -> Response -> Lưu ý & Lỗi).
- Endpoint Header: Hiển thị Method badge + Full URL monospace + Nút Copy Full URL kèm phản hồi trực quan.
- Domain chính thức: PBX (`https://api.ods.vn`), Autocall (`https://apiai.cloudfone.vn`), Webhook receiver (`https://example.com/webhook/...`).
- Phục hồi khả năng truy cập qua redirect vĩnh viễn cho route cũ `khoi-tao-cuoc-goi`.

## Mục tiêu

1. **Kiến trúc bố cục 2 cột thích ứng (Responsive 2-column Layout)**:
   - Sử dụng CSS Grid cho `ApiReferenceLayout` để hỗ trợ 3 khối:
     - Khối 1 (`ApiReferenceMain`): Endpoint Header, Mô tả, Tham số request.
     - Khối 2 (`ApiReferenceCode`): Request mẫu đa ngôn ngữ với Tabs `groupId="api-lang"` và `persist`.
     - Khối 3 (`ApiReferenceResponse` / `ApiReferenceBottom`): Response mẫu, Bảng mô tả trường, Lưu ý, Lỗi thường gặp, Bài viết liên quan.
   - Desktop rộng (≥ 1280px / xl): Khối 1 & 3 nằm ở cột trái; Khối 2 nằm ở cột phải, sticky dưới navigation (`top-[calc(var(--fd-nav-height)+1.5rem)]`).
   - Mobile/Tablet (< 1280px): Thứ tự DOM hiển thị tự nhiên Khối 1 ➔ Khối 2 ➔ Khối 3, không sticky, không tràn ngang.
2. **Endpoint Header Component (`ApiEndpoint`)**:
   - Hiển thị badge phương thức HTTP (GET xanh lá, POST xanh dương, PUT cam, DELETE đỏ).
   - Monospace text hiển thị full URL chính thức, ngắt dòng an toàn (`break-all`).
   - Nút Copy Full URL với visual feedback ("Đã chép", icon check), accessible label và keyboard focus.
3. **Chuẩn hóa Domain & Request mẫu**:
   - Thay thế toàn bộ `{BASE_URL}` thành `https://api.ods.vn` cho nhóm PBX.
   - Thay thế toàn bộ `{AUTOCALL_BASE_URL}` thành `https://apiai.cloudfone.vn` cho nhóm Autocall/Audio/Contact.
   - Giữ nguyên các tham số payload, cấu trúc nghiệp vụ, và placeholder bảo mật (`YOUR_AUTH_KEY`, `YOUR_AUTH_USER`, v.v.).
4. **Tabs đa ngôn ngữ**:
   - Bổ sung `groupId="api-lang"` và `persist` vào Fumadocs `Tabs` để đồng bộ lựa chọn cURL / Node.js / Python giữa các trang.
5. **Redirect route cũ**:
   - Bổ sung redirect vĩnh viễn (308/301) trong `next.config.mjs`:
     `/docs/ai-contact-center/api/tong-dai/khoi-tao-cuoc-goi` ➔ `/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call`.

## Phạm vi (Scope)

### Tạo mới:
- `src/components/docs/api-endpoint.tsx`
- `src/components/docs/click-to-call-flow.tsx`
- `src/components/docs/click-to-call-v2-flow.tsx`
- `src/components/docs/api-architecture-overview.tsx`
- `.agents/skills/write-ods-api-page/**`

### Sửa đổi:
- `src/components/docs/api-reference-layout.tsx`
- `src/components/mdx.tsx`
- `src/app/global.css`
- `next.config.mjs`
- `content/docs/ai-contact-center/api/**`
- `tasks/TASK-022-api-reference-ui.md`
- `.harness/reports/**`

## Ngoài phạm vi (Out of Scope)

- KHÔNG sửa `src/app/docs/[[...slug]]/page.tsx` hoặc `src/app/docs/layout.tsx`.
- KHÔNG cài đặt thêm dependency mới vào `package.json`.
- KHÔNG sửa hợp đồng API, schema dữ liệu, kiểu dữ liệu, Action codes hay logic nghiệp vụ.
- KHÔNG can thiệp ranh giới bảo mật public/internal hoặc `src/proxy.ts`.
- KHÔNG sửa nội dung ngoài phân hệ API (CloudFile, Portal, internal wiki).
- KHÔNG gọi API thực tế tới ODS hoặc CloudFone.
- KHÔNG push git hoặc mở PR khi chưa có lệnh từ Human.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ nghiêm ngặt [AGENTS.md](../AGENTS.md) và [DECISIONS.md](../DECISIONS.md).
- Giữ vững `output: 'standalone'` và TypeScript strict mode.
- Đảm bảo Markdown Copy Button và `/llms.mdx` tiếp tục hoạt động đầy đủ.
- Toàn bộ checks (`npm run verify:task`) phải PASS.

## Kế hoạch triển khai theo lô

- **Lô 0 — Khảo sát và plan**:
  - Tạo task spec `tasks/TASK-022-api-reference-ui.md`.
  - Khảo sát hiện trạng components, layout, CSS, Tabs và router.
  - Thiết kế giải pháp bố cục 3 khối, CSS grid, breakpoint, sticky và DOM order.
  - Trình duyệt Human và DỪNG.
- **Lô 1 — Ba trang mẫu**:
  - Cập nhật `api-reference-layout.tsx`, tạo `api-endpoint.tsx`, đăng ký trong `mdx.tsx`.
  - Áp dụng trên 3 trang đại diện:
    1. `tong-dai/cuoc-goi/click-to-call.mdx` (PBX)
    2. `autocall/chien-dich/start-campaign.mdx` (Autocall)
    3. `webhook/popup.mdx` (Webhook)
  - Kiểm thử hiển thị tại 390px, 768px, 1280px, 1440px, 1920px (Light/Dark mode).
  - Báo cáo kết quả và DỪNG chờ Human duyệt.
- **Lô 2 — Áp dụng toàn diện**:
  - Áp dụng cấu trúc mới cho tất cả các trang endpoint còn lại của PBX và Autocall.
  - Rà soát các trang overview, xác thực, quy ước chung giữ nguyên layout docs thường.
  - Kiểm tra tính đồng nhất của URL và tab language synchronization.
- **Lô 3 — Redirect & Nghiệm thu**:
  - Bổ sung redirect trong `next.config.mjs`.
  - Kiểm thử route cũ, route mới và các redirect hiện có.
  - Chạy toàn bộ bộ kiểm thử tự động `npm run verify:task`.
  - Lập báo cáo nghiệm thu `.harness/reports/TASK-022-report.md`.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [x] `npm run check:scope` in scope-check PASS.
- [x] `npm run verify:code` PASS (typecheck + env + broken-links + guard).
- [x] `npm run verify:task` PASS (toàn bộ chuỗi kiểm thử và build production).
- [x] Bố cục responsive hiển thị đúng tại 390px, 768px, 1280px, 1440px, 1920px cả Light và Dark mode.
- [x] Thứ tự mobile: Tên/mô tả -> Endpoint -> Tham số -> Request mẫu -> Response -> Lưu ý.
- [ ] Panel code sticky trên desktop không che navigation, code dài cuộn bên trong. **Review phát hiện snapshot TASK-022 lỗi; sửa tại TASK-023.**
- [x] Endpoint Header có badge method, full URL, nút Copy URL hoạt động chính xác kèm visual feedback.
- [x] Tabs ghi nhớ ngôn ngữ được chọn giữa các trang (`groupId="api-lang"`).
- [x] Route cũ `/docs/ai-contact-center/api/tong-dai/khoi-tao-cuoc-goi` redirect 308 tới `/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call`.
- [ ] Không có lỗi console runtime, không tràn ngang trang (`overflow-x` trên body/html). **Cần nghiệm thu lại cùng TASK-023 vì bằng chứng browser cũ không đủ tin cậy.**
