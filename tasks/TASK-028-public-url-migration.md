---
status: in-progress
branch: task/TASK-028-public-url-migration
commit: ""
verified-by: npm run verify:task
---

# TASK-028 — Rút gọn URL Portal public

## Bối cảnh

URL Portal public hiện phản ánh nguyên cấu trúc thư mục biên tập, ví dụ:

`/docs/ai-contact-center/user-guider-portal/06-quan-ly-cuoc-goi/huong-dan-giam-sat-cuoc-goi`

Các segment `user-guider-portal`, prefix thứ tự `01-`…`10-` và tiền tố
`huong-dan-` làm URL dài, khó chia sẻ và làm breadcrumb/Search result nặng nề.
Thứ tự sidebar đã được khai báo bằng `meta.json`, vì vậy không cần tiếp tục dùng
prefix số làm cơ chế ordering trong URL.

## Mục tiêu

- Đổi namespace Portal thành `/docs/ai-contact-center/portal`.
- Bỏ prefix số khỏi 10 section và dùng slug ngắn, có nghĩa nghiệp vụ.
- Rút trang được Human phản ánh thành `/docs/ai-contact-center/portal/cuoc-goi/giam-sat`.
- Giữ toàn bộ URL cũ hoạt động bằng redirect permanent 308.
- Cập nhật internal link, home cards, sidebar mapping, Search index và guard sang
  canonical URL mới.
- Không thay đổi nội dung hoặc ranh giới public/internal.

## Phạm vi (Scope)

### Tạo mới

- `.harness/reports/TASK-028-report.md`
- `tasks/TASK-028-public-url-migration.md`
- `content/docs/ai-contact-center/portal/**`

### Sửa đổi

- `next.config.mjs` — redirect 308 từ URL cũ sang canonical URL mới.
- `content/docs/ai-contact-center/meta.json` — cập nhật parent PageTree sang folder
  canonical `portal` để sidebar nhận diện active tab.
- `content/docs/ai-contact-center/index.mdx` — cập nhật entry links.
- `content/docs/ai-contact-center/user-guider-portal/**` — nguồn cũ được di chuyển.
- `src/app/docs/layout.tsx` — cập nhật sidebar section/item/folder mapping.
- `src/lib/docs-products.ts` — cập nhật product guide URL.
- `src/lib/home-content.ts` — cập nhật Search suggestions.
- `harness/guard.mjs` — cập nhật required public content node.
- `harness/tests/routes.test.mjs` — kiểm tra canonical routes và redirect 308.
- `harness/tests/search-regression.test.mjs` — kiểm tra Search chỉ trả canonical URL.

### Xóa

- `content/docs/ai-contact-center/user-guider-portal/**` sau khi đã di chuyển đủ
  sang `content/docs/ai-contact-center/portal/**`.

## URL map

| Cũ | Mới |
| --- | --- |
| `user-guider-portal` | `portal` |
| `01-tong-quan` | `tong-quan` |
| `02-quan-ly-dich-vu` | `dich-vu` |
| `03-quan-ly-nguoi-dung` | `nguoi-dung` |
| `04-thiet-lap-tong-dai` | `tong-dai` |
| `05-quan-ly-khach-hang` | `khach-hang` |
| `06-quan-ly-cuoc-goi` | `cuoc-goi` |
| `07-quan-ly-hoi-thoai` | `hoi-thoai` |
| `08-tich-hop-da-kenh` | `tich-hop` |
| `09-thiet-lap-may-nhanh` | `may-nhanh` |
| `10-goi-tu-dong` | `autocall` |
| `06-quan-ly-cuoc-goi/huong-dan-giam-sat-cuoc-goi` | `cuoc-goi/giam-sat` |

## Ngoài phạm vi (Out of Scope)

- Không đổi URL API Reference hoặc CloudFile.
- Không đổi đường dẫn media `/media/ai-contact-center/user-guider-portal/**`.
- Không sửa nội dung hướng dẫn, screenshot hoặc frontmatter ngoài nhu cầu link.
- Không đổi Search API, auth, Proxy, sitemap policy, secret hoặc deployment.
- Không thêm dependency.

## Ràng buộc kiến trúc & kỹ thuật

- Dùng `redirects()` của Next.js 16.3.4 với `permanent: true` để trả 308.
- Redirect cụ thể cho `giam-sat` phải đứng trước wildcard của section.
- Không tạo redirect chain; URL cũ phải đi thẳng đến canonical URL cuối.
- `meta.json` chịu trách nhiệm ordering; không đưa prefix số trở lại slug.
- Public content không được link sang `/internal/**`.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [ ] `/docs/ai-contact-center/portal` trả 200.
- [ ] `/docs/ai-contact-center/portal/cuoc-goi/giam-sat` trả 200.
- [ ] URL root, section và trang giám sát cũ trả 308 thẳng đến URL mới.
- [ ] Không còn internal link `/docs/ai-contact-center/user-guider-portal` trong
  product code/content đang hoạt động.
- [ ] Không có media path bị đổi.
- [ ] Search result public trả canonical `/portal/**`, không trả URL cũ.
- [ ] Sidebar nhận diện route `/portal/**` thuộc tab AI Contact Center và đánh dấu
  đúng trang canonical đang active.
- [ ] `npm run check:links`, `npm run guard`, `npm run test:routes` và
  `npm run verify:task` PASS.

## Điều kiện dừng (Stop Condition)

Dừng lại và xin Human nếu:

1. Migration yêu cầu thay đổi auth hoặc public/internal boundary.
2. URL cũ không thể redirect thẳng đến canonical URL bằng Next.js config hiện tại.
3. Cần thêm dependency hoặc sửa test để nới tiêu chí nghiệm thu.

## Báo cáo khi hoàn thành

- Liệt kê mapping và file đã thay đổi.
- Ghi kết quả redirect/runtime thật.
- Ghi kết quả `verify:task` và giới hạn CI/PR còn lại.
