> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/huong-dan-quan-ly-admin/tong-quan-quan-ly-admin.md).

# Tổng Quan Quản lý Admin

Chào mừng bạn đến với **Trung tâm Quản trị (Administration)** của hệ thống CloudFile.

Tài liệu này được biên soạn dành riêng cho **Quản trị viên Doanh nghiệp**. Tại đây, hướng dẫn này cung cấp cái nhìn tổng quan về vai trò **Admin** trong hệ thống CloudFile, giúp bạn hiểu rõ trách nhiệm, quyền hạn, giao diện quản trị và quy trình làm việc hàng ngày.

## 1. Vai trò của bạn là gì?

Hệ thống CloudFile hoạt động theo mô hình **"Dịch vụ được quản lý" (Managed Service)**. Điều này có nghĩa là trách nhiệm được phân chia rõ ràng để bạn có thể tập trung hoàn toàn vào vận hành doanh nghiệp mà không cần lo lắng về kỹ thuật phức tạp.

| Trách nhiệm          | Người thực hiện        | Chi tiết công việc                                                                                                                                                                                                                                                               |
| -------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HẠ TẦNG KỸ THUẬT** | **ODS Cloud**          | <p>• Bảo trì máy chủ, điện, mạng.<br>• Cập nhật bản vá bảo mật hệ điều hành.<br>• Sao lưu (Backup) hệ thống định kỳ.<br>• Xử lý sự cố kỹ thuật (Lỗi server, lỗi SSL...).</p>                                                                                                     |
| **VẬN HÀNH NỘI BỘ**  | **Bạn (Tenant Admin)** | <p>• <strong>Con người:</strong> Tạo/Xóa tài khoản nhân viên.<br>• <strong>Phân quyền:</strong> Ai được xem gì, ai được sửa gì.<br>• <strong>Tài nguyên:</strong> Cấp phát dung lượng (Quota) cho từng người.<br>• <strong>Cấu trúc:</strong> Tổ chức cây thư mục phòng ban.</p> |

## 2. Các nhiệm vụ quản trị cốt lõi

Trong vai trò Admin, đây là 4 nhóm công việc chính mà bạn sẽ thực hiện thường xuyên:

{% stepper %}
{% step %}

### 👤 Quản lý Nhân sự

* **Onboarding (Tiếp nhận):** Tạo tài khoản, cấp mật khẩu và hướng dẫn nhân viên mới gia nhập hệ thống.
* **Offboarding (Bàn giao):** Khóa tài khoản, chuyển quyền sở hữu dữ liệu và xóa tài khoản khi nhân viên nghỉ việc để tránh rò rỉ thông tin.
  {% endstep %}

{% step %}

### 👥 Phân quyền & Bảo mật

* Thiết lập các **Nhóm (Groups)** tương ứng với phòng ban thực tế (Kinh doanh, Kế toán, BGĐ...).
* Quy định quyền truy cập vào các thư mục chung (Ví dụ: Kế toán chỉ được xem, không được xóa dữ liệu của BGĐ).
* Hỗ trợ nhân viên đặt lại mật khẩu khi họ quên.
  {% endstep %}

{% step %}

### 💾 Quản trị Tài nguyên

* Giám sát dung lượng lưu trữ tổng thể của công ty.
* Thiết lập hạn mức **Quota** (Ví dụ: 5GB, 10GB) để ngăn chặn một cá nhân chiếm dụng quá nhiều tài nguyên chung.
  {% endstep %}

{% step %}

### 👁️ Giám sát (Monitoring)

* Xem **Nhật ký hoạt động (Activity Logs)** để biết ai đã xóa file quan trọng, ai đã chia sẻ dữ liệu ra bên ngoài.
  {% endstep %}
  {% endstepper %}

## 3. Bản đồ hướng dẫn Admin

Để giúp bạn làm chủ hệ thống, bộ tài liệu quản trị này được chia thành các phần sau:

* 👉 **\[Quản lý Người dùng]:** Hướng dẫn chi tiết thêm, sửa, xóa, khóa nhân viên.
* 👉 **\[Nhóm & Phân quyền]:** Cách tổ chức phòng ban và phân cấp quản lý.
* 👉 **\[Dung lượng & Quota]:** Chiến lược chia quota hợp lý.
* 👉 **\[Thư mục chung & Chia sẻ]:** Xây dựng cây thư mục chuẩn doanh nghiệp.
* 👉 **\[Tính năng Nâng cao]:** Bảo mật, Khôi phục và Kết nối lưu trữ ngoài.

{% hint style="info" %}
Nếu gặp các vấn đề kỹ thuật nằm ngoài phạm vi quản trị (Server lỗi, không truy cập được website...), vui lòng liên hệ kênh Hỗ trợ kỹ thuật của chúng tôi.
{% endhint %}
