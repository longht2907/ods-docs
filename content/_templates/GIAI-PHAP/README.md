# Template giải pháp

Template mặc định chỉ tạo solution root và landing page.

Không tạo `huong-dan/`, `api/` hoặc `xu-ly-su-co/` nếu chưa có nhu cầu thực tế.

## Khi tài liệu bắt đầu mở rộng

Nếu có nhiều tài liệu dành cho người sử dụng, tạo `huong-dan/` và thêm `meta.json` riêng.

Nếu đồng thời có API Reference dành cho developer, tạo thêm `api/`.

Khi `huong-dan/` và `api/` là hai nhóm người đọc độc lập trong cùng solution, cả hai dùng:

```json
{
  "root": "audience"
}
```

Không tạo folder chỉ để chứa duy nhất một page thông thường.
