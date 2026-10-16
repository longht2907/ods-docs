# Checklist Nghiệm thu Bài viết API ODS

Mỗi bài viết API Reference hoặc hướng dẫn tích hợp trước khi bàn giao phải được rà soát đối chiếu theo checklist sau:

---

## 1. Căn cứ tài liệu nguồn (Evidence Verification)

- [ ] **Nguồn gốc rõ ràng**: Đã đối chiếu với file tài liệu tương ứng trong `E:\Project\ods-api-source\` (ghi rõ tên file và heading).
- [ ] **Tuyệt đối không bịa thông tin**:
  - Endpoint path và method HTTP chính xác 100% theo nguồn.
  - Tên trường trong bảng tham số và JSON payload giữ đúng chữ hoa/thường (`ServiceName` vs `ServiceCode`, `AuthUser`, `AuthKey`).
  - Response schema mẫu lấy từ nguồn hoặc biên bản đã xác minh; không tự chế trường dữ liệu.
- [ ] **An toàn dữ liệu**: Sử dụng các placeholder tiêu chuẩn (`YOUR_AUTH_KEY`, `YOUR_SERVICE_NAME`, `0900000000`). Tuyệt đối không dùng thông tin khách hàng, số điện thoại hoặc API key thật.
- [ ] **Minh bạch thông tin thiếu**: Nếu nguồn chưa có đầy đủ (ví dụ mã lỗi chi tiết, rate limit, timeout), đánh dấu `**Cần bổ sung:** [Mã câu hỏi]` hoặc báo cáo trạng thái `Partial/Blocked`.

---

## 2. Chuẩn mực bố cục & Giao diện (UI/UX)

- [ ] **Cấu trúc 2 cột (`ApiReferenceLayout`)**:
  - Cột trái (`ApiReferenceMain`): Endpoint badge + Full URL, mô tả mục đích, sơ đồ (nếu có), bảng tham số, giải thích phản hồi.
  - Cột phải (`ApiReferenceCode`): Khối sticky chứa Request tabs và Response JSON mẫu.
- [ ] **Domain chính thức chuẩn hóa**:
  - PBX Endpoint: `https://api.ods.vn`
  - Autocall Endpoint: `https://apiai.cloudfone.vn`
- [ ] **Tabs đa ngôn ngữ**: Có `groupId="api-lang"` và thuộc tính `persist` để đồng bộ cURL, Node.js, Python giữa các trang.
- [ ] **Node.js Server-side**: Ghi chú rõ ràng `// Node.js (Backend / Server-side)` để nhắc nhở lập trình viên không gọi API kèm `AuthKey` trực tiếp từ trình duyệt frontend.

---

## 3. Tiêu chuẩn Sơ đồ (Diagram Standards)

- [ ] **Quyết định đúng đắn**:
  - Trang CRUD / Tra cứu đơn giản: `Diagram: None`.
  - Trang có luồng nghiệp vụ phức tạp: Đã chọn đúng loại (`Sequence / Workflow / Architecture`).
- [ ] **Hiển thị trực quan**:
  - Không tràn ngang trang trên desktop hoặc mobile.
  - Tương phản sắc nét trên cả Light Mode và Dark Mode.
  - Có tóm tắt 2–3 ý cốt lõi bên dưới sơ đồ.

---

## 4. Kiểm tra mã nguồn tự động

- [ ] `npm run check:scope` vượt qua, không có file ngoài phạm vi task.
- [ ] `npm run verify:code` chạy sạch (Typecheck PASS, check:env PASS, check:links PASS, guard PASS).
- [ ] File MDX có đầy đủ frontmatter (`title`, `description`) và không chứa liên kết gãy.
