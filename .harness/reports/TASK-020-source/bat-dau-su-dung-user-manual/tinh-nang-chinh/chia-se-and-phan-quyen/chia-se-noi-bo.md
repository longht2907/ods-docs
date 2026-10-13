> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/chia-se-and-phan-quyen/chia-se-noi-bo.md).

# Chia sẻ nội bộ

Hướng dẫn chi tiết cách **chia sẻ file và thư mục với đồng nghiệp trong cùng tổ chức** thông qua hệ thống CloudFile, giúp bạn làm việc nhóm hiệu quả và bảo mật.

**Khi nào sử dụng:**

* Gửi báo cáo cho sếp.
* Chia sẻ thư mục dự án cho team.
* Cộng tác chỉnh sửa tài liệu với đồng nghiệp.
* Cho phép phòng ban khác xem dữ liệu.

**Ưu điểm so với Public Link:**

* ✅ Bảo mật cao (chỉ người trong tổ chức).
* ✅ Kiểm soát chính xác ai truy cập.
* ✅ Có audit trail đầy đủ.
* ✅ Không cần mật khẩu/hết hạn (tài khoản đã xác thực).

## 🔍 Chia Sẻ Nội Bộ là gì?

**Internal Sharing (Chia sẻ nội bộ)** là cách chia sẻ file/thư mục với **người dùng có tài khoản CloudFile trong cùng tổ chức** của bạn.

### Đặc điểm chính:

✅ **Bảo mật cao**

* Chỉ người trong công ty mới truy cập được.
* Không có link công khai nào được tạo ra.
* Yêu cầu đăng nhập để xem.

✅ **Kiểm soát chặt chẽ**

* Biết chính xác ai đang xem/sửa.
* Phân quyền chi tiết từng người.
* Nhận thông báo khi có thay đổi.

✅ **Collaboration-friendly**

* Nhiều người cùng làm việc trên 1 file.
* Comment, versioning (phiên bản).
* Real-time editing (nếu hỗ trợ).

✅ **Audit trail đầy đủ**

* Xem lịch sử ai đã xem, sửa, xóa.
* Khôi phục phiên bản cũ.
* Theo dõi hoạt động.

## 🆚 So Sánh: Internal Sharing vs Public Link

| Tiêu chí          | Internal Sharing                      | Public Link                   |
| ----------------- | ------------------------------------- | ----------------------------- |
| **Đối tượng**     | Chỉ đồng nghiệp (có tài khoản)        | Bất kỳ ai có link             |
| **Bảo mật**       | ⭐⭐⭐⭐⭐ Rất cao                         | ⭐⭐⭐ Trung bình                |
| **Cần đăng nhập** | Có                                    | Không                         |
| **Kiểm soát**     | Chặt chẽ (biết chính xác ai truy cập) | Lỏng hơn (chỉ biết số lượt)   |
| **Phân quyền**    | Chi tiết từng người                   | Chung cho tất cả              |
| **Audit log**     | Đầy đủ                                | Hạn chế                       |
| **Collaboration** | Hỗ trợ tốt                            | Hạn chế                       |
| **Khi nào dùng**  | Tài liệu nội bộ, dự án                | Khách hàng, đối tác bên ngoài |

> 💡 **Nguyên tắc**: Luôn ưu tiên **Internal Sharing** nếu người nhận có tài khoản CloudFile. Chỉ dùng Public Link khi **không còn cách nào khác**.

## 🖱️ Phần 1: Chia Sẻ cho User Cụ Thể

{% stepper %}
{% step %}

### Chọn File hoặc Thư Mục

* Đăng nhập vào CloudFile.
* Vào mục **Files**.
* Tìm file/thư mục cần chia sẻ (VD: `Bao_Cao_Thang_01_2026.pdf`).
  {% endstep %}

{% step %}

### Mở Hộp Thoại Share

Cách 1: Dùng biểu tượng Share

* Click vào biểu tượng **Share** (icon người hoặc mũi tên) bên cạnh tên file.

Cách 2: Dùng menu ngữ cảnh

* Click vào **⋮** (ba chấm dọc) → chọn **Share / Chia sẻ**.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FXuE67duc8myctAOXn7Vb%2Fimage.png?alt=media&amp;token=d7560c07-6e18-4076-af59-9eae3baf4982" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Thêm Người Nhận

Trong hộp thoại Share:

* Tìm ô nhập **"Add people"** / **"Share with"** / **"Chia sẻ với"**.
* Bắt đầu gõ tên hoặc email của đồng nghiệp:
  * VD: Gõ `nguyen` → hệ thống gợi ý "Nguyễn Văn A", "Nguyễn Thị B"...
* Click chọn người cần chia sẻ từ danh sách gợi ý.
* Có thể thêm nhiều người cùng lúc (gõ → chọn → gõ tiếp).

Mẹo:

