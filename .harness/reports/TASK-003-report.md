# Báo cáo Nghiệm thu TASK-003 — Chốt harness: dọn cấu trúc và bịt lỗ hổng kiểm soát

- **Task**: `tasks/TASK-003-chot-harness.md`
- **Branch**: `task/TASK-003-chot-harness`
- **Commit**: (sẽ cập nhật hash cuối sau khi commit)
- **Trạng thái**: in-progress
- **Kiểm chứng bởi**: `npm run verify:task`

---

## 1. Đối chiếu danh sách file với mục Phạm vi

### Tạo mới:
- `harness/guard.mjs` — khớp spec. Chuyển từ `scripts/guard.mjs`, cập nhật tự tham chiếu và siết chặt `2-frontmatter`.
- `harness/README.md` — khớp spec. Giải thích vai trò `harness/` vs `.harness/`.
- `tasks/TASK-003-chot-harness.md` — khớp quy trình. Đặc tả task spec.
- `.harness/reports/TASK-003-report.md` — khớp quy trình. Báo cáo nghiệm thu này.

### Sửa đổi:
- `harness/linters/scope-check.mjs` — khớp spec. Ưu tiên `GITHUB_HEAD_REF`, `GITHUB_REF_NAME` trước khi hỏi git.
- `harness/tests/routes.test.mjs` — khớp spec. Chuyển sang `next start`, bỏ đoạn follow-redirect 308.
- `package.json` — khớp spec. Cập nhật script `guard` trỏ tới `node harness/guard.mjs`.
- `.github/workflows/ci.yml` — khớp spec. Bổ sung `fetch-depth: 0` cho `actions/checkout@v4`.
- `AGENTS.md` — khớp spec. Cập nhật đường dẫn `guard.mjs`, bổ sung 2 luật mới vào mục "Cách làm việc".
- `README.md` — khớp spec. Viết lại toàn bộ theo cấu trúc yêu cầu (Kiến trúc, Cấu trúc cây 3 tầng, Bắt đầu, Bảng lệnh, Quy trình đóng góp, Liên kết).
- `tasks/README.md` — khớp spec. Cập nhật tham chiếu `scripts/guard.mjs` thành `harness/guard.mjs`.
- `DECISIONS.md` — khớp spec. Cập nhật link guard, thêm ADR-005 ghi lại phân tách 3 tầng cấu trúc.
- `tasks/TASK-002-dong-vong-harness.md` — khớp spec. Đổi `commit: 282d448` thành `commit: f419613`; đồng thời cập nhật chuỗi `scripts/guard.mjs` thành `harness/guard.mjs` để thỏa mãn tiêu chí nghiệm thu 6.
- `.harness/reports/TASK-002-report.md` — khớp spec. Đổi commit thành `f419613`; cập nhật chuỗi `scripts/guard.mjs` thành `harness/guard.mjs`.
- `tasks/TASK-001-hai-vung-tai-lieu.md` — bổ sung có phê duyệt. Cập nhật chuỗi `scripts/guard.mjs` thành `harness/guard.mjs` để thỏa mãn tiêu chí nghiệm thu 6.
- `next.config.mjs` — bổ sung có phê duyệt của Human. Thêm `skipTrailingSlashRedirect: true` để Next.js router không tự động redirect 308 trước proxy, cho phép `src/proxy.ts` chặn 401 trực tiếp tại request đầu tiên.

### Xóa:
- `scripts/guard.mjs` — khớp spec. Đã xóa khỏi git, thư mục `scripts/` biến mất khỏi codebase.

---

## 2. Output thật của từng lệnh nghiệm thu

Môi trường kiểm tra: Chạy sau khi xoá sạch `.next`, chạy `npm ci` cài đặt sạch.

### 2.1. `npm run check:env` (Exit code: 0)
```
> ods-docs@0.0.28 check:env
> node harness/linters/env-guard.mjs

[env-guard PASS] Toàn bộ file cấu hình môi trường đều an toàn.
```

### 2.2. `npm run check:links` (Exit code: 0)
```
> ods-docs@0.0.28 check:links
> node harness/linters/broken-links.mjs

[Linter] Toàn bộ liên kết nội bộ trong MDX đều hợp lệ.
```

### 2.3. `npm run check:scope` (Exit code: 0)
```
> ods-docs@0.0.28 check:scope
> node harness/linters/scope-check.mjs

[scope-check PASS] Toàn bộ file thay đổi đều nằm trong phạm vi của TASK-003.
```

### 2.4. `npm run types:check` (Exit code: 0)
```
> ods-docs@0.0.28 types:check
> next typegen && tsc --noEmit

Generating route types...
✓ Types generated successfully
```

