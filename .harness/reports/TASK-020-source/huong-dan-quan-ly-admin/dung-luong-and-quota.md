> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/huong-dan-quan-ly-admin/dung-luong-and-quota.md).

# Dung lượng & Quota

Là người quản trị, bạn cần nắm rõ ai đang sử dụng bao nhiêu tài nguyên của công ty để có phương án điều chỉnh kịp thời.\
Dung lượng & Quota giúp Admin:

* Kiểm soát **mức sử dụng lưu trữ của từng user / group**
* Tránh tình trạng **đầy disk đột ngột**
* Phân bổ tài nguyên **công bằng & có kế hoạch**
* Giảm rủi ro mất dịch vụ, downtime

## 1. Kiểm tra Dung lượng sử dụng

### 1.1. Xem tổng quan từng người

{% stepper %}
{% step %}

### Đăng nhập quyền Admin

Đăng nhập vào hệ thống với quyền **Admin**.
{% endstep %}

{% step %}

### Vào trang Users

Vào menu **Cài đặt người dùng (Users)**.
{% endstep %}

{% step %}

### Quan sát cột Hạn mức (Quota)

Quan sát cột **Hạn mức (Quota)** trong danh sách người dùng.
{% endstep %}

{% step %}

### Đọc thanh trạng thái

Bạn sẽ thấy một thanh trạng thái bên dưới con số dung lượng:

* **Thanh màu xám/xanh:** Mức sử dụng bình thường.
* **Thanh màu đỏ:** Cảnh báo dung lượng sắp đầy hoặc đã đầy.

Ví dụ hiển thị: `4.5 GB / 5 GB` (Nghĩa là đã dùng 4.5 GB trên tổng số 5 GB được cấp).
{% endstep %}
{% endstepper %}

### 1.2. Tìm ra "Người dùng tốn kém nhất"

{% stepper %}
{% step %}

### Tìm cột tiêu đề

Tại dòng tiêu đề của bảng danh sách người dùng.
{% endstep %}

{% step %}

### Nhấp vào tiêu đề "Đã dùng" hoặc "Quota"

Nhấp vào chữ **Đã dùng (Used)** hoặc tiêu đề cột **Quota**.
{% endstep %}

{% step %}

### Sắp xếp theo thứ tự Cao → Thấp

Hệ thống sẽ sắp xếp danh sách theo thứ tự từ **Cao xuống Thấp**, giúp phát hiện nhanh những user chiếm dụng nhiều dung lượng.
{% endstep %}
{% endstepper %}

## 2. Thiết lập Hạn mức (Quota)

Quota (Hạn mức) là giới hạn dung lượng lưu trữ tối đa mà một người dùng được phép sử dụng. Việc đặt Quota giúp ngăn chặn việc một cá nhân làm đầy ổ cứng của toàn bộ máy chủ.

### Thiết lập Hạn mức Mặc định (Default Quota)

Đây là mức sẽ tự động áp dụng cho bất kỳ tài khoản mới nào được tạo ra (nếu bạn không chỉnh sửa gì thêm).

{% stepper %}
{% step %}

### Mở cài đặt Users

Tại trang **Account**, nhìn xuống góc dưới cùng bên trái.
{% endstep %}

{% step %}

### Mở Settings

Nhấp vào biểu tượng **Bánh răng (Settings)**.
{% endstep %}

{% step %}

### Tìm Default Quota

Tìm ô **Hạn mức mặc định (Default Quota)**.
{% endstep %}

{% step %}

### Chọn mức mặc định

Chọn mức mong muốn (Ví dụ: `5 GB`).

Khuyên dùng: Nên để mức thấp (1 GB hoặc 5 GB) để tiết kiệm. Ai cần thêm sẽ cấp riêng sau.
{% endstep %}
{% endstepper %}

### Thiết lập Hạn mức riêng cho từng cá nhân

Bạn có thể ưu ái cấp nhiều dung lượng hơn cho Sếp hoặc đội ngũ Thiết kế.

{% stepper %}
{% step %}

