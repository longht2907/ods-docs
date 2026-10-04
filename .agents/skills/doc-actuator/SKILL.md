---
name: doc-actuator
description: Technical Writer & UI Actuator chuyên nghiệp chuẩn hóa quy trình biên soạn tài liệu kỹ thuật MDX cho ODS AI Contact Center.
---

# Doc-Actuator: Quy Trình Chuẩn Hóa Viết Tài Liệu Kỹ Thuật (Docs-as-Code)

`doc-actuator` là bộ quy chuẩn vận hành dành cho Technical Writer và UI Actuator nhằm chuẩn hóa quy trình khảo sát thực tế trên giao diện, thu thập tài nguyên hình ảnh và viết tài liệu MDX chất lượng cao cho hệ thống **ODS AI Contact Center**.

---

## 1. Nguyên Tắc Cốt Lõi (Core Principles)

1. **Thực chứng từ giao diện (UI Truth First):** Không đoán mò giao diện hay các trường cấu hình. Luôn khảo sát trực tiếp qua trình duyệt/portal trước khi viết.
2. **Scope Control (Đúng phạm vi):** Mỗi lượt xử lý chỉ thao tác và chỉnh sửa **duy nhất 1 file target** được chỉ định. Không refactor lan sang các file khác.
3. **Docs-as-Code & Type-Safe:** Mọi tài liệu MDX phải tuân thủ chuẩn Fumadocs, không gãy liên kết, không lỗi cú pháp React/MDX.
4. **Zero-Broken Policy:** Mọi thay đổi bài viết phải vượt qua lệnh `npm run verify:code` trước khi kết thúc.

---

## 2. Quy Chuẩn Tương Tác Browser (UI Actuation & Screenshot)

Khi cần chụp ảnh hoặc khảo sát giao diện chức năng:

1. **Điều hướng chính xác:** Sử dụng Browser Subagent điều hướng đến đúng module cần viết tài liệu (ví dụ: trên Portal `https://app.ods.vn` hoặc môi trường dev).
2. **Khảo sát cấu trúc trang:** Quét và phân tích toàn bộ các thành phần UI:
   - Các trường Form (Input, Select dropdown, Switch, Checkbox, Radio, Textarea).
   - Modal popup, Drawer, Tabs điều hướng.
   - Bảng dữ liệu (Data Table), các cột thông tin, nút hành động (Actions, Filter, Export).
3. **Quy ước lưu trữ & Đặt tên ảnh:**
   - **Thư mục lưu trữ:** `content/docs/assets/images/{module_slug}/` (hoặc `public/media/...` tương ứng theo cấu hình dự án).
   - **Quy tắc đặt tên file:** `{file_slug}_{action}.png`
     - Ví dụ: `cai-dat-may-nhanh_tao-moi.png`, `dinh-tuyen-cuoc-goi_cau-hinh-ivr.png`, `chien-dich-znc_thiet-lap-mau.png`.
   - **Quy cách ảnh:** Chụp rõ ràng vùng thao tác chính, tránh chụp thừa khoảng trắng không cần thiết.

---

## 3. Quy Chuẩn Định Dạng Nội Dung MDX (Content Architecture)

Mọi file tài liệu `.mdx` phải tuân thủ nghiêm ngặt cấu trúc 4 phần chuẩn mực:

### A. Frontmatter (Bắt buộc)
Giữ nguyên hoặc khai báo đầy đủ frontmatter tiêu chuẩn:
```markdown
---
title: "Tiêu đề bài viết rõ ràng, đúng thuật ngữ"
description: "Tóm tắt ngắn gọn mục đích và nội dung bài viết trong 1-2 câu."
---
```

### B. Bố Cục 4 Phần Chuẩn (Standard 4-Section Layout)

```markdown
Đoạn mở đầu giới thiệu ngắn gọn tính năng/module và giá trị mang lại cho doanh nghiệp.

---

## 1. Tổng quan & Điều kiện tiên quyết

- **Mục đích sử dụng:** Diễn giải ngắn gọn mục tiêu của chức năng.
- **Đối tượng áp dụng:** Administrator, Team Lead, hoặc Agent/Operator.
- **Điều kiện tiên quyết (Prerequisites):**
  - Đã có tài khoản phân quyền quản trị tương ứng.
  - Các tài nguyên cần chuẩn bị trước (Đầu số Hotline, file âm thanh IVR, tài khoản Zalo OA, v.v.).

---

## 2. Bảng thông số cấu hình chi tiết

Bảng tra cứu toàn bộ các trường dữ liệu và tùy chọn cấu hình trên giao diện:

| Tên trường (Field) | Loại trường | Bắt buộc | Diễn giải & Giá trị mặc định |
| :--- | :--- | :---: | :--- |
| **Tên máy nhánh** | Text | Có | Định danh người dùng hoặc phòng ban (VD: `101 - CSKH`). |
| **Mật khẩu SIP** | Password | Có | Mật khẩu xác thực cho Softphone/IP Phone. Tối thiểu 8 ký tự. |
| **Nhóm gọi (Ring Group)** | Dropdown | Không | Chọn nhóm tiếp nhận cuộc gọi tương ứng. |
| **Ghi âm cuộc gọi** | Toggle switch | Tùy chọn | Bật/tắt tự động ghi âm cuộc gọi vào/ra (Mặc định: `Bật`). |

---

## 3. Hướng dẫn thao tác từng bước

Sử dụng component `<Steps>` và `<Step>` kết hợp tiêu đề `###` (H3) để mục lục *On this page* hiển thị đường nhánh cây SVG chuẩn Fumadocs:

