> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/chia-se-and-phan-quyen.md).

# Chia sẻ & phân quyền

Sức mạnh thực sự của **CloudFile** nằm ở khả năng cộng tác. Thay vì gửi các tệp đính kèm nặng nề qua Email hay Zalo, bạn chỉ cần gửi một **Liên kết (Link)**. Điều này giúp:

* **Kiểm soát phiên bản:** Mọi người cùng làm việc trên một file duy nhất, không còn cảnh `File_V1`, `File_V2_Final`, `File_V3_Chot_Gap`.
* **Bảo mật:** Bạn có thể thu hồi quyền truy cập bất cứ lúc nào.

Trước khi bắt đầu chia sẻ, hãy nắm rõ các khái niệm dưới đây để bảo vệ dữ liệu của bạn.

## 1. Các phương thức chia sẻ

Hệ thống cung cấp 3 phương thức chia sẻ chính, tùy thuộc vào đối tượng người nhận:

### 🅰️ Chia sẻ Nội bộ (Internal Share)

* **Đối tượng:** Đồng nghiệp trong cùng công ty (đã có tài khoản trên hệ thống).
* **Cách thức:** Bạn chỉ cần gõ Tên hoặc Email của họ.
* **Ưu điểm:** Dữ liệu sẽ xuất hiện ngay lập tức trong tài khoản của họ. Bạn có thể cấp quyền chỉnh sửa trực tiếp.

### 🅱️ Liên kết công khai (Public Link)

* **Đối tượng:** Khách hàng, Đối tác bên ngoài (không có tài khoản).
* **Cách thức:** Hệ thống tạo ra một đường link duy nhất (như Google Drive). Bạn gửi link này qua Email/Chat cho đối tác.
* **Bảo mật:** Nên đặt Mật khẩu và Ngày hết hạn cho link này.

### 🅾️ Chia sẻ qua Nhóm (Circle/Group Share)

* **Đối tượng:** Một phòng ban hoặc đội nhóm cụ thể (Ví dụ: "Phòng Marketing", "Ban Giám Đốc").
* **Cách thức:** Chia sẻ một lần cho cả nhóm, tất cả thành viên trong nhóm đều nhận được.

## 2. Các cấp độ Phân quyền (Permissions)

Khi bạn chia sẻ một file hay thư mục, mặc định người nhận chỉ có thể **Xem**. Tuy nhiên, bạn có thể cấp thêm các quyền sau:

| **Quyền hạn**          | **Ý nghĩa**                                                                                                                                                                                                                      | **Khi nào nên dùng?**                                                                                                                                                                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **View only**          | Người nhận **chỉ xem và tải về** (nếu hệ thống cho phép download/sync). **Không thể chỉnh sửa, chia sẻ tiếp hoặc xóa**.                                                                                                          | Gửi tài liệu đã chốt: báo cáo, hợp đồng, tài liệu tham khảo; chia sẻ cho nhiều người nhưng muốn **an toàn tối đa**.                                                                                                                              |
| **Allow editing**      | Người nhận **xem + chỉnh sửa nội dung** và lưu trực tiếp lên file gốc. **Không được chia sẻ tiếp hoặc xóa** (theo mặc định chế độ này).                                                                                          | Làm việc nhóm/cộng tác soạn thảo (Word/Excel/OnlyOffice) khi cần người nhận **cùng sửa nội dung**.                                                                                                                                               |
| **Custom permissions** | Tùy chỉnh chi tiết theo nhu cầu:• **Read**: Xem/tải file (quyền nền tảng).• **Edit**: Chỉnh sửa nội dung file.• **Share**: Cho phép chia sẻ tiếp cho người khác.• **Delete**: Cho phép xóa file/thư mục trong vùng được chia sẻ. | Khi cần **kiểm soát sát quyền theo vai trò** (trưởng nhóm, người tổng hợp, nhóm cộng tác). Khuyến nghị thường dùng: **Read + Edit** (không Share/ Delete) cho cộng tác; chỉ bật **Share** cho người chịu trách nhiệm; hạn chế tối đa **Delete**. |

## 3. Tính năng đặc biệt: File Drop (Hộp thư chết)

Đây là tính năng cực kỳ hữu ích cho doanh nghiệp khi làm việc với khách hàng.

* **Tình huống:** Bạn cần khách hàng gửi cho bạn một file dung lượng lớn (Video 2GB, File thiết kế 500MB) mà Email không gửi được.
* **Giải pháp:** Bạn tạo một thư mục, bật tính năng **"File Drop (Chỉ tải lên)"**.
* **Kết quả:** Khách hàng bấm vào link, họ chỉ thấy một ô để thả file vào. Họ **không thể xem** các file khác trong đó. Chỉ có bạn mới thấy được file họ gửi.

{% hint style="info" %}
Mẹo: Sử dụng File Drop khi bạn muốn thu thập file từ nhiều người mà không để họ truy cập hoặc xem nội dung đã tồn tại trong thư mục.
{% endhint %}

## 4. Các lớp bảo mật nâng cao

Để đảm bảo an toàn khi chia sẻ ra bên ngoài (Public Link), hệ thống cung cấp các chốt chặn bảo mật:

{% stepper %}
{% step %}

#### Mật khẩu (Password protect)

Người nhận phải có mật khẩu do bạn cung cấp mới mở được link.
{% endstep %}

{% step %}

#### Ngày hết hạn (Expiration date)

Link sẽ tự động "chết" sau một ngày cụ thể (Ví dụ: Sau ngày thầu, sau ngày nghiệm thu).
{% endstep %}

{% step %}

#### Ghi chú cho người nhận (Note)

Gửi kèm một lời nhắn hiển thị khi họ mở link (Ví dụ: "Đây là bản thảo mật, vui lòng không gửi ra ngoài").
{% endstep %}
{% endstepper %}

{% hint style="info" %}
Nguyên tắc vàng: Luôn tuân thủ nguyên tắc **"Quyền tối thiểu" (Least Privilege)**. Chỉ cấp quyền vừa đủ để người nhận hoàn thành công việc, không cấp dư thừa. Nếu chỉ cần xem, đừng cấp quyền sửa!
{% endhint %}
