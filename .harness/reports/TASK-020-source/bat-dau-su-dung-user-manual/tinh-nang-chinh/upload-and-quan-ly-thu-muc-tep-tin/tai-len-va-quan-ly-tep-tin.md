> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/upload-and-quan-ly-thu-muc-tep-tin/tai-len-va-quan-ly-tep-tin.md).

# Tải lên và Quản lý Tệp tin

Hệ thống CloudFile cho phép bạn lưu trữ mọi loại định dạng tệp tin (Tài liệu, Hình ảnh, Video). Dưới đây là 3 cách để đưa dữ liệu của bạn lên hệ thống.\
Hướng dẫn sau giúp bạn **tải lên tệp và thư mục** từ máy tính, điện thoại lên hệ thống CloudFile, giúp bạn bắt đầu lưu trữ và chia sẻ dữ liệu doanh nghiệp một cách hiệu quả.

{% hint style="info" %}
Giới hạn thường gặp:

* **Kích thước file tối đa mỗi lần upload**: Thường từ 100MB–10GB.
* **Quota cá nhân**: Tài khoản có thể bị giới hạn dung lượng tổng (VD: 50GB/user).
* **Loại file**: Hầu hết các định dạng đều được chấp nhận, trừ khi có chính sách chặn file thực thi (.exe, .sh…).

Mẹo: Kiểm tra dung lượng còn lại trong **phần thông tin tài khoản** hoặc thanh quota hiển thị ở góc giao diện.
{% endhint %}

## 1. Tải lên qua Trình duyệt Web (Web Portal)

Đây là cách đơn giản nhất để tải file khi bạn đang sử dụng máy tính lạ hoặc không muốn cài đặt phần mềm.

### 🖱️ Phương pháp 1: Upload bằng nút "+ / New"

{% stepper %}
{% step %}

### Mở thư mục đích

* Đăng nhập vào CloudFile.
* Trong giao diện **Files**, điều hướng đến **thư mục** bạn muốn upload vào.
  * VD: `My Files` / `Documents` / `Project ABC`.
    {% endstep %}

{% step %}

### Click nút "+" hoặc "New"

* Ở góc trên hoặc trong thanh công cụ, tìm nút **+ (New)** hoặc **Upload**.
* Click vào đó để mở menu.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FCPXhuU5YqBof92IbLvM8%2Fimage.png?alt=media&amp;token=7233bed0-41b2-4fa7-8c2d-53579d89a8d3" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Chọn loại upload

Menu sẽ hiện các tuỳ chọn:

* **Upload file** – Tải lên từng file hoặc nhiều file.
* **Upload folder** / **Upload directory** – Tải lên cả thư mục (giữ nguyên cấu trúc).
* **New folder** – Tạo thư mục mới trước khi upload (tuỳ chọn).
* **New text file** – Tạo file text trực tiếp trên web.

Chọn **Upload file** hoặc **Upload folder** tuỳ nhu cầu.
{% endstep %}

{% step %}

### Chọn file/thư mục từ máy tính

Cửa sổ chọn file của hệ điều hành sẽ xuất hiện.

Nếu upload file:

* Giữ **Ctrl** (Windows/Linux) hoặc **Cmd** (Mac) để chọn nhiều file.
* Click **Open / Mở**.

Nếu upload folder:

* Chọn thư mục muốn tải lên.
* Toàn bộ cấu trúc thư mục con và file bên trong sẽ được giữ nguyên.
  {% endstep %}

{% step %}

### Theo dõi tiến trình upload

* Thanh tiến trình (progress bar) sẽ hiển thị ở góc màn hình hoặc trong khu vực thông báo.
* Với file nhỏ: upload gần như tức thì.
* Với file lớn: có thể mất vài phút hoặc lâu hơn.

Mẹo: Không đóng trình duyệt/tab khi đang upload file lớn.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2F2dhmgIaFoyotKF76XWOZ%2Fimage.png?alt=media&amp;token=1f0e57be-36d5-4473-b2b6-4b45eece1c53" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Xác nhận upload thành công

Khi hoàn tất:

* File/thư mục xuất hiện trong danh sách.
* Thông báo **"Upload complete"** hoặc tương tự.
* Có thể click vào file để xem chi tiết, chia sẻ, hoặc tải xuống.

Kết quả:

* ✅ File/thư mục đã được lưu trữ trên CloudFile.
* ✅ Có thể chia sẻ cho đồng nghiệp ngay lập tức.
* ✅ Được tính vào quota cá nhân.
  {% endstep %}
  {% endstepper %}

### Phương pháp 2: Kéo thả (Drag & Drop)

Đây là cách **nhanh nhất** và thân thiện nhất với người dùng.

{% stepper %}
{% step %}

### Mở File Explorer / Finder

* Windows: Mở **File Explorer** (Win + E).
* macOS: Mở **Finder**.
* Linux: Mở file manager (Nautilus, Dolphin…).
  {% endstep %}

{% step %}

### Chọn file/thư mục cần upload

