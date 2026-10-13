---
status: in-progress
branch: task/TASK-021-contact-center-api
commit: 8ae134f
verified-by: npm run verify:task
---

# TASK-021 — API Reference AI Contact Center (phong cách Claude Docs / Fumadocs)

## Bối cảnh

Hệ thống tài liệu ODS AI Contact Center hiện tại đã có bộ hướng dẫn sử dụng Portal (`user-guider-portal/**`), nhưng khu vực API tích hợp kỹ thuật (`content/docs/ai-contact-center/api/**`) đang ở dạng sơ khai hoặc placeholder mock (`/api/v1/calls/make`).

Khách hàng doanh nghiệp và lập trình viên tích hợp (CRM, ERP, Helpdesk, eCommerce) cần một bộ **API Reference** thực chiến, code-first theo phong cách chuẩn mực của Claude Docs (`platform.claude.com/docs`) trên nền tảng Fumadocs MDX:
- Mỗi endpoint là một trang độc lập, rõ ràng, tra cứu nhanh.
- Request mẫu đa ngôn ngữ (cURL, JavaScript, Python) có thể chạy được ngay.
- Bảng tham số chi tiết kèm kiểu dữ liệu, tính bắt buộc và ràng buộc giá trị.
- Phản hồi thực tế kèm bảng mô tả từng trường và các mã lỗi thường gặp.

