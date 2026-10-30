# Báo cáo nghiệm thu TASK-032: Audit và tối ưu Search public/internal

## Trạng thái

- Branch: `task/TASK-032-search-performance-isolation`
- Task: `in-progress` — mở lại theo phản hồi Human về service scope trong `/internal`.
- Môi trường đo: Windows 10.0.19045, Node.js 22.23.4, Next.js 16.4.3,
  125 public MDX và 80 internal MDX.

## Kết luận và root cause

Hiện tượng chậm trên localhost chủ yếu đến từ cold compile/index của `next dev`,
không phải Search API warm hay production runtime:

- Request public đầu tiên sau dev startup mất **88,50 giây**; log Next tách khoảng
  85 giây cho compile và khoảng 3 giây cho application/index.
- Internal index cold sau khi public đã compile mất **3,57 giây**.
- Khi warm, API dev nằm trong khoảng 39–57 ms median ở lần đo baseline đầu tiên.
- Standalone baseline public nằm trong khoảng 6–13 ms median tùy scope; internal
  production tiếp tục 401 fail-closed.

Ba vấn đề độc lập đã được sửa:

1. `fumadocs-core/useDocsSearch` chỉ đánh dấu task cũ là interrupted; `fetchClient`
   vẫn để request cũ chạy đến hết. `src/lib/search-client.ts` bổ sung
   `AbortController` dùng chung giữa query/scope, cache theo URL và cleanup khi đóng,
   unmount hoặc đổi route.
2. Response 200 của `/api/search/internal` trước đây không có `Cache-Control`.
   Route nay trả `private, no-store, must-revalidate` cho cả empty và result response.
3. `internalScopeOptions` đã nối trực tiếp `publicScopeOptions`, còn
   `getSearchClientOptions()` chỉ chọn endpoint theo tên scope. Vì vậy chọn một dịch vụ tại
   `/internal` đã gọi `/api/search` và trả kết quả `/docs`. Scope internal nay được tạo từ các
   service thực có trong `content/internal`; pathname chọn service mặc định và mọi lựa chọn đều
   gọi `/api/search/internal` với tag internal tương ứng.

Không thay index, debounce 100 ms, giới hạn page/snippet hoặc phạm vi dữ liệu vì
benchmark không chứng minh các phần đó là bottleneck production.

## Luồng thực tế

```text
Search dialog
  → pathname quyết định scope mặc định
  → scope quyết định endpoint/tag
  → Abortable Search client + URL cache
  → /api/search hoặc /api/search/internal
  → source hoặc internalSource + module-scoped search index
  → prepareSearchResults
  → loading / results / empty / error render
```

| Thành phần | File / function | Kết quả audit |
| --- | --- | --- |
| UI/scope | `src/components/search-dialog.tsx` / `OdsSearchDialog` | Scope theo route, query reset khi đổi route, request được abort |
| Client | `src/lib/search-client.ts` / `createAbortableSearchClient` | Cache URL, abort request cũ, không fetch query rỗng |
| Public API | `src/app/api/search/route.ts` | Chỉ import `source`, tag public được allowlist |
| Internal API | `src/app/api/search/internal/route.ts` | Chỉ import `internalSource`, filter service tag, private/no-store response |
| Index | Fumadocs `createFromSource` | WeakMap cache theo loader; không rebuild mỗi warm request |
| Gate | `src/proxy.ts` | `/internal/**` và `/api/search/internal/**` vẫn fail-closed production |

## Expected / actual

| Context / thao tác | Expected | Actual |
| --- | --- | --- |
| `/docs` / Tất cả sản phẩm | `/api/search`, public source | PASS |
| `/docs` / AI Contact Center | `/api/search?tag=ai-contact-center` | PASS |
| `/docs` / CloudFile | `/api/search?tag=cloudfile` | PASS |
| `/docs` UI | Không có scope internal | PASS |
| `/internal` / Tất cả tài liệu nội bộ | `/api/search/internal`, toàn internal source | PASS trong dev authorized |
| `/internal/ai-contact-center/**` | `/api/search/internal?tag=ai-contact-center` | PASS — 14 items, 0 URL ngoài scope |
| `/internal/data-center/**` | `/api/search/internal?tag=data-center` | PASS — 15 items, 0 URL ngoài scope |
| `/internal/network/**` | `/api/search/internal?tag=network` | PASS — 15 items, 0 URL ngoài scope |
| `/internal/software-license/**` | `/api/search/internal?tag=software-license` | PASS — 9 items, 0 URL ngoài scope |
| Public query `sngrep` | Không trả dữ liệu internal | PASS, 0 result |
| Public `tag=internal` | Không bypass source | PASS, 0 internal result |
| Direct internal production | 401 với mọi query/tag/scope | PASS |
| Internal response được phép | `private, no-store, must-revalidate` | PASS |
| Rapid query/scope change | Request cũ bị abort, không ghi đè | PASS qua CDP regression |
| Empty / no-result / API error | Ba state riêng | PASS |

## Benchmark trước–sau

Cold được ghi riêng, không trộn vào percentile warm. Mỗi scope API có 30 mẫu warm.
UI dùng 30 lần mở modal và 30 query/context; 10 query đầu đi network, 20 mẫu sau
đo cache client.

### `next dev`

