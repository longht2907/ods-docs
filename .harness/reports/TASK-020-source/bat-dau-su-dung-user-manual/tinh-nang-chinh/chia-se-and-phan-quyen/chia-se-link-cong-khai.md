> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/chia-se-and-phan-quyen/chia-se-link-cong-khai.md).

# Chia sẻ link công khai

Hướng dẫn chi tiết cách **tạo và quản lý link chia sẻ công khai** trong CloudFile để chia sẻ file/thư mục với người không có tài khoản CloudFile (khách hàng, đối tác, cộng tác viên bên ngoài).

Khi nào sử dụng:

* Gửi file cho khách hàng không có tài khoản CloudFile.
* Chia sẻ tài liệu marketing, catalogue sản phẩm.
* Thu thập file từ nhiều người (upload folder).
* Tạo link download cho đối tác.

## 🔐 Public Link là gì?

**Public Link (Link công khai)** là một đường dẫn (URL) đặc biệt cho phép **bất kỳ ai có link** đều có thể truy cập file/thư mục, **không cần đăng nhập** vào CloudFile.

Đặc điểm:

✅ Ưu điểm:

* Tiện lợi cho đối tác bên ngoài.
* Không cần tạo tài khoản cho người nhận.
* Có thể chia sẻ trên email, chat, SMS...
* Có thể thu thập file từ nhiều người.

⚠️ Nhược điểm / Rủi ro:

* Link có thể bị **chia sẻ tiếp** cho người không mong muốn.
* Khó kiểm soát **ai đã xem** (chỉ có thống kê tổng lượt truy cập).
* Nếu không bảo vệ đúng cách, file có thể bị **truy cập trái phép**.
* Link bị **lộ** có thể dẫn đến rò rỉ dữ liệu.

{% hint style="info" %}
Nguyên tắc vàng: Chỉ dùng Public Link khi **thực sự cần thiết** và **luôn bật bảo vệ** (mật khẩu + hết hạn).
{% endhint %}

## Khi Nào Dùng Public Link vs Internal Sharing?

| Tình huống                   | Dùng gì?                  | Lý do                               |
| ---------------------------- | ------------------------- | ----------------------------------- |
| Gửi báo cáo cho sếp          | Internal Sharing          | Sếp có tài khoản, bảo mật cao       |
| Gửi catalogue cho khách hàng | Public Link               | Khách không có tài khoản            |
| Team cùng làm dự án          | Internal Sharing          | Cần kiểm soát chặt, collaboration   |
| Gửi file cho đối tác         | Public Link               | Đối tác không có tài khoản          |
| Tài liệu nhân sự             | ❌ Không dùng Public       | Quá nhạy cảm                        |
| Thu thập CV từ ứng viên      | Public Link (Upload only) | Nhiều người, không cần tài khoản    |
| Chia sẻ video training       | Public Link               | Nội dung công khai, nhiều người xem |

## 🖱️ Phần 1: Tạo Public Link Cơ Bản

{% stepper %}
{% step %}

### Chọn File hoặc Thư Mục

* Đăng nhập vào CloudFile.
* Vào mục **Files**.
* Tìm file hoặc thư mục bạn muốn chia sẻ.
  {% endstep %}

{% step %}

### Mở Menu Share

Cách 1: Dùng biểu tượng Share

* Click vào biểu tượng **Share** (thường là icon mũi tên hoặc người) bên cạnh tên file.

Cách 2: Dùng menu ngữ cảnh

* Click vào **⋮** (ba chấm) bên cạnh file.
* Chọn **Share / Chia sẻ**.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FLjtQR8Okotz2hmVRKvqk%2Fimage.png?alt=media&amp;token=8c5ccf4e-1db0-41cd-9cae-e2e63679b35e" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Chọn "Share via link" / "Public Link"

Trong hộp thoại Share:

1. Tìm phần **"Public link"**.
2. Bật công tắc (toggle) **"Share via link"** hoặc click **"Create public link"**.

Hệ thống sẽ tự động tạo một đường dẫn dạng:

