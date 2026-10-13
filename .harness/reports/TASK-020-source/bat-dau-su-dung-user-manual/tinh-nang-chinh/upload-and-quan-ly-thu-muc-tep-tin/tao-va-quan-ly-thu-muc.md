> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/upload-and-quan-ly-thu-muc-tep-tin/tao-va-quan-ly-thu-muc.md).

# Tạo và Quản lý Thư mục

Hướng dẫn toàn diện cách **tạo, tổ chức, di chuyển và quản lý thư mục** trong CloudFile để xây dựng hệ thống lưu trữ khoa học, dễ tìm kiếm và dễ bảo trì cho doanh nghiệp.

## 📁 Phần 1: Tạo Thư Mục Mới

### 🖱️ Cách 1: Dùng nút "New Folder"

{% stepper %}
{% step %}

### Bước 1️⃣ – Điều hướng đến vị trí cần tạo

* Đăng nhập vào CloudFile.
* Vào mục **Files** trên thanh menu.
* Mở thư mục cha nơi bạn muốn tạo thư mục con, ví dụ:
  * `My files` (không gian cá nhân).
  * `Team folders / Shared` (không gian dùng chung).

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2F9kZTmZcyJTNyTWcavgwF%2Fimage.png?alt=media&amp;token=96b3bc64-873f-47ee-806b-62dd191fb53a" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Mẹo: Click vào breadcrumb (đường dẫn phía trên) để nhảy nhanh giữa các cấp thư mục.
{% endhint %}
{% endstep %}

{% step %}

### Bước 2️⃣ – Nhấn nút "+" hoặc "New"

* Tìm nút **+** (Plus) hoặc **New** ở phía trên danh sách file.
* Click vào đó để mở menu dropdown.
* Chọn **New folder** / **Tạo thư mục mới**.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FU7TqWQ8zJ86PQGrvakRH%2Fimage.png?alt=media&amp;token=29f592cc-0955-46f3-a0c9-98cc8dc5dc58" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Bước 3️⃣ – Đặt tên thư mục

* Một ô nhập tên sẽ xuất hiện (inline hoặc popup tuỳ giao diện).
* Nhập tên thư mục có ý nghĩa, ví dụ:
  * `2026_Bao_Cao_Tai_Chinh`
  * `Du_An_Website_ABC`
  * `Khach_Hang_XYZ_Corp`
* Nhấn **Enter** hoặc **Create** để hoàn tất.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FpZMiiC9vAym7mA23zleU%2Fimage.png?alt=media&amp;token=d984d209-383c-4eaf-af44-3c5d5e81acba" alt=""><figcaption></figcaption></figure>

Kết quả: Thư mục mới xuất hiện trong danh sách hiện tại.

{% hint style="warning" %}
Lưu ý khi đặt tên:

* Không dùng ký tự đặc biệt: `/ \ : * ? " < > |`
* Tránh tên quá dài (>50 ký tự).
* Không đặt tên chung chung: "New folder", "Thư mục mới", "Untitled".
* Nên dùng tiếng Việt không dấu hoặc tiếng Anh để tránh lỗi sync trên một số hệ thống cũ.
  {% endhint %}
  {% endstep %}
  {% endstepper %}

### 🖱️ Cách 2: Tạo nhiều thư mục nhanh (Bulk creation)

Nếu cần tạo nhiều thư mục cùng lúc (VD: 12 tháng trong năm):

* Tuỳ chọn A: Tạo thủ công tuần tự — lặp lại quy trình "New folder" nhiều lần.
* Tuỳ chọn B: Dùng Desktop Client — tạo cấu trúc thư mục trên máy tính local và để Desktop Client tự động sync lên CloudFile.
* Tuỳ chọn C: Upload folder có sẵn — chuẩn bị cấu trúc thư mục trên máy và upload cả thư mục cha (bao gồm toàn bộ thư mục con) lên CloudFile.

Gợi ý: Với dự án lớn (>20 thư mục), nên thiết kế trên giấy/Excel trước, sau đó tạo một lần bằng cách B hoặc C.

## 📂 Phần 2: Quản Lý Thư Mục

### ✏️ Đổi tên thư mục (Rename)

{% stepper %}
{% step %}

### Khi nào cần đổi tên?

* Tên cũ không rõ nghĩa.
* Thay đổi quy ước đặt tên của công ty.
* Sửa lỗi chính tả.
  {% endstep %}

{% step %}

### Các bước thực hiện

1. Tìm thư mục cần đổi tên trong danh sách Files.
2. Click vào biểu tượng **⋮** (ba chấm dọc) hoặc **chuột phải** vào thư mục.
3. Chọn **Rename** / **Đổi tên**.
4. Nhập tên mới.
5. Nhấn **Enter** hoặc **Save**.

Kết quả: Tên thư mục được cập nhật ngay lập tức.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2Fe0XvJtL7yGWVrFPRzeX4%2Fimage.png?alt=media&amp;token=cb7375b4-713d-471b-bf18-6a922a97db94" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Lưu ý

