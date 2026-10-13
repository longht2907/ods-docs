> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/huong-dan-quan-ly-admin/quan-ly-nguoi-dung/tao-nguoi-dung-moi.md).

# Tạo người dùng mới

Khi doanh nghiệp có nhân sự mới, bước đầu tiên để họ bắt đầu làm việc là cấp một tài khoản truy cập vào hệ thống CloudFile.

## Các bước tạo Người dùng mới

{% stepper %}
{% step %}

### Truy cập trang Quản lý Người dùng

* Đăng nhập vào hệ thống bằng tài khoản có quyền **Admin**.
* Nhấp vào **Avatar** (Ảnh đại diện) ở góc trên bên phải màn hình.
* Chọn dòng **Account** trong menu xổ xuống.\ <br>

  <figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2F3voF09uoX9mpAJ8DskE6%2Fimage.png?alt=media&amp;token=24c038de-fc1d-407d-82c6-214c04b80ec6" alt=""><figcaption></figcaption></figure>
* Giao diện quản lý sẽ hiện ra. Hãy nhìn lên **Thanh công cụ trên cùng** (ngay phía trên danh sách nhân viên hiện có).<br>

  <figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2F1RQ62bLM5vVQND2uBRGs%2Fimage.png?alt=media&amp;token=2d8efe6b-0075-4028-ada8-2b913cf7dae0" alt=""><figcaption></figcaption></figure>

{% endstep %}

{% step %}

### Thêm Người dùng mới

* Nhấn nút **+ New account/ Thêm người dùng**.\ <br>

  <figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2Fdef7LXOznsouzIgz1Qkf%2Fimage.png?alt=media&amp;token=e3e52c50-b266-4b3e-bbfa-3e2158e4431f" alt=""><figcaption></figcaption></figure>
* Điền đầy đủ các thông tin vào các ô trống tương ứng trên thanh công cụ (bảng mô tả bên dưới).

| Trường thông tin                                                | Yêu cầu nhập liệu                                                                                                                                                                                                                                      | Ví dụ minh họa                                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| <p><strong>Tên đăng nhập</strong><br><em>(Username)</em></p>    | <p>• Viết liền, không dấu, không khoảng trắng.<br>• Không chứa ký tự đặc biệt (<code>@</code>, <code>#</code>, <code>/</code>...).<br>• <strong>QUAN TRỌNG:</strong> Đây là định danh duy nhất và <strong>không thể thay đổi</strong> sau khi tạo.</p> | <p><code>nguyen.van.a</code><br><code>ketoan01</code><br><code>longhuynh</code></p>             |
| <p><strong>Tên hiển thị</strong><br><em>(Display Name)</em></p> | <p>• Tên đầy đủ của nhân viên (có dấu).<br>• Nên kèm theo chức danh hoặc phòng ban để dễ nhận diện.</p>                                                                                                                                                | <p><code>Nguyễn Văn A</code><br><code>Trần Thị B - HR</code><br><code>Admin Kỹ Thuật</code></p> |
| <p><strong>Mật khẩu</strong><br><em>(Password)</em></p>         | <p>• <strong>Cách 1 (Thủ công):</strong> Nhập mật khẩu khởi tạo do bạn quy định.<br>• <strong>Cách 2 (Tự động - Khuyên dùng):</strong> Để trống ô này. Hệ thống sẽ gửi email kích hoạt cho nhân viên tự đặt mật khẩu.</p>                              | <p><code>CongTy\@2024</code><br><em>(Hoặc để trống)</em></p>                                    |
| **Email**                                                       | <p>• Nhập địa chỉ email công việc của nhân viên.<br>• Bắt buộc phải có để nhận thông báo và tự khôi phục mật khẩu.</p>                                                                                                                                 | `a.nguyen@company.com`                                                                          |
| <p><strong>Nhóm</strong><br><em>(Groups)</em></p>               | <p>• Chọn phòng ban mà nhân viên trực thuộc.<br>• Một người có thể thuộc nhiều nhóm.</p>                                                                                                                                                               | <p><code>Kinh\_Doanh</code><br><code>Marketing</code></p>                                       |
| <p><strong>Hạn mức</strong><br><em>(Quota)</em></p>             | <p>• Dung lượng lưu trữ tối đa được cấp cho cá nhân này.<br>• Giúp kiểm soát tài nguyên hệ thống.</p>                                                                                                                                                  | <p><code>5 GB</code>, <code>10 GB</code><br><code>Unlimited</code> (Không giới hạn)</p>         |
| {% endstep %}                                                   |                                                                                                                                                                                                                                                        |                                                                                                 |

{% step %}

### Hoàn tất và bàn giao

* Sau khi điền đủ thông tin, nhấn nút **Thêm người dùng mới (Add new user)** ở cuối dòng bên phải.
* Tài khoản mới sẽ xuất hiện ngay lập tức trong danh sách bên dưới.
  {% endstep %}
  {% endstepper %}

## Các lỗi thường gặp

<details>

<summary>❌ Lỗi: "Username already exists"</summary>

* Nguyên nhân: Tên đăng nhập `nguyen.van.a` đã có người sử dụng (có thể là nhân viên cũ đã nghỉ việc nhưng chưa xóa tài khoản).
* Cách sửa: Đặt một Username khác (Ví dụ: `nguyen.van.a2` hoặc `a.nguyen.van`).

</details>

<details>

<summary>❌ Lỗi: Mật khẩu quá yếu</summary>

* Nguyên nhân: Mật khẩu bạn đặt quá đơn giản (Ví dụ: `123456`, `password`).
* Cách sửa: Hệ thống yêu cầu mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.

</details>

<details>

<summary>❌ Lỗi: Không chọn được Nhóm (Group)</summary>

* Nguyên nhân: Bạn chưa tạo Nhóm nào trong hệ thống.
* Cách sửa: Hãy tạo Nhóm trước (Xem mục **5.2.1 Tạo Group**) rồi mới gán nhân viên vào.

</details>
