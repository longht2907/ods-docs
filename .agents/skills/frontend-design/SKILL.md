---
name: frontend-design
description: Tiêu chuẩn thiết kế UI/UX cao cấp cho ODS Docs theo phong cách platform.claude.com/docs.
---

# Frontend Design & UI/UX Standards (Claude Docs Aesthetic)

Hướng dẫn thiết kế giao diện cao cấp, chuyên nghiệp cho ODS Docs, lấy cảm hứng từ chuẩn mực tài liệu của Anthropic (`platform.claude.com/docs`).

## 1. Triết lý thẩm mỹ (Visual Philosophy)
- **Tối giản nhưng tinh tế (Subtle & Refined)**: Tránh màu sắc chói lọi, không dùng bóng đổ quá gắt. Ưu tiên đường nét sắc cạnh, tinh khiết, khoảng cách thoáng đãng (generous whitespace).
- **Màu sắc & Độ tương phản**:
  - Dark mode: Tông nền xám đen trầm (zinc/slate/neutral 900 hoặc 950), không dùng đen tuyệt đối (`#000000`). Đường viền phân cách mờ tinh tế (`border-border/40` hoặc `border-neutral-800`).
  - Light mode: Tông nền sáng dịu (`#FAF9F5` hoặc off-white cao cấp), tương phản chữ cao đạt chuẩn WCAG AAA.
  - Accent Color: Màu nhấn ấm áp, thanh lịch (terracotta, amber ấm hoặc primary brand tinh tế).

## 2. Bố cục 3 Phân Vùng (Three-Column Architecture)
Học hỏi trực tiếp từ layout `platform.claude.com/docs`:
1. **Left Navigation Sidebar**:
   - Menu phân cấp rõ ràng theo danh mục (Guides, API Reference, Onboarding, Runbooks).
   - Trạng thái Active có vạch chỉ báo hoặc background highlight mềm mại (`rounded-md`, transition 150ms).
   - Tích hợp thanh tìm kiếm nhanh dạng command palette (`Cmd+K`).
2. **Center Main Content**:
   - Bề rộng đọc tối ưu (`max-w-3xl` hoặc `prose-lg`).
   - Phân cấp tiêu đề (`h1`, `h2`, `h3`) rõ rệt với font sans-serif hiện đại.
   - Code blocks có syntax highlighting sắc nét, nút copy trực quan và tên file/ngôn ngữ ở header.
3. **Right Table of Contents (On this page)**:
   - Danh sách đề mục tự động cuộn (Scrollspy).
   - Đánh dấu đề mục hiện tại đang đọc một cách mượt mà.

## 3. Micro-Interactions & Trải nghiệm người dùng (UX)
- **Code Copy Button**: Có tooltip và icon chuyển đổi mượt mà giữa "Copy" ➔ "Copied!" với checkmark.
- **Callout / Alert Cards**: Thiết kế phẳng hoặc viền mỏng (`border-l-2` hoặc subtle border), icon đồng bộ, màu sắc nhã nhặn (Note, Tip, Warning, Danger).
- **Navigation Breadcrumbs**: Hiển thị đường dẫn trang rõ ràng ở đầu bài viết để người dùng luôn định vị được vị trí.
- **Responsive**: Co giãn mượt mà trên mobile/tablet với drawer navigation tiện lợi.
