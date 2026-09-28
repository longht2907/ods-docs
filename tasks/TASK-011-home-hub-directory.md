---
status: in-progress
branch: task/TASK-011-home-hub-directory
commit: ""
verified-by: npm run verify:task
---

# TASK-011 — Home hub dạng danh mục tài liệu

## Bối cảnh

Trang chủ hiện tại (`src/app/(home)/page.tsx`) có 7 section, lặp một sản phẩm 4–5 lần, đi sâu vào chi tiết (danh sách chương, code cURL, metrics) khiến giao diện bị rối và không thể hiện rõ vai trò cổng danh mục trung tâm tài liệu ODS cho khách hàng doanh nghiệp.

Hiện site chỉ có tài liệu chính thức cho:
- **AI Contact Center**: Hướng dẫn sử dụng Portal + API Reference.
- **CloudFile**: Hướng dẫn sử dụng.

Các nhóm giải pháp khác (Hạ tầng số, Dịch vụ quản trị, Bản quyền phần mềm, và các sản phẩm Cloud khác) chưa có tài liệu trên site, chỉ trỏ về `ods.vn`. Cần chuyển Home thành cổng danh mục gọn gàng, định hướng rõ ràng và tự động cập nhật khi có thêm sản phẩm mới trong registry.

## Mục tiêu

Xây dựng Home hub tinh gọn với 5 phần từ trên xuống:
1. **Hero**: Căn giữa, tiêu đề rõ ràng, thanh tìm kiếm lớn và gợi ý tìm kiếm phổ biến.
2. **Dải giới thiệu ODS**: Banner mỏng nền tối giới thiệu 5 nhóm giải pháp ODS.
3. **Danh mục sản phẩm**: Nhóm theo giải pháp ODS; mỗi sản phẩm có tài liệu là 1 card với các entry link dẫn vào tài liệu; sản phẩm/nhóm chưa có tài liệu hiển thị dạng chip viền đứt liên kết ngoài tới ods.vn.
4. **Hỗ trợ**: 3 thẻ liên kết tới Support Portal, Kiến thức (Blog) và Liên hệ tư vấn.
5. **Footer**: 1 dòng tinh gọn bản quyền và liên kết chính thức.

## Phạm vi

### Tạo mới:
- `tasks/TASK-011-home-hub-directory.md`
- `.harness/reports/TASK-011-report.md`
- `.harness/reports/assets/TASK-011/**`

### Sửa đổi:
- `src/lib/docs-products.ts`
- `src/lib/home-content.ts`
- `src/app/(home)/page.tsx`
- `src/app/global.css`
- `harness/tests/routes.test.mjs`

### Xóa:
- `src/components/home/hero-preview.tsx`
- `src/components/home/role-guides.tsx`

## Ngoài phạm vi

- Không đổi tên route `/docs/ai-contact-center/user-guider-portal`.
- Không tách tab API hay sửa file `/docs/index.mdx` và `meta.json`.
- Không thay đổi ranh giới bảo mật public/internal.
- Không thêm dependency mới.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ nghiêm ngặt [AGENTS.md](../AGENTS.md) và [DECISIONS.md](../DECISIONS.md).
- Không hard-code các đường dẫn `/docs/...` trong `page.tsx`; mọi liên kết sản phẩm lấy trực tiếp từ registry `docsProducts` và `odsSolutionGroups`.
- Dùng token màu và biến của Fumadocs (`bg-fd-background`, `border-fd-border`, `text-fd-muted-foreground`, `bg-fd-card`, `text-fd-foreground`).
- Hỗ trợ đầy đủ Dark mode, responsive mượt mà từ 390px đến 1440px+ (không tràn ngang), focus ring cho bàn phím và vô hiệu hóa chuyển động khi `prefers-reduced-motion: reduce`.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [ ] Home chỉ có: Hero, Dải ODS, Danh mục sản phẩm, Hỗ trợ, Footer.
- [ ] Mỗi sản phẩm có tài liệu chỉ xuất hiện 1 lần dưới dạng card (không tính nav/search).
- [ ] Link: ACC → Hướng dẫn và API; CloudFile → Hướng dẫn; tất cả trả 200 khi build.
- [ ] Sản phẩm/nhóm chưa có tài liệu chỉ hiện chip link ngoài ↗, mở tab mới.
- [ ] Không hard-code `/docs/...` trong `page.tsx`.
- [ ] Không tràn ngang ở 390px; bàn phím tab được qua mọi link, có focus ring; tương phản đạt WCAG AA; dark mode hiển thị đúng.
- [ ] Nội dung tiếng Việt; không thêm dependency; không đổi URL; `verify:task`, `check:scope`, `guard` pass.

## Điều kiện dừng (Stop Condition)

Dừng lại và xin ý kiến Human ngay lập tức nếu:
1. Gặp lỗi build / typecheck không giải quyết được sau 3 lần thử.
2. Cần cài thêm thư viện ngoài phạm vi cho phép.
3. Yêu cầu mâu thuẫn với mục "Không được phá vỡ" trong `AGENTS.md`.

## Báo cáo khi hoàn thành

- Danh sách các file đã tạo / sửa / xóa.
- Kết quả thực tế của các lệnh kiểm tra (`npm run verify:task`, `check:scope`, `guard`).
- Ảnh chụp màn hình desktop (1440px) và mobile (390px) minh chứng giao diện hoàn chỉnh.
