> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/bat-dau-su-dung-user-manual/tinh-nang-chinh/cai-dat-and-su-dung-tren-may-tinh-di-dong.md).

# Cài đặt & Sử dụng trên Máy tính - Di động

&#x20;    Mặc dù bạn có thể thực hiện hầu hết mọi công việc trên giao diện Web (Web Portal), nhưng để trải nghiệm làm việc trở nên mượt mà và liền mạch như đang sử dụng dữ liệu trên ổ cứng máy tính, bạn cần cài đặt các ứng dụng **NextCloud Client**. \
Hướng dẫn sau sẽ giúp bạn cài đặt và sử dụng **NextCloud Client** trên máy tính (Desktop) và điện thoại (Mobile) để đồng bộ dữ liệu tự động, làm việc offline và tối ưu hiệu suất công việc.

{% stepper %}
{% step %}

### **NextCloud Client** là gì?

**NextCloud Client** là ứng dụng cài đặt trên máy tính hoặc điện thoại giúp bạn:

✅ **Đồng bộ file tự động** giữa thiết bị và cloud\
✅ **Làm việc offline** - sửa file khi không có mạng\
✅ **Truy cập nhanh** - không cần mở trình duyệt\
✅ **Tích hợp với hệ điều hành** - mở file bằng ứng dụng quen thuộc\
✅ **Backup tự động** - ảnh, video tự động lên cloud

Hệ thống cung cấp ứng dụng cho mọi thiết bị bạn sử dụng hàng ngày:

#### 🖥️ Desktop Client (Ứng dụng Máy tính)

* **Dành cho:** Windows, macOS, Linux.
* **Chức năng:** Tạo ra một "cầu nối" giữa máy chủ Cloud và ổ cứng máy tính của bạn. Dữ liệu sẽ xuất hiện dưới dạng một thư mục bình thường (giống như ổ `C:` hay `D:`), giúp bạn mở, sửa, lưu file trực tiếp bằng Word, Excel, Photoshop... mà không cần tải về rồi up lên thủ công.

#### 📱 Mobile App (Ứng dụng Di động)

* **Dành cho:** iOS (iPhone/iPad), Android.
* **Chức năng:** Mang dữ liệu theo bạn mọi lúc mọi nơi. Ngoài ra, nó còn tự động sao lưu ảnh/video từ điện thoại lên Cloud để giải phóng bộ nhớ điện thoại.
  {% endstep %}

{% step %}

### Lợi ích vượt trội khi dùng App

Tại sao bạn nên bỏ ra 5 phút để cài đặt ứng dụng thay vì chỉ dùng Web?

| Tính năng            | Dùng Web Portal                       | Dùng Desktop/Mobile App                                                      |
| -------------------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| **Thao tác**         | Phải Tải xuống -> Sửa -> Tải lên lại. | Mở trực tiếp và nhấn Save (Lưu).                                             |
| **Làm việc Offline** | Không thể (cần có Internet).          | **Có thể.** Sửa file khi mất mạng, hệ thống tự đồng bộ khi có mạng lại.      |
| **Thông báo**        | Chỉ thấy khi đang mở tab trình duyệt. | Nhận thông báo tức thì trên màn hình Desktop/Điện thoại.                     |
| **Sao lưu ảnh**      | Phải chọn từng tấm để up lên.         | **Tự động 100%** ngay khi chụp ảnh xong.                                     |
| **Dung lượng**       | Không chiếm dung lượng máy.           | Có tùy chọn **Virtual Files** (Thấy file nhưng không tốn dung lượng ổ cứng). |
| {% endstep %}        |                                       |                                                                              |

{% step %}

### So Sánh: Web vs Desktop vs Mobile

