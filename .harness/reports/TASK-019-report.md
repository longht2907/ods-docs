# TASK-019 — Báo cáo hoàn thiện Chiến dịch cuộc gọi Portal ODS

## Trạng thái

- Branch: `task/TASK-019-contact-center-autocall-api`
- Task status: `in-progress` (sẵn sàng chuyển `done` sau khi CI GitHub PR hoàn tất)
- Scope tuân thủ nghiêm ngặt theo `tasks/TASK-019-contact-center-autocall-api.md`.
- `npm run verify:code`: **PASS** (`types:check`, `check:env`, `check:links`, `guard`).
- `npm run check:scope`: **PASS**.

## Các nội dung đã hoàn thành

### 1. Phân hệ User Guide Portal (`10-goi-tu-dong/**`)
Đã áp dụng triệt để skill `doc-actuator` theo chuẩn Task Guide Fumadocs / Claude Docs với 100% dữ liệu khảo sát trực tiếp từ Portal thực tế (`app.ods.vn`):

1. **`them-am-thanh.mdx`**:
   - Khảo sát và chụp ảnh chi tiết 2 phương thức: Tải lên tệp ghi âm sẵn có và Chuyển văn bản thành giọng nói (Text to Speech).
   - Hướng dẫn cấu trúc thiết lập âm thanh cá nhân hóa theo Danh xưng và Họ tên.
   - Bảng tham số form, định dạng tệp hỗ trợ, giới hạn ký tự và các nút tiện ích nghe thử/tải về.

2. **`thiet-lap-chien-dich/goi-tu-dong-autocall.mdx`**:
   - Quy trình 5 bước wizard chuẩn: Nguồn khách hàng → Xem trước → Thiết lập chung → Âm thanh → Phím bấm (IVR).
   - Cấu hình khung giờ chạy 08:00 – 17:00 (chống nhà mạng chặn spam), đầu số SIP Trunk, Webhook, Prefix.
   - Cấu hình 5 hành động rẽ nhánh phím bấm (Thông báo, Tổng đài viên, Nhóm tổng đài viên, Nghe lại hướng dẫn, API).

3. **`thiet-lap-chien-dich/goi-tu-dong-zalo-oa.mdx`**:
   - Khảo sát tính năng cuộc gọi thoại OTT qua Zalo Official Account.
   - Khảo sát và ghi nhận tính năng đặc thù: Cơ chế Fallback tự động sang Auto Call khi số thuê bao không sử dụng Zalo.
   - Cấu hình Chọn Zalo Token thay cho SIP Trunk thông thường và đầu số gọi ra dự phòng.

4. **`thiet-lap-chien-dich/auto-dialer.mdx`**:
   - Khảo sát tính năng quay số tự động liên tục cho đội ngũ tư vấn viên/telesales.
   - Làm rõ sự khác biệt kiến trúc: Quy trình 4 bước (bước 4 là gán Nhóm nhân viên tiếp nhận cuộc gọi, không có bước phát âm thanh máy hay phím bấm IVR).
   - Cấu hình chế độ đổ chuông nhóm (toàn bộ/xoay vòng), thời gian chờ và nhạc chờ hàng đợi.

### 2. Thư viện hình ảnh thực tế (`public/media/ai-contact-center/user-guider-portal/`)
Toàn bộ ảnh chụp được ghi lại ở độ phân giải tiêu chuẩn 1440×900, theme sáng, crop vùng tập trung:
- Thư viện âm thanh: `am-thanh_danh-sach.png`, `am-thanh_tao-file.png`.
- Chiến dịch Auto Call: `autocall_tong-quan_chon-dich-vu.png`, `autocall_buoc1_nguon-khach-hang.png`, `autocall_buoc2_xem-truoc.png`, `autocall_buoc3_thiet-lap-chung.png`, `autocall_buoc4_am-thanh.png`, `autocall_buoc5_phim-bam.png`, `autocall_ket-qua_danh-sach-chien-dich.png`.
- Chiến dịch Zalo Call: `zalocall_tong-quan_chon-dich-vu.png`, `zalocall_buoc1_nguon-khach-hang.png`, `zalocall_buoc2_xem-truoc.png`, `zalocall_buoc3_thiet-lap-chung.png`, `zalocall_buoc4_am-thanh.png`, `zalocall_buoc5_phim-bam.png`.
- Chiến dịch Auto Dialer: `autodialer_tong-quan_chon-dich-vu.png`, `autodialer_buoc1_nguon-khach-hang.png`, `autodialer_buoc2_xem-truoc.png`, `autodialer_buoc3_thiet-lap-chung.png`, `autodialer_buoc4_nguon-nhan-vien.png`, `autodialer_ket-qua_danh-sach-chien-dich.png`.

## Kết quả kiểm tra chất lượng

- `npm run types:check`: PASS — không có lỗi TypeScript.
- `npm run check:env`: PASS — cấu hình biến môi trường an toàn.
- `npm run check:links`: PASS — 100% liên kết nội bộ và thẻ Cards hợp lệ.
- `npm run check:scope`: PASS — toàn bộ thay đổi nằm trong phạm vi task.
- `npm run guard`: PASS.
- Dev server runtime (`http://localhost:3001`): Toàn bộ trang render chuẩn, bố cục responsive, hình ảnh và Callout/Tabs/Steps hiển thị sắc nét.
