---
status: in-progress
branch: task/TASK-012-product-docs-sites
commit: "9dbf65d"
verified-by: npm run verify:task
---

# TASK-012 — Product docs sites bằng Fumadocs root tabs

## Bối cảnh

Khu vực public docs hiện có các Fumadocs root lồng nhau cho AI Contact Center, Guide và API. Cấu trúc này khiến Guide và API trở thành các site độc lập, vì vậy người đọc không thấy toàn bộ cây tài liệu AI Contact Center trong cùng một sidebar. Trang `/docs` cũng chưa phải một root tab Quick Start độc lập.

TASK-012 tổ chức lại Page Tree thành ba documentation site cấp cao: Bắt đầu, AI Contact Center và CloudFile. AI Contact Center chứa chung Guide và API; Page Tree từ `meta.json` tiếp tục là nguồn sidebar, còn registry chỉ cung cấp metadata trình bày.

TASK-012 kế thừa nguyên trạng Home của TASK-011 và chỉ sửa link API gãy. Nhánh này phụ thuộc TASK-011 được merge vào `main` trước khi chạy gate scope cuối và mở Pull Request.

## Mục tiêu

- `/docs` là tab Bắt đầu với Quick Start và danh mục sản phẩm.
- Layout Tabs có đúng ba site: Bắt đầu, AI Contact Center và CloudFile.
- Sidebar AI Contact Center hiển thị đồng thời Guide và API, không hiển thị cây CloudFile.
- Thêm khung Guide Gọi tự động và chia API thành Tổng đài, Autocall, Webhook.
- Giữ nguyên toàn bộ URL Guide 01–09 và các ranh giới public/internal hiện có.

## Phạm vi

### Tạo mới

- `content/docs/(bat-dau)/**`
- `content/docs/ai-contact-center/user-guider-portal/10-goi-tu-dong/**`
- `content/docs/ai-contact-center/api/tong-dai/**`
- `content/docs/ai-contact-center/api/autocall/**`
- `content/docs/ai-contact-center/api/webhook/**`
- `tasks/TASK-012-product-docs-sites.md`
- `.harness/reports/TASK-012-report.md`
- `.harness/reports/assets/TASK-012/**`

### Sửa đổi

- `content/docs/meta.json`
- `content/docs/ai-contact-center/meta.json`
- `content/docs/ai-contact-center/user-guider-portal/meta.json`
- `content/docs/ai-contact-center/api/meta.json`
- `content/docs/ai-contact-center/api/index.mdx`
- `src/app/docs/layout.tsx`
- `src/lib/layout.shared.tsx`
- `src/app/(home)/page.tsx`
- `harness/guard.mjs`

### Xóa

- `content/docs/index.mdx`

## Ngoài phạm vi

- Không sửa `harness/tests/**` hoặc nới điều kiện kiểm thử.
- Không đổi URL `user-guider-portal`, không đổi tên thư mục Guide 01–09 và không thêm redirect.
- Không tạo `api/overview.mdx` hoặc đặc tả endpoint Autocall/Webhook chưa có nguồn.
- Không sửa registry, source loader, CloudFile meta, DocsProductDirectory hoặc refactor Home ngoài link gãy.
- Không chạm auth, `proxy.ts`, internal docs, search source, sitemap, `llms.txt`, deploy, OAuth hoặc secret.
- Không thêm dependency.

## Ràng buộc kiến trúc và nội dung

- Chỉ `(bat-dau)`, `ai-contact-center` và `cloudfile` có `root: true`.
- `user-guider-portal` và `api` là folder thường, có `defaultOpen: true`.
- `DocsLayout` dùng `tabMode="auto"` và `sidebar.defaultOpenLevel: 0`.
- Mọi MDX mới có `title` và `description`, viết tiếng Việt và giữ thuật ngữ kỹ thuật English khi phù hợp.
- Nội dung Click-to-Call hiện tại được chuyển nguyên vẹn, tiếp tục dùng placeholder `<YOUR_API_TOKEN>`.
- Cùng một page URL không xuất hiện hai lần trong Page Tree.

## Tiêu chí nghiệm thu

- [x] `/docs` trả 200 và là root tab Bắt đầu với `<DocsProductDirectory />`.
- [x] Switcher có đúng Bắt đầu, AI Contact Center và CloudFile.
- [x] Sidebar ACC có Guide và API; Guide/API không còn là root tab riêng.
- [x] Sidebar `/docs` không lặp navigation Home: Tài liệu Sản phẩm, API Reference và Tất cả tài liệu.
- [x] Guide Gọi tự động và ba trang con trả 200, nằm sau Quản lý cuộc gọi và trước Quản lý hội thoại.
- [x] `/docs/ai-contact-center/api` là mục lục ba nhóm.
- [x] Route Khởi tạo cuộc gọi giữ đủ nội dung Click-to-Call và bốn code tab.
- [x] Autocall và Webhook trả 200 nhưng không chứa endpoint hoặc payload suy đoán.
- [x] Không còn link public tới `/docs/ai-contact-center/api/overview`.
- [x] Toàn bộ URL Guide 01–09 tiếp tục trả 200.
- [x] Không có horizontal overflow ở 1440px và 390px; keyboard focus và mobile drawer hoạt động.
- [ ] `git diff --check`, `npm run typecheck`, `npm run check:links`, `npm run guard` và `npm run verify:task` pass; không sửa test.
- [ ] Report có 14 ảnh runtime cho bảy route bắt buộc ở desktop và mobile.

## Điều kiện dừng

Dừng và hỏi Human nếu cần đổi public URL, thêm redirect/dependency, chạm auth/internal, test hiện hữu bắt nested root hoặc `/api/overview`, hoặc `(bat-dau)` làm `/docs` 404 sau lần sửa meta đầu tiên.

## Báo cáo khi hoàn thành

- Danh sách file tạo, sửa, xóa.
- Output thật của các lệnh verification và route matrix.
- Evidence desktop/mobile chứng minh tabs, sidebar isolation và responsive.
- Giới hạn còn lại, trạng thái PR/CI và dependency vào TASK-011.
