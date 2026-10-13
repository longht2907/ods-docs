# TASK-020 — Báo cáo chuyển tài liệu CloudFile

## Trạng thái

- Branch: `task/TASK-020-cloudfile-docs`.
- Task status: `in-progress`.
- Nguồn duy nhất: GitBook CloudFile ODS và các URL Markdown trong `llms.txt`.
- Không sửa vùng AI Contact Center, `content/docs/meta.json`, source code, harness, dependency hoặc cấu hình.
- Dev server port 3002 đã được tắt khi bắt đầu bàn giao Git. Nhánh đã push tại commit triển khai `74acc44`; Pull Request đang chờ kết nối GitHub để tạo và theo dõi CI.

## Lô 0 — Task, nguồn và đối chiếu IA

### Công việc đã thực hiện

- Tạo task spec TASK-020 theo phạm vi và vòng đời đã giao.
- Tải `llms.txt` và toàn bộ 31/31 trang Markdown vào `.harness/reports/TASK-020-source/**`, giữ cấu trúc đường dẫn nguồn.
- Kiểm tra 31 file đều không rỗng và có heading H1.
- Ghi nhận 33 tham chiếu ảnh GitBook trên 12 trang nguồn. Lô 0 chưa tải ảnh; ảnh sẽ được tải và đặt tên theo từng nhóm ở các lô nội dung tương ứng.
- Tạo file câu hỏi với 3 câu hỏi mở ban đầu về IA, URL Web Portal và link tải Mobile App.

### Đối chiếu Information Architecture

Mục lục GitBook có 31 trang, trong khi IA đích ban đầu biểu diễn 30 file nội dung:

| Nhóm nguồn | Số trang nguồn | Số file đích trong IA | Kết quả |
|---|---:|---:|---|
| Root | 1 | 1 | Khớp |
| Tổng quan | 2 | 2 | Khớp |
| Bắt đầu | 3 | 3 | Khớp |
| Tính năng chính / Quản lý thư mục, tệp tin | 4 | 3 | Thiếu trang cha “Tính năng chính” |
| Chia sẻ & phân quyền | 3 | 3 | Khớp |
| Máy tính & di động | 7 | 7 | Khớp |
| Làm việc nhóm | 3 | 3 | Khớp |
| Quản trị Admin | 8 | 8 | Khớp |
| **Tổng** | **31** | **30** | **Thiếu 1 file đích** |

Human đã chấp thuận thêm `02-bat-dau/tinh-nang-chinh.mdx` và đặt sau `tong-quan-giao-dien` trong `02-bat-dau/meta.json`. Trang này là overview của năm nhóm tính năng, nên vị trí cuối phần Bắt đầu tạo cầu nối tự nhiên sang các phần 03–07 mà không làm sai cấu trúc từng nhóm. Lô 0 chưa tạo file đích; quyết định này sẽ được áp dụng khi tạo skeleton ở Lô 1.

### Evidence nguồn

- `llms.txt`: 31 URL Markdown duy nhất.
- File Markdown đã tải: 31.
- File rỗng hoặc thiếu H1: 0.
- Tham chiếu ảnh GitBook duy nhất: 33.
- URL Web Portal: giữ placeholder `https://[URL_DOMAIN_CLOUD_CUA_BAN]` vì mỗi khách hàng được cung cấp domain riêng (`Q-ACCESS-01`).
- Mobile App: chỉ hướng dẫn tìm ứng dụng Nextcloud trong store, không cung cấp URL trực tiếp (`Q-MOBILE-01`).

## Quyết định Human đã ghi nhận

1. `Q-IA-01` — chấp thuận bổ sung trang đích cho “Tính năng chính”.
2. `Q-ACCESS-01` — giữ placeholder domain theo từng khách hàng.
3. `Q-MOBILE-01` — hướng dẫn tìm Nextcloud trong store, không thêm link trực tiếp.

