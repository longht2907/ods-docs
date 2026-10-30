---
status: in-progress
branch: task/TASK-031-api-documentation-diagrams
commit: "eb6931c"
verified-by: npm run verify:task
---

# TASK-031 — Cải thiện các sơ đồ trong tài liệu API Contact Center (Webhook, WebSocket RTC, ODSPhone Widget)

## Bối cảnh

Trong tài liệu API Contact Center hiện tại, một số trang quan trọng (`webhook/index.mdx`, `websocket-rtc/index.mdx`, `websocket-rtc/ket-noi-webrtc.mdx`, `websocket-rtc/widget-odsphone.mdx`) đang sử dụng các khối sơ đồ ASCII thô sơ (hoặc có sơ đồ ASCII biểu diễn nhầm vị trí kỹ thuật như đặt SIP Proxy/SBC nằm bên trong khung trình duyệt). Các khối ASCII này khó theo dõi trên màn hình di động, không tương thích giao diện dark/light của Fumadocs, thiếu phân cấp trực quan và không đáp ứng tiêu chuẩn tiếp cận (accessibility/screen reader).

## Mục tiêu

1. Thay thế các khối sơ đồ ASCII bằng các component trực quan, hiện đại, chuẩn SVG/HTML tĩnh, tương thích hoàn toàn với hệ thống token giao diện của Fumadocs (hỗ trợ đầy đủ light/dark theme, responsive mobile không tràn màn hình).
2. Sửa chữa các mâu thuẫn trực quan trong sơ đồ cũ (đặc biệt là tách bạch rõ ranh giới giữa Trình duyệt Web và Hạ tầng ODS Cloud PBX trong WebRTC; làm rõ 2 nhánh đăng nhập và ranh giới bảo mật iframe vs CRM trong ODSPhone Widget; làm rõ chiều gửi sự kiện Webhook và định danh đa nhánh LID/Uid).
3. Đảm bảo bảo toàn 100% nội dung kỹ thuật, tham số API, endpoint và logic nghiệp vụ.

## Phạm vi (Scope)

### Tạo mới:
- `tasks/TASK-031-api-documentation-diagrams.md`
- `.harness/reports/TASK-031-report.md`
- `src/components/docs/webhook-flow-diagram.tsx`
- `src/components/docs/webrtc-architecture-diagram.tsx`
- `src/components/docs/odsphone-widget-flow.tsx`
- `src/components/docs/network-topology-diagram.tsx`
- `src/components/docs/troubleshooting-method-diagram.tsx`
- `.agents/skills/impeccable/**`

### Sửa đổi:
- `src/components/mdx.tsx` — đăng ký các component sơ đồ mới vào danh mục MDX.
- `content/docs/ai-contact-center/api/webhook/index.mdx` — thay thế các sơ đồ ASCII về luồng sự kiện và định danh cuộc gọi bằng WebhookFlowDiagram.
- `content/docs/ai-contact-center/api/websocket-rtc/index.mdx` — thay thế sơ đồ ASCII kiến trúc 5 thành phần bằng WebrtcArchitectureDiagram.
- `content/docs/ai-contact-center/api/websocket-rtc/ket-noi-webrtc.mdx` — thay thế sơ đồ ASCII 4 mốc kết nối bằng WebrtcConnectionFlowDiagram.
- `content/docs/ai-contact-center/api/websocket-rtc/widget-odsphone.mdx` — thay thế sơ đồ ASCII luồng khởi tạo và 2 nhánh đăng nhập bằng OdsphoneWidgetFlow.
- `content/internal/network/knowledge-base/topology.mdx` — thay thế sơ đồ ASCII phân tầng mạng bằng NetworkTopologyDiagram.
- `content/internal/ai-contact-center/runbooks/**` — hoàn thiện bản nháp runbook L1 cho AI Contact Center theo tiêu chuẩn Impeccable (trang danh mục và toàn bộ runbooks).
- `src/components/flowchart/layout.ts` — tối ưu padding và spacing linh hoạt cho sơ đồ quy trình.
- `src/components/flowchart/flowchart-canvas.tsx` — cải tiến đường nối bo góc và visual styling cho loop edge.
- `src/components/flowchart/flowchart-viewer.tsx` — căn giữa trọng tâm nội dung sơ đồ trong khung nhìn bài viết.
- `src/components/flowchart/data/voice-flows.ts` — tinh chỉnh bố cục và nhãn luồng quy trình Contact Center.

