---
status: done
branch: task/TASK-002-dong-vong-harness
commit: f419613
verified-by: npm run verify:task
---

# TASK-002 — Đóng vòng harness: gate CI, phase lock, scope enforcement

## Bối cảnh

Repo `ods-docs` đã có `AGENTS.md`, `DECISIONS.md`, `harness/guard.mjs`, `harness/**`, `tasks/**` và `.github/workflows/ci.yml`. Tuy nhiên hạ tầng kiểm chứng chưa được nối thành vòng kín. Trạng thái thật tại commit `8a5ac49` (đã kiểm tra, đừng giả định khác):

- `harness/linters/broken-links.mjs`, `harness/tests/routes.test.mjs`, `harness/hooks/check-commit.mjs` tồn tại nhưng không được gọi bởi `verify`, `verify:code`, hay CI.
- `ci.yml` chỉ trigger trên `pull_request` và `workflow_dispatch`. Chưa có PR nào; cả 4 commit push trực tiếp lên `main`.
- `.gitignore` có dòng lỗi `next-env.d.ts.env.local` (hai pattern dính liền) làm `.env` không được ignore.
- Guard check `1-secret` dùng `ignore.includes('.env')` nên luôn pass, không phản ánh thực tế.
- `guard.mjs` suy ra phase từ `exists('content/internal')`; xoá thư mục này sẽ tắt 6 check mà vẫn in `Guard PASS.`
- `src/proxy.ts` so sánh exact `pathname === '/api/search/internal'`, không chặn subpath và trailing slash.
- `AGENTS.md` chứa câu "Không có phân vai, không có task file" — mâu thuẫn với sự tồn tại của `tasks/`.
- `TASK-TEMPLATE.md` và `DECISIONS.md` nhúng đường dẫn tuyệt đối (file URI).

## Mục tiêu

Biến harness từ tập script rời rạc thành vòng kiểm chứng bắt buộc, sao cho mọi tuyên bố "đã xong" của agent đều verify được bằng **một lệnh duy nhất** và mọi vi phạm scope đều bị máy phát hiện.

Tiêu chuẩn thành công: `npm run verify:task` chạy pass là bằng chứng đủ; không cần đọc báo cáo prose để tin.

## Phạm vi

Tạo mới:

- `.harness/phase.json` — khai báo phase kỳ vọng, giá trị ban đầu `{ "phase": "internal" }`.
- `harness/linters/scope-check.mjs` — so `git diff --name-only` với allowlist trong task file.
- `harness/linters/env-guard.mjs` — dùng `git check-ignore` xác nhận `.env`, `.env.local`, `.env.production`, `.env.development` đều bị ignore.
- `.harness/reports/.gitkeep`
- `tasks/README.md` — quy ước vòng đời task và ý nghĩa frontmatter.

Sửa:

- `.gitignore` — tách dòng lỗi thành `next-env.d.ts` và `.env`; bổ sung `.env*.local`, `.env.production`, `.env.development`. Giữ nguyên các dòng khác.
- `package.json` — chỉ thêm scripts, không đổi dependency: `check:scope`, `check:env`, `verify:task`; nối `check:links` và `check:env` vào `verify` và `verify:code`.
- `harness/guard.mjs` — thêm 4 check, giữ nguyên toàn bộ check 1–9 hiện có:
    - `10-phase-lock`: đọc `.harness/phase.json`; nếu phase khai là `internal` hoặc cao hơn mà `content/internal` không tồn tại → FAIL.
    - `11-proxy-matcher`: nếu proxy có `export const config` với `matcher` mà pattern không phủ `/internal` → FAIL.
    - `12-prod-flag`: nếu tìm thấy `ODS_INTERNAL_DEV_OPEN` trong file cấu hình production hoặc trong `Dockerfile` → FAIL.
    - `13-task-evidence`: mỗi `tasks/TASK-*.md` có frontmatter `status: done` phải có `.harness/reports/TASK-XXX-report.md` tương ứng → thiếu thì FAIL.
    - Sửa check `1-secret`: thay `ignore.includes('.env')` bằng gọi `harness/linters/env-guard.mjs`; mở rộng regex thêm `ghp_`, `gho_`, `github_pat_`, Google OAuth client secret, JWT ba đoạn, và connection string `postgres://` / `mysql://` có credential.
- `src/proxy.ts` — sửa `isInternalPath` để chặn cả `/api/search/internal` dạng prefix (bao gồm trailing slash và subpath). Thêm fail-closed: nếu `process.env.NODE_ENV === 'production'` và `ODS_INTERNAL_DEV_OPEN === 'true'` thì throw. Giữ nguyên toàn bộ logic rewrite Markdown negotiation.
- `harness/tests/routes.test.mjs` — tự spawn `next dev` trên port rảnh, chờ ready, chạy test, kill server. Ép `ODS_INTERNAL_DEV_OPEN` về undefined trong tiến trình con. Thêm 2 case: `/api/search/internal/` và `/internal/` đều phải 401.
- `.github/workflows/ci.yml` — thêm trigger `push: branches: [main]`; thêm step `check:env`, `check:links`, `check:scope`; bỏ step "Guard tren artifact da build" trùng lặp và thay bằng `test:routes`.
- `AGENTS.md` — xoá câu "Không có phân vai, không có task file"; thay bằng quy ước task file và branch/PR bắt buộc; bổ sung `check:links`, `check:env`, `check:scope`, `verify:task` vào mục lệnh; thêm yêu cầu đọc `DECISIONS.md`.
- `tasks/TASK-TEMPLATE.md` — thêm frontmatter `status`, `branch`, `commit`, `verified-by`; đổi đường dẫn tuyệt đối thành relative.
- `tasks/TASK-001-hai-vung-tai-lieu.md` — chỉ thêm frontmatter phản ánh trạng thái thật. Không sửa nội dung.
- `DECISIONS.md` — đổi đường dẫn tuyệt đối thành relative; thêm ADR-004 ghi lại quyết định gate CI + phase lock + scope enforcement.

