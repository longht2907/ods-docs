> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/cai-dat-and-su-dung-tren-may-tinh-di-dong/desktop-client/tai-and-cai-dat-win-mac.md).

# Tải & cài đặt (Win/Mac)

Hướng dẫn chi tiết cách **tải xuống và cài đặt Nextcloud Desktop Client** trên Windows, macOS để đồng bộ file tự động giữa máy tính và CloudFile.

{% hint style="warning" %}
Trước khi cài đặt:

* ❗ Đóng các chương trình đang chạy (đặc biệt: Microsoft Office, Adobe, Antivirus) — tránh xung đột khi cài đặt.
* ❗ Tắt Antivirus tạm thời (nếu cần). Một số antivirus chặn installer — nhớ bật lại sau khi cài xong.
* ❗ Kiểm tra phiên bản OS:
  * Windows: Win 10 64-bit trở lên
  * macOS: 10.14 (Mojave) trở lên
  * Linux: Ubuntu 20.04+, Debian 10+, Fedora 35+
    {% endhint %}

## 💻 Phần 1: Cài Đặt trên Windows

### Yêu Cầu Hệ Thống

| Thành phần     | Yêu cầu tối thiểu   | Khuyến nghị            |
| -------------- | ------------------- | ---------------------- |
| **OS**         | Windows 10 (64-bit) | Windows 10/11 (64-bit) |
| **RAM**        | 2 GB                | 4 GB+                  |
| **CPU**        | Dual-core 1.5 GHz   | Quad-core 2.0 GHz+     |
| **Dung lượng** | 500 MB trống        | 1 GB+                  |
| **Kết nối**    | 5 Mbps              | 10 Mbps+               |

{% stepper %}
{% step %}

### Bước 1 – Tải File Cài Đặt

1. Mở trình duyệt, truy cập trang chính thức Nextcloud:

   ```
   https://nextcloud.com/install/#install-clients
   ```
2. Click vào nút **"Download for Windows"** hoặc **"Desktop Client for Windows"**.
3. File tải về có tên dạng:

   ```
   Nextcloud-3.x.x-x64.msi
   ```
4. Lưu file vào thư mục **Downloads** (hoặc nơi bạn dễ tìm).

Mẹo: Kiểm tra phiên bản mới nhất trước khi tải. Phiên bản hiện tại (01/2026): \~3.11.x
{% endstep %}

{% step %}

### Bước 2 – Chạy File Cài Đặt

1. Mở thư mục **Downloads**, tìm file `Nextcloud-3.x.x-x64.msi`.
2. **Double-click** vào file để chạy installer.
3. Nếu xuất hiện cảnh báo **"User Account Control (UAC)"**:

   ```
   Do you want to allow this app to make changes to your device?
   ```

   → Click **"Yes"** / **"Có"**.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FnfhjQ2QANzluspbjFGdQ%2Fimage.png?alt=media&amp;token=8005967a-7567-4500-ae4e-5b8fc37194df" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Bước 3 – Chạy Wizard Cài Đặt

#### Màn hình 1: Welcome

* Màn hình chào mừng hiển thị:

  ```
  Welcome to Nextcloud Desktop Client Setup
  ```
* Click **"Next"** / **"Tiếp theo"**.

#### Màn hình 2: License Agreement

* Đọc (hoặc cuộn qua) thỏa thuận bản quyền.
* Tick vào checkbox:

  ```
  ☑ I accept the terms in the License Agreement
  ```
* Click **"Next"**.

#### Màn hình 3: Installation Location

* Chọn thư mục cài đặt (mặc định):

  ```
  C:\Program Files\Nextcloud\
  ```
* Khuyến nghị: Giữ mặc định, không cần thay đổi.
* Click **"Next"**.

