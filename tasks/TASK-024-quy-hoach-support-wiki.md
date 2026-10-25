---
status: in-progress
branch: task/TASK-024-quy-hoach-support-wiki
commit: ""
verified-by: npm run verify:task
---

# TASK-024 — Quy hoạch lại Support Wiki tại /internal

## Bối cảnh & Phạm vi triển khai

Support Wiki tại `/internal` là cổng thông tin nội bộ cho nhân viên Support ODS. Nhiệm vụ bao gồm:
1. Hoàn thiện toàn diện nhóm **Bắt đầu** (`/internal`).
2. Xây dựng các wiki dịch vụ chuyên môn theo từng mảng:
   - **Data Center**: Quy trình nhập/xuất server, gắn KVM/Console, reboot và hỗ trợ thao tác phần cứng/OS.
   - **Network**: Quy trình cấp/thu hồi IP, runbooks xử lý sự cố (DDoS, Blacklist, Leased-Line, rớt switch, kiểm tra mạng) và sơ đồ topology.
   - **License phần mềm**: Quy trình đăng ký license Plesk, cPanel, DirectAdmin.
3. Bảo toàn nguyên vẹn tài nguyên wiki Tổng đài (`ai-contact-center`) đã làm trước đó.

## Mục tiêu

1. **Chuẩn hóa Trang chủ Support Wiki** (`/internal`): Lộ trình 4 bước bắt đầu cho Support.
2. **Hoàn thiện các trang Bắt đầu**: Tổng quan dịch vụ, Mã dịch vụ & tra cứu Odoo, Tiếp nhận & điều hướng yêu cầu.
3. **Hoàn thiện Wiki Data Center** (`/internal/data-center`): Trang tổng quan và 6 bài quy trình vận hành.
4. **Hoàn thiện Wiki Network** (`/internal/network`): Trang tổng quan, 2 bài quy trình vận hành, 6 bài runbook sự cố và 1 bài kiến thức kỹ thuật topology.
5. **Hoàn thiện Wiki License phần mềm** (`/internal/software-license`): Trang tổng quan và bài quy trình đăng ký license.
6. **Chuẩn hóa điều hướng Support Wiki**: Navigation gốc hiển thị 5 nhóm dịch vụ ngang hàng.

## Phạm vi

- `tasks/TASK-024-quy-hoach-support-wiki.md`
- `.harness/reports/**`
- `.agents/skills/write-operational-process/**`
- `content/internal/(home)/**`
- `content/internal/ai-contact-center/**`
- `content/internal/data-center/**`
- `content/internal/network/**`
- `content/internal/software-license/**`
- `content/internal/meta.json`
- `public/media/ai-contact-center/**`
- `src/app/internal/**`
- `src/components/flowchart/**`
- `src/components/mdx.tsx`

## Ngoài phạm vi

- Không sửa `content/docs/**` hoặc bất kỳ nội dung public nào.
- Không sửa auth, proxy, login, session hay middleware.
- Không sửa Search API hay sitemap.
- Không thêm dependency mới vào `package.json`.
- Không commit bí mật, API key, credential hay dữ liệu cá nhân khách hàng.
- Không đưa đường dẫn tuyệt đối local (`E:\Project\...`) vào nội dung bài viết cho người đọc.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ [AGENTS.md](../AGENTS.md), [DECISIONS.md](../DECISIONS.md) (ADR-001, ADR-006).
- Mọi file MDX phải có đầy đủ `title` và `description` trong frontmatter.
- Không có broken links (`npm run check:links`).
- Vượt qua toàn bộ kiểm thử harness (`npm run verify:code`).

## Tiêu chí nghiệm thu

- [x] Lộ trình 4 bước trên Trang chủ Support Wiki (`/internal`) trực quan, rõ ràng.
- [x] Trang Tổng quan dịch vụ ODS (`/internal/services`) bao phủ 6 nhóm dịch vụ.
- [x] Trang Mã dịch vụ & tra cứu trên Odoo (`/internal/service-codes`) nêu rõ 3 tầng định danh và quy ước tiền tố mã.
- [x] Trang Tiếp nhận & điều hướng (`/internal/request-routing`) chuẩn hóa luồng 7 bước và 4 nhóm yêu cầu.
- [x] Hoàn thiện 6 bài quy trình vận hành Data Center.
- [x] Hoàn thiện 2 bài quy trình, 6 bài runbook sự cố và 1 bài topology Network.
- [x] Hoàn thiện quy trình đăng ký License phần mềm.
- [x] Cấu trúc điều hướng Support Wiki hiển thị chuẩn 5 nhóm ngang hàng.
- [x] `npm run verify:code` PASS (typecheck + check:env + check:links + guard).
- [x] `npm run check:scope` PASS.
- [x] Báo cáo nghiệm thu `.harness/reports/TASK-024-report.md` đầy đủ minh chứng.
