---
status: in-progress
branch: task/TASK-030-home-v4-1
commit: ""
verified-by: npm run verify:task
---

# TASK-030 — Triển khai ODS Documentation Hub V4.1

## Bối cảnh

Trang chủ hiện tại chưa bám sát mockup `ODS-Platform-Documentation-V4.html` và còn hiển thị một số nhãn, chỉ số hoặc trạng thái không có nguồn xác thực. Task này triển khai lại riêng route `/` theo visual V4.1, đồng thời tiếp tục dùng navigation, theme, search và các registry thật của ứng dụng.

## Mục tiêu

- Tái tạo ngôn ngữ thiết kế V4 với hero hai cột, navy/blue/orange, dark/light theme và ODS logo thật.
- Trình bày đủ năm giải pháp cốt lõi của ODS trong hero bằng animation tuần tự, link thật và chuyển động có thể tắt qua `prefers-reduced-motion`.
- Adapt Home cho mobile theo hướng ưu tiên tiêu đề, mô tả và search; giảm micro-copy, chip và số trang trí nhưng giữ nguyên nội dung, URL và hành vi.
- Giữ nguyên `HomeLayout`, mega menu sản phẩm, Fumadocs search và phím tắt `Cmd/Ctrl+K`.
- Làm rõ luồng Search → nhóm giải pháp → điểm vào sản phẩm → công việc cần thực hiện → tích hợp → support, không lặp thêm một tầng điều hướng theo nhu cầu.
- Hiển thị hai sản phẩm đã có tài liệu, ba nhóm giải pháp dẫn sang ods.vn, thư viện tuyển chọn, hai điểm vào tích hợp AI Contact Center, khu vực support và footer tinh gọn.
- Giữ artwork hệ sinh thái quanh hub nhưng giảm micro-copy, liên kết năm thẻ tới đúng anchor giải pháp và bổ sung motion có kiểm soát.
- Tinh gọn menu “Tài liệu sản phẩm” thành danh sách một cột dùng registry thật; hiển thị trực tiếp email và hotline trong khu vực support.
- Chỉ dùng link public được kiểm chứng từ `source`, `docsProducts`, `odsSolutionGroups` và `odsExternalLinks`.
- Giữ phần tĩnh là Server Component; chỉ hydrate search trigger dùng context sẵn có của Fumadocs.
- Có regression test và screenshot thực tế ở desktop/mobile cho cả light/dark.

## Phạm vi

### Tạo mới:

- `src/app/(home)/home.module.css` — CSS Module riêng cho giao diện V4.1.
- `src/components/home/home-search-trigger.tsx` — search trigger riêng cho hero, dùng nguyên dialog và hotkey Fumadocs.
- `src/components/home/hero-ecosystem.tsx` — artwork hero, anchor navigation và kiểm soát pause/resume motion.
- `harness/tests/home-v4-regression.test.mjs` — kiểm tra runtime, responsive, interaction, accessibility cơ bản và screenshot.

### Sửa đổi:

- `src/app/(home)/page.tsx` — cấu trúc homepage V4.1 và nội dung lấy từ model thật.
- `src/components/home/product-directory.tsx` — thư viện tài liệu tuyển chọn, hiển thị riêng sản phẩm và loại nội dung.
- `src/components/home/solution-orbit.tsx` — hai điểm vào kỹ thuật API Reference và Webhook & Popup của AI Contact Center.
- `src/components/navigation/docs-mega-menu.tsx` — dropdown tài liệu sản phẩm gọn, một cột và dùng registry hiện có.
- `src/lib/home-content.ts` — model nội dung typed và kiểm chứng link public bằng Fumadocs source.
- `package.json` — thêm lệnh regression homepage vào chuỗi nghiệm thu task.
- `tasks/TASK-030-home-v4-1.md` — task spec và trạng thái thực hiện.

### Xóa:

- Không có.

## Ngoài phạm vi

