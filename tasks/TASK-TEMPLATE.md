# TASK-XXX — [Tên nhiệm vụ ngắn gọn]

## Bối cảnh

Mô tả ngắn gọn bối cảnh của nhiệm vụ, lý do cần thực hiện và trạng thái hiện tại của codebase liên quan đến tính năng này.

## Mục tiêu

Mục tiêu cụ thể cần đạt được sau khi hoàn thành task (kèm bảng so sánh hoặc mô tả trực quan nếu có).

## Phạm vi (Scope)

### Tạo mới:
- `path/to/new-file.ts`

### Sửa đổi:
- `path/to/existing-file.ts` — mô tả điểm cần sửa, giữ nguyên các phần không liên quan.

### Xóa:
- `path/to/deprecated-file.ts`

## Ngoài phạm vi (Out of Scope)

- [ ] Không sửa các file ngoài danh sách Phạm vi.
- [ ] Không thay đổi ranh giới bảo mật public/internal.
- [ ] Không thêm dependency mới trừ khi có thỏa thuận trước.
- [ ] Không can thiệp cấu hình secret, deploy, OAuth.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ nghiêm ngặt các nguyên tắc trong [AGENTS.md](file:///e:/Project/ods-docs/AGENTS.md) và [DECISIONS.md](file:///e:/Project/ods-docs/DECISIONS.md).
- Giữ vững tính tương thích của API và Typescript strict mode.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [ ] `npm run typecheck` chạy qua không có lỗi type.
- [ ] `npm run guard` in `Guard PASS.`
- [ ] `npm run build` thành công.
- [ ] Kiểm thử chức năng:
  - [ ] Trường hợp 1: ...
  - [ ] Trường hợp 2: ...

## Điều kiện dừng (Stop Condition)

Dừng lại và xin ý kiến Human ngay lập tức nếu:
1. Gặp lỗi build / typecheck không giải quyết được sau 3 lần thử.
2. Cần cài thêm thư viện ngoài phạm vi cho phép.
3. Yêu cầu mâu thuẫn với mục "Không được phá vỡ" trong `AGENTS.md`.

## Báo cáo khi hoàn thành

- Danh sách các file đã tạo / sửa / xóa.
- Kết quả thực tế của các lệnh kiểm tra (`typecheck`, `guard`, `build`).
- Bằng chứng kiểm thử runtime và các hạn chế còn lại (nếu có).
