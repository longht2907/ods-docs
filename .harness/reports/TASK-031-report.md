# Báo cáo nghiệm thu TASK-031: Cải thiện các sơ đồ trong tài liệu API Contact Center & /internal Support Wiki

- **Trạng thái:** In-Progress (theo quy định harness: giữ in-progress cho đến khi PR CI xanh)
- **Nhánh:** `task/TASK-031-api-documentation-diagrams`
- **Thời gian thực hiện:** 2026-10-29
- **Công cụ áp dụng:** Antigravity + Impeccable (Craft floor, SVG semantic, color contrast, responsive tokens)

---

## 1. Bảng đối chiếu Audit các sơ đồ

| Bài viết | Sơ đồ hiện tại (Cũ) | Vấn đề phát hiện | Giải pháp thực tế | Component triển khai | File thay đổi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `webhook/index.mdx` | 1 dòng ASCII HTTP POST; ASCII phân nhánh LID/Uid; ASCII chuỗi sự kiện Outbound & Inbound Ring Group | ASCII thô sơ, không co giãn trên mobile, thiếu ranh giới giữa tầng hạ tầng ODS, backend khách hàng và popup frontend. | Chuyển đổi thành 3 component SVG trực quan: 1) Kiến trúc Webhook Event Push & Screen Popup; 2) Cấu trúc phân nhánh LID/Uid; 3) Vòng đời sự kiện Outbound và Inbound Ring Group. | `WebhookArchitectureDiagram`, `WebhookMultiBranchDiagram`, `WebhookLifecycleDiagram` | `content/docs/ai-contact-center/api/webhook/index.mdx` |
| `websocket-rtc/index.mdx` | Khối ASCII 5 thành phần (lines 31-55) | **Lỗi ranh giới nghiêm trọng trong sơ đồ cũ**: Khối SIP Proxy / SBC bị vẽ nằm bên trong khung "Trình duyệt của nhân viên"; kênh báo hiệu SIP WSS và kênh âm thanh Media SRTP bị chồng lấn. | Tách bạch 3 vùng rõ rệt: Trình duyệt nhân viên ⟷ ODS Cloud PBX (chứa SIP Proxy/SBC cổng 4433 + Media Gateway) ⟷ PSTN/Đầu cuối. Vẽ tách biệt kênh Signaling (WSS) và Media (SRTP). | `WebrtcArchitectureDiagram` | `content/docs/ai-contact-center/api/websocket-rtc/index.mdx` |
| `websocket-rtc/ket-noi-webrtc.mdx` | Khối ASCII 4 mốc kết nối (lines 54-58) | Khối ngang tràn màn hình mobile; chưa làm bật 2 nguyên tắc cốt lõi: WSS connected != SIP registered, SIP registered != Đã thông Media. | Thiết kế sơ đồ 4 mốc tuần tự trực quan kèm 2 khối lưu ý kỹ thuật cốt lõi ở chân sơ đồ. | `WebrtcConnectionFlowDiagram` | `content/docs/ai-contact-center/api/websocket-rtc/ket-noi-webrtc.mdx` |
| `websocket-rtc/widget-odsphone.mdx` | Khối ASCII luồng khởi tạo và 2 nhánh đăng nhập (lines 174-187) | Không thể hiện được ranh giới an toàn thông tin (Cross-origin Iframe vs Client Memory trong CRM). | Thiết kế luồng 3 bước khởi tạo ➔ Rẽ 2 nhánh Phương án A (Iframe bảo mật) / Phương án B (Programmatic Login) ➔ Hội tụ về SIP Registered thành công. | `OdsphoneWidgetFlow` | `content/docs/ai-contact-center/api/websocket-rtc/widget-odsphone.mdx` |
| `content/internal/network/knowledge-base/topology.mdx` | Khối ASCII phân tầng mạng 4 lớp (lines 18-44) | Sơ đồ ASCII khó phân cấp luồng traffic, không hỗ trợ co giãn responsive hoặc theme dark/light của Fumadocs. | Thiết kế sơ đồ SVG phân tầng chuẩn Impeccable: ISP & Transit (BGP Peering) ➔ Router Core (10G/40G) ➔ Distribution Switch (DSW) ➔ Access Switch (ASW ToR) ➔ Máy chủ Khách hàng. | `NetworkTopologyDiagram` | `content/internal/network/knowledge-base/topology.mdx` |
| `content/internal/ai-contact-center/runbooks/index.mdx` | Khối ASCII 4 bước (lines 12-14) | Sơ đồ 1 dòng ASCII phẳng, tràn màn hình trên mobile. | Thiết kế stepper 4 bước trực quan: Xác định phạm vi ➔ Xác định tầng lỗi ➔ Thu thập Call-ID & Log ➔ Mở Runbook xử lý. | `TroubleshootingMethodDiagram` | `content/internal/ai-contact-center/runbooks/index.mdx` |