Hiện không còn câu hỏi mở từ Lô 0. Các lô sau có thể bổ sung mã Q mới nếu phát hiện nguồn mơ hồ hoặc ảnh không tải được.

## Giới hạn và lô tiếp theo

- Chưa tạo nội dung, `meta.json`, skeleton hoặc media trong Lô 0.
- Chưa kiểm tra tải 33 ảnh; việc tải và che dữ liệu nhạy cảm được thực hiện theo từng lô nội dung.
- IA đã được chốt; Lô 1 chỉ bắt đầu khi Human yêu cầu sau bước review/commit Lô 0.

## Nghiệm thu Lô 0

- `npm run check:links`: PASS — linter xác nhận toàn bộ liên kết nội bộ MDX hợp lệ.
- `npm run check:scope`: PASS — toàn bộ file thay đổi nằm trong phạm vi TASK-020.
- `git diff --check`: PASS — exit code 0, không có lỗi whitespace trong diff được Git theo dõi.
- `npm run build`: PASS — Next.js 16.3.4 compile và TypeScript thành công, sinh 236/236 static pages. Build chỉ phát cảnh báo `metadataBase` hiện có, không làm thất bại lệnh.

## Lô 1 — Tổng quan, bắt đầu và bộ khung IA

### Trang đã hoàn thiện

1. `cloudfile/index` — Giới thiệu CloudFile ODS, bản đồ điều hướng và bảng lợi ích theo vai trò.
2. `01-tong-quan/gioi-thieu` — Khái niệm, nhóm khả năng và đối tượng sử dụng.
3. `01-tong-quan/truy-cap-he-thong` — Task guide truy cập qua Web, Desktop và Mobile.
4. `02-bat-dau/index` — Lộ trình làm quen và bảng chọn bài viết theo nhu cầu.
5. `02-bat-dau/dang-nhap` — Task guide đăng nhập, đổi mật khẩu, 2FA và đăng xuất.
6. `02-bat-dau/tong-quan-giao-dien` — Dashboard, thanh điều hướng, Files App và Settings.
7. `02-bat-dau/tinh-nang-chinh` — Trang overview đã được Human chấp thuận tại `Q-IA-01`.

### Metadata và skeleton

- Tạo đủ 12 file `meta.json` cho root và mọi thư mục trong IA, với `title` và thứ tự `pages` tương ứng mục lục GitBook.
- IA hiện có 31/31 file MDX đích tương ứng 31 trang nguồn.
- Hoàn thiện 7 trang của Lô 1; tạo 24 skeleton có frontmatter `title` và `description` cho Lô 2–4.
- Không sửa `content/docs/meta.json` hoặc vùng AI Contact Center.

### Media

- Tải 5 ảnh phục vụ Lô 1 vào `public/media/cloudfile/01-tong-quan/**` và `public/media/cloudfile/02-bat-dau/**`.
- Ảnh đăng nhập được thay bằng trạng thái trường trống; domain trên thanh địa chỉ dùng placeholder đã duyệt.
- Ảnh Dashboard và Files App được ẩn danh tên người dùng, avatar, tên tài liệu/thư mục và số dung lượng có thể nhận diện.
- Ảnh menu ứng dụng không chứa credential hoặc dữ liệu cá nhân và được giữ theo nguồn.
- Mọi ảnh được tham chiếu bằng đường dẫn local với alt tiếng Việt; không còn hotlink GitBook trong `content/docs/cloudfile/**`.
- Bản ẩn danh được tạo bằng built-in image editing; prompt chỉ yêu cầu thay dữ liệu nhận diện và giữ nguyên bố cục UI.

### Kiểm soát nội dung

- Chỉ sử dụng dữ kiện từ 7 trang GitBook tương ứng và ba quyết định Human đã ghi trong file questions.
- Bỏ emoji khỏi heading, bỏ giọng quảng cáo lặp và không thêm giá, giới hạn dung lượng hoặc URL ngoài nguồn.
- Giữ `https://[URL_DOMAIN_CLOUD_CUA_BAN]` vì mỗi khách hàng có domain riêng.
- Mobile App chỉ hướng dẫn tìm **Nextcloud** trong store, không thêm link trực tiếp.
- Không đưa tài khoản, mật khẩu hoặc tên người dùng thật vào MDX và media xuất bản.

