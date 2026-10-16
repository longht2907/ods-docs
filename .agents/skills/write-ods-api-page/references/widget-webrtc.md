# Quy chuẩn tài liệu SDK / Widget / WebRTC

Tài liệu hướng dẫn viết bài cho nhóm tích hợp thoại thời gian thực qua trình duyệt (WebRTC, JsSIP, Widget ODSPhone).

---

## 1. Nguyên tắc vàng: Tuyệt đối không bịa SDK khi chưa có đặc tả chính thức

1. **Thực tế hiện tại của ODS**:
   - Nhóm ODSPhone Widget: Chưa có bộ SDK phát hành chính thức qua CDN script tag hoặc package npm trên môi trường public.
   - Tài liệu nguồn `PhanHoi_KhachHang_ODSPhone_Widget.md` chỉ ghi nhận phản hồi và yêu cầu tích hợp, chưa có contract API code.
   - Tài liệu `Tích hợp tổng đài ảo Mắt Bão One với CRM.md` chỉ mô tả cấu hình mẫu trên nền tảng mã nguồn mở JsSIP, chưa phải SDK đóng gói riêng của ODS.
2. **Quy tắc ứng xử khi viết bài**:
   - **Cấm tự tạo mã nhúng CDN**: Không viết `<script src="https://cdn.ods.vn/widget.js"></script>` khi chưa có domain CDN thật được xác nhận.
   - **Cấm tự tạo class / methods**: Không tự sáng tác `new ODSPhone({ ... })`, `.makeCall()`, `.hangup()`.
   - **Ghi rõ trạng thái Blocked / Đang phát triển**: Thông báo minh bạch cho lập trình viên biết tính năng SDK Widget đang trong lộ trình hoàn thiện hoặc cần liên hệ đội ngũ ODS để nhận hướng dẫn cấu hình riêng.

---

## 2. Cấu trúc bài viết WebRTC chuẩn (khi dùng JsSIP)

1. **Tổng quan & Trường hợp sử dụng**:
   - Cho phép biến trình duyệt web của Agent thành một Softphone (Webphone) thông qua giao thức SIP over Secure WebSocket (WSS).
2. **Kiến trúc kết nối (Architecture Diagram)**:
   - `Web Browser (JsSIP Client)` ─── `WSS (SIP Signaling)` ───> `ODS SBC / PBX Gateway`
   - `Web Browser` <═══ `SRTP (Audio Media Stream)` ═══> `ODS PBX Gateway`
3. **Điều kiện triển khai**:
   - Trang web CRM bắt buộc phải chạy trên giao thức an toàn `HTTPS`.
   - Quyền truy cập Microphone trên trình duyệt.
   - Thông tin tài khoản SIP máy nhánh (Extension number, Password, WebSocket URL).
4. **Cấu hình mẫu có nguồn kiểm chứng**:
   - Ví dụ cấu hình thư viện chuẩn `jssip` với các tham số placeholders an toàn (`wss://...`, `realm`, `display_name`).
5. **Vòng đời cuộc gọi (Call Lifecycle)**:
   - `connecting` ➔ `connected` ➔ `registered` ➔ `call starting` ➔ `confirmed (đang đàm thoại)` ➔ `ended`.
6. **Troubleshooting thường gặp**:
   - Lỗi Microphone permission denied.
   - Lỗi WSS kết nối thất bại (Firewall chặn port WebSocket hoặc chứng chỉ SSL tự ký).
   - Lỗi ICE Candidate / NAT / Firewall khiến cuộc gọi kết nối nhưng không có tiếng (No Audio).