* Gõ email đầy đủ nếu có nhiều người cùng tên.
* Hệ thống chỉ hiện **người trong cùng tổ chức**.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2F3IudKtpQvCqaK6wlSuKA%2Fimage.png?alt=media&amp;token=2ce90ed4-0592-4926-97b4-803924e7882b" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Chọn Quyền Truy Cập

Sau khi chọn người nhận, bạn sẽ thấy dropdown quyền bên cạnh tên họ.

Các mức quyền:

| Quyền         | Ký hiệu | Xem | Tải | Sửa | Xóa | Chia sẻ tiếp |
| ------------- | ------- | --- | --- | --- | --- | ------------ |
| V**iew** Only | 👁️     | ✅   | ✅   | ❌   | ❌   | ❌            |
| Allow editing | ✏️      | ✅   | ✅   | ✅   | ⚠️  | ❌            |
| **Custom**    | 👥      | ✅   | ✅   | ✅   | ✅   | ✅            |
| {% endstep %} |         |     |     |     |     |              |

{% step %}

### Gửi Thông Báo (Tuỳ chọn)

Trước khi share:

* Tìm checkbox **"Notify by email"** / **"Send notification"**.
* Nếu bật: người nhận sẽ nhận email thông báo có file mới được chia sẻ.
* Có thể thêm tin nhắn:
  * VD: *"Em gửi anh báo cáo tháng 1, anh xem giúp em ạ."*

Khuyến nghị: Luôn bật thông báo để người nhận biết ngay, không bỏ lỡ.
{% endstep %}

{% step %}

### Hoàn Tất

* Click nút **Share** / **Chia sẻ**.
* Người nhận ngay lập tức có quyền truy cập.
* Nếu bật thông báo: họ nhận email kèm link trực tiếp đến file.

Kết quả:

* ✅ Người nhận thấy file trong mục **"Shared with me"** (Được chia sẻ cho tôi).
* ✅ Họ nhận email thông báo (nếu bật).
* ✅ Họ có thể xem/sửa tuỳ quyền bạn cấp.
* ✅ Bạn thấy tên họ trong danh sách "Shared with" của file đó.
  {% endstep %}
  {% endstepper %}

## 👥 Phần 2: Chia Sẻ cho Nhóm/Phòng Ban (Group Sharing)

Thay vì thêm từng người một, bạn có thể chia sẻ cho **cả nhóm** (nếu Admin đã tạo group).

{% stepper %}
{% step %}

### Chọn Thư Mục Cần Chia Sẻ

VD: `Du_An_Campaign_Tet_2026/`
{% endstep %}

{% step %}

### Mở Hộp Thoại Share

Click **Share** giống như phần 1.
{% endstep %}

{% step %}

### Thêm Nhóm

* Trong ô **"Add people"**, gõ tên nhóm:
  * VD: `Marketing`, `Sales`, `IT`...
* Hệ thống sẽ gợi ý các nhóm có sẵn (biểu tượng 👥).
* Click chọn nhóm.

Lưu ý: Chỉ có các nhóm mà Admin đã tạo mới xuất hiện. Nếu không thấy nhóm mong muốn, liên hệ Admin.

Gợi ý screenshot:&#x20;
{% endstep %}

{% step %}

### Chọn Quyền cho Nhóm

Giống như chia sẻ cho cá nhân:

* **Viewer**: Cả nhóm chỉ xem.
* **Editor**: Cả nhóm có thể chỉnh sửa.
* **Co-owner**: Cả nhóm có thể quản lý + chia sẻ tiếp.
  {% endstep %}

{% step %}

### Xác Nhận & Gửi

* Click **Share**.

Kết quả:

* ✅ **Tất cả thành viên** trong nhóm Marketing đều có quyền truy cập.
* ✅ Nếu Admin thêm người mới vào nhóm sau này → người đó **tự động** có quyền.
* ✅ Nếu ai đó bị xóa khỏi nhóm → **tự động** mất quyền.

Ưu điểm Group Sharing: Quản lý dễ dàng, không cần thêm/xóa từng người khi có thay đổi nhân sự.
{% endstep %}
{% endstepper %}

### 💡 Nguyên Tắc Phân Quyền

**Nguyên tắc "Least Privilege" (Quyền tối thiểu):**\
Chỉ cấp đúng quyền **cần thiết** để người đó hoàn thành công việc, không hơn.

Ví dụ:

* Sếp cần xem báo cáo → **Viewer**.
* Team cùng làm dự án → **Editor**.
* Đồng PM quản lý → **Co-owner**.

Tránh:

* ❌ Cho Co-owner cho tất cả mọi người.
* ❌ Cho Editor khi chỉ cần Viewer.

### 📊 Xem Hoạt Động (Activity Log)

* Mở file/thư mục.
* Click tab **"Activity"** / **"Hoạt động"**.
* Bạn sẽ thấy lịch sử: ai đã xem, ai đã chỉnh sửa, ai đã tải về, thời gian cụ thể.

## 🤝 Phần 5: Cộng Tác Làm Việc Trên File

### 📝 Real-time Collaboration&#x20;