```
https://cloudfile.tencongty.com/s/abc123xyz
```

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FJqgOjc9tNVXuA9tnwgBX%2Fimage.png?alt=media&amp;token=58cef0d6-a2c4-494f-9dbd-140443021b16" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}

### Copy Link

* Sau khi link được tạo, một nút **Copy link** sẽ xuất hiện.
* Click vào nút đó để copy link vào clipboard.

Kết quả: Link đã được copy, bạn có thể dán (Paste) vào email, chat, SMS...

Mẹo: Test link bằng cách mở trong tab ẩn danh (Incognito) để đảm bảo link hoạt động đúng.
{% endstep %}
{% endstepper %}

## 🔒 Phần 2: Bảo Vệ Public Link (Bảo Mật Nâng Cao)

Link công khai cơ bản **KHÔNG AN TOÀN**. Hãy luôn thêm các lớp bảo vệ sau:

{% stepper %}
{% step %}

#### 🔐 Đặt Mật Khẩu cho Link

Tại sao cần mật khẩu?

* Ngay cả khi link bị lộ, người không có mật khẩu **không xem được**.
* Chỉ người bạn gửi mật khẩu mới truy cập được.

Cách đặt mật khẩu:

1. Trong hộp thoại Share, tìm mục **Password** hoặc **Set password**.
2. Bật công tắc (toggle) **Password protection**.
3. Nhập mật khẩu mong muốn (ví dụ: `client@2026`).
4. Click **Save** hoặc **Set**.<br>

   <figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FbQS7U3Wl8VQHKsy8Vask%2Fimage.png?alt=media&amp;token=a547069d-caea-4535-b81e-4660f7e97681" alt=""><figcaption></figcaption></figure>

{% endstep %}

{% step %}

#### 📅 Đặt Ngày Hết Hạn (Expiration Date)

Tại sao cần hết hạn?

* Link tự động **vô hiệu hóa** sau thời gian nhất định.
* Tránh link bị lưu lại và truy cập mãi mãi.
* Giảm rủi ro khi link bị chia sẻ tiếp.

Cách đặt ngày hết hạn:

1. Trong hộp thoại Share, tìm mục **Expiration date** hoặc **Expire after**.
2. Bật công tắc (toggle).
3. Chọn ngày hết hạn từ lịch, hoặc chọn thời gian (VD: 7 ngày, 1 tháng).
4. Click **Save**.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FuQtU3iP1d6PtfSOnACh8%2Fimage.png?alt=media&amp;token=ed6aa673-66fc-4115-9bcc-1e200262f8a0" alt=""><figcaption></figcaption></figure>

⚠️ Cảnh báo: Sau khi hết hạn, link **không thể truy cập** nữa. Nếu cần kéo dài, phải tạo link mới hoặc gia hạn.
{% endstep %}

{% step %}

#### 👁️ Cấu Hình Quyền Truy Cập (Permissions)

Bạn có thể kiểm soát người nhận **làm được gì** với link:

Các mức quyền:

| Quyền      | Xem | Tải xuống | Chỉnh sửa | Upload |
| ---------- | --- | --------- | --------- | ------ |
| **Read**   | ✅   | ✅         | ❌         | ❌      |
| **Share**  | ✅   | ✅         | ❌         | ❌      |
| **Delete** | ❌   | ❌         | ❌         | ✅      |
| **Edit**   | ✅   | ✅         | ✅         | ✅      |

Cách cấu hình:

1. Trong hộp thoại Share, tìm phần **Permissions** hoặc **Allow editing**.
2. Chọn quyền phù hợp:
   * **View only**: Người nhận chỉ xem, không tải (bảo vệ file khỏi bị lưu lại).
   * **Allow download**: Cho phép tải về máy.
   * **Allow editing**: Cho phép chỉnh sửa trực tiếp (ít dùng với Public Link).

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FE0OcyMWWmLo7hQrpAzjF%2Fimage.png?alt=media&amp;token=ce1e022a-5b95-4843-94a9-ce139606bdca" alt=""><figcaption></figcaption></figure>

