# Báo cáo nghiệm thu TASK-027

## Trạng thái

- Task: `TASK-027-search-context-relevance`
- Branch: `task/TASK-027-search-context-relevance`
- Trạng thái task: `in-progress` — chỉ chuyển `done` sau khi CI trên Pull Request xanh.

## Thay đổi chính

- Search dialog chọn `/api/search/internal` khi pathname thuộc `/internal/**`.
- Internal UI có scope `Tài liệu nội bộ` mặc định và có thể chuyển sang các scope public.
- Public UI không hiển thị scope internal.
- Hai Search API tiếp tục sử dụng hai loader độc lập.
- Public và internal Search cùng giới hạn tối đa 6 page, 2 snippet/page, 18 items.
- Page có title chứa query được ưu tiên trước page chỉ khớp body.
- Markdown emphasis `**...**` và `__...__` được làm sạch khỏi content trả về.

## Bằng chứng TDD

### RED

`npm run test:search` thất bại với exit code `1` vì production code chưa export
`getSearchClientOptions`. Đây là failure mong đợi trước implementation.

### GREEN cục bộ

- `npm run types:check` — PASS, exit code `0`.
- `$env:ODS_DOCS_SITE_URL='https://ods-docs-ci.invalid'; npm run build` — PASS,
  exit code `0`, build thành công 452 static pages.
- `npm run test:search` — PASS, exit code `0`.

Lần build đầu tiên không đặt `ODS_DOCS_SITE_URL` đã fail-closed đúng thiết kế tại
`src/app/layout.tsx`; đây không phải regression của TASK-027. Build được chạy lại
với cùng origin placeholder của CI.

## Bằng chứng runtime

Dev server được mở tạm với `ODS_INTERNAL_DEV_OPEN=true` trên port `3107`:

| Endpoint | Query | Status | Kết quả | Xác nhận |
| --- | --- | ---: | ---: | --- |
| `/api/search?tag=ai-contact-center` | `giám` | 200 | 16 items / 6 pages | Page đầu là `huong-dan-giam-sat-cuoc-goi`; toàn bộ URL thuộc `/docs/**` |
| `/api/search/internal` | `cuộc gọi` | 200 | 15 items / 5 pages | Toàn bộ URL thuộc `/internal/**` |

Cold compile public Search mất khoảng 29,2 giây; request internal warm sau đó mất
56 ms. Đây là số đo local dev, không phải benchmark production.

## Security boundary

- `src/app/api/search/route.ts` không import `internalSource`.
- `/api/search/internal` vẫn nằm sau Proxy và regression test anonymous vẫn yêu
  cầu HTTP 401.
- Không sửa `src/proxy.ts`, auth, sitemap, `llms.txt`, secret hoặc deploy config.

## Kiểm chứng toàn bộ

`$env:ODS_DOCS_SITE_URL='https://ods-docs-ci.invalid'; npm run verify:task` —
PASS, exit code `0`:

- `types:check` — PASS.
- `check:env` — PASS.
- `check:links` — PASS.
- `guard` — PASS.
- `check:scope` — PASS cho toàn bộ file TASK-027.
- `build` — PASS, 452 static pages.
- `test:routes` — PASS 16/16 cases.
- `test:api-ui` — PASS desktop 1280/1440/1920 và mobile 390/768,
  Light/Dark; Search race, keyboard và overflow đạt.
- `test:search` — PASS.
- `test:internal-content` — PASS 21 flows / 76 step links; internal vẫn 401.
- `test:flowchart` — PASS 12 route/viewport/theme cases và 21 process pages.

UI test ghi nhận favicon local trả 404; đây là resource warning đã được test phân
loại riêng, không phải `pageerror` và không thuộc phạm vi TASK-027.

## Giới hạn còn lại

- URL public dài chưa được migration trong TASK-027. Công việc này cần task riêng,
  redirect map 308 và kiểm tra toàn bộ internal links/canonical/sitemap.
- CI/PR chưa được chạy ở thời điểm lập báo cáo; task tiếp tục giữ `in-progress`.
