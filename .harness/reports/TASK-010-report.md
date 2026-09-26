# TASK-010 — Báo cáo nghiệm thu

## Kết quả

- Home được tổ chức thành bảy khối có nhịp riêng: Hero preview, metrics, Product Bento,
  role explorer, hệ sinh thái ODS, support strip và footer bốn cột.
- Hero giữ thông điệp docs-first, tăng kích thước search và thêm ba suggestion link đã
  được kiểm tra tồn tại bằng public Fumadocs source.
- Preview Portal/API/CloudFile là UI mô phỏng bằng HTML/CSS, không dùng screenshot thật:
  - tự chuyển tab sau 6 giây;
  - dừng khi focus/hover, tab trình duyệt ẩn, người dùng tương tác hoặc bấm Pause;
  - hỗ trợ ArrowLeft/ArrowRight/Home/End và focus đúng tab active;
  - reduced motion tắt autoplay/typewriter và hiển thị code đầy đủ.
- Metrics lấy 9 chapter Portal từ Page Tree, capability API và số sản phẩm từ
  `docsProducts`; không khai báo lại số lượng trong JSX.
- AI Contact Center dùng Bento hai cột với ba chapter đầu và API snippet; CloudFile dùng
  card một cột thể hiện luồng Cloud → Đồng bộ → Chia sẻ.
- Role explorer có ba vai trò và đúng ba link cho mỗi vai trò. Tất cả internal link curated
  được `source.getPageByUrl()` xác thực fail-closed khi build.
- Solution Map chuyển xuống khu vực hệ sinh thái: AI Contact Center/CloudFile có accent và
  internal arrow; product chưa có docs dùng muted style và external link.
- Ba support card cũ được thay bằng gradient strip; footer có đúng bốn nhóm Sản phẩm,
  Tài liệu, Hỗ trợ và ODS.
- Accent semantic từ `docsProducts` đi qua `data-product-accent` và CSS variables dùng
  chung cho Home/Docs; `DocsThemeScope` không còn hard-code slug màu.
- Scroll reveal dùng CSS view timeline dưới `@supports`; browser không hỗ trợ vẫn hiển thị
  nội dung bình thường.
- Không thêm dependency, ảnh sản phẩm, metadata cập nhật hoặc thay đổi nội dung MDX,
  auth/public-internal boundary, search, sitemap và deploy.

## File thay đổi

### Tạo

- `src/lib/home-content.ts`
- `src/components/home/hero-preview.tsx`
- `src/components/home/role-guides.tsx`
- `tasks/TASK-010-home-experience.md`
- `.harness/reports/TASK-010-report.md`
- `.harness/reports/assets/TASK-010/**`

### Sửa

- `src/app/(home)/page.tsx`
- `src/app/global.css`
- `src/components/docs-theme-scope.tsx`
- `harness/tests/routes.test.mjs`

## Kiểm chứng tự động

- `npm run typecheck` — PASS.
- `npm run check:links` — PASS.
- `npm run guard` — PASS.
- `npm run check:scope` — PASS.
- `git diff --check` — PASS; chỉ có cảnh báo LF/CRLF của Git trên Windows.
- `npm run build` — PASS với 170/170 static pages.
- `npm run test:routes` — PASS 12/12:
  - Home trả 200 và HTML chứa `9 chương Portal`, `REST API và Webhook`,
    `2 sản phẩm có tài liệu`, Portal, API và CloudFile;
  - các public route hiện hành trả 200;
  - năm trường hợp internal tiếp tục trả 401.
- `npm run verify:task` — PASS, exit code 0.

Build tiếp tục có cảnh báo `metadataBase` chưa được cấu hình. Đây là cảnh báo baseline ngoài
phạm vi TASK-010 và không làm build thất bại.

## Kiểm tra runtime và giao diện

Production build được chạy cục bộ tại `http://127.0.0.1:3110` và kiểm tra bằng Edge DevTools
Protocol với device emulation thật:

- Desktop dark 1440px: `innerWidth = 1440`, document content width `1425` do scrollbar
  gutter, `scrollX = 0`; không overflow ngang.
- Tablet light 768px: `innerWidth = 768`, document content width `753`; không overflow.
- Mobile dark 390px: `innerWidth = document/body scrollWidth = 390`; không overflow.
- Autoplay: Portal tự chuyển sang API sau 6,3 giây.
- Focus pause: Portal vẫn active sau 6,3 giây khi tab đang focus.
- Keyboard: ArrowRight chọn API và focus chuyển đúng sang API.
- Typewriter: sau 350ms API code đã render 20 ký tự.
- Manual control: sau thao tác keyboard, control đổi từ `Tiếp tục tự chuyển tab` sang
  `Dừng tự chuyển tab` khi resume.
- Reduced motion: media query match, motion control disabled và toàn bộ placeholder token
  đã hiển thị ngay, không typewriter.

Ảnh nghiệm thu:

- `desktop-home.png`
- `desktop-bento.png`
- `desktop-roles.png`
- `desktop-ecosystem.png`
- `desktop-support-footer.png`
- `tablet-home-light.png`
- `mobile-home.png`
- `mobile-bento.png`

Browser automation tích hợp không cung cấp Node REPL trong phiên này. Edge DevTools
Protocol được dùng làm fallback cho viewport, media query, keyboard và timing; đây là giới
hạn công cụ, không phải giới hạn ứng dụng.

## Trạng thái bàn giao

- Task giữ `status: in-progress` cho tới khi Pull Request CI xanh.
- Human thực hiện merge và finalization; TASK-009 vẫn giữ phạm vi đổi URL riêng.
