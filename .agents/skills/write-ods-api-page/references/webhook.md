# Quy chuẩn tài liệu Webhook

Tài liệu hướng dẫn viết trang Webhook (Popup, Call Events) trong ODS AI Contact Center.

---

## 1. Bản chất Webhook trong ODS

Webhook là cơ chế **Tổng đài ODS chủ động gửi HTTP POST** sang hệ thống của khách hàng (CRM, ERP, Backend) khi có sự kiện viễn thông phát sinh:
- **Ai gửi**: Server ODS PBX.
- **Ai nhận**: Endpoint Webhook Receiver do khách hàng tự triển khai.
- **Khi nào gửi**: Khi có cuộc gọi đến, chuông reo máy nhánh, nhấc máy, hoặc gác máy.

---

## 2. Cấu trúc bài viết Webhook chuẩn

1. `<ApiEndpoint method="POST" url="https://your-crm.domain/api/ods-webhook" />`
   *(Lưu ý: URL này là URL do khách hàng tự cấu hình trên trang quản trị tổng đài).*
2. **Mô tả mục đích**: Dùng để làm màn hình popup thông tin khách hàng realtime khi chuông reo và lưu trữ dữ liệu cuộc gọi.
3. **Sơ đồ tuần tự (Sequence Diagram)**:
   - Tổng đài ODS ─── `HTTP POST (Payload sự kiện)` ───> CRM Webhook Receiver
   - CRM Webhook Receiver ─── `HTTP 200 OK` ───> Tổng đài ODS
   - CRM Webhook Receiver ─── `WebSocket / SSE` ───> Màn hình Agent (Bật Popup)
4. **Bảng mô tả các trường Payload**:
   - `CallNumber`: Số người gọi.
   - `ReceiveNumber`: Số người nhận hoặc số máy nhánh.
   - `Direction`: Chiều cuộc gọi (`Inbound`, `Outbound`).
   - `Status`: Trạng thái (`Ringing`, `Up`, `Down`, ...).
   - `Key` / `CallKey`: Mã định danh cuộc gọi.
5. **Các sự kiện vòng đời cuộc gọi (Lifecycle States)**:
   - `Ringing`: Cuộc gọi đang đổ chuông (dùng để bật Popup thông tin khách).
   - `Up`: Đã nhấc máy (bắt đầu đàm thoại).
   - `Down`: Đã kết thúc cuộc gọi (dùng để tắt Popup hoặc lưu log).
6. **Yêu cầu triển khai Receiver phía khách hàng**:
   - Phản hồi ngay `HTTP 200 OK` trong vòng dưới 2 giây để tránh tổng đài timeout.
   - Xử lý tác vụ nặng (ghi log, tra cứu database) bằng Background Job / Queue.
   - Kiểm tra xác thực token bí mật được cấu hình.
7. **Ví dụ Receiver mẫu (Cột phải)**:
   - Node.js (Express/Fastify) hoặc Python (FastAPI/Flask) nhận payload và xác thực.
