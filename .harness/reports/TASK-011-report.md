# TASK-011 — Báo cáo nghiệm thu

## Kết quả

- Hero định vị trực tiếp `/` là **Trung tâm tài liệu ODS** dành cho bốn nhóm người dùng
  phía khách hàng: Quản trị viên, Developer, Agent và Giám sát.
- Hero giữ search, ba suggestion link và một CTA duy nhất cuộn tới danh mục sản phẩm;
  CTA “Xem toàn bộ tài liệu” đã được loại bỏ.
- Preview Portal/API/CloudFile và dải metrics cũ đã được xóa. Hero mới dùng Solution Map
  server-render từ đủ năm nhóm canonical trong `odsSolutionGroups`.
- Năm solution có cùng visual weight, không còn badge, legend hoặc màu phân biệt trạng thái
  tài liệu; mọi item luôn mở `productUrl` chính thức trên `ods.vn`.
- Header `Tài liệu` là link trực tiếp `/docs`; dropdown “Tất cả tài liệu” và product list
  trùng lặp đã được loại bỏ.
- Product Bento hard-code được thay bằng `ProductDocsDirectory` generic. Component map trực
  tiếp toàn bộ `docsProducts` và chỉ dùng metadata typed của từng product/section.
- Thêm product docs mới vào registry không yêu cầu sửa Home JSX hoặc component directory.
- Role explorer được mở rộng thành bốn tab; Agent có ba link public đã được
  `source.getPageByUrl()` kiểm tra fail-closed.
- Support strip và footer được giữ, đồng thời copy được rút gọn theo mục đích người dùng.
- Không thêm dependency và không sửa nội dung MDX, URL public, search, auth, sitemap,
  deploy hoặc public/internal boundary.

## File thay đổi

### Tạo

- `src/components/home/solution-map.tsx`
- `src/components/home/product-docs-directory.tsx`
- `tasks/TASK-011-home-docs-clarity.md`
- `.harness/reports/TASK-011-report.md`
- `.harness/reports/assets/TASK-011/**`

### Sửa

- `src/app/(home)/page.tsx`
- `src/app/global.css`
- `src/components/home/role-guides.tsx`
- `src/lib/home-content.ts`
- `src/lib/layout.shared.tsx`
- `harness/tests/routes.test.mjs`

### Xóa

- `src/components/home/hero-preview.tsx`

## Kiểm chứng tự động

- `npm run typecheck` — PASS.
- `npm run check:links` — PASS.
- `npm run guard` — PASS (`Guard PASS.`).
- `npm run check:scope` — PASS; toàn bộ file nằm trong scope TASK-011.
- `git diff --check` — PASS; chỉ có cảnh báo LF/CRLF của Git trên Windows.
- `npm run verify:task` — PASS, exit code 0:
  - `types:check`, env guard, link checker, guard và scope check đều PASS;
  - production build tạo thành công `170/170` static pages;
  - route tests PASS `12/12`.
- Runtime route tests xác nhận Home và toàn bộ public docs hiện hành trả `200`; năm trường
  hợp `/internal/**` và internal search tiếp tục trả `401`.
- Build tiếp tục có cảnh báo baseline `metadataBase` chưa được cấu hình; cảnh báo này đã có
  trước TASK-011 và nằm ngoài phạm vi task.

## Kiểm tra runtime và giao diện

Kiểm tra bằng Edge DevTools Protocol trên dev server `localhost:3101`:

- Desktop 1440px: `innerWidth = 1440`, document width `1425`, `scrollX = 0`.
- Tablet 768px: `innerWidth = 768`, document width `753`, `scrollX = 0`.
- Mobile 390px: `innerWidth = document/body scrollWidth = 390`, `scrollX = 0`.
- Header có đúng một link có text `Tài liệu`, với `href="/docs"`.
- Solution Map có đúng 5 item; tất cả dùng `target="_blank"` và URL bắt đầu bằng
  `https://ods.vn/`.
- Product directory có đúng 2 card tương ứng registry hiện tại.
- Role explorer có đúng 4 tab; click chọn Agent thành công và `ArrowRight` chuyển selection
  cùng focus từ Quản trị viên sang Developer.
- DOM không còn các copy `sản phẩm có tài liệu`, `Xem toàn bộ tài liệu` hoặc
  `Tất cả tài liệu`; không có link bắt đầu bằng `/internal`.

Ảnh nghiệm thu:

- `desktop-home.png`
- `desktop-products.png`
- `desktop-roles.png`
- `tablet-home.png`
- `mobile-home.png`
- `mobile-products.png`

## Giới hạn môi trường

- Browser automation tích hợp không có Node REPL trong phiên; Edge DevTools Protocol được
  dùng làm fallback để đo viewport, DOM, keyboard và tạo ảnh.
- Policy môi trường không cho xóa recursive các Edge profile tạm nằm ngoài workspace;
  các profile chỉ chứa dữ liệu headless local của phiên kiểm thử, không thuộc repository.

## Trạng thái bàn giao

- Task giữ `status: in-progress` cho tới khi Pull Request CI xanh.
- Human thực hiện merge và finalization.