| Giai đoạn | Scope | Cold/first | Median warm | p95 warm | Payload median | Error |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Trước | public all | 88,50 giây | 39,4 ms | 90,8 ms | 4.035 B | 0% |
| Trước | internal | 3,57 giây | 57,2 ms | 105,8 ms | 4.174 B | 0% |
| Sau | public all | 4,68 giây observed warm server | 71,7 ms | 216,3 ms | 4.035 B | 0% |
| Sau | internal | 142,3 ms observed warm server | 40,0 ms | 133,2 ms | 4.174 B | 0% |

| UI dev | Trước median / p95 | Sau median / p95 |
| --- | ---: | ---: |
| Mở modal `/docs` | 42,5 / 104,4 ms | 112,6 / 367,5 ms |
| Query `/docs` | 119,4 / 438,0 ms | 128,1 / 586,8 ms |
| Mở modal `/internal` | 48,8 / 131,5 ms | 37,8 / 227,2 ms |
| Query `/internal` | 132,0 / 343,4 ms | 159,8 / 284,7 ms |

Dev percentile dao động theo Turbopack, filesystem settle và tải máy; không có bằng
chứng để tuyên bố latency warm cải thiện. Giá trị của bản sửa là loại bỏ công việc
request cũ bằng cancellation và giữ state đúng, được xác nhận bằng regression có
request trì hoãn chủ động.

### Production standalone

| Giai đoạn | Scope | First | Median warm | p95 warm | Error |
| --- | --- | ---: | ---: | ---: | ---: |
| Trước | public all | 2,40 giây | 12,2 ms | 33,8 ms | 0% |
| Sau | public all | 2,61 giây | 18,5 ms | 300,3 ms | 0% |
| Trước | AI Contact Center | 17,6 ms | 12,8 ms | 18,4 ms | 0% |
| Sau | AI Contact Center | 22,5 ms | 15,6 ms | 21,1 ms | 0% |
| Trước | CloudFile | 9,6 ms | 6,3 ms | 9,3 ms | 0% |
| Sau | CloudFile | 10,9 ms | 12,0 ms | 18,8 ms | 0% |
| Trước/sau | internal | 401 | n/a | n/a | 100% expected |

| UI standalone `/docs` | Trước median / p95 | Sau median / p95 |
| --- | ---: | ---: |
| Mở modal | 15,6 / 171,7 ms | 48,1 / 182,2 ms |
| Query | 140,7 / 233,9 ms | 135,4 / 401,4 ms |

Production warm vẫn nhanh; p95 outlier sau sửa xuất hiện dưới tải local và không
được dùng làm performance gate. Không có timing assertion trong CI.

## Kiểm chứng đã chạy

| Lệnh | Kết quả |
| --- | --- |
| `npm ci` | PASS — 260 packages, 0 vulnerability |
| `npm run types:check` | PASS |
| `npm run build` | PASS — 462/462 static pages, standalone |
| `npm run test:search` | PASS — source/tag/boundary/cache contract |
| `npm run test:api-ui` | PASS — cancellation, error/empty, keyboard, responsive |
| `npm run test:routes` | PASS — 21/21, internal production 401 |
| `npm run test:internal-content` | PASS — 21 flows, 76 links, internal 401 |
| `npm run test:home-ui` | PASS — 8 viewport/theme combinations, no overflow |
| `npm run test:flowchart` | PASS — 12 route/viewport/theme cases và 21 process pages |
| `npm run check:scope` | PASS |
| `npm run check:env` | PASS |
| `npm run check:links` | PASS |
| `npm run guard` | PASS |
| `ODS_DOCS_SITE_URL=https://docs.ods.vn; npm run verify:task` | PASS — build 462/462 và toàn bộ test suite |
| Impeccable detector trên `src/components/search-dialog.tsx` | PASS — không có finding từ source scan |
| `git diff --check` | PASS |
| Local dev service-scope API | PASS — 4 service tags, 0 URL ngoài scope; public internal canary = 0 |
| PR #34 CI `verify` trước phản hồi | PASS — run `41022239139`; chờ CI mới sau push |

Hai lần chạy `verify:task` đầu dừng ở production metadata validation vì thiếu
`ODS_DOCS_SITE_URL`, sau đó vì dùng loopback origin. Lần chạy cuối dùng origin HTTPS chỉ
trong process local và PASS; không có `.env` hoặc cấu hình deploy nào được thay đổi.

## Cách Human chạy lại

Dev authorized:

```powershell
$env:ODS_INTERNAL_DEV_OPEN='true'
npm run dev -- --hostname 127.0.0.1 --port 3132
npm run benchmark:search -- --mode dev --base-url http://127.0.0.1:3132 --samples 30 --output .next/search-dev.json
```

Production public/fail-closed:

```powershell
$env:ODS_DOCS_SITE_URL='https://ods-docs-ci.invalid'
npm run build
# Khởi động .next/standalone/server.js theo helper của harness, không bật ODS_INTERNAL_DEV_OPEN.
npm run benchmark:search -- --mode standalone --base-url http://127.0.0.1:3232 --samples 30 --output .next/search-standalone.json
```

## Giới hạn

- Production chưa có network gate/trusted gateway assertion, nên không thể đo internal
  authorized end-to-end trong production mà không vi phạm fail-closed.
- Số đo là Chrome headless và loopback trên một máy Windows; chưa phải RUM hoặc thiết
  bị người dùng thật.
- Không tái hiện latency warm kéo dài trên production. Cold `next dev` không đại diện
  tốc độ deploy production.
