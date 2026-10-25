# Đối chiếu hồ sơ TASK-024 — Support Wiki

## Snapshot và trạng thái

- Task triển khai khung đã merge qua [PR #25](https://github.com/longht2907/ods-docs/pull/25).
- Snapshot head của PR: `d04939f`; main sau merge: `fb781d5`.
- [CI verify của PR](https://github.com/longht2907/ods-docs/actions/runs/40166592630/job/121088802104) đã thành công: env, links, scope, types, guard, build, routes.
- Không suy ra CI này đã test focus trap, fullscreen, mobile hay độ đúng nghiệp vụ. Những phần đó được review riêng và khắc phục qua TASK-025.
- `status: done` chỉ ghi nhận triển khai khung đã merge, không phải phê duyệt chính sách vận hành.

## Phạm vi thực tế

- Nhóm Bắt đầu: trang chủ, dịch vụ, mã dịch vụ/Odoo, điều hướng yêu cầu.
- Data Center: 6 quy trình; Network: 2 quy trình, 6 runbook, topology; License: bài đăng ký và trang tổng quan.
- Tổng đài **có thay đổi**, không bảo toàn nguyên vẹn: bài triển khai, bàn giao, hủy/tạm ngưng dịch vụ và hủy addon; thêm media. Nội dung Voice cũ cũng có chỉnh sửa/thay thế.
- Component SVG/React và registry có **21 lưu đồ**: Data Center 6, Network 8, License 1, Voice 6. Con số 15 chỉ tính ba nhóm đầu, không phải toàn bộ registry.

## Đính chính kết quả nghiệm thu cũ

1. Ảnh chụp chứa thông tin khách hàng nằm ở `public/media`, trong khi auth chỉ bảo vệ `/internal`; repo đang public. Không được coi auth là bảo vệ media/Git.
2. License đã mô tả sai quy ước Plesk/DirectAdmin và nhánh chưa có mã; bảng mã dịch vụ và Local/Rack cũng cần sửa theo nguồn.
3. Không thể hợp nhất PDF và Word về thu hồi IP thành một chính sách được duyệt. SLA concept và các thời hạn trong nguồn lịch sử cần người phụ trách xác nhận.
4. Viewer cũ chưa đạt fullscreen/focus/mobile như báo cáo cũ mô tả; thiếu test chuyên biệt.
5. Việc typecheck/build/routes PASS không chứng minh không lộ PII hoặc đúng nghiệp vụ.

## Follow-up

[TASK-025](../../tasks/TASK-025-internal-review-fixes.md) xử lý F1–F6 và bổ sung test. Xem [báo cáo TASK-025](TASK-025-report.md) để biết kết quả mới và giới hạn còn lại.

Nguồn đối chiếu: “Mô Tả Dịch Vụ ODS - 2025.docx”, bộ quy trình Network/Data Center và lưu đồ đăng ký License do người dùng cung cấp. Nguồn lịch sử không tự thành chính sách hiện hành.
