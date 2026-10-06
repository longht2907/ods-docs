---
status: draft
branch: task/TASK-014-internal-ia
commit: ""
verified-by: npm run verify:task
---

# TASK-014 — Quy hoạch `/internal` thành Support Wiki

## Bối cảnh

`/internal` hiện chỉ có bốn trang placeholder tại `/internal`, `/internal/onboarding`, `/internal/runbook` và `/internal/quy-trinh`. Mục tiêu của task là quy hoạch vùng này thành Support Wiki nội bộ cho nhân viên Support L1/L2, tổ chức theo mảng dịch vụ và giữ nguyên ranh giới public/internal của ADR-001.

Loader internal thực tế nằm trong `src/lib/source.ts`, route render nằm dưới `src/app/internal/**`, search nội bộ nằm tại `src/app/api/search/internal/**` và boundary runtime nằm tại `src/proxy.ts`. Repo không có `source.config.ts` hoặc root `proxy.ts`.

## Mục tiêu

- Tạo hai root navigation: `Bắt đầu` và `Tổng đài`.
- Chuẩn hóa mảng Tổng đài theo ba nhóm `processes`, `runbooks` và `knowledge-base`.
- Tạo landing có navigation hoàn chỉnh và các trang con ở dạng template, chưa điền dữ liệu vận hành thật.
- Cho phép nội dung knowledge base chứa IP hạ tầng và bảng đầu số thật theo ADR-006, nhưng tuyệt đối cấm secret và dữ liệu cá nhân.
- Giữ nguyên auth/proxy, TOC, internal search boundary, noindex/no-store và public search isolation.

## Phạm vi

### Tạo mới hoặc sửa đổi

- `content/internal/**`
- `AGENTS.md`
- `DECISIONS.md`
- `harness/linters/broken-links.mjs`
- `tasks/TASK-014-internal-ia.md`
- `.harness/reports/**`

## Ngoài phạm vi

- Không sửa `src/proxy.ts`, `src/app/internal/layout.tsx`, source loader, search handler hoặc logic auth.
- Không sửa test, không thêm dependency.
- Không sửa `content/docs/**`, `public/media/**`, `src/components/mdx.tsx`, `.harness/phase.json` hoặc `tasks/README.md`.
- Không tạo redirect cho `/internal/runbook` và `/internal/quy-trinh`; hai URL này phải trở thành 404 khi dev access được mở.
- Không điền dữ liệu vận hành thật trong TASK-014.

## Hiện trạng và kiểm soát liên quan

| Thành phần | Hiện trạng |
|---|---|
| Nội dung | `content/internal/index.mdx`, `onboarding/index.mdx`, `runbook/index.mdx`, `quy-trinh/index.mdx` |
| Loader | `internalSource` đọc `content/internal` với base URL `/internal` |
| Render | Server Component `src/app/internal/[[...slug]]/page.tsx`; TOC dùng style `clerk` |
| Search | `/api/search/internal` dùng riêng `internalSource`; public search chỉ dùng `source` |
| Proxy | Chặn `/internal/**` và `/api/search/internal/**`; dev mở bằng `ODS_INTERNAL_DEV_OPEN=true` |
| Guard | Kiểm tra secret, frontmatter, import boundary, public cross-link, llms, Proxy và cache |
| Link checker | Quét MDX public/internal nhưng chưa bỏ route group và chưa kiểm tra JSX `href` |
| Scope checker | Lấy allowlist từ heading `## Phạm vi`; tự cho phép report và `next-env.d.ts` |

Baseline trước task: `npm run guard`, `npm run check:links` và `git diff --check` PASS; `check:scope` bỏ qua do task file chưa tồn tại.

## Mapping đường dẫn

| Cũ | Mới | Hành động | URL kết quả |
|---|---|---|---|
| `content/internal/index.mdx` | `content/internal/(home)/index.mdx` | Move và viết lại landing | `/internal` |
| `content/internal/onboarding/index.mdx` | `content/internal/(home)/onboarding/index.mdx` | Move và đổi title | `/internal/onboarding` |
| `content/internal/quy-trinh/index.mdx` | `content/internal/(home)/policies/index.mdx` | Move và đổi slug/title | `/internal/policies` |
| `content/internal/runbook/index.mdx` | `content/internal/ai-contact-center/runbooks/index.mdx` | Thay bằng landing mới, xóa folder cũ | `/internal/ai-contact-center/runbooks` |
| Không có | `content/internal/(home)/security/index.mdx` | Create | `/internal/security` |
| Không có | `content/internal/(home)/contributing.mdx` | Create | `/internal/contributing` |
| Không có | `content/internal/ai-contact-center/**` | Create | `/internal/ai-contact-center/**` |

## Kế hoạch theo phase

### Phase A — Governance và link checker

- Chuyển task sang `in-progress`.
- Cập nhật chính sách dữ liệu trong `AGENTS.md` và thêm ADR-006 vào `DECISIONS.md`.
- Sửa link checker để bỏ segment `(group)` khi dựng route và kiểm tra cả Markdown link lẫn JSX `href="/docs..."` hoặc `href="/internal..."`.
- Không sửa guard; guard hiện không chặn pattern IP.
- Commit: `feat(internal): define support wiki governance`.

### Phase B — Root và Home

