# TASK-021 — Báo cáo & Kế hoạch Chi tiết (Lô 0) API Reference AI Contact Center

> **Trạng thái**: Đóng đợt triển khai hiện tại theo xác nhận của Human. PR #21 đã merge vào `main` tại commit `67d8e6b` với CI verify xanh. **KHÔNG coi API đã nghiệm thu toàn bộ**; 6 finding review kỹ thuật được chuyển sang backlog [TASK-021-follow-up.md](TASK-021-follow-up.md).<br />
> **Nhánh**: `task/TASK-021-contact-center-api`<br />
> **Task file**: [tasks/TASK-021-contact-center-api.md](../../tasks/TASK-021-contact-center-api.md)<br />
> **Questions file**: [.harness/reports/TASK-021-questions.md](TASK-021-questions.md)<br />
> **Follow-up Backlog**: [.harness/reports/TASK-021-follow-up.md](TASK-021-follow-up.md)

---

## 1. Tổng quan & Mục tiêu Dự án

Nhiệm vụ **TASK-021** nhằm xây dựng lại toàn bộ phân hệ tài liệu tích hợp kỹ thuật `content/docs/ai-contact-center/api/**` thành bộ **API Reference** chuẩn mực cho developer và kỹ sư tích hợp hệ thống (CRM, ERP, Helpdesk, eCommerce).

### 1.1 Triết lý thiết kế (Claude Docs & Fumadocs Aesthetic)
- **Code-First & Tối giản**: Tiếp cận thẳng vào mã nguồn và cú pháp thực thi. Mỗi endpoint là một trang tài liệu độc lập, có cURL, JavaScript (Fetch), Python (Requests) có thể copy và chạy được ngay.
- **Tận dụng linh hoạt components Fumadocs**:
  - `<Callout type="info">`: Hiển thị Method HTTP + Endpoint URL nổi bật đầu trang.
  - `<Tabs>` / `<Tab>`: Trình bày ví dụ mã nguồn đa ngôn ngữ.
  - `<Cards>` / `<Card>`: Điều hướng trực quan giữa các nhóm chức năng và bài viết liên quan.
  - `<Accordions>` / `<Accordion>`: Gom cụm các lỗi thường gặp, mã phản hồi và tình huống ngoại lệ.
  - `<Steps>` / `<Step>`: Minh họa quy trình tích hợp tuần tự (ví dụ: tạo file âm thanh → nhóm danh bạ → khởi chạy chiến dịch).
- **Tuyệt đối an toàn & Không rò rỉ dữ liệu**:
  - 100% không để lộ UUID thật, secret, số điện thoại hoặc mã khách hàng thật từ tài liệu nội bộ.
  - Sử dụng biến đại diện: `{BASE_URL}`, `{AUTOCALL_BASE_URL}`, `YOUR_SERVICE_NAME`, `YOUR_AUTH_USER`, `YOUR_AUTH_KEY`, số điện thoại mẫu `0900000000`.

---

## 2. Kết quả Khảo sát 5 Tài liệu Nguồn

