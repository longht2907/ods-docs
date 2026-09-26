---
status: in-progress
branch: task/TASK-007-chuan-hoa-home-docs
commit: "4985362"
verified-by: npm run verify:task
---

# TASK-007 — Xây dựng ODS Documentation Hub và chuẩn hóa bố cục tài liệu

## Bối cảnh

Layout `/docs` hiện dùng `TopNav` và `DocsContainer` tùy biến từ TASK-005. Trên
desktop, solution dropdown, contextual tabs, sidebar và TOC tạo nhiều tầng điều
hướng cạnh tranh; dropdown có thể che tiêu đề trang. Route `/` vẫn là scaffold
"Hello World", còn các trang `/docs` và `/docs/ai-contact-center` chưa ưu tiên
tác vụ phổ biến của người đọc. Sau vòng triển khai đầu, `/` đã bị redirect sang
`/docs`; Human xác nhận đây không phải intent sản phẩm: `/` phải là home hub giới
thiệu Trung tâm Tài liệu ODS và hệ sinh thái dịch vụ, tương tự cấu trúc
`platform.claude.com/docs/en/home`.

## Mục tiêu

Xây dựng `/` thành ODS Documentation Hub độc lập, có hero, search, menu dịch vụ,
product cards và hành trình sử dụng tài liệu. Người dùng chọn dịch vụ trên menu
hoặc card để chuyển vào reader tương ứng dưới `/docs/**`. Đồng thời đưa `/docs`
về layout ba vùng chuẩn của Fumadocs, dùng Page Tree/root folder làm nguồn điều
hướng duy nhất.

### Vòng tối ưu Landing Page

Sau khi nghiệm thu cấu trúc ban đầu, Human yêu cầu Landing Page ưu tiên rõ vai trò
**Trung tâm tài liệu chính thức của ODS**. Solution Map tiếp tục là visual chủ đạo,
nhưng khu vực tài liệu sản phẩm phải được thu gọn thành điểm vào tài liệu thay vì
hiển thị toàn bộ quick links. Các khu vực hành trình, kiến thức và hỗ trợ phải được
quy hoạch lại để giảm nội dung trùng lặp và giúp người đọc chọn đúng tác vụ nhanh hơn.

## Phạm vi (Scope)

### Tạo mới:

- `.harness/reports/TASK-007-report.md` — báo cáo nghiệm thu thực tế.
- `.harness/reports/assets/TASK-007/**` — ảnh kiểm tra giao diện nếu công cụ khả dụng.
- `src/lib/docs-products.ts` — registry typed cho product documentation và external links.
- `src/lib/ods-solutions.ts` — registry typed cho toàn bộ nhóm giải pháp ODS, tách khỏi docs roots.
- `src/components/docs-theme-scope.tsx` — client theme provider điều phối dynamic color accent per service.

### Sửa đổi:

- `tasks/TASK-007-chuan-hoa-home-docs.md` — task spec và trạng thái triển khai.
- `src/app/layout.tsx` — khai báo ngôn ngữ tiếng Việt và bản dịch UI dùng chung của Fumadocs.
- `src/app/(home)/layout.tsx` — cấu hình `HomeLayout` riêng cho home hub.
- `src/app/(home)/page.tsx` — ODS Documentation Hub sinh động và responsive.
- `src/app/docs/layout.tsx` — dùng native `DocsLayout`, Layout Tabs và sidebar.
- `src/app/docs/[[...slug]]/page.tsx` — tắt TOC popover trên các trang hub full-width.
- `src/lib/layout.shared.tsx` — tách options cho home, public docs và internal docs navigation.
- `src/app/global.css` — chỉ giữ style bổ sung cần thiết cho hub UI.
- `content/docs/index.mdx` — Documentation Hub tập trung vào sản phẩm và tác vụ.
- `content/docs/ai-contact-center/index.mdx` — product hub cho Portal và API.
- `content/docs/cloudfile/index.mdx` — product hub CloudFile và trạng thái phát hành tài liệu.
- `content/docs/meta.json` — page tree của hub nếu cần cho native Layout Tabs.
- `content/docs/ai-contact-center/meta.json` — page tree của product nếu cần.
- `content/docs/cloudfile/meta.json` — giữ root CloudFile đóng mặc định trên hub.
- `content/docs/ai-contact-center/user-guider-portal/03-quan-ly-nguoi-dung/tao-tai-khoan-nguoi-dung.mdx`
  — pilot chuẩn hóa phần định hướng, điều kiện và kết quả của article.

### Xóa:

- `src/components/docs-container.tsx` — custom grid thay thế bởi native layout.
- `src/components/top-nav.tsx` — custom header/context tabs thay bằng native navigation.
- `src/lib/docs-navigation.ts` — navigation model riêng không còn được sử dụng.

## Ngoài phạm vi (Out of Scope)

- [ ] Không sửa hàng loạt nội dung chi tiết dưới `user-guider-portal/**` hoặc API; chỉ
      chuẩn hóa article pilot đã khai báo trong scope.
- [ ] Không thay đổi URL hiện có hoặc ranh giới public/internal.
- [ ] Không sửa `src/proxy.ts`, search source, sitemap, `llms.txt` hoặc auth.
- [ ] Không thêm dependency, service, secret, cấu hình deploy hoặc OAuth.
- [ ] Không sửa hay đưa thay đổi có sẵn trong `next-env.d.ts` vào phạm vi task.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ [AGENTS.md](../AGENTS.md) và [DECISIONS.md](../DECISIONS.md).
- Dùng API/types thật của Fumadocs UI 16.15.10 và Next.js 16.3.4.
- Sidebar lấy từ `source.getPageTree()`; không viết lại search/sidebar.
- Product registry chỉ cung cấp metadata trình bày; Page Tree vẫn là nguồn sự thật của
  sidebar và root switcher.
