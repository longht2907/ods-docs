> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/cai-dat-and-su-dung-tren-may-tinh-di-dong/desktop-client/dong-bo-hoa-thu-muc-local-len-server.md).

# Đồng bộ hóa thư mục local lên server

Sau khi đăng nhập và cấu hình ban đầu, trang này hướng dẫn chi tiết cách **quản lý đồng bộ thư mục** với Desktop Client: thêm/bớt thư mục, pause/resume, xem trạng thái sync, và xử lý các tình huống thực tế.

## Hiểu Cách Desktop Client Đồng Bộ

Desktop Client đồng bộ **2 chiều** giữa máy tính và cloud:

```
┌─────────────────────────────────────┐
│          CLOUD (Server)             │
│   /Documents/report.docx            │
└─────────────────┬───────────────────┘
                  │
                  │ ⬍ Sync 2 chiều
                  │
┌─────────────────┴───────────────────┐
│       MÁY TÍNH (Desktop)            │
│   C:\Users\Long\CloudFile\          │
│   Documents\report.docx             │
└─────────────────────────────────────┘
```

**Ý nghĩa:** Nextcloud Desktop Client hoạt động theo cơ chế:

* Mỗi **thư mục local** ↔ tương ứng **1 thư mục trên cloud**
* Khi file **thay đổi ở 1 phía** → client tự động đồng bộ sang phía còn lại
* Đồng bộ **2 chiều**
* Có thể xảy ra **conflict** nếu cùng lúc sửa 1 file trên nhiều thiết bị

## 1. Giải mã các biểu tượng trạng thái

Trên máy tính, bạn sẽ thấy các biểu tượng nhỏ gắn bên cạnh mỗi tệp tin hoặc thư mục. Hiểu đúng ý nghĩa của chúng giúp bạn biết dữ liệu đã an toàn hay chưa.

| Biểu tượng | Tên gọi               | Ý nghĩa & Hành động                                                                                                                                                                                                        |
| ---------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅          | **Tích xanh (Sync)**  | **Đã đồng bộ xong.** File này đang nằm trên ổ cứng máy tính của bạn và đã khớp hoàn toàn với Server. Bạn có thể mở nó ngay cả khi mất mạng (Offline).                                                                      |
| ☁️         | **Đám mây (Virtual)** | <p><strong>Tệp ảo (Online-only).</strong> File đang nằm an toàn trên Server nhưng <strong>không chiếm dung lượng ổ cứng</strong> máy tính.<br>👉 <strong>Cách dùng:</strong> Click đúp chuột vào file để tải về và mở.</p> |
| 🔄         | **Mũi tên xoay**      | **Đang đồng bộ.** Hệ thống đang tải lên hoặc tải xuống. Vui lòng không tắt máy hoặc rút mạng lúc này.                                                                                                                      |
| 🟡         | **Chấm than vàng**    | **Xung đột (Conflict).** Có ai đó đã sửa file này cùng lúc với bạn. Hệ thống sẽ giữ cả 2 bản để bạn kiểm tra.                                                                                                              |
| ❌          | **Dấu chéo đỏ**       | **Lỗi.** File không thể đồng bộ (thường do tên file chứa ký tự đặc biệt hoặc đường dẫn quá dài).                                                                                                                           |

{% hint style="info" %}
Luôn chú ý biểu tượng trên file trước khi thao tác — đặc biệt khi thấy 🔄, 🟡 hoặc ❌.
{% endhint %}

## 2. Quản lý dung lượng với "Tệp ảo" (Virtual Files)

Đây là tính năng quan trọng nhất giúp máy tính của bạn không bị đầy ổ cứng dù dữ liệu công ty lên tới hàng Terabyte.

### Chuyển đổi trạng thái tệp

{% stepper %}
{% step %}

### Luôn giữ trên thiết bị này (Always keep on this device)

* Chuyển trạng thái sang ✅ (Tích xanh).
* File sẽ luôn được tải về sẵn. Dùng cho các tài liệu bạn làm việc hàng ngày.
  {% endstep %}

