# Báo cáo nghiệm thu TASK-028

## Trạng thái

- Task: `TASK-028-public-url-migration`
- Branch: `task/TASK-028-public-url-migration`
- Trạng thái task: `in-progress` — chỉ chuyển `done` sau khi CI trên Pull Request xanh.

## Kết quả migration

- Di chuyển 75 file Portal từ `content/docs/ai-contact-center/user-guider-portal`
  sang `content/docs/ai-contact-center/portal` bằng Git rename.
- Bỏ prefix số khỏi 10 section; ordering tiếp tục do `meta.json` quản lý.
- Canonical trang Human phản ánh:
  `/docs/ai-contact-center/portal/cuoc-goi/giam-sat`.
- Cập nhật toàn bộ internal link đang hoạt động, home cards, product registry,
  sidebar mapping, Search suggestions và guard required node.
- Giữ nguyên 136 references đến media path
  `/media/ai-contact-center/user-guider-portal/**`; không di chuyển asset.

## Redirect contract

`next.config.mjs` dùng `permanent: true`, tương ứng HTTP 308:

- Redirect riêng bài giám sát đứng trước wildcard section.
- 10 wildcard section chuyển trực tiếp từ numbered slug sang semantic slug.
- Root và wildcard fallback chuyển namespace `user-guider-portal` sang `portal`.
- Các legacy entry `autocall`, `xu-ly-su-co`, `huong-dan` và
  `user-guide-portal` được trỏ trực tiếp đến canonical Portal root.

## Bằng chứng TDD

### RED

Sau khi thêm route assertions nhưng trước implementation, `npm run test:routes`
thất bại exit code `1`:

- Hai canonical route mới trả 404.
- Ba URL legacy đại diện trả 200 và không có `Location` thay vì 308.

### GREEN cục bộ

- `npm run check:links` — PASS.
- `npm run guard` — PASS.
- `npm run check:scope` — PASS.
- `$env:ODS_DOCS_SITE_URL='https://ods-docs-ci.invalid'; npm run build` — PASS,
  452 static pages.
- `$env:ODS_DOCS_SITE_URL='https://ods-docs-ci.invalid'; npm run test:routes`
  — PASS 20/20 cases.
- `npm run test:search` — PASS; Search trả canonical Portal URL và không trả
  `user-guider-portal`.

## Runtime redirect evidence

| Request cũ | Status | Location |
| --- | ---: | --- |
| `/docs/ai-contact-center/user-guider-portal` | 308 | `/docs/ai-contact-center/portal` |
| `/docs/ai-contact-center/user-guider-portal/06-quan-ly-cuoc-goi/huong-dan-giam-sat-cuoc-goi` | 308 | `/docs/ai-contact-center/portal/cuoc-goi/giam-sat` |
| `/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/tao-cau-hinh-may-nhanh` | 308 | `/docs/ai-contact-center/portal/tong-dai/cai-dat/tao-cau-hinh-may-nhanh` |

Hai canonical route `/portal` và `/portal/cuoc-goi/giam-sat` đều trả 200.

## Security boundary

- Không sửa `src/proxy.ts`, auth, Search API, `source` hoặc `internalSource`.
- Public content vẫn không link sang `/internal/**`.
- Internal route và internal Search tiếp tục trả 401 trong route regression.

## Kiểm chứng toàn bộ

`$env:ODS_DOCS_SITE_URL='https://ods-docs-ci.invalid'; npm run verify:task` —
PASS, exit code `0`:

- `types:check`, `check:env`, `check:links`, `guard`, `check:scope` — PASS.
- `build` — PASS, 452 static pages.
- `test:routes` — PASS 20/20.
- `test:api-ui` — PASS desktop 1280/1440/1920, mobile 390/768,
  Light/Dark; Search race/keyboard/overflow đạt.
- `test:search` — PASS.
- `test:internal-content` — PASS 21 flows / 76 step links; internal vẫn 401.
- `test:flowchart` — PASS 12 route/viewport/theme cases và 21 process pages.

Lần chạy `verify:task` trước đó dừng ở UI assertion `Tab Python` và lần retry
đầu dừng ở assertion Search scope khác. Không có cùng một failure tái lập; lần
retry thứ hai của `test:api-ui` và lần chạy lại toàn bộ `verify:task` đều PASS.
Không sửa hoặc nới UI test. Favicon local 404 tiếp tục được suite phân loại là
resource warning, không phải `pageerror`.

## Giới hạn còn lại

- Redirect compatibility được giữ trong `next.config.mjs`; không được xóa nếu chưa
  có dữ liệu chứng minh không còn traffic/bookmark cũ.
- CI/PR chưa chạy; task giữ `in-progress`.
