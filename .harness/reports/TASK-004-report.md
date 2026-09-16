# Báo cáo Nghiệm thu TASK-004 — Dựng khung Information Architecture cho /docs

- **Task**: `tasks/TASK-004-khung-ia-docs.md`
- **Branch**: `task/TASK-004-khung-ia-docs`
- **Commit**: (sẽ cập nhật hash cuối sau khi commit)
- **Trạng thái**: in-progress
- **Kiểm chứng bởi**: `npm run verify:task`

---

## 1. Đối chiếu danh sách file với mục Phạm vi

Mục Phạm vi trong `tasks/TASK-004-khung-ia-docs.md`:
- `content/docs/**`
- `content/_templates/**`
- `content/README.md`
- `tasks/TASK-004-khung-ia-docs.md` (tự động cho phép theo scope-check)
- `.harness/reports/**` (tự động cho phép theo scope-check)

### Danh sách file thực tế thay đổi:

#### Tạo mới:
1. `content/_templates/OVERVIEW.mdx` — Khuôn mẫu trang tổng quan giải pháp.
2. `content/_templates/HUONG-DAN.mdx` — Khuôn mẫu bài hướng dẫn thao tác kỹ thuật từng bước.
3. `content/_templates/API-REFERENCE.mdx` — Khuôn mẫu bài đặc tả API chuẩn RESTful.
4. `content/_templates/GIAI-PHAP/meta.json` — Bộ xương meta cho giải pháp mới (`root: true`).
5. `content/_templates/GIAI-PHAP/index.mdx` — Trang Overview bộ xương giải pháp.
6. `content/_templates/GIAI-PHAP/huong-dan/meta.json` — Cấu hình thư mục hướng dẫn.
7. `content/_templates/GIAI-PHAP/huong-dan/index.mdx` — Danh mục bài viết hướng dẫn.
8. `content/_templates/GIAI-PHAP/huong-dan/bat-dau-nhanh.mdx` — Bài mẫu bắt đầu nhanh.
9. `content/_templates/GIAI-PHAP/api/meta.json` — Cấu hình thư mục API.
10. `content/_templates/GIAI-PHAP/api/index.mdx` — Đặc tả API mẫu.
11. `content/_templates/GIAI-PHAP/xu-ly-su-co/meta.json` — Cấu hình thư mục sự cố.
12. `content/_templates/GIAI-PHAP/xu-ly-su-co/index.mdx` — Hướng dẫn xử lý sự cố mẫu.
13. `content/README.md` — Tài liệu quy chuẩn tổ chức 3 tầng danh mục phẳng, quy tắc đặt tên, hướng dẫn 3 bước tạo giải pháp mới.
14. `content/docs/bat-dau/meta.json` — Cấu hình thứ tự nhóm Bắt đầu.
15. `content/docs/bat-dau/index.mdx` — Trang danh mục nhóm Bắt đầu.
16. `content/docs/bat-dau/he-sinh-thai-giai-phap.mdx` — Giới thiệu hệ sinh thái giải pháp ODS.
17. `content/docs/bat-dau/tao-tai-khoan.mdx` — Hướng dẫn tạo tài khoản và phân quyền.
18. `content/docs/bat-dau/lien-he-ho-tro.mdx` — Kênh tiếp nhận hỗ trợ kỹ thuật và SLA.
19. `content/docs/ai-contact-center/meta.json` — Cấu hình `root: true` cho giải pháp AI Contact Center.
20. `content/docs/ai-contact-center/index.mdx` — Trang Overview AI Contact Center.
21. `content/docs/ai-contact-center/huong-dan/meta.json` — Cấu hình nhóm hướng dẫn AI Contact Center.
22. `content/docs/ai-contact-center/huong-dan/index.mdx` — Danh mục hướng dẫn AI Contact Center.
23. `content/docs/ai-contact-center/huong-dan/bat-dau-nhanh.mdx` — Hướng dẫn bắt đầu nhanh và test Echo SIP.
24. `content/docs/ai-contact-center/autocall/meta.json` — Cấu hình phân hệ Autocall.
25. `content/docs/ai-contact-center/autocall/index.mdx` — Hướng dẫn tạo chiến dịch Autocall.
26. `content/docs/ai-contact-center/api/meta.json` — Cấu hình API AI Contact Center.
27. `content/docs/ai-contact-center/api/index.mdx` — Đặc tả API khởi tạo cuộc gọi.
28. `content/docs/ai-contact-center/xu-ly-su-co/meta.json` — Cấu hình xử lý sự cố AI Contact Center.
29. `content/docs/ai-contact-center/xu-ly-su-co/index.mdx` — Sổ tay khắc phục lỗi SIP và NAT audio.
30. `content/docs/cloudfile/meta.json` — Cấu hình `root: true` cho giải pháp CloudFile.
31. `content/docs/cloudfile/index.mdx` — Placeholder "Tài liệu đang được xây dựng".
32. `content/docs/tham-chieu-chung/meta.json` — Cấu hình thứ tự nhóm Tham chiếu chung.
33. `content/docs/tham-chieu-chung/thuat-ngu.mdx` — Bảng thuật ngữ chuyên ngành.
34. `content/docs/tham-chieu-chung/cam-ket-sla.mdx` — Chính sách cam kết chất lượng SLA.
35. `content/docs/tham-chieu-chung/cau-hoi-thuong-gap.mdx` — Giải đáp FAQ kỹ thuật và hợp đồng.
36. `tasks/TASK-004-khung-ia-docs.md` — Đặc tả task spec.
37. `.harness/reports/TASK-004-report.md` — Báo cáo nghiệm thu.
38. `.harness/reports/assets/TASK-004/**` — Ảnh chụp màn hình nghiệm thu thực tế.

