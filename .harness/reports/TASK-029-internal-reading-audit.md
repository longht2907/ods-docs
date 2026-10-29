# TASK-029 — Audit trải nghiệm đọc Support Wiki nội bộ

## Phạm vi và nguyên tắc

Audit 70 bài trong `content/internal/**`, tập trung vào reading layout, content
components và article structure. Không thay đổi quy trình kỹ thuật, route, search,
network boundary, `noindex`, `no-store` hoặc production configuration.

Ba bài đại diện:

1. AI Contact Center runbook dạng dàn ý: triệu chứng, câu hỏi khách hàng, kiểm tra,
   xử lý và các câu hỏi chờ Human xác nhận.
2. Network runbook: bảng thu thập bằng chứng, flowchart, nhiều nhánh xử lý và điểm dừng.
3. Data Center process: điều kiện đầu vào, checklist, flowchart, các bước thao tác và
   bảng ngoại lệ.

Không trích dữ liệu hạ tầng hoặc thông tin khách hàng vào báo cáo này.

## Kết quả audit theo mức ưu tiên

### Vấn đề dùng chung

| Mức | Phát hiện | Trạng thái |
| --- | --- | --- |
| P1 | TOC liệt kê cả `h2` và từng `h3` Bước, làm runbook/process có hơn 30 anchor link và khó quét. | Đã sửa: TOC chỉ hiển thị `h2`; heading ID và deep link `h3` giữ nguyên. |
| P1 | 36 câu hỏi biên tập trong 4 runbook cuộc gọi dùng blockquote, dễ bị đọc nhầm là chỉ dẫn vận hành. | Đã sửa presentation bằng `ReviewQuestion`; giữ nguyên ID và câu chữ. |
| P2 | Heading dài cần nhịp xuống dòng ổn định trên mobile. | Đã áp dụng `text-wrap: balance` riêng trong article internal. |
| P2 | Bảng và flowchart rộng có nguy cơ bị hiểu nhầm là page overflow khi nhìn screenshot crop. | DOM/CDP xác nhận wrapper cuộn riêng và page không tràn ở 390/768/1440px. Không sửa component. |

Reading measure 72ch, table containment và flowchart focus/fullscreen là năng lực dùng
chung đã có và tiếp tục được tái sử dụng. Không thêm card, gradient, animation hoặc
dependency.

### Vấn đề theo loại tài liệu

- Runbook dàn ý: marker `Cần bổ sung` và `Q-*` là nội dung biên tập, chưa phải quy
  trình đã duyệt. Component mới làm rõ trạng thái nhưng không biến nội dung đó thành
  hướng dẫn vận hành.
- Runbook/process có flowchart: bản inline ưu tiên chữ ở 100%, cuộn ngang trong vùng
  riêng; fullscreen có focus trap, zoom/fit/reset và keyboard navigation. Không cần
  đổi component.
- Knowledge base/table-heavy: bảng 3–4 cột tiếp tục giữ minimum readable width và
  cuộn trong wrapper; không thu nhỏ chữ để ép vừa mobile.

### Nội dung kỹ thuật cần Human xác nhận

- 12 runbook AI Contact Center đã được Human yêu cầu soạn thành bản nháp L1 để tiếp
  tục hiệu chỉnh. Các bài có guardrail và điểm dừng nhưng chưa phải quy trình đã duyệt.
- 4 runbook cuộc gọi còn 36 mục `Cần bổ sung`/`Q-*`; UI đã phân biệt trạng thái,
  nhưng câu trả lời kỹ thuật vẫn BLOCKED chờ Human.
- Tổng vùng internal hiện không có screenshot MDX. Vì vậy image caption/zoom là
  `NOT APPLICABLE`, không được báo PASS cho nội dung internal.

## Chấm điểm Impeccable Read mode (0–4)

