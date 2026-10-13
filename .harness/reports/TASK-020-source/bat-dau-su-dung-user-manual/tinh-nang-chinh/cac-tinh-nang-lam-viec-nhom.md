> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/cac-tinh-nang-lam-viec-nhom.md).

# Các tính năng làm việc nhóm

Hệ thống không chỉ dừng lại ở việc lưu trữ tệp tin. CloudFile còn tích hợp sẵn một bộ công cụ làm việc nhóm mạnh mẽ, giúp người dùng và đồng nghiệp kết nối liền mạch mà không cần cài đặt thêm phần mềm bên thứ 3.

## Quản lý Lịch làm việc (Calendar)

Hệ thống CloudFile còn cung cấp một cuốn **Lịch thông minh** giúp bạn quản lý thời gian và sắp xếp cuộc họp với đồng nghiệp mà không cần dùng đến Google Calendar.

### 1. Truy cập Lịch

Trên thanh menu chính (trên cùng), nhấp vào biểu tượng **Quyển lịch (Calendar)**.

### 2. Tạo sự kiện & Mời họp

#### Tạo lịch hẹn cá nhân

{% stepper %}
{% step %}
Nhấp vào bất kỳ ô ngày/giờ nào trên lịch.
{% endstep %}

{% step %}
Nhập tiêu đề (Ví dụ: "Họp dự án A").
{% endstep %}

{% step %}
Chọn thời gian bắt đầu và kết thúc.
{% endstep %}

{% step %}
Nhấn **Save (Lưu)**.
{% endstep %}
{% endstepper %}

#### Mời đồng nghiệp tham gia

{% stepper %}
{% step %}
Trong bảng tạo sự kiện, nhập tên đồng nghiệp vào ô **Attendees (Người tham dự)**.
{% endstep %}

{% step %}
Hệ thống sẽ gửi email mời họp cho họ.
{% endstep %}

{% step %}
Nếu đồng nghiệp chấp nhận, lịch của họ sẽ tự động cập nhật sự kiện này.
{% endstep %}
{% endstepper %}

#### Lịch Nhóm & Chia sẻ Lịch

Đây là tính năng mạnh mẽ nhất cho làm việc nhóm. Bạn có thể tạo ra một cuốn lịch chung (Ví dụ: "Lịch nghỉ phép phòng Marketing", "Lịch trực kỹ thuật") và chia sẻ cho cả phòng.

Cách làm:

{% stepper %}
{% step %}
Ở cột bên trái, tìm mục **Calendars**.
{% endstep %}

{% step %}
Bấm vào dấu `+` để tạo lịch mới (Đặt tên: *Lịch Team A*).
{% endstep %}

{% step %}
Bấm vào biểu tượng **Chia sẻ** bên cạnh tên lịch vừa tạo.
{% endstep %}

{% step %}
Nhập tên Nhóm (Ví dụ: `Marketing`) hoặc tên từng đồng nghiệp.
{% endstep %}

{% step %}
**Kết quả:** Mọi sự kiện bạn thêm vào "Lịch Team A" sẽ hiện lên trên máy của tất cả thành viên trong nhóm.
{% endstep %}
{% endstepper %}

## Danh bạ (Contacts)

Tính năng Danh bạ giúp bạn lưu trữ thông tin đối tác, khách hàng tập trung và an toàn, tách biệt với danh bạ cá nhân trên điện thoại.

### 1. Truy cập Danh bạ

Nhấp vào biểu tượng **Hình người (Contacts)** trên thanh menu.

### 2. Danh bạ Hệ thống (Tự động)

Mặc định, bạn không cần làm gì cả. Hệ thống đã tự động tích hợp danh sách **Toàn bộ nhân viên trong công ty**.

* **Lợi ích:** Khi bạn gõ tên đồng nghiệp để chia sẻ file hay mời họp, hệ thống sẽ tự động gợi ý email chính xác, không lo gửi nhầm.

### 3. Tạo Danh bạ Khách hàng (Thủ công)

Bạn có thể lưu thông tin khách hàng để cả phòng cùng sử dụng.

{% stepper %}
{% step %}
Nhấn nút **New contact (Liên hệ mới)**.
{% endstep %}

{% step %}
Nhập Tên, Email, SĐT, Công ty, Địa chỉ.
{% endstep %}

{% step %}
**Nhóm danh bạ (Groups):** Bạn có thể tạo các nhóm như "VIP Customers", "Nhà cung cấp" để dễ lọc.
{% endstep %}
{% endstepper %}

### 4. Chia sẻ Danh bạ (Team Contacts)

Thay vì mỗi nhân viên Sales giữ một file Excel khách hàng riêng lẻ, hãy dùng chung một sổ địa chỉ:

{% stepper %}
{% step %}
Tạo một sổ địa chỉ mới (Ví dụ: "Khách hàng Miền Bắc").
{% endstep %}

{% step %}
Vào phần **Cài đặt (Settings)** của sổ địa chỉ đó.
{% endstep %}

{% step %}
Chọn **Share (Chia sẻ)** và gửi cho nhóm `Sales_Team`.
{% endstep %}

{% step %}
**Kết quả:** Khi một nhân viên Sales thêm số điện thoại khách hàng mới, cả phòng Sales đều nhìn thấy ngay lập tức.
{% endstep %}
{% endstepper %}

## Ghi chú (Notes)

Đừng để những ý tưởng hay biên bản cuộc họp bị thất lạc trong sổ tay hay tin nhắn Zalo trôi nhanh. Hãy dùng tính năng **Notes** để lưu trữ và cộng tác.

### 1. Truy cập Ghi chú

Nhấp vào biểu tượng **Cây bút (Notes)** trên thanh menu.\
*(Giao diện đơn giản, tập trung vào viết lách).*

### 2. Viết ghi chú chuẩn Markdown

Notes sử dụng định dạng Markdown, giúp văn bản đẹp và gọn gàng:

* Gõ `#` rồi cách: Để tạo Tiêu đề lớn.
* Gõ `*` rồi cách: Để tạo gạch đầu dòng.
* Gõ `[ ]` rồi cách: Để tạo Check-list công việc.

### 3. Cộng tác thời gian thực

Bạn đang họp và cần thư ký ghi biên bản, sếp bổ sung ý kiến cùng lúc?

{% stepper %}
{% step %}
Tạo một ghi chú mới (Ví dụ: *Bien\_Ban\_Hop\_Tuan\_24*).
{% endstep %}

{% step %}
Nhìn sang cột bên phải (Chi tiết), chọn tab **Sharing (Chia sẻ)**.
{% endstep %}

{% step %}
Gõ tên đồng nghiệp hoặc nhóm cần chia sẻ.
{% endstep %}

{% step %}
Cấp quyền **Can edit (Được sửa)**.
{% endstep %}

{% step %}
**Kết quả:** Mọi người có thể mở ghi chú đó lên và cùng viết, nội dung sẽ đồng bộ ngay lập tức.
{% endstep %}
{% endstepper %}

### 4. Biến Ghi chú thành Công việc (Tasks)

*(Nếu hệ thống có cài đặt thêm module Tasks/Deck)*\
Bạn có thể chuyển các dòng trong ghi chú thành các đầu việc cụ thể để theo dõi tiến độ trên bảng Kanban (Deck).
