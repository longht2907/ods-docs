> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/bat-dau/tong-quan-ve-giao-dien.md).

# Tổng quan về giao diện

Giao diện Web của CloudFile được thiết kế hiện đại, trực quan và tập trung vào trải nghiệm người dùng. Ngay sau khi đăng nhập, bạn sẽ tiếp cận với  không gian làm việc số hợp nhất.

Dưới đây là bản đồ chi tiết các khu vực chức năng trên màn hình để bạn không bị bỡ ngỡ.

## 1. Màn hình chính (Dashboard)

Theo mặc định, trang đầu tiên bạn nhìn thấy là **Dashboard (Bảng tin)**. Đây là nơi tổng hợp thông tin quan trọng nhất trong ngày của bạn.

<div align="center"><figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FgWzKoG6M1oHNh2E5d9bY%2Fimage.png?alt=media&amp;token=348d2938-4faa-496f-91d0-99e98ecc67ca" alt=""><figcaption></figcaption></figure></div>

* **Lời chào & Trạng thái:** Hiển thị lời chào theo buổi và trạng thái hiện tại của bạn (Ví dụ: "Chào buổi sáng, Long" - "Đang họp").
* **Các Widget (Tiện ích):** Các ô thông tin nhanh như:
  * **Tệp tin gần đây:** Truy cập nhanh các file vừa làm việc.
  * **Việc cần làm:** Danh sách task từ ứng dụng Deck/Tasks.
  * **Lịch trình:** Các cuộc họp sắp tới.
  * **Thư mới:** Email chưa đọc (nếu tích hợp).
* **Tùy chỉnh:** Bạn có thể nhấn nút **"Tùy chỉnh" (Customize)** ở cuối trang để thêm/bớt hoặc sắp xếp lại các widget này theo ý thích.<br>

## 2. Thanh điều hướng trên cùng (Top Navigation Bar)

Thanh ngang màu xanh (hoặc màu thương hiệu công ty) ở trên cùng màn hình luôn hiển thị ở mọi nơi, giúp bạn di chuyển giữa các ứng dụng.

### Menu Ứng dụng (Trái)

Nằm ở góc trên cùng bên trái. Khi nhấp vào logo hoặc biểu tượng danh sách, bạn sẽ thấy các ứng dụng được cài đặt:

* **Files (Tệp):** Quản lý dữ liệu lưu trữ.
* **Photos (Ảnh):** Thư viện hình ảnh/video.
* **Activity (Hoạt động):** Xem lịch sử thao tác.
* **Talk (Trò chuyện):** Chat và họp trực tuyến.
* **Contacts/Calendar:** Danh bạ và Lịch.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FwAN8sdQrzg10VGd11ieC%2Fimage.png?alt=media&amp;token=71f376dc-9e9b-4cc4-91a1-37781f27ad5b" alt=""><figcaption></figcaption></figure>

### Khu vực Tiện ích (Phải)

{% stepper %}
{% step %}

### Tìm kiếm (Unified Search) 🔍

Biểu tượng kính lúp. Cho phép tìm kiếm mọi thứ (tên file, nội dung trong file văn bản, tên người dùng, sự kiện lịch, tin nhắn...) tại một nơi duy nhất.
{% endstep %}

{% step %}

### Thông báo (Notifications) 🔔

Biểu tượng cái chuông. Báo cho bạn biết khi:

* Có ai đó chia sẻ file cho bạn.
* Có người nhắc tên bạn trong bình luận.
* Sắp đến giờ họp.
  {% endstep %}

{% step %}

### Danh bạ & Tài khoản 👥 👤

* **Danh bạ (Contacts Menu):** Biểu tượng hình người. Tìm nhanh thông tin đồng nghiệp.
* **Tài khoản (User Menu):** Biểu tượng Avatar (Ảnh đại diện). Nơi chứa các thiết lập cá nhân và nút Đăng xuất.
  {% endstep %}
  {% endstepper %}

## 3. Giao diện quản lý tệp tin (Files App)

Đây là khu vực bạn sẽ làm việc thường xuyên nhất.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2F6TheE8MllFnFxuP0uwvl%2Fimage.png?alt=media&amp;token=221f9bd0-152a-4bfb-9cee-cb1967cfa19e" alt=""><figcaption></figcaption></figure>

### Cột bên trái (Left Sidebar) - Bộ lọc nhanh

Giúp bạn lọc dữ liệu theo trạng thái:

* **Tất cả tệp (All files):** Hiển thị toàn bộ thư mục gốc.
* **Gần đây (Recent):** Các file vừa mở/chỉnh sửa.
* **Yêu thích (Favorites):** Các file được bạn gắn sao vàng ⭐.
* **Đã chia sẻ (Shares):**
  * *Được chia sẻ với tôi (Shared with me):* Dữ liệu người khác gửi cho bạn.
  * *Đã chia sẻ với người khác (Shared with others):* Dữ liệu bạn gửi đi.
* **Thùng rác (Deleted files):** Nơi chứa các file đã xóa (có thể khôi phục).

### Khu vực trung tâm (Main View) - Danh sách tệp

Hiển thị danh sách các thư mục và tệp tin.

* **Breadcrumb (Đường dẫn):** Thanh điều hướng dạng `Home > Documents > Project A` giúp bạn biết mình đang ở đâu và quay lại thư mục cha dễ dàng.
* **Chế độ xem:** Bạn có thể chuyển đổi giữa dạng **Danh sách (List view)** hoặc **Lưới (Grid view)** bằng nút ở góc trên bên phải danh sách.
* **Menu "..." (Ba chấm):** Bên cạnh mỗi tên file có dấu ba chấm, chứa các hành động như: *Đổi tên, Tải xuống, Di chuyển/Sao chép, Xóa*.

### Cột bên phải (Right Sidebar) - Chi tiết

Khi bạn nhấp vào một file (hoặc chọn tab "Chi tiết"), cột này sẽ hiện ra:

* **Activity:** Lịch sử thao tác trên file này (Ai đã tạo, ai đã sửa lần cuối).
* **Sharing:** Quản lý chia sẻ file này cho ai.
* **Versions:** Các phiên bản cũ của file (để khôi phục nếu lỡ sửa sai).
* **Comments:** Chat và bình luận trực tiếp trên file với đồng nghiệp.

## 4. Menu Cài đặt cá nhân (Settings)

Để truy cập, nhấp vào **Avatar** -> **Cài đặt (Settings)**. Tại đây bạn có thể:

* **Thông tin cá nhân:** Đổi tên hiển thị, Số điện thoại, Email, Ảnh đại diện.
* **Bảo mật:** Đổi mật khẩu, Bật xác thực 2 bước (2FA).
* **Giao diện:** Chuyển đổi chế độ Sáng/Tối (Light/Dark mode).
* **Trạng thái sẵn sàng:** Cài đặt thông báo tự động "Đang bận" hoặc "Nghỉ phép".

{% hint style="info" %}
💡 Mẹo: Hãy cập nhật **Ảnh đại diện** của bạn ngay để đồng nghiệp dễ dàng nhận ra khi làm việc nhóm nhé!
{% endhint %}
