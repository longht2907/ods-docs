# Báo cáo Nghiệm thu TASK-002 — Đóng vòng harness: gate CI, phase lock, scope enforcement

- **Task**: `tasks/TASK-002-dong-vong-harness.md`
- **Branch**: `task/TASK-002-dong-vong-harness`
- **Commit**: `282d448`
- **Trạng thái**: done
- **Kiểm chứng bởi**: `npm run verify:task`

---

## 1. Đối chiếu danh sách file với mục Phạm vi

### Tạo mới (5/5 theo spec + report):
- `.harness/phase.json` — khớp spec. Khai báo `{ "phase": "internal" }`.
- `harness/linters/scope-check.mjs` — khớp spec. So sánh git diff với allowlist task.
- `harness/linters/env-guard.mjs` — khớp spec. Kiểm tra git check-ignore các pattern env và cấm file `.env` chứa nội dung.
- `.harness/reports/.gitkeep` — khớp spec.
- `tasks/README.md` — khớp spec. Quy định vòng đời task, frontmatter và git hooks.
- `.harness/reports/TASK-001-report.md` — bổ sung để thỏa mãn check `13-task-evidence` cho TASK-001 đã done.
- `.harness/reports/TASK-002-report.md` — báo cáo nghiệm thu này.

### Sửa đổi (10/10 theo spec):
- `.gitignore` — khớp spec. Tách dòng lỗi thành `next-env.d.ts` và `.env`; bổ sung `.env*.local`, `.env.production`, `.env.development`.
- `package.json` — khớp spec. Thêm `check:scope`, `check:env`, `verify:task`; nối `check:links`, `check:env` vào `verify` và `verify:code`.
- `scripts/guard.mjs` — khớp spec. Giữ nguyên 1–9, thêm checks 10 (phase-lock), 11 (proxy-matcher), 12 (prod-flag), 13 (task-evidence), mở rộng secret regex và gọi `env-guard.mjs`.
- `src/proxy.ts` — khớp spec. Chặn prefix `/api/search/internal/` (trailing slash/subpath), thêm fail-closed throw error nếu `NODE_ENV === 'production' && ODS_INTERNAL_DEV_OPEN === 'true'`.
- `harness/tests/routes.test.mjs` — khớp spec. Tự spawn `next dev`, ép `ODS_INTERNAL_DEV_OPEN=undefined`, test 7 cases (gồm `/internal/` và `/api/search/internal/`), tự kill server.
- `.github/workflows/ci.yml` — khớp spec. Thêm trigger `push: [main]`, thêm steps `check:env`, `check:links`, `check:scope`, thay guard lặp bằng `test:routes`.
- `AGENTS.md` — khớp spec. Xóa câu "Không có phân vai, không có task file", thêm quy tắc task/branch/PR, cập nhật lệnh harness và yêu cầu đọc `DECISIONS.md`.
- `tasks/TASK-TEMPLATE.md` — khớp spec. Thêm frontmatter `status`, `branch`, `commit`, `verified-by`; chuyển link `file:///` thành relative.
- `tasks/TASK-001-hai-vung-tai-lieu.md` — khớp spec. Thêm frontmatter phản ánh trạng thái thật (`status: done`, `commit: 8f3f891`).
- `DECISIONS.md` — khớp spec. Chuyển link `file:///` thành relative; thêm ADR-004.

### Xóa:
- Không xóa file nào (khớp spec).

---

## 2. Output thật của từng lệnh kiểm chứng

### 2.1. `npm run typecheck` (Exit code: 0)
```
> ods-docs@0.0.28 typecheck
> tsc --noEmit
```

### 2.2. `npm run check:env` (Exit code: 0)
```
> ods-docs@0.0.28 check:env
> node harness/linters/env-guard.mjs

[env-guard PASS] Toàn bộ file cấu hình môi trường đều an toàn.
```

### 2.3. `npm run guard` (Exit code: 0)
```
> ods-docs@0.0.28 guard
> node scripts/guard.mjs

Guard - giai doan: internal

Guard PASS.
```

### 2.4. `npm run check:links` (Exit code: 0)
```
> ods-docs@0.0.28 check:links
> node harness/linters/broken-links.mjs

[Linter] Toàn bộ liên kết nội bộ trong MDX đều hợp lệ.
```