### Tìm user cần cấp

Tìm user cần cấp trong danh sách.
{% endstep %}

{% step %}

### Chỉnh sửa Quota

Nhấp vào biểu tượng **Cây bút chì (✏️)** ở cột **Hạn mức (Quota)**.
{% endstep %}

{% step %}

### Chọn các mốc có sẵn

Chọn các mốc có sẵn: `1 GB`, `5 GB`, `10 GB`...
{% endstep %}

{% step %}

### Tùy chỉnh số lẻ

Chọn **Khác (Other)** và nhập số bạn muốn (Ví dụ: `15 GB`, `500 MB`).
{% endstep %}

{% step %}

### Không giới hạn

Chọn **Unlimited** nếu cần. Lưu ý: `Unlimited` nghĩa là họ có thể dùng đến khi nào ổ cứng vật lý của máy chủ đầy thì thôi — chỉ nên cấp cho Giám đốc hoặc Admin.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
Đặt quota hợp lý giúp tránh tình trạng một vài tài khoản làm đầy toàn bộ ổ cứng máy chủ.
{% endhint %}

## 3. Giám sát & Xử lý khi Hết dung lượng

Điều gì sẽ xảy ra khi một nhân viên dùng hết 100% hạn mức (Quota) được cấp? Admin cần làm gì?

### Hiện tượng khi User bị "Full Quota"

<details>

<summary>Nhấp để xem các hiện tượng khi quota đầy</summary>

Khi thanh dung lượng chạm mốc đỏ 100%, nhân viên sẽ gặp các vấn đề sau:

* **Không thể tải lên:** Mọi file mới tải lên đều bị báo lỗi.
* **Ngừng đồng bộ:** Ứng dụng trên máy tính và điện thoại ngừng đẩy file mới lên server (file cũ vẫn tải về được).
* **Lỗi 0 byte:** Đôi khi file tải lên được nhưng dung lượng là 0KB (file rỗng).

</details>

{% hint style="info" %}
Dữ liệu trong **Thùng rác (Deleted files)** cũng tính vào Quota của người dùng. Nếu user đã xóa nhưng vẫn đầy, yêu cầu họ xóa vĩnh viễn trong mục Deleted files để giải phóng dung lượng thực sự.
{% endhint %}

## 3.1. Cách phát hiện & Xử lý

{% stepper %}
{% step %}

### Bước 1: Kiểm tra định kỳ

Định kỳ hàng tháng, Admin nên vào trang **Users** và sắp xếp theo cột **Used**. Nếu thấy thanh trạng thái chuyển sang **Màu đỏ**, đó là lúc cần hành động.
{% endstep %}

{% step %}

### Bước 2: Liên hệ nhân viên

Trước khi vội vàng mua thêm dung lượng, hãy yêu cầu nhân viên dọn dẹp:

* Gợi ý: "Tài khoản của bạn đã đầy. Vui lòng xóa bớt file rác, file cá nhân hoặc dọn sạch Thùng rác (Deleted files)."
  {% endstep %}

{% step %}

### Bước 3: Nâng cấp (Nếu cần thiết)

Nếu dữ liệu của họ thực sự là tài liệu công việc quan trọng:

* Vào trang **Users**.
* Chỉnh sửa Quota của họ lên mức cao hơn tiếp theo (Ví dụ: Từ `5 GB` lên `10 GB`).
* Hệ thống cập nhật ngay lập tức không cần khởi động lại.
  {% endstep %}
  {% endstepper %}

{% hint style="danger" %}
Trước khi cấp "Unlimited", cân nhắc rủi ro: người dùng unlimited có thể tiêu thụ toàn bộ dung lượng vật lý và gây downtime cho hệ thống.
{% endhint %}

Tóm tắt:

* Quota là hàng rào bảo vệ hệ thống lưu trữ CloudFile.
* Đặt quota hợp lý → hệ thống ổn định, chi phí kiểm soát.
* Không đặt quota → rủi ro đầy disk & downtime rất cao.
