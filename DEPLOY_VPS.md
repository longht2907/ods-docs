# Triển khai ODS Documentation Platform trên VPS

Runbook này mô tả quy trình build và cập nhật Next.js standalone bằng Docker.
Kiến trúc tổng thể và trạng thái network gate nằm tại
[ARCHITECTURE.md](ARCHITECTURE.md).

## 1. Trạng thái an toàn hiện tại

- `/docs/**` hoạt động public.
- `/internal/**` và `/api/search/internal/**` đang fail-closed, mặc định trả `401`.
- `ODS_INTERNAL_DEV_OPEN=true` chỉ dùng local development và bị cấm trong
  production.
- Caddy office WAN/VPN allowlist và private-media route chưa được triển khai trong
  repository.

Không mở internal production trước khi có task riêng triển khai và kiểm chứng
network gate. Runbook này không cung cấp Caddyfile giả định vì topology, WAN CIDR
và cơ chế truyền client IP production chưa được xác minh.

## 2. Mô hình deployment mục tiêu

```text
Internet / Office WAN / VPN
              ↓
         Caddy L7 Gateway
              ↓
    127.0.0.1:3000 trên VPS
              ↓
     Next.js standalone container
```

Caddy là public entry point; port Next.js không được mở trực tiếp ra Internet.
Target network policy:

| Path | Chính sách |
| --- | --- |
| `/docs/**` và public assets | Public |
| `/internal/**` | Chỉ office WAN allowlist |
| `/api/search/internal/**` | Cùng policy với `/internal/**` |
| `/api/media/internal/**` | Cùng policy với `/internal/**`; route chưa tồn tại |

VPN client phải NAT qua WAN công ty để xuất hiện bằng allowlisted public IP. Nếu
dùng split-tunnel, CDN hoặc Cloudflare, phải thiết kế lại cách xác thực client IP
trước khi áp dụng policy.

## 3. Chuẩn bị

- VPS có Docker Engine và Docker Compose.
- Quyền clone private GitHub repository đã được cấp theo chính sách công ty.
- Public origin chính xác để đặt `ODS_DOCS_SITE_URL` khi build.
- WAN công ty ổn định; office network và VPN egress đã được network team xác minh.

Không commit deploy key, access token, WAN allowlist nhạy cảm hoặc secret vào Git.

## 4. Media policy

### Public media

- Lưu tại `public/media/**`, được Git theo dõi và có URL public `/media/**`.
- Docker Compose mount read-only thư mục này vào container.
- Chỉ đặt asset được phép công khai; không đặt screenshot internal nhạy cảm.

MDX public tham chiếu theo dạng:

```markdown
![Mô tả ảnh](/media/ai-contact-center/example.webp)
```

### Internal media

Target structure là `private-media/internal/**`, nằm ngoài `public/` và được phục
vụ qua `/api/media/internal/**` sau network authorization.

Thư mục và route chưa được triển khai. Cho đến khi có task riêng:

- không đặt internal media nhạy cảm trong `public/media/**`;
- không tham chiếu private-media route từ MDX;
- không copy internal media vào standalone static output.

## 5. Triển khai lần đầu

### Clone repository

```bash
cd /var/www
git clone <PRIVATE_GIT_REPOSITORY_URL> ods-docs
cd ods-docs
```

Credential để clone private repository phải được quản lý ngoài Git theo chính sách
VPS của công ty.

### Build và khởi động

Đặt public origin đã được xác nhận. Chỉ dùng origin, không thêm path, query hoặc
fragment:

```bash
export ODS_DOCS_SITE_URL="<PUBLIC_DOCS_ORIGIN_DA_XAC_NHAN>"
docker compose up -d --build
```

`ODS_DOCS_SITE_URL` cần có tại build-time vì metadata được prerender. Chỉ thêm biến
sau khi image đã build sẽ không cập nhật metadata.

Docker Compose bind ứng dụng tại `127.0.0.1:3000`; Caddy trên cùng VPS mới được
phép reverse proxy đến port này.

## 6. Quy trình cập nhật

Chỉ deploy commit đã merge vào `main` sau khi Pull Request CI xanh:

```bash
cd /var/www/ods-docs
git fetch origin
git switch main
git pull --ff-only origin main
export ODS_DOCS_SITE_URL="<PUBLIC_DOCS_ORIGIN_DA_XAC_NHAN>"
docker compose up -d --build
```

MDX được compile trong `next build`, vì vậy thay đổi code hoặc nội dung cần rebuild.
Public media mới có hiệu lực sau `git pull --ff-only` khi read-only volume hiện tại
được mount, nhưng PR/CI vẫn là điều kiện bắt buộc trước deploy.

## 7. Checklist trước khi mở network gate

Network gate chỉ được bật sau khi task runtime tương ứng cung cấp bằng chứng cho
toàn bộ điều kiện sau:

- Caddy nhận đúng client IP và chỉ trust proxy đã xác minh.
- Office WAN/VPN CIDR được network owner xác nhận.
- Guest Wi-Fi không vô tình dùng cùng quyền truy cập internal.
- Origin Next.js không truy cập được từ Internet ngoài Caddy.
- Caddy bảo vệ đủ internal page, Search API và media route.
- Next.js Proxy xác minh trusted gateway assertion và vẫn fail-closed khi request
  đi vòng hoặc thiếu assertion.
- Internal response giữ `Cache-Control: private, no-store` và
  `X-Robots-Tag: noindex, nofollow`.
- Runtime tests xác nhận external request bị chặn và office/VPN request được phép.

## 8. Kiểm tra sau deploy

Tại mỗi release, ghi nhận kết quả thật thay vì suy luận từ log startup:

```bash
docker compose ps
curl -I http://127.0.0.1:3000/docs
curl -I http://127.0.0.1:3000/internal
curl -I http://127.0.0.1:3000/api/search/internal
```

Trong trạng thái hiện tại, hai request internal phải trả `401`. Sau khi network gate
được triển khai, nghiệm thu phải kiểm tra qua public Caddy endpoint từ cả mạng được
phép và mạng không được phép; không thay thế bằng test loopback.
