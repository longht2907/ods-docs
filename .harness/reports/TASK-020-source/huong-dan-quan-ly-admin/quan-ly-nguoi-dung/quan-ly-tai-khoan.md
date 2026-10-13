> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/huong-dan-quan-ly-admin/quan-ly-nguoi-dung/quan-ly-tai-khoan.md).

# Quản lý tài khoản

## Quản Lý Người Dùng (Admin)

Trong quá trình vận hành doanh nghiệp, thông tin nhân sự thường xuyên thay đổi (thăng chức, chuyển phòng ban, hoặc sửa lỗi chính tả). Admin có thể cập nhật các thông tin này ngay lập tức.

Trang này dành cho **Admin CloudFile**, hướng dẫn chi tiết các thao tác quản lý vòng đời người dùng sau khi đã được tạo:

* Chỉnh sửa thông tin user
* Thay đổi / reset mật khẩu
* Khoá (Disable) & mở khoá (Enable) user

## Chỉnh sửa thông tin Người dùng

{% stepper %}
{% step %}

### Bước 1. Truy cập giao diện chỉnh sửa

* Đăng nhập quyền **Admin**.
* Truy cập menu **Account**.
* Tìm đến dòng chứa tài khoản nhân viên cần sửa trong danh sách.
  {% endstep %}

{% step %}

### Bước 2. Các thông tin có thể thay đổi

Tại giao diện này, bạn không cần nhấn nút "Lưu" hay "Sửa" chung. Bạn muốn sửa trường nào, chỉ cần nhấp vào biểu tượng **Cây bút chì (✏️)** tại trường đó.<br>

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FBOJrtD2khJrzUakwFS4z%2Fimage.png?alt=media&amp;token=71182d62-ec7f-476d-89c5-269c5df39673" alt=""><figcaption></figcaption></figure>

<br>
{% endstep %}

{% step %}

### a. Đổi Tên hiển thị (Display Name)

* Tình huống: Nhân viên muốn thêm chức danh vào tên (Ví dụ: từ `Nguyễn Văn A` thành `Nguyễn Văn A - Trưởng nhóm`).
* Thao tác:
  1. Nhấp vào cây bút ở cột **Tên hiển thị**.
  2. Nhập tên mới.
  3. Nhấn phím `Enter` để lưu.
     {% endstep %}

{% step %}

### b. Đổi Email

* Tình huống: Nhân viên bị sai email hoặc đổi sang email mới.
* Thao tác: Nhấp vào cây bút ở cột **Email** → Nhập mới → Nhấn `Enter`.
  {% endstep %}

{% step %}

### c. Chuyển Nhóm / Phòng ban (Groups)

* Tình huống: Nhân viên luân chuyển từ phòng Marketing sang Kinh Doanh.
* Thao tác:
  1. Nhấp vào cây bút ở cột **Nhóm**.
  2. Một danh sách xổ xuống.
  3. **Tích chọn** nhóm mới (Ví dụ: `Kinh_Doanh`).
  4. **Bỏ tích** nhóm cũ (Ví dụ: `Marketing`).
  5. Nhấp chuột ra vùng trống bên ngoài để lưu lại.
     {% endstep %}

{% step %}

### d. Thay đổi Hạn mức dung lượng (Quota)

* Tình huống: Nhân viên báo đầy dung lượng, cần nâng cấp.
* Thao tác:
  1. Nhấp vào cây bút ở cột **Hạn mức**.
  2. Chọn mức dung lượng có sẵn (10 GB, 50 GB...) hoặc chọn **Khác (Other)** để nhập số tùy ý.
     {% endstep %}
     {% endstepper %}

{% hint style="warning" %}
Bạn **KHÔNG THỂ** thay đổi **Tên đăng nhập (Username)**.

* Đây là định danh duy nhất của hệ thống.
* Nếu bắt buộc phải đổi Username, bạn phải **Xóa tài khoản cũ** và **Tạo tài khoản mới**.
  {% endhint %}

## Thay đổi / Reset mật khẩu

<details>

<summary>Khi nào cần reset mật khẩu?</summary>

* User quên mật khẩu
* Nghi ngờ lộ tài khoản
* Nhân sự bàn giao / nghỉ việc tạm thời
* Reset định kỳ theo chính sách bảo mật

</details>

{% stepper %}
{% step %}

### Cách đổi mật khẩu cho user

1. Vào **Settings → Users**
2. Chọn user
3. Nhập mật khẩu mới tại mục **Password**
4. Lưu thay đổi

👉 Mật khẩu mới có hiệu lực **ngay lập tức**
{% endstep %}

{% step %}

### Khuyến nghị bảo mật mật khẩu

* Không gửi mật khẩu qua chat công việc
* Ưu tiên:
  * Mật khẩu tạm
  * Yêu cầu user đổi lại sau lần đăng nhập đầu tiên
* Bật chính sách:
  * Độ dài tối thiểu
  * Độ phức tạp
    {% endstep %}
    {% endstepper %}

## Khoá (Disable) & Mở khoá (Enable) User

<details>

<summary>Khi nào cần khoá user?</summary>

* Nhân sự nghỉ việc
* User vi phạm chính sách
* Tạm ngưng truy cập hệ thống
* Bảo toàn dữ liệu nhưng chặn đăng nhập

👉 **Khoá user ≠ xoá user**

</details>

{% stepper %}
{% step %}

### Khoá user (Disable)

1. Vào **Settings → Users**
2. Chọn user
3. Chuyển trạng thái sang **Disabled**

Kết quả:

* User **không đăng nhập được**
* Dữ liệu **vẫn được giữ nguyên**
* Link chia sẻ có thể bị vô hiệu (tuỳ cấu hình)
  {% endstep %}

{% step %}

### Mở khoá user (Enable)

1. Vào **Settings → Users**
2. Chọn user bị khoá
3. Chuyển trạng thái về **Active**

👉 User đăng nhập lại bình thường, dữ liệu không mất.
{% endstep %}
{% endstepper %}

📌 Tóm tắt

> Quản lý user không chỉ là thao tác kỹ thuật, mà là quản lý **bảo mật – dữ liệu – rủi ro vận hành** của toàn hệ thống CloudFile.