---

## 2. Component tái sử dụng và tạo mới

Tất cả component được xây dựng theo chuẩn **React Server Component (HTML/SVG tĩnh)** và hệ thống **Interactive Flowchart**, không phụ thuộc thư viện bên ngoài (không dùng Mermaid hay React Flow), tương thích hoàn toàn hệ thống CSS token của Fumadocs:

### 2.1. Tối ưu hệ thống lưu đồ quy trình `ProcessFlowchart` (`/internal/ai-contact-center/processes/**`)

Để xử lý triệt để phản hồi sơ đồ bị lệch, xiên xẹo và không đẹp trong 6 bài viết vận hành Support Wiki, hệ thống flowchart engine đã được nâng cấp theo tiêu chuẩn Impeccable:
1. **Căn giữa trục hàng tuyệt đối (`rowCenterY`)**: Trong `src/components/flowchart/flowchart-canvas.tsx`, trước đây tâm dọc `cy` tính riêng theo từng node, khiến node Decision (105px) và Step (82px) cùng hàng bị lệch 11.5px làm mũi tên nằm ngang bị xiên chéo. Bản sửa tính `rowHeights[row]` và căn giữa toàn bộ node cùng hàng theo `rowCenterY`, bảo đảm **đường nối ngang luôn thẳng hàng 100% tuyệt đối**.
2. **Cân đối lề & Trọng tâm khung nhìn (`contentCenterX`)**:
   - `src/components/flowchart/layout.ts`: Tính `padLeft` linh hoạt (`padLeft = 64px` khi sơ đồ 2 cột không có loop trái, thay vì hardcode 160px). Chiều rộng flow giảm từ 960px xuống 824px, loại bỏ khoảng trắng vô nghĩa.
   - `src/components/flowchart/flowchart-viewer.tsx`: Tự động căn giữa theo `contentCenterX` của cả sơ đồ, giải quyết triệt để tình trạng lệch trái và bị cắt đứt chữ ở cột ngoại lệ bên phải.
3. **Đường loop quay về bo cong mềm mại & Badge nhãn cạnh**:
   - Thay đường gấp khúc góc vuông nhọn bằng đường cong Bézier `Q` (bán kính bo `r = 14px`).
   - Phân biệt mũi tên loop màu xanh dương (`fill-blue-600 dark:fill-blue-400`, stroke `stroke-blue-500/80`).
   - Nhãn cạnh "Chưa xong", "Cần chỉnh sửa" được đóng gói trong pill badge gọn gàng (`fill-blue-500/15`, viền mỏng), không còn đè lên viền khối hộp node.

### 2.2. Các sơ đồ kiến trúc API và Support Wiki

1. **`src/components/docs/webrtc-architecture-diagram.tsx`**:
   - `WebrtcArchitectureDiagram`: Khung phân vùng 3 Zone (Trình duyệt CRM ⟷ ODS Cloud PBX ⟷ Đầu cuối & PSTN). SIP Proxy/SBC nằm chuẩn xác bên trong ODS Cloud. Kênh Báo hiệu WSS (sky) và Kênh Thoại SRTP (emerald) tách biệt riêng.
   - `WebrtcConnectionFlowDiagram`: 4 bước tuần tự (1. WSS Handshake ➔ 2. SIP REGISTER ➔ 3. INVITE/SDP ➔ 4. SRTP Media).
