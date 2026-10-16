# Quy tắc lựa chọn và triển khai Sơ đồ (Diagram Rules)

Tài liệu hướng dẫn quyết định khi nào cần vẽ sơ đồ, chọn loại sơ đồ và chuẩn kỹ thuật triển khai trong tài liệu ODS Docs.

---

## 1. Nguyên tắc cốt lõi: Chỉ vẽ khi trả lời được câu hỏi kỹ thuật cụ thể

Sơ đồ trong tài liệu API chỉ có giá trị khi giúp lập trình viên hiểu ngay một vấn đề mà văn bản thuần túy khó diễn đạt:
- **Ai gọi ai trước?** (Thứ tự đổ chuông giữa Máy nhánh và Khách hàng).
- **HTTP Response trả về lúc nào so với sự kiện thoại thực tế?** (Tính chất Asynchronous của API).
- **Tài nguyên nào phụ thuộc tài nguyên nào?** (Cần tạo Nhóm danh bạ và File âm thanh trước khi bấm StartCampaign).
- **Ranh giới trách nhiệm giữa Frontend, Backend và Tổng đài?**

**Tuyệt đối không vẽ sơ đồ nếu:**
- Endpoint chỉ là tác vụ CRUD dữ liệu thông thường (`AddExtension`, `DeleteExtension`, `AddPhoneBook`, `DeleteAudio`).
- Endpoint chỉ là truy vấn danh sách (`GetAudioList`, `GetContactList`, `GetTrunkList`).
- Bắt buộc ghi: `Diagram: None` trong báo cáo nghiệm thu.

---

## 2. Bảng hướng dẫn chọn loại sơ đồ

| Loại sơ đồ | Khi nào sử dụng | Ví dụ áp dụng |
|:---|:---|:---|
| **Sequence Diagram (Tuần tự)** | Các quy trình có nhiều bên tương tác theo thời gian thực (Request ➔ Response ➔ Đổ chuông ➔ Nhấc máy ➔ Nối thoại). | `Click-to-Call V1`, `Click-to-Call V2`, `Webhook Popup`. |
| **Workflow Diagram (Luồng công việc)** | Quy trình chuẩn bị tài nguyên và các bước phụ thuộc liên tiếp trước khi thực thi. | `StartCampaign` (Tạo Danh bạ + Âm thanh ➔ Gán Trunk ➔ Khởi chạy). |
| **Architecture Diagram (Kiến trúc)** | Thể hiện các thành phần hệ thống, ranh giới an toàn mạng hoặc luồng tín hiệu song song (Signaling vs Media). | `api/index.mdx` (Tổng quan API), `ket-noi-webrtc.mdx` (SIP WSS vs SRTP). |
| **State Diagram (Trạng thái)** | Vòng đời trạng thái được xác nhận chính thức bởi nguồn ODS. | Vòng đời cuộc gọi trong Webhook (`Ringing` ➔ `Up` ➔ `Down`). |

---

## 3. Tiêu chuẩn kỹ thuật khi vẽ sơ đồ

1. **Công nghệ thực hiện**:
   - Sử dụng React Component vẽ SVG vector trực tiếp (kế thừa mô hình của `ClickToCallFlow`).
   - Tuyệt đối không cài thêm thư viện sơ đồ bên ngoài (Mermaid, PlantUML, Chart.js) vào `package.json`.
2. **Kích thước & Trải nghiệm Responsive**:
   - SVG phải có `viewBox` chuẩn (ví dụ `viewBox="0 0 560 420"`), sử dụng `className="w-full h-auto"` để tự động co giãn 100% theo cột nội dung.
   - Không đặt `min-w-[700px]` gây tràn ngang trang và xuất hiện thanh cuộn ngang khó chịu trên máy tính để bàn.
   - Text trong SVG kế thừa phông chữ hệ thống `font-sans` (`var(--font-sans, system-ui)`), đảm bảo hiển thị sắc nét trên cả màn hình Retina/High-DPI.
3. **Thẩm mỹ & Chế độ màu (Light/Dark Mode)**:
   - Sử dụng bảng màu tối giản, độ tương phản cao, chuyên nghiệp (Slate, Neutral) kết hợp các điểm nhấn chức năng (Xanh dương cho Request, Xanh lá cho Hoàn tất, Vàng cam cho Cảnh báo).
   - Mọi đường nét và hộp thoại phải tự động tương thích hoàn hảo cả **Light Mode** lẫn **Dark Mode** thông qua các biến màu của Fumadocs/Tailwind (`fill-fd-foreground`, `fill-fd-muted`, `stroke-fd-border`).
4. **Văn bản giải thích đi kèm**:
   - Dưới sơ đồ phải có tóm tắt 2–3 nguyên tắc cốt lõi (Key Takeaways) bằng văn bản để lập trình viên quét nhanh mà không bị phụ thuộc hoàn toàn vào hình vẽ.
