# TASK-026 — Báo cáo vá dependency security

Ngày kiểm tra: 27/10/2026  
Branch: `task/TASK-026-security-dependency-patches`  
Trạng thái: `in-progress` — chờ commit, Pull Request, CI và Human duyệt.

## Kết quả thay đổi

| Thành phần | Trước | Sau | Kết quả |
|---|---:|---:|---|
| Node.js local/CI/Docker baseline | Node 22 không cố định patch | 22.23.4 | Đúng security release 21/10/2026 |
| Next.js | 16.3.4 | 16.4.3 | Loại affected range đã audit |
| Sharp | 0.35.4 | 0.35.5 | Đã vá librsvg advisory |
| source-map-js | 1.2.1 | 1.2.2 | Đã vá event-loop DoS advisory |
| Zod | 4.6.5 | 4.6.7 | Cao hơn patched version 4.6.6 |
| CI dependency gate | Không có | `npm run audit:prod` | Chặn High/Critical production advisory |

Không thêm direct dependency. Fumadocs Core/UI 16.15.10 và Fumadocs MDX 15.4.0
giữ nguyên; peer ranges thực tế chấp nhận Next.js 16.x và React 19.

## Bằng chứng kiểm tra

- `npm ci` — PASS, cài 260 packages từ lockfile; `found 0 vulnerabilities`.
- `npm run audit:prod` — PASS, `found 0 vulnerabilities`.
- `npm run verify:code` — PASS:
  - Next type generation và TypeScript PASS.
  - `check:env` PASS.
  - `check:links` PASS.
  - `guard` PASS.
- `npm run build` với `ODS_DOCS_SITE_URL=https://ods-docs-task-026.invalid` — PASS trên Next.js 16.4.3; prerender 452 static pages.
- `npm run test:routes` — PASS 16/16; public routes 200, internal và internal search 401.
- `npm run test:api-ui` — PASS desktop/mobile, Light/Dark, sticky panels, copy/tab/search regression.
- `npm run test:search` — PASS extraction, grouping, anchors và public/internal boundary.
- `npm run test:internal-content` — PASS 21 flows, 76 step links; internal vẫn 401.
- `npm run test:flowchart` — PASS 12 route/viewport/theme cases và 21 process pages.
- `docker compose config --quiet` — PASS với test origin.
- `docker manifest inspect node:22.23.4-alpine` — PASS; tag tồn tại trên registry.
- `git diff --check` — PASS.
- Local service sau clean install: Next.js 16.4.3 trên `localhost:3000`; `/docs` trả HTTP 200.

## Giới hạn và cảnh báo

- `npm run verify:task` chạy `verify:code` PASS nhưng dừng tại `check:scope` vì
  `KIEN_TRUC_HE_THONG.md` là untracked file có sẵn ngoài TASK-026. File này được giữ
  nguyên, không đưa vào allowlist và không đưa vào thay đổi của task.
- Lần chạy `test:flowchart` đầu tiên bị Next.js từ chối do dev server cũ đang chạy
  trong cùng checkout. Sau khi dừng đúng process tree, test chạy lại PASS; local dev
  server sau đó đã được khởi động lại và kiểm tra HTTP 200.
- Docker daemon local không chạy nên chưa build image/container thực tế. Chỉ cấu hình
  Compose và manifest của base image được xác minh.
- Chưa deploy VPS; phiên bản Node/PHP và image đang chạy trên production chưa được
  kiểm chứng trong task này.
- CI/PR chưa chạy. Task phải giữ `status: in-progress` cho tới khi CI trên Pull Request
  xanh và Human duyệt.