* Có thể chọn nhiều file cùng lúc (Ctrl + Click / Cmd + Click).
* Có thể chọn cả thư mục.
  {% endstep %}

{% step %}

### Kéo thả vào cửa sổ CloudFile

1. Giữ chuột trái, kéo file/thư mục từ File Explorer.
2. Thả vào **khu vực danh sách file** trong giao diện CloudFile (trình duyệt web).
   {% endstep %}

{% step %}

### Theo dõi & xác nhận

* Upload tự động bắt đầu.
* Thanh tiến trình hiện lên.
* File xuất hiện trong danh sách khi hoàn tất.

Ưu điểm kéo thả:

* Nhanh, trực quan.
* Không cần click nhiều nút.
* Hỗ trợ upload nhiều file/thư mục cùng lúc.

Mẹo: Bạn cũng có thể tạo thư mục mới tại đây bằng cách chọn **Thư mục mới (New folder)**, đặt tên và nhấn Enter.
{% endstep %}
{% endstepper %}

<details>

<summary>Xử lý trùng lặp</summary>

Nếu bạn tải lên một file có tên giống hệt với file đã có trên hệ thống, CloudFile sẽ hỏi bạn muốn làm gì:

* **Thay thế (Replace):** Ghi đè file mới lên file cũ (File cũ sẽ bị đưa vào thùng rác/phiên bản cũ).
* **Giữ cả hai (Keep both):** File mới sẽ được tự động đổi tên (Ví dụ: `Bao-cao (2).docx`).
* **Bỏ qua (Skip):** Hủy thao tác tải lên.

</details>

## 2. Tải lên qua Máy tính (Desktop App)

Khi bạn đã cài đặt ứng dụng **NextCloud Client** trên máy tính (Windows/macOS), việc tải file lên trở nên cực kỳ tự nhiên, giống như bạn copy file giữa các ổ đĩa.

{% stepper %}
{% step %}

### Thao tác cơ bản

1. Mở thư mục **Nextcloud** trên máy tính của bạn (thường có biểu tượng đám mây xanh).
2. Copy file/thư mục từ nơi khác và **Paste (Dán)** vào thư mục này.
3. Hệ thống sẽ tự động phát hiện file mới và đồng bộ lên máy chủ.
   {% endstep %}

{% step %}

### Kiểm tra trạng thái

Nhìn vào biểu tượng nhỏ bên cạnh file để biết trạng thái:

* **Màu xanh dương (Vòng tròn xoay):** Đang tải lên/đồng bộ.
* **Màu xanh lá (Dấu tích ✔):** Đã tải lên thành công, dữ liệu đã an toàn trên Cloud.
* **Màu đỏ (Dấu chéo ❌):** Lỗi đồng bộ (thường do tên file chứa ký tự đặc biệt hoặc mất mạng).
  {% endstep %}

{% step %}

### Lưu ý về tên file

Tránh đặt tên file chứa các ký tự đặc biệt như `/ \ : * ? " < > |` vì hệ điều hành Windows không hỗ trợ đồng bộ các file này.
{% endstep %}
{% endstepper %}

## 3. Tải lên qua Điện thoại (Mobile App)

Giúp bạn tải tài liệu, hình ảnh hiện trường hoặc video ngay lập tức.

{% stepper %}
{% step %}

### Thao tác thủ công

1. Mở ứng dụng NextCloud trên điện thoại.
2. Di chuyển đến thư mục muốn lưu.
3. Nhấn vào dấu cộng **(+)** màu xanh (thường ở góc dưới màn hình).
4. Chọn **Tải lên (Upload)** -> Chọn **Ảnh/Video** hoặc **Tài liệu (File)**.
5. Chọn file cần tải.
   {% endstep %}

{% step %}

### Tự động tải ảnh (Auto-Upload)

1. Vào **Cài đặt (Settings)** trên App.
2. Chọn **Tự động tải lên (Auto upload)**.
3. Bật tính năng này cho các thư mục ảnh bạn muốn (Camera, Zalo, Messenger...).
4. Từ giờ, mỗi khi bạn chụp ảnh mới, nó sẽ tự động được đưa lên CloudFile vào thư mục bí mật của bạn.
   {% endstep %}
   {% endstepper %}

## 4. Các thao tác quản lý cơ bản

Sau khi file đã lên hệ thống, bạn có thể thực hiện các thao tác bằng cách nhấp vào dấu **Ba chấm (...)** bên cạnh file:

* **Đổi tên (Rename):** Sửa lại tên file.
* **Di chuyển hoặc Sao chép (Move or Copy):** Đưa file sang thư mục khác.
* **Tải xuống (Download):** Lấy file về máy.
* **Xóa (Delete):** Chuyển file vào thùng rác.

{% hint style="info" %}
Thông tin: Dữ liệu bị xóa vẫn nằm trong **Thùng rác (Deleted files)** ở cột bên trái và có thể khôi phục lại trong vòng 30 ngày (hoặc theo cấu hình của Admin) trước khi bị xóa vĩnh viễn.
{% endhint %}