Xoá: không xoá file nào.

## Ngoài phạm vi

- Không cài dependency mới. Toàn bộ script dùng Node built-in (`node:fs`, `node:path`, `node:child_process`).
- Không cài husky. Nếu cần git hook, dùng `core.hooksPath` và ghi hướng dẫn vào `tasks/README.md`, không tự cấu hình git của máy.
- Không tích hợp next-auth. Vẫn giữ cơ chế cờ dev.
- Không sửa `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`.
- Không đổi version của bất kỳ package nào.
- Không tạo `Dockerfile`, `Caddyfile`.
- Không sửa nội dung trong `content/**` ngoài việc phải sửa link gãy nếu linter phát hiện.
- Không tự bật branch protection trên GitHub (Human làm bằng tay).

## Ràng buộc kiến trúc

1. **Mọi check phải chạy bằng máy, không tốn token, kết quả giống nhau mỗi lần.** Không check nào được phụ thuộc vào LLM hay mạng ngoài.
2. **Monotonic phase.** Phase chỉ được đi lên, không đi xuống. Guard phải FAIL khi phase thực tế thấp hơn phase đã khai.
3. **Fail-closed.** Mọi cơ chế bảo vệ khi gặp trạng thái không xác định phải chặn, không mở.
4. **Không đổi hành vi 9 check hiện có của guard.** Output phải giữ định dạng `Guard PASS.` / `Guard FAIL:` để CI và `check-commit.mjs` không vỡ.
5. Ba lớp bảo vệ public/internal trong ADR-001 phải giữ nguyên nguyên tắc. Task này chỉ siết chặt, không nới.
6. `scope-check.mjs` phải không chặn khi không tìm thấy task file tương ứng với branch — in cảnh báo, exit 0. Chỉ FAIL khi có allowlist rõ ràng và có file vượt ngoài.

## Tiêu chí nghiệm thu

1. `npm run typecheck` không lỗi.
2. `npm run guard` in `Guard PASS.` và dòng phase hiển thị đúng phase từ `.harness/phase.json`.
3. `npm run check:env` pass. Sau đó tạo tạm file `.env` chứa một dòng bất kỳ, chạy lại phải FAIL. Xoá file, chạy lại phải PASS.
4. `npm run check:links` pass.
5. `npm run build` thành công.
6. `npm run test:routes` tự khởi động server, pass toàn bộ 7 case, và **tự tắt server** khi kết thúc.
7. `npm run verify:task` chạy được toàn bộ chuỗi trên bằng một lệnh và trả exit code 0.
8. Thử đổi `.harness/phase.json` thành phase thấp hơn hoặc rename tạm `content/internal` → `npm run guard` phải FAIL với mã `10-phase-lock`. Hoàn nguyên sau khi thử.
9. Thử thêm `tasks/TASK-999-thu.md` với `status: done` nhưng không có report → guard FAIL với mã `13-task-evidence`. Xoá file sau khi thử.
10. Đặt `NODE_ENV=production ODS_INTERNAL_DEV_OPEN=true` rồi `npm run build` → phải lỗi rõ ràng, không build ra artifact mở vùng nội bộ.
11. Kiểm tra không còn đường dẫn tuyệt đối (file protocol) trong `tasks/` và `DECISIONS.md`.
12. `grep -n "không có task file" AGENTS.md` không còn kết quả.

## Cách kiểm chứng

Chạy tuần tự, dừng ngay khi có lỗi:

```bash
npm run typecheck
npm run check:env
npm run guard
npm run check:links
npm run build
npm run test:routes
npm run verify:task
```

Sau đó chạy 4 thử nghiệm negative ở tiêu chí 3, 8, 9, 10 và hoàn nguyên mọi thay đổi tạm.

## Điều kiện dừng

Dừng lại và báo Human, đừng tự quyết, nếu:

1. Phải cài thêm package để hoàn thành bất kỳ mục nào.
2. Sửa ba lượt mà `npm run build` hoặc `npm run test:routes` vẫn hỏng. Ghi rõ số lần đã thử vào report.
3. Phải sửa file ngoài danh sách mục Phạm vi.
4. Cần đổi hành vi của 9 check hiện có trong `guard.mjs` để làm cho check mới chạy được.
5. Việc sửa `isInternalPath` làm vỡ logic rewrite Markdown negotiation.
6. API của Next.js 16 proxy khác với mô tả trong task này — đọc types thật trong `node_modules`, không đoán.

## Báo cáo khi hoàn thành

Ghi vào `.harness/reports/TASK-002-report.md`, bắt buộc gồm:

- Danh sách file đã tạo / sửa / xoá, đối chiếu với mục Phạm vi. Nêu rõ mọi sai lệch kèm lý do.
- Output **thật** của từng lệnh ở mục Cách kiểm chứng, kèm exit code. Không viết mô tả thay cho output.
- Kết quả 4 thử nghiệm negative, kèm mã check đã FAIL đúng như kỳ vọng.
- Số lần thử lại cho mỗi bước gặp lỗi.
- Giới hạn còn lại và những gì Human phải làm tay (bật branch protection, cài `core.hooksPath`).

Không báo PASS nếu chưa chạy thật. Chưa chạy được thì ghi rõ lý do.
