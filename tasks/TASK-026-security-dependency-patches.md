---
status: in-progress
branch: task/TASK-026-security-dependency-patches
commit: ""
verified-by: npm run verify:task
---

# TASK-026 — Vá lỗ hổng Node.js và dependency production

## Bối cảnh

Ngày 27/10/2026, kiểm tra trực tiếp trên `main` cho thấy runtime local đã dùng Node.js
22.23.4, nhưng `npm audit --omit=dev` vẫn báo một package Critical và ba package
High. `next@16.3.4` cùng các dependency bắc cầu `sharp@0.35.4`,
`source-map-js@1.2.1` và `zod@4.6.5` đều nằm trong affected range đã công bố.
CI hiện chưa có dependency vulnerability gate và Docker vẫn dùng tag rộng
`node:22-alpine`, nên một build không chứng minh được runtime đã chứa security release
ngày 21/10/2026.

## Mục tiêu

- Nâng dependency lên các phiên bản đã vá mà không đổi hành vi ứng dụng.
- Đồng bộ Node.js 22.23.4 giữa contract của repo, CI và Docker production.
- Chặn CI khi production dependency có advisory mức High hoặc Critical.
- Giữ nguyên ranh giới bảo mật public/internal và cấu trúc Next.js standalone.

## Phạm vi (Scope)

### Tạo mới:

- `tasks/TASK-026-security-dependency-patches.md`
- `.harness/reports/TASK-026-report.md`

### Sửa đổi:

- `package.json` — nâng Next.js, đặt Node.js patched baseline và thêm lệnh audit production.
- `package-lock.json` — resolve dependency graph đã vá bằng npm, không chỉnh tay.
- `Dockerfile` — dùng Node.js 22.23.4 Alpine thay cho tag major rộng.
- `.github/workflows/ci.yml` — dùng Node.js 22.23.4 và chạy production dependency audit.
- `AGENTS.md` — giữ cập nhật generated agent-rules do Next.js 16.4.3 tạo lại khi chạy dev/typegen.

### Xóa:

- Không có.

## Ngoài phạm vi (Out of Scope)

- [x] Không sửa `next-env.d.ts` và `KIEN_TRUC_HE_THONG.md` đang có thay đổi ngoài task.
- [x] Không sửa source ứng dụng, nội dung MDX, auth hoặc ranh giới public/internal.
- [x] Không thêm package mới hoặc dùng `npm audit fix --force`.
- [x] Không deploy VPS, đổi Caddy, secret, DNS hay OAuth.
- [x] Không khẳng định PHP trên VPS an toàn vì repo này không quản lý PHP runtime.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ [AGENTS.md](../AGENTS.md) và [DECISIONS.md](../DECISIONS.md).
- Giữ `output: 'standalone'`, App Router và Fumadocs hiện hành.
- Next.js phải còn thỏa peer range thực tế của Fumadocs 16.x đang cài.
- Chỉ chấp nhận dependency graph mà `npm audit --omit=dev` không còn High/Critical.
- `status` giữ `in-progress` cho tới khi Pull Request có CI xanh và Human duyệt.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [x] Node.js baseline trong `package.json`, Docker và CI là 22.23.4.
- [x] Next.js được nâng tối thiểu lên 16.4.3.
- [x] Lockfile resolve `sharp >= 0.35.5`, `source-map-js >= 1.2.2`, `zod >= 4.6.6`.
- [x] `npm run audit:prod` PASS, không có High/Critical production advisory.
- [ ] `npm run verify:task` PASS.
- [x] Public routes vẫn trả 200 và internal routes/search vẫn trả 401 theo route tests.
- [x] `git diff --check` PASS và task không sửa hai file ngoài phạm vi.

## Điều kiện dừng (Stop Condition)

Dừng lại và xin ý kiến Human nếu:

1. Dependency patched yêu cầu đổi API ứng dụng, auth hoặc ranh giới public/internal.
2. Fumadocs không tương thích với Next.js patched release.
3. Test hiện hữu FAIL và nguyên nhân là test sai hoặc cần nới test/guard.
4. Cần thêm dependency hoặc thay đổi deployment production ngoài các file đã duyệt.

## Báo cáo khi hoàn thành

- Liệt kê dependency trước/sau và đường dependency thực tế.
- Ghi output thật của audit, `npm run verify:task`, scope check và `git diff --check`.
- Phân biệt rõ local verification với CI/PR và trạng thái production VPS.
