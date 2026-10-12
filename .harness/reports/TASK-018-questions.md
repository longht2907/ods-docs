# TASK-018 — Câu hỏi bổ sung nội dung Support Wiki

## Câu hỏi chung

| Mã | Câu hỏi | Ưu tiên (Cao/TB/Thấp) | Trả lời (Human) |
|---|---|---|---|
| Q-common-1 | ODS định nghĩa mức độ P1–P4 theo phạm vi ảnh hưởng và mức gián đoạn như thế nào? | Cao | |
| Q-common-2 | SLA phản hồi đầu tiên và SLA xử lý mục tiêu cho từng mức P1–P4 là bao lâu? | Cao | |
| Q-common-3 | Đội Support có ca trực ngoài giờ không; khung giờ và vai trò trực được quy định thế nào? | Cao | |
| Q-common-4 | Công cụ ticket chính thức là gì và trường dữ liệu nào bắt buộc khi tạo case? | Cao | |
| Q-common-5 | Phạm vi trách nhiệm của L1, L2, NOC và vendor được phân chia như thế nào? | Cao | |
| Q-common-6 | Kênh chung nào được phép dùng để chuyển cấp và cập nhật sự cố? | Cao | |
| Q-common-7 | Nền tảng Tổng đài đang dùng là Asterisk, FreePBX hay hệ thống khác; phiên bản và mô hình multi-tenant thế nào? | Cao | |
| Q-common-8 | Support được phép dùng những công cụ debug nào, và công cụ nào cần quyền hoặc phê duyệt riêng? | Cao | |
| Q-common-9 | Khi chuyển cấp, bộ dữ liệu tối thiểu bắt buộc phải đính kèm gồm những gì? | Cao | |
| Q-common-10 | Ai hoặc vai trò nào phê duyệt nội dung Support Wiki trước khi đưa vào sử dụng? | TB | |
| Q-common-11 | Có khôi phục trang Đóng góp tài liệu để ghi quy ước đặt tên, cách dùng dàn ý và dữ liệu bị cấm, hay gộp nội dung này vào trang Bảo mật? | TB | |

Khi Human trả lời, agent đưa câu trả lời vào đúng trang liên quan, bỏ nhãn `*(đề xuất)*` hoặc `**Cần bổ sung:**` đã được giải quyết và thêm `Đã điền` vào ô trả lời. Không suy diễn ngoài câu trả lời.

## runbooks/calls/outbound-failed — Không gọi ra được

| Mã | Câu hỏi | Ưu tiên (Cao/TB/Thấp) | Trả lời (Human) |
|---|---|---|---|
| Q-outbound-failed-1 | Dấu hiệu hoặc mã lỗi nào thường được ODS dùng để xác nhận case “không gọi ra được”? | Cao | |
| Q-outbound-failed-2 | Ngoài số gọi, số bị gọi và thời điểm, ODS yêu cầu khách hàng cung cấp thêm dữ liệu nào cho case gọi ra? | Cao | |
| Q-outbound-failed-3 | ODS kiểm tra quyền gọi ra, outbound route, CDR và trạng thái trunk tại công cụ nào, theo thứ tự nào? | Cao | |
| Q-outbound-failed-4 | Với từng nguyên nhân thường gặp, ODS cho phép L1 xử lý trực tiếp đến bước nào? | Cao | |
| Q-outbound-failed-5 | Case gọi ra được chuyển cho L2, NOC hay vendor trong từng điều kiện nào? | Cao | |
| Q-outbound-failed-6 | ODS có mẫu tiếp nhận và mẫu xác nhận xử lý chuẩn nào cho sự cố gọi ra? | TB | |
| Q-outbound-failed-7 | Có những ticket đã đóng nào có thể dùng để tổng hợp nguyên nhân gọi ra thất bại mà không chứa dữ liệu bị cấm? | Thấp | |
| Q-outbound-failed-8 | Runbook gọi ra cần liên kết thêm trang tra cứu nào? | Thấp | |

## runbooks/calls/inbound-failed — Không nhận được cuộc gọi đến

