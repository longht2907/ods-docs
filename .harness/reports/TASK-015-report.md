# TASK-015 — Báo cáo Inventory & Kế hoạch nội dung

## Trạng thái

- **Branch**: `task/TASK-015-docs-content`
- **Task status**: `in-progress`
- **Mục tiêu bước**: Hoàn thành quét Inventory toàn bộ kho tài liệu MDX, phân loại trạng thái bài viết theo tiêu chuẩn `doc-actuator` và thiết lập hàng đợi viết bài.
- **Ràng buộc**: Tuyệt đối **KHÔNG** sửa đổi nội dung các bài viết MDX trong bước này.

---

## 1. Inventory

### Thống kê tổng quan

Tổng số file MDX quét được: **55 file** (gồm `content/docs/ai-contact-center/user-guider-portal/**` và `content/docs/cloudfile/**`).

- **Đạt chuẩn (24 file)**: Đã áp dụng quy chuẩn `doc-actuator`, có cấu trúc tuần tự (`<Steps>/<Step>` hoặc `<Cards>/<Card>`), minh họa bằng media Portal thật, đối chiếu quyền và tham số rõ ràng (chủ yếu từ các phân hệ hoàn thiện trong TASK-013).
- **Nháp (9 file)**: Có khung nội dung cơ bản nhưng còn dùng định dạng cũ (heading `I/`, `II/`, `Bước 1`), dùng ảnh hash cũ chưa crop chuẩn, thiếu checkpoint, troubleshooting hoặc chưa có cấu trúc `<Steps>`.
- **Placeholder (21 file)**: File mới chỉ có tiêu đề và vài dòng mô tả sơ sài hoặc Callout thông báo đang phát triển, thiếu toàn bộ quy trình và ảnh UI thật.
- **Cần xác minh (1 file)**: Bài chứa nội dung bảng giá/gói cước cũ bằng hình ảnh chụp (`bang-tinh-nang-tong-dai-ao.mdx`), cần đối chiếu với chính sách thương mại hiện hành.

### Bảng chi tiết toàn bộ kho tài liệu

