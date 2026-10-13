> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/huong-dan-quan-ly-admin/nhom-va-phan-quyen.md).

# Nhóm và phần quyền

Trong quản trị hệ thống CloudFile, **Nhóm (Group)** là công cụ quyền lực nhất giúp Admin tiết kiệm thời gian. Thay vì cấp quyền cho từng cá nhân riêng lẻ, bạn quản lý quyền hạn thông qua các Nhóm.

Trang này giúp bạn hình dung cấu trúc phân quyền trước khi bắt tay vào thiết lập.

## 1. Tại sao phải dùng Nhóm (Group)?

Hãy tưởng tượng bạn có một thư mục "Tài liệu Kinh doanh" và phòng Kinh doanh có 20 nhân viên.

* **Cách làm sai:** Chia sẻ thư mục này cho từng người một (20 lần thao tác). Khi có nhân viên mới, bạn lại phải chia sẻ lại cho người đó.
* **Cách làm đúng:** Tạo nhóm `Phong_Kinh_Doanh`, thêm 20 nhân viên vào nhóm. Sau đó chia sẻ thư mục cho nhóm `Phong_Kinh_Doanh` (1 lần thao tác).

{% stepper %}
{% step %}

### Tự động hóa

Khi có nhân viên mới (Onboarding), bạn chỉ cần thêm họ vào nhóm `Phong_Kinh_Doanh`, họ sẽ **tự động** thấy tất cả tài liệu của phòng đó mà bạn không cần làm gì thêm.
{% endstep %}

{% step %}

### Tránh sai sót

Giảm thiểu rủi ro quên cấp quyền hoặc cấp nhầm quyền cho người không liên quan.
{% endstep %}
{% endstepper %}

## 2. Mô hình Phân cấp Quản trị (Roles)

Hệ thống CloudFile thiết kế 3 cấp độ người dùng để phù hợp với sơ đồ tổ chức doanh nghiệp:

| Cấp độ      | Tên gọi                                                        | Quyền hạn & Trách nhiệm                                                                                                                                                                                                                                                                    |
| ----------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Level 1** | <p><strong>Super Admin</strong><br><em>(Tenant Admin)</em></p> | <p>• Là Bạn (Người đang đọc tài liệu này).<br>• Có quyền sinh sát toàn bộ hệ thống.<br>• Quản lý tất cả Nhóm và tất cả User.</p>                                                                                                                                                           |
| **Level 2** | <p><strong>Group Admin</strong><br><em>(Trưởng nhóm)</em></p>  | <p>• Là Trưởng phòng/Trưởng bộ phận.<br>• <strong>Quyền hạn:</strong> Có thể tạo, xóa, reset mật khẩu user <strong>nhưng chỉ trong nhóm của họ</strong>.<br>• <strong>Mục đích:</strong> Giúp giảm tải cho Super Admin. (Ví dụ: Trưởng phòng Sale tự tạo user cho nhân viên Sale mới).</p> |
| **Level 3** | <p><strong>User</strong><br><em>(Người dùng)</em></p>          | <p>• Là nhân viên thông thường.<br>• Chỉ có quyền sử dụng các file được chia sẻ.</p>                                                                                                                                                                                                       |

## 3. Quy tắc đặt tên Nhóm

Cũng giống như User, tên Nhóm cần được đặt khoa học để dễ quản lý, đặc biệt khi công ty lớn dần.

* **Nên dùng:** Viết liền không dấu hoặc dùng gạch dưới `_`.
* **Cấu trúc gợi ý:** `[Loại]_[TenPhongBan]`

Ví dụ thực tế:

* `Phong_Kinh_Doanh` (Nhóm phòng ban chính thức)
* `Phong_Ke_Toan`
* `DuAn_Vinhomes` (Nhóm tạm thời cho dự án)
* `BGĐ` (Ban Giám Đốc - Nhóm VIP)

##
