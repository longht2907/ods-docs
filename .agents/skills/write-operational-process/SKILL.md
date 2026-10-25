---
name: write-operational-process
description: Quy trình chuẩn để viết hoặc hoàn thiện bài Quy trình vận hành (Operational Process) cho Support Wiki ODS (/internal/**); hỗ trợ 2 mô hình linh hoạt (Mô hình Thực chiến tinh gọn cho Dịch vụ Tổng đài/Cloud và Mô hình Tuân thủ đầy đủ cho Data Center/Hạ tầng vật lý); tích hợp Lưu đồ ProcessFlowchart SVG tương tác, chống chồng chéo, type safety tuyệt đối.
---

# Write Operational Process Skill (ODS Support Wiki)

Kỹ năng chuẩn hóa dành cho AI Agent và Kỹ sư tài liệu khi viết hoặc hoàn thiện các bài **Quy trình vận hành (Operational Processes)** trên Support Wiki nội bộ (`content/internal/**/processes/**`).

Được đúc kết từ bài mẫu hạ tầng:
[`content/internal/data-center/processes/export-server.mdx`](file:///e:/Project/ods-docs/content/internal/data-center/processes/export-server.mdx)  
và bài mẫu thực chiến tổng đài:
[`content/internal/ai-contact-center/processes/deployments/cloudfone-4u.mdx`](file:///e:/Project/ods-docs/content/internal/ai-contact-center/processes/deployments/cloudfone-4u.mdx).

---

## 1. Phân loại 2 mô hình bài viết (Tailored Structures)

Tùy theo bản chất của dịch vụ, áp dụng đúng cấu trúc phù hợp nhằm tối ưu hóa trải nghiệm đọc cho kỹ sư Support:

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHÂN LOẠI MÔ HÌNH QUY TRÌNH VẬN HÀNH                                   │
├───────────────────────────────────┬────────────────────────────────────┤
│ Mô hình A: THỰC CHIẾN TINH GỌN   │ Mô hình B: TUÂN THỦ ĐẦY ĐỦ         │
│ (Actionable & Streamlined)        │ (Full Compliance Standard)         │
├───────────────────────────────────┼────────────────────────────────────┤
│ Áp dụng:                          │ Áp dụng:                           │
│ - Dịch vụ Tổng đài (CloudFone)    │ - Data Center (Colocation, Server) │
│ - AI Contact Center               │ - Hạ tầng mạng vật lý (NOC/Switch) │
│ - Software License                │ - Nhập/xuất kho thiết bị           │
│ - Dịch vụ Cloud / SaaS nội bộ     │ - Thủ tục an ninh phòng máy        │
├───────────────────────────────────┼────────────────────────────────────┤
│ Cấu trúc: 3 - 4 phần cốt lõi:    │ Cấu trúc: 7 phần chuẩn mực:        │
│ 1. Giới thiệu ngắn 1 câu          │ 1. Mục đích & Phạm vi áp dụng      │
│ 2. Lưu đồ quy trình (SVG)         │ 2. Điều kiện & Thông tin đầu vào   │
│ 3. Các bước triển khai chi tiết   │ 3. Checklist tổng thể              │
│    (Tích hợp thông số vào B1)     │ 4. Lưu đồ quyết định (SVG)         │
│ 4. Xử lý sự cố (Troubleshooting)  │ 5. Các bước thực hiện chi tiết     │
│                                   │ 6. Ngoại lệ & Điểm dừng an toàn    │
│                                   │ 7. Tài liệu liên quan              │
└───────────────────────────────────┴────────────────────────────────────┘
```

> [!TIP]
> **Nguyên tắc vàng**: Với dịch vụ tổng đài / cấu hình phần mềm, **tuyệt đối không đưa các mục hành chính rườm rà** (như Mục đích, Phạm vi, Checklist lặp lại) vào bài viết vì kỹ sư vận hành chỉ cần biết: **Cần thông số gì → Cấu hình ở đâu → Thao tác ra sao → Lỗi thì xử lý thế nào**.

---

## 2. Tiêu chuẩn viết nội dung & Giao diện (Content & UX Standards)

### 2.1. Quy tắc đặt Tiêu đề (`title`) và Sidebar Navigation
- Tên trên Sidebar của Fumadocs được lấy tự động từ `title` trong frontmatter của file MDX.
- **Không lặp lại tên của danh mục cha**:
  - ❌ *Không tốt*: Thư mục cha là `"Triển khai dịch vụ"` mà bài con đặt `title: "Quy trình triển khai dịch vụ CloudFone 4U (VoIP trường học)"` → Menu Sidebar bị quá dài, dễ rớt dòng xấu.
  - ✅ *Chuẩn*: Đặt `title: "CloudFone 4U (VoIP trường học)"` hoặc `title: "CloudFone 4U"`.
- **An toàn cú pháp YAML Frontmatter**:
  - Luôn viết trên **cùng 1 dòng**, khuyến khích bọc trong dấu nháy kép `"` nếu có dấu ngoặc hoặc ký tự đặc biệt:
    ```yaml
    ---
    title: "CloudFone 4U (VoIP trường học)"
    description: Hướng dẫn kỹ thuật triển khai giải pháp tổng đài CloudFone 4U trên hạ tầng CloudFone Share ODS.
    ---
    ```
  - **Cấm**: Bấm Enter ngắt dòng giữa chừng trong YAML frontmatter (gây lỗi Syntax Error ngay khi build).

### 2.2. Quy tắc ký hiệu và Code block (Anti-patterns)
- **Ký hiệu mũi tên chỉ luồng**:
  - ❌ **Cấm dùng ký hiệu LaTeX**: `$\rightarrow$` (Do MDX không có KaTeX plugin mặc định, nó sẽ hiển thị nguyên văn chuỗi lỗi hoặc văn bản thô).
  - ✅ **Bắt buộc dùng mũi tên Unicode**: `→` (hoặc `->`).
- **Code Block Highlighting**:
  - Không dùng các identifier lạ chưa được Shiki hỗ trợ như ````asterisk` (sẽ gây lỗi compile trang).
  - Với dialplan Asterisk hoặc config cấu hình: dùng ````ini`, ````bash`, hoặc ````text`.

---

## 3. Tiêu chuẩn Lưu đồ quy trình SVG (`ProcessFlowchart`)

Mọi bài quy trình đều tích hợp lưu đồ trực quan qua component `<ProcessFlowchart flowId="..." />`.

### 3.1. Các thông số lưới chuẩn (Tránh chồng chéo)
Đã được chuẩn hóa trong `src/components/flowchart/flowchart-canvas.tsx`:
- `COL_SPACING = 320`: Đảm bảo khoảng hở giữa 2 cột tối thiểu 116px (với node rộng 204px), đủ chỗ cho các nhãn cạnh nằm ngang.
- `ROW_SPACING = 135`: Khoảng hở giữa 2 hàng đạt 67px, đủ không gian cho mũi tên dọc và nhãn rẽ nhánh không bị dính vào viền node.
- **Lớp nền đục che đường kẻ (Bắt buộc)**:
  - Mọi hộp nhãn trên đường nối đều có lớp nền `fill-fd-background` 100% che hoàn toàn đường vẽ bên dưới. Tuyệt đối không dùng nền trong suốt làm đường kẻ đâm xuyên qua chữ.

### 3.2. Quy tắc rẽ nhánh & Vòng lặp (Loops)
- **Nhánh kiểm tra**:
  - `dec-validate` → Nhánh lỗi/thiếu rẽ sang phải `col: 1` (`label: 'Thiếu thông tin'`, `variant: 'no'`).
  - `dec-validate` → Nhánh hợp lệ đi thẳng xuống `row: 3, col: 0` (`label: 'Hợp lệ'`, `variant: 'yes'`).
- **Nhánh kiểm thử cuộc gọi / Nghiệm thu**:
  - Nhánh thành công: Đi thẳng xuống `end-deploy` (`label: 'Thành công'`, `variant: 'yes'`).
  - Nhánh lỗi: Rẽ sang phải `col: 1` (`label: 'Lỗi cuộc gọi'`, `variant: 'no'`).
  - Đường loop sửa lỗi: Đi từ node hiệu chỉnh kỹ thuật nối ngược lên tầng gần nhất (ví dụ Bước 5 Test lại) qua cổng `fromPort: 'top', toPort: 'right'`, tuyệt đối không chạy ngược xuyên qua 3-4 tầng khác làm rối sơ đồ.

---

## 4. Quy trình 5 bước xây dựng bài viết chuẩn

```
1. Khảo sát nghiệp vụ ➔ 2. Thiết kế Flowchart Data ➔ 3. Đăng ký Registry ➔ 4. Viết MDX ➔ 5. Verify & Test UI
```

### Bước 1: Khảo sát nguồn & Chọn mô hình
- Đọc tài liệu nguồn (DOCX, PDF, Ticket).
- Quyết định mô hình bài viết:
  - Nếu là dịch vụ phần mềm/tổng đài/voice/license → **Mô hình A (Thực chiến tinh gọn)**.
  - Nếu là thao tác phần cứng/DC/máy chủ/an ninh → **Mô hình B (Tuân thủ đầy đủ)**.

### Bước 2: Thiết kế dữ liệu Flowchart
- Mở file data tương ứng trong `src/components/flowchart/data/`:
  - `voice-flows.ts`: Dịch vụ Tổng đài, Voice, AI Contact Center.
  - `data-center-flows.ts`: Dịch vụ Server, DC, Colocation.
  - `network-flows.ts`: Mạng, IP, Switch, Leased Line, DDoS.
  - `license-flows.ts`: Phần mềm bản quyền (Plesk, cPanel, DirectAdmin).
- Khai báo các node theo tọa độ `row` (1, 2, 3...) và `col` (`0` ở giữa, `1` rẽ phải).

### Bước 3: Đăng ký Flowchart vào Registry
- Mở [`src/components/flowchart/index.tsx`](file:///e:/Project/ods-docs/src/components/flowchart/index.tsx).
- Import đối tượng flow và thêm vào `flowRegistry` với key định danh duy nhất (ví dụ: `'deploy-cloudfone-4u'`).

### Bước 4: Soạn bài MDX & Đăng ký Navigation
- Tạo file tại: `content/internal/<service>/processes/<ten-slug>.mdx`.
- Khai báo slug trong `content/internal/<service>/processes/meta.json` để hiển thị trên sidebar.
- Chèn component `<ProcessFlowchart flowId="<flow-id>" />`.
- Đưa hình ảnh minh họa thực tế vào `public/media/<service>/...` và chèn vào bài viết.

### Bước 5: Kiểm chứng chất lượng
Chạy toàn bộ chuỗi kiểm tra tự động trước khi nghiệm thu:
```bash
npm run types:check   # Kiểm tra type TypeScript
npm run check:links   # Kiểm tra liên kết MDX không bị gãy
npm run guard         # Kiểm tra an toàn bảo mật, secret, frontmatter
npm run verify:code   # Chạy toàn bộ chuỗi kiểm chứng
```
Sau đó kiểm tra trực quan giao diện bài viết trên trình duyệt (`http://localhost:3000/internal/...`).

---

## 5. Tài liệu tham khảo bổ trợ

Trong thư mục `references/` của skill này:
- [Template mẫu chuẩn MDX (2 Mô hình)](references/template-process.mdx): Bản mẫu chi tiết cho cả Mô hình Thực chiến và Mô hình Hạ tầng.
- [Hướng dẫn thiết kế Flowchart](references/flowchart-guide.md): Cú pháp ma trận tọa độ, định dạng edge và cách tạo loop chuẩn.
- [Checklist nghiệm thu bài viết](references/checklist-guardrails.md): Bảng kiểm tra trước khi bàn giao cho Human.