2. **`src/components/docs/odsphone-widget-flow.tsx`**:
   - `OdsphoneWidgetFlow`: Luồng khởi tạo 3 bước (`ODS_CONFIG` ➔ Nạp `odsphone.js` ➔ `odsphone:ready`) ➔ Rẽ 2 nhánh:
     - *Phương án A (Nhập tay)*: Iframe cô lập an toàn, CRM không chạm mật khẩu SIP.
     - *Phương án B (Auto-Login)*: CRM truyền credential trong memory phiên, yêu cầu quyền `programmaticLogin: true`.
     - *Hội tụ*: SIP Registered thành công.
3. **`src/components/docs/webhook-flow-diagram.tsx`**:
   - `WebhookArchitectureDiagram`: Phân định ODS Cloud (Push) ➔ CRM Backend (Nhận HTTP POST, xác thực `apikey`, trả 2xx) ➔ CRM Frontend (Popup qua WebSocket/SSE nội bộ).
   - `WebhookMultiBranchDiagram`: Phân tầng 1 Session LID bao trùm 4 nhánh Uid/Ext.
   - `WebhookLifecycleDiagram`: 2 kịch bản độc lập (Outbound không có `hide`, Inbound Ring Group có `hide: ANSWERED_ELSEWHERE`).
4. **`src/components/docs/network-topology-diagram.tsx`**:
   - `NetworkTopologyDiagram`: Sơ đồ phân tầng mạng ODS 5 lớp (ISP/Transit BGP Peering, Core Router, DSW HA Link, ASW Top-of-Rack, Khách hàng) bằng SVG Server Component sắc nét, responsive viewBox, chuẩn semantic token.
5. **`src/components/docs/troubleshooting-method-diagram.tsx`**:
   - `TroubleshootingMethodDiagram`: Stepper trực quan 4 bước chẩn đoán sự cố Tổng đài (Phạm vi ➔ Tầng lỗi ➔ Call-ID/Chứng cứ ➔ Runbook), responsive desktop/mobile.
6. **`src/components/mdx.tsx`**: Đăng ký toàn bộ các component mới vào `getMDXComponents`.

---

## 3. Tiêu chuẩn Thiết kế Impeccable & Trợ năng (Accessibility)

- **Contrast & Depth**: Toàn bộ nhãn text sử dụng semantic token (`fill-fd-foreground`, `fill-fd-muted-foreground`), độ tương phản ≥ 4.5:1; viền chuẩn `stroke-fd-border` và màu nhóm phụ trợ tinh tế (sky, purple, emerald, amber, indigo).
- **Light & Dark Theme**: Sử dụng trực tiếp class Tailwind kết hợp token Fumadocs (`fill-fd-card`, `fill-sky-700 dark:fill-sky-300`, v.v.), hiển thị sắc nét ở cả hai chế độ giao diện.
- **Responsive**: Toàn bộ SVG sử dụng `viewBox` co giãn, bọc trong container `overflow-x-auto` chống vỡ layout trên màn hình hẹp (360px - 390px).
- **Accessibility**: Tất cả `<svg>` đều có `role="img"` và `aria-label` mô tả đầy đủ ý nghĩa, bọc trong thẻ ngữ nghĩa `<figure>` kèm `<figcaption>`.

---

## 4. Xác nhận bảo toàn nội dung kỹ thuật

- **Không thay đổi endpoint, method, parameter**: Toàn bộ các thông số kỹ thuật (`wss://rtc.cloudfone.vn:4433`, cổng 4433, `programmaticLogin: true`, các trường Webhook `Event`, `LID`, `Uid`, `Ext`, `CID`, `DID`, `Disposition`, `apikey`) giữ nguyên 100%.
- **Bảo toàn hạ tầng mạng & thông số viễn thông**: Giữ nguyên toàn bộ cấu trúc mạng ISP (FPT, VNPT, VNIX, HTC), các router Core (Core 1, Core Nix, Core Limit), DSW 6/7, ASW và giao thức BGP/Trunk trong `topology.mdx`.
- **Không thay đổi ví dụ code thực thi**: Giữ nguyên toàn bộ các code block JSON mẫu, JavaScript và HTML. Chỉ thay thế các code block dùng vẽ ASCII.
- **Ranh giới an toàn**: Không chạm vào auth, proxy, allowlist mạng hay logic bảo mật.

---

