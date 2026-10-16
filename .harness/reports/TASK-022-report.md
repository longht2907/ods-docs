# TASK-022 — Báo cáo snapshot và đính chính sau review

> **Trạng thái task**: `in-progress`<br />
> **Nhánh gốc**: `task/TASK-022-api-reference-ui`<br />
> **Snapshot implementation được review**: `59072a9` (`docs(task-022): finalize API reference UI and documentation`)<br />
> **Baseline trước implementation**: `67d8e6b`<br />
> **Task sửa finding**: [TASK-023](../../tasks/TASK-023-api-ui-review-fixes.md)

## 1. Mục đích đính chính

Báo cáo TASK-022 trước đây tuyên bố sticky và browser verification đã đạt, nhưng review production build tái hiện được lỗi. Báo cáo này thay thế tuyên bố đó bằng trạng thái có bằng chứng, không che giấu finding và không dùng baseline `67d8e6b` như commit hoàn thiện.

## 2. Phạm vi snapshot thực tế

Snapshot `59072a9` có **27 trang endpoint dùng `ApiReferenceLayout`**:

| Nhóm | Số trang hiện hành | Ghi chú |
|---|---:|---|
| PBX / Tổng đài | 9 | Click-to-Call v1/v2, Phonebook, 3 API lịch sử cuộc gọi, Luật khách quen, Add/Delete Extension |
| Autocall | 18 | Campaign, Contact và Audio; bao gồm `GetCampaignReport` vẫn được giữ nguyên |
| **Tổng endpoint layout** | **27** | Không tính overview/getting-started/Webhook/WebRTC |

Toàn phân hệ `content/docs/ai-contact-center/api/**` hiện có **37 file MDX**: 27 endpoint layout và 10 bài overview/getting-started/Webhook/WebRTC.

## 3. Kết quả review và quyết định Human

| Finding | Trạng thái snapshot TASK-022 | Quyết định / xử lý |
|---|---|---|
| F1 — Sticky Request + Response | **Lỗi đã tái hiện** | Aside chỉ cao bằng nội dung do grid `align-items: start`; wrapper dùng `--fd-nav-height` không tồn tại nên computed `top: auto`, `max-height: none`. Sửa và test lại tại TASK-023. |
| F2 — Autocall contract | Chưa kiểm thử API thực tế | Human chấp nhận hoãn xác minh đến khi có case thực tế. Giữ nguyên schema/Action mapping hiện tại; không tuyên bố verified. |
| F3/F4 — Webhook | Nội dung vượt scope ODS | TASK-023 giới hạn về endpoint khách hàng, HTTP POST JSON, `apikey` tùy chọn trong body, event/payload/ACK và giới hạn định danh. Không có receiver code hoặc kiến trúc bắt buộc. |
| F5 — Hai API cũ | File đã bị xóa | `GetCallReport` và `GetCallReportDetail` được loại bỏ theo quyết định Human vì không còn sử dụng. 404 là kết quả mong muốn; không redirect và không tuyên bố hợp nhất. |
| F6 — Auth `/internal` | Chưa triển khai auth hoàn chỉnh | Hoãn xử lý; tiếp tục giữ fail-closed. TASK-023 không sửa proxy/auth/session/boundary. |
| F7 — JavaScript | Mẫu `{ ... }` không parse được | Sửa bằng mẫu backend JavaScript hợp lệ tại TASK-023. |
| F8 — Metadata | Social image fallback localhost | TASK-023 cấu hình và kiểm tra `metadataBase` build-time. |
| F9 — Hồ sơ | Commit/count/tuyên bố test không nhất quán | Đính chính trong task và báo cáo này; báo cáo TASK-023 ghi kết quả lệnh mới. |

## 4. Hai API đã loại bỏ

- `content/docs/ai-contact-center/api/tong-dai/lich-su-cuoc-goi/get-call-report.mdx`
- `content/docs/ai-contact-center/api/tong-dai/lich-su-cuoc-goi/get-call-report-detail.mdx`

Hai file không còn trong snapshot và không còn trong `meta.json` hiện hành. Lịch sử TASK-021 vẫn được giữ nguyên vì phản ánh trạng thái của task cũ. `GetCampaignReport` là API khác và không bị xóa.

## 5. Ranh giới kiểm chứng

- Các lệnh ghi trong báo cáo cũ phản ánh lần chạy trước tại thời điểm TASK-022, nhưng không chứng minh sticky thực sự hoạt động sau scroll; vì vậy finding UI được mở lại.
- Không có request nào được gửi tới API ODS/CloudFone hoặc Webhook thật.
- Autocall contract hiện tại được giữ theo quyết định Human, chưa được kiểm thử API thực tế.
- Kết quả build/route/browser mới phải được ghi tại `.harness/reports/TASK-023-report.md` sau khi chạy thật.

## 6. Trạng thái còn chờ

TASK-022 và TASK-023 đều giữ `in-progress`. Sau khi Human duyệt diff TASK-023, các bước commit, push, Pull Request và CI vẫn chưa được thực hiện. Chỉ sau khi PR CI xanh và Human chốt mới xem xét cập nhật trạng thái `done`.
