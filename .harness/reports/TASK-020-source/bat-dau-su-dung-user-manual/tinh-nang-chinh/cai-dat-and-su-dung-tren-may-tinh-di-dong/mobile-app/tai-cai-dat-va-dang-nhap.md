> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/cai-dat-and-su-dung-tren-may-tinh-di-dong/mobile-app/tai-cai-dat-va-dang-nhap.md).

# Tải, cài đặt và Đăng nhập

Hướng dẫn chi tiết cách **tải, cài đặt và đăng nhập** Nextcloud Mobile App trên điện thoại Android và iOS, giúp bạn truy cập file mọi lúc mọi nơi.

**Chuẩn bị:**

* Điện thoại Android 6.0+ hoặc iOS 13.0+
* Kết nối WiFi hoặc 4G/5G
* Server URL Nextcloud (VD: `https://cloudfile.company.com`)
* Username & Password (hoặc tài khoản SSO)

## Cài đặt ứng dụng

### Phần 1: Tải & Cài Đặt (Android)

{% stepper %}
{% step %}

### Mở Google Play Store

* Trên màn hình Home, tìm icon **Google Play Store**.
* Tap vào icon để mở.
  {% endstep %}

{% step %}

### Tìm Kiếm "Nextcloud" và cài đặt

* Tap vào **thanh tìm kiếm** ở trên cùng.
* Gõ: **"Nextcloud"**
* Tap **Search** / **Tìm kiếm** (icon kính lúp).
* Chọn app đầu tiên: **"Nextcloud"** (không phải Nextcloud Talk).
* Sau khi tải xong, app tự động **cài đặt**.
* Nút "Install" chuyển thành **"Open"** / **"Mở"**.
  {% endstep %}

{% step %}

### Mở App Lần Đầu

* Tap nút **"Open"** / **"Mở"**.
* Hoặc thoát Play Store, tìm icon **Nextcloud** trên màn hình Home, tap vào.
* App khởi chạy, hiển thị màn hình **Welcome**.
  {% endstep %}
  {% endstepper %}

### 🍎 Phần 2: Tải & Cài Đặt (iOS)

{% stepper %}
{% step %}

### Mở App Store

* Trên màn hình Home, tìm icon **App Store**.
* Tap vào icon để mở.
  {% endstep %}

{% step %}

### Tìm Kiếm "Nextcloud"

* Tap vào **tab "Search"** / **"Tìm kiếm"** (icon kính lúp) ở dưới cùng.
* Gõ **"Nextcloud"** và chọn app đầu tiên: **"Nextcloud"**.\
  ![](https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FlilH9eBBfK4IkZ3kiHc0%2Fimage.png?alt=media\&token=95c9a77a-f005-42db-a4d6-89055d5f9e79)
  {% endstep %}

{% step %}

### Cài Đặt App

* Trên trang app, tap nút **"GET"** / **"Tải"**.
* Sau khi tải xong, icon thay đổi thành **"OPEN"** / **"Mở"**.
* Icon Nextcloud xuất hiện trên **màn hình Home**.
  {% endstep %}

{% step %}

### Mở App Lần Đầu

* Tap nút **"OPEN"** / **"Mở"**.
* Hoặc thoát App Store, tìm icon **Nextcloud** trên màn hình Home, tap vào.
* App khởi chạy, hiển thị màn hình **Welcome**.\
  ![](https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2Fx3rHoxPYMNv5axjl4qOq%2Fimage.png?alt=media\&token=2e6569a8-7782-4723-8d8d-4cdce0b9b965)
  {% endstep %}
  {% endstepper %}

## 🔐 Đăng Nhập Tài Khoản&#x20;

Bạn không cần phải gõ địa chỉ máy chủ dài dòng hay nhập mật khẩu phức tạp trên bàn phím điện thoại. Hãy sử dụng tính năng **Quét mã QR (Log in with QR Code)**.

{% stepper %}
{% step %}