#### Sửa đổi:
1. `content/docs/meta.json` — Bổ sung dòng phân cách nhóm hiển thị (`---Giải pháp phần mềm---`, `---Tham chiếu---`).
2. `content/docs/index.mdx` — Cập nhật lưới Cards chuyển hướng theo từng nhóm giải pháp.

#### Xóa:
- Không có file nào bị xóa.

Đối chiếu: **100% file thay đổi nằm trọn vẹn trong mục Phạm vi cho phép.**

---

## 2. Output thật của từng lệnh nghiệm thu

### 2.1. `npm run check:env` (Exit code: 0)
```
> ods-docs@0.0.28 check:env
> node harness/linters/env-guard.mjs

[env-guard PASS] Toàn bộ file cấu hình môi trường đều an toàn.
```

### 2.2. `npm run check:links` (Exit code: 0)
```
> ods-docs@0.0.28 check:links
> node harness/linters/broken-links.mjs

[Linter] Toàn bộ liên kết nội bộ trong MDX đều hợp lệ.
```

### 2.3. `npm run guard` (Exit code: 0)
```
> ods-docs@0.0.28 guard
> node harness/guard.mjs

Guard - giai doan: internal

Guard PASS.
```

### 2.4. `npm run check:scope` (Exit code: 0)
```
> ods-docs@0.0.28 check:scope
> node harness/linters/scope-check.mjs

[scope-check PASS] Toàn bộ file thay đổi đều nằm trong phạm vi của TASK-004.
```

### 2.5. `npm run types:check` (Exit code: 0)
```
> ods-docs@0.0.28 types:check
> next typegen && tsc --noEmit

Generating route types...
✓ Types generated successfully
```

### 2.6. `npm run build` (Exit code: 0)
```
> ods-docs@0.0.28 build
> next build

▲ Next.js 16.3.4 (Turbopack)
✓ Running next.config.mjs took 417ms

  Creating an optimized production build ...
✓ Compiled successfully in 7.2s
  Running TypeScript ...
  Finished TypeScript in 1178ms ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/56) ...
  Generating static pages using 3 workers (14/56) 
  Generating static pages using 3 workers (28/56) 
  Generating static pages using 3 workers (42/56) 
✓ Generating static pages using 3 workers (56/56) in 3.3s
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/search
├ ƒ /api/search/internal
├   /docs/[[...slug]]
│ ├ ● /docs
│ ├ ● /docs/ai-contact-center
│ ├ ● /docs/bat-dau/he-sinh-thai-giai-phap
│ └ ● [+12 more paths]
├   /internal/[[...slug]]
│ ├ ● /internal
│ ├ ● /internal/onboarding
│ ├ ● /internal/quy-trinh
│ └ ● /internal/runbook
├ ○ /llms-full.txt
├   /llms.mdx/docs/[[...slug]]
│ ├ ● /llms.mdx/docs/content.md
│ ├ ● /llms.mdx/docs/ai-contact-center/content.md
│ ├ ● /llms.mdx/docs/bat-dau/he-sinh-thai-giai-phap/content.md
│ └ ● [+12 more paths]
├ ○ /llms.txt
└   /og/docs/[...slug]
  ├ ● /og/docs/image.png
  ├ ● /og/docs/ai-contact-center/image.png
  ├ ● /og/docs/bat-dau/he-sinh-thai-giai-phap/image.png
  └ ● [+12 more paths]

ƒ Proxy (Middleware)
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

### 2.7. `npm run test:routes` (Exit code: 0)
```
> ods-docs@0.0.28 test:routes
> node harness/tests/routes.test.mjs

