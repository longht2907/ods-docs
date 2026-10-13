> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/huong-dan-quan-ly-admin/nhat-ky-hoat-dong-activity-logs.md).

# Nhật ký Hoạt động (Activity Logs)

Trong môi trường doanh nghiệp, tính minh bạch là yếu tố sống còn. **Activity Logs** (Nhật ký hoạt động) ghi lại toàn bộ lịch sử thao tác trên dữ liệu, giúp Admin trả lời các câu hỏi: *"Ai đã xóa file này?", "Ai đã sửa tài liệu này lần cuối?", "File này được chia sẻ cho ai?"*.

## 1. Truy cập Nhật ký

Có 2 cách để xem nhật ký, tùy thuộc vào phạm vi bạn muốn kiểm tra.

{% stepper %}
{% step %}

### Xem toàn bộ hoạt động (Global Activity)

Để xem dòng chảy hoạt động của tất cả các file liên quan đến bạn hoặc hệ thống:

* Nhấp vào biểu tượng **Sấm sét (Activity)** trên thanh menu trên cùng (Bên cạnh biểu tượng Tệp tin).
* Danh sách các hành động mới nhất sẽ hiện ra theo thời gian thực.
* Bên cột trái, bạn có thể lọc theo:
  * **By you (Bởi bạn):** Những gì bạn đã làm.
  * **By others (Bởi người khác):** Những gì nhân viên khác làm trên các file bạn quản lý/chia sẻ.
    {% endstep %}

{% step %}

### Xem lịch sử của một Thư mục/File cụ thể (Chi tiết nhất)

Đây là cách dùng phổ biến nhất để điều tra sự cố mất dữ liệu.

* Vào mục **Tệp tin (Files)**.
* Tìm đến thư mục hoặc file cần kiểm tra.
* Nhấp vào dấu **(...)** -> Chọn **Chi tiết (Details)**.
* Chuyển sang tab **Hoạt động (Activity)**.
* Tại đây, bạn sẽ thấy lịch sử chi tiết: *Ai đã tạo, ai đã sửa, ai đã xóa vào ngày giờ nào*.
  {% endstep %}
  {% endstepper %}

## 2. Giải mã các sự kiện

Hệ thống ghi nhận các hành động chính sau đây:

| Hành động    | Biểu tượng        | Ý nghĩa                                                        | Mức độ quan trọng                  |
| ------------ | ----------------- | -------------------------------------------------------------- | ---------------------------------- |
| **Created**  | ✨ (Sao vàng)      | Tạo file mới hoặc upload file mới lên.                         | Thông thường                       |
| **Changed**  | 📝 (Bút chì)      | Nội dung file đã bị thay đổi (Sửa Excel, Word...).             | Quan trọng (để theo dõi phiên bản) |
| **Deleted**  | 🗑️ (Thùng rác)   | File đã bị xóa. (Admin cần kiểm tra ngay nếu đây là xóa nhầm). | **Rất quan trọng**                 |
| **Restored** | ♻️ (Mũi tên vòng) | File đã được khôi phục lại từ thùng rác.                       | Thông thường                       |
| **Shared**   | 🔗 (Mạng lưới)    | File được chia sẻ cho người khác hoặc tạo Public Link.         | **Cần giám sát bảo mật**           |

## 3. Tình huống thực tế: Truy vết "Ai đã xóa file?"

**Kịch bản:** Trưởng phòng Kế toán báo cáo thư mục "Lương Thưởng 2025" bỗng nhiên trống trơn và yêu cầu IT giải trình.

**Quy trình xử lý của Admin:**

{% stepper %}
{% step %}

### Bước 1

Truy cập vào thư mục cha của thư mục bị mất.
{% endstep %}

{% step %}

### Bước 2

Mở tab **Activity (Hoạt động)** bên phải.
{% endstep %}

{% step %}

### Bước 3

Cuộn xuống để tìm các dòng có biểu tượng **Thùng rác 🗑️**.
{% endstep %}

{% step %}

### Bước 4

Hệ thống sẽ ghi rõ: *"You deleted..."* (Bạn đã xóa) hoặc *"Nguyen Van A deleted..."* (Nguyễn Văn A đã xóa).

* Kết luận: Bạn chụp lại màn hình dòng log này gửi cho Trưởng phòng để làm bằng chứng.
  {% endstep %}

{% step %}

### Bước 5 — Khôi phục

Vào mục **Deleted files (Thùng rác)**, tìm file đó và khôi phục lại.
{% endstep %}
{% endstepper %}

## 4. Cấu hình lưu trữ Log (Dành cho Admin)

Mặc định, nhật ký có thể được lưu vô thời hạn, điều này sẽ làm phình database của máy chủ. Bạn nên thiết lập chính sách tự động xoá log cũ.

{% stepper %}
{% step %}

### Mở cài đặt quản trị

* Nhấp vào **Avatar** -> **Cài đặt quản trị (Administration settings)**.
* Ở cột bên trái, chọn mục **Luồng hoạt động (Activity)**.
  {% endstep %}

{% step %}

### Bật và cấu hình retention

Tại phần **Enable retention (Bật lưu trữ)**, bạn có thể cấu hình:

* **Default retention:** Ví dụ chọn `One year` (1 năm) hoặc `6 months`.
  {% endstep %}

{% step %}

### Lưu thay đổi

* Nhấn **Save**.
* Tác dụng: Hệ thống sẽ tự động xóa các dòng nhật ký cũ hơn khoảng thời gian bạn chọn (ví dụ 1 năm) để giảm tải cho máy chủ, giúp web chạy nhanh hơn.
  {% endstep %}
  {% endstepper %}

{% hint style="info" %}
💡 Mẹo: Đừng tắt tính năng **Activity App** trong phần quản lý ứng dụng (Apps). Nếu tắt nó, bạn sẽ mất hoàn toàn khả năng truy vết (Audit Trail) và không thể biết ai đã làm gì với dữ liệu công ty.
{% endhint %}