### Nghiệm thu Lô 1

- `npm run check:links`: PASS sau khi sửa Card Tổng quan trỏ tới route `gioi-thieu` tồn tại.
- `npm run guard`: PASS.
- `npm run check:scope`: PASS.
- `git diff --check`: PASS.
- `npm run build`: PASS — compile và TypeScript thành công, sinh 326/326 static pages; cảnh báo `metadataBase` hiện có không làm thất bại build.
- Runtime port 3002: HTTP 200 cho landing CloudFile, các trang mẫu `gioi-thieu`, `truy-cap-he-thong`, `dang-nhap`, `tong-quan-giao-dien` và ảnh Dashboard local.

### Điểm dừng

- Lô 2 (`03-quan-ly-thu-muc-tep-tin`, `04-chia-se-phan-quyen`) chưa được triển khai.
- Dừng sau Lô 1 để Human kiểm tra nội dung và giao diện trước khi chuyển sang lô tiếp theo.

## Lô 2 — Quản lý dữ liệu, chia sẻ và phân quyền

### Trang đã hoàn thiện

1. `03-quan-ly-thu-muc-tep-tin/index` — tổng quan Files, lợi ích tổ chức dữ liệu và nguyên tắc xây dựng cây thư mục.
2. `03-quan-ly-thu-muc-tep-tin/tao-va-quan-ly-thu-muc` — tạo, đổi tên, di chuyển, sao chép, xóa và khôi phục thư mục.
3. `03-quan-ly-thu-muc-tep-tin/tai-len-va-quan-ly-tep-tin` — tải dữ liệu từ Web/Desktop/Mobile, xử lý trùng tên và quản lý tệp.
4. `04-chia-se-phan-quyen/index` — so sánh chia sẻ nội bộ, public link và chia sẻ theo nhóm; nguyên tắc least privilege.
5. `04-chia-se-phan-quyen/chia-se-link-cong-khai` — tạo, bảo vệ, kiểm tra và thu hồi public link.
6. `04-chia-se-phan-quyen/chia-se-noi-bo` — chia sẻ cho người dùng/nhóm, cộng tác, thay đổi và thu hồi quyền.

Hai trang overview dùng văn xuôi, Cards và bảng. Bốn trang thao tác dùng Callout “Trước khi bắt đầu”, Steps có kết quả từng bước, phần kiểm tra, Accordions xử lý sự cố và Cards liên quan.

### Media

- Tải đủ 18/18 ảnh có trong sáu trang nguồn vào `public/media/cloudfile/03-quan-ly-thu-muc-tep-tin/**` và `public/media/cloudfile/04-chia-se-phan-quyen/**`.
- Mọi ảnh được tham chiếu bằng đường dẫn local và có alt tiếng Việt; không hotlink CDN GitBook.
- Ẩn danh 10 ảnh có định danh tài khoản. Prompt edit chỉ thay `HT` bằng `NV`, tên chủ sở hữu bằng `Người dùng`, username bằng `user@congty.vn` và domain trên thanh địa chỉ bằng `URL_DOMAIN_CLOUD_CUA_BAN`; các vùng UI còn lại được yêu cầu giữ nguyên.
- Ba screenshot được gợi ý trong nguồn nhưng không có URL/tệp ảnh đã được ghi `Q-IMAGE-INTERNAL-01` thay vì tự tạo nội dung minh họa.

### Câu hỏi mở