| Mã | Câu hỏi | Ưu tiên (Cao/TB/Thấp) | Trả lời (Human) |
|---|---|---|---|
| Q-inbound-failed-1 | ODS phân biệt “nhà mạng chưa đưa cuộc gọi vào” với “hệ thống đã nhận nhưng không chuyển tới đích” bằng dấu hiệu nào? | Cao | |
| Q-inbound-failed-2 | Case gọi vào cần khách hàng cung cấp thêm thông tin nào ngoài hai số, thời điểm và đích mong đợi? | Cao | |
| Q-inbound-failed-3 | ODS tra cứu đầu số, inbound route và log cuộc gọi đến trên những hệ thống nào? | Cao | |
| Q-inbound-failed-4 | L1 được phép xử lý trực tiếp những lỗi gọi vào nào và thao tác nào bắt buộc chuyển L2? | Cao | |
| Q-inbound-failed-5 | Điều kiện nào chuyển case gọi vào cho L2, NOC hoặc nhà mạng? | Cao | |
| Q-inbound-failed-6 | ODS có mẫu tiếp nhận và mẫu xác nhận xử lý chuẩn nào cho sự cố gọi vào? | TB | |
| Q-inbound-failed-7 | Có những ticket đã đóng nào có thể dùng để tổng hợp nguyên nhân gọi vào thất bại mà không chứa dữ liệu bị cấm? | Thấp | |
| Q-inbound-failed-8 | Runbook gọi vào cần giữ hoặc bổ sung những trang tra cứu nào? | Thấp | |

## runbooks/calls/dropped-calls — Cuộc gọi bị rớt

| Mã | Câu hỏi | Ưu tiên (Cao/TB/Thấp) | Trả lời (Human) |
|---|---|---|---|
| Q-dropped-calls-1 | ODS xác nhận một cuộc gọi “bị rớt” dựa trên CDR, SIP cause hay dấu hiệu nào khác? | Cao | |
| Q-dropped-calls-2 | Khách hàng cần thực hiện những cuộc gọi thử nào để khoanh vùng case rớt cuộc gọi? | Cao | |
| Q-dropped-calls-3 | ODS có số liệu hoặc log nào để xác định bên gửi BYE và chất lượng RTP trước lúc cuộc gọi rớt? | Cao | |
| Q-dropped-calls-4 | Ngưỡng packet loss, jitter hoặc latency nào được ODS dùng để kết luận cần chuyển đội mạng? | Cao | |
| Q-dropped-calls-5 | Case rớt cuộc gọi được chuyển cho L2, NOC, ISP hay nhà mạng theo ma trận nào? | Cao | |
| Q-dropped-calls-6 | Sau xử lý, ODS yêu cầu test trong bao lâu hoặc bao nhiêu cuộc gọi trước khi xác nhận ổn định? | TB | |
| Q-dropped-calls-7 | Có ticket đã đóng nào phù hợp để tổng hợp nguyên nhân rớt cuộc gọi mà không chứa dữ liệu bị cấm? | Thấp | |
| Q-dropped-calls-8 | Runbook rớt cuộc gọi cần liên kết thêm tài liệu mạng hoặc RTP nào? | Thấp | |

## runbooks/calls/one-way-audio — Âm thanh một chiều / rè

| Mã | Câu hỏi | Ưu tiên (Cao/TB/Thấp) | Trả lời (Human) |
|---|---|---|---|
| Q-one-way-audio-1 | ODS dùng tiêu chí nào để tách âm thanh một chiều, mất tiếng hoàn toàn và chất lượng thoại kém? | Cao | |
| Q-one-way-audio-2 | ODS yêu cầu khách hàng thực hiện những bài test nào để xác định chiều và phạm vi lỗi âm thanh? | Cao | |
| Q-one-way-audio-3 | ODS kiểm tra SIP/SDP và RTP hai chiều bằng công cụ nào, với ngưỡng packet loss/jitter nào? | Cao | |
| Q-one-way-audio-4 | Codec và mô hình xử lý media nào đang được ODS hỗ trợ cho từng loại endpoint/trunk? | Cao | |
| Q-one-way-audio-5 | Case âm thanh được chuyển cho L2, NOC, ISP hay nhà mạng theo điều kiện nào? | Cao | |
| Q-one-way-audio-6 | Sau xử lý, ODS dùng bài test hoặc tiêu chí nào để xác nhận âm thanh đã ổn định? | TB | |
| Q-one-way-audio-7 | Có ticket đã đóng nào phù hợp để tổng hợp nguyên nhân âm thanh mà không chứa dữ liệu bị cấm? | Thấp | |
| Q-one-way-audio-8 | Runbook âm thanh cần liên kết thêm tài liệu codec, NAT hoặc RTP nào? | Thấp | |
