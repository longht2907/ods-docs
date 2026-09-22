---
status: done
branch: task/TASK-006-noi-dung-va-trien-khai-docs
commit: "7174611"
verified-by: npm run verify:task
---

# TASK-006 — Hợp nhất nội dung AI Contact Center và cấu hình triển khai

## Bối cảnh

Worktree cũ còn 243 thay đổi chưa được quản lý theo task, gồm nội dung hướng dẫn Portal,
media minh họa, cấu hình Docker/VPS và một phiên bản navigation đã bị TASK-005 thay thế.
Human xác nhận ngày 2026-09-22 rằng toàn bộ ảnh là dữ liệu demo/public và được phép đưa
lên GitHub. Commit backup local `fb85610` giữ nguyên snapshot ban đầu để có thể khôi phục.

## Mục tiêu

Đưa phần nội dung và cấu hình triển khai còn giá trị lên nền `origin/main` mới nhất, giữ
nguyên navigation của TASK-005, sửa hướng dẫn deploy cho đúng branch protection/build
behavior và kiểm chứng đầy đủ trước khi mở Pull Request.

## Phạm vi

- `.gitignore`
- `.dockerignore`
- `DEPLOY_VPS.md`
- `Dockerfile`
- `docker-compose.yml`
- `next.config.mjs`
- `package.json`
- `scripts/package-media.mjs`
- `content/docs/**`
- `public/media/ai-contact-center/user-guider-portal/**`
- `tasks/TASK-006-noi-dung-va-trien-khai-docs.md`
- `.harness/reports/**`

## Ngoài phạm vi

- Không thay đổi navigation/layout đã hoàn thành trong TASK-005.
- Không thay đổi auth, `src/proxy.ts`, public/internal boundary hoặc search source.
- Không thêm dependency mới, secret, credential hay dữ liệu khách hàng.
- Không deploy VPS production trong task này.

## Ràng buộc kiến trúc & kỹ thuật

- Giữ `output: 'standalone'`; không chuyển sang static export.
- Các URL cũ dưới `/docs/ai-contact-center/huong-dan/**` phải redirect về vùng Portal mới.
- Tất cả MDX public phải có `title`, `description` và không link sang `/internal`.
- Media public phải có file tương ứng với mọi đường dẫn được tham chiếu trong MDX.
- Hướng dẫn Git phải dùng task branch/Pull Request, không direct push `main`.

## Tiêu chí nghiệm thu

- [ ] Nội dung Portal và media build thành công trên nền TASK-005.
- [ ] Không có thay đổi trong `src/app/docs/**`, `src/components/**` hoặc `src/lib/**`.
- [ ] `npm run check:links` và `npm run guard` PASS.
- [ ] `npm run verify:task` PASS, gồm production build và 7/7 route tests.
- [ ] `git diff --check` không có whitespace error.
- [ ] `docker compose config` PASS nếu Docker CLI khả dụng.
- [ ] Report liệt kê số lượng content/media và kết quả kiểm chứng thật.

## Điều kiện dừng

Dừng và hỏi Human nếu cần thay đổi ranh giới public/internal, phát hiện credential thật,
hoặc cần thêm dependency/service ngoài phạm vi.

## Báo cáo khi hoàn thành

- Liệt kê file/nhóm file thực tế và phần snapshot cũ bị loại bỏ.
- Ghi output kiểm thử, trạng thái Docker validation và giới hạn còn lại.
- Chỉ chuyển `status` sang `done` sau khi Pull Request CI xanh.