| Dimension | Điểm | Bằng chứng |
| --- | ---: | --- |
| Accessibility | 3 | Semantic heading/TOC, focusable flowchart region, dialog initial focus và deep link PASS; chưa chạy screen reader thực tế. |
| Performance | 4 | Không thêm client runtime hoặc dependency; review marker là Server Component. |
| Theming | 4 | Ba bài mẫu đạt Light/Dark ở 390/768/1440px. |
| Responsive | 4 | Không page overflow; table/flowchart cuộn trong vùng riêng; mobile navigation không che nội dung. |
| Implementation integrity | 4 | Component chỉ gắn trong internal renderer; public/internal boundary và nội dung kỹ thuật không đổi. |

## File thay đổi và phạm vi ảnh hưởng

- `src/app/internal/[[...slug]]/page.tsx`: TOC `h2`-only, article scope class và
  component mapping internal.
- `src/app/internal/_components/review-question.tsx`: marker biên tập semantic,
  không có client state.
- `src/app/global.css`: typography/status styles riêng cho internal article.
- `content/internal/ai-contact-center/runbooks/calls/{inbound-failed,outbound-failed,dropped-calls,one-way-audio}.mdx`:
  đổi 36 blockquote sang wrapper presentation; ID/câu hỏi không đổi.

## Screenshot trước/sau

| Bài đại diện | Trước | Sau |
| --- | --- | --- |
| Runbook dàn ý | `assets/TASK-029/internal-reading-before/runbook-outline-1440-light.png` | `assets/TASK-029/internal-reading-after/runbook-outline-1440-light.png` |
| Network runbook mobile | `assets/TASK-029/internal-reading-before/network-runbook-390-light.png` | `assets/TASK-029/internal-reading-after/network-runbook-390-light.png` |
| Data Center process | `assets/TASK-029/internal-reading-before/dc-process-1440-dark.png` | `assets/TASK-029/internal-reading-after/dc-process-1440-dark.png` |

Ảnh mobile trước dùng Edge CLI nên bị crop bởi minimum window width; kết luận overflow
dựa trên CDP DOM metrics, không suy luận từ screenshot đó. Ảnh sau dùng CDP viewport
390px chính xác.

## Kiểm chứng thực tế

| Kiểm tra | Kết quả |
| --- | --- |
| Impeccable detector | PASS — exit code 0 |
| Browser matrix | PASS — 18 cases: 3 bài × 390/768/1440 × Light/Dark |
| TOC | PASS — số item bằng số `h2`; `h3` không lặp trong TOC |
| Anchor | PASS — deep link tới `h3` vẫn resolve |
| Table | PASS — wrapper overflow riêng; không tràn viewport |
| Flowchart | PASS — inline focus, fullscreen dialog và initial focus |
| Image zoom | NOT APPLICABLE — không có image trong 70 MDX internal |
| `npm run types:check` | PASS |
| `npm run check:links` | PASS |
| `npm run guard` | PASS |
| `npm run test:internal-content` | PASS — 21 flows, 76 step links; internal vẫn 401 |
| `npm run test:routes` | PASS — 21/21; internal và internal search vẫn 401 |
| `npm run test:flowchart` lần đầu | FAIL — dev server audit còn giữ lock, không phải assertion UI |
| `npm run test:flowchart` chạy lại cô lập | PASS — 12 route/viewport/theme cases và 21 process pages |
| `npm run build` với test-only origin | PASS — 452/452 static pages |
| `npm run check:scope` | FAIL — `.codex/hooks.json` có sẵn ngoài task scope |
| `npm run verify:task` | FAIL tại `check:scope`; `verify:code` trước đó PASS |

## Đề xuất rollout tiếp

1. Human rà soát 12 bản nháp L1, xác nhận công cụ, quyền thao tác, SLA và nhóm nhận
   escalation trước khi gắn trạng thái “đã xác nhận”.
2. Trả lời 36 câu hỏi review theo từng runbook; sau khi duyệt mới xóa marker hoặc
   chuyển thành nội dung vận hành chính thức.
3. Khi có internal screenshot, đặt asset ngoài `public/`, triển khai protected media
   route ở task runtime riêng rồi mới áp dụng caption/zoom.