{% step %}

### Giải phóng dung lượng (Free up space)

* Chuyển trạng thái sang ☁️ (Đám mây).
* Hệ thống sẽ **xóa bản copy trên máy tính** để lấy lại dung lượng ổ cứng, nhưng file vẫn còn nguyên trên Server. Khi cần dùng chỉ cần click đúp lại.
  {% endstep %}
  {% endstepper %}

{% hint style="warning" %}
Nếu chọn "Free up space" bạn sẽ không thể mở file khi offline cho tới khi nó được tải xuống lại.
{% endhint %}

## 3. Đồng bộ nhiều thư mục (Multi-folder Sync)

Mặc định, mọi thứ nằm trong thư mục `Nextcloud` (hoặc CloudFile). Tuy nhiên, nếu bạn có một thư mục nằm ở ổ D (ví dụ: `D:\DuAn_X`) và muốn đồng bộ nó lên Cloud mà **không muốn di chuyển** nó vào ổ C, hãy làm như sau:

{% stepper %}
{% step %}
Click chuột trái vào biểu tượng **CloudFile** trên thanh Taskbar.
{% endstep %}

{% step %}
Click vào Avatar của bạn (góc trên bên trái cửa sổ nhỏ) -> Chọn **Settings (Cài đặt)**.
{% endstep %}

{% step %}
Ngay dưới tên tài khoản, bạn sẽ thấy nút **Add folder sync connection (Thêm kết nối đồng bộ thư mục)**.
{% endstep %}

{% step %}
Thực hiện 2 bước:

* **Bước 1:** Chọn thư mục trên máy tính (Ví dụ: `D:\DuAn_X`).
* **Bước 2:** Chọn thư mục đích trên Cloud (Tạo một thư mục mới trên Cloud để chứa nó).
  {% endstep %}

{% step %}
Nhấn **Add sync connection**.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
Kết quả: Thư mục `D:\DuAn_X` sẽ được đồng bộ lên Cloud, tách biệt hoàn toàn với thư mục chính.
{% endhint %}

## 4. Loại trừ thư mục (Selective Sync)

Nếu bạn không muốn nhìn thấy một thư mục nào đó trên máy tính (ví dụ thư mục "Backup\_Cu" quá nặng và bạn không bao giờ dùng đến), bạn có thể ẩn nó đi hoàn toàn.

{% stepper %}
{% step %}
Mở cửa sổ **Settings (Cài đặt)** của CloudFile.
{% endstep %}

{% step %}
Bên cạnh tên thư mục đang đồng bộ, bấm vào dấu **...** hoặc mũi tên xổ xuống để hiện danh sách thư mục con.
{% endstep %}

{% step %}
**Bỏ tích** ở các thư mục bạn không muốn đồng bộ về máy.
{% endstep %}

{% step %}
Nhấn **Apply (Áp dụng)**.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
Khi bỏ tích, thư mục đó sẽ **biến mất** khỏi máy tính của bạn (nhưng vẫn còn trên Web/Server). Đừng nhầm lẫn việc này với việc xóa thư mục.
{% endhint %}

## 5. Tạm dừng đồng bộ (Pause Sync)

Trong các trường hợp sau, bạn nên tạm dừng đồng bộ:

* Đang dùng 4G/Hotspot và sợ tốn dung lượng.
* Máy tính đang yếu pin.
* Cần băng thông mạng để họp Zoom/Teams.

Cách làm:

{% stepper %}
{% step %}
Click vào biểu tượng CloudFile ở thanh Taskbar.
{% endstep %}

{% step %}
Bấm vào dấu **...** ở góc trên bên phải.
{% endstep %}

{% step %}
Chọn **Pause sync (Tạm dừng đồng bộ)**.
{% endstep %}

{% step %}
Khi xong việc, nhớ chọn lại **Resume sync** để tiếp tục.
{% endstep %}
{% endstepper %}