| File | Vị trí Portal | Loại bài | Trạng thái (placeholder / nháp / đạt chuẩn / cần xác minh) | Thiếu gì | Claim Inferred cần xác minh |
| --- | --- | --- | --- | --- | --- |
| `content/docs/ai-contact-center/user-guider-portal/01-tong-quan/bang-tinh-nang-tong-dai-ao.mdx` | Tổng quan > Bảng tính năng | Reference | **cần xác minh** | Bảng đối chiếu tính năng dạng text/table thay cho ảnh chụp bảng giá cũ; cập nhật theo chính sách thương mại hiện hành | Các giới hạn tính năng theo gói cước (Basic/Pro/Enterprise) có thể đã thay đổi so với ảnh chụp |
| `content/docs/ai-contact-center/user-guider-portal/01-tong-quan/quickstart/huong-dan-dang-nhap.mdx` | Tổng quan > Quickstart > Đăng nhập | Task guide | **đạt chuẩn** | Bổ sung hướng dẫn quên mật khẩu / reset mật khẩu nếu UI có hỗ trợ | Không có (đã đối chiếu UI đăng nhập thực tế) |
| `content/docs/ai-contact-center/user-guider-portal/01-tong-quan/quickstart/index.mdx` | Tổng quan > Quickstart | Concept / Overview | **đạt chuẩn** | Không thiếu (đã có lộ trình thiết lập các bước ban đầu) | Không có |
| `content/docs/ai-contact-center/user-guider-portal/01-tong-quan/quickstart/nhung-viec-can-lam-khi-bat-dau.mdx` | Tổng quan > Quickstart > Checklist ban đầu | Task guide | **đạt chuẩn** | Ảnh chụp màn hình tổng thể cho từng bước setup nhanh | Thứ tự ưu tiên triển khai các module trong tổng đài |
| `content/docs/ai-contact-center/user-guider-portal/02-quan-ly-dich-vu/danh-sach-dich-vu.mdx` | Quản lý dịch vụ > Danh sách dịch vụ | Placeholder | **placeholder** | Toàn bộ nội dung thao tác form, quy trình tra cứu đơn hàng/hóa đơn, xuất file đối soát cước và ảnh chụp UI thực tế | Quy trình thanh toán, gia hạn dịch vụ và phân quyền xem hóa đơn |
| `content/docs/ai-contact-center/user-guider-portal/02-quan-ly-dich-vu/don-hang.mdx` | Quản lý dịch vụ > Đơn hàng | Placeholder | **placeholder** | Toàn bộ nội dung thao tác form, quy trình tra cứu đơn hàng/hóa đơn, xuất file đối soát cước và ảnh chụp UI thực tế | Quy trình thanh toán, gia hạn dịch vụ và phân quyền xem hóa đơn |
| `content/docs/ai-contact-center/user-guider-portal/02-quan-ly-dich-vu/hoa-don.mdx` | Quản lý dịch vụ > Hóa đơn | Placeholder | **placeholder** | Toàn bộ nội dung thao tác form, quy trình tra cứu đơn hàng/hóa đơn, xuất file đối soát cước và ảnh chụp UI thực tế | Quy trình thanh toán, gia hạn dịch vụ và phân quyền xem hóa đơn |
| `content/docs/ai-contact-center/user-guider-portal/03-quan-ly-nguoi-dung/tao-tai-khoan-nguoi-dung.mdx` | Quản lý người dùng > Tài khoản | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, ma trận quyền và media) | Hành vi giới hạn số lượng user theo từng gói cước |
| `content/docs/ai-contact-center/user-guider-portal/03-quan-ly-nguoi-dung/thiet-lap-phan-quyen.mdx` | Quản lý người dùng > Phân quyền | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, ma trận quyền và media) | Hành vi giới hạn số lượng user theo từng gói cước |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/cau-hinh-luat-khach.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/cau-hinh-nhom-nhan-vien.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/chuyen-cuoc-goi.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/dieu-huong-cuoc-goi-theo-thoi-gian.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/dinh-tuyen-cuoc-goi-ma-pin.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/index.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Concept / Overview | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/loi-chao-thong-bao-hop-thu-thoai.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/phan-tich-cuoc-goi.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/quan-ly-cuoc.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/tao-cau-hinh-may-nhanh.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/webhook-va-popup.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/lich-su-cuoc-goi.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/thong-ke-bao-cao-cuoc-goi.mdx` | Cài đặt tổng đài / Báo cáo cuộc gọi | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component và media) | Cơ chế webhook retry và timeout định tuyến nâng cao |
| `content/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/cai-dat/danh-sach-to-chuc.mdx` | Quản lý khách hàng (Mini CRM) | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component Flow và media) | Giới hạn dung lượng import Excel và số bản ghi tối đa |
| `content/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/cai-dat/nhan-khach-hang.mdx` | Quản lý khách hàng (Mini CRM) | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component Flow và media) | Giới hạn dung lượng import Excel và số bản ghi tối đa |
| `content/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/nhap-du-lieu-khach-hang.mdx` | Quản lý khách hàng (Mini CRM) | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component Flow và media) | Giới hạn dung lượng import Excel và số bản ghi tối đa |
| `content/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/tong-quan-chuc-nang.mdx` | Quản lý khách hàng (Mini CRM) | Concept / Overview | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component Flow và media) | Giới hạn dung lượng import Excel và số bản ghi tối đa |
| `content/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/xem-va-chinh-sua-thong-tin.mdx` | Quản lý khách hàng (Mini CRM) | Task guide | **đạt chuẩn** | Không thiếu (đã hoàn thiện tại TASK-013 với Steps, component Flow và media) | Giới hạn dung lượng import Excel và số bản ghi tối đa |
| `content/docs/ai-contact-center/user-guider-portal/06-quan-ly-cuoc-goi/huong-dan-giam-sat-cuoc-goi.mdx` | Giám sát cuộc gọi > Live Calls | Multi-scenario guide | **nháp** | Cấu trúc <Steps>/<Step>, phân chia rõ kịch bản giám sát (Nghe lén, Rước cuộc gọi, Đàm thoại ba bên), chuẩn hóa 10 ảnh hash cũ sang media nét có ngữ cảnh | Cú pháp phím tắt DTMF điều khiển nghe xen/nghe lén (*, #), điều kiện phân quyền Supervisor |
| `content/docs/ai-contact-center/user-guider-portal/07-quan-ly-hoi-thoai/hop-nhat-thong-tin-khach-hang.mdx` | Quản lý hội thoại > Hợp nhất khách hàng | Task guide | **nháp** | Cấu trúc <Steps>/<Step>, ảnh chụp Portal mới, quy trình hợp nhất contact giữa tin nhắn và cuộc gọi, checkpoint và rollback | Cơ chế merge tự động theo số điện thoại / social ID và phân bổ tin nhắn cho Agent |
| `content/docs/ai-contact-center/user-guider-portal/07-quan-ly-hoi-thoai/quan-ly-tin-nhan-cuoc-goi.mdx` | Quản lý hội thoại > Hộp thư hội thoại | Task guide | **nháp** | Cấu trúc <Steps>/<Step>, ảnh chụp Portal mới, quy trình hợp nhất contact giữa tin nhắn và cuộc gọi, checkpoint và rollback | Cơ chế merge tự động theo số điện thoại / social ID và phân bổ tin nhắn cho Agent |
| `content/docs/ai-contact-center/user-guider-portal/08-tich-hop-da-kenh/index.mdx` | Tích hợp đa kênh > Tổng quan | Concept / Overview | **placeholder** | Cards điều hướng, bản đồ tính năng các kênh kết nối (Facebook, Zalo OA) | Danh mục các kênh mạng xã hội chính thức được hỗ trợ |
| `content/docs/ai-contact-center/user-guider-portal/08-tich-hop-da-kenh/tich-hop-facebook-messenger.mdx` | Tích hợp đa kênh > Facebook Messenger | Task guide | **nháp** | Cấu trúc <Steps>/<Step>, cập nhật luồng cấp quyền kết nối mới nhất, hướng dẫn cấu hình Webhook/Token, checkpoint kiểm thử tin nhắn | Chính sách duyệt app Facebook, loại tài khoản Zalo OA bắt buộc (xác thực doanh nghiệp), chi phí ZNS |
| `content/docs/ai-contact-center/user-guider-portal/08-tich-hop-da-kenh/tich-hop-zalo-oa.mdx` | Tích hợp đa kênh > Zalo OA | Task guide | **nháp** | Cấu trúc <Steps>/<Step>, cập nhật luồng cấp quyền kết nối mới nhất, hướng dẫn cấu hình Webhook/Token, checkpoint kiểm thử tin nhắn | Chính sách duyệt app Facebook, loại tài khoản Zalo OA bắt buộc (xác thực doanh nghiệp), chi phí ZNS |
| `content/docs/ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/index.mdx` | Thiết lập máy nhánh > Tổng quan | Concept / Overview | **placeholder** | Bản đồ lựa chọn thiết bị (IP Phone vs Softphone PC vs Mobile App), Cards điều hướng | Khuyến nghị lựa chọn thiết bị theo mô hình doanh nghiệp và yêu cầu băng thông mạng |
| `content/docs/ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/ip-phone/cau-hinh-yealink-t19x-t30x.mdx` | Thiết lập máy nhánh > cau-hinh-yealink-t19x-t30x | Task guide | **nháp** | Chuyển đổi heading cũ (I, II, Bước 1) sang <Steps>/<Step>, chuẩn hóa ảnh cũ tên hash, bổ sung checkpoint đăng ký thành công và troubleshooting (mất kết nối SIP, lỗi 403/408) | Cấu hình SIP server domain/port nội bộ ODS, STUN server, danh sách codec ưu tiên |
| `content/docs/ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/ip-phone/index.mdx` | Thiết lập máy nhánh > Tổng quan | Concept / Overview | **placeholder** | Bản đồ lựa chọn thiết bị (IP Phone vs Softphone PC vs Mobile App), Cards điều hướng | Khuyến nghị lựa chọn thiết bị theo mô hình doanh nghiệp và yêu cầu băng thông mạng |
| `content/docs/ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/mobile-app/cai-dat-ods-phone-android.mdx` | Thiết lập máy nhánh > cai-dat-ods-phone-android | Task guide | **nháp** | Chuyển đổi heading cũ (I, II, Bước 1) sang <Steps>/<Step>, chuẩn hóa ảnh cũ tên hash, bổ sung checkpoint đăng ký thành công và troubleshooting (mất kết nối SIP, lỗi 403/408) | Cấu hình SIP server domain/port nội bộ ODS, STUN server, danh sách codec ưu tiên |
| `content/docs/ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/mobile-app/cai-dat-ods-phone-ios.mdx` | Thiết lập máy nhánh > cai-dat-ods-phone-ios | Task guide | **nháp** | Chuyển đổi heading cũ (I, II, Bước 1) sang <Steps>/<Step>, chuẩn hóa ảnh cũ tên hash, bổ sung checkpoint đăng ký thành công và troubleshooting (mất kết nối SIP, lỗi 403/408) | Cấu hình SIP server domain/port nội bộ ODS, STUN server, danh sách codec ưu tiên |
| `content/docs/ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/mobile-app/index.mdx` | Thiết lập máy nhánh > Tổng quan | Concept / Overview | **placeholder** | Bản đồ lựa chọn thiết bị (IP Phone vs Softphone PC vs Mobile App), Cards điều hướng | Khuyến nghị lựa chọn thiết bị theo mô hình doanh nghiệp và yêu cầu băng thông mạng |
| `content/docs/ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/softphone/cai-dat-zoiper-may-tinh.mdx` | Thiết lập máy nhánh > cai-dat-zoiper-may-tinh | Task guide | **nháp** | Chuyển đổi heading cũ (I, II, Bước 1) sang <Steps>/<Step>, chuẩn hóa ảnh cũ tên hash, bổ sung checkpoint đăng ký thành công và troubleshooting (mất kết nối SIP, lỗi 403/408) | Cấu hình SIP server domain/port nội bộ ODS, STUN server, danh sách codec ưu tiên |
| `content/docs/ai-contact-center/user-guider-portal/09-thiet-lap-may-nhanh/softphone/index.mdx` | Thiết lập máy nhánh > Tổng quan | Concept / Overview | **placeholder** | Bản đồ lựa chọn thiết bị (IP Phone vs Softphone PC vs Mobile App), Cards điều hướng | Khuyến nghị lựa chọn thiết bị theo mô hình doanh nghiệp và yêu cầu băng thông mạng |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/danh-ba/them-danh-ba.mdx` | Gọi tự động > them-danh-ba | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/danh-ba/them-nhom-danh-ba.mdx` | Gọi tự động > them-nhom-danh-ba | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/danh-ba-va-du-lieu.mdx` | Gọi tự động > danh-ba-va-du-lieu | Concept / Overview | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/lich-va-bao-cao.mdx` | Gọi tự động > lich-va-bao-cao | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/tao-chien-dich.mdx` | Gọi tự động > tao-chien-dich | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/them-am-thanh.mdx` | Gọi tự động > them-am-thanh | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/thiet-lap-chien-dich/auto-dialer.mdx` | Gọi tự động > auto-dialer | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/thiet-lap-chien-dich/chien-dich-znc.mdx` | Gọi tự động > chien-dich-znc | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/thiet-lap-chien-dich/goi-tu-dong-autocall.mdx` | Gọi tự động > goi-tu-dong-autocall | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/thiet-lap-chien-dich/goi-tu-dong-zalo-oa.mdx` | Gọi tự động > goi-tu-dong-zalo-oa | Task guide | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/thiet-lap-chien-dich/index.mdx` | Gọi tự động > index | Concept / Overview | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/tong-quan.mdx` | Gọi tự động > tong-quan | Concept / Overview | **placeholder** | Toàn bộ nội dung form cấu hình chiến dịch, import danh bạ, upload file ghi âm, thiết lập khung giờ và báo cáo chi tiết; ảnh UI Portal thật | Cơ chế quay số đồng thời, tần suất quay số lại, điều kiện trigger cuộc gọi Zalo/ZNC và quy định chống cuộc gọi rác |
| `content/docs/ai-contact-center/user-guider-portal/index.mdx` | Trang chủ User Guide Portal | Concept / Overview | **đạt chuẩn** | Bổ sung liên kết sâu dạng Card tới các phân hệ mới sau khi hoàn thiện | Không có (chỉ giới thiệu mục lục và cấu trúc tổng thể) |
| `content/docs/cloudfile/index.mdx` | CloudFile (Workspace sản phẩm độc lập) | Placeholder / Overview | **placeholder** | Toàn bộ bài chi tiết: Cài đặt app Desktop/Mobile, phân quyền thư mục, liên kết chia sẻ an toàn, troubleshooting đồng bộ; ảnh chụp UI thực tế | Chưa có thông tin tenant, tài khoản thử nghiệm và tài liệu đặc tả sản phẩm CloudFile |

---

## 2. Đề xuất Hàng đợi viết bài (Writing Queue)

Thứ tự ưu tiên được sắp xếp theo đúng thứ tự điều hướng hiển thị trên thanh menu (Sidebar) của Portal ODS AI Contact Center:

### Thứ tự thực hiện chính thức:

```
1. 07-quan-ly-hoi-thoai (Quản lý hội thoại)
   └──> 2. 06-quan-ly-cuoc-goi (Giám sát cuộc gọi)
        └──> 3. 10-goi-tu-dong (Chiến dịch cuộc gọi / Gọi tự động)
             └──> 4. 08-tich-hop-da-kenh (Tích hợp đa kênh)
                  └──> 5. 09-thiet-lap-may-nhanh (Thiết lập máy nhánh)
                       └──> 6. cloudfile (Hỏi Human trước)
                            └──> 7. Rà soát lại (TASK-013: 03, 04, 05)
