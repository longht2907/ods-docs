---
status: in-progress
branch: task/TASK-005-hoan-thien-bo-cuc-docs
commit: ""
verified-by: npm run verify:task
---

# TASK-005 — Hoàn thiện bố cục và điều hướng `/docs`

## Bối cảnh

TASK-004 đã tách các giải pháp thành Fumadocs root độc lập, nhưng điều hướng
hiện tại chưa giữ được đầy đủ context giữa Hub, từng giải pháp và các vùng
Hướng dẫn/API. Mockup `ods-docs-nav.html` được dùng làm visual reference cho
header, solution switcher và contextual tabs.

## Mục tiêu

Hoàn thiện bố cục `/docs` với header gọn, solution switcher, contextual tabs,
sidebar/TOC Fumadocs và responsive navigation. Giữ nguyên URL, nội dung và
ranh giới public/internal hiện có.

## Phạm vi (Scope)

### Tạo mới:
- `src/components/docs-container.tsx`
- `src/components/top-nav.tsx`
- `src/lib/docs-navigation.ts`

### Sửa đổi:
- `src/app/docs/layout.tsx`
- `src/app/global.css`
- `src/lib/layout.shared.tsx`

## Ngoài phạm vi (Out of Scope)

- [ ] Không sửa nội dung hay URL trong `content/docs/**`.
- [ ] Không thay đổi ranh giới bảo mật public/internal hoặc search source.
- [ ] Không làm custom API code panel ba cột.
- [ ] Không thêm dependency, cấu hình deploy, secret hoặc OAuth.
- [ ] Không nhận các thay đổi Docker, media import hay content import đang có ở checkout khác.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ [AGENTS.md](../AGENTS.md) và [DECISIONS.md](../DECISIONS.md).
- Dùng `DocsLayout`, page tree và Search của Fumadocs 16.15.10; không viết lại search/sidebar.
- Navigation model phải có type tường minh, không dùng `any` hoặc type cast để lách compiler.
- Active state dùng route prefix dài nhất và hoạt động với cả `huong-dan/**`
  lẫn `user-guider-portal/**` khi cây content tương ứng tồn tại.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [ ] `/docs` chọn Hub và không hiện contextual tabs một mục.
- [ ] `/docs/ai-contact-center` chọn AI Contact Center và tab Tổng quan.
- [ ] Route con của `huong-dan/**` hoặc `user-guider-portal/**` chọn tab Hướng dẫn Portal.
- [ ] Route con của `api/**` chọn tab API Reference.
- [ ] `/docs/cloudfile` chọn CloudFile, sidebar cô lập và không hiện contextual tabs một mục.
- [ ] Header có Search Fumadocs, GitHub và utility menu chứa Blog, Hỗ trợ, ODS ID.
- [ ] Dropdown hỗ trợ mouse, keyboard, `Escape`, click-outside, focus state và ARIA.
- [ ] Desktop 1440 px, tablet 768 px và mobile 390 px không che sidebar, TOC hay nội dung.
- [ ] `/internal/**` và `/api/search/internal/**` tiếp tục bị chặn theo cấu hình hiện hành.
- [ ] `npm run typecheck`, `npm run check:links`, `git diff --check` và `npm run verify:task` thành công.

## Điều kiện dừng (Stop Condition)

Dừng lại và hỏi Human nếu cần thay đổi auth/public-internal boundary, content,
route, dependency hoặc sửa test để làm kiểm chứng đi qua.

## Báo cáo khi hoàn thành

- Tạo `.harness/reports/TASK-005-report.md` với danh sách file và output kiểm chứng.
- Đính kèm ảnh desktop, tablet và mobile trong `.harness/reports/assets/TASK-005/`.
- Giữ `status: in-progress` đến khi PR CI xanh; không tự chuyển task sang `done`.