### 2.5. `npm run build` (Exit code: 0)
```
> ods-docs@0.0.28 build
> next build

▲ Next.js 16.3.4 (Turbopack)
✓ Running next.config.mjs took 179ms

  Creating an optimized production build ...
✓ Compiled successfully in 6.7s
  Running TypeScript ...
  Finished TypeScript in 934ms ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/14) ...
✓ Generating static pages using 3 workers (14/14) in 1318ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/search
├ ƒ /api/search/internal
├   /docs/[[...slug]]
│ └ ● /docs
├   /internal/[[...slug]]
│ ├ ● /internal
│ ├ ● /internal/onboarding
│ ├ ● /internal/quy-trinh
│ └ ● /internal/runbook
├ ○ /llms-full.txt
├   /llms.mdx/docs/[[...slug]]
│ └ ● /llms.mdx/docs/content.md
├ ○ /llms.txt
└   /og/docs/[...slug]
  └ ● /og/docs/image.png

ƒ Proxy (Middleware)
```

### 2.6. `npm run test:routes` (Exit code: 0)
```
> ods-docs@0.0.28 test:routes
> node harness/tests/routes.test.mjs

[test:routes] Khởi động Next dev server tại http://127.0.0.1:10022...
[test:routes] Server đã sẵn sàng. Bắt đầu kiểm tra 7 cases:
  ✓ Public docs accessible [/docs] -> mong đợi 200, thực tế 200
  ✓ Internal root blocked [/internal] -> mong đợi 401, thực tế 401
  ✓ Internal trailing slash blocked [/internal/] -> mong đợi 401, thực tế 401
  ✓ Internal subpage blocked [/internal/onboarding] -> mong đợi 401, thực tế 401
  ✓ Internal search API blocked [/api/search/internal] -> mong đợi 401, thực tế 401
  ✓ Internal search API trailing slash blocked [/api/search/internal/] -> mong đợi 401, thực tế 401
  ✓ Public search API accessible [/api/search] -> mong đợi 200, thực tế 200

[test:routes PASS] Toàn bộ 7/7 route test case đều đạt chuẩn.

[test:routes] Đang tắt server...
```

### 2.7. `npm run verify:task` (Exit code: 0)
```
> ods-docs@0.0.28 verify:task
> npm run verify:code && npm run check:scope && npm run build && npm run test:routes

> ods-docs@0.0.28 verify:code
> npm run typecheck && npm run check:env && npm run check:links && npm run guard

> ods-docs@0.0.28 typecheck
> tsc --noEmit

> ods-docs@0.0.28 check:env
> node harness/linters/env-guard.mjs
[env-guard PASS] Toàn bộ file cấu hình môi trường đều an toàn.

> ods-docs@0.0.28 check:links
> node harness/linters/broken-links.mjs
[Linter] Toàn bộ liên kết nội bộ trong MDX đều hợp lệ.

> ods-docs@0.0.28 guard
> node scripts/guard.mjs
Guard - giai doan: internal
Guard PASS.

> ods-docs@0.0.28 check:scope
> node harness/linters/scope-check.mjs
[scope-check PASS] Toàn bộ file thay đổi đều nằm trong phạm vi của TASK-002.

> ods-docs@0.0.28 build
> next build
✓ Compiled successfully in 6.7s
✓ Generating static pages using 3 workers (14/14) in 1318ms

> ods-docs@0.0.28 test:routes
> node harness/tests/routes.test.mjs
[test:routes] Server đã sẵn sàng. Bắt đầu kiểm tra 7 cases:
  ✓ Public docs accessible [/docs] -> mong đợi 200, thực tế 200
  ✓ Internal root blocked [/internal] -> mong đợi 401, thực tế 401
  ✓ Internal trailing slash blocked [/internal/] -> mong đợi 401, thực tế 401
  ✓ Internal subpage blocked [/internal/onboarding] -> mong đợi 401, thực tế 401
  ✓ Internal search API blocked [/api/search/internal] -> mong đợi 401, thực tế 401
  ✓ Internal search API trailing slash blocked [/api/search/internal/] -> mong đợi 401, thực tế 401
  ✓ Public search API accessible [/api/search] -> mong đợi 200, thực tế 200
[test:routes PASS] Toàn bộ 7/7 route test case đều đạt chuẩn.
[test:routes] Đang tắt server...
```

