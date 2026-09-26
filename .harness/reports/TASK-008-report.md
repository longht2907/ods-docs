# TASK-008 — Báo cáo nghiệm thu

## Kết quả

- `odsSolutionGroups` là catalog canonical cho toàn bộ sản phẩm ODS. Mỗi product có
  `name`, `productUrl` và `docsSlug` tùy chọn; `docsUrl` ở cấp solution group đã được loại bỏ.
- `docsProducts` được derive từ các product có `docsSlug` và chỉ bổ sung metadata dành
  riêng cho tài liệu: mô tả, accent, capabilities và danh sách section typed.
- AI Contact Center và CloudFile là hai product có tài liệu. AI Contact Center có hai
  section `Hướng dẫn sử dụng` và `API Reference`; CloudFile dùng product root hiện tại
  làm section hướng dẫn.
- Solution Map mở đúng tài liệu nội bộ cho product có `docsSlug`; các product còn lại mở
  product page ODS tương ứng. Voice OTP dùng trang AI Contact Center thay cho URL 404 cũ.
- `/docs` render động từ registry, chỉ giữ phần giới thiệu ngắn và danh mục hai product;
  hero, workflow và support trùng với Home đã được loại bỏ.
- Product tab và section tab tra cứu metadata bằng exact `href`; không còn hard-code tên,
  icon hoặc ghép tab bằng `startsWith`.
- `user-guider-portal` và `api` đều là Fumadocs root độc lập. Page Tree vẫn lấy từ
  `meta.json`, còn metadata trình bày lấy từ registry.
- API Reference giữ layout hiện có, có code tab cURL, Python, Node.js và PHP. Chuỗi token
  được thay bằng placeholder; grid và table được giới hạn để không gây page overflow.
- Guard parse TypeScript registry bằng Babel parser có sẵn trong Next.js, không thêm
  dependency và không dùng regex để suy đoán source.
- Không thay đổi auth, proxy, public/internal boundary, search source, sitemap, deploy
  hoặc URL `user-guider-portal`.

## File thay đổi

### Tạo

- `src/components/docs/docs-product-directory.tsx`
- `tasks/TASK-008-docs-registry-tabs.md`
- `.harness/reports/TASK-008-report.md`
- `.harness/reports/assets/TASK-008/desktop-home.png`
- `.harness/reports/assets/TASK-008/tablet-docs.png`
- `.harness/reports/assets/TASK-008/desktop-api.png`
- `.harness/reports/assets/TASK-008/mobile-home.png`
- `.harness/reports/assets/TASK-008/mobile-docs.png`
- `.harness/reports/assets/TASK-008/mobile-api.png`

### Sửa

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

## Guard registry

Guard mới kiểm tra fail-closed các điều kiện sau:

- solution group không còn `docsUrl`;
- `docsSlug` không trùng và có `content/docs/<slug>/meta.json`;
- tập product có `docsSlug` khớp chính xác tập profile trong `docsProducts`;
- product root có `root: true` và `title` khớp canonical product name;
- mọi section `href` ánh xạ tới content/meta tồn tại;
- section dùng làm tab có `root: true` và title khớp registry;
- tập Fumadocs product root khớp tập product có tài liệu trong registry.

## Kiểm chứng tự động

### Kiểm tra trong quá trình triển khai

- `npm run typecheck` — PASS.
- `npm run check:links` — PASS.
- `npm run guard` — PASS.
- `npm run check:scope` — PASS.
- `git diff --check` — PASS; chỉ có cảnh báo LF/CRLF của Git trên Windows.
- `npm run build` sau tinh chỉnh responsive API — PASS với 170/170 static pages.

### Gate chính

`npm run verify:task` — PASS, exit code 0:

- `next typegen` và TypeScript — PASS.
- `check:env` — PASS.
- `check:links` — PASS.
- `guard` — PASS (`Guard PASS.`).
- `check:scope` — PASS.
- `next build` — PASS với 170/170 static pages.
- `test:routes` — PASS 12/12:
  - `/`, `/docs`, hai product root, Portal guide, API và `/api/search` trả 200;
  - `/internal`, `/internal/`, `/internal/onboarding`, `/api/search/internal` và trailing
    slash tiếp tục trả 401.

Build còn cảnh báo `metadataBase` chưa được cấu hình. Đây là cảnh báo baseline ngoài phạm
vi TASK-008 và không làm build thất bại.

## Kiểm tra runtime và giao diện

- Production server cục bộ chạy từ production build tại `http://localhost:3108`.
- Desktop 1440px:
  - Home hiển thị từng product chip với đích điều hướng riêng trong Solution Map.
  - API giữ sidebar, vùng nội dung và code panel sticky; bốn code tab hiển thị đúng.
- Tablet 768px:
  - `/docs` hiển thị danh mục tiếng Việt, hai product card và section link từ registry.
- Edge DevTools Protocol device emulation tại 390px:
  - Home: `innerWidth = 390`, document/body `scrollWidth = 390`.
  - `/docs`: `innerWidth = 390`, document/body `scrollWidth = 390`.
  - API: `innerWidth = 390`, document/body `scrollWidth = 390`.
  - Bảng tham số có vùng scroll cục bộ khi cần, không gây overflow ngang toàn trang.
  - Code panel xếp dưới nội dung ở màn hình nhỏ.
- Native product selector hiển thị AI Contact Center/CloudFile; section selector của AI
  Contact Center hiển thị `Hướng dẫn sử dụng` hoặc `API Reference` theo route active.
- Ảnh nghiệm thu nằm trong `.harness/reports/assets/TASK-008/`.

Browser automation tích hợp không cung cấp Node REPL trong phiên làm việc này. Kiểm tra
responsive được thực hiện bằng production server cục bộ và Edge DevTools Protocol với
device metrics thật; đây chỉ là giới hạn công cụ, không phải giới hạn của ứng dụng.

## Trạng thái bàn giao

- Task giữ `status: in-progress` cho tới khi Pull Request CI xanh.
- Human thực hiện merge và finalization; TASK-009 xử lý đổi URL `user-guider-portal` cùng
  redirect sau khi được duyệt riêng.