1. `Q-FOLDER-01` — giới hạn tên thư mục và trạng thái hỗ trợ Tags.
2. `Q-UPLOAD-01` — giới hạn upload, quota và phần mở rộng bị chặn.
3. `Q-TRASH-01` — thời gian lưu dữ liệu trong Deleted files.
4. `Q-PERMISSION-01` — tên và hành vi chính xác của các mức quyền chia sẻ.
5. `Q-PUBLIC-01` — trạng thái bật Hide download, giới hạn lượt tải và thống kê truy cập.
6. `Q-IMAGE-INTERNAL-01` — ảnh đã ẩn danh cho chia sẻ nhóm, Versions và thu hồi quyền.

Các số liệu phụ thuộc cấu hình và ma trận quyền chưa nhất quán trong nguồn không được đưa thành cam kết sản phẩm. Mỗi vị trí liên quan trong nội dung đã được đánh dấu `**Cần bổ sung:**` kèm mã Q.

### Nghiệm thu Lô 2

- `npm run check:links`: PASS — toàn bộ liên kết nội bộ MDX hợp lệ.
- `npm run check:scope`: PASS — toàn bộ file thay đổi nằm trong phạm vi TASK-020.
- `git diff --check`: PASS — exit code 0.
- `npm run guard`: PASS.
- `npm run build`: PASS — compile và TypeScript thành công, sinh 326/326 static pages; cảnh báo `metadataBase` hiện có không làm thất bại build.
- Runtime port 3002: HTTP 200 cho cả 6 route Lô 2 và 2 ảnh local đại diện đã kiểm tra.

### Điểm dừng

- Lô 3 (`05-may-tinh-di-dong`) chưa được triển khai.
- Dừng sau Lô 2 để Human kiểm tra và commit trước khi tiếp tục.

## Lô 3 — Desktop Client và Mobile App

### Trang đã hoàn thiện

1. `05-may-tinh-di-dong/index` — so sánh Web Portal, Desktop Client và Mobile App theo nhu cầu sử dụng.
2. `05-may-tinh-di-dong/desktop-client/index` — tổng quan Desktop Client, Virtual Files, Sync everything và Selective Sync.
3. `05-may-tinh-di-dong/desktop-client/tai-va-cai-dat` — cài đặt trên Windows và macOS.
4. `05-may-tinh-di-dong/desktop-client/dang-nhap-va-cau-hinh` — kết nối domain, đăng nhập trình duyệt, cấp quyền và chọn chế độ đồng bộ.
5. `05-may-tinh-di-dong/desktop-client/dong-bo-thu-muc` — trạng thái sync, Virtual Files, multi-folder sync, Selective Sync và Pause/Resume.
6. `05-may-tinh-di-dong/mobile-app/index` — tổng quan Auto-upload, Document Scanner, offline và bảo mật sinh trắc học.
7. `05-may-tinh-di-dong/mobile-app/tai-cai-dat-dang-nhap` — tìm Nextcloud trong store, cài đặt, đăng nhập và cấp quyền trên điện thoại.

Ba trang overview dùng văn xuôi, Cards và bảng lựa chọn. Bốn trang thao tác dùng Callout “Trước khi bắt đầu”, Steps có kết quả từng bước, phần kiểm tra, Accordions xử lý sự cố và Cards liên quan.

### Media

- Tải đủ 7/7 ảnh có trong nguồn Lô 3 vào `public/media/cloudfile/05-may-tinh-di-dong/**`.
- Mọi ảnh được tham chiếu bằng đường dẫn local và có alt tiếng Việt; không hotlink CDN GitBook.
- Hai ảnh đăng nhập Desktop được ẩn danh domain, token, tên thiết bị, tên người dùng và avatar trình duyệt.
- Built-in image editing được dùng với prompt chỉ thay dữ liệu nhận diện bằng `URL_DOMAIN_CLOUD_CUA_BAN`, `MAY-TINH-01`, `user@congty.vn`, `user` và `NV`; các vùng giao diện khác được yêu cầu giữ nguyên.
- Nguồn chỉ ghi “Gợi ý screenshot” cho màn hình chính Mobile App nhưng không cung cấp tệp ảnh; vị trí này được ghi `Q-IMAGE-MOBILE-01`.