Dữ liệu đặc tả được cung cấp từ 5 tài liệu ngoài repo (`E:\Project\ods-api-source\`):

| Tệp nguồn | Dung lượng | Nội dung trọng tâm | Nhận xét đánh giá |
|---|:---:|---|---|
| **`API PBX ODS.md`** | 27.8 KB | API Lịch sử cuộc gọi (`GetCallLogs`, `GetCallHistory`, `GetCallHistoryVer2`, `GetCallReport`, `GetCallReportDetail`), Khởi tạo cuộc gọi (`AutoCall`, `AutoCallV2`), Webhook & Popup, GSM SMS (`GSMGetSMSMessage`), Danh bạ (`AddPhoneBook`), Luật khách quen (`CreateAndUpdateFamiliar`). | Là tài liệu chính xác và cập nhật nhất cho cụm API Tổng đài PBX ODS. Chứa đầy đủ mô tả tham số và payload thực tế. |
| **`API CloudFoneFINAL_update (1).md`** | 9.7 KB | Quản lý máy nhánh (`AddExtension`, `DeleteExtension`), và các phiên bản cũ của `GetCallHistory`, `AutoCall`, `Popup`, `GSMGetSMSMessage`. | Nguồn độc quyền cung cấp 2 endpoint `AddExtension` và `DeleteExtension`. Các endpoint khác là bản cũ, ưu tiên lấy từ `API PBX ODS.md`. |
| **`API kết nối Autocall Final.md`** | 15.9 KB | 18 endpoints chuyên dụng cho Chiến dịch gọi tự động hàng loạt: Chiến dịch (1-6, 18), Âm thanh TTS (7-9), Danh bạ & Nhóm liên hệ (10-17). | Cung cấp đầy đủ cấu trúc API chiến dịch gọi tự động, Text-To-Speech (FPT, VBEE, Viettel VTCC, Google) và quản lý nhóm liên hệ. |
| **`Tích hợp tổng đài ảo Mắt Bão One với CRM.md`** | 5.5 KB | Khái niệm tích hợp CRM/ERP; So sánh 2 cơ chế: Softphone/IP Phone + API/Webhook vs Gọi trực tiếp WebRTC trên trình duyệt; Tài liệu tham khảo JsSIP và SIP client. | Làm nền tảng cho trang Tổng quan tích hợp CRM và phân hệ WebSocket RTC (`websocket-rtc/**`). |
| **`CloudFoneAuthentication-CFA.md`** | 5.3 KB | Xác thực đăng nhập qua cuộc gọi thoại (Voice OTP) thuộc dịch vụ Assistant. Ghi rõ "Lưu hành Nội Bộ". | Tạm thời giữ làm tài liệu tham khảo nội bộ theo yêu cầu, chưa đưa vào tài liệu public của Task này. |

---

## 3. Danh sách Mâu thuẫn & Kết luận Xử lý từ Human

Quá trình khảo sát chi tiết đã phát hiện các điểm sai lệch, mâu thuẫn kỹ thuật và đã được Human chốt phương án xử lý như sau:

1. **Base URL chính thức & Giao thức (Chốt từ Human - Q1)**:
   - **Tổng đài PBX**: `https://api.ods.vn` (Base URL chính thức chuẩn hóa).
   - **Autocall**: `https://apiai.cloudfone.vn` (có hỗ trợ HTTPS).
   - *Ghi chú tính tương thích*: Hệ thống vẫn cho chạy song song các domain `https://api.matbao.one` hoặc `https://api.cloudfone.vn` cho khách hàng đã tích hợp trước đó, nhưng khuyến nghị toàn bộ tài liệu và đối tác mới trỏ về `https://api.ods.vn`.
2. **Quy ước tên trường `ServiceName` vs `ServiceCode` (Chốt từ Human - Q2)**:
   - Giữ đúng tên trường trong payload JSON của từng endpoint theo nguồn để code của khách hàng chạy chính xác (`AddExtension`, `DeleteExtension`, `Autocall` dùng `ServiceCode`; `AutoCall`, `GetCallLogs`, `AddPhoneBook` dùng `ServiceName`).
   - Bổ sung Callout cảnh báo lập trình viên lưu ý sự khác nhau giữa các nhóm API.
3. **Phản hồi lỗi & Bảng mã lỗi (Chốt từ Human - Q3)**:
   - Nguồn không có catalog mã lỗi chi tiết. Tại mục Lỗi thường gặp, chỉ nêu các lỗi cơ bản suy đoán được từ tham số bắt buộc (thiếu thông tin, sai auth, định dạng sai).
4. **Site menu & Khung tổng thể (Chốt từ Human - Q4 đến Q10)**:
   - Ưu tiên dựng hoàn chỉnh site menu, IA, skeleton toàn bộ các phân hệ trước; các thông số vận hành chi tiết sẽ được bổ sung sau.
5. **Xử lý trang `tong-dai/khoi-tao-cuoc-goi.mdx` (Chốt từ Human - Q11)**:
   - Gộp nội dung và chuyển hướng vào `tong-dai/cuoc-goi/click-to-call.mdx`.
6. **Lỗi cú pháp JSON mẫu trong tài liệu gốc**:
   - Trong `GetCallHistory` và `GetCallHistoryVer2`, JSON mẫu bị lỗi cú pháp: `"IsSort":,` ➔ Đã sửa thành hợp lệ `"IsSort": 0`.
   - Trong `AddPhoneBook`, JSON mẫu bị thừa dấu phẩy cuối dòng ➔ Đã sửa thành JSON chuẩn.
   - Trong `StartCampaign`, JSON mẫu bị bọc thừa 2 lớp ngoặc nhọn ➔ Đã làm phẳng thành 1 lớp JSON chuẩn.

4. **Mâu thuẫn định dạng ngày tháng**:
   - `GetCallHistory` ghi: `"DateStart":"2021-01-08 00:00:01"` nhưng text mô tả ghi có thể truyền `"2017-07-01"` và hệ thống tự hiểu `00:00:00`.
   - `GetCallLogs` dùng format có giờ: `"2023-07-03 00:00:01"`.
   - `GSMGetSMSMessage` dùng format ngày: `"2017-07-01"`.
   - `StartCampaign` dùng format microsecond: `"2018-10-19 16:44:00.000"`.
   - *Chuẩn hóa*: Ghi chú rõ format hỗ trợ tại trang Quy ước chung và từng endpoint.
5. **Lỗi Typo tham số kỹ thuật trong nguồn**:
   - Tham số máy nhánh: `Ext` (AutoCall), `Extension` (GetCallReportDetail), `Extention` (Luật khách quen), `ext` (AddExtension).
   - Tham số ID: `id` (AddPhoneBook), `Id` (DeleteCampaign, GetCampaignDetail), ` Id` (DeleteAudio có dấu cách đầu), `Contact_Id` (DeleteContact), `Group_Id` (DeleteContactFromGroup).
   - Tham số GSM: `smS_Id`, `port_Number`, `from_Name`, `from_Number`.
   - *Chuẩn hóa*: Giữ nguyên đúng tên trường kỹ thuật của hệ thống để tránh lỗi parse khi client gửi lên, đồng thời chú thích cảnh báo cho developer.
6. **Lỗi liên kết Markdown trong nguồn**:
   - Tại mục 8 Luật khách quen: text ghi `https://api.ods.vn/api/CloudFone/CreateAndUpdateFamiliar` nhưng thẻ link ẩn lại trỏ sang `https://api.cloudfone.vn/api/CloudFone/GetHistoryCallAnalytics`.
   - *Chuẩn hóa*: Dùng endpoint đúng là `POST {BASE_URL}/api/CloudFone/CreateAndUpdateFamiliar`.

---

## 4. Kiến trúc Thông tin (Information Architecture - IA) Đề xuất

Cấu trúc phân cấp hoàn chỉnh cho thư mục `content/docs/ai-contact-center/api/**`:

```
content/docs/ai-contact-center/api/
├── index.mdx                                       # Tổng quan API Reference (Landing điều hướng)
├── meta.json                                       # Navigation root của API
├── bat-dau/                                        # Bắt đầu tích hợp
│   ├── meta.json
│   ├── xac-thuc.mdx                                # Cơ chế xác thực (ServiceName, AuthUser, AuthKey)
│   └── quy-uoc-chung.mdx                           # Base URL, Envelope JSON, Phân trang, Format ngày, Mã lỗi
├── tong-dai/                                       # API Tổng đài PBX
│   ├── meta.json
│   ├── index.mdx                                   # Tổng quan API Tổng đài
│   ├── may-nhanh/                                  # Quản lý số nội bộ
│   │   ├── meta.json
│   │   ├── add-extension.mdx                       # Tạo máy nhánh (AddExtension)
│   │   └── delete-extension.mdx                    # Xóa máy nhánh (DeleteExtension)
│   ├── cuoc-goi/                                   # Khởi tạo cuộc gọi
│   │   ├── meta.json
│   │   ├── click-to-call.mdx                       # Gọi ra qua máy nhánh (AutoCall)
│   │   └── click-to-call-v2.mdx                    # Gọi tự động qua kịch bản (AutoCallV2)
│   ├── danh-ba/                                    # Quản lý danh bạ
│   │   ├── meta.json
│   │   └── add-phonebook.mdx                       # Thêm & cập nhật danh bạ (AddPhoneBook)
│   ├── luat-khach-quen.mdx                         # Định tuyến khách quen (CreateAndUpdateFamiliar)
│   └── lich-su-cuoc-goi/                           # Nhật ký & Báo cáo cuộc gọi
│       ├── meta.json
│       ├── get-call-logs.mdx                       # Nhật ký cuộc gọi chuẩn mới (GetCallLogs)
│       ├── get-call-history.mdx                    # Lịch sử cuộc gọi v1 (GetCallHistory)
│       ├── get-call-history-v2.mdx                 # Lịch sử cuộc gọi v2 (GetCallHistoryVer2)
│       ├── get-call-report.mdx                     # Báo cáo đánh giá tổng hợp (GetCallReport)
│       └── get-call-report-detail.mdx              # Báo cáo đánh giá chi tiết (GetCallReportDetail)
├── webhook/                                        # Webhook & Sự kiện thời gian thực
│   ├── meta.json
│   ├── index.mdx                                   # Tổng quan cơ chế Webhook
│   └── popup.mdx                                   # Webhook thông báo cuộc gọi Popup (Ringing, Up, Down)
├── websocket-rtc/                                  # Tích hợp thoại WebRTC trên trình duyệt
│   ├── meta.json
│   ├── index.mdx                                   # Tổng quan WebRTC vs Softphone tích hợp CRM
│   ├── ket-noi-webrtc.mdx                          # Đăng ký SIP qua WSS với JsSIP
│   └── widget-odsphone.mdx                         # Nhúng Widget ODSPhone vào Web/CRM
└── autocall/                                       # API Chiến dịch gọi tự động hàng loạt
    ├── meta.json
    ├── index.mdx                                   # Luồng vận hành: Âm thanh → Danh bạ → Chiến dịch → Báo cáo
    ├── chien-dich/                                 # Quản lý chiến dịch gọi
    │   ├── meta.json
    │   ├── start-campaign.mdx                      # Tạo/cập nhật chiến dịch (StartCampaign)
    │   ├── get-campaign-list.mdx                   # Danh sách chiến dịch (GetCampaignList)
    │   ├── get-campaign-detail.mdx                 # Chi tiết chiến dịch (GetCampaignDetail)
    │   ├── delete-campaign.mdx                     # Xóa chiến dịch (DeleteCampaign)
    │   ├── get-campaign-report.mdx                 # Báo cáo kết quả chiến dịch (GetCampaignReport)
    │   ├── get-list-action.mdx                     # Danh sách hành động phím bấm (GetListAction)
    │   └── get-trunk-list.mdx                      # Danh sách đầu số Trunk (GetTrunkList)
    ├── am-thanh/                                   # Quản lý tệp âm thanh & Text-to-Speech
    │   ├── meta.json
    │   ├── create-tts-audio.mdx                    # Tạo âm thanh TTS / upload Base64 (CreateTTSAudio)
    │   ├── get-audio-list.mdx                      # Danh sách âm thanh (GetAudioList)
    │   └── delete-audio.mdx                        # Xóa tệp âm thanh (DeleteAudio)
    └── danh-ba/                                    # Quản lý khách hàng & nhóm chiến dịch
        ├── meta.json
        ├── add-contact.mdx                         # Thêm liên hệ (AddContact)
        ├── add-contact-group.mdx                   # Tạo nhóm liên hệ (AddContactGroup)
        ├── add-contact-to-group.mdx                # Thêm liên hệ vào nhóm (AddContactToGroup)
        ├── get-contact-group-list.mdx              # Danh sách nhóm liên hệ (GetContactGroupList)
        ├── get-contact-group-detail-list.mdx       # Chi tiết danh bạ trong nhóm (GetContactGroupDetailList)
        ├── get-contact-list.mdx                    # Danh sách liên hệ (GetContactList)
        ├── delete-contact.mdx                      # Xóa liên hệ (DeleteContact)
        └── delete-contact-from-group.mdx           # Xóa liên hệ khỏi nhóm (DeleteContactFromGroup)
```

---

## 5. Bảng Mapping Ma trận: Tài liệu Nguồn ➔ Trang Tài liệu Đích

| STT | Tài liệu nguồn | Mục / Tên API gốc | Method & Path | Trang tài liệu đích |
|:---:|---|---|---|---|
| 1 | `API CloudFoneFINAL_update (1).md` | Add Extension | `POST /api/CloudFone/AddExtension` | `tong-dai/may-nhanh/add-extension.mdx` |
| 2 | `API CloudFoneFINAL_update (1).md` | Delete Extension | `POST /api/CloudFone/DeleteExtension` | `tong-dai/may-nhanh/delete-extension.mdx` |
| 3 | `API PBX ODS.md` | 2. ClickToCall | `POST /api/CloudFone/AutoCall` | `tong-dai/cuoc-goi/click-to-call.mdx` |
| 4 | `API PBX ODS.md` | 3. Khởi tạo cuộc gọi tự động (Autocall) | `POST /api/CloudFone/AutoCallV2` | `tong-dai/cuoc-goi/click-to-call-v2.mdx` |
| 5 | `API PBX ODS.md` | 7. AddPhoneBook | `POST /api/CloudFone/AddPhoneBook` | `tong-dai/danh-ba/add-phonebook.mdx` |
| 6 | `API PBX ODS.md` | 8. Luật khách quen | `POST /api/CloudFone/CreateAndUpdateFamiliar` | `tong-dai/luat-khach-quen.mdx` |
| 7 | `API PBX ODS.md` | 1.1 Get Call Log | `POST /api/CloudFone/GetCallLogs` | `tong-dai/lich-su-cuoc-goi/get-call-logs.mdx` |
| 8 | `API PBX ODS.md` | 1.2 Get Call History | `POST /api/CloudFone/GetCallHistory` | `tong-dai/lich-su-cuoc-goi/get-call-history.mdx` |
| 9 | `API PBX ODS.md` | 1.3 Get Call History V2 | `POST /api/CloudFone/GetCallHistoryVer2` | `tong-dai/lich-su-cuoc-goi/get-call-history-v2.mdx` |
| 10 | `API PBX ODS.md` | 1.4 Get call report | `POST /api/CloudFone/GetCallReport` | `tong-dai/lich-su-cuoc-goi/get-call-report.mdx` |
| 11 | `API PBX ODS.md` | 1.5 Get call detail report | `POST /api/CloudFone/GetCallReportDetail` | `tong-dai/lich-su-cuoc-goi/get-call-report-detail.mdx` |
| 12 | `API PBX ODS.md` | 5. Popup (Webhook) | Khách hàng nhận `POST` | `webhook/popup.mdx` |
| 13 | `Tích hợp tổng đài...CRM.md` | 1 & 3. Tổng quan & Softphone vs WebRTC | Lý thuyết kiến trúc | `websocket-rtc/index.mdx` |
| 14 | `Tích hợp tổng đài...CRM.md` | 3.1.2 WebRTC & JsSIP | SIP over WebSocket | `websocket-rtc/ket-noi-webrtc.mdx` |
| 15 | Yêu cầu nghiệp vụ | Widget ODSPhone | SDK / Embed | `websocket-rtc/widget-odsphone.mdx` |
| 16 | `API kết nối Autocall Final.md` | 1. StartCampaign | `POST /api/Autocall/StartCampaign` | `autocall/chien-dich/start-campaign.mdx` |
| 17 | `API kết nối Autocall Final.md` | 2. GetCampaignList | `POST /api/Autocall/GetCampaignList` | `autocall/chien-dich/get-campaign-list.mdx` |
| 18 | `API kết nối Autocall Final.md` | 3. GetListAction | `POST /api/Autocall/GetListAction` | `autocall/chien-dich/get-list-action.mdx` |
| 19 | `API kết nối Autocall Final.md` | 4. DeleteCampaign | `POST /api/Autocall/DeleteCampaign` | `autocall/chien-dich/delete-campaign.mdx` |
| 20 | `API kết nối Autocall Final.md` | 5. GetCampaignDetail | `POST /api/Autocall/GetCampaignDetail` | `autocall/chien-dich/get-campaign-detail.mdx` |
| 21 | `API kết nối Autocall Final.md` | 6. GetTrunkList | `POST /api/Autocall/GetTrunkList` | `autocall/chien-dich/get-trunk-list.mdx` |
| 22 | `API kết nối Autocall Final.md` | 18. GetCampaignReport | `POST /api/Autocall/GetCampaignReport` | `autocall/chien-dich/get-campaign-report.mdx` |
| 23 | `API kết nối Autocall Final.md` | 7. CreateTTSAudio | `POST /api/Audio/CreateTTSAudio` | `autocall/am-thanh/create-tts-audio.mdx` |
| 24 | `API kết nối Autocall Final.md` | 8. GetAudioList | `POST /api/Audio/GetAudioList` | `autocall/am-thanh/get-audio-list.mdx` |
| 25 | `API kết nối Autocall Final.md` | 9. DeleteAudio | `POST /api/Audio/DeleteAudio` | `autocall/am-thanh/delete-audio.mdx` |
| 26 | `API kết nối Autocall Final.md` | 10. AddContact | `POST /api/Contact/AddContact` | `autocall/danh-ba/add-contact.mdx` |
| 27 | `API kết nối Autocall Final.md` | 11. AddContactGroup | `POST /api/Contact/AddContactGroup` | `autocall/danh-ba/add-contact-group.mdx` |
| 28 | `API kết nối Autocall Final.md` | 12. AddContactToGroup | `POST /api/Contact/AddContactToGroup` | `autocall/danh-ba/add-contact-to-group.mdx` |
| 29 | `API kết nối Autocall Final.md` | 13. GetContactGroupList | `POST /api/Contact/GetContactGroupList` | `autocall/danh-ba/get-contact-group-list.mdx` |
| 30 | `API kết nối Autocall Final.md` | 14. GetContactGroupDetailList | `POST /api/Contact/GetContactGroupDetailList` | `autocall/danh-ba/get-contact-group-detail-list.mdx` |
| 31 | `API kết nối Autocall Final.md` | 15. GetContactList | `POST /api/Contact/GetContactList` | `autocall/danh-ba/get-contact-list.mdx` |
| 32 | `API kết nối Autocall Final.md` | 16. DeleteContact | `POST /api/Contact/DeleteContact` | `autocall/danh-ba/delete-contact.mdx` |
| 33 | `API kết nối Autocall Final.md` | 17. DeleteContactFromGroup | `POST /api/Contact/DeleteContactFromGroup` | `autocall/danh-ba/delete-contact-from-group.mdx` |

---

## 6. Template Trang Endpoint Chuẩn & Quy cách Triển khai

Mọi trang endpoint trong `content/docs/ai-contact-center/api/**` bắt buộc tuân thủ cấu trúc sau:

````mdx
---
title: "Tạo máy nhánh"
description: "Tạo mới một máy nhánh (extension) trên tổng đài AI Contact Center."
---

<Callout type="info">`POST` `{BASE_URL}/api/CloudFone/AddExtension`</Callout>

Tạo mới một số nội bộ (extension) trên tổng đài để cấp cho nhân viên tư vấn hoặc tích hợp thiết bị SIP/Softphone.

## Tham số request

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả chi tiết |
| :-- | :-- | :-: | :-- |
| `ServiceCode` | string | Có | Mã dịch vụ tổng đài khi đăng ký tại ODS (ví dụ: `CF-BSXXXX`). |
| `AuthUser` | string | Có | Mã tài khoản định danh khách hàng (ví dụ: `ODSXXXX`). |
| `AuthKey` | string | Có | Khóa bí mật API do ODS cấp. |
| `Ext` | string | Có | Số máy nhánh cần tạo (tối đa 4 chữ số, ví dụ: `1997`). |
| `password` | string | Có | Mật khẩu máy nhánh (tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt). |
| `name` | string | Có | Tên hiển thị của máy nhánh (không dấu và không chứa ký tự đặc biệt). |

## Ví dụ request

<Tabs items={['cURL', 'JavaScript', 'Python']}>
  <Tab value="cURL">
```bash
curl -X POST "{BASE_URL}/api/CloudFone/AddExtension" \
  -H "Content-Type: application/json" \
  -d '{
    "AuthUser": "YOUR_AUTH_USER",
    "AuthKey": "YOUR_AUTH_KEY",
    "ServiceCode": "YOUR_SERVICE_CODE",
    "Ext": "1001",
    "password": "Password@123",
    "name": "NhanVien1"
  }'
```
  </Tab>
  <Tab value="JavaScript">
```javascript
const response = await fetch('{BASE_URL}/api/CloudFone/AddExtension', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    AuthUser: 'YOUR_AUTH_USER',
    AuthKey: 'YOUR_AUTH_KEY',
    ServiceCode: 'YOUR_SERVICE_CODE',
    Ext: '1001',
    password: 'Password@123',
    name: 'NhanVien1',
  }),
});
const data = await response.json();
console.log(data);
```
  </Tab>
  <Tab value="Python">
```python
import requests

payload = {
    "AuthUser": "YOUR_AUTH_USER",
    "AuthKey": "YOUR_AUTH_KEY",
    "ServiceCode": "YOUR_SERVICE_CODE",
    "Ext": "1001",
    "password": "Password@123",
    "name": "NhanVien1",
}
response = requests.post(
    "{BASE_URL}/api/CloudFone/AddExtension",
    json=payload,
    headers={"Content-Type": "application/json"},
    timeout=15,
)
print(response.json())
```
  </Tab>
</Tabs>

## Response mẫu

```json
{
  "result": "success",
  "message": "Thành công!"
}
```

| Trường | Kiểu dữ liệu | Mô tả |
| :-- | :-- | :-- |
| `result` | string | Trạng thái xử lý (`success` hoặc `failed`). |
| `message` | string | Thông báo kết quả chi tiết từ hệ thống tổng đài. |

## Lưu ý quan trọng
- Số máy nhánh phải nhỏ hơn 5 chữ số.
- Mật khẩu phải đáp ứng độ phức tạp tối thiểu 8 ký tự.

## Lỗi thường gặp

<Accordions>
  <Accordion title="Số máy nhánh đã tồn tại hoặc không hợp lệ">
    Kiểm tra danh sách số nội bộ hiện có trên Portal trước khi tạo mới.
  </Accordion>
  <Accordion title="Sai thông tin xác thực (AuthUser / AuthKey)">
    Kiểm tra lại `AuthUser` và `AuthKey` trong menu Cấu hình API trên trang quản trị tổng đài.
  </Accordion>
</Accordions>

## Bài viết liên quan

<Cards>
  <Card title="Xóa máy nhánh" href="/docs/ai-contact-center/api/tong-dai/may-nhanh/delete-extension" description="Thu hồi số nội bộ khi nhân viên nghỉ việc." />
  <Card title="Khởi tạo cuộc gọi Click-to-Call" href="/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call" description="Thực hiện cuộc gọi trực tiếp từ máy nhánh." />
</Cards>
````

---

## 7. Kế hoạch Triển khai theo Lô (Batches)

| Lô | Nội dung công việc | Deliverables | Trạng thái |
|:---:|---|---|:---:|
| **Lô 0** | Khởi tạo file task, nghiên cứu 5 tài liệu nguồn, phân tích mâu thuẫn, thiết kế IA, lập mapping table, tạo questions file và lập kế hoạch chi tiết. | `tasks/TASK-021-contact-center-api.md`, `.harness/reports/TASK-021-questions.md`, `.harness/reports/TASK-021-report.md`. | **HOÀN THÀNH** |
| **Lô 1** | Viết `api/index.mdx`, cụm `api/bat-dau/*` (Xác thực, Quy ước chung), toàn bộ các file `meta.json` và skeleton của tất cả các trang endpoint. | `api/index.mdx`, `api/bat-dau/**`, 13 file `meta.json`, skeleton đầy đủ 32 endpoint. | **HOÀN THÀNH** |
| **Lô 2** | Hoàn thiện nội dung chi tiết: `may-nhanh/**`, `cuoc-goi/**`, `danh-ba/**`, `luat-khach-quen.mdx`. | 6 trang endpoint tổng đài cơ bản hoàn thiện 100%. | **HOÀN THÀNH** |
| **Lô 3** | Hoàn thiện nội dung chi tiết phân hệ lịch sử cuộc gọi: `get-call-logs`, `get-call-history`, `get-call-history-v2`, `get-call-report`, `get-call-report-detail`. | 5 trang endpoint lịch sử & báo cáo đánh giá hoàn thiện 100%. | **HOÀN THÀNH** |
| **Lô 4** | Hoàn thiện phân hệ `webhook/popup.mdx` và phân hệ WebSocket RTC (`websocket-rtc/**`: index, ket-noi-webrtc, widget-odsphone). | 4 trang Webhook và WebRTC JsSIP/Widget hoàn thiện 100%. | **HOÀN THÀNH** |
| **Lô 5** | Hoàn thiện toàn bộ 18 endpoints của phân hệ `autocall/**`: Chiến dịch (7 trang), Âm thanh TTS (3 trang), Danh bạ & Nhóm (8 trang). | 19 trang Autocall (1 index + 18 endpoints) hoàn thiện 100%. | **HOÀN THÀNH** |
| **Lô 6** | Cập nhật câu trả lời từ Human (nếu có), bổ sung liên kết chéo với User Guide Portal `10-goi-tu-dong`, rà soát liên kết nội bộ, chạy toàn bộ chuỗi kiểm thử nghiệm thu `npm run verify:task`. | Toàn bộ tài liệu nhất quán, verify PASS. | Chưa bắt đầu |

---

## 8. Kết quả Kiểm tra Nghiệm thu Lô 0 & Lô 1

Đã thực thi chuỗi kiểm tra chất lượng cơ học trên branch `task/TASK-021-contact-center-api`:

- `npm run check:env`: **PASS** — Cấu hình môi trường hoàn toàn an toàn.
- `npm run check:links`: **PASS** — 100% liên kết MDX nội bộ hợp lệ, không có broken link nào.
- `npm run check:scope`: **PASS** — Tất cả tệp thay đổi nằm chính xác trong phạm vi allowlist của `TASK-021`.
- `npm run guard`: **PASS** — Ranh giới bảo mật, ranh giới internal/public, frontmatter và quy tắc kiểm soát đều đạt chuẩn.
- `npm run verify:code`: **PASS** (`types:check` + `check:env` + `check:links` + `guard`).
- `git diff --check`: **PASS** — Không có trailing whitespace hoặc lỗi định dạng.
- Secret scanner check: **PASS** — 100% không chứa UUID thật hay mã khách hàng thật nào trong mã nguồn.

---

## 9. Kết quả Nghiệm thu Lô 3 & Lô 4

### Lô 3: Phân hệ Lịch sử cuộc gọi (`tong-dai/lich-su-cuoc-goi/**`)
- `get-call-logs.mdx`: Đầy đủ toàn bộ các trường mở rộng `transfered`, `pickupExt`, `dialUExtAnswer`, `hotlineUExtAnswer`, `event`, bảng giải thích chi tiết trạng thái `Disposition` (gồm `ANSWERED_ELSEWHERE`), `TypeGet`, `TypeCall`, lưu ý và Accordions lỗi.
- `get-call-history.mdx`: Chi tiết các trường `disposition` (`ANSWERED`, `NO ANSWER`, `BUSY`, `FAILED`), phân trang `PageIndex`/`PageSize`, lưu ý format thời gian, Accordions lỗi.
- `get-call-history-v2.mdx`: Chi tiết trường `isSort`, so sánh điểm cải tiến so với V1, lưu ý và Accordions lỗi.
- `get-call-report.mdx`: Chi tiết các trường `blacklist`, `total`, lưu ý `ServiceCode`, bảng giải thích phím đánh giá 1-5 sao, Accordions lỗi.
- `get-call-report-detail.mdx`: Chi tiết 14 trường dữ liệu (`stt`, `calldate`, `clid`, `callerNumber`, `callerName`, `did`, `src`, `dst`, `duration`, `billsec`, `disposition`, `uniqueid`, `recordingfile`, `key_press`), lưu ý phân trang max 200, Accordions lỗi.

### Lô 4: Webhook & WebSocket RTC (`webhook/**` và `websocket-rtc/**`)
- `webhook/popup.mdx`: Bổ sung chi tiết trường `NumberPBX` (Inbound, Trunk, TRANSFERRED), trường `KeyRinging` (deprecated), vòng đời 5 sự kiện cuộc gọi (`register`, `show`, `answer`, `hide`, `finish`), code mẫu receiver Node.js/PHP, lưu ý xử lý bất đồng bộ tránh timeout và Accordions xử lý lỗi.
- `websocket-rtc/index.mdx`: So sánh chi tiết Softphone + API vs WebRTC trên trình duyệt, định hướng triển khai.
- `websocket-rtc/ket-noi-webrtc.mdx`: Hướng dẫn chi tiết thư viện JsSIP, khởi tạo UA, lắng nghe `incoming`, thực hiện `call`, kết nối âm thanh `track`, danh mục tài nguyên mã nguồn mở (JsSIP, SIP.js, Browser-Phone Asterisk, ctxSip).
- `websocket-rtc/widget-odsphone.mdx`: Kiến trúc nhúng Widget ODSPhone, các hàm điều khiển `makeCall`, `hangup`, `mute`, `hold`, ghi chú `[Q6]`.

---

## 10. Kết quả Nghiệm thu Lô 5: Phân hệ Autocall (`autocall/**`)

### Nhóm Chiến dịch (`autocall/chien-dich/**` - 7 endpoints)
- `start-campaign.mdx`: Tạo/cập nhật chiến dịch, mảng `Audios` (DTMF "s", "i"), `Keypress` rẽ nhánh IVR, `TimeStartCall` (mili-giây), `Trunk`, lưu ý quan trọng và Accordions lỗi.
- `get-campaign-list.mdx`: Bộ lọc `Status` (0: chờ, 1: chạy, 2: xong, 3: tất cả), phân trang, chi tiết trường trả về, lưu ý và Accordions lỗi.
- `get-list-action.mdx`: Tra cứu các hành động phím bấm khả dụng (`actionId`, `actionName`), hướng dẫn gán vào mảng `Keypress`.
- `delete-campaign.mdx`: Xóa chiến dịch theo `Id`, cảnh báo tính bất biến và trạng thái được phép xóa.
- `get-campaign-detail.mdx`: Tra cứu toàn bộ thông số cấu hình chiến dịch theo `Id`.
- `get-trunk-list.mdx`: Tra cứu danh sách các SIP Trunk gọi ra của khách hàng (`trunkName`, `phoneNumber`), hướng dẫn gán vào chiến dịch.
- `get-campaign-report.mdx`: Báo cáo kết quả cuộc gọi, phân loại `ReportType` (0-5: thành công, không bắt máy, bấm bận, chặn số, không kết nối), phân tích phím IVR khách hàng đã bấm.

### Nhóm Âm thanh TTS (`autocall/am-thanh/**` - 3 endpoints)
- `create-tts-audio.mdx`: Đầy đủ 4 nhà cung cấp TTS (Google, FPT, VBEE, VTCC Viettel) với bảng chi tiết 11 mã kiểu giọng `VoiceType`, hỗ trợ tải tệp âm thanh Base64 (`Type: "File"`), lưu ý chất lượng câu từ tiếng Việt và Accordions lỗi.
- `get-audio-list.mdx`: Tra cứu kho âm thanh, lấy `AudioId` để cấu hình cho chiến dịch, phân trang.
- `delete-audio.mdx`: Xóa tệp âm thanh, kiểm tra ràng buộc với chiến dịch đang chạy.

### Nhóm Danh bạ & Nhóm liên hệ (`autocall/danh-ba/**` - 8 endpoints)
- `add-contact.mdx`: Thêm khách hàng mới, chuẩn hóa định dạng số điện thoại viễn thông, trả về `ContactId`.
- `add-contact-group.mdx`: Tạo nhóm danh bạ, trả về `ContactGroupID` để gán vào `StartCampaign`.
- `add-contact-to-group.mdx`: Gán hàng loạt liên hệ vào nhóm danh bạ qua mảng `ContactId`.
- `get-contact-group-list.mdx`: Tra cứu danh sách nhóm danh bạ, số lượng số điện thoại trong từng nhóm.
- `get-contact-group-detail-list.mdx`: Tra cứu chi tiết từng số điện thoại bên trong nhóm, phân trang.
- `get-contact-list.mdx`: Tra cứu toàn bộ kho danh bạ khách hàng độc lập với nhóm.
- `delete-contact.mdx`: Xóa vĩnh viễn khách hàng khỏi toàn bộ hệ thống Autocall và gỡ khỏi mọi nhóm.
- `delete-contact-from-group.mdx`: Gỡ có chọn lọc khách hàng khỏi một nhóm cụ thể mà không làm mất dữ liệu gốc.

### Kiểm tra cơ học
- `npm run check:links`: **PASS**
- `npm run check:scope`: **PASS**
- `npm run guard`: **PASS**
- `npm run verify:code`: **PASS**
- `git diff --check`: **PASS** (Không có trailing whitespace).
- Quét Secret / UUID: **PASS** (100% sạch, an toàn).

---

## 11. Kết quả Nghiệm thu Lô 2: Phân hệ Tổng đài PBX (`tong-dai/**`)

### Nhóm Máy nhánh (`tong-dai/may-nhanh/**` - 2 endpoints)
- `add-extension.mdx`: Tạo máy nhánh tự động (`Ext`, `password`, `name`), kiểm tra ràng buộc độ dài số nội bộ < 5 chữ số, mật khẩu phức tạp 8 ký tự, tên không dấu và Accordions lỗi.
- `delete-extension.mdx`: Thu hồi số nội bộ (`Ext`), lưu ý ngắt kết nối SIP ngay lập tức nhưng vẫn bảo toàn lịch sử cuộc gọi trong CDR.

### Nhóm Khởi tạo cuộc gọi (`tong-dai/cuoc-goi/**` - 2 endpoints)
- `click-to-call.mdx`: Khởi tạo cuộc gọi Click-to-Call V1 hai chặng (gọi máy nhánh nhân viên trước, nhấc máy rồi mới quay số khách hàng), hỗ trợ `Prefix`, `PhoneName`, `KeySearch` GUID.
- `click-to-call-v2.mdx`: Khởi tạo cuộc gọi AutoCall V2 đảo hướng (gọi khách hàng trước, nhấc máy chuyển tiếp vào Inbound Route định trước), tham số `Ext` là tên Inbound Route, định dạng số gọi `<Trunk>/<Phone>`.

### Nhóm Danh bạ tổng đài & Định tuyến thông minh (2 endpoints)
- `danh-ba/add-phonebook.mdx`: Thêm mới và cập nhật liên hệ danh bạ tổng đài theo mã `id` (`idPhoneBook`), đồng bộ danh bạ màn hình CSKH.
- `luat-khach-quen.mdx`: Thiết lập luật khách quen (Sticky Agent) tự động ghi nhớ và ưu tiên đổ chuông về máy nhánh phụ trách, xử lý hàng loạt qua mảng `Items` (`Inbound`, `Extention`, `Phone`), 3 thao tác `insert`, `update`, `delete`.

### Kiểm tra cơ học
- `npm run check:links`: **PASS**
- `npm run check:scope`: **PASS**
- `npm run guard`: **PASS**
- `npm run verify:code`: **PASS**
- `git diff --check`: **PASS**
- Quét Secret / UUID: **PASS**

---

## 12. Bàn giao & Nghiệm thu Đợt Triển khai Ban đầu

### 12.1 Bằng chứng Pull Request & Merge Git

- **Pull Request**: [#21 (Task/task 021 contact center api)](https://github.com/longht2907/ods-docs/pull/21)
- **Branch**: `task/TASK-021-contact-center-api`
- **Head commit trên nhánh PR**: `489cd97784e4713dd32059847565d330e5b956fa` (short `489cd97`, commit nội dung trước đó `1b97429` và `e3e6109`)
- **Merge commit SHA trên `main`**: `67d8e6bc6cb96f4d71f3525a25c5931dd88c1770` (short `67d8e6b`)
- **Người merge**: `longht2907` vào lúc `2026-10-13T04:06:58Z`

### 12.2 Bằng chứng GitHub Actions CI

- **CI Check Run trên Merge commit (`67d8e6b`)**:
  - Run ID: `38344900353`
  - Job ID: `115123906020` (`verify`)
  - Trạng thái: `completed`, Kết luận: `success`
  - Thời gian: `2026-10-13T04:07:03Z` -> `2026-10-13T04:07:55Z`

### 12.3 Kết luận từ Human & Ranh giới Nghiệm thu

1. **Đóng đợt triển khai hiện tại**:
   - Human xác nhận chấp nhận đóng đợt triển khai ban đầu của TASK-021 (hoàn thành cấu trúc IA, skeleton 32 endpoints, chuyển đổi nội dung từ 5 tài liệu nguồn thô sang định dạng Fumadocs / Claude Docs style, không có broken link và không rò rỉ secret).
2. **CẢNH BÁO QUAN TRỌNG — KHÔNG COI API ĐÃ NGHIỆM THU TOÀN BỘ**:
   - Các finding review kỹ thuật chưa được kiểm chứng runtime do thiếu môi trường sandbox và phản hồi chính thức từ backend.
   - Toàn bộ 6 finding đã được chuyển thành tài liệu backlog độc lập tại [.harness/reports/TASK-021-follow-up.md](TASK-021-follow-up.md):
     1. Schema response và Action mapping Autocall thiếu bằng chứng.
     2. SDK Widget ODSPhone chưa xác minh.
     3. Webhook receiver fail-open khi thiếu env key.
     4. Listener peerconnection JsSIP outgoing gắn quá muộn.
     5. Timeout, mã lỗi, phân trang và side effects chưa xác nhận.
     6. Ví dụ code, layout Reference và alias route cũ cần hoàn thiện.
3. **Vòng đời task**:
   - Task được chuyển sang `status: done` trong `tasks/TASK-021-contact-center-api.md` để đóng hồ sơ đợt triển khai hiện tại, đồng thời chuyển giao backlog cho đợt tiếp theo.
