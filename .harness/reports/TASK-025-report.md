# TASK-025 — Khắc phục review Support Wiki

## Trạng thái

Đã kiểm thử local trên nhánh `task/TASK-025-internal-review-fixes`, nền `fb781d5` (main sau PR #25). Chưa merge/deploy. Lần kết nối cũ bị từ chối ghi (403); kết nối mới đã tạo nhánh thành công. Đang xuất bản bản sửa và chờ CI của PR. TASK-025 giữ in-progress cho tới khi CI đạt.

## Phạm vi sửa

- F1: Gỡ 8 ảnh public đã phát hiện có dữ liệu khách hàng; bỏ tham chiếu MDX, thay ví dụ thật bằng demo/placeholder. Bỏ chỉ dẫn lưu mật khẩu vào ghi chú Odoo/ticket; không đưa ảnh gốc vào bằng chứng mới.
- F2: Đối chiếu lại bảng license theo lưu đồ gốc. `9602` chỉ cho DirectAdmin; nhánh chưa có mã cả ba hãng đều qua người phụ trách, nhận kết quả, nhờ tạo mã và cập nhật. Ô Plesk nguồn để trống được ghi rõ cần xác nhận.
- F3: Sửa mapping Wadmin/AC/DC/DM/WinSer, Local/Rack và mô tả Odoo; bỏ cam kết/hạ tầng không có nguồn ở trang tổng quan.
- F4: Thu hồi IP chuyển thành trang tiếp nhận, so sánh hai nguồn và điểm dừng chờ phê duyệt; không tự hợp nhất nhánh gây gián đoạn. Gỡ khoảng theo dõi DDoS 60 phút–24 giờ, Switch 30–60 phút và khoảng nhắc abuse 12–24 giờ tự thêm. Gắn cảnh báo nguồn lịch sử/chính sách cần xác nhận trên các bài Network/DC/License và giới hạn tương ứng cho lưu đồ.
- F5: Base UI Dialog portal ngoài card, fullscreen, focus trap/restore, Escape, khóa nền; chữ 100% không tự thu nhỏ. Cuộn native/keyboard/touch, kéo chuột, zoom/fit/reset. SVG title/desc, ID theo instance, liên kết bước thực, validate dữ liệu graph. Không thêm dependency.
- F6: Đính chính báo cáo TASK-024: có thay đổi Voice, tổng 21 lưu đồ, trạng thái đã merge và snapshot CI; không ghi “bảo toàn nguyên vẹn” hay coi CI là phê duyệt nghiệp vụ.

## Kiểm thử

Lệnh cuối: `ODS_DOCS_SITE_URL=https://ods-docs-review.invalid npm run verify:task` — **PASS (exit 0)**. URL là origin chỉ để build/test, không phải domain production.

| Kiểm tra | Kết quả local |
| --- | --- |
| types:check, check:env, check:links, guard, check:scope | PASS |
| build production | PASS |
| test:routes | PASS 16/16, internal/search nội bộ vẫn 401 |
| test:api-ui | PASS desktop 1280/1440/1920, mobile 390/768, sáng/tối |
| test:search | PASS extraction/grouping/anchor/tiếng Việt và public/internal |
| test:internal-content (mới) | PASS 21 graph, 76 liên kết bước, 8 ảnh đã gỡ trả 404; kiểm tra lỗi graph và route tham chiếu |
| test:flowchart (mới) | PASS 12 tổ hợp route/viewport/theme, fullscreen, chữ 100%, ID/title/desc, zoom/fit/reset, focus trap/restore, Esc, keyboard/mouse/touch; hình học và anchor trên 21 trang |
| git diff --check | PASS |

Ảnh kiểm chứng local đã xem trực tiếp: desktop/mobile, sáng/tối, nhập server/license/DDoS. Không đưa ảnh khách hàng cũ vào bằng chứng. Hai test mới được thêm vào `verify:task` và CI; không nới test/guard cũ. Một lượt trước test API UI cũ lỗi khôi phục tab Python ở StartCampaign; lượt đầy đủ cuối PASS. Không kết luận đã khắc phục nguyên nhân flakiness của test cũ.

**CI GitHub đang chờ xuất bản PR.** Lỗi 403 thuộc kết nối cũ; sau khi người dùng kết nối lại đã tạo nhánh thành công. Sẽ cập nhật PR/head/CI thực tế sau khi xuất bản. Không merge/deploy hoặc sửa lịch sử.

## Cần owner xử lý/xác nhận

1. **Dữ liệu trong Git history vẫn còn.** PR chỉ xóa bản hiện tại; repo public, raw/history/fork/cache có thể vẫn truy cập dữ liệu cũ. Owner quyết định visibility, phối hợp xử lý history/cache và thu hồi/đổi bí mật nếu xác định từng lộ. Không tự rewrite history trong task này.
2. Phê duyệt phiên bản quy trình thu hồi IP, biện pháp block/null-route, thời hạn xử lý DDoS/blacklist/abuse, KVM và quy tắc thao tác hiện hành. Người biên soạn không thay chủ sở hữu nghiệp vụ ký duyệt.
3. Xác nhận quy ước cổng license hiện hành, trường trả về Plesk, loại dịch vụ/phạm vi Local. File SLA concept không thành cam kết chính thức.
4. Auth/login vẫn giữ nguyên: production `/internal` fail-closed 401, dev chỉ mở bằng biến đã có. Các nội dung khác trong repo công khai chưa được coi là đã kiểm toán dữ liệu toàn diện.
