---
status: in-progress
branch: task/TASK-008-docs-registry-tabs
commit: ""
verified-by: npm run verify:task
---

# TASK-008 — Chuẩn hóa registry và điều hướng tài liệu

## Bối cảnh

Home và `/docs` đang khai báo lặp metadata sản phẩm; `ods-solutions.ts` gắn `docsUrl`
ở cấp nhóm nên nhóm Cloud điều hướng sai toàn bộ về CloudFile. Product tabs còn hard-code
tên/icon trong layout, còn Portal guide và API chưa là hai root con độc lập của Fumadocs.

## Mục tiêu

Dùng catalog sản phẩm làm nguồn dữ liệu canonical, derive registry tài liệu có type an toàn,
tự sinh danh mục `/docs`, điều hướng từng product đúng đích và tạo hai tab con Hướng dẫn/API
cho AI Contact Center mà không đổi URL hiện có.

## Phạm vi

### Tạo mới

- `src/components/docs/docs-product-directory.tsx`
- `tasks/TASK-008-docs-registry-tabs.md`
- `.harness/reports/TASK-008-report.md`
- `.harness/reports/assets/TASK-008/**`

### Sửa đổi

- `src/lib/ods-solutions.ts`
- `src/lib/docs-products.ts`
- `src/lib/layout.shared.tsx`
- `src/app/(home)/page.tsx`
- `src/app/docs/layout.tsx`
- `src/components/docs/api-reference-layout.tsx`
- `src/components/mdx.tsx`
- `content/docs/index.mdx`
- `content/docs/meta.json`
- `content/docs/ai-contact-center/meta.json`
- `content/docs/cloudfile/meta.json`
- `content/docs/ai-contact-center/user-guider-portal/meta.json`
- `content/docs/ai-contact-center/api/meta.json`
- `content/docs/ai-contact-center/api/index.mdx`
- `harness/guard.mjs`
- `harness/tests/routes.test.mjs`

## Ngoài phạm vi

- Không đổi URL `user-guider-portal` và không thêm redirect; việc này thuộc task riêng.
- Không thay đổi auth, `src/proxy.ts`, search source, sitemap, `llms.txt` hoặc vùng internal.
- Không thêm dependency, endpoint API, secret, cấu hình deploy hoặc OAuth.
- Không xây lại API layout; chỉ dùng layout ba vùng hiện có và chuẩn hóa nội dung/tab.

## Ràng buộc kiến trúc và kỹ thuật

- Tuân thủ `AGENTS.md`, `DECISIONS.md`, TypeScript strict và API thật của Fumadocs 16.15.10.
- Page Tree từ `meta.json` tiếp tục là nguồn sidebar; registry chỉ cung cấp metadata trình bày
  và ánh xạ sản phẩm có tài liệu.
- Không dùng `any`, type cast để lách compiler hoặc parser source bằng regex mong manh.
- Guard phải fail-closed khi registry và cây content lệch nhau.

## Tiêu chí nghiệm thu

- [x] `odsSolutionGroups[].products` dùng object typed; `docsUrl` không còn ở cấp group.
- [x] `docsProducts` derive từ product có `docsSlug`; AI Contact Center có guide/API,
      CloudFile có guide trỏ product root.
- [x] Solution Map điều hướng từng product tới docs nội bộ hoặc product page chính xác.
- [x] `/docs` render động đúng hai product và chỉ còn danh mục gọn bằng tiếng Việt.
- [x] Product tabs và section tabs lấy tên/icon từ registry, không hard-code theo URL prefix.
- [x] Portal guide và API có `root: true`; sidebar cô lập theo section đang mở.
- [x] API code tabs gồm cURL, Python, Node.js và PHP; không chứa token giống credential.
- [x] Guard phát hiện duplicate/missing docs slug, meta root/title lệch và section route sai.
- [x] `/`, `/docs`, hai product root, Portal guide, API và public search trả 200;
      toàn bộ route internal hiện hành tiếp tục trả 401.
- [x] Desktop 1440px, tablet 768px và mobile 390px không overflow; code panel sticky trên
      desktop và xếp dưới nội dung trên màn hình nhỏ.
- [x] `npm run verify:task` và `git diff --check` thành công.

## Điều kiện dừng

Dừng và hỏi Human nếu cần đổi URL public, auth/public-internal boundary, dependency, test
hiện có hoặc cấu hình deploy để hoàn thành task.

## Báo cáo khi hoàn thành

- Liệt kê file đã sửa, output kiểm chứng và ảnh runtime có liên quan.
- Giữ `status: in-progress` cho tới khi Pull Request CI xanh; Human merge và finalization.
