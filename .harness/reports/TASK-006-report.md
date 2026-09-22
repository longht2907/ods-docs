# Báo cáo nghiệm thu TASK-006 — Nội dung và triển khai ODS Docs

- **Task**: `tasks/TASK-006-noi-dung-va-trien-khai-docs.md`
- **Branch**: `task/TASK-006-noi-dung-va-trien-khai-docs`
- **Trạng thái**: `done`
- **Snapshot khôi phục**: local commit `fb85610`
- **Kiểm chứng bởi**: `npm run verify:task`

## 1. Phạm vi đã xử lý

- 87 file dưới `content/docs/**`: nhập hướng dẫn Portal, cập nhật navigation metadata và giữ redirect cho URL cũ.
- 146 ảnh demo/public dưới `public/media/ai-contact-center/user-guider-portal/**`; Human xác nhận được phép đưa lên GitHub ngày 2026-09-22.
- Cấu hình triển khai: `.dockerignore`, `.gitignore`, `Dockerfile`, `docker-compose.yml`, `next.config.mjs`, `DEPLOY_VPS.md`, `package.json` và `scripts/package-media.mjs`.
- Bốn trang index bị import sai link media đã được sửa thành route tài liệu thật.
- Ba file UI cũ `src/app/docs/layout.tsx`, `src/components/top-nav.tsx` và `src/lib/layout.shared.tsx` không được đưa sang TASK-006 vì đã bị implementation TASK-005 thay thế.

## 2. Kiểm chứng nội dung và media

- `npm run check:links` — PASS.
- `npm run guard` — `Guard PASS.`
- `npm run check:scope` — PASS, không có thay đổi ngoài TASK-006.
- Audit media: 49 MDX, 146 image references duy nhất, 146 file media, thiếu `0`.
- Không có link từ public content sang `/internal`.
- Không phát hiện credential pattern trong phần content/media mới.
- `npm run media:package` — PASS, tạo archive trong `dist-media/` (được Git ignore) và hướng dẫn giải nén đúng vào `public/media`.

## 3. Kiểm chứng code và runtime

- `git diff --check` — PASS; cảnh báo LF/CRLF không phải whitespace error.
- `npm run verify:task` — exit code `0`:
  - route types và TypeScript PASS;
  - env guard, broken links, guard và scope PASS;
  - production build sinh 170 static pages;
  - route tests PASS `7/7`;
  - `/docs` và public search trả `200`;
  - `/internal/**` và `/api/search/internal/**` tiếp tục trả `401`.
- Runtime production:
  - Portal root, trang Zoiper và ảnh media mẫu trả `200`;
  - ba nhóm URL cũ trả `308` về `/docs/ai-contact-center/user-guider-portal`.

Build vẫn có cảnh báo baseline `metadataBase` chưa được cấu hình; cảnh báo không phát sinh từ TASK-006.

## 4. Docker

- `docker compose config --quiet` — PASS.
- Compose chỉ publish Next.js tại `127.0.0.1:3000`, phù hợp reverse proxy cùng host.
- `docker compose build` chưa chạy được vì Docker daemon trên máy local đang tắt. Docker CLI và Compose lần lượt là `24.0.6` và `2.22.0`; lỗi môi trường: không tìm thấy pipe `//./pipe/docker_engine`.
- Next.js standalone production build đã PASS bằng `npm run verify:task`; không deploy VPS production trong task này.

## 5. Trạng thái bàn giao

Implementation và local verification đã hoàn tất. Pull Request #7 chạy required check `verify` thành công cho commit implementation `7174611`; TASK-006 được chuyển sang `done` và giữ nguyên PR để chạy lại CI cho commit finalize trước khi Human merge.
