# Hướng dẫn triển khai ODS Docs trên VPS với Docker

Tài liệu này hướng dẫn cách vận hành và deploy hệ thống `ods-docs` trên VPS bằng **Next.js standalone container**. Mọi thay đổi phải đi qua task branch, Pull Request và CI trước khi được merge vào `main`.

---

## 1. Cơ chế vận hành & Lưu trữ (Phương án B)

- **Hình ảnh & Media**: Lưu trực tiếp tại thư mục `public/media/...` và được **Git theo dõi đồng bộ**.
- **Trong bài viết MDX**: Gọi đường dẫn chuẩn:
  ```markdown
  ![Tên mô tả](/media/ai-contact-center/user-guider-portal/img-xxx.png)
  ```
- **Quy trình đồng bộ**:
  1. Viết bài và thêm ảnh trên task branch ở máy local.
  2. Push task branch, mở Pull Request và chờ CI `verify` thành công.
  3. Human merge Pull Request vào `main`.
  4. VPS fast-forward `main` và rebuild container để biên dịch lại MDX.

---

## 2. Triển khai lần đầu trên VPS

### Bước 1: Clone mã nguồn
Đăng nhập SSH vào VPS và clone repo về thư mục mong muốn (ví dụ `/var/www/ods-docs`):
```bash
cd /var/www/
git clone <URL_GIT_REPO> ods-docs
cd ods-docs
```

---

### Bước 2: Khởi chạy bằng Docker Compose
```bash
docker compose up -d --build
```

Container Next.js sẽ tự động build bản standalone tối ưu và khởi chạy tại cổng `3000`.

---

## 3. Quy trình cập nhật sau này

Tại máy local, tạo task branch từ `origin/main` mới nhất:

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c task/TASK-XXX-ten-task
git add <cac-file-thuoc-task>
git commit -m "docs: thêm bài viết mới và hình ảnh minh họa"
git push -u origin task/TASK-XXX-ten-task
```

Sau khi Pull Request được merge và CI xanh, cập nhật VPS:

```bash
cd /var/www/ods-docs
git fetch origin
git switch main
git pull --ff-only origin main
docker compose up -d --build
```

MDX được biên dịch trong quá trình build, vì vậy thay đổi nội dung hoặc code luôn cần `docker compose up -d --build`. Nếu chỉ thay file trong `public/media` và volume đang được mount, file mới có hiệu lực ngay sau `git pull --ff-only` mà không cần restart container.

---

## 4. Lưu ý về Video
- Các hình ảnh chụp màn hình (PNG, JPG, WebP) hoàn toàn phù hợp để lưu trực tiếp trong Git.
- Riêng đối với **Video dung lượng lớn (> 10 MB)**, bạn không nên commit vào Git mà hãy nhúng qua **YouTube (chế độ Unlisted - Không công khai)** vào bài viết MDX:
  ```html
  <iframe
    className="w-full aspect-video rounded-lg"
    src="https://www.youtube.com/embed/<VIDEO_ID>"
    allowFullScreen
  />
  ```