### Xóa:
- Không có.

## Ngoài phạm vi (Out of Scope)

- [ ] Không sửa các trang ngoài danh mục Webhook, WebSocket RTC/WebRTC và các sơ đồ ASCII được phê duyệt trong /internal (không sửa Home, Mega menu, Portal, CloudFile).
- [ ] Không thay đổi ranh giới bảo mật public/internal hoặc cấu hình mạng Caddy/proxy.
- [ ] Không thêm thư viện diagram bên ngoài (Mermaid, React Flow, external rendering engines).
- [ ] Không tự ý thay đổi URL, slug, heading anchor hoặc các ví dụ code thực thi.
- [ ] Không sửa cấu hình secret, deployment, DNS, OAuth.

## Ràng buộc kiến trúc & Kỹ thuật

- Tuân thủ nguyên tắc trong [AGENTS.md](../AGENTS.md) và [DECISIONS.md](../DECISIONS.md).
- Tận dụng chuẩn thiết kế từ `src/components/docs/api-architecture-overview.tsx` và `click-to-call-flow.tsx`.
- Các component SVG phải có `viewBox` responsive, ID marker/clipPath duy nhất, phân cấp màu sắc theo semantic tokens của Fumadocs, nhãn text rõ ràng, có `role="img"` và `aria-label` / caption tương đương cho trợ năng.
- Thực hiện kiểm chứng bằng `npm run check:scope`, `npm run check:env`, `npm run check:links`, `npm run guard`, `npm run verify:code` và `npm run verify:task`.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [ ] Toàn bộ các sơ đồ ASCII mục tiêu trong `webhook/index.mdx`, `websocket-rtc/index.mdx`, `websocket-rtc/ket-noi-webrtc.mdx`, `websocket-rtc/widget-odsphone.mdx` được thay bằng component trực quan.
- [ ] Kiến trúc WebRTC thể hiện đúng SIP Proxy/SBC thuộc hạ tầng ODS Cloud (nằm ngoài trình duyệt).
- [ ] Sơ đồ ODSPhone Widget phân tách rõ 2 nhánh (Nhập tay vs Programmatic) và làm rõ ranh giới bảo mật iframe vs CRM.
- [ ] Sơ đồ Webhook thể hiện rõ mô hình đẩy sự kiện ODS -> Customer Backend và phân tầng LID / Uid.
- [ ] Các component hiển thị tốt trên Desktop và Mobile (360px+), không tràn khung trang.
- [ ] Hỗ trợ mượt mà cả chế độ Sáng (Light) và Tối (Dark).
- [ ] `npm run check:scope` PASS.
- [ ] `npm run verify:task` PASS toàn bộ chuỗi kiểm chứng.

## Điều kiện dừng (Stop Condition)

Dừng lại và xin ý kiến Human ngay lập tức nếu:
1. Gặp lỗi build / typecheck không giải quyết được sau 3 lần thử.
2. Cần cài thêm thư viện ngoài phạm vi cho phép.
3. Yêu cầu mâu thuẫn với mục "Không được phá vỡ" trong `AGENTS.md`.

## Báo cáo khi hoàn thành

- Báo cáo nghiệm thu tại `.harness/reports/TASK-031-report.md`.
- Danh sách file tạo/sửa.
- Kết quả thực tế của chuỗi lệnh kiểm chứng.

