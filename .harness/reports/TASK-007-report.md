# TASK-007 — Báo cáo nghiệm thu

## Kết quả

- `/` là ODS Documentation Hub độc lập, không redirect sang `/docs`.
- Header dùng một menu `Tài liệu` duy nhất cho directory và product docs; các mục còn lại
  dẫn tới Giải pháp ODS, Kiến thức và Hỗ trợ.
- Landing page định vị rõ đây là `Trung tâm tài liệu chính thức của ODS`; Hero hướng người
  dùng tới tài liệu triển khai, vận hành và tích hợp trong hệ sinh thái Hạ tầng số, Cloud và AI.
- Solution Map tiếp tục là visual chủ đạo, thể hiện năm trụ cột và tự quyết định liên kết
  theo `docsUrl`; solution ribbon trùng lặp đã được loại bỏ.
- `Tài liệu theo sản phẩm` render động từ `docsProducts` bằng lưới cân bằng. Card chỉ giữ
  mô tả ngắn, ba capability, một CTA tài liệu và liên kết giải pháp; không còn danh sách
  quick links dài trên Landing Page.
- `Tìm tài liệu theo nhu cầu` cung cấp bốn lối vào theo tác vụ: triển khai, vận hành,
  tích hợp và khắc phục sự cố.
- Blog, Support Portal và Liên hệ ODS được hợp nhất trong một khu vực `Kiến thức & Hỗ trợ`;
  Assistance Banner trùng vai trò đã được loại bỏ.
- Header, metadata, search trigger và nội dung Home đã được Việt hóa; `html lang="vi"`.
- Metadata trình bày của product được gom vào `src/lib/docs-products.ts`; Page Tree vẫn
  là nguồn sự thật cho sidebar và native root switcher.
- `/docs` là Documentation Directory trung lập, không mặc định ưu tiên AI Contact Center.
- `/docs/ai-contact-center` và `/docs/cloudfile` là hai product workspace độc lập.
- Article page giữ native three-column layout: sidebar, vùng đọc và `Trong trang này`;
  mobile dùng drawer và TOC popover.
- Article page tự hiển thị product, audience và loại tài liệu. Bài pilot tạo tài khoản đã
  được viết lại theo luồng mục tiêu, điều kiện, thao tác, kiểm tra kết quả và bước tiếp theo.
- Custom navigation cũ (`TopNav`, `DocsContainer`, `docs-navigation`) đã được loại bỏ.
- Không thay đổi auth, proxy, public/internal source, sitemap, search source hoặc deploy.

## File thay đổi

### Tạo

- `src/lib/docs-products.ts`
- `src/lib/ods-solutions.ts`
- `src/components/docs-theme-scope.tsx`
- `tasks/TASK-007-chuan-hoa-home-docs.md`
- `.harness/reports/TASK-007-report.md`
- `.harness/reports/assets/TASK-007/desktop-home-final.png`
- `.harness/reports/assets/TASK-007/desktop-article-toc-final.png`
- `.harness/reports/assets/TASK-007/mobile-home-cdp-final.png`
- `.harness/reports/assets/TASK-007/mobile-article-cdp-final.png`
- `.harness/reports/assets/TASK-007/desktop-home-product-spaces.png`
- `.harness/reports/assets/TASK-007/mobile-home-product-spaces.png`
- `.harness/reports/assets/TASK-007/desktop-product-spaces-final.png`
- `.harness/reports/assets/TASK-007/mobile-product-spaces-final.png`
- `.harness/reports/assets/TASK-007/desktop-home-docs-first-final.png`
- `.harness/reports/assets/TASK-007/mobile-home-docs-first-cdp.png`

### Sửa

- `src/app/(home)/layout.tsx`
- `src/app/(home)/page.tsx`
- `src/app/layout.tsx`
- `src/app/docs/layout.tsx`
- `src/app/docs/[[...slug]]/page.tsx`
- `src/app/global.css`
- `src/lib/layout.shared.tsx`
- `content/docs/index.mdx`
- `content/docs/meta.json`
- `content/docs/ai-contact-center/index.mdx`
- `content/docs/ai-contact-center/meta.json`
- `content/docs/cloudfile/index.mdx`
- `content/docs/cloudfile/meta.json`
- `content/docs/ai-contact-center/user-guider-portal/03-quan-ly-nguoi-dung/tao-tai-khoan-nguoi-dung.mdx`

### Xóa

