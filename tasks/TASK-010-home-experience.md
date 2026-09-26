---
status: in-progress
branch: task/TASK-010-home-experience
commit: ""
verified-by: npm run verify:task
---

# TASK-010 — Làm mới trải nghiệm Home ODS Docs

## Bối cảnh

Home hiện có đúng định hướng docs-first nhưng các section dùng nhịp card tương tự nhau,
Solution Map chiếm Hero mà chưa cho người đọc thấy Portal/API/CloudFile, và các lối vào theo
nhu cầu còn lệch về AI Contact Center. TASK-008 đã hợp nhất registry sản phẩm và Page Tree.

## Mục tiêu

Tạo Home có bảy khối khác biệt về nhịp hiển thị: Hero preview, dải chỉ số, Product Bento,
role tabs, hệ sinh thái ODS, support strip và footer. Dữ liệu sản phẩm và chapter phải lấy
từ registry/Page Tree; interaction có keyboard support và tôn trọng reduced motion.

## Phạm vi

### Tạo mới

- `src/lib/home-content.ts`
- `src/components/home/hero-preview.tsx`
- `src/components/home/role-guides.tsx`
- `tasks/TASK-010-home-experience.md`
- `.harness/reports/TASK-010-report.md`
- `.harness/reports/assets/TASK-010/**`

### Sửa đổi

- `src/app/(home)/page.tsx`
- `src/app/global.css`
- `src/components/docs-theme-scope.tsx`
- `harness/tests/routes.test.mjs`

## Ngoài phạm vi

- Không thêm khối “Mới cập nhật” hoặc metadata ngày cập nhật.
- Không dùng screenshot sản phẩm thật, thêm dependency hoặc thay đổi nội dung MDX.
- Không đổi URL `user-guider-portal`, auth, public/internal boundary, search, sitemap hay deploy.
- Không finalization TASK-008 hoặc thực hiện TASK-009 trong nhánh này.

## Ràng buộc kiến trúc và kỹ thuật

- `page.tsx` tiếp tục là Server Component; chỉ Hero preview và role tabs là client islands.
- Page Tree là nguồn chapter; `docsProducts` và `odsSolutionGroups` là registry canonical.
- Internal link curated phải được kiểm tra bằng `source.getPageByUrl()` và fail build nếu gãy.
- Không dùng `any`, type cast để lách compiler hoặc timer không được cleanup.
- Nội dung vẫn hiển thị đầy đủ nếu browser không hỗ trợ scroll-driven animation.

## Tiêu chí nghiệm thu

- [x] Hero có search suggestion và preview Portal/API/CloudFile tự chuyển mỗi 6 giây.
- [x] Preview hỗ trợ keyboard, Pause/Play, visibility/focus/hover pause và reduced motion.
- [x] Dải chỉ số tự lấy số chapter Portal, capability API và số product từ nguồn thật.
- [x] Bento hiển thị AI Contact Center 2 cột và CloudFile 1 cột trên desktop, stack trên mobile.
- [x] Ba role tab có đúng ba link/tab và toàn bộ internal link tồn tại.
- [x] Solution Map phân biệt product có docs với product ngoài ods.vn.
- [x] Support strip và footer bốn cột thay thế card hỗ trợ cũ.
- [x] Accent/spacing dùng CSS variables chung; docs theme lấy accent từ registry.
- [x] Desktop 1440px, tablet 768px, mobile 390px và light/dark không overflow ngang.
- [x] Runtime Home chứa dữ liệu động; public routes 200 và internal routes tiếp tục 401.
- [x] `npm run verify:task` và `git diff --check` thành công.

## Điều kiện dừng

Dừng và hỏi Human nếu cần thêm dependency, ảnh thật, sửa nội dung MDX, URL public hoặc ranh
giới public/internal để hoàn thành task.

## Báo cáo khi hoàn thành

- Liệt kê file thay đổi, output kiểm chứng và ảnh runtime.
- Giữ `status: in-progress` đến khi Pull Request CI xanh; Human merge và finalization.
