# TASK-029 — Audit từng bài AI Contact Center API

## Phạm vi và nguyên tắc

- Đã đọc 37 file MDX trong `content/docs/ai-contact-center/api/**`.
- Không gửi request đến API ODS thật.
- Không thay endpoint, auth field, parameter, payload, response hoặc mã lỗi.
- Nguồn đối chiếu: `API PBX ODS.md`, `API CloudFoneFINAL_update (1).md`,
  `API kết nối Autocall Final.md`, `Call event.txt`, tài liệu WebRTC/Widget trong
  `E:\Project\ods-api-source\` và câu trả lời Human tại
  `.harness/reports/TASK-021-questions.md`.
- `PASS` ở cột cấu trúc nghĩa là bài đạt template phù hợp với loại bài; không có
  nghĩa mọi chi tiết vận hành của API đã được backend ODS xác nhận.

## Kết quả tổng hợp

- 27 HTTP endpoint: đủ frontmatter, `ApiEndpoint`, layout hai cột, request table,
  code tabs, response, troubleshooting và bài liên quan.
- 6 overview/auth/convention, 1 Webhook contract và 3 WebRTC/Widget: giữ template
  riêng; không bị ép vào layout endpoint.
- 26/27 endpoint dùng cùng bộ tab `cURL / Node.js / Python`. `CreateTTSAudio` đã
  được sửa để dùng cùng giá trị `cURL` nhưng vẫn giữ hai ví dụ TTS và Base64.
- `StartCampaign` đã có workflow responsive thể hiện phụ thuộc tài nguyên trước
  khi khởi chạy; CRUD/query tiếp tục không có sơ đồ trang trí.

## Ma trận 37 bài

| Bài | Loại | Cấu trúc | Evidence/giới hạn | Diagram |
| --- | --- | --- | --- | --- |
| `api/index.mdx` | Overview | PASS | Verified | Architecture |
| `bat-dau/xac-thuc.mdx` | Auth guide | PASS | Verified theo Q1–Q2 | None |
| `bat-dau/quy-uoc-chung.mdx` | Convention | PASS | Partial — chưa có catalog lỗi/rate limit chính thức (Q3) | None |
| `tong-dai/index.mdx` | Overview | PASS | Verified | None |
| `tong-dai/cuoc-goi/click-to-call.mdx` | Complex endpoint | PASS | Verified core contract | Sequence |
| `tong-dai/cuoc-goi/click-to-call-v2.mdx` | Complex endpoint | PASS | Verified core contract | Sequence |
| `tong-dai/danh-ba/add-phonebook.mdx` | CRUD endpoint | PASS | Verified core contract | None |
| `tong-dai/lich-su-cuoc-goi/get-call-history.mdx` | Query endpoint | PASS | Verified core contract | None |
| `tong-dai/lich-su-cuoc-goi/get-call-history-v2.mdx` | Query endpoint | PASS | Verified core contract | None |
| `tong-dai/lich-su-cuoc-goi/get-call-logs.mdx` | Query endpoint | PASS | Verified core contract | None |
| `tong-dai/luat-khach-quen.mdx` | CRUD endpoint | PASS | Verified theo Q8 | None |
| `tong-dai/may-nhanh/add-extension.mdx` | CRUD endpoint | PASS | Verified core contract | None |
| `tong-dai/may-nhanh/delete-extension.mdx` | CRUD endpoint | PASS | Verified core contract | None |
| `autocall/index.mdx` | Overview | PASS | Verified ở mức điều hướng | None |
| `autocall/am-thanh/create-tts-audio.mdx` | CRUD endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/am-thanh/delete-audio.mdx` | CRUD endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/am-thanh/get-audio-list.mdx` | Query endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/chien-dich/start-campaign.mdx` | Complex endpoint | PASS | Partial — Action mapping còn Q10 | Workflow |
| `autocall/chien-dich/delete-campaign.mdx` | CRUD endpoint | PASS | Partial — side effect khi campaign đang chạy chưa xác nhận | None |
| `autocall/chien-dich/get-campaign-detail.mdx` | Query endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/chien-dich/get-campaign-list.mdx` | Query endpoint | PASS | Partial — response schema/phân trang chưa xác nhận đầy đủ | None |
| `autocall/chien-dich/get-campaign-report.mdx` | Query endpoint | PASS | Partial — response schema/phân trang chưa xác nhận đầy đủ | None |
| `autocall/chien-dich/get-list-action.mdx` | Query endpoint | PASS | Partial — mapping Action còn Q10 | None |
| `autocall/chien-dich/get-trunk-list.mdx` | Query endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/danh-ba/add-contact.mdx` | CRUD endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/danh-ba/add-contact-group.mdx` | CRUD endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/danh-ba/add-contact-to-group.mdx` | CRUD endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/danh-ba/delete-contact.mdx` | CRUD endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/danh-ba/delete-contact-from-group.mdx` | CRUD endpoint | PASS | Partial — response schema chưa có schema backend chính thức | None |
| `autocall/danh-ba/get-contact-list.mdx` | Query endpoint | PASS | Partial — response schema/phân trang chưa xác nhận đầy đủ | None |
| `autocall/danh-ba/get-contact-group-list.mdx` | Query endpoint | PASS | Partial — response schema/phân trang chưa xác nhận đầy đủ | None |
| `autocall/danh-ba/get-contact-group-detail-list.mdx` | Query endpoint | PASS | Partial — response schema/phân trang chưa xác nhận đầy đủ | None |
| `webhook/index.mdx` | Webhook overview | PASS | Partial — timeout/retry/IP allowlist còn Q4 | Event lifecycle in prose |
| `webhook/popup.mdx` | Webhook contract | PASS | Partial — timeout/retry/IP allowlist còn Q4 | Raw event sequences |
| `websocket-rtc/index.mdx` | WebRTC overview | PASS | Verified ở mức kiến trúc | Architecture in prose |
| `websocket-rtc/ket-noi-webrtc.mdx` | WebRTC guide | PASS | Partial — WSS endpoint/realm/codec còn Q5 | None until Q5 |
| `websocket-rtc/widget-odsphone.mdx` | Widget SDK | PASS | Verified theo hai nguồn Widget mới; ví dụ dùng public-key placeholder | Workflow in prose |

## Thay đổi presentation đã thực hiện

1. `CreateTTSAudio`: chuẩn hóa persisted language tab thành `cURL / Node.js /
   Python`; hai request TTS/Base64 nằm cùng tab cURL và giữ nguyên payload.
2. `Click-to-Call`: chuẩn hóa heading `Response mẫu`; không đổi response JSON.
3. `StartCampaign`: thêm workflow bốn bước từ dữ liệu hiện có. Không thêm endpoint,
   field hoặc hành vi mới.

## Nội dung cần Human/backend ODS xác nhận

1. Autocall response schema, pagination và bảng mapping `Action` (Q10).
2. Webhook timeout, retry policy và dải IP gửi sự kiện (Q4).
3. WebRTC WSS endpoint, port, SIP realm và codec chính thức (Q5).

Các mục này không được tự điền trong batch UI/documentation hiện tại.