| Tính năng            | Web Interface           | Desktop Client                     | Mobile App               |
| -------------------- | ----------------------- | ---------------------------------- | ------------------------ |
| **Truy cập**         | Mở trình duyệt          | Mở thư mục trên máy                | Mở app trên điện thoại   |
| **Cài đặt**          | Không cần               | Cần cài đặt                        | Cần cài đặt              |
| **Đồng bộ tự động**  | ❌ Không                 | ✅ Có                               | ✅ Có (optional)          |
| **Làm việc offline** | ❌ Không                 | ✅ Có                               | ✅ Có                     |
| **Tốc độ truy cập**  | ⭐⭐⭐ Chậm hơn            | ⭐⭐⭐⭐⭐ Nhanh                        | ⭐⭐⭐⭐ Nhanh               |
| **Tích hợp OS**      | ❌ Không                 | ✅ Có (File Explorer, Finder)       | ⚠️ Hạn chế               |
| **Upload/Download**  | Thủ công                | Tự động                            | Tự động (ảnh/video)      |
| **Chỉnh sửa file**   | Qua Online Editor       | Bằng ứng dụng máy (Word, Excel...) | Qua app bên thứ 3        |
| **Phù hợp cho**      | Truy cập nhanh, chia sẻ | Công việc hàng ngày                | Di động, chụp ảnh upload |
| {% endstep %}        |                         |                                    |                          |

{% step %}

### Khi Nào Dùng Cái Gì?

#### 🌐 Dùng **Web Interface** khi:

* Bạn đang ở máy tính không phải của mình
* Cần chia sẻ file/thư mục nhanh với đồng nghiệp
* Chỉ cần xem file, không cần chỉnh sửa
* Quản lý quyền truy cập, phân quyền
* Xem lịch sử hoạt động, audit log

#### 💻 Dùng **Desktop Client** khi:

* Bạn làm việc hàng ngày trên máy tính cố định
* Cần chỉnh sửa file thường xuyên (Word, Excel, PowerPoint...)
* Muốn đồng bộ tự động giữa máy và cloud
* Quản lý nhiều dự án với nhiều file

#### 📱 Dùng **Mobile App** khi:

* Cần truy cập file khi đang di chuyển
* Chụp ảnh/quay video và muốn backup tự động
* Xem tài liệu trên điện thoại (PDF, hợp đồng...)
* Quét tài liệu bằng camera điện thoại
* Chia sẻ file nhanh qua WhatsApp, Email...
  {% endstep %}

{% step %}

### Yêu Cầu Hệ Thống

#### 💻 Desktop Client

**Windows**

* **OS**: Windows 10 (64-bit) trở lên
* **RAM**: Tối thiểu 2GB (khuyến nghị 4GB+)
* **Dung lượng**: 50MB cho ứng dụng + dung lượng cho file sync
* **Kết nối**: Internet (tốc độ khuyến nghị: 10 Mbps+)

**macOS**

* **OS**: macOS 10.14 (Mojave) trở lên
* **Chip**: Intel hoặc Apple Silicon (M1/M2/M3)
* **RAM**: Tối thiểu 2GB (khuyến nghị 4GB+)
* **Dung lượng**: 50MB + dung lượng sync

**Linux**

* **Distributions**: Ubuntu 20.04+, Debian 10+, Fedora 35+, openSUSE Leap 15+
* **RAM**: 2GB+
* **Dependencies**: Qt 5.12+, OpenSSL 1.1+

#### 📱 Mobile App

**Android**

* **OS**: Android 6.0 (Marshmallow) trở lên
* **RAM**: Tối thiểu 1GB (khuyến nghị 2GB+)
* **Dung lượng**: 100MB cho app + cache
* **Quyền cần thiết**: Storage, Camera (cho auto-upload)

**iOS**

* **OS**: iOS 13.0 trở lên
* **Thiết bị**: iPhone 6s trở lên, iPad Air 2 trở lên
* **Dung lượng**: 150MB cho app + cache
* **Quyền cần thiết**: Photos, Files
  {% endstep %}

{% step %}

### Những Điều Cần Lưu Ý

#### 🔴 Trước Khi Cài Đặt

{% hint style="warning" %}

* **Kiểm tra dung lượng ổ cứng**: Desktop Client cần **ít nhất gấp đôi** dung lượng file bạn muốn sync.\
  Ví dụ: Sync 50GB file → Cần ít nhất 100GB trống (cho cache, temp files...).
* **Kiểm tra kết nối mạng**: Tốc độ khuyến nghị: **10 Mbps trở lên**. Sync lần đầu có thể mất **vài giờ đến vài ngày** tuỳ dung lượng.
* **Backup dữ liệu cũ**: Trước khi bật sync, **backup dữ liệu quan trọng** để tránh mất dữ liệu nếu có lỗi cấu hình.
  {% endhint %}
  {% endstep %}
  {% endstepper %}
