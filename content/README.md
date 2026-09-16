---
title: "Quy chuẩn Cấu trúc Nội dung Tài liệu (content/)"
description: "Tài liệu hướng dẫn quy tắc tổ chức thư mục, đặt tên, cấu hình điều hướng và quy trình thêm giải pháp mới vào ODS Docs."
---

# Quy chuẩn Cấu trúc Nội dung Tài liệu (content/)

Tài liệu hướng dẫn quy tắc tổ chức thư mục, đặt tên, cấu hình điều hướng và quy trình thêm giải pháp mới vào nền tảng ODS Documentation.

---

## 1. Cấu trúc 3 tầng và Lý do Danh mục Phẳng

Hệ thống tài liệu công khai (`/docs`) áp dụng cấu trúc **danh mục phẳng (Flat Catalog)**:

```text
content/docs/
├── meta.json                      # Cấu hình thứ tự và nhóm hiển thị
├── index.mdx                      # Trang chủ Docs (lưới chọn giải pháp)
├── bat-dau/                       # Tài liệu hướng dẫn chung và nhập môn
├── ai-contact-center/             # [Giải pháp] Thư mục ngang hàng ngay dưới content/docs/
│   ├── meta.json                  # "root": true (kích hoạt sidebar tab riêng)
│   ├── index.mdx                  # Trang Overview của giải pháp
│   ├── huong-dan/                 # Thư mục hướng dẫn thao tác
│   ├── api/                       # Thư mục tài liệu API
│   └── xu-ly-su-co/               # Thư mục xử lý sự cố
├── cloudfile/                     # [Giải pháp] Thư mục ngang hàng
└── tham-chieu-chung/              # Thuật ngữ, SLA, FAQ dùng chung
```

### Tại sao bắt buộc dùng danh mục phẳng?
1. **URL tinh gọn, cố định và thân thiện SEO**: Mọi tài nguyên thuộc giải pháp đều có dạng URL chuẩn hóa:
   `/docs/<ten-giai-phap>/huong-dan/<ten-bai>`
2. **Không phụ thuộc vào phòng ban hay cấu trúc kinh doanh**: Danh mục kinh doanh (SaaS, IaaS, Managed Services) có thể thay đổi hoặc tái cấu trúc, nhưng URL kỹ thuật của sản phẩm phải luôn bất biến để không làm gãy liên kết (broken links) của khách hàng và đối tác tích hợp.
3. **Phân nhóm chỉ diễn ra ở tầng hiển thị**: Việc chia nhóm sản phẩm được giải quyết hoàn toàn bằng dòng phân cách trong `meta.json`, không tạo các tầng thư mục trung gian (như `software/`, `infrastructure/`).

---

## 2. Quy tắc Đặt tên

| Đối tượng | Quy tắc định dạng | Ví dụ chuẩn | Sai quy cách |
| :--- | :--- | :--- | :--- |
| **Thư mục giải pháp** | Tên thương mại tiếng Anh, chữ thường, gạch ngang, không số phiên bản | `ai-contact-center`, `cloudfile`, `private-cloud` | `AI-ContactCenter`, `giai-phap-tong-dai`, `cloudfile-v2` |
| **Thư mục loại tài liệu** | Tiếng Việt không dấu, chữ thường, gạch ngang. Riêng `api` giữ nguyên | `huong-dan`, `xu-ly-su-co`, `api` | `HuongDan`, `troubleshooting`, `huong_dan` |
| **Tên tệp bài viết** | Tiếng Việt không dấu, chữ thường, gạch ngang | `bat-dau-nhanh.mdx`, `tao-chien-dich.mdx` | `BatDauNhanh.mdx`, `bắt-đầu-nhanh.mdx` |
| **Frontmatter title** | Tiếng Việt CÓ DẤU đầy đủ, chuẩn ngữ pháp | `title: "Khởi tạo chiến dịch gọi tự động"` | `title: "Khoi tao chien dich"` |
| **Frontmatter description**| Tóm tắt súc tích trong 1-2 câu, bắt buộc có | `description: "Hướng dẫn các bước..."` | Để trống hoặc thiếu trường `description` |

