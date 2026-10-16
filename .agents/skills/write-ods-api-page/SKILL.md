---
name: write-ods-api-page
description: Viết hoặc hoàn thiện một trang API, Webhook, SDK/Widget hoặc WebRTC của ODS từ tài liệu nguồn local; dùng khi Human yêu cầu sửa một trang hoặc hoàn thiện nhóm trang API. Không dùng để tự thay UI toàn site.
---

# Write ODS API Page

Quy trình chuẩn hóa để viết hoặc hoàn thiện một trang tài liệu kỹ thuật API trong phân hệ ODS AI Contact Center (`content/docs/ai-contact-center/api/**`). Đảm bảo độ chính xác tuyệt đối theo tài liệu nguồn thực tế, giao diện 2 cột hiện đại và sơ đồ kỹ thuật (nếu có) trực quan, chuẩn xác cho lập trình viên.

---

## 1. Nguyên tắc cốt lõi (Evidence First — Không bịa tài liệu)

1. **Chỉ tin vào nguồn có căn cứ**:
   - Nguồn chính: `E:\Project\ods-api-source\` (các file `.md`, `.docx`).
   - Nguồn thứ cấp: Các câu trả lời đã chốt của Human trong `.harness/reports/TASK-021-questions.md`.
2. **Không bịa bất kỳ thông tin nào**:
   - **Cấm bịa**: Endpoint URL, method HTTP, tên trường payload, kiểu dữ liệu, bắt buộc/mặc định, schema response, mã lỗi, rate limit, token/key format, hoặc URL thư viện SDK CDN/NPM.
   - **Khi nguồn thiếu hoặc mâu thuẫn**: Viết đúng phần có nguồn; phần thiếu phải đánh dấu rõ `**Cần bổ sung:** [Mã câu hỏi]` hoặc đặt trạng thái **Blocked / Partial**. Không được tự sáng tác schema giả định thành đặc tả chính thức.
3. **Phân loại thông tin rõ ràng**:
   - `Source verified`: Thông tin lấy nguyên văn từ tài liệu nguồn ODS.
   - `Human confirmed`: Thông tin do Human chốt trong các biên bản hỏi đáp.
   - `Khuyến nghị triển khai`: Gợi ý kiến trúc/best practices cho lập trình viên (phải ghi rõ là gợi ý, tách biệt khỏi contract của tổng đài).
   - `Chưa xác minh`: Thông tin còn thiếu, cần xin ý kiến.
4. **Không chạy API ODS thật**: Tuyệt đối không gửi request thật để tạo cuộc gọi, trừ tiền cước hay xóa dữ liệu.

---

## 2. Quy trình 7 bước hoàn thiện một trang

```
1. Nhận trang & Tìm nguồn ➔ 2. Lập bằng chứng (Evidence) ➔ 3. Chọn loại bài & Template
➔ 4. Quyết định Sơ đồ ➔ 5. Viết MDX chuẩn UI ➔ 6. Kiểm tra kỹ thuật ➔ 7. Nghiệm thu & Báo cáo
```

### Bước 1: Nhận trang đích và tìm tài liệu nguồn
- Xác định đường dẫn trang: `content/docs/ai-contact-center/api/<nhom>/<ten-trang>.mdx`.
- Quét tìm từ khóa (endpoint path, action name, tên tiếng Việt) trong `E:\Project\ods-api-source\`:
  - API PBX: `API PBX ODS.md`, `API CloudFoneFINAL_update (1).md`
  - API Autocall: `API kết nối Autocall Final.md`, `HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG QUAY SỐ TỰ ĐỘNG.docx`
  - WebRTC & Widget: `PhanHoi_KhachHang_ODSPhone_Widget.md`, `Tích hợp tổng đài ảo Mắt Bão One với CRM.md`
  - Đối chiếu câu trả lời Human: `.harness/reports/TASK-021-questions.md`

### Bước 2: Lập bằng chứng & Xác thực tham số
- Liệt kê toàn bộ trường trong request và response từ file nguồn.
- Kiểm tra tính nhất quán: `ServiceName` hay `ServiceCode`? Bắt buộc hay tùy chọn? Format ngày tháng?
- Nếu trang thuộc nhóm SDK/Widget mà nguồn chỉ là câu hỏi hoặc thảo luận chưa có SDK code ➔ Đánh dấu **Blocked**, không tạo snippet giả.

### Bước 3: Phân loại bài viết
Đọc chi tiết trong `references/`:
- **HTTP endpoint có luồng nghiệp vụ** (Click-to-Call, StartCampaign): Đọc [references/http-endpoint.md](references/http-endpoint.md).
- **HTTP CRUD hoặc Tra cứu đơn giản** (AddExtension, DeleteCampaign, GetAudioList): Đọc [references/http-endpoint.md](references/http-endpoint.md).
- **Webhook** (Popup, Call Events): Đọc [references/webhook.md](references/webhook.md).
- **SDK/Widget/WebRTC**: Đọc [references/widget-webrtc.md](references/widget-webrtc.md).
- **Trang Tổng quan / Xác thực**: Giữ cấu trúc định hướng, không ép template endpoint.

### Bước 4: Quyết định Sơ đồ (Diagram Decision)
Đọc chi tiết trong [references/diagram-rules.md](references/diagram-rules.md):
- **Chỉ vẽ khi sơ đồ trả lời được câu hỏi kỹ thuật cụ thể**: Ai gọi ai trước? Luồng async trả về khi nào? Phụ thuộc tài nguyên ra sao?
- **CRUD / Tra cứu đơn giản**: Chọn `Diagram: None`. Tuyệt đối không vẽ sơ đồ trang trí vô ích.
- **Khi cần sơ đồ**: Chọn loại chuẩn (`Sequence`, `Workflow`, `Architecture`) và triển khai component SVG tinh gọn, responsive, không tràn ngang trang, hỗ trợ Dark/Light mode.

### Bước 5: Viết bài MDX theo chuẩn UI đã duyệt
- Áp dụng cấu trúc 2 cột `ApiReferenceLayout`:
  - Cột trái (`ApiReferenceMain`): `ApiEndpoint`, Giải thích mục đích, Sơ đồ (nếu có), Bảng tham số request.
  - Cột phải (`ApiReferenceCode`): Khối sticky chứa:
    - `## Ví dụ request`: Tabs `cURL`, `Node.js (Backend / Server-side)`, `Python` kèm `groupId="api-lang"` và `persist`.
    - `## Response mẫu (Ví dụ)`: JSON response mẫu thành công hoặc lỗi.
- Đảm bảo domain chuẩn đã chốt:
  - PBX: `https://api.ods.vn`
  - Autocall: `https://apiai.cloudfone.vn`

### Bước 6: Kiểm tra kỹ thuật tự động
Chạy chuỗi kiểm tra bắt buộc:
```bash
npm run check:scope   # Đảm bảo file sửa nằm trong scope task
npm run verify:code   # Typecheck + check env + broken links + guard
```
Nếu có component mới tạo, phải khai báo trong file task và đăng ký trong `src/components/mdx.tsx`.

### Bước 7: Báo cáo & Bàn giao
Ghi rõ trong báo cáo:
- File đã tạo/sửa.
- Nguồn tham chiếu (tên file, tiêu đề/heading trong nguồn).
- Loại bài & Quyết định sơ đồ (`Diagram: None / Sequence / Workflow / Architecture` kèm 1 câu lý do).
- Trạng thái: `Ready` (đủ nguồn), `Partial` (thiếu một số trường), hoặc `Blocked` (chưa có spec chính thức).
- Điểm nghi vấn / Câu hỏi cần Human giải đáp (nếu có).