```

### Chi tiết từng chặng:

#### Chặng 1: `07-quan-ly-hoi-thoai` (Quản lý hội thoại)
- **Mục tiêu**: Chuẩn hóa luồng làm việc Omnichannel Contact Center (Nhắn tin, gọi lại, hợp nhất hồ sơ).
- **Phạm vi xử lý**:
  - `quan-ly-tin-nhan-cuoc-goi.mdx` (Tiếp nhận tin nhắn đa kênh, gọi lại nhanh cho khách).
  - `hop-nhat-thong-tin-khach-hang.mdx` (Quy trình gộp contact trùng lặp từ nhiều kênh).

#### Chặng 2: `06-quan-ly-cuoc-goi` (Giám sát cuộc gọi)
- **Mục tiêu**: Hướng dẫn Supervisor/Manager giám sát cuộc gọi trực tiếp thời gian thực.
- **Phạm vi xử lý**:
  - `huong-dan-giam-sat-cuoc-goi.mdx` (Chuyển đổi 294 dòng nháp sang Multi-scenario guide; tách rõ 4 hành động: Nghe lén, Rước cuộc gọi, Đàm thoại ba bên, Ngắt cuộc gọi; thay 10 ảnh hash cũ bằng media nét có ngữ cảnh).

#### Chặng 3: `10-goi-tu-dong` (Chiến dịch cuộc gọi / Gọi tự động)
- **Mục tiêu**: Xây dựng toàn bộ phân hệ AutoCall / AutoDialer / ZNC / Zalo OA từ trạng thái placeholder.
- **Phạm vi xử lý**:
  - Viết mới tuần tự 12 file placeholder: từ Danh bạ (`them-nhom-danh-ba`, `them-danh-ba`) → Thư viện âm thanh (`them-am-thanh`) → Thiết lập chiến dịch (`auto-dialer`, `chien-dich-znc`, `goi-tu-dong-autocall`, `goi-tu-dong-zalo-oa`) → Lịch chạy và báo cáo.

#### Chặng 4: `08-tich-hop-da-kenh` (Tích hợp đa kênh)
- **Mục tiêu**: Hướng dẫn kết nối các kênh mạng xã hội (Facebook Page, Zalo Official Account) vào tổng đài.
- **Phạm vi xử lý**:
  - `index.mdx` (Bản đồ tổng quan các kênh tích hợp).
  - `tich-hop-facebook-messenger.mdx` (Quy trình ủy quyền Fanpage, cấu hình Webhook).
  - `tich-hop-zalo-oa.mdx` (Quy trình ủy quyền Zalo OA, xác thực doanh nghiệp ZCA).

#### Chặng 5: `09-thiet-lap-may-nhanh` (Thiết lập máy nhánh)
- **Mục tiêu**: Hướng dẫn cấu hình thiết bị đầu cuối đàm thoại (IP Phone phần cứng, Softphone PC, App Mobile).
- **Phạm vi xử lý**:
  - `ip-phone/cau-hinh-yealink-t19x-t30x.mdx` (Chuyển sang `<Steps>`, thay 7 ảnh hash cũ, bổ sung checklist SIP registered).
  - `softphone/cai-dat-zoiper-may-tinh.mdx` (Rút gọn 18 ảnh wizard, tập trung vào cấu hình tài khoản SIP ODS).
  - `mobile-app/cai-dat-ods-phone-android.mdx` & `mobile-app/cai-dat-ods-phone-ios.mdx` (Quy trình quét mã QR máy nhánh, cấp quyền chạy ngầm background).
  - Hoàn thiện các trang `index.mdx` định hướng lựa chọn thiết bị.

#### Chặng 6: `cloudfile` *(Cần hỏi Human trước)*
- **Lưu ý đặc biệt**: CloudFile là một dòng sản phẩm độc lập ngoài AI Contact Center. Hiện chỉ có 1 file placeholder.
- **Hành động**: Dừng lại và xin ý kiến Human về tài liệu đặc tả, tài khoản test và phạm vi cụ thể của CloudFile trước khi bắt đầu viết.

#### Chặng 7: Rà soát lại (Backlog QA cho các bài TASK-013)
- **Phạm vi**: `03-quan-ly-nguoi-dung`, `04-thiet-lap-tong-dai`, `05-quan-ly-khach-hang`, `01-tong-quan`.
- **Mục tiêu**: Sau khi viết xong các phân hệ trên, rà soát lại liên kết chéo (internal cross-links), kiểm tra tính nhất quán của thuật ngữ và xác minh lại các claim inferred còn lại.

---

## 3. Nguyên tắc vận hành theo skill `doc-actuator`

1. **Evidence First**: Chỉ xuất bản thông tin **Observed** (nhìn thấy trên UI Portal thật) và **Approved** (nguồn tài liệu chính thức được duyệt). Các thông tin **Inferred** phải được ghi chú là khuyến nghị hoặc xác minh trực tiếp trước khi chốt bài.
2. **Cấu trúc bài viết**: Áp dụng chặt chẽ `<Steps>/<Step>` cho task guides; `<Cards>/<Card>` cho overview; Callout chỉ dùng đúng mục đích cảnh báo nguy cơ hoặc thông tin vận hành quan trọng.
3. **Screenshot có chủ đích**: Lưu trữ tại `public/media/ai-contact-center/user-guider-portal/`, đặt tên có ý nghĩa theo convention `{feature}_{state-or-action}.png`, loại bỏ toàn bộ thông tin nhạy cảm (SĐT thật, token, mật khẩu).