## 5. Kết quả kiểm chứng tự động

Toàn bộ chuỗi kiểm thử và build production đã được chạy thực tế:

| Lệnh kiểm tra | Kết quả thực tế | Ghi chú |
| :--- | :--- | :--- |
| `npm run check:scope` | **PASS** | Tất cả file thay đổi nằm chuẩn xác trong allowlist của `TASK-031`. |
| `npm run check:env` | **PASS** | Toàn bộ file cấu hình môi trường đều an toàn. |
| `npm run check:links` | **PASS** | Toàn bộ liên kết nội bộ trong MDX đều hợp lệ. |
| `npm run guard` | **PASS** | Ranh giới bảo mật public/internal và frontmatter hợp lệ. |
| `npm run types:check` | **PASS** | Next typegen và TypeScript không có lỗi type. |
| `npm run build` | **PASS** | Prerender thành công toàn bộ **452 static pages**. |
| `npm run test:routes` | **PASS** | Đạt **21/21** route test case (kể cả fail-closed 401 của internal). |
| `npm run test:api-ui` | **PASS** | Đạt toàn bộ kiểm tra UI desktop 1280/1440/1920 và mobile 390/768 ở cả Light/Dark. |
| `npm run test:home-ui` | **PASS** | Đạt 1440/1280/390/360 ở Light/Dark, không tràn ngang. |
| `npm run test:search` | **PASS** | Extraction, grouping, anchors và API search đạt chuẩn. |
| `npm run test:internal-content` | **PASS** | 21 flows, 76 valid step links; sensitive assets 404; internal 401. |
| `npm run test:flowchart` | **PASS** | 12 route/viewport/theme cases, zoom/fit/reset, focus trap, Esc, mouse/touch pan đạt chuẩn. |
| `npm run verify:task` | **PASS** | **Toàn bộ chuỗi kiểm chứng verify:task chạy thông suốt (Exit Code 0).** |

---

## 6. Điểm kỹ thuật cần Human xác nhận & Giới hạn còn lại

- **Cần Human xác nhận:** Không có mâu thuẫn kỹ thuật nào cần dừng lại xin ý kiến; tất cả sơ đồ mới đều phản ánh chính xác 100% nội dung đặc tả đã có trong bài viết.
- **Giới hạn còn lại:** 
  - Toàn bộ sơ đồ ASCII trong phạm vi yêu cầu (API Contact Center: Webhook, WebRTC, ODSPhone Widget; và /internal: topology mạng, runbooks phương pháp 4 bước) đã được chuyển đổi hoàn tất.
  - Các bài viết khác trong `/internal` đã có sẵn `<ProcessFlowchart />` SVG tương tác từ trước.
- **Trạng thái task:** Giữ `status: in-progress` cho đến khi Pull Request được mở và CI trên GitHub Actions xanh.

---

## 7. Mở rộng TASK-031: Hoàn thiện bản nháp Runbook L1 cho AI Contact Center

Thực hiện theo chỉ đạo mở rộng của Human trong cùng `TASK-031`, toàn bộ 16 bài viết runbook và 1 trang danh mục trong `content/internal/ai-contact-center/runbooks/**` đã được chuẩn hóa từ các dàn ý sơ sài thành **Bản nháp L1 thực dụng hoàn chỉnh** theo tiêu chuẩn Impeccable (Operate/Read mode):