<Steps>
  <Step>
    ### Truy cập chức năng

    Từ thanh điều hướng bên trái của Portal, chọn **Cấu hình tổng đài** > **Máy nhánh nội bộ**.

    ![Giao diện danh sách máy nhánh](/media/path/to/cai-dat-may-nhanh_danh-sach.png)
  </Step>

  <Step>
    ### Khởi tạo cấu hình mới

    Nhấn nút **+ Tạo mới** ở góc phải màn hình để mở hộp thoại thiết lập.

    ![Hộp thoại tạo máy nhánh](/media/path/to/cai-dat-may-nhanh_tao-moi.png)
  </Step>

  <Step>
    ### Điền thông số & Lưu cấu hình

    1. Nhập đầy đủ các thông tin theo bảng thông số cấu hình ở Phần 2.
    2. Kiểm tra lại thông số và nhấn **Lưu thay đổi** để hoàn tất.
  </Step>
</Steps>

---

## 4. Lưu ý & Xử lý sự cố (Troubleshooting)

### Lưu ý quan trọng

<Callout type="warn">
  **Cảnh báo bảo mật:** Không sử dụng mật khẩu mặc định hoặc mật khẩu đơn giản cho tài khoản SIP. Luôn đổi mật khẩu định kỳ để phòng chống cước phát sinh bất thường.
</Callout>

### Sự cố thường gặp & Khắc phục

- **Lỗi không đăng ký được máy nhánh (SIP Register Failed):**
  - *Nguyên nhân:* Sai địa chỉ SIP Server, sai Port hoặc thông tin SIP Password không khớp.
  - *Khắc phục:* Kiểm tra lại địa chỉ IP/Domain của tổng đài và cập nhật lại mật khẩu trên ứng dụng Softphone.
- **Không nghe thấy âm thanh 2 chiều (One-way Audio):**
  - *Nguyên nhân:* Do chặn cổng NAT hoặc Firewall tại mạng nội bộ.
  - *Khắc phục:* Bật tính năng STUN/ICE hoặc kiểm tra mở dải port RTP trên Router mạng.
```

---

## 4. Quy Chuẩn Kỹ Thuật Fumadocs & Phân Cấp Tiêu Đề

1. **Phân cấp Heading (On this page TOC):**
   - Dùng `##` (H2) cho 4 phần mục chính.
   - Dùng `###` (H3) cho các bước trong `<Step>` hoặc các tiểu mục con để TOC Clerk uốn cong đường nét SVG.
2. **Sử dụng MDX Components:**
   - `<Steps>` và `<Step>`: Dành cho luồng thao tác tuần tự.
   - `<Cards>` và `<Card title="..." icon="...">`: Dành cho danh sách tính năng, gói dịch vụ, phân loại.
   - `<Callout type="info|warn|error">`: Dành cho ghi chú quan trọng hoặc cảnh báo sự cố.
3. **Liên kết nội bộ (Internal Links):**
   - Chỉ link đến các trang MDX thực sự tồn tại.
   - Không link đến các thư mục không có trang `index.mdx`.
   - Không link từ vùng Public (`/docs/`) sang vùng Internal (`/internal/`).

---

## 5. Quy Trình Kiểm Thử Bắt Buộc (Validation Workflow)

Trước khi xác nhận hoàn tất bài viết, bắt buộc thực hiện theo đúng chuỗi lệnh:

```bash
# 1. Kiểm tra toàn bộ TypeScript, Broken Links, Env Guard và Security Guard
npm run verify:code
```

- **Nếu lệnh trả về lỗi (FAIL):** Phải đọc rõ nguyên nhân (lỗi cú pháp MDX, sai đường dẫn ảnh, liên kết gãy hoặc sai Frontmatter) và sửa dứt điểm ngay tại file target.
- **Chỉ công bố hoàn thành** khi `npm run verify:code` báo **PASS 100%**.