* Nếu thư mục đang được chia sẻ hoặc có link public, **đường dẫn không thay đổi** (CloudFile dùng ID nội bộ).
* Đổi tên thư mục dùng chung: nên thông báo team trước để tránh nhầm lẫn.
  {% endstep %}
  {% endstepper %}

### 🚚 Di chuyển thư mục (Move)

{% stepper %}
{% step %}

### Khi nào cần di chuyển?

* Sắp xếp lại cấu trúc tổ chức.
* Chuyển thư mục từ không gian cá nhân sang không gian chung (hoặc ngược lại).
* Gộp dữ liệu từ nhiều nguồn.
  {% endstep %}

{% step %}

### Cách 1: Kéo thả (Drag & Drop)

1. Click giữ thư mục cần di chuyển.
2. Kéo vào thư mục đích trong sidebar hoặc danh sách.
3. Thả chuột khi thấy hiệu ứng "drop here".

Ưu điểm: Nhanh, trực quan, phù hợp với thao tác đơn giản.
{% endstep %}

{% step %}

### Cách 2: Dùng menu "Move to…"

1. Click vào **⋮** của thư mục.<br>

   <figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FPbJ4Ng3LQAZABn82Be3y%2Fimage.png?alt=media&amp;token=5a1195fa-7786-46f7-9f16-da4afc634cb7" alt=""><figcaption></figcaption></figure>
2. Chọn **Move** hoặc **Move to…**.
3. Một hộp thoại xuất hiện để chọn thư mục đích.
4. Điều hướng đến vị trí mong muốn.
5. Click **Move** / **Di chuyển**.

Ưu điểm: Chính xác, phù hợp khi cần di chuyển xa (nhiều cấp).

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FixJaI7qy6iBlREaIgc26%2Fimage.png?alt=media&amp;token=c8dc0e7e-3b20-4b42-8147-b936b15967f7" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Lưu ý

* Di chuyển thư mục lớn (>1000 file) có thể mất thời gian.
* Nếu di chuyển thư mục dùng chung: kiểm tra lại quyền truy cập sau khi di chuyển.
  {% endstep %}
  {% endstepper %}

### 📋 Sao chép thư mục (Copy)

{% stepper %}
{% step %}

### Khi nào cần sao chép?

* Tạo backup trước khi chỉnh sửa lớn.
* Nhân bản template thư mục cho dự án mới.
* Chia sẻ cấu trúc thư mục cho team khác.
  {% endstep %}

{% step %}

### Các bước thực hiện

1. Click vào **⋮** của thư mục.
2. Chọn **Copy** hoặc **Duplicate**.
3. Chọn thư mục đích (có thể là cùng vị trí hoặc vị trí khác).
4. Xác nhận.

Kết quả: Thư mục mới được tạo với tên `Tên_Copy` hoặc `Tên (2)`.<br>
{% endstep %}

{% step %}

### Mẹo

Sau khi copy, đổi tên ngay để tránh nhầm lẫn.
{% endstep %}
{% endstepper %}

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FUtXQw8n4o6rsmlogdsnS%2Fimage.png?alt=media&amp;token=d0113115-5f0c-4b30-b327-40ee46fb06be" alt=""><figcaption></figcaption></figure>

### 🗑️ Xoá thư mục (Delete)

{% stepper %}
{% step %}

### Khi nào cần xoá?

* Dự án đã hoàn thành và đã backup ngoài.
* Thư mục trùng lặp hoặc không còn dùng.
* Dọn dẹp để giải phóng dung lượng.
  {% endstep %}

{% step %}

### Các bước xoá

1. Click vào **⋮** của thư mục.
2. Chọn **Delete** / **Xoá**.
3. Xác nhận trong hộp thoại cảnh báo.

Kết quả: Thư mục được chuyển vào **Trash / Thùng rác**.<br>

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2Fgiv09bEbXfUijNvWUS9y%2Fimage.png?alt=media&amp;token=f04a4b8c-bbc0-4caa-b50d-52b500226886" alt=""><figcaption></figcaption></figure>

<br>
{% endstep %}

{% step %}

### Cảnh báo quan trọng

* Xoá thư mục sẽ xoá **toàn bộ nội dung bên trong** (file + thư mục con).
* Với thư mục dùng chung: **thông báo team trước** để tránh mất dữ liệu đang làm việc.
* Kiểm tra kỹ trước khi xoá vĩnh viễn khỏi Trash.

Khôi phục thư mục từ Trash:

1. Vào **Trash** / **Thùng rác** (trong sidebar Files).
2. Tìm thư mục đã xoá.
3. Click **Restore** / **Khôi phục**.

Thư mục sẽ quay về vị trí ban đầu.

Lưu ý: Trash thường tự xoá sau 30 ngày (tuỳ cấu hình). Hãy khôi phục sớm nếu cần.
{% endstep %}
{% endstepper %}