- `src/components/docs-container.tsx`
- `src/components/top-nav.tsx`
- `src/lib/docs-navigation.ts`

`next-env.d.ts` đã có thay đổi ngoài phạm vi sản phẩm từ trước và không được TASK-007
chỉnh sửa có chủ đích.

## Kiểm chứng tự động

### Kiểm tra trong quá trình triển khai

- `npm run typecheck` — PASS.
- `npm run check:links` — PASS.
- `npm run check:scope` — PASS sau khi bổ sung đúng `content/docs/cloudfile/index.mdx`
  vào task scope.
- `git diff --check` — PASS; chỉ có cảnh báo LF/CRLF của Git trên Windows.
- `rg` tìm `top-nav`, `docs-container`, `docs-navigation` trong `src` và `content` —
  không còn import/tham chiếu.

### Gate chính

`npm run verify:task` — PASS, exit code 0:

- `next typegen` và TypeScript — PASS.
- `check:env` — PASS.
- `check:links` — PASS.
- `guard` — PASS (`Guard PASS.`).
- `check:scope` — PASS.
- `next build` — PASS với 170/170 static pages.
- `test:routes` — PASS 7/7:
  - `/docs` và `/api/search` trả 200.
  - `/internal`, `/internal/`, `/internal/onboarding`, `/api/search/internal` và
    trailing slash tiếp tục trả 401.

Gate được chạy lại sau vòng tinh chỉnh Solution Map, Product Space động, Việt hóa UI và article
context; kết quả vẫn PASS với 170/170 static pages và 7/7 route cases.

Gate được chạy lại sau vòng tối ưu Landing Page theo hướng Docs-first Hub; kết quả tiếp tục
PASS với 170/170 static pages và 7/7 route cases.

Lần chạy `verify:task` đầu tiên dừng ở `check:scope` do browser profile tạm trong
`.harness/runtime/chrome-*`. Các profile do bước test tạo ra đã được dọn đúng path; không
sửa harness hay nới allowlist. Lần chạy lại toàn bộ chuỗi đạt exit code 0.

Build còn cảnh báo `metadataBase` chưa được cấu hình. Đây là cảnh báo đã tồn tại ngoài
phạm vi TASK-007 và không làm build thất bại.

## Kiểm tra runtime và giao diện

- Dev server tại `http://localhost:3000`:
  - `/` — 200.
  - `/docs` — 200.
  - `/docs/ai-contact-center` — 200.
  - `/docs/cloudfile` — 200.
- Desktop:
  - Home hiển thị hero/search, năm solution node quanh ODS Core và Product Entry grid hai cột.
  - Product cards được thu gọn, không còn quick-link list và Assistance Banner trùng lặp.
  - Sau Product Entry là task launcher hai cột và khu vực Kiến thức & Hỗ trợ ba cột.
  - Article có product selector/sidebar bên trái, nội dung ở giữa và `Trong trang này`
    bên phải khi trang có heading.
- Ảnh nghiệm thu mới:
  - `desktop-home-solution-hub.png` — Solution Map và phần đầu Product Space.
  - `desktop-article-context.png` — article context, nội dung task-oriented và right TOC.
  - `mobile-home-solution-hub.png` — hero và solution map chuyển thành luồng dọc.
  - `desktop-home-docs-first-final.png` — Hero Docs-first, Solution Map, product cards gọn
    và task launcher trên desktop.
  - `mobile-home-docs-first-cdp.png` — device emulation chuẩn 390px cho Hero, Solution Map
    và product cards sau vòng tối ưu.
- Chrome DevTools device emulation `390x844`:
  - Home: `innerWidth = 390`, `scrollWidth = 390`, không overflow ngang.
  - Product Space chuyển thành một cột rộng `350px`; hai card cao lần lượt khoảng `400px`
    và `376px`, thay cho card desktop cũ cao `719px`.
  - Solution Map có 0 badge trạng thái; hai node có docs điều hướng nội bộ, ba node còn lại
    mở đúng trang giải pháp ODS trong tab mới.
  - Article: `innerWidth = 390`, `scrollWidth = 390`, không overflow ngang.
  - Article chuyển `Trong trang này` thành TOC popover ở đầu trang.
- `prefers-reduced-motion` tắt animation/transition trang home về thời lượng tối thiểu.

## Trạng thái bàn giao

- Task giữ `status: in-progress` cho tới khi Pull Request CI xanh.
- Chưa commit, push, mở Pull Request hoặc deploy production.
