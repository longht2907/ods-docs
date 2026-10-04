# TASK-013 — Báo cáo nghiệm thu

## Trạng thái

- Branch: `task/TASK-013-portal-docs-actuation`
- Task status: `in-progress`
- Commit: cập nhật sau khi tạo commit triển khai
- Pull Request: chưa mở

## Phạm vi đã tiếp nhận

- Toàn bộ working tree còn lại sau khi TASK-012 merge được chuyển sang branch TASK-013 từ `origin/main`.
- Human yêu cầu giữ nguyên thay đổi và xác nhận đưa nội dung/media trong phạm vi lên GitHub.
- Nội dung gồm Portal guide, Gọi tự động, media, MDX components, TOC và quy trình `doc-actuator`.

## Kiểm chứng

- `npm run verify:code` — PASS: route types, TypeScript, env guard, broken links và security guard.
- `npm run check:scope` — PASS sau khi đồng bộ local `main` với `origin/main` tại merge commit PR #12.
- `npm run build` — PASS, sinh thành công 197/197 static pages.
- `npm run test:routes` — PASS 12/12 cases; public routes trả 200, internal routes tiếp tục trả 401.
- `git diff --check` — PASS; chỉ còn cảnh báo line-ending LF/CRLF của Git trên Windows.
- Lucide warning `Sliders` được sửa theo export thật `SlidersHorizontal` của phiên bản dependency đang cài.

## Content debt đã phát hiện

- Một số trang dịch vụ hiện chỉ có frontmatter, chưa có nội dung vận hành.
- Các trang API Autocall/Webhook cố ý chưa mô tả endpoint vì chưa có đặc tả được duyệt.
- Một số trang Gọi tự động còn là khung ngắn; chỉ hoàn thiện khi có nguồn UI hoặc tài liệu nghiệp vụ đủ tin cậy.

## Giới hạn

- Task giữ `status: in-progress` cho đến khi CI của Pull Request xanh và Human finalization.
