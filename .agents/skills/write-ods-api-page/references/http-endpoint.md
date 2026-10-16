# Quy chuẩn tài liệu HTTP Endpoint (REST API)

Tài liệu hướng dẫn cấu trúc và nguyên tắc viết cho các trang HTTP Endpoint trong ODS AI Contact Center.

---

## 1. Phân biệt 2 loại HTTP Endpoint

### Loại A: Endpoint có luồng nghiệp vụ phức tạp (Complex Workflow)
- **Ví dụ**: `Click-to-Call V1`, `Click-to-Call V2`, `StartCampaign`.
- **Đặc điểm**:
  - Không chỉ là lưu/đọc database mà kích hoạt các tác vụ nền, tương tác viễn thông thực tế (SIP, RTP, Trunk, IVR).
  - Phản hồi HTTP 200 thường mang tính **Bất đồng bộ (Asynchronous)**: Xác nhận đã nhận lệnh, cuộc gọi hoặc chiến dịch được thực thi ngầm sau đó.
- **Cấu trúc bắt buộc**:
  1. `<ApiEndpoint method="..." url="..." />`
  2. Đoạn mở đầu ngắn gọn: Nêu rõ API dùng để làm gì, trong trường hợp nào.
  3. `### Cách thức hoạt động`:
     - Giải thích thứ tự các sự kiện (ai gọi ai trước, điều kiện kích hoạt).
     - **Sơ đồ tuần tự (Sequence Diagram)** hoặc **Sơ đồ luồng (Workflow Diagram)** chuẩn kỹ thuật.
     - 3 nguyên tắc cốt lõi tóm tắt cho lập trình viên (Async, thứ tự chặng, cách theo dõi kết quả).
  4. Callout lưu ý nghiệp vụ quan trọng (nếu có).
  5. `## Tham số request`: Bảng tham số đầy đủ (Tên, Kiểu, Bắt buộc, Mặc định, Mô tả).
  6. `## Ý nghĩa phản hồi (Response)`: Giải thích các trường trong response và làm rõ: "Response 200 OK không đồng nghĩa cuộc gọi đã được khách nghe máy".
  7. Cột phải: Request code tabs (cURL, Node.js, Python) và Response JSON mẫu.

### Loại B: Endpoint CRUD hoặc Tra cứu đơn giản (Simple CRUD / Query)
- **Ví dụ**: `AddExtension`, `DeleteExtension`, `AddPhoneBook`, `GetAudioList`, `GetContactList`, `GetCallReport`.
- **Đặc điểm**:
  - Tác vụ ghi nhận, cập nhật hoặc truy vấn dữ liệu trực tiếp trong database.
  - Phản hồi đồng bộ ngay lập tức (Sync).
- **Cấu trúc tinh gọn**:
  1. `<ApiEndpoint method="..." url="..." />`
  2. Đoạn mở đầu: Mục đích của API và trường hợp sử dụng trong CRM/ERP.
  3. Điều kiện / Quyền hạn / Ràng buộc kỹ thuật (ví dụ: độ dài mật khẩu, ký tự cho phép, định dạng file).
  4. `## Tham số request`: Bảng tham số rõ ràng.
  5. `## Cấu trúc phản hồi`: Mô tả dữ liệu trả về trong mảng `data` hoặc thông điệp `message`.
  6. **Tuyệt đối KHÔNG vẽ sơ đồ**: Đánh dấu `Diagram: None`. Không vẽ sơ đồ chỉ để trang trí.

---

## 2. Quy chuẩn bảng tham số

| Tên cột | Căn lề | Mô tả |
|:---|:---:|:---|
| `Tham số` | Trái | Bọc trong dấu backtick: \`ServiceName\`. Giữ chính xác chữ hoa/thường theo nguồn. |
| `Kiểu dữ liệu` | Trái | string, number, boolean, array, object. |
| `Bắt buộc` | Giữa | **Có** (in đậm) hoặc **Không**. |
| `Mặc định` | Giữa | Giá trị mặc định nếu bỏ trống (ví dụ: `""`, `"0"`, hoặc `—` nếu không có). |
| `Mô tả chi tiết` | Trái | Ý nghĩa, định dạng, ví dụ cụ thể và lưu ý quan trọng. |

---

## 3. Quy chuẩn code mẫu cột phải

```mdx
<ApiReferenceCode>
  ## Ví dụ request

  <Tabs items={['cURL', 'Node.js', 'Python']} groupId="api-lang" persist>
    <Tab value="cURL">
```bash
curl -X POST "https://api.ods.vn/api/CloudFone/..." \
  -H "Content-Type: application/json" \
  -d '{
    "ServiceName": "YOUR_SERVICE_NAME",
    "AuthUser": "YOUR_AUTH_USER",
    "AuthKey": "YOUR_AUTH_KEY"
  }'
```
    </Tab>
    <Tab value="Node.js">
```javascript
// Node.js (Backend / Server-side)
const response = await fetch('https://api.ods.vn/api/CloudFone/...', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ServiceName: process.env.ODS_SERVICE_NAME,
    AuthUser: process.env.ODS_AUTH_USER,
    AuthKey: process.env.ODS_AUTH_KEY,
  }),
});
const data = await response.json();
console.log(data);
```
    </Tab>
    <Tab value="Python">
```python
import os
import requests

url = "https://api.ods.vn/api/CloudFone/..."
headers = {"Content-Type": "application/json"}
payload = {
    "ServiceName": os.getenv("ODS_SERVICE_NAME"),
    "AuthUser": os.getenv("ODS_AUTH_USER"),
    "AuthKey": os.getenv("ODS_AUTH_KEY"),
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```
    </Tab>
  </Tabs>

  ## Response mẫu (Ví dụ)

```json
{
  "result": "success",
  "message": "Thành công!",
  "data": []
}
```
</ApiReferenceCode>
```
