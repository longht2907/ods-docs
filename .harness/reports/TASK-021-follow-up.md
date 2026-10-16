# TASK-021 Follow-up — Backlog Kỹ thuật & Các Vấn đề Cần Xác minh (API Reference)

> **Mục đích**: Lưu trữ toàn bộ các phát hiện kỹ thuật (review findings), điểm thiếu bằng chứng thực tế và hạng mục hoàn thiện sau khi đóng đợt triển khai ban đầu của **TASK-021**.  
> **Lưu ý quan trọng**: Đợt triển khai hiện tại của TASK-021 đã đóng (PR #21 đã merge vào `main`), nhưng **KHÔNG coi API đã nghiệm thu toàn bộ**. Các nội dung trong tài liệu này là căn cứ để tạo task mới hoặc tiếp tục hoàn thiện trong các đợt phát triển tiếp theo.

---

## Danh mục Backlog Kỹ thuật

| STT | Hạng mục | Mức độ ưu tiên | Tệp / Phân hệ ảnh hưởng |
|:---:|---|:---:|---|
| **1** | Schema response và Action mapping Autocall thiếu bằng chứng | Cao | `content/docs/ai-contact-center/api/autocall/**` |
| **2** | SDK Widget ODSPhone chưa xác minh | Cao | `content/docs/ai-contact-center/api/websocket-rtc/widget-odsphone.mdx` |
| **3** | Webhook receiver fail-open khi thiếu env key | Cao (Bảo mật) | `content/docs/ai-contact-center/api/webhook/popup.mdx` |
| **4** | Listener peerconnection JsSIP outgoing gắn quá muộn | Trung bình | `content/docs/ai-contact-center/api/websocket-rtc/ket-noi-webrtc.mdx` |
| **5** | Timeout, mã lỗi, phân trang và side effects chưa xác nhận | Trung bình | `content/docs/ai-contact-center/api/bat-dau/quy-uoc-chung.mdx`, toàn bộ API |
| **6** | Ví dụ code, layout Reference và alias route cũ cần hoàn thiện | Thấp / UI/UX | `next.config.mjs`, toàn bộ API Reference |

---

## Chi tiết Từng Hạng mục

### 1. Schema response và Action mapping Autocall thiếu bằng chứng

- **Bối cảnh & Vấn đề**:
  - Trong tài liệu nguồn `API kết nối Autocall Final.md`, cấu hình IVR phím bấm cho chiến dịch (`StartCampaign`) chứa các phần tử mảng `Keypress` với mã hành động dạng số: `"Action": "5"`, `"Action": "6"`. Tuy nhiên, nguồn không cung cấp bảng ánh xạ (Action Mapping Table) chi tiết giải thích mỗi mã số tương ứng với hành vi IVR cụ thể nào (ví dụ: chuyển máy nhánh, phát tệp âm thanh ghi sẵn, ghi âm lời nhắn, kết thúc cuộc gọi).
  - Endpoint `GetListAction` (`get-list-action.mdx`) được mô tả là trả về danh sách các action khả dụng, nhưng chưa có bằng chứng log chạy thật trên môi trường sandbox hoặc production để kiểm chứng cấu trúc JSON trả về.
  - Cấu trúc response envelope và dữ liệu chi tiết của toàn bộ 18 endpoints Autocall mới dựa trên văn bản mô tả sơ lược trong tài liệu nguồn Word/Markdown, chưa có JSON schema chính thức từ backend.
- **Rủi ro**: Khách hàng hoặc lập trình viên tích hợp cấu hình sai giá trị `Action`, dẫn đến luồng IVR của chiến dịch gọi tự động không hoạt động đúng mong đợi.
- **Hành động cần xử lý**:
  - Yêu cầu team Autocall cung cấp schema response thực tế hoặc cấp tài khoản test API sandbox để gọi thử và trích xuất schema thật.
  - Xây dựng bảng tra cứu mã số `Action` chuẩn xác tại `start-campaign.mdx` và `get-list-action.mdx`.

---

### 2. SDK Widget ODSPhone chưa xác minh

- **Bối cảnh & Vấn đề**:
  - Trang `content/docs/ai-contact-center/api/websocket-rtc/widget-odsphone.mdx` mô tả việc nhúng softphone widget giao diện sẵn có vào ứng dụng CRM/ERP của bên thứ ba.
  - Hiện tại trong tài liệu nghiệp vụ gốc (`Tích hợp tổng đài ảo Mắt Bão One với CRM.md`), SDK này mới chỉ ở dạng ý tưởng/khái niệm kiến trúc. Chưa có URL script CDN thực tế (`https://...`), npm package chính thức (`@ods/odsphone-widget`), hay tài liệu API SDK chi tiết (các tùy chọn khởi tạo, cơ chế bảo mật token cho iframe/widget, các sự kiện callback `onReady`, `onCallStatusChange`).
- **Rủi ro**: Lập trình viên không thể nhúng widget theo tài liệu vì thiếu thư viện và script CDN thực thi được.
- **Hành động cần xử lý**:
  - Xác nhận với team phát triển xem ODS đã chính thức phát hành Widget ODSPhone ra môi trường public chưa.
  - Nếu đã có: bổ sung URL CDN chính thức, versioning, mã nhúng HTML mẫu và bảng tham số khởi tạo thật.
  - Nếu chưa có hoặc chỉ là định hướng tương lai: ghi chú rõ ràng đây là "Định hướng kiến trúc (Conceptual Guide)" hoặc tạm thời chuyển vào tài liệu nội bộ / ẩn khỏi navigation public.

---

### 3. Webhook receiver fail-open khi thiếu env key

- **Bối cảnh & Vấn đề**:
  - Trong ví dụ mã nguồn Node.js/PHP tại trang `content/docs/ai-contact-center/api/webhook/popup.mdx`, logic kiểm tra token bảo mật từ header (`X-API-Key`) có khả năng rơi vào trạng thái **fail-open**:
    ```javascript
    // Logic có nguy cơ fail-open nếu biến môi trường bị rỗng hoặc undefined:
    const expectedKey = process.env.POPUP_API_KEY;
    if (expectedKey && req.headers['x-api-key'] !== expectedKey) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Nếu expectedKey là undefined/empty -> request vượt qua xác thực!
    ```
  - Khi triển khai production, nếu quản trị viên vô tình quên cấu hình biến môi trường `POPUP_API_KEY`, webhook endpoint của khách hàng sẽ vô tình chấp nhận mọi request từ internet mà không có bất kỳ bước xác thực nào.
- **Rủi ro**: Lộ thông tin popup cuộc gọi hoặc bị tấn công giả mạo payload webhook (Spoofing) do receiver không ở trạng thái Fail-Closed.
- **Hành động cần xử lý**:
  - Cập nhật lại toàn bộ code mẫu (Node.js, PHP, Python) sang cơ chế **Fail-Closed**: nếu secret key chưa được cấu hình, server phải ném lỗi ngay khi khởi động hoặc từ chối phục vụ (HTTP 500 / 401), tuyệt đối không bỏ qua kiểm tra token.
  - Bổ sung Callout hướng dẫn khách hàng cấu hình firewall whitelist dải IP gửi webhook từ ODS PBX.

---

### 4. Listener peerconnection JsSIP outgoing gắn quá muộn

- **Bối cảnh & Vấn đề**:
  - Trong trang `content/docs/ai-contact-center/api/websocket-rtc/ket-noi-webrtc.mdx`, đoạn code mẫu gọi đi bằng JsSIP (`ua.call(...)`) đang gắn trực tiếp listener âm thanh lên `session.connection`:
    ```javascript
    const session = ua.call('0900000000', options);
    // Gắn trực tiếp lên session.connection:
    session.connection.addEventListener('track', (e) => { ... });
    ```
  - Trong vòng đời thực tế của JsSIP, tại thời điểm `ua.call()` vừa thực thi, `session.connection` (đối tượng `RTCPeerConnection` bên dưới) có thể chưa được khởi tạo (`undefined`) hoặc listener được gắn quá muộn sau khi track âm thanh đã được thương lượng xong.
- **Rủi ro**: Ứng dụng thoại WebRTC của khách hàng bị lỗi runtime (`Cannot read properties of undefined`) hoặc cuộc gọi kết nối thành công nhưng không có tiếng (mất audio stream).
- **Hành động cần xử lý**:
  - Viết lại code mẫu chuẩn hóa theo đúng event lifecycle của JsSIP:
    ```javascript
    session.on('peerconnection', (data) => {
      data.peerconnection.addEventListener('track', (e) => {
        const remoteAudio = document.getElementById('remoteAudio');
        remoteAudio.srcObject = e.streams[0];
      });
    });
    ```
  - Bổ sung hướng dẫn xử lý chính sách Autoplay Policy của trình duyệt hiện đại (yêu cầu thao tác người dùng trước khi play audio).

---

### 5. Timeout, mã lỗi, phân trang và side effects chưa xác nhận

- **Bối cảnh & Vấn đề**:
  - **Mã lỗi & Error Envelope**: Tài liệu nguồn chỉ có ví dụ thành công (`result: "success"`). Chưa có quy chuẩn rõ ràng khi có lỗi thì HTTP status code là gì (200 kèm body lỗi hay 4xx/5xx?), mã lỗi chi tiết (`errorCode`) gồm những giá trị nào.
  - **Timeout & Retry**:
    - Click-to-call: Thời gian đổ chuông tối đa trước khi timeout là bao nhiêu giây?
    - Webhook Popup: Timeout khi gửi sang hệ thống khách hàng là bao lâu (3s hay 5s)? Có cơ chế retry khi khách hàng trả HTTP 5xx hoặc mạng chập chờn không?
  - **Phân trang**:
    - Phân trang giữa các cụm API chưa đồng nhất: `GetCallHistory` dùng `PageIndex` (bắt đầu từ 0 hay 1?), trong khi Autocall có quy ước riêng. Giới hạn bản ghi tối đa trên một trang (`PageSize`) chưa có số liệu chính thức (200 hay 1000).
  - **Side Effects**:
    - Xóa máy nhánh (`DeleteExtension`) khi máy nhánh đang trong cuộc đàm thoại thì cuộc gọi có bị terminate ngay không?
    - Hủy chiến dịch (`DeleteCampaign`) khi chiến dịch đang ở trạng thái chạy (`Status: 1`) có được phép hay không?
- **Rủi ro**: Lập trình viên tích hợp không lường trước được các tình huống ngoại lệ, thiếu cơ chế xử lý lỗi và retry phù hợp trong hệ thống production.
- **Hành động cần xử lý**:
  - Phỏng vấn kỹ sư phụ trách backend PBX và Autocall để thu thập catalog mã lỗi chuẩn và các tham số timeout/pagination.
  - Bổ sung bảng mã lỗi chuẩn vào trang `api/bat-dau/quy-uoc-chung.mdx` và các trang endpoint liên quan.

---

### 6. Ví dụ code, layout Reference và alias route cũ cần hoàn thiện

- **Bối cảnh & Vấn đề**:
  - **Ví dụ code mẫu**: Một số endpoint còn thiếu ví dụ đa ngôn ngữ hoàn chỉnh (mới có cURL và JS cơ bản, thiếu Python hoặc PHP), chưa có đoạn code mẫu minh họa việc xử lý phân trang tuần tự hoặc xử lý lỗi mạng.
  - **Layout API Reference**: Hiện tại tài liệu API đang dùng layout tài liệu MDX chuẩn của Fumadocs (cuộn dọc). Để đạt đẳng cấp chuẩn mực như Claude Docs (`platform.claude.com/docs`) hoặc Stripe API Docs, cần cấu hình giao diện 2-3 cột (cột trái: cây danh mục & mô tả tham số; cột phải: playground mã nguồn và JSON response cố định theo màn hình).
  - **Alias Route cũ**: Trang `content/docs/ai-contact-center/api/tong-dai/khoi-tao-cuoc-goi.mdx` đã được gộp vào `cuoc-goi/click-to-call.mdx`. Nếu khách hàng hoặc tài liệu cũ truy cập đường dẫn `/docs/ai-contact-center/api/tong-dai/khoi-tao-cuoc-goi` sẽ gặp lỗi HTTP 404 Not Found.
- **Rủi ro**: Gãy liên kết từ các tài liệu tham khảo cũ bên ngoài; trải nghiệm đọc tài liệu API Reference chưa đạt mức tối ưu cao nhất.
- **Hành động cần xử lý**:
  - Bổ sung cấu hình redirect trong `next.config.mjs`:
    ```javascript
    async redirects() {
      return [
        {
          source: '/docs/ai-contact-center/api/tong-dai/khoi-tao-cuoc-goi',
          destination: '/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call',
          permanent: true,
        },
      ];
    }
    ```
  - Nâng cấp layout MDX component cho API Reference và bổ sung ví dụ code đầy đủ.
