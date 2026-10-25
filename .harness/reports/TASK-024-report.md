# Báo cáo Nghiệm thu TASK-024 — Quy hoạch lại Support Wiki tại /internal

## 1. Thông tin tổng quan

- **Mã Task**: TASK-024
- **Branch**: `task/TASK-024-quy-hoach-support-wiki`
- **Trạng thái**: `in-progress` (tuân thủ quy tắc AGENTS.md: giữ `in-progress` trong suốt quá trình thực hiện, không tự ý commit, push hay đổi status khi chưa có chỉ đạo từ Human)
- **Mục tiêu thực hiện**: 
  1. Hoàn thiện nhóm **Bắt đầu** (`/internal`): Trang chủ và 3 trang nền tảng (Tổng quan dịch vụ, Mã dịch vụ & tra cứu Odoo, Tiếp nhận & điều hướng yêu cầu).
  2. Xây dựng toàn diện 3 wiki chuyên môn mới ngang hàng với Tổng đài: **Data Center**, **Network** và **License phần mềm** dựa trên 19 file tài liệu quy trình gốc từ nguồn `ods-api-source`.
  3. Bảo toàn nguyên vẹn toàn bộ tài nguyên Tổng đài (`ai-contact-center`) đã làm trước đó.

---

## 2. Toàn bộ tài liệu đã hoàn thiện theo từng nhóm Wiki

### A. Nhóm "Bắt đầu" (`content/internal/(home)/`)
- **Trang chủ Support Wiki** (`index.mdx`): Lộ trình 4 bước bắt đầu cho Support; liên kết đến các mảng dịch vụ và quy định.
- **Tổng quan dịch vụ ODS** (`services.mdx`): Nguồn từ `Mô Tả Dịch Vụ ODS - 2025.docx` và tài liệu tổng đài; bao phủ 6 nhóm dịch vụ ODS (Data Center/IDC, Kết nối & truyền dẫn, Cloud Service, License phần mềm, Contact Center, Dịch vụ bổ sung).
- **Mã dịch vụ & tra cứu trên Odoo** (`service-codes.mdx`): Phân biệt 3 tầng định danh (Mã KH, Mã DV Odoo, Thông số kỹ thuật); 5 nguyên tắc cốt lõi (Odoo không tự thay đổi kỹ thuật); bảng quy ước tiền tố mã thực tế.
- **Tiếp nhận & điều hướng xử lý yêu cầu** (`request-routing.mdx`): Luồng xử lý chuẩn 7 bước; phân loại 4 nhóm yêu cầu chính; bảng điều hướng tới tài liệu chuyên môn.
- **Điều hướng `meta.json`**: Chuẩn 9 mục theo đúng quy định.

### B. Nhóm "Data Center" (`content/internal/data-center/`)
- **Tổng quan Data Center** (`index.mdx`): Giới thiệu hạ tầng phòng máy DC và 3 nguyên tắc an toàn cốt lõi.
- **Quy trình Nhập mới Server** (`processes/import-server.mdx` — nguồn: `NHẬP MỚI SERVER.pdf`): Tiếp nhận từ Sales, lắp đặt tủ rack, cấu hình switchport/VLAN, cấp 2 IP và đưa vào giám sát PRTG.
- **Quy trình Xuất Server & Thiết bị** (`processes/export-server.mdx` — nguồn: `XUẤT THIẾT BỊ, SERVER.pdf`): Xác nhận từ Sales, kiểm tra tắt máy an toàn (bắt buộc Shutdown), biên bản xuất kho, xóa PRTG và thu hồi IP.
- **Quy trình Gắn KVM over IP** (`processes/attach-kvm.mdx` — nguồn: `GẮN KVM.pdf`): Xác thực khách hàng, đấu nối KVM, kiểm tra truy cập, bàn giao và quy định thu hồi sau 10 tiếng.
- **Quy trình Gắn Console kiểm tra Server** (`processes/attach-console.mdx` — nguồn: `GẮN CONSOLE KIỂM TRA SERVER.pdf`): Gắn console tại chỗ, kiểm tra tín hiệu bàn phím/màn hình, chẩn đoán server treo/báo lỗi, chỉ reboot khi khách hàng yêu cầu.
- **Quy trình Khởi động lại (Reboot) Server** (`processes/reboot-server.mdx` — nguồn: `REBOOT SERVER, THIẾT BỊ.pdf`): Xác thực người gửi, kiểm tra nhãn máy, quy chuẩn tắt mở lại sau 10–15 giây an toàn.
- **Hỗ trợ thao tác Server & Cài lại OS** (`processes/server-assistance.mdx` — nguồn: `HỖ TRỢ THAO TÁC SERVER.pdf`): Gắn console kiểm tra phần cứng, điều kiện tiên quyết **bắt buộc khách hàng xác nhận văn bản miễn trừ trách nhiệm mất dữ liệu trước khi cài đặt lại OS**.

