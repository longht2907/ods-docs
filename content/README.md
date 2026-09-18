---
title: "Quy chuẩn Cấu trúc Nội dung Tài liệu (content/)"
description: "Tài liệu hướng dẫn quy tắc tổ chức thư mục, đặt tên, cấu hình điều hướng và quy trình thêm giải pháp mới vào ODS Docs."
---

# Quy chuẩn Cấu trúc Nội dung Tài liệu (content/)

Tài liệu này quy định cách tổ chức nội dung public trong `content/docs` và cách mở rộng Documentation Portal mà không làm thay đổi URL hoặc navigation hiện có.

---

## 1. Kiến trúc thông tin public docs

ODS Docs sử dụng mô hình **Flat Solution Catalog** ở cấp solution:

```text
content/docs/
├── meta.json
├── index.mdx
├── giai-phap.mdx
├── bat-dau/
├── ai-contact-center/
│   ├── meta.json              # root: true
│   ├── index.mdx
│   ├── huong-dan/
│   │   ├── meta.json          # root: "audience"
│   │   └── ...
│   └── api/
│       ├── meta.json          # root: "audience"
│       └── ...
├── cloudfile/
│   ├── meta.json              # root: true
│   └── index.mdx
└── tham-chieu-chung/
```

### Mental model

```text
/docs                     Documentation Hub
  ↓
Solution root             root: true
  ↓
Audience root             root: "audience" — chỉ khi thực sự cần
  ↓
Document pages
```

Không tạo các tầng thư mục trung gian theo phòng ban hoặc nhóm kinh doanh như `software/`, `infrastructure/`. URL của solution phải ổn định theo dạng:

```text
/docs/<ten-giai-phap>/...
```

---

## 2. Quy tắc đặt tên

| Đối tượng | Quy tắc | Ví dụ |
| :--- | :--- | :--- |
| Thư mục giải pháp | Tên thương mại tiếng Anh, lowercase, kebab-case | `ai-contact-center`, `cloudfile` |
| Thư mục loại tài liệu | Tiếng Việt không dấu, lowercase, kebab-case | `huong-dan`, `xu-ly-su-co` |
| Ngoại lệ kỹ thuật | Giữ nguyên thuật ngữ chuẩn | `api` |
| Tệp bài viết | Tiếng Việt không dấu, lowercase, kebab-case | `bat-dau-nhanh.mdx` |
| `title` | Tiếng Việt có dấu đầy đủ | `Bắt đầu nhanh` |
| `description` | Bắt buộc, mô tả ngắn 1–2 câu | — |

---

## 3. Khi nào một dịch vụ được lên Solution tab

Một giải pháp được khai báo:

```json
{
  "root": true
}
```

và xuất hiện trong solution navigation khi đáp ứng đủ các điều kiện:

- là sản phẩm hoặc giải pháp độc lập của ODS;
- đã có ít nhất một tài liệu public có giá trị thực tế cho khách hàng;
- có landing page `index.mdx`;
- URL của giải pháp được xem là ổn định dài hạn.

Số lượng page không quyết định việc tạo solution tab.

Ví dụ:

- `ai-contact-center` → có public docs → có solution tab;
- `cloudfile` → chỉ có một page nhưng vẫn có public docs → có solution tab;
- Digital Infrastructure → chưa có public docs → không tạo folder/tab;
- License → chưa có public docs → không tạo folder/tab.

Dịch vụ chưa có tài liệu có thể xuất hiện trên `/docs` và `/docs/giai-phap` dưới dạng informational card, nhưng không được tạo route rỗng hoặc `href` tới nội dung chưa tồn tại.

---

## 4. Khi nào tạo Audience root

Không tạo `huong-dan/`, `api/` hoặc nested tab chỉ để chuẩn hóa hình thức.

Chỉ tạo Audience root khi một solution thực sự có nhiều nhóm người đọc độc lập.

Ví dụ AI Contact Center:

```text
ai-contact-center/
├── huong-dan/    # người quản trị / người sử dụng portal
└── api/           # developer tích hợp
```

Các audience cùng loại dùng:

```json
{
  "root": "audience"
}
```

Một solution chỉ có hướng dẫn sử dụng thì không cần tạo `api/`.

---

