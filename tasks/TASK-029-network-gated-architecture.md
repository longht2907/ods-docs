---
status: done
branch: task/TASK-029-network-gated-architecture
commit: "0df447a"
verified-by: npm run verify:task
---

# TASK-029 — Network-gated Support Wiki và mẫu trải nghiệm đọc tài liệu

## Bối cảnh

README và các ADR hiện mô tả `/internal/**` theo định hướng đăng nhập ứng dụng,
trong khi quyết định mới là chuyển repository sang private và chỉ cho phép truy
cập Support Wiki từ WAN văn phòng hoặc VPN công ty. Runtime hiện tại vẫn
fail-closed bằng `src/proxy.ts`; network gate chưa được triển khai trong task này.

## Mục tiêu

- Tạo tài liệu kiến trúc chính, phân biệt rõ current state và target architecture.
- Đồng bộ README, ADR, quy tắc agent và hướng dẫn deploy với mô hình network-gated.
- Ghi nhận media public và internal thuộc hai trust zone khác nhau.
- Không mô tả account, OTP, session, database hoặc R2 như thành phần của hệ thống.
- Cải thiện mẫu trải nghiệm đọc cho Portal, API Reference và CloudFile mà không đổi
  ý nghĩa kỹ thuật, route, search scope hoặc ranh giới public/internal.

## Phạm vi (Scope)

### Tạo mới

- `ARCHITECTURE.md`
- `tasks/TASK-029-network-gated-architecture.md`
- `.harness/reports/TASK-029-report.md`
- `.harness/reports/TASK-029-api-audit.md`
- `.harness/reports/TASK-029-internal-reading-audit.md`
- `.harness/reports/TASK-029-runbook-drafts.md`

### Sửa đổi

- `README.md`
- `DECISIONS.md`
- `AGENTS.md`
- `DEPLOY_VPS.md`
- `src/app/docs/[[...slug]]/page.tsx`
- `src/app/internal/[[...slug]]/page.tsx`
- `src/app/internal/_components/review-question.tsx`
- `src/app/global.css`
- `src/components/mdx.tsx`
- `src/components/docs/api-endpoint.tsx`
- `src/components/docs/start-campaign-flow.tsx`
- `content/docs/ai-contact-center/portal/**`
- `content/docs/ai-contact-center/api/**`
- `content/docs/cloudfile/**`
- `content/internal/ai-contact-center/runbooks/calls/**`
- `content/internal/ai-contact-center/runbooks/autocall/**`
- `content/internal/ai-contact-center/runbooks/carriers/**`
- `content/internal/ai-contact-center/runbooks/extensions/**`
- `content/internal/ai-contact-center/runbooks/integrations/**`
- `content/internal/ai-contact-center/runbooks/portal/**`
- `content/internal/ai-contact-center/runbooks/recordings/**`

## Ngoài phạm vi (Out of Scope)

- Không sửa `src/proxy.ts`, route URL, Search API, Caddyfile hoặc Docker runtime.
- Không tạo `private-media/` hoặc `/api/media/internal/**` trong task tài liệu này.
- Không đổi visibility GitHub, secret, DNS, network, VPN hoặc deploy production.
- Không thêm database, Authentication, OTP, Session, R2 hoặc dependency.
- Không sửa task lịch sử và không đưa thay đổi `next-env.d.ts` vào task.

## Ràng buộc kiến trúc & kỹ thuật

- `/docs/**` tiếp tục public; `/internal/**` và internal API tiếp tục fail-closed.
- Target architecture chỉ cho phép `/internal/**` từ office WAN hoặc VPN NAT qua
  WAN công ty, với Caddy là L7 gate và Next.js Proxy là lớp fail-closed thứ hai.
- `public/media/**` chỉ chứa asset được phép public. Internal media dự kiến nằm
  ngoài `public/` và chỉ được trả qua route đã qua network authorization.
- Giữ `Cache-Control: private, no-store`, `noindex`, source/search isolation và
  Next.js `output: 'standalone'`.
- Repository private không cho phép commit secret hoặc dữ liệu cá nhân khách hàng.

## Tiêu chí nghiệm thu (Acceptance Criteria)

- [x] `ARCHITECTURE.md` mô tả component, request flow, build/deploy flow và cây thư mục.
- [x] README onboarding ngắn gọn và liên kết đúng đến tài liệu chuyên sâu.
- [x] README/AGENTS không còn mô tả local account login là target architecture.
- [x] Current runtime và target architecture không bị mô tả lẫn nhau.
- [x] Internal media không được đặt dưới `public/media` trong target structure.
- [x] Anonymous `/internal` và `/api/search/internal` vẫn trả `401` ở runtime hiện tại.
- [x] TOC public không liệt kê từng Step nhưng heading anchor và deep link vẫn hoạt động.
- [x] Bảng 3–4 cột cuộn trong vùng riêng trên mobile và không làm tràn viewport.
- [x] Ảnh có caption, Expected Result có phân cấp rõ và API copy control có touch target phù hợp.
- [x] Ba bài mẫu được kiểm tra desktop/mobile, Light/Dark, TOC, anchor, image zoom,
  table và code copy.
- [x] Các dòng `Kết quả` hiện có trong Portal và CloudFile được chuyển sang component
  `ExpectedResult` mà không đổi câu chữ hoặc ý nghĩa kỹ thuật.
- [x] Toàn bộ 37 bài AI Contact Center API được audit theo đúng article type; các
  điểm thiếu bằng chứng được ghi `Partial/Blocked` thay vì tự bổ sung contract.
- [x] TOC của bài internal chỉ hiển thị cấp mục chính nhưng giữ nguyên heading anchor.
- [x] Câu hỏi biên tập trong bốn runbook cuộc gọi được phân biệt với chỉ dẫn vận hành,
  không đổi ID hoặc nội dung cần Human xác nhận.
- [x] Ba bài internal đại diện được kiểm tra desktop/mobile, Light/Dark, TOC, anchor,
  table, flowchart, keyboard focus và viewport overflow.
- [x] 12 runbook AI Contact Center thường gặp ở Support L1 được soạn thành bản nháp
  thực chiến, phân biệt rõ thao tác an toàn, điểm dừng và nội dung chờ Human duyệt.
- [x] Không có password, token, IP khách hàng hoặc dữ liệu nhận diện thật trong bộ
  runbook; API/Webhook không khuyến nghị retry mutation thiếu idempotency.
- [ ] `npm run check:links`, `npm run guard`, `npm run check:scope` và
  `npm run verify:task` PASS sau thay đổi UI.

## Điều kiện dừng (Stop Condition)

Dừng lại và hỏi Human nếu:

1. Cần thay đổi runtime security boundary hoặc triển khai network gate.
2. Cần thêm dependency, database, external service hoặc Caddy configuration.
3. Kiểm chứng cho thấy tài liệu mục tiêu mâu thuẫn với quyết định đã được Human chốt.

## Báo cáo khi hoàn thành

- Liệt kê file tài liệu đã tạo hoặc sửa.
- Ghi kết quả thật của toàn bộ lệnh kiểm chứng.
- Nêu rõ network gate, private-media route và GitHub visibility vẫn cần triển khai
  hoặc xác minh ở task/hệ thống bên ngoài tương ứng.