- Các root folder tiếp tục được khai báo bằng `meta.json` và native Layout Tabs.
- Giữ `output: 'standalone'` và toàn bộ kiểm soát public/internal hiện hành.
- Không dùng `any` hoặc type cast để lách TypeScript.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [x] `/` trả 200 và hiển thị ODS Documentation Hub độc lập, không redirect.
- [x] Home có hero giới thiệu đây là Trung tâm Tài liệu ODS, search và CTA rõ.
- [x] Product menu hiển thị AI Contact Center và CloudFile; mỗi mục điều hướng tới
      đúng product root thay vì đoán subpath tương ứng.
- [x] Menu có đường dẫn rõ tới Documentation, product docs, Blog và Support; Home có
      khu vực Contact/Support và footer ODS.
- [x] Home có product cards sinh động, hover/focus state, responsive và hỗ trợ
      `prefers-reduced-motion`.
- [x] `/docs` hiển thị Documentation Hub trong reader có đường dẫn rõ tới AI
      Contact Center, CloudFile và hỗ trợ kỹ thuật.
- [x] `/docs` giữ vai trò directory trung lập, không mặc định ưu tiên một product.
- [x] `/docs/ai-contact-center` hiển thị product hub có CTA/tác vụ rõ tới Portal,
      API Reference và các hướng dẫn phổ biến.
- [x] Desktop chỉ còn một hệ điều hướng chính: native header/sidebar của Fumadocs;
      không còn contextual tab row hoặc dropdown che nội dung.
- [x] Sidebar của AI Contact Center chỉ hiển thị tree thuộc root hiện tại, có
      native root switcher sang CloudFile và nav title quay lại Hub.
- [x] Article page giữ bố cục sidebar + vùng đọc + right TOC; mobile dùng drawer/TOC popover.
- [x] Không có import còn sót tới ba module bị xóa.
- [x] `/internal/**` và `/api/search/internal/**` tiếp tục bị bảo vệ như hiện hành.
- [x] `npm run typecheck`, `npm run check:links`, `npm run guard`,
      `git diff --check` và `npm run verify:task` thành công.
- [x] Header không còn hai mục `Documentation` và `Sản phẩm` trùng vai trò; `Tài liệu`
      là menu duy nhất chứa các product docs và đường dẫn xem tất cả.
- [x] Hero định vị ODS là đơn vị cung cấp Hạ tầng số, Cloud và AI; Solution Map thể
      hiện năm trụ cột giải pháp cốt lõi và các sản phẩm con tương ứng.
- [x] Home chỉ có một khu vực Product Space render từ registry tài liệu, không lặp cùng
      danh sách sản phẩm ở nhiều section.
- [x] Các solution card dẫn tới trang sản phẩm cụ thể trên `ods.vn`, không cùng trỏ về
      homepage chung.
- [x] Article page hiển thị context product/audience tự động; article pilot có mục tiêu,
      điều kiện chuẩn bị, bước kiểm tra kết quả và next steps rõ ràng.
- [x] Solution Map chỉ hiển thị năm trụ cột, sản phẩm con và icon điều hướng; không còn
      badge trạng thái `Có tài liệu`, `Giải pháp`, `Docs Available` hoặc `Solution`.
- [x] Mỗi solution node tự dùng liên kết nội bộ khi có `docsUrl` và liên kết ngoài khi chưa
      có `docsUrl`; icon điều hướng phản ánh đúng hai loại đích đến.
- [x] Hero dùng thông điệp `Trung tâm tài liệu chính thức của ODS`, giải thích rõ người
      dùng có thể tra cứu hướng dẫn triển khai, vận hành và tích hợp tại một nơi.
- [x] Solution ribbon trùng với Solution Map được loại bỏ; Solution Map vẫn là visual
      chính và giữ nguyên quy tắc điều hướng nội bộ/ngoài theo `docsUrl`.
- [x] Khu vực tài liệu đổi thành `Tài liệu theo sản phẩm`, card gọn, render động từ
      `docsProducts`, chỉ có tối đa ba capability và không render danh sách quick links dài.
- [x] Landing Page có khu vực `Tìm tài liệu theo nhu cầu` gồm các tác vụ triển khai,
      vận hành, tích hợp và khắc phục sự cố với đường dẫn hợp lệ.
- [x] Blog, Support Portal và Liên hệ ODS được gom vào một khu vực `Kiến thức & Hỗ trợ`;
      không còn hai khối hỗ trợ trùng vai trò.
- [x] Landing Page không overflow ngang ở viewport mobile 390px, hỗ trợ keyboard focus
      và `prefers-reduced-motion`; toàn bộ gate `npm run verify:task` tiếp tục thành công.

## Điều kiện dừng (Stop Condition)

Dừng và hỏi Human nếu cần thay đổi auth/public-internal boundary, URL public,
dependency, test hoặc cấu hình deploy để hoàn thành task.

## Báo cáo khi hoàn thành

- Liệt kê file tạo/sửa/xóa.
- Ghi kết quả thật của các lệnh kiểm tra và runtime routes.
- Giữ `status: in-progress` cho tới khi Pull Request CI xanh; không tự đặt `done`.