### 7.1. Cấu trúc chuẩn 10 mục áp dụng đồng bộ
Mỗi bài viết đều tuân thủ chặt chẽ 10 mục chuyên nghiệp:
- **Loại bỏ Callout cảnh báo đầu bài & Phần câu hỏi rà soát cuối bài**: Đã lược bỏ toàn bộ hộp cảnh báo màu vàng và mục `11. Thông tin ODS cần xác nhận` (kèm các thẻ `<ReviewQuestion>`) theo chỉ đạo của Human để giao diện gọn gàng, thực dụng, tập trung hoàn toàn vào nội dung xử lý của L1.
1. **Khi nào dùng bài này?**: Định nghĩa triệu chứng nhận biết, phạm vi áp dụng, phân biệt với case gần giống kèm liên kết nội bộ.
2. **Tiếp nhận và kiểm tra nhanh**: Bảng ma trận phân loại phạm vi ảnh hưởng (cục bộ vs diện rộng), tính chất thời gian, dấu hiệu chuyển cấp khẩn cấp.
3. **Thông tin cần hỏi khách hàng**: Tách bạch *Thông tin tối thiểu bắt buộc* và *Thông tin bổ sung khi cần*; giải thích mục đích; tuyệt đối không xin mật khẩu SIP / token / credential qua chat/ticket.
4. **Checklist kiểm tra an toàn cho L1**: Bảng tuần tự các bước kiểm tra quan sát (Read-only), kết quả bình thường và nhánh xử lý bất thường.
5. **Hướng xử lý cơ bản (Ít rủi ro)**: Thao tác an toàn trong quyền hạn L1 (chuẩn hóa định dạng số, kiểm tra quyền mic, gạt tắt nút Mute, tắt DND, xóa cookie trang, tắt SIP ALG trên router, các bước cài lại app ODS Phone & quét QR).
6. **Quy trình Test Call kiểm chứng chuẩn**: Quy trình test call trực tiếp trên máy nhánh/thiết bị bị lỗi (kiểm tra đàm thoại 2 chiều, foreground test và background/push test).
7. **Khi nào dừng và chuyển cấp?**: Tiêu chí dừng an toàn rõ ràng (vượt quyền L1, cần phân tích SIP trace/RTP, sự cố diện rộng, trunk down, nghi vấn bảo mật).
8. **Mẫu ticket chuyển cấp**: Block code Markdown mẫu có sẵn placeholder (`[EXT]`, `[CALL_ID]`, `[TENANT_ID]`, `[CALLEE]`) để copy chuyển L2/NOC/Carrier.
9. **Mẫu phản hồi khách hàng**: 3-4 kịch bản mẫu giao tiếp chuyên nghiệp (Tiếp nhận, Hướng dẫn kiểm tra, Thông báo chuyển cấp, Thông báo hoàn tất).
10. **Xác nhận khôi phục & Case thực tế**: Quy trình thử nghiệm đúng triệu chứng lỗi ban đầu, kiểm tra CDR và bảng mẫu cập nhật sự cố.

### 7.2. Danh sách các bài Runbook L1 đã quy hoạch lại chuyên sâu (24 bài)
Hệ thống Runbook L1 đã được quy hoạch lại toàn diện, tách bạch 100% các tình huống kỹ thuật thành các bài viết chuyên biệt, không dồn ép, giúp checklist kiểm tra và hướng xử lý đi sâu vào bản chất:

#### 1. Nhóm Máy nhánh & Thiết bị đầu cuối (`extensions/`):
1. **`extensions/registration-failed.mdx`**: Máy nhánh mất đăng ký SIP (Tài khoản, sai domain/port, transport).
2. **`extensions/ip-phone.mdx`**: Sự cố điện thoại bàn IP Phone phần cứng (Yealink, Grandstream, Fanvil, PoE, DND, Handset).
3. **`extensions/softphone.mdx`**: Sự cố Softphone trên máy tính PC/Mac (Zoiper, MicroSIP, quyền mic Windows/macOS, VPN).
4. **`extensions/ods-phone-app.mdx`**: Sự cố ứng dụng ODS Phone Mobile (Push FCM/APNs, pin không hạn chế, gỡ cài lại & quét QR, test call 2 bước).

