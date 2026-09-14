---
status: in-progress
branch: task/TASK-003-chot-harness
commit: ""
verified-by: npm run verify:task
---

# TASK-003 — Chốt harness: dọn cấu trúc và bịt lỗ hổng kiểm soát

## Bối cảnh

PR #1 (TASK-002) đã merge vào `main` tại commit `f419613`, CI `verify` xanh. Harness hiện đã chạy, nhưng kiểm tra lại trạng thái thật trên `main` phát hiện 6 lỗ hổng và 3 điểm lệch cấu trúc. Đây là trạng thái đã xác minh, **không giả định khác**:

**Lỗ hổng chức năng:**

1. `harness/linters/scope-check.mjs` thoát sớm với `exit 0` khi tên nhánh là `HEAD`. Trên GitHub Actions, `actions/checkout@v4` luôn để repo ở trạng thái detached HEAD, nên `git branch --show-current` trả về rỗng và `git rev-parse --abbrev-ref HEAD` trả về `HEAD`. Kết quả: **`check:scope` chưa bao giờ thực sự chạy trên CI** — step luôn báo xanh mà không kiểm gì.
2. `harness/tests/routes.test.mjs` chạy `next dev`. Production chạy `next start`. Hai chế độ khác nhau về middleware, caching và biên dịch, nên test hiện tại không kiểm đúng thứ sẽ deploy.
3. `harness/tests/routes.test.mjs` có đoạn nới chuẩn: khi nhận 308 với path kết thúc bằng `/` thì tự đi theo redirect rồi mới kiểm status. Hai case `/internal/` và `/api/search/internal/` vì vậy không kiểm đúng yêu cầu gốc là chặn ngay tại request đầu tiên.
4. `scripts/guard.mjs` check `2-frontmatter` chỉ `warn` khi thiếu `description`, trong khi `AGENTS.md` mục "Quy tắc nội dung" ghi `description` là **bắt buộc**. Luật và cơ chế cưỡng chế không khớp.
5. `AGENTS.md` chưa có luật cấm sửa test cho vừa code, và chưa định nghĩa thời điểm hợp lệ để đặt `status: done`.
6. `tasks/TASK-002-dong-vong-harness.md` ghi `commit: 282d448` nhưng commit thật cuối cùng của nhánh là `f419613`. Bằng chứng nghiệm thu đang sai.

**Điểm lệch cấu trúc:**

1. `scripts/guard.mjs` là code kiểm soát nhưng nằm ngoài `harness/`, trong khi ba linter cùng vai trò lại nằm trong `harness/linters/`. Thư mục `scripts/` chỉ chứa đúng file này.
2. Không có tài liệu nào giải thích khác biệt giữa `harness/` và `.harness/`, gây nhầm lẫn khi đọc repo.
3. `README.md` vẫn là bản mẫu sinh tự động của Create Fumadocs, không mô tả dự án ODS, không nhắc tới ranh giới public/internal hay harness.

## Mục tiêu

Đóng lại toàn bộ hạ tầng kiểm soát trước khi chuyển sang giai đoạn viết nội dung site.

Sau task này:

- Mọi check khai báo trong CI đều **thực sự chạy**, không có check nào âm thầm bị bỏ qua.
- Mọi luật viết trong `AGENTS.md` đều có cơ chế cưỡng chế tương ứng bằng máy.
- Cấu trúc thư mục phân tách rõ: code sản phẩm, code kiểm soát, kết quả kiểm soát.
- Người hoặc agent mới mở repo đọc `README.md` và `harness/README.md` là hiểu được kiến trúc.

**Không thêm công cụ mới, không thêm khái niệm mới, không thêm dependency.** Task này chỉ sửa và dọn.

## Phạm vi

### Tạo mới:

- `harness/guard.mjs` — chuyển từ `scripts/guard.mjs`, giữ nguyên logic trừ các sửa đổi nêu bên dưới.
- `harness/README.md` — giải thích vai trò `harness/` và khác biệt với `.harness/`.

### Sửa đổi:

- `harness/linters/scope-check.mjs` — ưu tiên đọc tên nhánh từ biến môi trường trước khi hỏi git.
- `harness/tests/routes.test.mjs` — chuyển sang `next start`, bỏ đoạn follow-redirect.
- `package.json` — đổi đường dẫn script `guard`. Không đổi dependency.
- `.github/workflows/ci.yml` — nếu cần điều chỉnh thứ tự step cho `next start`.
- `AGENTS.md` — thêm 2 luật mới, cập nhật đường dẫn `guard.mjs`.
- `README.md` — viết lại hoàn toàn.
- `tasks/README.md` — cập nhật đường dẫn `scripts/guard.mjs` thành `harness/guard.mjs`.
- `DECISIONS.md` — cập nhật đường dẫn `guard.mjs`; thêm ADR-005 ghi lại quyết định tách cấu trúc.
- `tasks/TASK-002-dong-vong-harness.md` — chỉ sửa trường `commit` trong frontmatter thành `f419613`. Không sửa nội dung khác.
- `.harness/reports/TASK-002-report.md` — chỉ sửa hash commit nếu có ghi sai. Không viết lại báo cáo.
- `tasks/TASK-TEMPLATE.md` — cập nhật đường dẫn guard nếu có.
- `tasks/TASK-001-hai-vung-tai-lieu.md` — cập nhật đường dẫn guard.
- `src/proxy.ts` — tinh chỉnh nếu mục 4b yêu cầu.
- `next.config.mjs` — thêm skipTrailingSlashRedirect: true theo phê duyệt của Human.

### Xóa:

- `scripts/guard.mjs` — sau khi đã chuyển sang `harness/guard.mjs`. Thư mục `scripts/` trở thành rỗng và biến mất khỏi git.

## Ngoài phạm vi