### C. Nhóm "Network" (`content/internal/network/`)
- **Tổng quan dịch vụ Mạng** (`index.mdx`): Tổng quan hạ tầng mạng ODS và nguyên tắc xử lý an toàn mạng.
- **Quy trình Cấp phát IP & Range IP** (`processes/ip-allocation.mdx` — nguồn: `Cấp IP.pdf`): Cấp IP Colocation (KH mới/cũ), dải IP $< 13$ IP và $\ge 13$ IP (phối hợp NOC), kiểm tra IPAM và rà soát Blacklist.
- **Quy trình Thu hồi IP & Range IP** (`processes/ip-reclaim.mdx` — nguồn: `Thu hồi IP.pdf` & `THU HỒI IP.docx`): Kiểm tra tình trạng sử dụng, hủy mã DV Odoo, xóa ghi chú IPAM, xử lý IP dính Blacklist và biện pháp NULL IP / chặn trong nước khi vi phạm.
- **Kiểm tra & Chẩn đoán kết nối mạng** (`runbooks/network-troubleshooting.mdx` — nguồn: `KIỂM TRA NETWORK.pdf`): Thu thập ping/tracert 2 chiều, test VPN đa hướng (FPT, VNPT, Viettel, quốc tế), 3 kịch bản traffic.
- **Xử lý sự cố Switch tủ Rack** (`runbooks/switch-outage.mdx` — nguồn: `SỰ CỐ SWITCH.pdf`): Cảnh báo PRTG, loại trừ báo giả, xử lý rớt nguồn/cổng trunk, phương án thay thế Switch Cisco SG300 dự phòng tại phòng Core.
- **Xử lý sự cố kênh truyền Leased-Line** (`runbooks/leased-line-issues.mdx` — nguồn: `XỬ LÝ LEASED-LINE.pdf`): Giám sát PRTG Core-NIX, quy tắc liên hệ đêm khuya, điều phối đối tác viễn thông và đối soát SLA.
- **Xử lý sự cố tấn công DDoS** (`runbooks/ddos-mitigation.mdx` — nguồn: `XỬ LÝ DDOS.pdf`): Sniff traffic, chụp ảnh bằng chứng, chặn hướng Quốc tế, thời hạn mở chặn (3 ngày với Mắt Bão, 7 ngày với khách hàng khác) và theo dõi phục hồi.
- **Xử lý địa chỉ IP bị Blacklist** (`runbooks/ip-blacklist.mdx` — nguồn: `XỬ LÝ BLACKLIST.pdf`): Thủ tục gỡ Barracuda/Spamhaus, thông báo khách hàng xử lý trong 3 ngày, chính sách khóa vĩnh viễn khi tái phạm lần 2.
- **Xử lý mã độc, Phishing & Lạm dụng mạng** (`runbooks/abuse-malware.mdx` — nguồn: `XỬ LÝ MALWARE, PHISHING, NETWORK ATTACK, VIRUS.pdf`): Tiếp nhận khiếu nại abuse, chính sách chặn quốc tế sau 3 lần thông báo không phản hồi, phối hợp NOC mở lại.
- **Sơ đồ hệ thống Network** (`knowledge-base/topology.mdx` — nguồn: `Sơ đồ hệ thống network.pdf`): Kiến trúc phân tầng Access Switch, Distribution Switch, Router Core và các hướng ISP/VNIX (kèm ghi chú cần xác nhận tính hiện hành).

### D. Nhóm "License phần mềm" (`content/internal/software-license/`)
- **Tổng quan dịch vụ License phần mềm** (`index.mdx`): Giới thiệu các gói bản quyền bảng điều khiển máy chủ và nguyên tắc quản trị.
- **Quy trình đăng ký License** (`processes/license-registration.mdx` — nguồn: `Quy đình đăng kí các License.pdf`): Hướng dẫn chi tiết phân loại đã có mã DV vs chưa có mã DV, khai báo `Sub IP`, `IP`, `Key ID`, mã nội bộ `9602` cho Plesk, cPanel và DirectAdmin.

