# ODS Documentation Platform

Nền tảng tài liệu kỹ thuật và vận hành cho ODS (Open Data System), phục vụ đồng thời hai đối tượng: khách hàng/đối tác bên ngoài và nhân viên nội bộ.

---

## Kiến trúc

Hệ thống được xây dựng trên nền tảng **Next.js 16** (App Router), **Fumadocs** và **MDX**, phân tách thành hai vùng tài liệu độc lập với mức độ tin cậy khác nhau:

- `content/docs/` — Tài liệu công khai (`/docs/**`), khách hàng và nhân viên đều đọc được, hỗ trợ SEO và tìm kiếm mở.
- `content/internal/` — Tài liệu nội bộ (`/internal/**`), bắt buộc đăng nhập, không index lên máy tìm kiếm hay LLM crawler, không cho phép cache CDN (`Cache-Control: private, no-store`).
- `src/proxy.ts` — Thực thi ranh giới bảo vệ cấp runtime: chặn truy cập `/internal` và `/api/search/internal` ngay tại request đầu tiên khi chưa có quyền xác thực.

---

## Cấu trúc thư mục

```text
ods-docs/
├── src/                          # Code sản phẩm (Application runtime)
│   ├── app/                      # Next.js App Router (routes, layouts, API search)
│   ├── lib/                      # Tiện ích chia sẻ và loaders (source.ts)
│   └── proxy.ts                  # Edge proxy bảo vệ ranh giới public/internal
├── content/                      # Nội dung tài liệu sản phẩm (MDX)
│   ├── docs/                     # Tài liệu công khai (/docs)
│   └── internal/                 # Tài liệu nội bộ (/internal)
├── public/                       # Static assets, llms.txt, favicon
├── next.config.mjs               # Cấu hình Next.js (Fumadocs MDX, standalone)
│
├── harness/                      # Code kiểm soát (Không thuộc sản phẩm, do người viết)
│   ├── guard.mjs                 # Bộ kiểm tra an toàn và ranh giới bảo mật dự án
│   ├── linters/                  # Linter tĩnh (broken-links, env-guard, scope-check)
│   ├── tests/                    # Kiểm thử runtime (routes.test.mjs)
│   ├── hooks/                    # Git hooks kiểm tra trước commit
│   └── README.md                 # Tài liệu giải thích hạ tầng kiểm soát
├── tasks/                        # Quản lý vòng đời nhiệm vụ (Task specs)
│   ├── TASK-XXX-*.md             # Đặc tả chi tiết từng task
│   ├── TASK-TEMPLATE.md          # Bản mẫu khởi tạo task
│   └── README.md                 # Quy ước trạng thái task và allowlist
├── AGENTS.md                     # Quy tắc bất biến và hướng dẫn cho coding agent
├── DECISIONS.md                  # Hồ sơ quyết định kiến trúc (ADRs)
│
└── .harness/                     # Kết quả kiểm soát (Do máy tự động sinh ra)
    ├── phase.json                # Khai báo phase tối thiểu (Phase Lock)
    └── reports/                  # Báo cáo nghiệm thu thực tế sau mỗi task
```

---

## Bắt đầu

Yêu cầu môi trường: **Node.js >= 22**.

Cài đặt dependencies và chạy môi trường phát triển:

```bash
npm install
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để xem giao diện.

---

## Lệnh kiểm tra

Dự án cung cấp chuỗi lệnh tự động hóa kiểm tra tính toàn vẹn, bảo mật và tương thích trước khi merge:

| Lệnh | Ý nghĩa |
| --- | --- |
| `npm run check:env` | Kiểm tra an toàn biến môi trường và `.gitignore` |
| `npm run check:links` | Kiểm tra các liên kết nội bộ MDX không bị gãy |
| `npm run check:scope` | Kiểm tra file thay đổi không vượt ngoài phạm vi allowlist của task |
| `npm run guard` | Kiểm tra ranh giới public/internal, secret, phase lock và frontmatter |
| `npm run types:check` | Tạo route types và kiểm tra lỗi TypeScript (`tsc --noEmit`) |
| `npm run verify:code` | Kiểm tra toàn bộ mã nguồn tĩnh (`types:check` + `check:env` + `check:links` + `guard`) |
| `npm run verify` | Chạy `verify:code` và đóng gói production build (`next build`) |
| `npm run test:routes` | Khởi động server production (`next start`) và kiểm tra 7 route ranh giới bảo vệ |
| `npm run verify:task` | Chạy toàn bộ chuỗi kiểm chứng trước khi nộp task (`verify:code` + `check:scope` + `build` + `test:routes`) |

---

## Quy trình đóng góp

Mọi thay đổi code đều phải tuân thủ nghiêm ngặt quy trình quản lý task và kiểm soát chất lượng:

1. **Khởi tạo Task Spec**: Tạo file `tasks/TASK-XXX-ten-task.md` từ `tasks/TASK-TEMPLATE.md`, định nghĩa rõ mục tiêu và danh sách file trong "Phạm vi" (Scope), đặt `status: in-progress`.
2. **Tạo Task Branch**: Mở branch riêng theo định dạng `task/TASK-XXX-ten-task`.
3. **Thực thi & Tự kiểm chứng**: Sửa đổi đúng phạm vi, chạy kiểm chứng cục bộ bằng `npm run verify:task`.
4. **Báo cáo nghiệm thu**: Lập báo cáo kết quả thực tế tại `.harness/reports/TASK-XXX-report.md`.
5. **Mở Pull Request**: Mở PR vào nhánh `main`.
6. **Chờ CI xanh & Hoàn tất**: Sau khi GitHub Actions CI báo xanh toàn bộ, cập nhật `status: done` và commit hash thật cuối cùng (`git rev-parse --short HEAD`), sau đó merge vào `main`.

---

## Liên kết

- [AGENTS.md](AGENTS.md) — Quy tắc bắt buộc cho AI coding agent và kỹ sư.
- [DECISIONS.md](DECISIONS.md) — Hồ sơ quyết định kiến trúc (ADR-001 đến ADR-005).
- [harness/README.md](harness/README.md) — Hướng dẫn chi tiết về hạ tầng kiểm soát.
- [tasks/README.md](tasks/README.md) — Quy ước quản lý task và cấu trúc frontmatter.
