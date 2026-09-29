# TASK-012 — Báo cáo nghiệm thu

## Trạng thái

- Branch: `task/TASK-012-product-docs-sites`
- Implementation baseline revision: `f7ae259`
- Sidebar refinement: working tree hiện tại, chờ commit cuối
- Task status: `in-progress`
- Pull Request: chưa mở; TASK-011 đã merge vào `main` tại `fdaf658`

## Kết quả triển khai

- `/docs` được chuyển thành Fumadocs root **Bắt đầu** qua route group `(bat-dau)` mà không đổi URL.
- Layout Tabs có ba product site cấp cao: Bắt đầu, AI Contact Center và CloudFile.
- Guide và API không còn là nested root; cả hai xuất hiện trong cùng sidebar AI Contact Center.
- Loại bỏ navigation Home bị lặp trong sidebar docs: Tài liệu Sản phẩm, API Reference và Tất cả tài liệu; Home vẫn giữ menu này.
- Sidebar dùng `defaultOpenLevel: 0`; Guide/API mở ở cấp cần thiết, các folder chi tiết 01–09 vẫn đóng.
- Sidebar ACC giữ hai wrapper `Hướng dẫn sử dụng` và `API Reference`; mỗi wrapper chứa landing item cùng cây nội dung tương ứng, mỗi URL chỉ xuất hiện một lần.
- Sidebar transform nhận diện section bằng `$ref.folder`, vì vậy product root AI Contact Center vẫn tồn tại trong switcher và cây CloudFile không rò sang sidebar ACC.
- `Tổng quan & Làm quen` không còn `defaultOpen: true`; chỉ nhánh chứa trang hiện tại tự mở, đúng progressive disclosure của cây tài liệu dài.
- Thêm Guide Gọi tự động gồm trang tổng quan và ba trang con.
- API Reference được chia thành Tổng đài, Autocall và Webhook.
- Nội dung Click-to-Call và bốn code tab được chuyển nguyên vẹn sang `api/tong-dai/khoi-tao-cuoc-goi`.
- Hai link `/api/overview` trên navbar và Home được sửa về canonical `/docs/ai-contact-center/api`.
- Guard chỉ cho phép root tại `(bat-dau)` và product root, kiểm tra các nhánh mới và cấm public source link tới `/api/overview`.
- Không sửa test, registry, source loader, auth, internal docs hoặc dependency.

## Kiểm chứng tự động

- `npm run typecheck` — PASS.
- `npm run check:links` — PASS.
- `npm run guard` — PASS.
- `git diff --check` — PASS; chỉ có cảnh báo LF/CRLF của Git trên Windows.
- `npm run build` — PASS, **194/194 static pages**.
- `npm run test:routes` — PASS, **12/12 cases**; public route trả `200`, internal route tiếp tục trả `401`.
- Runtime HTML refinement — PASS: có đúng một link `Tổng quan Portal`, đúng một link `Tổng quan API`, đúng wrapper Guide/API và không còn navigation Home dư thừa.
- Root Page Tree có đúng ba node `root: true`: Bắt đầu, AI Contact Center và CloudFile; `/docs` serialize đầy đủ cả ba lựa chọn cho product switcher.
- `/docs/ai-contact-center` hiển thị trigger `AI Contact Center`, không có node CloudFile trong sidebar; CloudFile chỉ tồn tại như lựa chọn chuyển site.
- Dev runtime sau khi tải `/docs` và `/docs/ai-contact-center` không còn warning React `Invalid value for prop className`.
- Runtime matrix — toàn bộ root Guide 01–09, Guide Autocall, ba trang con, ba nhóm API, Click-to-Call và CloudFile trả `200`; `/docs/ai-contact-center/api/overview` trả `404`.

### Gate tổng

TASK-011 đã merge vào `origin/main` tại `fdaf658`. `npm run check:scope` hiện PASS; branch TASK-012 cần được cập nhật trên revision này và chạy lại toàn bộ `npm run verify:task` trước khi push/open PR.

## Kiểm tra runtime và UI

- Desktop: viewport `1440px`, document/body `scrollWidth = 1425px`; không overflow ngang.
- Mobile: viewport `390px`, document/body `scrollWidth = 390px`; không overflow ngang.
- Mobile trigger có `aria-label="Open Sidebar"`; drawer mở thành công trên cả bảy route nghiệm thu.
- Sidebar ACC có đồng thời Hướng dẫn sử dụng và API Reference, không có CloudFile.
- Sidebar CloudFile không có cây AI Contact Center.
- Gọi tự động nằm sau Giám sát cuộc gọi và trước Quản lý hội thoại.
- Product switcher mở được và cung cấp link tới `/docs`, `/docs/ai-contact-center`, `/docs/cloudfile`.
- Keyboard Tab đi qua product links, navigation, switcher và action buttons; focus dùng native outline hoặc Fumadocs ring.
- Trang Khởi tạo cuộc gọi vẫn hiển thị code tabs cURL, Python, Node.js và PHP.

## Evidence

> Bộ ảnh dưới đây được chụp trước sidebar refinement hiện tại. Cần chụp lại sau khi có browser backend trước khi Human finalization; không dùng ảnh cũ để chứng minh hai landing item mới.

### Desktop 1440 × 1000

- `assets/TASK-012/desktop-docs.png`
- `assets/TASK-012/desktop-ai-contact-center.png`
- `assets/TASK-012/desktop-portal-guide.png`
- `assets/TASK-012/desktop-goi-tu-dong.png`
- `assets/TASK-012/desktop-api.png`
- `assets/TASK-012/desktop-khoi-tao-cuoc-goi.png`
- `assets/TASK-012/desktop-cloudfile.png`

### Mobile 390 × 844 — drawer mở

- `assets/TASK-012/mobile-docs.png`
- `assets/TASK-012/mobile-ai-contact-center.png`
- `assets/TASK-012/mobile-portal-guide.png`
- `assets/TASK-012/mobile-goi-tu-dong.png`
- `assets/TASK-012/mobile-api.png`
- `assets/TASK-012/mobile-khoi-tao-cuoc-goi.png`
- `assets/TASK-012/mobile-cloudfile.png`

## Giới hạn và bàn giao

- Browser backend `iab` không khả dụng vì phiên không có Node REPL. Evidence được chụp bằng Edge DevTools Protocol trên production build thực tế.
- Warning `metadataBase` là baseline ngoài phạm vi và không làm build thất bại.
- TASK-012 giữ `status: in-progress`; chưa push, chưa mở PR và chưa Human finalization trước khi CI của PR xanh.
