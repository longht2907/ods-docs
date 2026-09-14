---
name: superpowers
description: Quy trình phát triển phần mềm chuẩn mực cho AI Agent (Spec -> Plan -> TDD -> Review).
---

# Superpowers Workflow for ODS Docs

Quy trình phát triển phần mềm nghiêm ngặt dành cho AI Agent khi thao tác trên repo `ods-docs`.

## 1. Phase 1: Spec (Xác định đặc tả)
- **Luôn bắt đầu từ Task Spec**: Không bao giờ viết code ngay khi nhận yêu cầu chung chung.
- Tạo hoặc cập nhật file trong thư mục `tasks/` dựa trên `tasks/TASK-TEMPLATE.md`.
- Xác định rõ:
  - Danh sách file thuộc phạm vi (In-Scope).
  - Các phần cấm chạm (Out-of-Scope).
  - Tiêu chí nghiệm thu (Acceptance Criteria) đo lường được bằng máy.

## 2. Phase 2: Plan (Lên kế hoạch & Đánh giá rủi ro)
- Lên kế hoạch chi tiết các bước sửa đổi.
- Kiểm tra chéo với **8 nguyên tắc bất biến** trong `AGENTS.md` và các quyết định trong `DECISIONS.md`.
- Nếu có quyết định kiến trúc mới hoặc thay đổi ranh giới bảo vệ: **Dừng lại xin ý kiến Human**.

## 3. Phase 3: Execute & TDD (Thực thi & Kiểm chứng liên tục)
- Tuân thủ nguyên tắc thay đổi nhỏ, đúng phạm vi được giao.
- Kiểm tra tính đúng đắn ngay trong quá trình viết code (Feedback loop ngắn).
- Đọc types thật trong `node_modules` đối với Fumadocs, Next.js và React 19; không đoán mò API.

## 4. Phase 4: Review & Verify (Nghiệm thu thực tế)
- Chạy toàn bộ các lệnh kiểm tra tự động trước khi báo cáo hoàn thành:
  ```bash
  npm run typecheck    # Kiểm tra types
  npm run guard        # Kiểm tra ranh giới bảo mật, secret, frontmatter
  npm run build        # Kiểm tra đóng gói build
  ```
- Không bao giờ báo "PASS" nếu chưa chạy thật và nhận kết quả trả về từ terminal.
- Báo cáo rõ ràng: File đã sửa, kết quả các lệnh kiểm tra, và các hạn chế còn lại (nếu có).