### 2.5. `npm run guard` (Exit code: 0)
```
> ods-docs@0.0.28 guard
> node harness/guard.mjs

Guard - giai doan: internal

Guard PASS.
```
*(Xác nhận không có bất kỳ dòng cảnh báo nào về `description`)*.

### 2.6. `npm run build` (Exit code: 0)
```
> ods-docs@0.0.28 build
> next build

▲ Next.js 16.3.4 (Turbopack)
✓ Running next.config.mjs took 237ms

  Creating an optimized production build ...
✓ Compiled successfully in 71s
  Running TypeScript ...
  Finished TypeScript in 3.4s ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/14) ...
⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
  Generating static pages using 3 workers (3/14) 
  Generating static pages using 3 workers (6/14) 
  Generating static pages using 3 workers (10/14) 
✓ Generating static pages using 3 workers (14/14) in 2.3s
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

### 2.7. `npm run test:routes` (Exit code: 0)
```
> ods-docs@0.0.28 test:routes
> node harness/tests/routes.test.mjs

[test:routes] Khởi động Next production server tại http://127.0.0.1:26480...
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

### 2.8. `npm run verify:task` (Exit code: 0)
```
> ods-docs@0.0.28 verify:task
> npm run verify:code && npm run check:scope && npm run build && npm run test:routes

> ods-docs@0.0.28 verify:code
> npm run types:check && npm run check:env && npm run check:links && npm run guard

> ods-docs@0.0.28 types:check
> next typegen && tsc --noEmit

Generating route types...
✓ Types generated successfully

> ods-docs@0.0.28 check:env
> node harness/linters/env-guard.mjs

[env-guard PASS] Toàn bộ file cấu hình môi trường đều an toàn.

> ods-docs@0.0.28 check:links
> node harness/linters/broken-links.mjs

[Linter] Toàn bộ liên kết nội bộ trong MDX đều hợp lệ.

> ods-docs@0.0.28 guard
> node harness/guard.mjs

Guard - giai doan: internal

Guard PASS.

> ods-docs@0.0.28 check:scope
> node harness/linters/scope-check.mjs

[scope-check PASS] Toàn bộ file thay đổi đều nằm trong phạm vi của TASK-003.

> ods-docs@0.0.28 build
> next build

▲ Next.js 16.3.4 (Turbopack)
✓ Running next.config.mjs took 313ms

  Creating an optimized production build ...
✓ Compiled successfully in 13.1s
  Running TypeScript ...
  Finished TypeScript in 1720ms ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/14) ...
⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
  Generating static pages using 3 workers (3/14) 
  Generating static pages using 3 workers (6/14) 
  Generating static pages using 3 workers (10/14) 
✓ Generating static pages using 3 workers (14/14) in 1813ms
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

> ods-docs@0.0.28 test:routes
> node harness/tests/routes.test.mjs

[test:routes] Khởi động Next production server tại http://127.0.0.1:26523...
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

## 3. Output thật của 4 thử nghiệm Negative

### 3.1. Negative Test N1: Thiếu description trong file MDX
- **Thao tác**: Tạo tạm `content/docs/thu.mdx` có `title: Thu nghiem N1` nhưng không có trường `description`, chạy `npm run guard`.
- **Output thực tế (Exit code: 1)**:
```
> ods-docs@0.0.28 guard
> node harness/guard.mjs

Guard - giai doan: internal

Guard FAIL:
  [2-frontmatter] content/docs/thu.mdx thieu description

1 loi.
```
- **Hoàn nguyên**: Đã xóa `content/docs/thu.mdx`. Chạy lại `npm run guard` in `Guard PASS.` (Exit code: 0).

### 3.2. Negative Test N2: Thay đổi file ngoài allowlist
- **Thao tác**: Trên nhánh `task/TASK-003-chot-harness`, tạo tạm file `src/app/thu.tsx`, chạy `$env:GITHUB_HEAD_REF="task/TASK-003-chot-harness"; npm run check:scope`.
- **Output thực tế (Exit code: 1)**:
```
> ods-docs@0.0.28 check:scope
> node harness/linters/scope-check.mjs

[scope-check FAIL] Có 1 file thay đổi nằm ngoài phạm vi tasks/TASK-003-chot-harness.md:
  ✗ src/app/thu.tsx
```
- **Hoàn nguyên**: Đã xóa `src/app/thu.tsx`, hủy biến `$env:GITHUB_HEAD_REF`. Chạy lại `npm run check:scope` in `[scope-check PASS]` (Exit code: 0).

### 3.3. Negative Test N3: Chạy check:scope ở trạng thái detached HEAD không có env vars
- **Thao tác**: Đặt `GITHUB_HEAD_REF=""`, `GITHUB_REF_NAME=""` và chuyển sang detached HEAD (`git checkout --detach`), chạy `npm run check:scope`.
- **Output thực tế (Exit code: 0)**:
```
> ods-docs@0.0.28 check:scope
> node harness/linters/scope-check.mjs