### Bước 1: Mở ứng dụng Nextcloud Mobile App

* Chạm vào biểu tượng **Nextcloud** trên điện thoại
* Màn hình chào mừng xuất hiện

👉 Chọn **Log in / Đăng nhập**
{% endstep %}

{% step %}

### Bước 2: Nhập **địa chỉ Server (Server address)**

Tại màn hình **Server address**:

* Nhập **đúng địa chỉ Nextcloud do công ty cung cấp**\
  Ví dụ:

  ```
  https://cloud.tencongty.vn
  ```

#### ⚠️ Lưu ý rất quan trọng

* ✅ Bắt buộc có `https://`
* ❌ Không nhập:
  * `http://...`
  * `192.168.x.x`
  * `cloud.local`
* ❌ Không thêm `/login`, `/index.php`, `/apps`

➡️ Sau khi nhập xong → nhấn **Next / Continue**
{% endstep %}

{% step %}

### Bước 3: Nhập Username & Password

Tại màn hình đăng nhập:

* **Username**: tài khoản do công ty cấp\
  (ví dụ: `long.huynh`)
* **Password**: mật khẩu tương ứng

➡️ Nhấn **Log in / Đăng nhập**
{% endstep %}

{% step %}

### Bước 4 : Hoàn tất đăng nhập & đồng bộ ban đầu

Sau khi đăng nhập thành công:

* App bắt đầu **đồng bộ dữ liệu**
* Hiển thị:
  * File
  * Thư mục
  * Dung lượng đã dùng

⏳ Lần đầu có thể chậm hơn (tùy số lượng dữ liệu & mạng)
{% endstep %}
{% endstepper %}

## Cấp Quyền Truy Cập Hệ Thống

Sau khi đăng nhập thành công, app yêu cầu **quyền truy cập** các tính năng của điện thoại.

### A. Quyền Storage / Files (Android & iOS)

Cách xử lý:

* **Android:** Tap **"Allow"** / **"Cho phép"**.
* **iOS:**
  * Tap **"Allow Access to All Photos"** (khuyến nghị) để auto-upload mọi ảnh.
  * Hoặc **"Select Photos..."** nếu chỉ muốn upload một số ảnh cụ thể.

{% hint style="info" %}
Tại sao cần quyền này?\
Để app có thể upload ảnh/video từ Camera Roll lên cloud (tính năng auto-upload).
{% endhint %}

### B. Quyền Camera (Android & iOS)

Cách xử lý: Tap **"Allow"** / **"Cho phép"**.

{% hint style="info" %}
Tại sao cần quyền này?\
Để dùng tính năng **Document Scanner** (chụp ảnh giấy tờ → lưu PDF).
{% endhint %}

### C. Quyền Notifications (Android & iOS)

Cách xử lý: Tap **"Allow"** / **"Cho phép"**.

{% hint style="info" %}
Tại sao cần quyền này?\
Để nhận thông báo khi:

* File mới được chia sẻ với bạn.
* Upload/download hoàn tất.
* Có thông báo từ admin.
  {% endhint %}

### D. Quyền Location (Tuỳ chọn - iOS)

Cách xử lý:

* Nếu muốn **gắn vị trí vào ảnh**: Tap **"Allow While Using App"**.
* Nếu **không cần**: Tap **"Don't Allow"**.

## Màn Hình Chính (Home Screen)

Sau khi cấp quyền, app hiển thị **màn hình chính**.

Giải thích các phần chính:

* **☰ Menu:** Mở sidebar (Settings, Account info...).
* **🔍 Search:** Tìm kiếm file.
* **⋮ More:** Menu thêm tuỳ chọn.
* **📁 Thư mục:** Tap vào để mở.
* **📄 File:** Tap vào để xem.
* **(+) Nút Add:** Upload file, chụp ảnh, quét tài liệu.
* **Bottom tabs:** Files, Upload, Shares, More.

{% hint style="info" %}
Gợi ý screenshot:<br>
{% endhint %}