### ⭐ Đánh dấu thư mục quan trọng (Favorites)

* Click vào biểu tượng **sao ⭐** bên cạnh tên thư mục.
* Thư mục sẽ xuất hiện trong **Favorites** (sidebar).

Lợi ích: Truy cập nhanh mà không cần điều hướng qua nhiều cấp.

### 🏷️ Gắn tag / nhãn cho thư mục (nếu hỗ trợ)

Tuỳ gói dịch vụ, CloudFile có thể hỗ trợ **tags** (nhãn):

* Gắn tag: `urgent`, `archive`, `2026`, `confidential`…
* Tìm kiếm theo tag thay vì điều hướng thủ công.

## 🏗️ Phần 3: Thiết Kế Cấu Trúc Thư Mục Chuẩn

### 🧩 Nguyên tắc thiết kế

1. **Rõ ràng và logic**: Ai nhìn vào cũng hiểu ngay mục đích.
2. **Phân cấp hợp lý**: Không quá sâu (tối đa 3–4 cấp), không quá nông.
3. **Nhất quán**: Toàn công ty dùng chung một mẫu.
4. **Dễ mở rộng**: Thêm phòng ban/dự án mới không phá vỡ cấu trúc cũ.
5. **Kết hợp phân quyền**: Mỗi thư mục lớn tương ứng với một nhóm quyền.

### 📊 Mẫu 1: Theo Phòng Ban (Departments)

```
CloudFile Root/
├── 01_Hanh_Chinh_Nhan_Su/
│   ├── 2024/
│   │   ├── Ho_So_Nhan_Vien
│   │   └── Chinh_Sach_Noi_Bo
│   └── 2025/
│       ├── Ho_So_Nhan_Vien
│       └── Chinh_Sach_Noi_Bo
├── 02_Tai_Chinh_Ke_Toan/
│   ├── 2024/
│   │   ├── Bao_Cao_Tai_Chinh
│   │   ├── Hoa_Don_Chung_Tu
│   │   └── Thue
│   └── 2025/
├── 03_Kinh_Doanh/
│   ├── Khach_Hang_A/
│   ├── Khach_Hang_B/
│   └── Bao_Cao_Ban_Hang/
├── 04_Marketing/
│   ├── Campaign_2024/
│   ├── Campaign_2025/
│   └── Tai_Nguyen_Thiet_Ke/
└── 05_IT/
    ├── Tai_Lieu_Ky_Thuat/
    ├── Huong_Dan_Nguoi_Dung/
    └── Backup_Scripts/
```

Phù hợp: SME, doanh nghiệp truyền thống có cơ cấu phòng ban rõ ràng.

## ⚠️ Xử Lý Sự Cố Liên Quan Thư Mục

<details>

<summary>1. Không thấy nút tạo thư mục</summary>

Nguyên nhân:

* Bạn chỉ có quyền **Read-only** trong thư mục đó.

Cách xử lý:

* Liên hệ Admin/Group Admin để được cấp quyền **Write**.
* Hoặc tạo thư mục trong không gian cá nhân (`My files`) trước, sau đó di chuyển vào nếu được phép.

</details>

<details>

<summary>2. Thư mục không hiển thị trên Desktop/Mobile Client</summary>

Nguyên nhân:

* Client chưa sync kịp.
* Thư mục chưa được chọn trong cài đặt sync.

Cách xử lý:

* Nhấn **Refresh/Sync now** trên client.
* Kiểm tra phần **Selective sync** trong cài đặt client.
* Đảm bảo thư mục nằm trong phạm vi được đồng bộ.

</details>

<details>

<summary>3. Di chuyển thư mục bị lỗi / quá lâu</summary>

Nguyên nhân:

* Thư mục có quá nhiều file (>1000).
* Lỗi quyền truy cập ở thư mục đích.
* Lỗi mạng.

Cách xử lý:

* Kiểm tra quyền của bạn ở thư mục đích.
* Thử di chuyển từng thư mục con thay vì toàn bộ.
* Liên hệ Admin nếu lỗi kéo dài.

</details>

<details>

<summary>4. Xoá nhầm thư mục quan trọng</summary>

Cách xử lý:

1. Vào **Trash** ngay lập tức.
2. Tìm thư mục đã xoá.
3. Click **Restore**.

Lưu ý: Trash tự xoá sau 30 ngày (tuỳ cấu hình). Hãy khôi phục càng sớm càng tốt.

Nếu đã bị xoá vĩnh viễn:

* Liên hệ Service Provider để xem có backup hệ thống không.
* Khôi phục từ Desktop Client nếu bạn đã sync về máy.

</details>

{% hint style="success" %}
Mẹo cuối: Cấu trúc thư mục tốt = nền tảng cho quản lý dữ liệu hiệu quả. Đầu tư thời gian thiết kế đúng từ đầu sẽ tiết kiệm hàng trăm giờ sau này!
{% endhint %}
