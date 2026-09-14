# Quy ước Quản lý Task & Vòng đời Nhiệm vụ

Tài liệu này định nghĩa quy ước vòng đời của các file task trong thư mục `tasks/`.

---

## 1. Cấu trúc Frontmatter

Mỗi file task (`tasks/TASK-XXX-*.md`) bắt buộc phải có phần frontmatter YAML ở đầu file:

```yaml
---
status: draft | in-progress | done
branch: task/TASK-XXX-ten-task
commit: <commit-hash>
verified-by: npm run verify:task
---
```

### Ý nghĩa các trường:
- `status`:
  - `draft`: Task đang được soạn thảo, chưa triển khai.
  - `in-progress`: Task đang được agent hoặc kỹ sư triển khai trên branch tương ứng.
  - `done`: Task đã hoàn thành toàn bộ phạm vi, vượt qua toàn bộ kiểm chứng tự động.
- `branch`: Tên nhánh git được tạo riêng cho task (`task/TASK-XXX-...`). Mọi thay đổi phải xuất phát từ nhánh này và mở Pull Request vào `main`.
- `commit`: Hash của commit sau cùng khi hoàn thành nhiệm vụ.
- `verified-by`: Lệnh kiểm chứng tự động bằng máy (mặc định: `npm run verify:task`).

---

## 2. Bằng chứng nghiệm thu (`.harness/reports/`)

Khi một task được đánh dấu `status: done`:
- Bắt buộc phải có file báo cáo nghiệm thu tương ứng tại `.harness/reports/TASK-XXX-report.md`.
- Script `scripts/guard.mjs` (check `13-task-evidence`) sẽ kiểm tra điều kiện này và báo **FAIL** nếu thiếu báo cáo.
- Báo cáo phải ghi lại output thật từ terminal của các lệnh kiểm chứng, các bài test negative và danh sách file thay đổi thực tế.

---

## 3. Cấu hình Git Hook (Tùy chọn cho Local)

Dự án không bắt buộc cài đặt husky. Để tự động chạy kiểm tra an toàn trước mỗi commit, bạn có thể trỏ hook của git vào thư mục `harness/hooks`:

```bash
git config core.hooksPath harness/hooks
```