---

## 3. Cách Dùng meta.json và Dòng Phân Cách

Fumadocs hỗ trợ phân nhóm hiển thị trên sidebar mà không cần tạo thư mục lồng nhau thông qua cú pháp dòng phân cách trong mảng `pages`:

- `---`: Dòng kẻ chia phần rỗng (divider).
- `---Tên nhóm---`: Tiêu đề nhóm hiển thị trên thanh điều hướng.

Ví dụ trong `content/docs/meta.json`:

```json
{
  "title": "Tài liệu ODS",
  "pages": [
    "index",
    "bat-dau",
    "---Giải pháp phần mềm---",
    "ai-contact-center",
    "cloudfile",
    "---Tham chiếu---",
    "tham-chieu-chung"
  ]
}
```

Đối với từng giải pháp cụ thể (ví dụ `content/docs/ai-contact-center/meta.json`), cấu hình `"root": true` bắt buộc phải có để Fumadocs cô lập cây sidebar riêng và kích hoạt dropdown chuyển đổi giải pháp:

```json
{
  "title": "AI Contact Center",
  "root": true,
  "pages": [
    "index",
    "huong-dan",
    "api",
    "xu-ly-su-co"
  ]
}
```

---

## 4. Ba Bước Thêm Giải Pháp Mới

Khi ODS ra mắt một giải pháp mới, thực hiện đúng 3 bước chuẩn hóa sau:

### Bước 1: Sao chép bộ xương mẫu
Sao chép toàn bộ thư mục `content/_templates/GIAI-PHAP/` sang `content/docs/<ten-giai-phap>/`.
Ví dụ giải pháp Private Cloud:
```bash
cp -r content/_templates/GIAI-PHAP content/docs/private-cloud
```

### Bước 2: Cập nhật thông tin nhận diện
1. Mở `content/docs/<ten-giai-phap>/meta.json`: đổi `"title"` thành tên hiển thị của giải pháp (ví dụ: `"Private Cloud"`).
2. Cập nhật `title` và `description` trong file `index.mdx` và các file con tương ứng.

### Bước 3: Khai báo vào meta.json chung
Mở `content/docs/meta.json` và thêm tên thư mục giải pháp vào dưới nhóm phân cách thích hợp:
```json
"---Giải pháp hạ tầng---",
"private-cloud"
```

---

## 5. Hướng dẫn Lựa chọn Khuôn Mẫu (Templates)

Các khuôn mẫu đặt sẵn tại `content/_templates/` giúp đảm bảo trải nghiệm đọc đồng nhất:

1. **`OVERVIEW.mdx`** (Trang tổng quan):
   - **Khi nào dùng**: Đặt tại `index.mdx` ở gốc của mỗi giải pháp.
   - **Bố cục chuẩn**: Đoạn giới thiệu 2-3 câu $\rightarrow$ Lưới thẻ tác vụ thường làm (`<Cards>`) $\rightarrow$ Liên kết đến bài "Bắt đầu nhanh".
2. **`HUONG-DAN.mdx`** (Bài hướng dẫn thao tác):
   - **Khi nào dùng**: Toàn bộ bài viết trong thư mục `huong-dan/` và `xu-ly-su-co/`.
   - **Bố cục chuẩn**: Mục tiêu $\rightarrow$ Điều kiện cần $\rightarrow$ Các bước thực hiện đánh số (`<Steps>`) $\rightarrow$ Kiểm tra kết quả $\rightarrow$ Xem thêm.
3. **`API-REFERENCE.mdx`** (Đặc tả kỹ thuật API):
   - **Khi nào dùng**: Các bài viết trong thư mục `api/`.
   - **Bố cục chuẩn**: HTTP Method + Path $\rightarrow$ Mô tả $\rightarrow$ Bảng tham số $\rightarrow$ Ví dụ Request $\rightarrow$ Ví dụ Response $\rightarrow$ Bảng mã lỗi.
