> For the complete documentation index, see [llms.txt](https://odsvn.gitbook.io/cloudfile_user-guider/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://odsvn.gitbook.io/cloudfile_user-guider/huong-dan-quan-ly-admin/nhom-va-phan-quyen/tao-va-quan-ly-nhom-groups.md).

# Tạo và Quản lý Nhóm (Groups)

Sau khi đã lên danh sách các phòng ban trong công ty, Admin cần hiện thực hóa chúng thành các **Nhóm (Groups)** trên hệ thống CloudFile.

## Mục tiêu của Group

**Group (Nhóm)** là lớp trung gian quan trọng nhất trong CloudFile, giúp Admin:

* Quản lý user theo **phòng ban / vai trò**
* Gán quyền **tập trung – nhất quán**
* Giảm thao tác thủ công khi user tăng
* Hạn chế rủi ro cấp quyền sai

Khi nào cần tạo Group?

* Có phòng ban / team riêng (HR, IT, Sales…)
* Có nhu cầu chia sẻ thư mục chung
* Có quyền khác nhau giữa các nhóm user
* Có user quản lý cấp trung (Group Admin)

## 1. Tạo và Quản lý Nhóm (Groups)

### 1.1 Các bước thực hiện tạo group

{% stepper %}
{% step %}

### Bước: Đăng nhập & mở khu vực Groups

1. Đăng nhập CloudFile bằng **System Admin**
2. Vào **Settings → Account**
3. Tại khu vực **Groups**\ <br>

   <figure><img src="https://681304911-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyBKaAei3IGklzK8qdWIN%2Fuploads%2FoyeBevvkmKMzV1xoq7Wj%2Fimage.png?alt=media&amp;token=c4b92ed4-dfbb-485e-a32b-773583c7cb36" alt=""><figcaption></figcaption></figure>

{% endstep %}

{% step %}

### Bước: Tạo Group mới

4. Nhấn **+** để tạo Group mới
5. Nhập tên Group → xác nhận

📌 Lưu ý: Group được tạo **chưa có user & chưa có quyền**.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
Để hệ thống hoạt động ổn định và chuyên nghiệp, tuân thủ quy tắc đặt tên:

* Viết liền hoặc dùng gạch dưới (`_`): tránh dùng khoảng trắng.
* Không dấu (Tiếng Việt không dấu): giúp tương thích tốt hơn khi tích hợp với AD/LDAP.
* Có tiền tố (Prefix): giúp gom nhóm dễ hơn.
  {% endhint %}

Ví dụ:

* ✅ `Phong_Kinh_Doanh`
* ✅ `Phong_Ke_Toan`
* ✅ `DuAn_A`
* ❌ `Phòng Kinh Doanh` (Có dấu và khoảng trắng - Không khuyến khích)

### 1.2 Gán User vào Group

#### Khi nào gán?

* Ngay khi tạo user mới
* Khi user đổi phòng ban
* Khi phân quyền lại hệ thống

#### Cách gán user vào Group

{% stepper %}
{% step %}

### Mở trang user

1. Vào **Settings → Account**
2. Chọn user cần gán
   {% endstep %}

{% step %}

### Gán Group

3. Tại cột **Groups**
4. Nhập tên Group → chọn Group phù hợp

👉 User có thể thuộc **nhiều Group** nếu cần.
{% endstep %}
{% endstepper %}

### 1.3 Gỡ User khỏi Group

#### Khi nào gỡ?

* User chuyển bộ phận
* User nghỉ việc
* Thu hồi quyền truy cập dữ liệu

#### Thao tác

{% stepper %}
{% step %}

1. Vào **Settings → Users**
2. Chọn user
   {% endstep %}

{% step %}
3\. Bỏ chọn Group không còn phù hợp

👉 Quyền liên quan tới Group sẽ **mất ngay lập tức**.
{% endstep %}
{% endstepper %}

## 2. Group Admin là gì? Khi nào nên dùng?

### 2.1 Khái niệm

**Group Admin**:

* Quản lý user **trong Group được giao**
* Không có quyền cấu hình hệ thống
* Không can thiệp Group khác

### 2.2 Khi nào nên cấp Group Admin?

* Doanh nghiệp có nhiều phòng ban
* IT muốn phân quyền quản lý bớt
* Trưởng phòng tự quản user của mình

👉 Group Admin ≠ System Admin

## 3. Mối quan hệ Group & Phân quyền thư mục

Luồng chuẩn:

```
User → Group → Quyền → Thư mục
```

Ví dụ:

* Group: `sales`
* Thư mục: `/Shared/Sales`
* Quyền:
  * sales: Read / Write
  * hr: No access
  * admin: Full

👉 Không khuyến nghị gán quyền trực tiếp cho user trên thư mục.

## 4. Lỗi thường gặp & cách tránh

<details>

<summary>Quá nhiều Group nhỏ lẻ</summary>

* Vấn đề: Khó quản lý, dễ cấp quyền sai.
* Khuyến nghị: Gộp theo phòng ban / vai trò chính.

</details>

<details>

<summary>Đặt tên Group không nhất quán</summary>

* Vấn đề: Dễ nhầm, khó automation.
* Khuyến nghị: Chuẩn hóa naming ngay từ đầu.

</details>

<details>

<summary>Dùng chung Group cho user &#x26; service</summary>

* Vấn đề: Rủi ro bảo mật, khó audit.
* Khuyến nghị: Tách riêng Group cho service và user.

</details>