Lưu ý: Nếu ổ C: đầy, có thể chọn ổ khác (VD: `D:\Program Files\Nextcloud\`).

#### Màn hình 4: Ready to Install

* Xác nhận thông tin (thư mục cài đặt, dung lượng cần thiết).
* Click **"Install"** để bắt đầu cài đặt.
* Tiến trình cài đặt chạy (thanh progress bar). Chờ 1-3 phút.

#### Màn hình 5: Completion

* Cài đặt hoàn tất, hiển thị:

  ```
  ✅ Nextcloud has been successfully installed!
  ```
* Có checkbox:

  ```
  ☑ Launch Nextcloud Desktop Client
  ```
* Để tick, sau đó click **"Finish"** / **"Hoàn tất"**.
* Desktop Client sẽ tự động khởi chạy.<br>

  <figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FNGISpIzrv8jLKF3ZbMtY%2Fimage.png?alt=media&amp;token=f568b215-cf6f-4502-a804-130996fdf705" alt=""><figcaption></figcaption></figure>

{% endstep %}

{% step %}

### Bước 4 – Xác Minh Cài Đặt Thành Công

Sau khi click "Finish":

1. **System tray** (khay hệ thống góc dưới phải) xuất hiện icon Nextcloud:

   ```
   🔵 (icon cloud màu xanh)
   ```
2. Cửa sổ **Setup Wizard** mở ra, yêu cầu đăng nhập.\
   Nếu thấy 2 điều trên → **Cài đặt thành công!** ✅
   {% endstep %}
   {% endstepper %}

### 🔧 Khắc Phục Lỗi Cài Đặt Windows

#### Lỗi: "Installation failed" / Cài đặt thất bại

Nguyên nhân:

* Không có quyền Administrator
* Antivirus chặn
* File installer bị hỏng

Cách xử lý:

1. **Right-click** vào file `.msi` → chọn **"Run as Administrator"**.
2. Tắt **Antivirus** tạm thời:
   * Windows Defender: Settings → Virus & threat protection → Manage settings → Real-time protection: OFF
   * Kaspersky/Norton: Tạm ngưng 10 phút
3. Tải lại file installer (có thể bị lỗi khi tải).
4. Khởi động lại máy và thử cài lại.

#### Lỗi: "This app can't run on your PC" / Ứng dụng không chạy

Nguyên nhân:

* Tải nhầm phiên bản 32-bit trên máy 64-bit (hoặc ngược lại)

Cách xử lý:

1. Kiểm tra phiên bản Windows:
   * **Right-click** vào **This PC** → **Properties**
   * Xem dòng **"System type"**: 64-bit hoặc 32-bit
2. Tải lại file đúng phiên bản:
   * 64-bit: `Nextcloud-x.x.x-x64.msi`
   * 32-bit: `Nextcloud-x.x.x-x86.msi` (hiếm)

## 🍎 Phần 2: Cài Đặt trên macOS

### Yêu Cầu Hệ Thống

| Thành phần     | Yêu cầu tối thiểu                           | Khuyến nghị          |
| -------------- | ------------------------------------------- | -------------------- |
| **OS**         | macOS 10.14 (Mojave)                        | macOS 12 (Monterey)+ |
| **Chip**       | Intel x86\_64 hoặc Apple Silicon (M1/M2/M3) | Apple Silicon        |
| **RAM**        | 2 GB                                        | 4 GB+                |
| **Dung lượng** | 500 MB trống                                | 1 GB+                |
| **Kết nối**    | 5 Mbps                                      | 10 Mbps+             |

{% stepper %}
{% step %}

### Bước 1 – Tải File Cài Đặt

1. Mở **Safari** (hoặc trình duyệt khác).
2. Truy cập:

   ```
   https://nextcloud.com/install/#install-clients
   ```
3. Click **"Download for macOS"**.
4. File tải về có tên dạng:

   ```
   Nextcloud-3.x.x.pkg  (Intel)
   hoặc
   Nextcloud-3.x.x-arm64.pkg  (Apple Silicon)
   ```
5. Lưu vào thư mục **Downloads**.

Mẹo: macOS tự động phát hiện chip của bạn và tải đúng phiên bản.
{% endstep %}

{% step %}

### Bước 2 – Mở File .pkg

1. Vào thư mục **Downloads**.
2. **Double-click** vào file `Nextcloud-3.x.x.pkg`.
3. Nếu xuất hiện cảnh báo **Gatekeeper**:

   ```
   "Nextcloud.pkg" can't be opened because it is from an unidentified developer.
   ```

Cách xử lý:

* **Right-click** (hoặc Control+click) vào file `.pkg` → Chọn **"Open"** / **"Mở"** → Click **"Open"** lần nữa trong popup xác nhận.
  {% endstep %}

{% step %}

### Bước 3 – Chạy Installer

#### Màn hình 1: Welcome

* Màn hình chào mừng:

  ```
  Welcome to the Nextcloud Installer
  ```
* Click **"Continue"** / **"Tiếp tục"**.

#### Màn hình 2: License

* Đọc license agreement.
* Click **"Continue"** → Click **"Agree"** / **"Đồng ý"**.

#### Màn hình 3: Installation Type

* Chọn ổ đĩa cài đặt (thường chỉ có **Macintosh HD**).
* Click **"Install"** / **"Cài đặt"**.

#### Xác thực bằng mật khẩu Mac

* Popup yêu cầu mật khẩu Mac:

  ```
  Installer is trying to install new software.
  Type your password to allow this.
  ```
* Nhập **mật khẩu người dùng Mac** → Click **"Install Software"** / **"Cài đặt phần mềm"**.

Tiến trình cài đặt: chờ 1-2 phút.
{% endstep %}

{% step %}

### Bước 4 – Cấp Quyền Truy Cập (Quan Trọng!)

Sau khi cài đặt, macOS có thể yêu cầu cấp quyền cho Nextcloud:

#### A. Full Disk Access (macOS 10.14+)

1. Mở **System Preferences** / **System Settings** (macOS 13+).
2. Vào **Security & Privacy** → tab **Privacy**.
3. Cuộn xuống, chọn **"Full Disk Access"**.
4. Click biểu tượng **🔒 (ổ khóa)** ở góc dưới trái để mở khóa.
5. Nhập mật khẩu Mac.
6. Click nút **+** (plus).
7. Tìm và chọn:

   ```
   Applications → Nextcloud.app
   ```
8. Tick vào checkbox bên cạnh **Nextcloud**.
9. Click khóa 🔒 lại để lưu.

#### B. Notifications (Tuỳ chọn)

Nếu muốn nhận thông báo:

1. Vào **System Preferences** → **Notifications** / **Thông báo**.
2. Tìm **Nextcloud** → Bật các tuỳ chọn: Allow Notifications, Show in Notification Center, Sounds.
   {% endstep %}

{% step %}

### Bước 5 – Khởi Chạy Nextcloud

1. Mở **Finder** → **Applications**.
2. Tìm **Nextcloud.app**.
3. **Double-click** để mở.
4. Icon Nextcloud xuất hiện ở **Menu Bar** (góc trên phải).
5. Cửa sổ **Setup Wizard** mở ra.

✅ **Cài đặt thành công!**
{% endstep %}
{% endstepper %}

### 🔧 Khắc Phục Lỗi Cài Đặt macOS

#### Lỗi: "Cannot open because developer cannot be verified"

Nguyên nhân: Gatekeeper chặn app không từ App Store.\
Cách xử lý:

1. **Right-click** vào file `.pkg` → **Open**.
2. Hoặc vào **System Preferences** → **Security & Privacy** → tab **General**:
   * Khi thấy: `"Nextcloud.pkg" was blocked from opening` → Click **"Open Anyway"** / **"Mở bằng mọi cách"**.

#### Lỗi: Cài xong nhưng không thấy icon

Cách xử lý:

1. Vào **Applications** → Double-click **Nextcloud.app**.
2. Nếu vẫn không thấy icon ở Menu Bar:
   * Click **Go** trong Finder → **Go to Folder...**
   * Nhập: `~/Library/Application Support/Nextcloud/`
   * Xoá thư mục đó và chạy lại Nextcloud.app

#### Lỗi: "Nextcloud can't access files" / Không truy cập được file

Nguyên nhân: Chưa cấp Full Disk Access.\
Cách xử lý: Làm lại **Bước 4** ở trên (cấp quyền Full Disk Access).

#### Lỗi: App dành cho Intel không chạy trên Apple Silicon (hoặc ngược lại)

Nguyên nhân: Tải nhầm phiên bản.\
Cách xử lý:

1. Kiểm tra chip Mac: **Apple menu** → **About This Mac** → xem dòng **"Chip"**.
2. Tải lại đúng phiên bản:
   * Apple Silicon: `Nextcloud-x.x.x-arm64.pkg`
   * Intel: `Nextcloud-x.x.x.pkg`

## ❓ Câu Hỏi Thường Gặp

<details>

<summary>Desktop Client có tự động cập nhật không?</summary>

Có, Desktop Client tự động kiểm tra phiên bản mới và thông báo. Bạn chỉ cần click "Update" khi có thông báo.

</details>

<details>

<summary>Có cần tài khoản riêng không?</summary>

Không, bạn dùng tài khoản CloudFile hiện tại (do công ty cấp) để đăng nhập.

</details>

<details>

<summary>Cài trên nhiều máy được không?</summary>

Được, bạn có thể cài trên nhiều máy (máy nhà, máy công ty, laptop...). Tất cả đều đồng bộ với cùng 1 tài khoản.

</details>

<details>

<summary>Desktop Client có chiếm nhiều RAM không?</summary>

Không, thường chỉ dùng 50-150 MB RAM khi idle. Khi đang sync file lớn có thể tăng lên 200-300 MB.

</details>

<details>

<summary>Có thể cài song song với Dropbox/OneDrive không?</summary>

Được, không xung đột. Nhưng chú ý:

* Không nên đặt thư mục sync Nextcloud **bên trong** thư mục Dropbox/OneDrive (và ngược lại).
* Tránh sync conflict.

</details>

{% hint style="info" %}
Mẹo cuối: Sau khi cài đặt xong, đừng quên **cấp quyền Full Disk Access** (macOS) hoặc **kiểm tra Firewall/Antivirus** (Windows) để Desktop Client hoạt động trơn tru!
{% endhint %}

Chúc mừng! Bạn đã cài đặt thành công Nextcloud Desktop Client. Bước tiếp theo: Đăng nhập và bắt đầu đồng bộ file!
