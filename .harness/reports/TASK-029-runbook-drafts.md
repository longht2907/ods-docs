# TASK-029 — Bộ nháp 12 runbook AI Contact Center cho Support L1

## Mục tiêu

Thay 12 khung `Đang soạn` bằng bản nháp thực chiến để Human hiệu chỉnh. Nội dung
không được xem là quy trình ODS đã phê duyệt cho đến khi người phụ trách nghiệp vụ
xác nhận quyền thao tác, hệ thống tra cứu, SLA và điều kiện chuyển cấp.

## Danh sách runbook

| Nhóm | Runbook |
| --- | --- |
| Máy nhánh | Máy nhánh không đăng ký được; Softphone / IP phone lỗi |
| Đầu số / nhà mạng | Trunk SIP lỗi; Đầu số bị chặn / báo spam |
| Portal | Không đăng nhập được; Báo cáo sai số liệu |
| Ghi âm | Mất ghi âm; Không nghe / tải được ghi âm |
| Auto Call | Chiến dịch không chạy; Tỉ lệ kết nối thấp |
| Tích hợp | API trả lỗi; Webhook không nhận được |

Mỗi bài có 9 phần: phạm vi L1, triệu chứng, câu hỏi khách hàng, kiểm tra L1, xử lý
trong quyền L1, điểm dừng/chuyển cấp, dữ liệu chuyển cấp, trả lời mẫu và nguyên
nhân/tra cứu.

Sau vòng hoàn thiện nội dung ngày 2026-10-29, cả 12 bài có thêm bảng **Phân nhánh
nhanh** ngay dưới phần triệu chứng. Bảng ánh xạ dấu hiệu thực tế sang nhận định ban
đầu và hành động tiếp theo, nhưng không thay thế kết luận của L2 hoặc quy trình đã
được ODS phê duyệt.

## Guardrail nội dung

- Không yêu cầu khách hàng gửi password, SIP credential, OTP, token hoặc signing secret.
- Không tự reload Trunk, đổi route, factory reset, thay firmware, replay Webhook,
  retry API mutation hoặc khởi chạy lại chiến dịch nếu chưa xác nhận tác động.
- Dữ liệu chuyển cấp phải che credential, số điện thoại và dữ liệu không liên quan.
- Không cam kết SLA gỡ nhãn spam, phục hồi ghi âm hoặc xử lý nhà mạng khi chưa có
  quy định đã duyệt.
- Auto Call chỉ dùng trạng thái đã có bằng chứng trong tài liệu; không tự mô tả
  Pause/Resume/Stop, retry hay channel limit như tính năng đã xác minh.

## Phần Human cần hiệu chỉnh

1. Tên công cụ L1 được phép dùng để tra tenant, CDR, registration, delivery log.
2. Quyền reset SIP/password, mở khóa Portal, sửa route/campaign và người phê duyệt.
3. SLA chờ recording, escalation và nhóm nhận theo từng loại lỗi.
4. Mã lỗi/mã SIP nội bộ, Request ID, trường ticket bắt buộc và mẫu phản hồi chính thức.
5. Chính sách dữ liệu khi gửi log, Call-ID, screenshot, recording hoặc payload.

## Kiểm chứng

| Kiểm tra | Kết quả |
| --- | --- |
| Structural audit | PASS — 12/12 file, mỗi file 9/9 section |
| Placeholder audit | PASS — không còn `Đang soạn` hoặc câu placeholder cũ trong 12 runbook |
| `npm run types:check` | PASS |
| `npm run check:links` | PASS |
| `npm run guard` | PASS |
| Production build | PASS — 452/452 static pages |
| HTTP spot-check local | PASS — 3 bài đại diện trả 200, có 9 `h2` và draft marker |
| `npm run test:routes` | PASS — 21/21; `/internal/**` và internal search vẫn trả `401` khi anonymous |
| `npm run test:internal-content` | PASS — 21 flow, 76 step link; asset nhạy cảm không public |
| `npm run check:scope` | FAIL — chỉ `.codex/hooks.json` có sẵn nằm ngoài phạm vi TASK-029 |
| `npm run verify:task` | FAIL tại `check:scope`; chuỗi `verify:code` chạy trước đó PASS đầy đủ |

### Kiểm chứng sau khi bổ sung nội dung tình huống

| Kiểm tra | Kết quả |
| --- | --- |
| Structural audit | PASS — 12/12 có `Phân nhánh nhanh` và mô tả `Runbook L1` |
| Placeholder audit | PASS — không còn mô tả `Khung L1`, `Đang soạn` hoặc `Chưa cập nhật` trong 12 bài |
| `npm run verify:code` | PASS — typecheck, env, links và guard |
| Production build | PASS — compile và generate 452/452 trang |
| `npm run test:routes` | PASS — 21/21; internal và internal search vẫn `401` |
| `npm run test:internal-content` | PASS — 21 flow, 76 step link; asset nhạy cảm không public |

Không sửa, xóa hoặc thêm ngoại lệ cho `.codex/hooks.json`. Task tiếp tục giữ trạng thái
`in-progress` cho đến khi working tree được Human tách phạm vi và PR CI xanh.