### Câu hỏi mở bổ sung

1. `Q-CLIENT-SYSTEM-01` — yêu cầu hệ điều hành, phần cứng, dung lượng và mạng chính thức do các số liệu nguồn chưa nhất quán.
2. `Q-SYNC-DELETE-01` — hành vi xóa hai chiều và chính sách khôi phục.
3. `Q-MOBILE-LOGIN-01` — trạng thái hỗ trợ đăng nhập Mobile App bằng QR.
4. `Q-IMAGE-MOBILE-01` — screenshot đã ẩn danh của màn hình chính Mobile App.

Mobile App tiếp tục tuân thủ quyết định `Q-MOBILE-01`: chỉ hướng dẫn tìm **Nextcloud** trong store, không tự thêm link trực tiếp. Domain tiếp tục dùng `https://[URL_DOMAIN_CLOUD_CUA_BAN]` theo `Q-ACCESS-01`.

### Nghiệm thu Lô 3

- Audit nội dung: PASS — 7 trang, 7 ảnh local, 35 `<Step>` và 35 dòng `Kết quả`, không thiếu mã Q.
- `npm run check:links`: PASS.
- `npm run guard`: PASS.
- `git diff --check`: PASS.
- `npm run build`: PASS — compile và TypeScript thành công, sinh 326/326 static pages; cảnh báo `metadataBase` hiện có không làm thất bại build.
- Runtime port 3002: HTTP 200 cho cả 7 route Lô 3 và 2 ảnh local đại diện.
- `npm run check:scope`: **FAIL do trạng thái workspace ngoài TASK-020** — phát hiện tệp untracked `HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG QUAY SỐ TỰ ĐỘNG.docx` ở root repository. Agent không tạo, sửa, xóa hoặc di chuyển tệp này vì nằm ngoài phạm vi được giao.

### Điểm dừng

- Nội dung Lô 3 đã hoàn thiện nhưng chưa thể ghi nhận nghiệm thu đầy đủ cho đến khi Human xử lý tệp `.docx` ngoài phạm vi và chạy lại `npm run check:scope`.
- Lô 4 (`06-lam-viec-nhom`, `07-quan-tri-admin`) chưa được triển khai.

## Lô 4 — Làm việc nhóm và quản trị Admin

### Trang đã hoàn thiện

1. `06-lam-viec-nhom/lam-viec-nhom` — tạo và chia sẻ lịch, danh bạ, ghi chú.
2. `06-lam-viec-nhom/nhat-ky-hoat-dong` — xem Global Activity, lịch sử từng tệp và cấu hình email thông báo.
3. `06-lam-viec-nhom/online-office` — mở, tạo và cùng chỉnh sửa tài liệu văn phòng trên trình duyệt.
4. `07-quan-tri-admin/index` — tổng quan trách nhiệm ODS Cloud và Tenant Admin, cùng bản đồ nội dung quản trị.
5. `07-quan-tri-admin/quan-ly-nguoi-dung/index` — cấu trúc định danh và vòng đời tài khoản.
6. `07-quan-tri-admin/quan-ly-nguoi-dung/tao-nguoi-dung-moi` — tạo tài khoản, gán nhóm, quota và bàn giao truy cập.
7. `07-quan-tri-admin/quan-ly-nguoi-dung/quan-ly-tai-khoan` — cập nhật thông tin, mật khẩu và trạng thái tài khoản.
8. `07-quan-tri-admin/nhom-va-phan-quyen/index` — mô hình User → Group → Quyền → Thư mục.
9. `07-quan-tri-admin/nhom-va-phan-quyen/tao-va-quan-ly-nhom` — tạo nhóm, thêm/gỡ thành viên và giao Group Admin.
10. `07-quan-tri-admin/dung-luong-quota` — theo dõi mức dùng, cấu hình quota và xử lý tài khoản đầy dung lượng.
11. `07-quan-tri-admin/nhat-ky-hoat-dong` — truy vết sự kiện, khôi phục tệp và cấu hình retention.

