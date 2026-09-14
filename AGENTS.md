# AGENTS.md — ODS Documentation Platform

Quy tắc cho coding agent làm việc trong repo này.

Ngắn gọn có chủ đích: mọi thứ kiểm tra được bằng máy đều nằm trong `scripts/guard.mjs`, không nằm ở đây.

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
- Không tự deploy production, không đổi secret / DNS / OAuth.

## Quy tắc nội dung

- Viết tiếng Việt; thuật ngữ kỹ thuật giữ tiếng Anh khi phù hợp.
- Mọi file MDX phải có `title` và `description` trong frontmatter.
- Tài liệu public không được link sang vùng internal.
- Chuyển nội dung internal → public phải được Human duyệt.

## Cách làm việc

Một agent làm, máy kiểm, Human duyệt. Không có phân vai, không có task file.

```bash
npm run guard         # sửa nội dung trong content/
npm run verify:code   # sửa code trong app/, components/, lib/
npm run verify        # chạm proxy.ts, lib/source.ts, next.config, auth, Caddyfile
```

Không báo PASS nếu chưa chạy thật. Chưa chạy được thì ghi rõ lý do.

Khi hoàn thành, liệt kê: file đã sửa, lệnh đã chạy kèm kết quả, giới hạn còn lại nếu có.

## Dừng lại và hỏi Human khi

- Thay đổi chạm auth hoặc ranh giới public/internal.
- Cần thêm database, service, hoặc dependency lớn.
- Yêu cầu mâu thuẫn với mục “Không được phá vỡ”.