## 5. Quy tắc tạo folder

Chỉ tạo folder khi có ít nhất một trong các lý do sau:

- chứa nhiều page cùng một domain;
- có navigation riêng;
- có layout riêng;
- là extension point dài hạn rõ ràng, ví dụ `api/`.

Không tạo folder chỉ để chứa một page thông thường.

Sai:

```text
autocall/
└── index.mdx
```

Đúng:

```text
huong-dan/
└── autocall.mdx
```

---

## 6. `meta.json`, root và separator

Separator chỉ dùng để chia **các page trong cùng một navigation scope**:

```json
{
  "pages": [
    "index",
    "---Bắt đầu---",
    "bat-dau-nhanh",
    "---Vận hành---",
    "autocall"
  ]
}
```

Không dùng separator để thay thế Solution tab hoặc Audience tab.

Solution root dùng:

```json
{
  "root": true
}
```

Audience root dùng:

```json
{
  "root": "audience"
}
```

Có thể khai báo `icon`, `description` và `defaultOpen` trong `meta.json`; icon Lucide được resolve qua `lucideIconsPlugin()` trong source loader.

---

## 7. Tài liệu dùng chung

Các nội dung dùng chung chỉ tồn tại một lần tại:

```text
content/docs/tham-chieu-chung/
```

Bao gồm hiện tại:

- Thuật ngữ;
- Cam kết SLA;
- Câu hỏi thường gặp.

Không duplicate các page này vào từng solution root. Public layout phải cung cấp link tới chúng ngay cả khi người đọc đang ở trong một solution root riêng.

---

## 8. Quy trình thêm giải pháp mới

### Bước 1 — Sao chép template tối thiểu

```bash
cp -r content/_templates/GIAI-PHAP content/docs/<ten-giai-phap>
```

Template mặc định chỉ gồm:

```text
GIAI-PHAP/
├── meta.json
├── index.mdx
└── README.md
```

### Bước 2 — Cập nhật metadata và landing page

- đổi `title`, `description`, `icon` trong `meta.json`;
- cập nhật `title` và `description` trong `index.mdx`;
- viết nội dung public thực tế trước khi đưa solution lên navigation.

### Bước 3 — Khai báo solution

Thêm folder vào `content/docs/meta.json` và thêm card vào `/docs` hoặc `/docs/giai-phap`.

Không cần refactor layout hoặc thay đổi URL solution cũ.

### Bước 4 — Chỉ thêm audience khi cần

Khi solution đã có nhiều nhóm người đọc, mới tạo `huong-dan/`, `api/` hoặc audience tương ứng.

---

## 9. Quy tắc URL và redirect

Khi refactor cấu trúc file làm thay đổi URL public:

1. cập nhật toàn bộ internal links sang URL mới;
2. giữ backward compatibility bằng permanent redirect trong `next.config.mjs`;
3. chạy link checker và route tests;
4. không xóa URL public cũ mà không có migration path.

---

## 10. Public và Internal là hai trust zone khác nhau

`content/docs` và `content/internal` là hai source độc lập.

Không được:

- merge `source` và `internalSource`;
- đưa `internalSource.getPageTree()` vào public layout;
- link internal content từ public hub/navigation;
- index internal content trong public search.

Mọi thay đổi public docs phải giữ nguyên boundary này.

---

## 11. Templates nội dung

Các template chung trong `content/_templates/`:

- `OVERVIEW.mdx` — landing page/tổng quan solution;
- `HUONG-DAN.mdx` — bài hướng dẫn thao tác;
- `API-REFERENCE.mdx` — tài liệu API hand-written.

Template `GIAI-PHAP/` chỉ cung cấp bộ xương tối thiểu. Không tạo sẵn `huong-dan/`, `api/` hoặc `xu-ly-su-co/` nếu solution chưa có nhu cầu thực tế.

---

## 12. Verification

Sau thay đổi content/navigation, chạy:

```bash
npm run verify:task
```

Khi cần debug riêng:

```bash
npm run types:check
npm run check:env
npm run check:links
npm run guard
npm run check:scope
npm run build
npm run test:routes
```

Task chỉ được xem là hoàn thành khi verification pass hoặc mọi deviation đã được ghi rõ trong report/PR.