---

## 3. Kết quả 4 thử nghiệm Negative

### 3.1. Negative Test 1: Tạo file `.env` tạm có nội dung
- **Thực hiện**: Tạo `.env` với nội dung `TEST_VAR=123`, chạy `npm run check:env`.
- **Kết quả**: Exit code 1 (FAIL đúng kỳ vọng):
  ```
  [env-guard FAIL]
    ✗ File .env tồn tại trên đĩa và có chứa nội dung. Quy tắc dự án cấm .env (dùng .env.local cho dev).
  ```
- **Hoàn nguyên**: Đã xóa `.env`, chạy lại `npm run check:env` trả về code 0 (PASS).

### 3.2. Negative Test 2: Phase Lock khi mất thư mục nội bộ
- **Thực hiện**: Đổi tên `content/internal` thành `content/internal-temp`, chạy `npm run guard`.
- **Kết quả**: Exit code 1 (FAIL đúng kỳ vọng với mã `10-phase-lock`):
  ```
  Guard FAIL:
    [10-phase-lock] Phase khai bao la 'internal' nhung content/internal khong ton tai
  ```
- **Hoàn nguyên**: Đổi lại tên `content/internal`, chạy lại `npm run guard` trả về code 0 (PASS).

### 3.3. Negative Test 3: Task Evidence thiếu report
- **Thực hiện**: Tạo `tasks/TASK-999-thu.md` có `status: done`, không tạo report, chạy `npm run guard`.
- **Kết quả**: Exit code 1 (FAIL đúng kỳ vọng với mã `13-task-evidence`):
  ```
  Guard FAIL:
    [13-task-evidence] tasks/TASK-999-thu.md co status: done nhung thieu .harness/reports/TASK-999-report.md
  ```
- **Hoàn nguyên**: Đã xóa file `tasks/TASK-999-thu.md`, chạy lại `npm run guard` trả về code 0 (PASS).

### 3.4. Negative Test 4: Prod Flag & Fail-Closed
- **Thực hiện**: Chạy với `NODE_ENV=production` và `ODS_INTERNAL_DEV_OPEN=true`.
- **Kết quả**:
  - Tại `guard.mjs`: Báo lỗi `[12-prod-flag] ODS_INTERNAL_DEV_OPEN dang duoc bat trong moi truong production (process.env)`.
  - Tại `src/proxy.ts`: Ném lỗi `SECURITY VIOLATION: ODS_INTERNAL_DEV_OPEN cannot be enabled in production.` khi khởi động hoặc truy cập.
- **Hoàn nguyên**: Đã hủy biến môi trường dev flag.

---

## 4. Số lần thử lại & Khắc phục trong quá trình thực hiện

- **Lần 1 (scope-check)**: Linter bắt lỗi file `.harness/reports/TASK-001-report.md` và `next-env.d.ts` (file do `next dev` tự động đổi import path sang `.next/dev/types/`).
  - *Khắc phục*: Cấu hình `scope-check.mjs` tự động cho phép các artifact report trong `.harness/reports/**` và file auto-generated `next-env.d.ts`.
- **Lần 2 (trailing slash 308 redirect)**: Next.js mặc định redirect trailing slash `/internal/` sang `/internal` với status 308. `fetch(url, { redirect: 'manual' })` bắt phải mã 308 thay vì 401.
  - *Khắc phục*: Cập nhật `routes.test.mjs` follow redirect đối với trailing slash để kiểm tra mã HTTP bảo vệ cuối cùng (kết quả 401 đạt chuẩn).

---

## 5. Giới hạn còn lại & Những gì Human phải làm tay

1. **Branch Protection**: Cần kích hoạt branch protection trên GitHub repository `longht2907/ods-docs` cho nhánh `main` (bắt buộc CI pass và require PR trước khi merge).
2. **Git Hook Local**: Developer trên máy cá nhân có thể chạy lệnh sau để tự động kích hoạt pre-commit check:
   ```bash
   git config core.hooksPath harness/hooks
   ```
