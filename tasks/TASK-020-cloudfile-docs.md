---
status: in-progress
branch: task/TASK-020-cloudfile-docs
commit: "74acc44"
verified-by: npm run verify:task
---

# TASK-020 — Chuyển tài liệu CloudFile từ GitBook sang ods-docs

## Bối cảnh

Tài liệu người dùng CloudFile hiện được xuất bản trên GitBook. Task này chuyển toàn bộ nội dung sang vùng public của ODS Documentation Platform, giữ đủ dữ kiện từ nguồn nhưng chuẩn hóa cấu trúc thông tin, task guide, hình ảnh và liên kết theo convention hiện có của `ods-docs`.

Nguồn duy nhất được phép sử dụng:

- GitBook: <https://odsvn.gitbook.io/cloudfile_user-guider>
- Mục lục: <https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt>
- Bản Markdown của từng trang được liệt kê trong `llms.txt`.

## Mục tiêu

- Chuyển đủ 31 trang Markdown trong mục lục GitBook vào `content/docs/cloudfile/**`.
- Giữ nguyên dữ kiện có trong nguồn, bỏ emoji ở heading và loại các đoạn quảng cáo lặp.
- Chuẩn hóa trang overview bằng văn xuôi, `<Cards>` điều hướng và bảng lợi ích.
- Chuẩn hóa trang thao tác theo cấu trúc task guide: frontmatter, Callout trước khi bắt đầu, Steps có kết quả, kiểm tra kết quả, Accordions xử lý sự cố và Cards bài viết liên quan.
- Tải ảnh nguồn về `public/media/cloudfile/**`, đặt tên kebab-case không dấu, dùng alt tiếng Việt và không hotlink GitBook CDN.
- Ghi mọi dữ kiện thiếu hoặc mơ hồ bằng `**Cần bổ sung:**` với mã Q đối chiếu trong file câu hỏi.

## Phạm vi

- `content/docs/cloudfile/**`
- `public/media/cloudfile/**`
- `tasks/TASK-020-cloudfile-docs.md`
- `.harness/reports/TASK-020-*`

## Ngoài phạm vi

- Không sửa `content/docs/ai-contact-center/**`, `content/docs/meta.json`, trang chủ docs, `src/**`, `harness/**`, `package.json`, lockfile, `AGENTS.md` hoặc `DECISIONS.md`.
- Không thay đổi ranh giới bảo mật public/internal, auth, search, sitemap hoặc deploy.
- Không thêm dependency.
- Không thao tác worktree `E:\Project\ods-docs` hoặc port 3001.
- Không push, mở Pull Request hoặc chạy `npm audit fix`.

## Ràng buộc nội dung

- Chỉ dùng dữ kiện trong GitBook đã tải về `.harness/reports/TASK-020-source/**` hoặc câu trả lời trực tiếp của Human được ghi nhận trong file câu hỏi.
- Không tự thêm tính năng, giá, giới hạn dung lượng, URL, link tải ứng dụng hoặc hành vi chưa có bằng chứng.
- Không đưa tài khoản, mật khẩu hay dữ liệu cá nhân thật vào nội dung hoặc ảnh. Ví dụ tài khoản phải dùng `user@congty.vn`.
- Link nội bộ phải trỏ tới route tồn tại; tài liệu public không link sang `/internal`.
- Mọi file MDX phải có `title` và `description` trong frontmatter.
- Trang thao tác dùng format của `content/docs/ai-contact-center/user-guider-portal/**` làm mẫu nhưng không sửa vùng đó.
- Ảnh không tải được phải được thay bằng `**Cần bổ sung:** ảnh ...` kèm mã Q.

## Information Architecture

IA đích giữ cấu trúc đã giao và bổ sung trang đã được Human chấp thuận:

- `index.mdx`
- `01-tong-quan/**`
- `02-bat-dau/**`, gồm `tinh-nang-chinh.mdx` đặt sau `tong-quan-giao-dien`
- `03-quan-ly-thu-muc-tep-tin/**`
- `04-chia-se-phan-quyen/**`
- `05-may-tinh-di-dong/**`
- `06-lam-viec-nhom/**`
- `07-quan-tri-admin/**`

Mục lục nguồn có 31 trang trong khi IA ban đầu chỉ có 30 file đích. Human đã chấp thuận `Q-IA-01`: thêm `02-bat-dau/tinh-nang-chinh.mdx` cho trang cha “Tính năng chính”, đặt sau `tong-quan-giao-dien` trong `02-bat-dau/meta.json`.

## Kế hoạch theo lô

0. Tạo task; tải toàn bộ nguồn Markdown; đối chiếu IA; tạo questions và report.
1. Viết `index`, `01-tong-quan`, `02-bat-dau`; tạo toàn bộ `meta.json` và skeleton các trang còn lại.
2. Viết `03-quan-ly-thu-muc-tep-tin`, `04-chia-se-phan-quyen`.
3. Viết `05-may-tinh-di-dong`.
4. Viết `06-lam-viec-nhom`, `07-quan-tri-admin`.
5. Rà liên kết chéo, bài viết liên quan và điền câu trả lời Human.

Mỗi lô kết thúc bằng báo cáo cho Human và không tự chuyển sang lô kế tiếp.

## Tiêu chí nghiệm thu

- [x] Toàn bộ 31 trang nguồn có trang đích sau khi IA được Human xác nhận.
- [x] Mỗi thư mục có `meta.json` với `title` và thứ tự `pages` tương ứng mục lục nguồn.
- [x] Trang overview và task guide tuân thủ đúng format đã giao.
- [x] Không còn hotlink ảnh GitBook trong `content/docs/cloudfile/**`.
- [x] Mọi ảnh local có tên kebab-case không dấu và alt tiếng Việt.
- [x] Không có credential, dữ liệu cá nhân thật hoặc claim ngoài nguồn.
- [x] Link nội bộ trỏ tới route tồn tại.
- [ ] `npm run check:links`, `npm run check:scope` và `git diff --check` PASS sau mỗi lô.
- [x] `npm run build` PASS ở cuối mỗi lô nội dung.
- [x] Tiến độ, trang hoàn thành, ảnh và câu hỏi mở được cập nhật trong `.harness/reports/TASK-020-report.md`.

## Điều kiện dừng

Dừng và hỏi Human nếu:

1. Cần sửa file ngoài phạm vi.
2. Cần chạm auth hoặc ranh giới public/internal.
3. Nguồn thiếu, mơ hồ hoặc mâu thuẫn về URL, link tải, tính năng, giới hạn, quyền, billing hay hành vi dữ liệu.
4. Test bị cho là sai hoặc tiếp tục FAIL sau khi đã chẩn đoán bằng output thật.

## Báo cáo và vòng đời

- Task giữ `status: in-progress` đến khi Pull Request CI xanh và Human finalization.
- Trường `commit` chỉ được điền bằng hash commit thật cuối cùng trên branch.
- Không push hoặc mở Pull Request trong task này khi chưa có yêu cầu mới của Human.
