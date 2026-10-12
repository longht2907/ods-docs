---
status: in-progress
branch: task/TASK-019-contact-center-autocall-api
commit: "0ee55ed"
verified-by: npm run verify:task
---

# TASK-019 — Hoàn thiện Portal Chiến dịch cuộc gọi và Bộ tài liệu API AI Contact Center

## Bối cảnh

Hệ thống AI Contact Center ODS đã được chuẩn hóa về kiến trúc giao diện tài liệu, tuy nhiên phân hệ hướng dẫn Portal cho **Chiến dịch cuộc gọi** (`10-goi-tu-dong/**`) mới chỉ hoàn thiện phần khung dàn ý và phân hệ Danh bạ, các bài còn lại (Âm thanh, Tạo chiến dịch, Cấu hình Auto Call, Báo cáo) cần được viết lại hoàn chỉnh theo format task guide thực tế của TASK-015 / skill `doc-actuator`. Đồng thời, phân hệ tài liệu kỹ thuật tích hợp **API** (`api/**`) cho Autocall, Tổng đài và Webhook cần được dựng chuẩn chỉnh theo đặc tả kỹ thuật chuẩn gồm Overview, Authentication, Endpoints và Webhook payloads.

## Mục tiêu

1. **User Guide Portal (`10-goi-tu-dong/**`):**
   - Hoàn thiện toàn bộ các bài viết theo format task guide thực tế (chuẩn `doc-actuator`: ít chữ, trực quan, ảnh chụp thực tế Portal ODS, các bảng tham số rõ ràng).
   - Thứ tự triển khai: `them-am-thanh.mdx` → `tao-chien-dich.mdx` → `thiet-lap-chien-dich/goi-tu-dong-autocall.mdx` → `lich-va-bao-cao.mdx` → `danh-ba-va-du-lieu.mdx` → `thiet-lap-chien-dich/index.mdx`.
2. **Tài liệu API (`api/**`):**
   - Xây dựng tài liệu API cho 3 nhóm tính năng chính: `autocall`, `tong-dai`, `webhook`.
   - Cấu trúc chuẩn từng nhóm: Overview, Authentication (Bearer Token / API Key), Endpoints (HTTP Method, Path, Headers, Query/Body Parameters, Request mẫu cURL/JSON, Response thành công, Bảng mã lỗi), Webhook events/payload.
3. **Quản lý thông tin thiếu hụt:**
   - Tuyệt đối không bịa đặt endpoint, tham số, dữ liệu nội bộ không có thực chứng.
   - Các thông tin thiếu hụt được đánh dấu `**Cần bổ sung:**`, gán mã câu hỏi `[Q-xxx]` và tập hợp tại `.harness/reports/TASK-019-questions.md`.

## Phạm vi (Scope)

### Tạo mới hoặc sửa đổi:
- `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/**`
- `content/docs/ai-contact-center/api/**`
- `public/media/ai-contact-center/**`
- `tasks/TASK-019-contact-center-autocall-api.md` (file task này)
- `.harness/reports/TASK-019-questions.md`
- `.harness/reports/TASK-019-report.md`

## Ngoài phạm vi (Out of Scope)

- KHÔNG sửa `content/docs/cloudfile/**`.
- KHÔNG sửa `content/docs/meta.json` và trang chủ docs (`content/docs/index.mdx`).
- KHÔNG sửa `src/**`, `harness/**`, `package.json`, lockfile.
- KHÔNG thao tác thư mục `E:\Project\ods-docs-cloudfile` (khu vực Codex đang thực hiện TASK-020).
- KHÔNG thực hiện các lệnh git: `git switch`, `git stash`, `git reset --hard`, `git add -A`, push hoặc mở Pull Request.
- Dev server duy trì hoạt động trên cổng 3001.

## Ràng buộc kỹ thuật & Quy trình làm việc

- Mỗi bài viết sau khi hoàn thành: chạy kiểm tra `npm run check:links` để đảm bảo không có liên kết gãy, sau đó **DỪNG và báo cáo Human**.
- Ảnh chụp màn hình: Kích thước 1440×900, theme sáng, crop vùng liên quan, lưu tại `public/media/ai-contact-center/user-guider-portal/`.
- Câu hỏi cần Human làm rõ: Ghi rõ mã `Q-01`, `Q-02`... kèm bối cảnh và câu trả lời dự kiến.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [ ] Toàn bộ các bài viết trong `10-goi-tu-dong/**` hoàn thiện theo task guide `doc-actuator`, có ảnh thực tế và cấu trúc trực quan.
- [ ] Các trang tài liệu API (`api/autocall`, `api/tong-dai`, `api/webhook`) đầy đủ Overview, Auth, Endpoints, Request/Response mẫu, Error codes.
- [ ] `npm run check:links` kiểm tra toàn bộ link hợp lệ, không có link 404.
- [ ] `npm run verify:code` PASS toàn bộ các khâu kiểm tra.
- [ ] Báo cáo tổng kết bàn giao tại `.harness/reports/TASK-019-report.md`.
