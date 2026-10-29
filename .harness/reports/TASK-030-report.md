# TASK-030 — Báo cáo nghiệm thu ODS Documentation Hub V4.1

## Trạng thái

- Branch: `task/TASK-030-home-v4-1`
- Worktree: `E:\Project\ods-docs-v4-1`
- Task status: `in-progress`
- Commit: chưa tạo
- Pull Request: `#32` đang mở; các sửa lỗi regression trong báo cáo này chưa commit/push và chưa có CI mới
- Dịch vụ kiểm tra: `http://localhost:3010/`, HTTP 200 sau khi khởi động lại

## Kết quả triển khai

- Home giữ nguyên nhận diện ODS navy/cyan/cam, logo, typography, light/dark theme và minh họa năm nhóm giải pháp.
- Luồng nội dung được làm rõ theo thứ tự: Search → nhóm giải pháp → điểm vào sản phẩm → công việc cần thực hiện → tích hợp → support.
- Hero ưu tiên H1, mô tả ngắn, search thật của Fumadocs, ba gợi ý thật và link nhẹ đến khu vực giải pháp. Mobile ẩn minh họa lớn nhưng giữ search/gợi ý/CTA.
- Khu vực sản phẩm dùng đúng năm nhóm từ `odsSolutionGroups`; AI Contact Center và CloudFile lấy metadata từ `docsProducts`. CloudFile được thể hiện dưới Cloud Services.
- AI Contact Center tách rõ “Sử dụng sản phẩm” và “Tích hợp hệ thống”; CloudFile chỉ có một lối vào tài liệu hiện có.
- Ba nhóm chưa có tài liệu tại hub chỉ dẫn tới trang giải pháp canonical trên `ods.vn`, không giả lập tài liệu.
- Thư viện có đúng sáu tài liệu tuyển chọn, hiển thị riêng product/content type và không còn filter trộn nhiều chiều.
- Khối tích hợp chỉ còn API Reference và Webhook & Popup, ghi rõ phạm vi AI Contact Center; bỏ Portal tab và các bước tích hợp giả.
- Support dùng `support@ods.vn` và `https://support.ods.vn/`; footer được rút gọn còn các liên kết cần thiết.
- Search trigger riêng ở hero dùng nguyên `useSearchContext`, dialog handle và hotkey của Fumadocs; không thay đổi search logic hoặc public scope.
- Nội dung/link Home được model hóa bằng TypeScript và link public được kiểm chứng qua Fumadocs `source`.
- CSS cũ của intent cards, filter và journey tabs đã được xóa thay vì chỉ ẩn.
- Không thay đổi MDX, route, redirect, API UI, auth/internal boundary, dependency, font, Docker hoặc deploy configuration.

## File thay đổi

### Tạo mới

- `src/app/(home)/home.module.css`
- `src/components/home/home-search-trigger.tsx`
- `harness/tests/home-v4-regression.test.mjs`
- `harness/tests/helpers/standalone-server.mjs`
- `tasks/TASK-030-home-v4-1.md`
- `.harness/reports/TASK-030-report.md`
- `.harness/reports/assets/TASK-030/*.png`

### Sửa đổi

- `src/app/(home)/page.tsx`
- `src/components/home/product-directory.tsx`
- `src/components/home/solution-orbit.tsx`
- `src/lib/home-content.ts`
- `package.json`
- `harness/tests/api-ui-regression.test.mjs`
- `harness/tests/routes.test.mjs`
- `harness/tests/search-regression.test.mjs`

`next-env.d.ts` đã được trả về đúng nội dung của `HEAD`, không nằm trong TASK-030.

## Kiểm chứng

### Home UI regression

```powershell
npm run test:home-ui
```

Kết quả: **PASS**.

- 1440, 1280, 390, 360 × light/dark: 8/8 tổ hợp không tràn ngang.
- Desktop có đúng 5 core solution, animation hoạt động và tắt khi `prefers-reduced-motion: reduce`.
- Có đúng 5 solution group, 2 product card, 6 product pathway, 6 library document và 2 integration link.
- Không còn intent card, library filter, journey tab hoặc fake integration step.
- Mobile: hero artwork ẩn; product/document về một cột; search và suggestions đạt touch target 44px; navigation không che H1.
- Click search, `Ctrl+K`, query có kết quả, empty state, Escape và public-only search scope đều đạt.
- Không có link `/internal`, control thiếu accessible name hoặc copy/status giả bị cấm.
- Screenshot harness được sửa race condition khi điều hướng lặp lại cùng URL; mỗi lượt dùng query riêng để chỉ chụp sau navigation hoàn tất.
- Reduced Motion chờ style recalculation qua hai animation frames trước khi đọc computed style; chạy riêng PASS 2/2 lần.

### API UI và standalone harness

