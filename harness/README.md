# harness/

Hạ tầng kiểm soát chất lượng. Không thuộc sản phẩm — xoá toàn bộ thư mục này
thì website vẫn chạy bình thường.

- `guard.mjs`   — luật riêng của dự án (ranh giới public/internal, secret, frontmatter)
- `linters/`    — kiểm tĩnh: link gãy, phạm vi thay đổi, biến môi trường
- `tests/`      — kiểm động: khởi động production server thật (`next start`), gọi route thật (yêu cầu chạy `npm run build` trước)
- `hooks/`      — chạy trước khi commit trên máy cá nhân

## harness/ khác .harness/ thế nào

| harness/            | .harness/                  |
|---------------------|----------------------------|
| Code do người viết  | Kết quả do máy sinh ra     |
| Đầu vào             | Đầu ra                     |
| Phải review khi PR  | Không cần review           |
| `guard.mjs`, linter | `phase.json`, `reports/`   |

Chạy toàn bộ: `npm run verify:task`
