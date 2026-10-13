> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/huong-dan-quan-ly-admin/quan-ly-nguoi-dung.md).

# Quản lý người dùng

Hướng dẫn này cung cấp bức tranh tổng thể về cách quản lý người dùng (User Management) trong hệ thống CloudFile, giúp Admin:

* Hiểu vai trò và vòng đời của user
* Nắm được các thao tác quản trị cốt lõi
* Tránh sai sót ảnh hưởng đến dữ liệu, phân quyền và bảo mật

## 1. Cấu trúc một Định danh Người dùng

Một tài khoản trên CloudFile được cấu thành bởi 5 yếu tố chính. Bạn cần phân biệt rõ để tránh nhầm lẫn:

| Thành phần        | Tên kỹ thuật   | Mô tả & Lưu ý                                                                                                                                  | Khả năng sửa đổi                                                     |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Tên đăng nhập** | `Username`     | <p>Là ID duy nhất của nhân viên (Ví dụ: <code>nguyen.van.a</code>).<br>⚠️ <strong>Lưu ý:</strong> Dùng để đăng nhập và định danh hệ thống.</p> | <p><strong>KHÔNG THỂ SỬA</strong><br>(Muốn sửa phải xóa tạo lại)</p> |
| **Tên hiển thị**  | `Display Name` | <p>Tên đầy đủ có dấu (Ví dụ: <code>Nguyễn Văn A</code>).<br>Dùng để hiển thị khi chat, chia sẻ file.</p>                                       | Có thể sửa thoải mái                                                 |
| **Email**         | `Email`        | <p>Dùng để nhận thông báo và tự khôi phục mật khẩu.<br>Bắt buộc phải có để đảm bảo bảo mật.</p>                                                | Có thể sửa                                                           |
| **Nhóm**          | `Group`        | <p>Phòng ban mà nhân viên trực thuộc.<br>Quyết định việc họ được xem thư mục nào.</p>                                                          | Có thể sửa                                                           |
| **Hạn mức**       | `Quota`        | Dung lượng tối đa họ được phép lưu trữ (Ví dụ: 5GB).                                                                                           | Có thể sửa                                                           |

{% hint style="warning" %}
Tên đăng nhập (Username) là duy nhất và không thể sửa được. Nếu cần thay đổi, phải xóa tài khoản hiện tại và tạo lại tài khoản mới.
{% endhint %}

## 2. Vòng đời của Tài khoản (User Lifecycle)

Quy trình quản lý người dùng chuẩn doanh nghiệp bao gồm 3 giai đoạn. Admin cần nắm vững để xử lý đúng lúc.

{% stepper %}
{% step %}

### Onboarding (Tiếp nhận)

* Khi nào: Nhân viên mới nhận việc.
* Hành động: Tạo tài khoản -> Cấp vào đúng Nhóm -> Gửi thông tin đăng nhập.
* Mục tiêu: Nhân viên có thể làm việc ngay lập tức.
  {% endstep %}

{% step %}

### Maintenance (Duy trì)

* Khi nào: Trong quá trình làm việc.
* Hành động: Reset mật khẩu khi quên, tăng Quota khi đầy, đổi tên khi thăng chức.
* Mục tiêu: Đảm bảo công việc không bị gián đoạn.
  {% endstep %}

{% step %}

### Offboarding (Nghỉ việc)

* Khi nào: Nhân viên nghỉ việc.
* Hành động:
  * Vô hiệu hóa (Disable) ngay lập tức
  * Chuyển quyền sở hữu dữ liệu
  * Xóa tài khoản (sau khi đã bàn giao xong)
* Mục tiêu: Bảo vệ dữ liệu công ty, ngăn chặn truy cập trái phép.
  {% endstep %}
  {% endstepper %}

## 3. Quy tắc đặt tên

Để dễ dàng tìm kiếm và quản lý hàng trăm nhân viên, bạn nên thống nhất quy tắc đặt **Tên đăng nhập (Username)** ngay từ đầu.

**Các kiểu đặt tên phổ biến:**

* **Kiểu 1 (Khuyên dùng):** `ho.ten` (Ví dụ: `nguyen.long`, `pham.huong`). Dễ nhớ, chuyên nghiệp.
* **Kiểu 2 (Công ty lớn):** `ten.hovat` (Ví dụ: `long.nguyenvan`). Tránh trùng tên.
* **Kiểu 3 (Theo mã NV):** `nv1023`, `ketoan01`. Dùng cho công nhân hoặc tài khoản dùng chung, nhưng khó nhớ.