- Assertion scope thất bại không phải do mapping route: khi tái hiện, `location.pathname` đã đúng nhưng `#ods-search-scope` là `null` vì dialog chưa mount.
- Primitive điều hướng nay xác nhận document mới bằng URL đích và navigation marker, tránh đọc selector còn tồn tại trên trang API cũ.
- Hotkey `Ctrl+K` được retry có giới hạn đến khi React hydration gắn listener; open state yêu cầu dialog không có `data-closed`.
- Kỳ vọng scope giữ nguyên: `/docs` → `all`, AI Contact Center → `ai-contact-center`, CloudFile → `cloudfile`.
- `test:api-ui` PASS 3/3 lần liên tiếp sau sửa.
- Production regression tests chạy `.next/standalone/server.js` và copy `public`/`.next/static` giống Docker runtime; không còn cảnh báo dùng `next start` với `output: 'standalone'`.

### Repository gates

Các lệnh độc lập:

```powershell
npm run types:check
npm run check:links
npm run guard
npm run check:scope
git diff --check
```

Kết quả: **PASS**. `git diff --check` chỉ in warning LF/CRLF của checkout Windows, không có whitespace error.

Chuỗi task mới nhất:

```powershell
$env:ODS_DOCS_SITE_URL='https://docs.example.test'
npm run verify:task
```

`https://docs.example.test` chỉ là non-loopback origin tạm trong process local để production build kiểm chứng metadata; không được ghi vào `.env` hoặc config.

Kết quả tổng: **PASS**.

- `types:check`: PASS.
- `check:env`: PASS.
- `check:links`: PASS.
- `guard`: PASS.
- `check:scope`: PASS.
- `next build`: PASS; route `/` prerender static.
- `test:routes`: PASS 21/21; `/internal/**` và `/api/search/internal/**` tiếp tục trả 401.
- `test:api-ui`: PASS; desktop/mobile, tab persistence, search scope theo route, keyboard và race checks đạt.
- `test:home-ui`: PASS; 8 tổ hợp viewport/theme và 4 screenshot đạt.
- `test:search`: PASS; extraction, grouping, anchors, Vietnamese/API keywords và public/internal boundary đạt.
- `test:internal-content`: PASS; 21 flows, 76 valid step links, internal vẫn 401.
- `test:flowchart`: PASS; 12 route/viewport/theme cases và geometry/anchor checks trên 21 process pages.

Lần chạy `verify:task` không có `ODS_DOCS_SITE_URL` trước đó dừng đúng tại build guard. Đây là cấu hình build bắt buộc của repo, không phải lỗi Home.

### Impeccable detector

```powershell
impeccable.cmd detect --json `
  'src/app/(home)/page.tsx' `
  'src/app/(home)/home.module.css' `
  'src/components/home/home-search-trigger.tsx' `
  'src/components/home/product-directory.tsx' `
  'src/components/home/solution-orbit.tsx'
```

Kết quả final: `[]` — không có warning.

## Screenshot

| Viewport | Light | Dark |
| --- | --- | --- |
| Desktop 1440 | [`home-desktop-1440-light.png`](assets/TASK-030/home-desktop-1440-light.png) | [`home-desktop-1440-dark.png`](assets/TASK-030/home-desktop-1440-dark.png) |
| Mobile 390 | [`home-mobile-390-light.png`](assets/TASK-030/home-mobile-390-light.png) | [`home-mobile-390-dark.png`](assets/TASK-030/home-mobile-390-dark.png) |

Ảnh trước đợt làm rõ IA hiện tại:

| Viewport | Light | Dark |
| --- | --- | --- |
| Desktop 1440 | [`home-desktop-1440-ia-before-light.png`](assets/TASK-030/home-desktop-1440-ia-before-light.png) | [`home-desktop-1440-ia-before-dark.png`](assets/TASK-030/home-desktop-1440-ia-before-dark.png) |
| Mobile 390 | [`home-mobile-390-ia-before-light.png`](assets/TASK-030/home-mobile-390-ia-before-light.png) | [`home-mobile-390-ia-before-dark.png`](assets/TASK-030/home-mobile-390-ia-before-dark.png) |

Ảnh final có kích thước desktop `1440 × 3372`, mobile `390 × 5202`.

## Giới hạn còn lại

- Chưa commit hoặc push các sửa lỗi regression hiện tại; PR `#32` chưa có CI cho diff mới.
- Task tiếp tục `in-progress`; `commit: ""` được giữ nguyên.
- `verify:task` local đã xanh; vẫn phải chờ PR CI xanh trước khi đổi task sang `done`.
- Không deploy production và không xác minh production origin.
- Hai Node test hiện hữu in warning `MODULE_TYPELESS_PACKAGE_JSON`; các test tương ứng vẫn PASS.