- Root `meta.json` dùng `pages: ["(home)", "ai-contact-center"]`.
- `(home)` có `root: true`, title `Bắt đầu`, gồm landing, `Hội nhập nhân viên mới`, `Quy định chung`, `Bảo mật & dữ liệu khách hàng`, `Đóng góp tài liệu`.
- Home hiển thị `Network — sắp có` và `Bản quyền — sắp có` dưới dạng text, không có link.
- `ai-contact-center` có `root: true`, title `Tổng đài`, landing chỉ link tới ba folder có index.
- Xóa các path placeholder cũ sau khi move; không tạo redirect.
- Commit: `feat(internal): add support wiki roots`.

### Phase C — Processes

- Tạo landing `Quy trình xử lý`, bốn quy trình chính và nhóm `Yêu cầu dịch vụ` gồm bốn trang.
- Title đã chốt: `Tiếp nhận & phân loại case`, `Luồng xử lý sự cố`, `Chuyển cấp hỗ trợ`, `Đóng case`, `Tạo / xóa máy nhánh`, `Cấu hình IVR`, `Đổi đầu số`, `Xuất ghi âm`.
- Mỗi trang dùng khung `Áp dụng khi` → `Các bước` → `SLA` → `Chuyển cấp` → `Kết thúc khi`, có Callout `Đang soạn` và link tới runbook index.
- Commit: `docs(internal): add support process templates`.

### Phase D — Runbooks

- Tạo landing `Bảng tra triệu chứng`, bảy nhóm và đủ 16 runbook theo danh sách đã duyệt.
- Landing có bảng `Triệu chứng | Mức độ | Trang xử lý`; mức độ tạm là `Chưa phân loại`.
- Mỗi runbook dùng khung `Triệu chứng` → `Cần hỏi KH` → `Kiểm tra` → `Xử lý` → `Chuyển cấp` → `Trả lời mẫu` → `Nguyên nhân đã gặp` → `Cập nhật lần cuối`, có Callout và link KB liên quan.
- Commit: `docs(internal): add incident runbook templates`.

### Phase E — Knowledge Base

- Tạo landing `Tra cứu kỹ thuật` và sáu trang `Rule cấu hình gọi ra`, `Bảng đầu số`, `Bảng IP hạ tầng core`, `Nhà mạng & trunk SIP`, `Mã lỗi SIP`, `Thuật ngữ`.
- Mỗi trang dùng khung `Mục đích` → `Bảng dữ liệu` → `Nguồn chuẩn` → `Người cập nhật` → `Cập nhật lần cuối` và Callout `Đang soạn`.
- TASK-014 chỉ tạo template, không điền IP/đầu số thật.
- Commit: `docs(internal): add technical knowledge templates`.

### Phase F — Rebase, verify và report

- `git fetch`, `git rebase origin/main`, dừng nếu TASK-015 gây conflict.
- Tạo `.harness/reports/TASK-014-report.md` và sáu screenshot desktop/mobile cho `/internal`, `/internal/ai-contact-center`, `/internal/ai-contact-center/runbooks` dưới `.harness/reports/assets/TASK-014/`.
- Commit: `docs(internal): record task 014 verification`.

## Ràng buộc nội dung

- Slug tiếng Anh, title và nội dung tiếng Việt; thuật ngữ kỹ thuật giữ nguyên khi phù hợp.
- Mọi MDX có `title` và `description`.
- Mọi trang placeholder/template có `<Callout title="Đang soạn" type="warn">`.
- Không link tới folder thiếu `index.mdx`.
- Trang quy trình link tới `/internal/ai-contact-center/runbooks`; runbook link trực tiếp tới trang KB liên quan.
- Nội dung internal chỉ render qua Server Component; không import vào file `'use client'`.

## Tiêu chí nghiệm thu

- [ ] `npm run verify:task` PASS sau từng phase.
- [ ] `npm run guard`, `npm run check:links`, `npm run check:scope`, `git diff --check` PASS.
- [ ] Mọi route MDX mới trả 200 khi dev access mở; hai URL legacy trả 404.
- [ ] Sidebar có đúng hai root `Bắt đầu` và `Tổng đài`; navigation không link tới folder thiếu index.
- [ ] Bảng runbook có đúng 16 dòng và link hợp lệ.
- [ ] Internal search trả route mới; public search, `llms.txt` và sitemap không chứa `/internal`.
- [ ] Metadata internal giữ `noindex, nofollow`; production không có cờ dev trả 401 cho internal routes/search.
- [ ] Desktop 1440×900 và mobile 390×844 không overflow, không có console error; screenshot được ghi vào report.
- [ ] Dev server port 3000 tiếp tục chạy trong toàn bộ task.

## Điều kiện dừng

Dừng và hỏi Human nếu:

1. Cần sửa auth, `src/proxy.ts`, `src/app/internal/layout.tsx`, source loader, search boundary hoặc TOC.
2. Cần thêm dependency, sửa test hoặc chạm vùng public/shared ngoài phạm vi.
3. Nội dung chứa secret, PII khách hàng, liên hệ cá nhân nhân viên hoặc đặt IP/đầu số ngoài knowledge base.
4. Link checker cần parser/dependency mới để hỗ trợ JSX an toàn.
5. Rebase với TASK-015 gây conflict.
6. `verify:task` tiếp tục FAIL sau ba lần chẩn đoán có bằng chứng.

## Báo cáo và vòng đời

- Sau mỗi phase, ghi lại lệnh và kết quả thật trước khi sang phase tiếp theo.
- Giữ `status: in-progress` đến khi Pull Request CI xanh.
- `status: done`, trường `commit` cuối cùng và merge thuộc Human finalization.
