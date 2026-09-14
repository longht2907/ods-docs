---
status: done
branch: main
commit: 8f3f891
verified-by: npm run verify
---

# TASK-001 — Tách hai vùng tài liệu: công khai và nội bộ

## Bối cảnh

Repo `ods-docs` là documentation platform của công ty ODS, vừa scaffold bằng
`npm create fumadocs-app`. Hiện chỉ có một vùng tài liệu công khai tại `/docs`.

Trạng thái thật của repo (đã kiểm tra, đừng giả định khác):

- Code nằm trong `src/`, không phải ở gốc.
- `fumadocs-ui` là alias của `npm:@fumadocs/base-ui@16.15.10`.
- `fumadocs-core` 16.15.10, `fumadocs-mdx` 15.4.0, `next` 16.3.4, React 19.
- `src/lib/source.ts` dùng `defineDocs` từ `fumadocs-mdx/macro`, `pageSchema` và
  `metaSchema` từ `fumadocs-core/source/schema`.
- `proxy.ts` ở thư mục gốc, hiện làm nhiệm vụ rewrite Markdown negotiation.
- Đã có `scripts/guard.mjs`, `AGENTS.md`, `.github/workflows/ci.yml`.
- `content/docs/` có `index.mdx` và `test.mdx` (trang mẫu của scaffold).

## Mục tiêu

Dựng vùng tài liệu nội bộ `/internal` tách biệt hoàn toàn với `/docs`.

| Thư mục | Đường dẫn | Ai đọc |
| --- | --- | --- |
| `content/docs/` | `/docs` | Khách hàng + nhân viên |
| `content/internal/` | `/internal` | Chỉ nhân viên |

Tách từ tầng dữ liệu, không phải ẩn trên giao diện.

## Phạm vi

Tạo mới:

- `src/app/internal/layout.tsx`
- `src/app/internal/[[...slug]]/page.tsx`
- `src/app/api/search/internal/route.ts`
- `content/internal/index.mdx`
- `content/internal/meta.json`
- `content/internal/onboarding/index.mdx`
- `content/internal/runbook/index.mdx`
- `content/internal/quy-trinh/index.mdx`
- `content/docs/meta.json`

Sửa:

- `src/lib/shared.ts` — `appName` thành `'ODS Docs'`; `gitConfig` thành
  `{ user: 'longht2907', repo: 'ods-docs', branch: 'main' }`; thêm export
  `internalRoute = '/internal'`. Giữ nguyên mọi export sẵn có.
- `src/lib/source.ts` — thêm `internalSource`, giữ nguyên `source` và `docsLlms`.
- `proxy.ts` — thêm cổng chặn, giữ nguyên toàn bộ logic rewrite hiện có.

Xoá:

- `content/docs/test.mdx`

## Ngoài phạm vi

- Không cài next-auth. Lần này chưa làm đăng nhập thật.
- Không viết nội dung tài liệu sản phẩm. Chỉ dựng khung.
- Không động vào `next.config.mjs`, `tsconfig.json`, `package.json`.
- Không nâng hay hạ phiên bản package nào.
- Không tạo `Dockerfile`, `Caddyfile`.

## Ràng buộc kiến trúc

Ba lớp bảo vệ, độc lập nhau:

1. **Tách nguồn.** `internalSource` là một `loader` riêng đọc `content/internal`.
   Chỉ được import từ đúng ba nơi: `src/lib/source.ts`, `src/app/internal/**`,
   `src/app/api/search/internal/**`.
2. **Chặn request.** `proxy.ts` trả 401 cho `/internal`, `/internal/*` và
   `/api/search/internal`. Chưa có đăng nhập nên chặn mặc định; mở cửa hậu cho
   dev bằng biến môi trường `ODS_INTERNAL_DEV_OPEN === 'true'`. Tách phần kiểm tra
   quyền thành một hàm riêng `hasInternalAccess()` để chặng sau thay bằng next-auth
   mà không đổi phần còn lại.
3. **Không cache, không index.** Response chặn phải có
   `Cache-Control: private, no-store, must-revalidate` và `X-Robots-Tag: noindex, nofollow`.
   Trang nội bộ phải có `robots: { index: false, follow: false }` trong metadata.

Thêm hai điều:

- `/api/search` (công khai) tuyệt đối không được chạm tới `internalSource`.
- `content/docs/**` không được dẫn link sang `/internal`.

## Tiêu chí nghiệm thu

1. `npm run typecheck` không lỗi.
2. `npm run guard` in `Guard PASS.`
3. `npm run build` thành công.
4. `npm run dev` rồi:
   - `GET /docs` → 200, hiển thị bình thường.
   - `GET /internal` → 401.
   - `GET /api/search/internal` → 401.
   - Đặt `ODS_INTERNAL_DEV_OPEN=true` trong `.env.local`, khởi động lại →
     `GET /internal` trả 200 và hiện sidebar có Onboarding, Runbook, Quy trình.
5. `grep -rn "internalSource" src/` chỉ trả về kết quả trong ba nơi cho phép.
6. Mọi file `.mdx` mới đều có `title` và `description` trong frontmatter.

## Cách kiểm chứng

Chạy tuần tự, dừng ngay khi có lỗi:

```bash
npm run typecheck
npm run guard
npm run build
```

Sau đó chạy `npm run dev` và kiểm tra bốn đường dẫn ở mục 4.

## Điều kiện dừng

Dừng lại và báo cho người dùng, đừng tự quyết, nếu:

- Sửa ba lượt mà `npm run build` vẫn hỏng.
- Phải cài thêm package mới.
- Phải sửa file ngoài danh sách ở mục Phạm vi.
- API của Fumadocs khác với mô tả trong task này.

## Báo cáo khi xong

Liệt kê:

- Danh sách file đã tạo / sửa / xoá.
- Kết quả của ba lệnh kiểm chứng.
- Kết quả bốn đường dẫn ở mục 4.
- Bất kỳ chỗ nào bạn phải làm khác với task, kèm lý do.
