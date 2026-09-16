---
status: in-progress
branch: task/TASK-004-khung-ia-docs
commit: ""
verified-by: npm run verify:task
---

# TASK-004 — Dựng khung Information Architecture cho /docs

## Mục tiêu
Dựng khung thư mục, meta.json, trang Overview, 3 khuôn bài viết và
bộ xương thư mục giải pháp cho /docs, theo cấu trúc đã duyệt.

Sau task này: chạy npm run dev và mở /docs phải thấy điều hướng 2
tầng đúng phong cách giải-pháp-riêng-biệt; và khi ODS ra giải pháp
mới, người làm chỉ cần copy content/_templates/GIAI-PHAP/ rồi thêm
một dòng vào content/docs/meta.json.

Chưa viết nội dung hướng dẫn chi tiết — đó là TASK-006.

## Phạm vi
- `content/docs/**`
- `content/_templates/**`
- `content/README.md`

## Tiêu chí nghiệm thu
1. `npm run verify:task` exit code 0.
2. Mọi file .mdx có frontmatter title và description.
   `npm run guard` in `Guard PASS.` không cảnh báo.
3. Tồn tại đủ mọi thư mục và file trong cấu trúc đã duyệt.
4. content/docs/meta.json có dòng phân cách nhóm, và không có bất kỳ
   thư mục trung gian nào theo danh mục bán hàng. Mọi giải pháp nằm
   ngang hàng ngay dưới content/docs/.
5. `npm run dev` rồi mở http://localhost:3000/docs:
   sidebar hiện đúng thứ tự Bắt đầu → [phân cách] → AI Contact Center,
   CloudFile → [phân cách] → Tham chiếu chung. Không nhóm nào rỗng
   hoặc báo lỗi.
6. Mở http://localhost:3000/docs/ai-contact-center:
   sidebar CHỈ hiện nội dung AI Contact Center, và có cách điều hướng
   sang CloudFile. Dán ảnh chụp màn hình vào report.
7. Mở http://localhost:3000/docs/cloudfile: tương tự tiêu chí 6,
   sidebar chỉ hiện nội dung CloudFile.
8. Ba khuôn trong content/_templates/ tồn tại, đủ các mục đã nêu,
   có comment giải thích cách dùng.
9. content/_templates/GIAI-PHAP/ là bộ xương copy được. Tự kiểm chứng
   bằng cách copy nó thành content/docs/thu-nghiem/, thêm vào
   meta.json, chạy npm run dev xác nhận tab mới hiện đúng, rồi XOÁ
   content/docs/thu-nghiem/ và hoàn nguyên meta.json. Ghi kết quả
   thử nghiệm này vào report.
10. content/README.md ghi đủ: cấu trúc và lý do danh mục phẳng, quy
    tắc đặt tên, cách dùng meta.json và dòng phân cách, 3 bước khi ra
    giải pháp mới, khi nào dùng khuôn nào.
11. `npm run build` thành công, không cảnh báo mới về content.

## Điều kiện dừng
Dừng lại hỏi tôi, không tự quyết, nếu:
1. Phải sửa bất kỳ file nào trong src/ để đạt bố cục sidebar.
2. Phải cài package mới.
3. Phải sửa file ngoài mục Phạm vi.
4. Fumadocs không hỗ trợ sidebar tab hoặc dòng phân cách như mô tả —
   báo tôi kèm trích dẫn source thật trong node_modules, đừng tự thay
   bằng giải pháp khác.
5. Sửa 3 lần mà tiêu chí 6 hoặc 7 vẫn không đạt.
