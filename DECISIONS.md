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
  - Kiểm tra an toàn: Script tự động [harness/guard.mjs](harness/guard.mjs) chạy cơ học, không tốn token, phát hiện secret và vi phạm ranh giới.
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

---

## ADR-004: Gate CI, Phase Lock và Scope Enforcement

- **Ngày quyết định**: 2026-09-14
- **Trạng thái**: Đã áp dụng (Chấp thuận)
- **Bối cảnh**:
  - Hạ tầng kiểm chứng trước đó còn rời rạc; CI chỉ kích hoạt trên pull request; guard có nguy cơ bị bypass nếu thư mục nội bộ bị xóa; agent có thể sửa vượt phạm vi cho phép mà không bị máy phát hiện.
- **Quyết định**:
  1. **Phase Lock**: Khởi tạo `.harness/phase.json` khai báo trạng thái kỳ vọng tối thiểu. Guard sẽ FAIL nếu phase thực tế thấp hơn phase khai báo (Monotonic Phase).
  2. **Scope Enforcement**: Sử dụng `harness/linters/scope-check.mjs` để so sánh git diff với allowlist trong mục "Phạm vi" của task file tương ứng với branch.
  3. **Env Guard & Fail-Closed**: Dùng `git check-ignore` xác thực triệt để các biến môi trường; ném lỗi ngay khi build production nếu bật cờ dev `ODS_INTERNAL_DEV_OPEN=true`.
  4. **Single Command of Truth**: Thống nhất quy trình nghiệm thu qua lệnh `npm run verify:task`.
- **Hệ quả**:
  - Mọi task chuyển sang `status: done` bắt buộc phải kèm báo cáo nghiệm thu `.harness/reports/TASK-XXX-report.md`.

---

## ADR-005: Phân tách ba tầng cấu trúc: Sản phẩm, Kiểm soát và Kết quả kiểm soát

- **Ngày quyết định**: 2026-09-14
- **Trạng thái**: Đã áp dụng (Chấp thuận)
- **Bối cảnh**:
  - Ban đầu `guard.mjs` nằm đơn lẻ trong thư mục `scripts/`, và không có tài liệu phân biệt rõ giữa `harness/` và `.harness/`, dẫn đến nhầm lẫn giữa mã nguồn kiểm soát và kết quả kiểm soát do máy sinh.
- **Quyết định**:
  1. **Tiêu chí phân loại rõ ràng**: Đặt câu hỏi: *"Nếu xoá file/thư mục này đi thì website có đổi hành vi hoặc ngừng hoạt động không?"*
     - **Có** $\rightarrow$ Thuộc nhóm **Sản phẩm**.
     - **Không** $\rightarrow$ Thuộc nhóm **Kiểm soát**.
  2. **Ba nhóm thư mục**:
     - **Sản phẩm (Product code)**: `src/`, `content/`, `public/`, `next.config.mjs` — mã nguồn và nội dung trực tiếp phục vụ người dùng cuối.
     - **Kiểm soát (Harness & Specifications)**: `harness/`, `tasks/`, `AGENTS.md`, `DECISIONS.md`, `.github/`, `.agents/` — mã kiểm soát chất lượng do con người/agent viết, cần được review nghiêm ngặt trong PR.
     - **Kết quả kiểm soát (Artifacts & Evidence)**: `.harness/` (`phase.json`, `reports/`) — dữ liệu đầu ra do máy sinh ra để làm bằng chứng nghiệm thu, không yêu cầu review thủ công.
  3. **Lý do không gom toàn bộ kiểm soát vào một thư mục duy nhất**:
     - Bốn đường dẫn bị các công cụ và nền tảng chuẩn hoá khoá cứng:
       - `.github/workflows/` do GitHub Actions quy định.
       - `AGENTS.md` đặt tại thư mục gốc để AI coding agent tự động nhận diện.
       - `.agents/skills/` do Antigravity CLI và agent framework quy định.
       - `package.json` bắt buộc nằm tại root theo chuẩn Node.js/npm.
  4. **Vị trí của `src/proxy.ts`**:
     - `src/proxy.ts` bắt buộc ở lại trong `src/` vì nó thực thi bảo vệ ranh giới lúc runtime (Edge proxy). Nếu xoá file này, vùng `/internal` sẽ bị mở toang — đây là hành vi trực tiếp của sản phẩm, không phải code kiểm soát kiểm thử.
