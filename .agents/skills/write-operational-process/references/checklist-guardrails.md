# Bảng Checklist Nghiệm thu Bài Quy trình Vận hành

Dùng để Kỹ sư hoặc Agent tự rà soát toàn diện bài viết quy trình trước khi bàn giao cho Human hoặc mở Pull Request.

---

## 1. Tiêu chuẩn Chọn Mô hình & Bố cục

- [ ] **Chọn đúng mô hình phù hợp với dịch vụ**:
  - **Mô hình A (Thực chiến tinh gọn)** cho dịch vụ Tổng đài, Voice, AI Contact Center, Cloud, SaaS, License: Bỏ qua các mục hành chính rườm rà (Mục đích, Phạm vi, Checklist lặp lại); tích hợp bảng thông số vào ngay Bước 1.
  - **Mô hình B (Tuân thủ đầy đủ 7 phần)** cho Data Center, Colocation, Server, Thiết bị mạng vật lý: Có đủ Mục đích, Điều kiện, Checklist, Biên bản bàn giao, Điểm dừng an toàn.

---

## 2. Tiêu chuẩn Tiêu đề & Formatting MDX

- [ ] **Tiêu đề (`title`) tối ưu cho Menu Sidebar**:
  - Tên ngắn gọn, súc tích, **không lặp lại tên của thư mục cha** (tránh rớt dòng trên Sidebar).
  - Viết trên cùng 1 dòng và bọc trong dấu nháy kép `"` nếu có chứa ký tự ngoặc đơn. Tuyệt đối không ngắt dòng giữa chừng trong YAML frontmatter.
- [ ] **Ký hiệu mũi tên chỉ luồng**:
  - Bắt buộc dùng ký tự mũi tên Unicode **`→`** (hoặc `->`).
  - **Tuyệt đối KHÔNG dùng ký hiệu LaTeX `$\rightarrow$`** (gây lỗi hiển thị raw text xấu).
- [ ] **Code Block Syntax**:
  - Không dùng identifier lạ chưa được Shiki hỗ trợ như ````asterisk` (thay bằng ````ini` hoặc ````bash`).
- [ ] **Liên kết nội bộ hợp lệ**: Tất cả link dẫn dạng `[Tên](/internal/...)` đều trỏ đến bài viết có thật; không có broken link.

---

## 3. Tiêu chuẩn Nghiệp vụ & An toàn (Safety)

- [ ] **Đúng thẩm quyền & Tiền kiểm**:
  - Có bước kiểm tra thông số kỹ thuật (Mã DV, Kịch bản, Đầu số, IP Core...) trước khi thao tác.
  - Yêu cầu xác nhận từ Sales / Kế toán nếu liên quan đến hợp đồng, chi phí hoặc bàn giao thiết bị.
- [ ] **An toàn hệ thống & Thiết bị**:
  - Cấu hình thiết bị tại trường học / công cộng bắt buộc có cảnh báo khóa các phím quay số nhanh (**Dsskey / Memory Key**).
  - Thao tác phần cứng DC bắt buộc kiểm tra trạng thái Shutdown an toàn qua OS.
- [ ] **Điểm dừng an toàn (Troubleshooting / Ngoại lệ)**:
  - Có bảng xử lý các tình huống lỗi phổ biến và chỉ định rõ hướng khắc phục cho Support.

---

## 4. Tiêu chuẩn Lưu đồ quyết định (Flowchart System)

- [ ] **Component chuẩn hóa**: Sử dụng thẻ `<ProcessFlowchart flowId="..." />`.
- [ ] **Chống chồng chéo chữ (Anti-overlap)**:
  - Mọi hộp nhãn đều có lớp nền đục che hoàn toàn đường vẽ bên dưới, chữ không bị đường kẻ cắt ngang.
  - Khoảng cách dọc (`ROW_SPACING = 135px`) và ngang (`COL_SPACING = 320px`) thoáng đãng.
- [ ] **Đường rẽ nhánh & Vòng lặp (Loops)**:
  - Nhánh Đạt/Thành công mang `variant: 'yes'`.
  - Nhánh Lỗi/Thiếu mang `variant: 'no'`.
  - Đường loop sửa lỗi quay về tầng gần nhất liên quan, không chạy ngược xuyên tầng quá dài.
- [ ] **Đã đăng ký vào `flowRegistry`**: Mã `flowId` khai báo trong MDX đã được map đúng với đối tượng dữ liệu trong `src/components/flowchart/index.tsx`.

---

## 5. Chuỗi kiểm thử Kỹ thuật (Harness Commands)

Trước khi xác nhận hoàn thành, bắt buộc chạy và đạt kết quả PASS trên terminal:

```bash
# 1. Kiểm tra TypeScript & Route types
npm run types:check

# 2. Kiểm tra an toàn biến môi trường
npm run check:env

# 3. Kiểm tra liên kết gãy MDX
npm run check:links

# 4. Kiểm tra ranh giới bảo mật, secret & ADR
npm run guard

# 5. Chạy toàn bộ chuỗi kiểm chứng
npm run verify:code
```
Sau đó kiểm tra trực quan giao diện bài viết trên trình duyệt (`http://localhost:3000/internal/...`).
