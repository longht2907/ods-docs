# ODS Documentation Platform

Nền tảng tài liệu kỹ thuật và Support Wiki của ODS, xây dựng bằng Next.js 16,
Fumadocs và MDX.

| Route | Nội dung | Truy cập mục tiêu |
| --- | --- | --- |
| `/docs/**` | Tài liệu sản phẩm cho khách hàng | Public Internet |
| `/internal/**` | Wiki hỗ trợ và vận hành | Office WAN hoặc VPN công ty |

Kiến trúc chi tiết, request flow và security boundary được mô tả trong
[ARCHITECTURE.md](ARCHITECTURE.md).

## Trạng thái bảo vệ internal

Runtime hiện tại đang **fail-closed**: `/internal/**` và
`/api/search/internal/**` mặc định trả `401`; cờ `ODS_INTERNAL_DEV_OPEN=true`
chỉ dùng trong development và bị cấm trong production.

Target architecture đã được chấp thuận nhưng chưa triển khai:

- Caddy cho phép internal request từ office WAN hoặc VPN NAT qua WAN công ty;
- Next.js giữ lớp kiểm tra fail-closed thứ hai;
- không có local account, password, OTP, Session, user database hoặc RBAC;
- repository dự kiến chuyển sang private, nhưng visibility phải được Human xác
  minh trên GitHub trước khi coi là trạng thái thực tế.

Không mở production internal bằng cờ development. Network gate phải được triển
khai và kiểm chứng trong một task riêng.

## Tech stack

| Thành phần | Vai trò |
| --- | --- |
| Next.js 16 App Router | Routing, server rendering, Route Handler và runtime boundary |
| React 19 + TypeScript | UI và type safety |
| Fumadocs | PageTree, layout, sidebar, TOC và Search index |
| MDX | Nội dung tài liệu được version control trong Git |
| Caddy | Reverse proxy/TLS; target L7 network gate cho internal |
| Docker | Đóng gói Next.js `standalone` để chạy trên VPS |
| GitHub + CI | Review, kiểm chứng và quản lý vòng đời thay đổi |

## Cấu trúc chính

```text
ods-docs/
├── src/
│   ├── app/docs/                    # Public routes
│   ├── app/internal/                # Internal routes
│   ├── app/api/search/              # Public/internal Search API
│   ├── components/                  # UI và MDX components
│   ├── lib/source.ts                # Public/internal source loaders
│   └── proxy.ts                     # Runtime fail-closed boundary
├── content/
│   ├── docs/                        # Public MDX
│   └── internal/                    # Internal MDX
├── public/media/                    # Chỉ media được phép public
├── private-media/internal/          # Target; chưa tồn tại, không public trực tiếp
├── harness/                         # Guard, linter và runtime tests
├── tasks/                           # Task specifications
└── .harness/reports/                # Verification evidence
```

Public và internal content là hai trust zone độc lập. Public Search, sitemap và
LLM outputs không được đọc `internalSource`.

## Chạy local

Yêu cầu: Node.js `>=22.23.4 <23`.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Internal content chỉ được mở
local khi developer chủ động đặt `ODS_INTERNAL_DEV_OPEN=true` trong file env đã
được Git ignore; không đưa cờ này vào production config.

## Kiểm chứng

| Lệnh | Mục đích |
| --- | --- |
| `npm run check:env` | Kiểm tra env và secret safety |
| `npm run check:links` | Kiểm tra internal links trong MDX/Markdown |
| `npm run check:scope` | So sánh thay đổi với task allowlist |
| `npm run guard` | Kiểm tra security boundary, frontmatter và phase lock |
| `npm run types:check` | Sinh route types và chạy TypeScript check |
| `npm run verify:code` | Chạy toàn bộ static verification |
| `npm run verify:task` | Build và chạy toàn bộ regression/runtime tests |

## Quy trình đóng góp

1. Tạo task spec từ `tasks/TASK-TEMPLATE.md`, đặt `status: in-progress`.
2. Tạo branch `task/TASK-XXX-ten-task`.
3. Chỉ thay đổi các file thuộc Scope và chạy `npm run verify:task`.
4. Tạo `.harness/reports/TASK-XXX-report.md` bằng kết quả thật.
5. Push branch, mở Pull Request vào `main` và chờ CI xanh.
6. Chỉ cập nhật task thành `done` sau khi đủ bằng chứng theo quy trình dự án.

## Tài liệu liên quan

- [ARCHITECTURE.md](ARCHITECTURE.md) — kiến trúc, request flow và trust boundary.
- [DECISIONS.md](DECISIONS.md) — Architecture Decision Records.
- [DEPLOY_VPS.md](DEPLOY_VPS.md) — quy trình build và deploy VPS.
- [AGENTS.md](AGENTS.md) — invariants và quy tắc cho coding agent.
- [content/README.md](content/README.md) — quy chuẩn tổ chức nội dung.
- [harness/README.md](harness/README.md) — hạ tầng kiểm soát và kiểm chứng.
- [tasks/README.md](tasks/README.md) — vòng đời task và scope enforcement.