- Không sửa nội dung MDX, route, redirect, API UI, search scope hoặc auth/internal boundary.
- Không sửa Docker, Caddy, cấu hình deploy production hoặc GitHub Actions.
- Không thêm dependency, animation library hoặc font CDN.
- Không nhúng mockup bằng `iframe`, raw HTML hoặc `dangerouslySetInnerHTML`.
- Không tự deploy, commit, push, mở PR hoặc đổi `status: done` trước khi PR CI xanh.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ [AGENTS.md](../AGENTS.md) và [DECISIONS.md](../DECISIONS.md).
- `page.tsx` tiếp tục là Server Component; client boundary chỉ nằm ở interaction cần state/event.
- CSS V4.1 phải được scope qua CSS Module và hỗ trợ `prefers-reduced-motion`.
- Mobile 390px và 360px phải giữ nội dung, search và CTA; có thể ẩn minh họa hero lớn.
- Mọi CTA có mũi tên phải là link hoặc button thật; không hiển thị trạng thái giả.
- Search public không được trả nội dung internal.

## Tiêu chí nghiệm thu

- [ ] Homepage render đúng dark/light tại 1440px và 1280px; không overflow, cắt chữ hoặc chồng lớp.
- [ ] Hero desktop hiển thị đúng 5 giải pháp cốt lõi từ registry; mỗi thẻ là link thật, có animation nhẹ và dừng khi hover/focus.
- [ ] Homepage dùng được tại 390px và 360px; search và nội dung chính không bị mất.
- [ ] Tại 390px và 360px, product/document về một cột; touch target chính tối thiểu 44px và navigation không che tiêu đề hero.
- [ ] Hero mobile ẩn illustration; giữ search, gợi ý thật và CTA chọn giải pháp; desktop giữ bố cục V4.1 hiện có.
- [ ] Homepage có đúng năm nhóm giải pháp; AI Contact Center có lối vào sử dụng/tích hợp và CloudFile có một lối vào tài liệu thật.
- [ ] Năm thẻ hero chỉ hiển thị icon/tên/mũi tên và dẫn tới đúng anchor nhóm giải pháp, không tạo route giả.
- [ ] Hub đứng yên; thẻ float nhẹ, line signal tuần tự, pause khi hover/focus/offscreen/tab ẩn hoặc khi người dùng bấm pause; reduced-motion hiển thị nội dung ngay.
- [ ] Menu “Tài liệu sản phẩm” rộng 340–400px trên desktop, một cột, có đúng ba entry canonical và link duyệt tất cả; keyboard, Escape, focus và touch hoạt động.
- [ ] Support hiển thị trực tiếp `support@ods.vn` và `1900 6634` với `mailto:`/`tel:` chính xác.
- [ ] Thư viện không còn filter trộn nhiều chiều; tổng tài liệu hiển thị khớp danh sách tuyển chọn.
- [ ] Khối tích hợp chỉ có API Reference và Webhook & Popup, ghi rõ phạm vi AI Contact Center, không có tab hoặc bước giả.
- [ ] Mega menu sản phẩm, Fumadocs search, click trigger, `Cmd/Ctrl+K`, Escape và focus-visible hoạt động.
- [ ] Link nội bộ trên homepage tồn tại và public search không lộ `/internal`.
- [ ] Screenshot full page desktop dark/light và mobile được tạo trong `.harness/reports/`.
- [ ] `git diff --check` chạy qua.
- [ ] `npm run verify:task` chạy qua.

## Điều kiện dừng

Dừng lại và xin ý kiến Human nếu:

1. Cần sửa auth, public/internal boundary, route, redirect hoặc search scope.
2. Cần thêm dependency hay thay đổi CI/deploy ngoài phạm vi.
3. Test hiện hữu bị sai và chỉ có thể tiếp tục bằng cách nới test hoặc thêm ngoại lệ.
4. Không thể xác minh route/link cần dùng từ source thật của repo.

## Báo cáo khi hoàn thành

- Tạo `.harness/reports/TASK-030-report.md` với danh sách file, kết quả lệnh và giới hạn còn lại.
- Giữ `status: in-progress` đến khi Pull Request CI xanh; trường `commit` để trống trước commit cuối của nhánh.