[test:routes] Khởi động Next production server tại http://127.0.0.1:40802...
[test:routes] Server đã sẵn sàng. Bắt đầu kiểm tra 7 cases:
  ✓ Public docs accessible [/docs] -> mong đợi 200, thực tế 200
  ✓ Internal root blocked [/internal] -> mong đợi 401, thực tế 401
  ✓ Internal trailing slash blocked [/internal/] -> mong đợi 401, thực tế 401
  ✓ Internal subpage blocked [/internal/onboarding] -> mong đợi 401, thực tế 401
  ✓ Internal search API blocked [/api/search/internal] -> mong đợi 401, thực tế 401
  ✓ Internal search API trailing slash blocked [/api/search/internal/] -> mong đợi 401, thực tế 401
  ✓ Public search API accessible [/api/search] -> mong đợi 200, thực tế 200

[test:routes PASS] Toàn bộ 7/7 route test case đều đạt chuẩn.
[test:routes] Đang tắt server...
```

### 2.8. `npm run verify:task` toàn chuỗi (Exit code: 0)
Toàn bộ chuỗi kiểm chứng thực thi liên hoàn không phát sinh lỗi, exit code 0.

---

## 3. Hình ảnh chụp màn hình kiểm thử thực tế

Kiểm chứng giao diện trên trình duyệt thực tế qua dev server tại cổng 3000:

### 3.1. Tiêu chí 5: Giao diện trang chủ `/docs`
- Sidebar hiển thị đầy đủ và đúng thứ tự:
  `Tài liệu ODS` $\rightarrow$ `Bắt đầu` $\rightarrow$ [Dòng phân cách: `Giải pháp phần mềm`] $\rightarrow$ `AI Contact Center`, `CloudFile` $\rightarrow$ [Dòng phân cách: `Tham chiếu`] $\rightarrow$ `Tham chiếu chung`.
- Nội dung trang hiển thị lưới Cards chọn giải pháp phân bổ khoa học.

![Trang chủ Docs](/e:/Project/ods-docs/.harness/reports/assets/TASK-004/tc5-docs-overview.png)

### 3.2. Tiêu chí 6: Giao diện `/docs/ai-contact-center`
- Sidebar **chỉ hiển thị nội dung AI Contact Center**:
  - `Tổng quan AI Contact Center`
  - `Hướng dẫn sử dụng` (và các bài con)
  - `Chiến dịch Autocall`
  - `API Reference`
  - `Xử lý sự cố`
- Phía trên đầu sidebar hiển thị **Dropdown selector** với giải pháp đang chọn là `AI Contact Center`.
- Khi nhấp vào Dropdown, xuất hiện danh sách popup cho phép chuyển đổi ngay sang `CloudFile`.

![Sidebar AI Contact Center](/e:/Project/ods-docs/.harness/reports/assets/TASK-004/tc6-ai-contact-center-sidebar.png)
![Dropdown chọn giải pháp](/e:/Project/ods-docs/.harness/reports/assets/TASK-004/tc6-ai-contact-center-dropdown.png)

### 3.3. Tiêu chí 7: Giao diện `/docs/cloudfile`
- Sidebar **chỉ hiển thị nội dung CloudFile** kèm Dropdown chuyển giải pháp trên đầu sidebar.
- Nội dung trang hiển thị Callout cảnh báo: *"Tài liệu đang được xây dựng. Chúng tôi đang hoàn thiện hướng dẫn chi tiết và sẽ cập nhật trong thời gian sớm nhất."*

![Sidebar CloudFile](/e:/Project/ods-docs/.harness/reports/assets/TASK-004/tc7-cloudfile-sidebar.png)

---

## 4. Kết quả thử nghiệm bộ xương copy ở Tiêu chí 9

Thực hiện quy trình kiểm chứng tính khả thi của bộ xương `content/_templates/GIAI-PHAP/`:

1. **Thực hiện sao chép**:
   ```bash
   Copy-Item -Recurse content/_templates/GIAI-PHAP content/docs/thu-nghiem
   ```
2. **Cập nhật tiêu đề giải pháp**:
   Trong `content/docs/thu-nghiem/meta.json`, sửa `"title": "Thử Nghiệm"`.
3. **Khai báo vào meta.json chung**:
   Thêm `"thu-nghiem"` vào dưới nhóm `"---Giải pháp phần mềm---"` trong `content/docs/meta.json`.
4. **Kiểm tra trên trình duyệt**:
   - Truy cập `http://localhost:3000/docs/thu-nghiem`: Trang load thành công (HTTP 200).
   - Sidebar cô lập đúng cấu trúc nội bộ của `thu-nghiem` (`index`, `huong-dan`, `api`, `xu-ly-su-co`).
   - Dropdown trên đầu sidebar xuất hiện thêm tùy chọn `Thử Nghiệm` bên cạnh `AI Contact Center` và `CloudFile`.