Ba trang overview dùng văn xuôi, bảng và Cards. Tám trang thao tác dùng Callout “Trước khi bắt đầu”, 61 `<Step>` có đủ 61 dòng `Kết quả`, phần kiểm tra, Accordions xử lý sự cố và Cards liên quan.

### Media

- Tải đủ 5/5 ảnh có trong nguồn Lô 4 vào `public/media/cloudfile/07-quan-tri-admin/**`; các trang làm việc nhóm không có ảnh nguồn.
- Mọi ảnh được tham chiếu bằng đường dẫn local, có tên kebab-case không dấu và alt tiếng Việt; không hotlink CDN GitBook.
- Cả 5 ảnh đều có định danh khách hàng nên đã được ẩn danh bằng built-in image editing.
- Prompt set cuối cùng thuộc nhóm `precise-object-edit`: chỉ thay username, email/domain và tên group thật bằng `user`, `user01`–`user03`, `user@congty.vn`, `Tai-lieu-ca-nhan` và `Kinh_Doanh`; yêu cầu giữ nguyên kích thước, bố cục, dark theme, icon, nhãn UI và vùng đánh dấu.
- Ảnh cuối được lưu tại:
  - `public/media/cloudfile/07-quan-tri-admin/quan-ly-nguoi-dung/mo-menu-account.png`
  - `public/media/cloudfile/07-quan-tri-admin/quan-ly-nguoi-dung/trang-quan-ly-nguoi-dung.png`
  - `public/media/cloudfile/07-quan-tri-admin/quan-ly-nguoi-dung/form-tao-nguoi-dung.png`
  - `public/media/cloudfile/07-quan-tri-admin/quan-ly-nguoi-dung/chinh-sua-tai-khoan.png`
  - `public/media/cloudfile/07-quan-tri-admin/nhom-va-phan-quyen/khu-vuc-quan-ly-nhom.png`

### Câu hỏi mở bổ sung

1. `Q-COLLAB-MODULES-01` — trạng thái bật Calendar, Contacts, Notes, Tasks và Deck.
2. `Q-CONTACTS-DIRECTORY-01` — cơ chế tự động đồng bộ danh bạ nhân viên.
3. `Q-ACTIVITY-NOTIFY-01` — loại sự kiện, tần suất email và cấu hình gửi mail.
4. `Q-OFFICE-01` — gói có Online Office, tự lưu và tương thích định dạng/phông chữ.
5. `Q-ADMIN-ACCOUNT-01` — username, reset mật khẩu, Disable/Enable, link chia sẻ, xóa và chuyển dữ liệu.
6. `Q-ADMIN-CREATE-01` — quy tắc mật khẩu, email kích hoạt và trường bắt buộc.
7. `Q-GROUP-ADMIN-01` — phạm vi quyền Group Admin.
8. `Q-QUOTA-01` — chính sách quota, Unlimited, ngưỡng cảnh báo và Deleted files.
9. `Q-ADMIN-LOG-01` — retention, thời gian lưu, phạm vi log và Activity App.

Các hành vi phụ thuộc cấu hình hoặc có ảnh hưởng đến quyền và dữ liệu được đánh dấu `**Cần bổ sung:**`; tài liệu không biến ví dụ dung lượng, mật khẩu hay thời gian lưu trong nguồn thành cam kết sản phẩm.

### Nghiệm thu Lô 4