Với các file Office (Word, Excel, PowerPoint) hoặc tích hợp Collabora/OnlyOffice:

* ✅ Nhiều người cùng chỉnh sửa 1 file **đồng thời**.
* ✅ Thấy con trỏ của người khác real-time.
* ✅ Thay đổi được lưu tự động.
* ✅ Comment trực tiếp trong file.

Cách dùng:

1. Chia sẻ file với quyền **Editor**.
2. Cả team mở file cùng lúc.
3. Mỗi người chỉnh sửa phần của mình.
4. Hệ thống tự merge thay đổi.

> Giống Google Docs nhưng trên CloudFile.

### 📂 Làm Việc trên Thư Mục Chung

Workflow điển hình:

1. PM tạo thư mục: `Du_An_Website_2026/`.
2. Chia sẻ cho team với quyền **Editor**.
3. Mỗi người upload file của mình vào thư mục:
   * Designer: Upload mockup.
   * Developer: Upload code.
   * Content: Upload bài viết.
4. Ai cũng thấy file của người khác.
5. Comment, feedback trực tiếp trên file.

### 💬 Comment & Mention

* Mở file.
* Click **"Add comment"** / **"Bình luận"**.
* Gõ comment, có thể **@mention** người khác:
  * VD: *"@NguyenVanA anh kiểm tra phần này giúp em."*
* Người được mention nhận thông báo.

### 📜 Version History (Lịch Sử Phiên Bản)

Khi nhiều người cùng sửa file, CloudFile tự động lưu các phiên bản:

* Click **⋮** → **Versions** / **Lịch sử**.
* Xem danh sách các phiên bản (ngày, người sửa).
* Có thể **preview** hoặc **khôi phục** phiên bản cũ.

Gợi ý screenshot:&#x20;

## 🗑️ Phần 6: Thu Hồi Quyền Chia Sẻ

Khi cần thu hồi quyền (dự án kết thúc, người nghỉ việc, chia sẻ nhầm, ...), làm theo các bước:

{% stepper %}
{% step %}

### Mở Hộp Thoại Share

Tìm file/thư mục đã chia sẻ → Click **Share**.
{% endstep %}

{% step %}

### Tìm Người Cần Thu Hồi

Trong danh sách **"Shared with"**, tìm tên người hoặc nhóm.
{% endstep %}

{% step %}

### Xóa Quyền

Cách 1: Dùng nút X

* Click vào **X** bên cạnh tên người đó.
* Xác nhận.

Cách 2: Đổi quyền thành "Remove access"

* Click dropdown quyền.
* Chọn **"Remove access"** / **"Xóa quyền"**.

Gợi ý screenshot:&#x20;
{% endstep %}

{% step %}

### Xác Nhận

* Người đó **ngay lập tức mất quyền** truy cập.
* File biến mất khỏi mục "Shared with me" của họ.
* Họ không mở được file nữa (báo lỗi quyền).
* Nếu đang mở file → bị kick out.
  {% endstep %}
  {% endstepper %}

### Thay Đổi Quyền (Thay Vì Thu Hồi Hoàn Toàn)

Nếu muốn **giảm quyền**:

* Ví dụ: Đổi từ **Editor** → **Viewer**.
* Người đó vẫn xem được nhưng không sửa được nữa.

Cách làm:

* Click dropdown quyền bên cạnh tên.
* Chọn quyền mới (VD: Viewer).
* Thay đổi áp dụng ngay.

## ⚠️ Xử Lý Sự Cố (FAQ)

<details>

<summary>Không tìm thấy tên đồng nghiệp</summary>

Nguyên nhân:

* Người đó chưa có tài khoản CloudFile.
* Gõ sai tên/email.
* Người đó thuộc tổ chức khác.

Cách xử lý:

* Kiểm tra lại chính tả.
* Hỏi email chính xác của người đó.
* Liên hệ Admin để tạo tài khoản (nếu chưa có).

</details>

<details>

<summary>Người nhận báo không thấy file</summary>

Nguyên nhân:

* Chưa refresh.
* Xem sai mục (cần xem "Shared with me").
* Email thông báo vào spam.
* Chưa chia sẻ (lỗi click Share).

Cách xử lý:

* Yêu cầu họ **refresh** trình duyệt.
* Hướng dẫn họ vào **"Shared with me"** trong CloudFile.
* Kiểm tra lại danh sách "Shared with" → xem tên họ có trong đó không.

</details>

<details>

<summary>Không sửa được file dù đã được share</summary>

Nguyên nhân:

* Quyền chỉ là **Viewer**, không phải Editor.
* File đang bị lock bởi người khác.
* File ở định dạng không hỗ trợ edit online.

Cách xử lý:

* Kiểm tra quyền (xem dropdown).
* Yêu cầu người chia sẻ **đổi quyền thành Editor**.
* Tải file về, sửa, upload lại (nếu không edit online được).

</details>

***

Internal Sharing = An toàn + Collaboration tốt. Luôn ưu tiên phương thức này khi người nhận có tài khoản CloudFile!
