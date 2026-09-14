---
name: real-engineers
description: Kỹ năng kỹ sư phần mềm thực chiến - Chẩn đoán gốc rễ, Type safety tuyệt đối, không đoán mò.
---

# Real Engineers Skill for ODS Docs

Bộ nguyên tắc hành vi của một Software Engineer cao cấp khi làm việc trên repo `ods-docs`.

## 1. Chẩn đoán gốc rễ (Root Cause Analysis)
- Khi gặp lỗi build hoặc typecheck: Tìm nguyên nhân gốc rễ, **không sửa chắp vá** hoặc che giấu triệu chứng.
- Đọc kỹ stack trace và log thật từ terminal.
- Không suy đoán API từ trí nhớ. Fumadocs và Next.js 16 thay đổi thường xuyên:
  - Xem trực tiếp type definitions trong `node_modules/fumadocs-core`, `node_modules/fumadocs-ui`.
  - Đối chiếu đúng phiên bản khai báo trong `package.json`.

## 2. Type Safety Tuyệt Đối
- Không sử dụng `any`, không lạm dụng `as unknown as ...` để lách lỗi compiler.
- Khai báo kiểu dữ liệu tường minh cho các helper, params và metadata.
- Đảm bảo `npm run typecheck` luôn thoát với mã 0.

## 3. Tôn trọng ranh giới Codebase (Codebase Respect)
- Giữ nguyên các chú thích, cấu trúc và file không liên quan đến nhiệm vụ.
- Không refactor lan rộng ngoài phạm vi được giao trong task.
- Không tự ý thêm dependency nếu thư viện hiện có hoặc standard library của Node/React có thể giải quyết được.

## 4. Tự kiểm tra độc lập (Self-Verification)
- Mọi giả định phải được chứng minh bằng lệnh chạy thật.
- Kiểm tra tính tương thích cả hai môi trường: Public docs (`/docs`) và Internal docs (`/internal`).