- Audit nội dung: PASS — 11 trang hoàn thiện; 8 task guide có đủ 61/61 kết quả; không còn skeleton, hotlink GitBook, heading emoji hoặc định danh khách hàng trong MDX.
- `npm run check:links`: PASS — toàn bộ liên kết nội bộ MDX hợp lệ.
- `npm run guard`: PASS.
- `git diff --check`: PASS.
- `npm run build`: PASS — compile và TypeScript thành công, sinh 326/326 static pages; cảnh báo `metadataBase` hiện có không làm thất bại build.
- Runtime port 3002: HTTP 200 cho cả 11 route Lô 4 và 2 ảnh local đại diện.
- `npm run check:scope`: **FAIL do trạng thái workspace ngoài TASK-020** — vẫn chỉ phát hiện tệp untracked `HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG QUAY SỐ TỰ ĐỘNG.docx` ở root repository. Agent không tạo, sửa, xóa hoặc di chuyển tệp này.

### Điểm dừng

- Nội dung Lô 4 đã hoàn thiện nhưng chưa thể ghi nhận nghiệm thu đầy đủ cho đến khi Human xử lý tệp `.docx` ngoài phạm vi và chạy lại `npm run check:scope`.
- Lô 5 (rà liên kết chéo, hoàn thiện bài viết liên quan và điền câu trả lời Human) chưa được triển khai.

## Lô 5 — Rà soát toàn bộ và áp dụng câu trả lời Human

### Liên kết và điều hướng

- Rà đủ 31/31 trang CloudFile: mỗi trang nội dung đều có ít nhất một liên kết vào từ trang khác; trang gốc là điểm vào của cây tài liệu.
- `npm run check:links` xác nhận toàn bộ liên kết nội bộ MDX hợp lệ.
- 27 trang có mục `## Bài viết liên quan`. Bốn overview cấp cao còn lại dùng Cards điều hướng theo chức năng: trang gốc CloudFile, Bắt đầu, Tính năng chính và Tổng quan quản lý Admin.
- Bổ sung tiêu đề `## Bài viết liên quan` cho hai overview Admin trước đây có Cards nhưng thiếu nhãn: Quản lý người dùng và Nhóm và phân quyền.
- Runtime xác nhận 31/31 route CloudFile trả HTTP 200. `/llms.txt` trả HTTP 200 và chứa 31 tham chiếu CloudFile.

### Câu trả lời Human

- `Q-IA-01`: giữ trang `02-bat-dau/tinh-nang-chinh.mdx` trong IA và `meta.json`.
- `Q-ACCESS-01`: mọi hướng dẫn tiếp tục dùng `https://[URL_DOMAIN_CLOUD_CUA_BAN]`; không tạo một URL dùng chung.
- `Q-MOBILE-01`: chỉ hướng dẫn tìm **Nextcloud** trong App Store hoặc Google Play, không thêm link trực tiếp.
- Loại bỏ cách diễn đạt nội bộ “theo quyết định TASK-020/Q-MOBILE-01” khỏi hai trang public; giữ nguyên hướng dẫn đã được Human duyệt.
- File câu hỏi có 22 mã: 3 đã trả lời và 19 còn mở. Không tự điền hoặc suy đoán câu trả lời cho 19 mã còn lại.

### Audit nội dung và media

- 31/31 MDX có frontmatter `title` và `description`.
- 18/18 task guide có Callout “Trước khi bắt đầu”, Steps với số dòng `Kết quả` tương ứng, `## Kiểm tra kết quả`, `## Xử lý sự cố`, Accordions và `## Bài viết liên quan`.
- 35/35 ảnh local được tham chiếu; không có ảnh thiếu hoặc ảnh thừa trong `public/media/cloudfile/**`.
- Không có alt rỗng, emoji trong heading, hotlink GitBook CDN hoặc link từ public CloudFile sang `/internal`.
- Mọi mã Q xuất hiện trong nội dung đều có dòng đối chiếu trong `.harness/reports/TASK-020-questions.md`.
- `meta.json`: 12 file, không có MDX bị bỏ khỏi mục lục; hai mục folder không có landing page (`01-tong-quan`, `06-lam-viec-nhom`) được Fumadocs biểu diễn bằng metadata thư mục và các trang con theo IA đã duyệt.

### Nghiệm thu Lô 5

