---
status: done
branch: task/TASK-025-internal-review-fixes
commit: "c7830fe36523f30e0148cc9defd76fc6a2cedfa6"
verified-by: npm run verify:task; PR-26 CI verify
---

# TASK-025 — Khắc phục review Support Wiki TASK-024

## Mục tiêu

- Gỡ 8 ảnh chụp dữ liệu khách hàng khỏi bản hiện tại, bỏ tham chiếu và ví dụ nhận diện thật.
- Sửa mapping dịch vụ/license theo nguồn; đánh dấu quy trình chưa xác nhận, không tự phê duyệt.
- Sửa dialog SVG, độ đọc, keyboard/touch, marker và liên kết; thêm kiểm thử hồi quy.
- Đồng bộ hồ sơ TASK-024 và ghi bằng chứng/task follow-up.

## Phạm vi

- `content/internal/**`
- `public/media/ai-contact-center/cloudfone-4u/**`
- `public/media/ai-contact-center/virtual-pbx/**`
- `src/components/flowchart/**`
- `harness/tests/flowchart-regression.test.mjs`
- `harness/tests/internal-content.test.mjs`
- `harness/tests/helpers/**`
- `.github/workflows/ci.yml`
- `package.json`
- `tasks/TASK-024-quy-hoach-support-wiki.md`
- `tasks/TASK-025-internal-review-fixes.md`
- `.harness/reports/**`

## Ngoài phạm vi

Không đổi auth/proxy, /docs, search hoặc dependency. Không rewrite lịch sử Git, đổi visibility hay tự merge/deploy. Xóa ảnh ở nhánh không xóa dữ liệu khỏi lịch sử; owner cần xử lý riêng. Không tự xác nhận chính sách vận hành chưa đủ nguồn.

## Tiêu chí nghiệm thu

- [x] verify:task và test mới PASS; CI của PR xanh trước khi đóng task.
- [x] Không còn ảnh thuộc 8 đường dẫn, tham chiếu MDX hoặc ví dụ liên hệ khách hàng đã phát hiện.
- [x] Quy ước Plesk/cPanel/DirectAdmin, Local/Rack và Odoo được sửa.
- [x] Thu hồi IP có điểm dừng thay vì tự hợp nhất nguồn; thời gian DDoS tự thêm được gỡ.
- [x] Dialog phủ viewport, trap/restore focus, zoom/fit, không duplicate ID, node links và đọc ở 100%.
- [x] Hồ sơ TASK-024 ghi đúng snapshot/phạm vi; report TASK-025 nêu giới hạn lịch sử và phê duyệt còn thiếu.

## Bàn giao

Local `npm run verify:task` PASS. Đã xuất bản [PR #26](https://github.com/longht2907/ods-docs/pull/26); [CI verify](https://github.com/longht2907/ods-docs/actions/runs/40171058393/job/121101792778) thành công trên snapshot `c7830fe36523f30e0148cc9defd76fc6a2cedfa6`. `commit` ghi snapshot bản sửa đã được CI kiểm chứng trước commit cập nhật hồ sơ, không phải hash tự tham chiếu của file này.

Trạng thái done ghi nhận hoàn tất bản sửa F1–F6 và kiểm chứng kỹ thuật; PR vẫn chờ người dùng review/merge. Không merge/deploy hay rewrite history. Không coi done là phê duyệt nghiệp vụ; các quyết định vận hành và xử lý dữ liệu trong Git history vẫn cần chủ sở hữu xác nhận.
