> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/cai-dat-and-su-dung-tren-may-tinh-di-dong/desktop-client/dang-nhap-and-cau-hinh-ban-dau.md).

# Đăng nhập & cấu hình ban đầu

Sau khi cài đặt Desktop Client thành công, trang này hướng dẫn chi tiết cách **đăng nhập tài khoản CloudFile** và **cấu hình ban đầu** để bắt đầu đồng bộ file.

Thông tin cần chuẩn bị:

* URL server CloudFile (VD: `https://cloudfile.company.com`)
* Username hoặc Email
* Mật khẩu (hoặc SSO nếu công ty dùng)

Khi nào cần:

* Lần đầu cài đặt Desktop Client.
* Kết nối thêm tài khoản mới.
* Cấu hình lại sau khi reset.

{% hint style="warning" %}
⚠️ Lưu ý quan trọng:

❗ **URL server phải chính xác**

* Sai URL = không kết nối được
* Format đúng: `https://cloudfile.yourcompany.com`
* Không cần thêm `/index.php` hay đường dẫn khác

❗ **Lần sync đầu tiên mất nhiều thời gian**

* 10 GB dữ liệu \~ 30-60 phút (tuỳ mạng)
* Không tắt máy trong khi sync

❗ **Chọn vị trí thư mục sync cẩn thận**

* Không nên đặt trong `Desktop` (lộn xộn)
* Không đặt trong thư mục OneDrive/Dropbox (xung đột)
* Khuyến nghị: `C:\Users\YourName\CloudFile\` (Windows) hoặc `~/CloudFile/` (Mac/Linux)
  {% endhint %}

## 1. Kết nối đến máy chủ và đăng nhập

{% stepper %}
{% step %}

### Bước 1 – Mở Desktop Client

Sau khi cài đặt, Desktop Client thường **tự động khởi chạy**. Nếu không:

Windows:

* Start Menu → gõ **"Nextcloud"** → Enter.
* Hoặc click **icon Nextcloud** trong system tray (góc dưới phải).

macOS:

* Finder → Applications → double-click **Nextcloud.app**.
* Hoặc click **icon Nextcloud** ở Menu Bar (góc trên phải).
  {% endstep %}

{% step %}

### Bước 2 – Màn hình Welcome

Khi mở lần đầu, bạn sẽ thấy **Setup Wizard**:

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FR23dj7zmCQ1CYjMS6Q8t%2Fimage.png?alt=media&amp;token=114aee93-0bc1-4eaf-9ef7-54dc457a39b0" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Bước 3 – Nhập URL Server

1. Trong ô **"Server Address"**, nhập URL server CloudFile của công ty:

```
https://cloudfile.yourcompany.com
```

2. Click **"Next"** / **"Tiếp theo"**.

> Mẹo: Nếu không biết URL, liên hệ IT Support hoặc xem email onboarding.

Sau khi xác minh server, Desktop Client sẽ **mở trình duyệt** để đăng nhập.
{% endstep %}

{% step %}

### Bước 4 – Đăng Nhập Qua Trình Duyệt

Desktop Client mở tab mới trong trình duyệt mặc định:

```
Browser URL:
https://cloudfile.yourcompany.com/index.php/login/flow
```

Trang đăng nhập xuất hiện.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2Fu9MEjenRYxoLlhesHsB1%2Fimage.png?alt=media&amp;token=6f9def3d-2086-40e0-af11-e1a2b1d58b80" alt=""><figcaption></figcaption></figure>

#### Đăng nhập bằng Username/Password (Thông thường)

**A. Nhập thông tin đăng nhập**

1. Trên trang web, điền:

```
Username or email: _________________
Password:          _________________
```

2. Ví dụ:

* Username: `long.huynh` hoặc `long.huynh@company.com`
* Password: `YourSecurePassword123!`

3. Click **"Log in"** / **"Đăng nhập"**.

**B. Cấp quyền truy cập (Grant Access)**

Sau khi đăng nhập thành công, trang yêu cầu **cấp quyền** cho Desktop Client:

* Giải thích quyền:
  * **File access**: Cho phép Desktop Client đọc/ghi file trên cloud.
  * **WebDAV access**: Cho phép đồng bộ file (giao thức sync).<br>

    <figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2Fujm3lNZ9klDRmHcmYGu9%2Fimage.png?alt=media&amp;token=9a5f26a4-deda-4bdb-8829-1b2196bc5533" alt=""><figcaption></figcaption></figure>

Hành động:

1. Đọc thông tin: **Username** và **Device name** (tên máy của bạn).
2. Click **"Grant Access"** / **"Cấp quyền"**.

**C. Xác nhận kết nối thành công**

Sau khi cấp quyền, trang hiển thị:

```
✅ Success!

You can now close this window and return to the Nextcloud Desktop Client.
```

Hành động:

* **Đóng tab trình duyệt**.
* Quay lại **Desktop Client** (tự động chuyển sang bước tiếp theo).
  {% endstep %}
  {% endstepper %}

## 2. Thiết lập Thư mục đồng bộ

### Đồng bộ Nextcloud Client là gì (và khác gì “tải file về”)

Khi cài Nextcloud Desktop Client, bạn sẽ có một **thư mục đồng bộ (local folder)** trên máy. Client sẽ:

* **Tải xuống** các file/folder đã chọn từ Nextcloud về máy.
* Khi bạn **thêm/sửa/xóa** file trong thư mục đó → client tự **đẩy thay đổi lên server**.
* Khi ai đó thay đổi trên server → client tự **kéo về máy**.

👉 Điểm quan trọng: đồng bộ là **2 chiều** (two-way). Nếu bạn xóa file trong thư mục sync thì *thường cũng sẽ xóa trên Nextcloud* (tùy quyền & chính sách server).

Đây là bước quyết định cách dữ liệu được lưu trên máy bạn. Bạn sẽ thấy 2 lựa chọn (hoặc màn hình Setup Sync Folder):

{% stepper %}
{% step %}

### Lựa chọn: Virtual Files (Khuyên dùng)

* Hệ thống thường mặc định chọn chế độ này.
* Cách hoạt động: Bạn nhìn thấy toàn bộ file, nhưng chúng **không chiếm dung lượng ổ cứng**. Khi bạn mở file nào, hệ thống mới tải file đó về.
* Lợi ích: Tiết kiệm hàng chục GB dung lượng cho máy tính.
* Khuyên dùng cho: Hầu hết mọi người dùng văn phòng.
  {% endstep %}

{% step %}

### Lựa chọn: Đồng bộ tất cả (Sync everything)

* Cách hoạt động: Tải **toàn bộ** dữ liệu từ server về máy tính.
* Nhược điểm: Tốn rất nhiều dung lượng ổ cứng và thời gian tải ban đầu.
* Khuyên dùng cho: Người cần đi công tác vùng sâu vùng xa không có Internet trong thời gian dài.
  {% endstep %}
  {% endstepper %}

Vị trí lưu thư mục\
Mặc định hệ thống tạo thư mục `Nextcloud` (hoặc CloudFile) tại `C:\Users\[TenBan]\Nextcloud`. Nếu ổ C của bạn đầy, bạn có thể bấm vào đường dẫn đó để đổi sang ổ D hoặc E.

👉 Cuối cùng, nhấn **Connect (Kết nối)** để hoàn tất.