Khuyến nghị:

* Mặc định: Chỉ cho phép **View & Download**.
* File nhạy cảm: Tắt download, chỉ cho xem (nếu hệ thống hỗ trợ).
* Thu thập file: Dùng **Upload only**.
  {% endstep %}

{% step %}

#### 🔢 Giới Hạn Số Lượt Truy Cập (Nếu Có)

Một số hệ thống CloudFile hỗ trợ **giới hạn số lần** link có thể được mở:

* Ví dụ: Link chỉ cho phép **10 lượt truy cập**, sau đó tự động vô hiệu.
* Phù hợp: Khi gửi link cho số lượng người cụ thể.

Kiểm tra với Admin xem tính năng này có được bật không.
{% endstep %}
{% endstepper %}

## 🗑️ Phần 4: Xóa hoặc Vô Hiệu Hóa Link

Khi không còn cần link (dự án kết thúc, file đã gửi xong...), hãy **xóa link ngay** để đảm bảo an toàn.

{% stepper %}
{% step %}

### Mở lại hộp thoại Share

* Tìm file/thư mục đã chia sẻ.
* Click vào biểu tượng **Share** hoặc **⋮ → Share**.
  {% endstep %}

{% step %}

### Tắt hoặc xóa Public Link

Trong phần **Share link / Public link**:

* **Tắt toggle** "Share via link" HOẶC
* Click nút  **Unshare**.
  {% endstep %}

{% step %}

### Xác nhận

Hệ thống sẽ hỏi xác nhận:

* "Are you sure you want to remove this link?"
* Click **Yes** / **Delete** / **Confirm**.

Kết quả: Link ngay lập tức **không thể truy cập** nữa. Ai cố mở link sẽ thấy thông báo lỗi.

<figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FPD5zXdoBH68Rn3CgCTDz%2Fimage.png?alt=media&amp;token=e3754f26-5263-40a8-abfc-418b8a962acb" alt=""><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}

## ⚠️ Xử Lý Sự Cố Liên Quan Public Link

<details>

<summary>Link không mở được / báo lỗi 404</summary>

Nguyên nhân:

* Link đã bị xóa.
* Link đã hết hạn.
* Gõ sai URL.

Cách xử lý:

* Kiểm tra lại link (copy lại từ CloudFile).
* Kiểm tra ngày hết hạn.
* Tạo link mới nếu link cũ đã hết hạn.

</details>

<details>

<summary>Nhập đúng mật khẩu nhưng không vào được</summary>

Nguyên nhân:

* Nhập sai (có thể có khoảng trắng thừa).
* Caps Lock đang bật.
* Trình duyệt cache lỗi.

Cách xử lý:

* Copy-paste mật khẩu thay vì gõ tay.
* Kiểm tra Caps Lock.
* Thử trình duyệt khác hoặc chế độ ẩn danh.

</details>

<details>

<summary>Người nhận báo không tải được file</summary>

Nguyên nhân:

* Quyền link chỉ set "View only" (không cho tải).
* Kết nối internet người nhận yếu.
* File quá lớn.

Cách xử lý:

* Kiểm tra lại quyền link → Bật "Allow download".
* Hướng dẫn người nhận dùng kết nối ổn định.
* Chia file lớn thành nhiều phần nhỏ hơn.

</details>

<details>

<summary>Link bị lộ / chia sẻ trái phép</summary>

Dấu hiệu:

* Số lượt truy cập cao bất thường.
* Người không liên quan báo có link.

Cách xử lý:

1. Ngay lập tức XÓA link cũ.
2. Tạo link mới với mật khẩu khác.
3. Chỉ gửi cho người thật sự cần.
4. Báo cáo cho Admin/quản lý nếu file nhạy cảm.

</details>

{% hint style="warning" %}
Nhớ rằng: Public Link = Tiện lợi nhưng có rủi ro. Luôn cân nhắc: "Ai cần xem? Họ có thật sự cần tải về không? Link này có thể bị chia sẻ tiếp không?" trước khi tạo.
{% endhint %}
