---
status: in-progress
branch: task/TASK-013-portal-docs-actuation
commit: ""
verified-by: npm run verify:task
---

# TASK-013 — Chuẩn hóa Portal docs và nền hiển thị MDX

## Bối cảnh

Sau khi TASK-012 được merge qua Pull Request #12, working tree còn một nhóm thay đổi chưa được quản lý gồm nội dung hướng dẫn AI Contact Center, ảnh minh họa, cấu trúc sidebar và thành phần MDX. Human đã yêu cầu giữ toàn bộ nhóm thay đổi này, đóng thành TASK-013 và đưa lên GitHub. Human cũng xác nhận các media hiện có trong phạm vi task được phép commit lên repository.

## Mục tiêu

- Chuẩn hóa các bài Tổng quan, Quick Start, Cài đặt tổng đài và Gọi tự động theo cấu trúc tài liệu vận hành.
- Bổ sung ảnh minh họa Portal đã được duyệt công khai.
- Hỗ trợ `Steps`, `Card` icon và kiểu mục lục `clerk` trong MDX.
- Tinh gọn các landing page trùng với folder navigation mà không làm gãy URL được liên kết.
- Ghi nhận rõ các trang còn thiếu nguồn thực chứng để xử lý ở task nội dung tiếp theo, không tự suy đoán API hoặc UI.

## Phạm vi

### Tạo mới

- `.agents/skills/doc-actuator/**`
- `.antigravity/**`
- `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/dieu-huong-cuoc-goi-theo-thoi-gian.mdx`
- `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/**`
- `public/media/ai-contact-center/user-guider-portal/**`
- `public/media/session_init_success.png`
- `tasks/TASK-013-portal-docs-actuation.md`
- `.harness/reports/TASK-013-report.md`

### Sửa đổi hoặc xóa

- `content/docs/ai-contact-center/api/autocall/index.mdx`
- `content/docs/ai-contact-center/user-guider-portal/01-tong-quan/**`
- `content/docs/ai-contact-center/user-guider-portal/02-quan-ly-dich-vu/**`
- `content/docs/ai-contact-center/user-guider-portal/03-quan-ly-nguoi-dung/**`
- `content/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/**`
- `content/docs/ai-contact-center/user-guider-portal/05-quan-ly-khach-hang/**`
- `content/docs/ai-contact-center/user-guider-portal/06-quan-ly-cuoc-goi/**`
- `content/docs/ai-contact-center/user-guider-portal/07-quan-ly-hoi-thoai/**`
- `content/docs/ai-contact-center/user-guider-portal/index.mdx`
- `content/docs/ai-contact-center/user-guider-portal/meta.json`
- `src/app/docs/[[...slug]]/page.tsx`
- `src/app/docs/layout.tsx`
- `src/app/internal/[[...slug]]/page.tsx`
- `src/app/layout.tsx`
- `src/components/mdx.tsx`

## Ngoài phạm vi

- Không đổi `src/proxy.ts`, source loader, search, sitemap, `llms.txt`, OAuth, secret hoặc deploy.
- Không thêm dependency.
- Không đặc tả endpoint Autocall/Webhook khi chưa có tài liệu kỹ thuật được duyệt.
- Không tự suy đoán field, quyền hoặc hành vi Portal không thể kiểm chứng từ nguồn hiện có.
- Không sửa test hoặc nới điều kiện kiểm tra để gate đi qua.

## Ràng buộc kiến trúc và nội dung

- Giữ nguyên ranh giới public/internal; thay đổi trang internal chỉ đồng bộ cách render mục lục, không đổi dữ liệu hoặc quyền truy cập.
- Mọi MDX mới có `title` và `description`; public docs không link sang `/internal`.
- Card icon dùng mapping type-safe, không dùng `any` hoặc `as unknown as`.
- Ảnh dùng đường dẫn dưới `/media/ai-contact-center/user-guider-portal/` và phải tồn tại trong repository.
- Giữ `status: in-progress` đến khi Pull Request CI xanh và Human finalization.

## Tiêu chí nghiệm thu

- [ ] `npm run verify:code` thành công.
- [ ] `npm run check:scope` thành công và không có file ngoài phạm vi.
- [ ] `npm run build` thành công.
- [ ] Route public tiếp tục trả 200 và route internal tiếp tục trả 401.
- [ ] `git diff --check` không có lỗi whitespace.
- [ ] Không có `any` hoặc `as unknown as` mới trong phần TypeScript thuộc task.
- [ ] Toàn bộ media được tham chiếu tồn tại và không có link MDX gãy.

## Bàn giao

- Báo cáo nghiệm thu tại `.harness/reports/TASK-013-report.md`.
- Commit và push branch để mở Pull Request vào `main`.
- Các bài còn là placeholder hoặc thiếu nguồn thực chứng được lập inventory cho task nội dung kế tiếp.
