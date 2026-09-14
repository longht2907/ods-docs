# Báo cáo Nghiệm thu TASK-001 — Tách hai vùng tài liệu: công khai và nội bộ

- **Task**: `tasks/TASK-001-hai-vung-tai-lieu.md`
- **Trạng thái**: done
- **Commit**: `8f3f891`
- **Kiểm chứng bởi**: `npm run verify`

## Tóm tắt kết quả

1. Đã thiết lập 2 vùng tài liệu độc lập:
   - `content/docs` (public) gắn với loader `source`.
   - `content/internal` (nội bộ) gắn với loader `internalSource`.
2. Bảo vệ bằng proxy tại `src/proxy.ts` (trả về 401 khi không có quyền).
3. Đã chạy `typecheck`, `guard`, `build` thành công 100%.