Dữ liệu đặc tả được cung cấp từ 5 tài liệu nguồn nghiệp vụ thực tế nằm ngoài repo tại `E:\Project\ods-api-source\`:
1. `API PBX ODS.md` (GetCallLogs, GetCallHistory, V2, GetCallReport, GetCallReportDetail, ClickToCall/AutoCall, AutoCallV2, Popup, GSM, AddPhoneBook, Luật khách quen).
2. `API CloudFoneFINAL_update (1).md` (AddExtension, DeleteExtension).
3. `API kết nối Autocall Final.md` (18 endpoints Chiến dịch, Âm thanh TTS, Danh bạ/Nhóm danh bạ, Báo cáo).
4. `Tích hợp tổng đài ảo Mắt Bão One với CRM.md` (Tổng quan tích hợp CRM/ERP, WebRTC, JsSIP).
5. `CloudFoneAuthentication-CFA.md` (Tài liệu tham khảo nội bộ).

## Mục tiêu

Xây dựng lại toàn bộ phân hệ `content/docs/ai-contact-center/api/**` thành bộ API Reference chuyên nghiệp:
1. **Phong cách Claude Docs & Fumadocs**: Ngắn gọn, code-first, chuẩn xác, sử dụng linh hoạt các components: `Callout`, `Cards`, `Card`, `Tabs`, `Tab`, `Steps`, `Step`, `Accordions`, `Accordion`. Tuyệt đối không cài thêm dependency bên ngoài.
2. **Cấu trúc IA chuẩn hóa**:
   - `api/index.mdx`: Trang đích tổng quan điều hướng với Cards trực quan.
   - `api/bat-dau/**`: Hướng dẫn Xác thực (`ServiceName`, `AuthUser`, `AuthKey`) và Quy ước chung (Base URL, envelope JSON, phân trang, format ngày, KeySearch GUID, mã lỗi).
   - `api/tong-dai/**`: Máy nhánh, Cuộc gọi (Click-to-call, Autocall V2), Danh bạ tổng đài, Luật khách quen, Lịch sử cuộc gọi (GetCallLogs, GetCallHistory, V2, Báo cáo đánh giá).
   - `api/webhook/**`: Popup webhook payload, sự kiện cuộc gọi Inbound/Outbound.
   - `api/websocket-rtc/**`: Tích hợp thoại WebRTC trên trình duyệt, luồng SIP/WSS JsSIP, widget ODSPhone.
   - `api/autocall/**`: API Gọi tự động hàng loạt (Chiến dịch, Âm thanh TTS, Danh bạ & Nhóm, Báo cáo chiến dịch).
3. **An toàn & Bảo mật**:
   - 100% không để lộ credential thật, số điện thoại thật, mã khách hàng thật (dùng placeholder: `{BASE_URL}`, `YOUR_SERVICE_NAME`, `YOUR_AUTH_USER`, `YOUR_AUTH_KEY`, `0900000000`).
   - Sửa lại các mẫu JSON lỗi cú pháp trong tài liệu gốc. Giữ nguyên tên tham số kỹ thuật kể cả khi sai chính tả (`Extention`) và ghi chú rõ ràng cho lập trình viên.
   - Thông tin thiếu hụt hoặc chưa rõ ràng được gán nhãn `**Cần bổ sung:**` kèm mã `Q-xx` và lưu tại `.harness/reports/TASK-021-questions.md`.

## Phạm vi (Scope)

### Tạo mới hoặc sửa đổi:
- `content/docs/ai-contact-center/api/**`
- `public/media/ai-contact-center/api/**`
- `tasks/TASK-021-contact-center-api.md`
- `.harness/reports/**`

## Ngoài phạm vi (Out of Scope)

- KHÔNG sửa `content/docs/ai-contact-center/user-guider-portal/**` (chỉ link sang khi cần thiết).
- KHÔNG sửa `content/docs/cloudfile/**`.
- KHÔNG sửa `content/docs/meta.json` hoặc trang chủ docs.
- KHÔNG sửa `src/**`, `harness/**`, `package.json`, lockfile.
- KHÔNG thao tác thư mục `E:\Project\ods-docs-cloudfile`.
- KHÔNG sao chép các file nguồn thô từ `E:\Project\ods-api-source\` vào trong git repository.
- KHÔNG push git hoặc mở Pull Request khi chưa có yêu cầu từ Human.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ [AGENTS.md](../AGENTS.md) và [DECISIONS.md](../DECISIONS.md).
- Ranh giới bảo mật public/internal: API Reference nằm hoàn toàn trong `/docs/**` (public), không được link sang `/internal/**`.
- Mọi file MDX phải có đầy đủ frontmatter `title` và `description`.
- Giữ vững các kiểm tra của `harness/guard.mjs`:
  - `content/docs/ai-contact-center/api/tong-dai/meta.json` bắt buộc tồn tại.
  - `content/docs/ai-contact-center/api/autocall/meta.json` bắt buộc tồn tại.
  - `content/docs/ai-contact-center/api/webhook/meta.json` bắt buộc tồn tại.
  - Không tạo route cấm `content/docs/ai-contact-center/api/overview.mdx`.
  - Giữ title `API Reference` cho `content/docs/ai-contact-center/api/meta.json`.

## Kế hoạch thực hiện theo lô (Batches)

- **Lô 0**: Khởi tạo file task, nghiên cứu toàn bộ 5 tài liệu nguồn, lập kế hoạch chi tiết PLAN trong `.harness/reports/TASK-021-report.md`, lập danh sách câu hỏi làm rõ trong `.harness/reports/TASK-021-questions.md`. Báo cáo Human và DỪNG.
- **Lô 1**: Viết `api/index.mdx`, phân hệ `api/bat-dau/*` (Xác thực, Quy ước chung), khởi tạo toàn bộ `meta.json` và khung skeleton cho tất cả các trang endpoint.
- **Lô 2**: Hoàn thiện nội dung chi tiết phân hệ `api/tong-dai/may-nhanh/**`, `api/tong-dai/cuoc-goi/**`, `api/tong-dai/danh-ba/**`, `api/tong-dai/luat-khach-quen.mdx`.
- **Lô 3**: Hoàn thiện nội dung chi tiết phân hệ `api/tong-dai/lich-su-cuoc-goi/**` (GetCallLogs, GetCallHistory, V2, GetCallReport, GetCallReportDetail).
- **Lô 4**: Hoàn thiện phân hệ `api/webhook/popup.mdx` và `api/websocket-rtc/**` (Tổng quan WebRTC, Kết nối JsSIP, Widget ODSPhone).
- **Lô 5**: Hoàn thiện toàn bộ 18 endpoints của phân hệ `api/autocall/**` (Chiến dịch, Âm thanh TTS, Danh bạ & Nhóm danh bạ, Báo cáo kết quả).
- **Lô 6**: Cập nhật câu trả lời từ Human, thiết lập liên kết chéo với User Guide Portal `10-goi-tu-dong`, rà soát liên kết nội bộ và chạy toàn bộ chuỗi kiểm thử nghiệm thu.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [x] Lô 0: Kế hoạch IA, mapping tài liệu nguồn, danh sách mâu thuẫn và file câu hỏi được xây dựng đầy đủ, chính xác.
- [x] Lô 1: Khởi tạo toàn bộ cấu trúc IA, `meta.json`, `index.mdx`, `bat-dau/*` và skeleton 32 endpoint.
- [x] Lô 2: Hoàn thiện 100% phân hệ Tổng đài PBX (`may-nhanh/**`, `cuoc-goi/**`, `danh-ba/**`, `luat-khach-quen.mdx`).
- [x] Lô 3: Hoàn thiện 100% 5 trang phân hệ lịch sử cuộc gọi (`get-call-logs`, `get-call-history`, `get-call-history-v2`, `get-call-report`, `get-call-report-detail`).
- [x] Lô 4: Hoàn thiện 100% phân hệ Webhook Popup và WebSocket WebRTC (`webhook/popup`, `websocket-rtc/index`, `ket-noi-webrtc`, `widget-odsphone`).
- [x] Lô 5: Hoàn thiện 100% 19 trang phân hệ Autocall (1 index + 18 endpoints Chiến dịch, Âm thanh TTS, Danh bạ & Nhóm danh bạ).
- [x] `npm run check:env` PASS.
- [x] `npm run check:links` PASS (không có broken links nội bộ).
- [x] `npm run check:scope` PASS (thay đổi nằm đúng trong danh sách cho phép).
- [x] `npm run guard` in `Guard PASS.`
- [x] `npm run verify:code` PASS.
- [x] Không có secret, token thật hoặc UUID tài khoản thật nào xuất hiện trong mã nguồn.
- [x] Báo cáo nghiệm thu hoàn chỉnh tại `.harness/reports/TASK-021-report.md`.

## Điều kiện dừng (Stop Condition)

Dừng lại và xin ý kiến Human ngay lập tức nếu:
1. Hoàn thành xong từng Lô công việc theo kế hoạch.
2. Gặp mâu thuẫn ranh giới bảo mật hoặc cần đổi cấu hình hệ thống/dependency.
3. Cần quyết định về việc xóa hoặc đổi slug của trang hiện có `khoi-tao-cuoc-goi.mdx`.