### E. Điều hướng gốc Support Wiki (`content/internal/meta.json`)
Cấu hình 5 nhóm dịch vụ ngang hàng:
1. `(home)` — Bắt đầu
2. `ai-contact-center` — Tổng đài
3. `data-center` — Data Center
4. `network` — Network
5. `software-license` — License phần mềm

---

### F. Hệ thống Chuẩn hóa Lưu đồ SVG/React (`src/components/flowchart/`)
- **Kiến trúc Component**: Xây dựng bộ component React + SVG thuần túy không dùng thư viện ngoài nặng nề:
  - `types.ts`: Định nghĩa ma trận lưới logic `(row, col)`, các loại node (`start`, `end`, `step`, `decision`, `reference`) và cổng kết nối linh hoạt.
  - `flowchart-canvas.tsx`: Render SVG vector độ phân giải cao, bo góc đường dẫn, mũi tên đổi màu ngữ cảnh (Xanh = Đạt/Có, Cam = Lỗi/Chưa/Không), tự động tính lề loop track và không hiển thị badge thừa.
  - `flowchart-viewer.tsx`: Header bar với nút "Mở rộng lưu đồ", Fullscreen Dialog modal với Pan kéo chuột, Zoom In/Out, Reset, phím Esc và focus trap.
  - `index.tsx`: Component `<ProcessFlowchart flowId="..." />` tích hợp tự động vào MDX qua `getMDXComponents`.
- **Toàn bộ 15 lưu đồ đã chuyển đổi thành công từ ASCII sang SVG/React**:
  1. Data Center (6): `import-server`, `export-server`, `attach-kvm`, `attach-console`, `reboot-server`, `server-assistance`.
  2. Network (8): `ip-allocation`, `ip-reclaim`, `network-troubleshooting`, `switch-outage`, `leased-line-issues`, `ddos-mitigation`, `ip-blacklist`, `abuse-malware`.
  3. Software License (1): `license-registration`.

---

## 3. Lệnh kiểm tra và Kết quả thực tế

| Lệnh kiểm tra | Mục đích | Kết quả | Ghi chú |
|---|---|---|---|
| `npm run check:env` | Kiểm tra an toàn biến môi trường `.env` | **PASS** | An toàn, không chứa secret |
| `npm run check:links` | Kiểm tra toàn bộ liên kết nội bộ trong MDX | **PASS** | 100% liên kết hợp lệ, 0 broken link |
| `npm run check:scope` | Kiểm tra giới hạn file thay đổi so với allowlist task | **PASS** | File thay đổi hoàn toàn nằm trong phạm vi của TASK-024 |
| `npm run types:check` | Next typegen + TypeScript compile | **PASS** | 0 lỗi typecheck |
| `npm run guard` | Kiểm tra ranh giới bảo mật public/internal, secret, frontmatter, ADR-001/006 | **PASS** | Guard PASS |
| `npm run verify:code` | Chuỗi kiểm chứng code toàn diện | **PASS** | Typecheck + env-guard + check:links + guard đều PASS |

---

## 4. Các điểm lưu ý & Nội dung cần Human xác nhận

1. **Khác biệt quy trình Thu hồi IP**: Đã tích hợp cả 2 nguồn: phân nhánh dải $< 13$ IP vs $\ge 13$ IP, cùng giải pháp kỹ thuật Chặn trong nước và NULL IP khi khách hàng không hợp tác ngưng dùng.
2. **SLA Ticket**: Giữ nguyên nguyên tắc **không áp dụng các số liệu thời gian trong file concept làm cam kết SLA chính thức** cho các bài viết.
3. **Sơ đồ Network Topology**: Đã đóng khung Callout lưu ý kỹ sư Support cần đối chiếu cấu hình thực tế với NOC trước khi thực hiện các tác vụ định tuyến phức tạp.
4. **Các tài liệu bổ trợ**: File `IT HELPDESK.pdf` và `[ODS] SLA ticket 29.05.xlsx` chưa tạo wiki riêng theo đúng chỉ đạo phạm vi.
5. **Hệ thống Lưu đồ SVG**: Đã loại bỏ hoàn toàn các huy hiệu vai trò (role badges) theo yêu cầu của Human, đảm bảo tính tối giản, thoáng mắt và thẩm mỹ cao cấp.