- `npm run check:links`: PASS.
- `npm run guard`: PASS.
- `git diff --check`: PASS.
- `npm run build`: PASS — compile và TypeScript thành công, sinh 326/326 static pages; cảnh báo `metadataBase` hiện có không làm thất bại build.
- Runtime port 3002: 31/31 route CloudFile HTTP 200; `/llms.txt` HTTP 200 với 31 tham chiếu CloudFile.
- `npm run check:scope`: **FAIL do trạng thái workspace ngoài TASK-020** — vẫn chỉ phát hiện tệp untracked `HƯỚNG DẪN SỬ DỤNG TÍNH NĂNG QUAY SỐ TỰ ĐỘNG.docx` ở root repository. Agent không tạo, sửa, xóa hoặc di chuyển tệp này.

### Trạng thái bàn giao

- Toàn bộ Lô 0–5 đã được triển khai về nội dung, IA, media, liên kết chéo và danh sách câu hỏi.
- Task tiếp tục giữ `status: in-progress`; chưa thể đánh dấu nghiệm thu đầy đủ vì `check:scope` chưa PASS, chưa có Pull Request/CI xanh và chưa có Human finalization.
- Không push, không mở Pull Request và không thao tác file `.docx` ngoài phạm vi.

## Hiệu chỉnh sau nghiệm thu — Card icon

### Nguyên nhân

- Runtime cho thấy các giá trị như `UserCog`, `Trash2` và `MonitorSmartphone` bị hiển thị thành chữ trong Card.
- `src/components/mdx.tsx` chỉ chuyển 22 tên icon đã đăng ký thành Lucide component; tên ngoài danh sách được truyền nguyên dạng và Fumadocs render thành text.
- `src/**` nằm ngoài phạm vi TASK-020, vì vậy không thay đổi wrapper dùng chung.

### Thay đổi

- Chuẩn hóa 100 thuộc tính `icon` trên 29 trang CloudFile sang 14 tên đã được wrapper hỗ trợ.
- Giữ ý nghĩa gần nhất, ví dụ: `UserCog` → `Settings`, `Trash2` → `Activity`, `MonitorSmartphone` → `Settings`, `FolderTree` → `GitFork`, `FileUp` → `Upload`.
- Audit sau sửa: 100 Card icon, 14 tên duy nhất, 0 tên không được hỗ trợ.

### Kiểm chứng

- `npm run check:links`: PASS.
- `npm run guard`: PASS.
- `git diff --check`: PASS.
- `npm run build`: PASS — 326/326 static pages.
- Runtime port 3002: bốn trang đại diện ở root, quản lý tệp, máy tính/di động và quota đều HTTP 200; HTML có SVG và không còn chuỗi tên icon không hợp lệ.
- `npm run check:scope`: vẫn FAIL duy nhất do tệp `.docx` untracked ngoài TASK-020; không liên quan đến hiệu chỉnh icon.

## Bàn giao Git

- Rebase nhánh `task/TASK-020-cloudfile-docs` lên `origin/main` tại `b7b8f26` trước khi push; `origin/main` là ancestor của commit triển khai.
- Commit triển khai: `74acc44` (`docs(task-020): migrate CloudFile user guide`).
- Remote branch: `origin/task/TASK-020-cloudfile-docs`, xác nhận cùng SHA `74acc44` sau push.
- `npm run verify`: PASS sau rebase — typecheck, env, links, guard và build 326/326.
- `check:scope`: PASS trong worktree sạch checkout từ đúng commit/branch CI; worktree kiểm chứng tạm đã được xóa sau khi dùng.
- `npm run test:routes`: PASS 12/12 — public routes HTTP 200 và internal routes HTTP 401 đúng kỳ vọng.
- Pull Request chưa được tạo tại thời điểm ghi nhận vì phiên chưa có GitHub connector và máy không cài `gh`; không tuyên bố PR/CI khi chưa có bằng chứng từ GitHub.
- Task giữ `status: in-progress` cho đến khi PR tồn tại, CI xanh và Human finalization theo quy định repository.
