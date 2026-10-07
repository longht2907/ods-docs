---
status: in-progress
branch: task/TASK-018-internal-outline
commit: ""
verified-by: npm run verify:task
---

# TASK-018 — Dàn ý nội dung Support Wiki `/internal`

## Bối cảnh

TASK-014 đã dựng bộ khung Support Wiki tại `/internal`, nhưng các trang nghiệp vụ vẫn là template và chưa có nội dung vận hành ODS được Human xác nhận. TASK-018 bổ sung dàn ý cộng tác để Human trả lời từng câu hỏi ngắn, sau đó agent điền đúng câu trả lời vào trang tương ứng mà không suy diễn.

## Mục tiêu

- Chuyển template rỗng thành dàn ý dễ đọc cho Support L1/L2.
- Phân biệt rõ nội dung kiến thức chung được gắn `*(đề xuất)*` với dữ liệu riêng của ODS được gắn `**Cần bổ sung:**`.
- Tập trung câu hỏi tại `.harness/reports/TASK-018-questions.md`, mỗi câu trả lời được trong 1–2 dòng.
- Giữ nguyên title, slug, thứ tự `meta.json` và các heading H2 hiện có.
- Triển khai theo từng lô nhỏ; mỗi lô có commit, verification và điểm dừng để Human duyệt.

## Phạm vi

- `content/internal/**`
- `tasks/TASK-018-internal-outline.md`
- `tasks/TASK-014-internal-ia.md`
- `.harness/reports/**`

## Ngoài phạm vi

- Không sửa `src/**`, `harness/**`, `AGENTS.md`, `DECISIONS.md`, `content/docs/**`, `public/**`, `package.json`, lockfile, tests, `.harness/phase.json` hoặc `tasks/README.md`.
- Không đổi slug, title, heading H2 hiện có hoặc thứ tự `meta.json`.
- Không tạo thông báo mới và không khôi phục trang `contributing` trong task này.
- Không điền secret, credential, dữ liệu cá nhân khách hàng, số điện thoại hoặc email cá nhân nhân viên.
- Không thao tác worktree `E:\Project\ods-docs-content` hoặc branch `task/TASK-015-docs-content`.
- Không push hoặc mở Pull Request cho đến khi Human yêu cầu.

## Ràng buộc nội dung

- Tuân thủ ADR-001 và ADR-006; repository public nên auth runtime không thay thế content review.
- Mọi đề xuất từ kiến thức chung phải kết thúc bằng `*(đề xuất)*`.
- Dữ liệu riêng của ODS dùng `**Cần bổ sung:**`; câu hỏi cuối section dùng mã `Q` có thể đối chiếu với file câu hỏi.
- Câu trả lời của Human được đưa vào đúng trang, không suy diễn ngoài nội dung đã trả lời.
- Link nội bộ dùng Markdown và phải trỏ tới route tồn tại.

## Kế hoạch theo lô

1. Lô 0: tạo task, đóng TASK-014 và tạo câu hỏi chung.
2. Lô 1: dàn ý bốn runbook `calls/*`, sau đó dừng để Human duyệt format.
3. Lô 2: dàn ý 12 runbook còn lại và `runbooks/index`.
4. Lô 3: dàn ý `processes/**`.
5. Lô 4: dàn ý `knowledge-base/**`.
6. Lô 5: dàn ý `(home)/**` trừ announcements và landing Tổng đài.
7. Lô 6+: điền câu trả lời Human theo từng nhóm.

## Tiêu chí nghiệm thu

- [ ] Callout, ba loại nội dung và mã câu hỏi tuân thủ format TASK-018.
- [ ] Không thay đổi title, slug, heading H2 hoặc thứ tự `meta.json`.
- [ ] Không có dữ liệu ODS chưa được Human xác nhận.
- [ ] `npm run verify:task` PASS sau mỗi lô.
- [ ] `npm run check:links`, `npm run check:scope` và `git diff --check` PASS sau mỗi lô.
- [ ] Trang mẫu của mỗi lô trả HTTP 200 và có screenshot trong `.harness/reports/TASK-018-report.md`.
- [ ] Dev server port 3000 tiếp tục chạy với `ODS_INTERNAL_DEV_OPEN=true`.

## Điều kiện dừng

Dừng và hỏi Human nếu:

1. Cần sửa file ngoài `## Phạm vi`.
2. Cần đổi cấu trúc thư mục, title, slug, thứ tự `meta.json` hoặc template heading.
3. Phát hiện nội dung hiện có chứa secret, dữ liệu cá nhân khách hàng hoặc liên hệ cá nhân nhân viên.
4. `guard` hoặc `check:links` tiếp tục FAIL sau ba lần chẩn đoán có bằng chứng.

## Báo cáo và vòng đời

- Mỗi lô một commit và dừng để báo Human.
- Task giữ `in-progress` đến khi Pull Request CI xanh và Human finalization.
- Không push hoặc mở Pull Request khi chưa có yêu cầu của Human.
