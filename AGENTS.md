# AGENTS.md — ODS Documentation Platform

Quy tắc cho coding agent làm việc trong repo này.

Ngắn gọn có chủ đích: mọi thứ kiểm tra được bằng máy đều nằm trong `harness/guard.mjs`, không nằm ở đây.

## Mục tiêu

Documentation Platform cho ODS trên Next.js + Fumadocs + MDX.

- `/docs/**` — công khai, khách hàng và nhân viên đọc được.
- `/internal/**` — nội bộ, bắt buộc đăng nhập.
- Deploy: Next.js `standalone` trong Docker, Caddy làm reverse proxy.

## Không được phá vỡ

1. `content/docs/**` và `content/internal/**` là hai vùng tin cậy khác nhau.
2. `internalSource` chỉ được import trong `lib/source.ts`, `app/internal/**`, `app/api/search/internal/**`.
3. Search công khai chỉ index nguồn public.
4. `/internal/**` và `/api/search/internal/**` phải được `proxy.ts` bảo vệ.
5. Không đưa `/internal/**` vào sitemap, `llms.txt` hay search công khai.
6. Không đổi `output: 'standalone'` thành `output: 'export'`. Auth cần server.
7. `Caddyfile` phải giữ `Cache-Control: private, no-store` cho `/internal`.
8. Không commit `.env`, credential, API key hay dữ liệu khách hàng.

Muốn thay đổi bất kỳ mục nào ở trên: dừng lại, hỏi Human.

## Quy tắc code

- Thay đổi nhỏ, đúng phạm vi được giao. Không refactor lan rộng.
- Trước khi thêm dependency: kiểm tra dependency hiện có, giải thích lý do.
- Với API Next.js / Fumadocs / Auth.js: đọc version trong `package.json` và types thật trong `node_modules`. **Không đoán từ trí nhớ** — các thư viện này đổi API thường xuyên.
- Luôn đọc `DECISIONS.md` trước khi đề xuất hoặc thực hiện thay đổi kiến trúc.
- Không tự deploy production, không đổi secret / DNS / OAuth.

## Quy tắc nội dung

- Viết tiếng Việt; thuật ngữ kỹ thuật giữ tiếng Anh khi phù hợp.
- Mọi file MDX phải có `title` và `description` trong frontmatter.
- Tài liệu public không được link sang vùng internal.
- Chuyển nội dung internal → public phải được Human duyệt.

## Cách làm việc

Mọi thay đổi phải đi qua quy trình task file và branch/PR:
- Bắt đầu bằng task spec tại `tasks/TASK-XXX-*.md` (theo chuẩn `tasks/TASK-TEMPLATE.md`).
- Tạo branch riêng `task/TASK-XXX-*` và mở Pull Request vào `main` khi hoàn thành.
- Mọi tuyên bố "đã xong" phải kèm báo cáo nghiệm thu `.harness/reports/TASK-XXX-report.md`.
- Khi test FAIL: sửa code cho đúng test. **Cấm sửa test, nới ngưỡng, hoặc thêm
  ngoại lệ để test đi qua.** Nếu tin rằng test sai, dừng lại và hỏi Human kèm
  output thật của lệnh.
- `status: done` trong task file chỉ được đặt **sau khi CI trên Pull Request
  đã xanh**. Trong suốt quá trình làm việc, giữ `status: in-progress`.
- Trường `commit` trong frontmatter phải là hash commit thật cuối cùng trên
  nhánh, lấy bằng `git rev-parse --short HEAD`. Không ghi từ trí nhớ.

```bash
npm run check:env     # kiểm tra an toàn biến môi trường .env
npm run check:links   # kiểm tra liên kết nội bộ MDX không bị gãy
npm run check:scope   # kiểm tra file thay đổi không vượt ngoài phạm vi task
npm run guard         # kiểm tra ranh giới bảo mật, secret, frontmatter
npm run verify:code   # kiểm tra code (typecheck + check:env + check:links + guard)
npm run verify        # kiểm tra code và build production
npm run verify:task   # chạy toàn bộ chuỗi kiểm chứng trước khi nộp task
```

Không báo PASS nếu chưa chạy thật. Chưa chạy được thì ghi rõ lý do.

Khi hoàn thành, liệt kê: file đã sửa, lệnh đã chạy kèm kết quả, giới hạn còn lại nếu có.

## Dừng lại và hỏi Human khi

- Thay đổi chạm auth hoặc ranh giới public/internal.
- Cần thêm database, service, hoặc dependency lớn.
- Yêu cầu mâu thuẫn với mục “Không được phá vỡ”.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