- Không cài dependency mới. Toàn bộ script dùng Node built-in.
- Không đổi version của bất kỳ package nào.
- Không sửa `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `next-env.d.ts`.
- Không sửa bất kỳ file nào trong `src/`, **trừ** `src/proxy.ts` và chỉ khi mục 4b bắt buộc.
- Không tạo `Dockerfile`, `Caddyfile`, không thêm job deploy vào CI.
- Không thêm check mới vào guard ngoài việc siết `2-frontmatter` đã nêu.
- Không sửa nội dung trong `content/**`, trừ việc bổ sung `description` còn thiếu ở mục 5.
- Không tự bật branch protection trên GitHub. Human làm tay.
- Không viết lại `.harness/reports/TASK-001-report.md` hay `TASK-002-report.md`.

## Ràng buộc kiến trúc

1. **Không được làm bất kỳ check nào yếu đi.** Task này chỉ siết chặt. Nếu một thay đổi buộc phải nới một check khác, dừng lại và hỏi.
2. **Không được sửa test, ngưỡng, hay allowlist để làm cho lệnh kiểm tra đi qua.** Sửa nguyên nhân gốc.
3. Giữ nguyên định dạng output `Guard PASS.` / `Guard FAIL:` và `Guard - giai doan: ...` để CI và `harness/hooks/check-commit.mjs` không vỡ.
4. Giữ nguyên hành vi của 13 check hiện có trong guard, trừ mục 5 đã nêu rõ.
5. Fail-closed: mọi cơ chế bảo vệ khi gặp trạng thái không xác định phải chặn, không mở.
6. Ba lớp bảo vệ public/internal trong ADR-001 phải giữ nguyên nguyên tắc.

## Tiêu chí nghiệm thu

Chạy trên **cây build sạch**. Trước khi nghiệm thu, bắt buộc:

```bash
rm -rf .next node_modules
npm ci
```

Sau đó:

1. `npm run verify:task` trả exit code 0.
2. `npm run guard` in `Guard PASS.` và **không còn dòng cảnh báo nào** về `description`.
3. `npm run test:routes` pass đủ 7/7 case, trong đó `/internal/` và `/api/search/internal/` trả **401 trực tiếp**, không qua 308.
4. `npm run test:routes` tự tắt server; sau khi lệnh kết thúc, `ps aux | grep next` không còn tiến trình treo.
5. `ls scripts` báo không tồn tại. `ls harness/guard.mjs` tồn tại.
6. `grep -rn "scripts/guard" . --exclude-dir=node_modules --exclude-dir=.git` không còn kết quả.
7. `harness/README.md` và `README.md` tồn tại, nội dung đúng yêu cầu mục 2 và 7.
8. `grep -n "commit:" tasks/TASK-002-dong-vong-harness.md` hiển thị `f419613`.
9. `DECISIONS.md` có mục ADR-005.

**Bốn thử nghiệm negative bắt buộc** — chạy thật, ghi output vào report, hoàn nguyên sau khi thử:

| # | Thao tác | Kỳ vọng |
| --- | --- | --- |
| N1 | Tạo tạm `content/docs/thu.mdx` có `title` nhưng thiếu `description`, chạy `npm run guard` | FAIL với mã `2-frontmatter` |
| N2 | Trên nhánh task, tạo tạm file `src/app/thu.tsx` ngoài allowlist, chạy `GITHUB_HEAD_REF=task/TASK-003-chot-harness npm run check:scope` | FAIL với mã `scope-check FAIL`, liệt kê đúng file vi phạm |
| N3 | Chạy `npm run check:scope` với `GITHUB_HEAD_REF` không đặt và đang ở detached HEAD (`git checkout $(git rev-parse HEAD)`) | Bỏ qua với thông báo rõ ràng — xác nhận không còn im lặng bỏ qua khi có biến môi trường |
| N4 | Tạo tạm `.env` có nội dung, chạy `npm run check:env` | FAIL |

## Điều kiện dừng

Dừng lại, báo Human, **không tự quyết** nếu:

1. Phải cài thêm package bất kỳ.
2. Sau 3 lần thử, `/internal/` vẫn không trả 401 trực tiếp khi đã bỏ follow-redirect.
3. Chuyển sang `next start` làm vỡ test hoặc treo CI sau 3 lần thử.
4. Phải sửa file ngoài danh sách Phạm vi.
5. Phải nới bất kỳ check nào đang có để hoàn thành mục khác.
6. Việc sửa `src/proxy.ts` làm vỡ logic rewrite Markdown negotiation.
7. Phát hiện `AGENTS.md` hoặc `DECISIONS.md` mâu thuẫn với yêu cầu trong task này.

Khi dừng, ghi rõ: đã thử gì, output thật của lệnh, và giả thuyết về nguyên nhân.

## Quy trình thực hiện

1. `git checkout main && git pull`
2. `git checkout -b task/TASK-003-chot-harness`
3. Tạo `tasks/TASK-003-chot-harness.md` từ `tasks/TASK-TEMPLATE.md` với nội dung task này, đặt `status: in-progress`.
4. Thực hiện 9 mục theo thứ tự.
5. Xoá sạch `.next` và `node_modules`, chạy `npm ci`, rồi chạy nghiệm thu.
6. Chạy 4 thử nghiệm negative, hoàn nguyên.
7. Viết `.harness/reports/TASK-003-report.md`.
8. Commit, push, mở Pull Request vào `main`.
9. **Chờ CI xanh.** Chỉ sau khi CI xanh mới đổi `status: done` và điền `commit` bằng `git rev-parse --short HEAD`, rồi commit thêm lần nữa.

## Báo cáo khi hoàn thành

Ghi vào `.harness/reports/TASK-003-report.md`, bắt buộc gồm:

1. Danh sách file đã tạo / sửa / xoá, đối chiếu từng dòng với mục Phạm vi. Nêu rõ mọi sai lệch kèm lý do.
2. Output **thật** của từng lệnh nghiệm thu, kèm exit code. Không viết mô tả thay cho output.
3. Output thật của 4 thử nghiệm negative, kèm mã check đã FAIL.
4. Danh sách file MDX đã bổ sung `description` (nếu có).
5. Số lần thử lại cho mỗi bước gặp lỗi, kèm nguyên nhân và cách khắc phục.
6. **Mục riêng: "Những chỗ đã cân nhắc nới chuẩn nhưng không nới"** — nếu trong quá trình làm có lúc nào bạn định sửa test/ngưỡng/allowlist để vượt qua, ghi lại rõ tình huống đó và cách đã xử lý thay thế. Nếu không có, ghi "không có".
7. Hash commit thật cuối cùng, lấy bằng `git rev-parse --short HEAD`.
8. Giới hạn còn lại và việc Human phải làm tay.