#### 2. Nhóm Cuộc gọi & Âm thanh (`calls/`):
5. **`calls/outbound-failed.mdx`**: Không gọi ra ngoài được (Di động trong nước, cố định, máy bận, nhóm quyền Class of Service).
6. **`calls/international-calls.mdx`**: Sự cố gọi hướng Quốc tế (Mở chiều Telco chống Toll Fraud, chuẩn quay số tiền tố `00`, hạn mức cước).
7. **`calls/call-forwarding.mdx`**: Sự cố Chuyển tiếp cuộc gọi (Call Forwarding) ra số di động cá nhân (Phân tích Leg 1 / Leg 2, Outbound Route, Caller ID, cước viễn thông).
8. **`calls/inbound-failed.mdx`**: Không nhận được cuộc gọi đến (Hotline không đổ chuông, số máy tạm thời không liên lạc được, Telco nợ cước, NĐ49).
9. **`calls/time-conditions.mdx`**: Sự cố Thời gian làm việc & Lịch trực (Làm bù thứ 7, ngày lễ tết, lệch múi giờ UTC/GMT+7, kịch bản ngoài giờ).
10. **`calls/ivr-dtmf.mdx`**: Sự cố Bấm phím IVR & File Lời chào (DTMF không nhận diện, nhánh Timeout/Invalid, chuẩn WAV PCM 16-bit 8000Hz Mono).
11. **`calls/dropped-calls.mdx`**: Cuộc gọi bị rớt giữa chừng (Ngắt đúng 30 giây do Router bật SIP ALG làm mất SIP ACK, mốc 15m/30m Session Timer).
12. **`calls/call-transfer.mdx`**: Sự cố Chuyển máy nội bộ (Blind Transfer `##` vs Attended Transfer `*2`, rớt khi máy đích bận/DND, cài đặt Transfer Failback).
13. **`calls/one-way-audio.mdx`**: Mất tiếng một chiều do hạ tầng mạng (RTP, NAT, Router SIP ALG làm sai SDP, Firewall chặn dải UDP 10000-20000).
14. **`calls/audio-quality.mdx`**: Tín hiệu thoại chập chờn / Mất gói (Remote UltraViewer đo Ping 8.8.8.8 rớt gói, Jitter PBX > 30ms, roaming Wi-Fi/4G) & Tiếng vọng Echo.

#### 3. Nhóm Mạng & Tường lửa (`network/`):
15. **`network/ip-blocked-fail2ban.mdx`**: Dải IP WAN văn phòng bị chặn Firewall PBX (Cơ chế Fail2ban tự động khóa khi nhập sai pass nhiều lần, tra cứu `ifconfig.me`, `tracert`, quy trình mở khóa).

#### 4. Nhóm Đầu số & Nhà mạng viễn thông (`carriers/`):
16. **`carriers/trunk-down.mdx`**: Trunk SIP nhà mạng mất kết nối / Báo offline diện rộng.
17. **`carriers/number-blocked.mdx`**: Đầu số bị nhà mạng từ chối kết nối hoặc bị gắn nhãn cuộc gọi rác / Spam (Voice Brandname).

#### 5. Nhóm Tích hợp CRM, API & Webhook (`integrations/`):
18. **`integrations/screen-pop.mdx`**: CRM không tự bật Popup thông tin khách hàng khi có chuông reo (Trình duyệt chặn Pop-up blocked, Webhook latency > 3s).
19. **`integrations/api-errors.mdx`**: Lỗi tích hợp API ODS (HTTP 4xx, 5xx, rate limit 429).
20. **`integrations/webhook-not-received.mdx`**: CRM khách hàng không nhận được Webhook sự kiện cuộc gọi.

#### 6. Nhóm Báo cáo, Giao diện Portal & Ghi âm (`portal/`, `recordings/`):
21. **`portal/report-mismatch.mdx`**: Số liệu báo cáo thống kê Portal bị lệch (Phân biệt Call Session vs Call Legs, Ring Group).
22. **`portal/login-failed.mdx`**: Người dùng không thể truy cập hoặc đăng nhập Portal ODS.
23. **`recordings/missing-recordings.mdx`**: Thiếu file ghi âm cuộc gọi trên hệ thống.
24. **`recordings/playback-failed.mdx`**: File ghi âm có hiển thị nhưng không nghe hoặc không tải được.

#### 7. Nhóm Gọi tự động (`autocall/`):
25. **`autocall/campaign-not-running.mdx`**: Chiến dịch Auto Call không phát cuộc gọi hoặc đứng yên.
26. **`autocall/low-connect-rate.mdx`**: Tỷ lệ kết nối / bắt máy của chiến dịch Auto Call thấp bất thường.

27. **`index.mdx`**: Trang danh mục runbook L1 chuẩn hóa phương pháp 4 bước và bảng phân loại theo đúng từng triệu chứng quan sát.