[scope-check] Nhánh "HEAD" không phải nhánh task. Bỏ qua.
```
- **Hoàn nguyên**: Đã checkout lại nhánh `task/TASK-003-chot-harness`.

### 3.4. Negative Test N4: Tạo file `.env` có nội dung
- **Thao tác**: Tạo tạm file `.env` chứa `ODS_SECRET=test1234`, chạy `npm run check:env`.
- **Output thực tế (Exit code: 1)**:
```
> ods-docs@0.0.28 check:env
> node harness/linters/env-guard.mjs

[env-guard FAIL]
  ✗ File .env tồn tại trên đĩa và có chứa nội dung. Quy tắc dự án cấm .env (dùng .env.local cho dev).
```
- **Hoàn nguyên**: Đã xóa file `.env`. Chạy lại `npm run check:env` in `[env-guard PASS]` (Exit code: 0).

---

## 4. Danh sách file MDX đã bổ sung description
- Đã kiểm tra toàn bộ thư mục `content/`: Toàn bộ 5 file MDX hiện có (`content/docs/index.mdx`, `content/internal/index.mdx`, `content/internal/onboarding/index.mdx`, `content/internal/quy-trinh/index.mdx`, `content/internal/runbook/index.mdx`) đều đã có trường `description` hợp lệ từ trước.
- Không có file nào thiếu `description`.

---

## 5. Số lần thử lại cho mỗi bước gặp lỗi & Khắc phục

### Bước 4b: Xử lý trailing slash 308
- **Hiện tượng**: Khi bỏ đoạn `res.status === 308` trong `routes.test.mjs`, hai route `/internal/` và `/api/search/internal/` trả về mã 308 thay vì 401.
- **Thử nghiệm 1**: Thêm `matcher: ['/:path*']` vào `src/proxy.ts`. Kết quả: Vẫn 308.
- **Thử nghiệm 2**: Sử dụng named export `export function proxy` và khai báo matcher cụ thể cho `/internal/:path*`. Kết quả: Vẫn 308.
- **Thử nghiệm 3**: Đổi sang `export function middleware`. Kết quả: Vẫn 308.
- **Nguyên nhân gốc rễ**: Next.js 16 Router chạy bước `fsChecker.redirects` trước khi gọi `middleware`/`proxy.ts`. Khi `trailingSlash: false` (mặc định), Next.js tự động chuyển hướng 308 cho mọi đường dẫn có trailing slash.
- **Khắc phục**: Đã trình bày vấn đề trong `implementation_plan.md` và được Human phê duyệt bổ sung `skipTrailingSlashRedirect: true` vào `next.config.mjs`. Sau khi cấu hình, Next.js nhường quyền xử lý trailing slash cho `src/proxy.ts`, và cả 2 route đều trả về **401 trực tiếp ngay tại request đầu tiên**.

---

## 6. Những chỗ đã cân nhắc nới chuẩn nhưng không nới

- **Không khôi phục đoạn follow-redirect trong `routes.test.mjs`**: Khi gặp 308 ở 3 lần thử đầu tiên trên `src/proxy.ts`, chúng tôi tuyệt đối **không** nới test bằng cách follow 308 như trong TASK-002, mà kiên định tìm nguyên nhân gốc rễ trong mã nguồn router Next.js, đưa ra phương án kỹ thuật chuẩn và xin phê duyệt từ Human để xử lý triệt để tại `next.config.mjs`.
- **Không nới lỏng check:scope trên detached HEAD**: Không cho phép script tự động bypass khi có biến môi trường CI; chỉ bypass khi hoàn toàn không có `GITHUB_HEAD_REF`/`GITHUB_REF_NAME` và branch thật là `HEAD`.
- **Không sửa lỏng regex kiểm tra secret và frontmatter**: Chuyển hẳn `warn` thành `fail` đối với `description` theo đúng tuyên ngôn bất biến trong `AGENTS.md`.

---

## 7. Hash commit thật cuối cùng
- (Sẽ được cập nhật sau khi mở PR và hoàn tất commit cuối cùng theo lệnh `git rev-parse --short HEAD`).

---

## 8. Giới hạn còn lại & Những việc Human phải làm tay
1. **Branch Protection**: Cần kích hoạt Branch Protection trên GitHub cho repo `longht2907/ods-docs` trên nhánh `main` (yêu cầu CI xanh và PR review trước khi merge).
2. **Kích hoạt Git Hook trên máy cá nhân**: Developer / Agent chạy lệnh sau nếu muốn kích hoạt pre-commit hook tự động:
   ```bash
   git config core.hooksPath harness/hooks
   ```
