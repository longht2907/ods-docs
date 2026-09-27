---
status: in-progress
branch: task/TASK-011-home-docs-clarity
commit: ""
verified-by: npm run verify:task
---

# TASK-011 — Làm rõ vai trò Home và tinh gọn điều hướng tài liệu

## Bối cảnh

TASK-010 đã tạo Home giàu tương tác nhưng Hero vẫn nhấn vào hai sản phẩm hiện có,
Solution Map phân biệt trạng thái có tài liệu và nhiều lối điều hướng cùng trỏ về
`/docs`. Product Bento cũng hard-code AI Contact Center và CloudFile nên không tự mở
rộng khi registry có sản phẩm tài liệu mới.

## Mục tiêu

Định vị `/` là trung tâm tài liệu chung của ODS dành cho quản trị viên, Developer,
Agent và giám sát viên phía khách hàng. Hero hiển thị Solution Map năm nhóm ODS,
navigation chỉ giữ một lối trực tiếp tới `/docs`, và danh mục sản phẩm trên Home được
render hoàn toàn từ `docsProducts`.

## Phạm vi

### Tạo mới

- `src/components/home/solution-map.tsx`
- `src/components/home/product-docs-directory.tsx`
- `tasks/TASK-011-home-docs-clarity.md`
- `.harness/reports/TASK-011-report.md`
- `.harness/reports/assets/TASK-011/**`

### Sửa đổi

- `src/app/(home)/page.tsx`
- `src/app/global.css`
- `src/components/home/role-guides.tsx`
- `src/lib/home-content.ts`
- `src/lib/layout.shared.tsx`
- `harness/tests/routes.test.mjs`

### Xóa

- `src/components/home/hero-preview.tsx`

## Ngoài phạm vi

- Không sửa nội dung MDX, URL public, auth, search, sitemap, deploy hoặc dependency.
- Không hiển thị hay liên kết nội dung `/internal/**` trên Home public.
- Không đổi registry canonical hoặc URL sản phẩm trong `ods-solutions.ts`.
- Không thêm trạng thái “có tài liệu” vào Solution Map.

## Ràng buộc kiến trúc và kỹ thuật

- `page.tsx`, Solution Map và product directory tiếp tục server-render; chỉ role tabs
  là client island.
- Solution Map lấy đúng năm nhóm từ `odsSolutionGroups`; mọi nhóm có cùng visual weight
  và luôn mở trang giải pháp chính thức trên `ods.vn`.
- Product directory map trực tiếp `docsProducts`; không kiểm tra slug hoặc tên sản phẩm
  trong JSX để quyết định layout/nội dung.
- Header `Tài liệu` là link trực tiếp `/docs`, không còn dropdown sản phẩm.
- Không dùng `any`, type cast để lách compiler hoặc thêm dependency.

## Tiêu chí nghiệm thu

- [x] Hero định danh rõ “Trung tâm tài liệu ODS” và mô tả đúng bốn nhóm người dùng phía khách hàng.
- [x] Hero giữ search và suggestion nhưng chỉ còn một CTA cuộn tới danh mục sản phẩm.
- [x] Solution Map hiển thị đủ năm nhóm canonical, không có badge/legend trạng thái tài liệu.
- [x] Mọi nhóm trong Solution Map mở URL `productUrl` bên ngoài ODS Docs.
- [x] Header `Tài liệu` đi thẳng `/docs`; không còn menu “Tất cả tài liệu” hoặc product dropdown.
- [x] Home không còn CTA “Xem toàn bộ tài liệu” trùng header.
- [x] Product directory render mọi phần tử trong `docsProducts` bằng một component generic.
- [x] Thêm product docs mới vào registry không yêu cầu sửa `page.tsx` hoặc component directory.
- [x] Desktop 1440px, tablet 768px và mobile 390px không overflow ngang; focus visible rõ ràng.
- [x] Runtime Home chứa thông điệp mới, đủ năm solution và hai product hiện tại.
- [x] Public routes trả 200; toàn bộ route `/internal/**` tiếp tục trả 401.
- [x] `npm run verify:task` và `git diff --check` thành công.

## Điều kiện dừng

Dừng và hỏi Human nếu cần thêm dependency, sửa URL public, nội dung MDX hoặc ranh giới
public/internal để hoàn thành task.

## Báo cáo khi hoàn thành

- Liệt kê file thay đổi, output kiểm chứng và ảnh runtime.
- Giữ `status: in-progress` đến khi Pull Request CI xanh; Human merge và finalization.
