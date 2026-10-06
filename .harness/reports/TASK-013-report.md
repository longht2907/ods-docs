# TASK-013 — Báo cáo nghiệm thu

## Trạng thái

- Branch: `task/TASK-013-portal-docs-actuation`
- Task status: `done`
- Commit: `5b9c3a2`
- Pull Request: hoàn tất đồng bộ và merge vào `main`

## Phạm vi đã thực hiện hoàn tất

1. **Khảo sát thực tế Portal và hoàn thiện tài liệu theo skill `doc-actuator`:**
   - **Thiết lập tổng đài:**
     - `cai-dat/cau-hinh-luat-khach.mdx`: Cấu hình danh sách ưu tiên, import số điện thoại.
     - `cai-dat/quan-ly-cuoc.mdx`: Đầu số & Cước phí, cấu hình đơn giá cuộc gọi, nạp tiền.
     - `cai-dat/webhook-va-popup.mdx`: Cấu hình API, sự kiện Webhook, cấu hình Popup.
     - `cai-dat/phan-tich-cuoc-goi.mdx`: Cấu hình phân tích AI, kịch bản đánh giá, biểu đồ phân tích.
     - `lich-su-cuoc-goi.mdx`: Bộ lọc nâng cao, nghe lại ghi âm, xuất báo cáo lịch sử.
     - `thong-ke-bao-cao-cuoc-goi.mdx`: Báo cáo cuộc gọi tổng quan, theo nhân viên, theo nhóm.
   - **Quản lý người dùng:**
     - `tao-tai-khoan-nguoi-dung.mdx`: Khởi tạo tài khoản, gán máy nhánh, kích hoạt.
     - `thiet-lap-phan-quyen.mdx`: Vai trò phân quyền (Role-based Access Control), ma trận quyền hạn.
   - **Quản lý khách hàng (Mini CRM):**
     - `tong-quan-chuc-nang.mdx`: Kiến trúc Mini CRM, phân loại Tiềm năng vs Hiện tại, tích hợp PBX core.
     - `nhap-du-lieu-khach-hang.mdx`: Nhập thủ công và nhập hàng loạt từ Excel chuẩn hóa, bảng đối chiếu Do/Don't.
     - `xem-va-chinh-sua-thong-tin.mdx`: Ngăn kéo tương tác 360 độ (Side Drawer), modal cập nhật hồ sơ.
     - `cai-dat/danh-sach-to-chuc.mdx`: Quản lý danh bạ doanh nghiệp B2B, liên kết đa khách hàng.
     - `cai-dat/nhan-khach-hang.mdx`: Hệ thống nhãn phân loại có mã màu (Color Picker).

2. **Nâng cấp nền tảng hiển thị MDX & Giao diện:**
   - Xây dựng component React `CustomerFlowDiagram` tinh gọn, type-safe, loại bỏ lỗi hydration.
   - Cấu hình đăng ký toàn cục các component (`Callout`, `Steps`, `Step`, `Tabs`, `Tab`, `Cards`, `Card`, `CustomerFlowDiagram`) trong `src/components/mdx.tsx`.
   - Chuẩn hóa toàn bộ media ảnh thực tế chụp từ Portal ODS vào `public/media/ai-contact-center/user-guider-portal/`.

## Kiểm chứng (Quality Gates)

- `npm run verify:code` — PASS: typecheck, env guard, broken links và guard security.
- `npm run check:scope` — PASS: toàn bộ file thay đổi đều nằm trong phạm vi task.
- `npm run verify` — PASS: code verification + production build (Next.js standalone).
- Giao diện tài liệu hiển thị sắc nét, responsive, chuẩn phong cách Claude Docs.