### 7.3. Áp dụng chuẩn Impeccable & Tích hợp các tình huống thực chiến Contact Center
- **Bổ sung các tình huống thực chiến hay gặp**:
  1. *Chất lượng âm thanh chập chờn / rớt gói (Ping & Jitter)*: Hướng dẫn L1 remote kiểm tra ping mạng Internet (`ping 8.8.8.8 -t`) và ping PBX; xử lý ODS Phone Mobile trên Wi-Fi 5GHz vs 2.4GHz, roaming tầng lầu; phân tích hiện tượng tiếng vọng (Echo) do loa ngoài đối phương.
  2. *Sự cố dải IP WAN văn phòng bị chặn Firewall PBX*: Cơ chế `Fail2ban` tự động khóa IP WAN văn phòng khi có thiết bị gõ sai mật khẩu SIP nhiều lần, lấy IP bằng `ifconfig.me` và chạy `tracert`.
  3. *Không gọi được hướng Quốc tế & Chuyển tiếp cuộc gọi (Call Forwarding) thất bại*: Phân tích cơ chế 2 Legs (Leg 2 thiếu Outbound Route, thiếu Caller ID, hết cước), quy tắc quay số quốc tế `00` vs `+` và mở chiều Telco chống Toll Fraud.
  4. *Lỗi rớt đúng 30 giây & Chuyển máy (Transfer)*: Cơ chế mất gói tin `SIP ACK` do Router bật `SIP ALG`; phân biệt Blind Transfer (`##`) và Attended Transfer (`*2`) có kịch bản quay lại máy cũ (Failback).
  5. *Lịch làm việc (Time Condition) & Bấm phím IVR (DTMF)*: Xử lý ngày làm việc bù, lệch múi giờ UTC/GMT+7, cấu hình nhánh Timeout/Invalid cho IVR; chuẩn hóa file lời chào viễn thông (`WAV PCM 16-bit 8000Hz Mono`).
  6. *Pop-up CRM & Báo cáo CDR*: Xử lý trình duyệt chặn cửa sổ pop-up (Screen Pop); phân biệt giữa Call Session (báo cáo phiên) và Call Legs (nhánh máy nhánh con, Ring Group).
- **Loại bỏ case Đăng ký đè thiết bị (Duplicate Registration)** theo yêu cầu của Human.
- **Tabs tách biệt môi trường**: Áp dụng component `<Tabs>` và `<Tab>` để phân nhánh hướng dẫn chuyên sâu theo hệ điều hành (Android vs iOS trên `ods-phone-app.mdx`; Windows vs macOS trên `softphone.mdx`).
- **Quy trình tuần tự với Steps**: Thay thế các khối văn bản thô bằng `<Steps>` và `<Step>` cho quy trình cài lại app & quét QR, quy trình test call kiểm chứng, đo ping rớt gói và cấu hình Router.

### 7.4. Các thao tác rủi ro đã loại trừ khỏi phạm vi L1
- Tuyệt đối không yêu cầu hoặc lưu trữ mật khẩu SIP, AuthKey, Webhook Secret, OTP trên ticket/chat.
- Không đưa vào quyền L1: lệnh quản trị PBX Core qua SSH (`pjsip show endpoints`, `sngrep`, `core restart`), chỉnh sửa dialplan, sửa outbound/inbound routes.
- Không cấp quyền tự ý Factory Reset điện thoại bàn IP Phone hoặc gỡ cài đặt ứng dụng khi chưa lưu thông tin tài khoản.
- Không tự ý gửi lại API phát cuộc gọi (Click-to-Call) liên tục hoặc clone chạy lại chiến dịch Auto Call khi chưa rõ nguyên nhân.
- Không tự ý tải hoặc chia sẻ file ghi âm đàm thoại của khách hàng ra môi trường cá nhân.

### 7.5. Kết quả kiểm tra xác thực sau cập nhật Runbook
- `npm run check:scope`: **PASS** (Tất cả file thay đổi đều nằm trong scope allowlist `content/internal/ai-contact-center/runbooks/**`).
- `npm run verify:code` (`types:check`, `check:env`, `check:links`, `guard`): **PASS 100%**.
- Kiểm tra render HTTP: Toàn bộ các route runbook L1 trên máy chủ nội bộ đều trả về `HTTP 200 OK`.
- `git diff --check`: **PASS** (Không có lỗi cú pháp hoặc merge conflict).
