# DECISIONS.md — Hồ sơ Quyết định Kiến trúc (ADRs)

Tài liệu này lưu trữ các quyết định kiến trúc quan trọng của dự án `ods-docs`. Mọi Agent hoặc Developer khi làm việc trên repo phải đọc tài liệu này để hiểu lý do kỹ thuật đằng sau hiện trạng hệ thống và không tự ý thay đổi ngược lại các quyết định đã chốt nếu không có sự đồng ý của Human.

---

## ADR-001: Tách hai vùng tài liệu độc lập và bảo vệ 3 lớp

- **Ngày quyết định**: 2026-03
- **Trạng thái**: Đã áp dụng (Chấp thuận)
- **Bối cảnh**:
  - Công ty ODS cần một nền tảng tài liệu phục vụ cả hai đối tượng: khách hàng bên ngoài (`/docs`) và nhân viên nội bộ (`/internal`).
  - Tài liệu nội bộ tuyệt đối không được rò rỉ ra ngoài internet qua tìm kiếm, sitemap hay LLM crawler.
- **Quyết định**:
  - Tách từ tầng nguồn dữ liệu (`loader`) thay vì chỉ ẩn trên giao diện.
  - Thiết lập mô hình bảo vệ 3 lớp:
    1. **Tách nguồn (`loader`)**: `source` đọc `content/docs` (baseUrl `/docs`), `internalSource` đọc `content/internal` (baseUrl `/internal`). Chỉ 3 nơi được phép import `internalSource`.
    2. **Chặn request cấp Edge/Proxy**: `src/proxy.ts` chặn toàn bộ truy cập `/internal` và `/api/search/internal`, trả về 401 khi không có quyền truy cập. Cờ dev `ODS_INTERNAL_DEV_OPEN=true` dùng tạm trước khi tích hợp Auth chính thức.
    3. **Không Cache & Không Index**: Mọi phản hồi chặn đều gắn `Cache-Control: private, no-store, must-revalidate` và `X-Robots-Tag: noindex, nofollow`. Metadata trang nội bộ có `robots: { index: false, follow: false }`.
- **Hệ quả**:
  - Không được chuyển Next.js sang `output: 'export'` vì cơ chế bảo vệ cần server runtime.
  - Tìm kiếm công khai (`/api/search`) tuyệt đối không được liên kết tới `internalSource`.

---

## ADR-002: Lựa chọn Framework và Stack công nghệ

- **Ngày quyết định**: 2026-03
- **Trạng thái**: Đã áp dụng (Chấp thuận)
- **Quyết định**:
  - Framework: Next.js 16 (App Router), React 19, TypeScript strict mode.
  - Documentation Engine: Fumadocs Core 16.x + Fumadocs MDX 15.x + Fumadocs UI (`@fumadocs/base-ui`).
  - Styling: Tailwind CSS v4 với `@tailwindcss/postcss`.
  - Kiểm tra an toàn: Script tự động [scripts/guard.mjs](file:///e:/Project/ods-docs/scripts/guard.mjs) chạy cơ học, không tốn token, phát hiện secret và vi phạm ranh giới.
- **Lý do**:
  - Fumadocs cung cấp sẵn tích hợp MDX hiệu năng cao, tìm kiếm nhanh, khả năng tùy biến layout linh hoạt và hỗ trợ chuẩn xuất dữ liệu cho LLM (`llms.txt`, `llms.mdx`).

---

## ADR-003: Loại bỏ package `cn` dư thừa

- **Ngày quyết định**: 2026-09-14
- **Trạng thái**: Đã áp dụng (Chấp thuận)
- **Bối cảnh**:
  - Trong quá trình scaffold, file `src/lib/cn.ts` phụ thuộc vào package `cn` (`^0.2.6`) được tạo ra nhưng không có bất kỳ component nào trong dự án sử dụng.
- **Quyết định**:
  - Gỡ bỏ `cn` khỏi `package.json` và xóa `src/lib/cn.ts`.
  - Nếu sau này cần tiện ích nối class Tailwind, sẽ cân nhắc giải pháp chuẩn của hệ sinh thái (`clsx` + `tailwind-merge`) hoặc sử dụng helper có sẵn của Fumadocs.