5. **Chụp màn hình nghiệm thu**:
   ![Giao diện giải pháp Thử Nghiệm](/e:/Project/ods-docs/.harness/reports/assets/TASK-004/tc9-thu-nghiem-sidebar.png)
6. **Dọn dẹp và hoàn nguyên**:
   - Xóa thư mục `content/docs/thu-nghiem/`: `Remove-Item -Recurse -Force content/docs/thu-nghiem`.
   - Hoàn nguyên `content/docs/meta.json` về trạng thái chuẩn ban đầu.
   - Chạy `npm run check:scope` và `npm run check:links` xác nhận codebase sạch hoàn toàn.

**Kết luận Tiêu chí 9**: Bộ xương mẫu `content/_templates/GIAI-PHAP/` hoạt động hoàn hảo, sẵn sàng 100% để nhân bản cho các giải pháp tiếp theo.

---

## 5. Những chỗ đã cân nhắc nới chuẩn nhưng không nới

1. **Lỗi `content/README.md` thiếu frontmatter trong `guard.mjs`**:
   - Khi chạy `npm run guard` lần đầu, script báo lỗi: `[2-frontmatter] content/README.md thieu frontmatter` do regex kiểm tra áp dụng cho toàn bộ `/\.mdx?$/` trong `content/`.
   - *Cân nhắc*: Có thể sửa `harness/guard.mjs` để bỏ qua file `README.md`.
   - *Quyết định*: **Tuyệt đối không sửa `harness/guard.mjs`**. Thay vào đó, tuân thủ đúng chuẩn và thêm khối frontmatter `title` và `description` vào đầu `content/README.md`. Kết quả `guard.mjs` báo PASS trọn vẹn mà không cần nới lỏng rule.
2. **Lỗi thiếu component `Steps` trong `next build`**:
   - Khi chạy `npm run build`, Next.js báo lỗi do các bài hướng dẫn gọi `<Steps>` mà `fumadocs-ui/mdx` mặc định không tự động inject global component này.
   - *Cân nhắc*: Có thể sửa `src/components/mdx.tsx` để export bổ sung `Steps`, hoặc xóa thẻ `<Steps>` khỏi bài viết.
   - *Quyết định*: Theo luật không được đụng vào `src/`, việc sửa `src/components/mdx.tsx` bị nghiêm cấm. Đồng thời không nới chuẩn bố cục bài hướng dẫn (vẫn giữ cấu trúc `<Steps>`). Giải pháp chuẩn kỹ thuật là thêm dòng import trực tiếp `import { Steps } from 'fumadocs-ui/components/steps';` trong các file MDX có sử dụng. Bản build sau đó chạy thành công 100%.
3. **Giữ nguyên ranh giới Scope Linter**:
   - Trong suốt quá trình thực hiện, chỉ thao tác trên các file thuộc mục `## Phạm vi` (`content/docs/**`, `content/_templates/**`, `content/README.md`). Không can thiệp bất kỳ file nào trong `src/`, `harness/`, `package.json` hay cấu hình hệ thống.
