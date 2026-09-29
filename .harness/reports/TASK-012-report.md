# TASK-012 — Báo cáo nghiệm thu

## Trạng thái

- Branch: `task/TASK-012-product-docs-sites`
- Implementation revision: `9dbf65d`
- Task status: `in-progress`
- Pull Request: chưa mở; chờ TASK-011 merge vào `main`

## Kết quả triển khai

- `/docs` được chuyển thành Fumadocs root **Bắt đầu** qua route group `(bat-dau)` mà không đổi URL.
- Layout Tabs có ba product site cấp cao: Bắt đầu, AI Contact Center và CloudFile.
- Guide và API không còn là nested root; cả hai xuất hiện trong cùng sidebar AI Contact Center.
- Loại bỏ navigation Home bị lặp trong sidebar docs: Tài liệu Sản phẩm, API Reference và Tất cả tài liệu; Home vẫn giữ menu này.
- Sidebar dùng `defaultOpenLevel: 0`; Guide/API mở ở cấp cần thiết, các folder chi tiết 01–09 vẫn đóng.
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
- Runtime matrix — toàn bộ root Guide 01–09, Guide Autocall, ba trang con, ba nhóm API, Click-to-Call và CloudFile trả `200`; `/docs/ai-contact-center/api/overview` trả `404`.

### Gate tổng

`npm run verify:task` chạy thật và PASS toàn bộ `verify:code`, sau đó dừng tại `check:scope` vì `origin/main` chưa chứa bốn commit TASK-011. Scope checker liệt kê 12 file TASK-011 nằm ngoài TASK-012, đúng với dependency đã khóa trong kế hoạch. Không sửa test, không nới allowlist và không thêm ngoại lệ.

Gate này phải được chạy lại sau khi TASK-011 merge và branch TASK-012 được cập nhật trên `main`. Chỉ khi đó mới push/open PR TASK-012 và ghi nhận `verify:task` hoàn chỉnh.

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
- TASK-012 giữ `status: in-progress`; chưa push, chưa mở PR và chưa finalization trước khi TASK-011 merge.
