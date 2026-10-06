---
name: doc-actuator
description: Khảo sát UI thật và viết hoặc cải tiến tài liệu MDX cho ODS AI Contact Center. Dùng khi cần thao tác Portal, thu thập screenshot, mô tả field/workflow, làm bài hướng dẫn sinh động, hoặc kiểm chứng nội dung Fumadocs; không dùng để suy đoán tính năng chưa quan sát hay viết API khi chưa có đặc tả.
---

# Doc Actuator

Biến hành vi thật trên ODS AI Contact Center thành tài liệu dễ làm theo, có bằng chứng và an toàn để công bố. Ưu tiên giúp người đọc hoàn thành công việc; component và hình thức chỉ phục vụ mục tiêu đó.

## 1. Hợp đồng chất lượng

Mỗi bài phải:

1. **Đúng:** tên menu, field, trạng thái, validation và kết quả lấy từ UI hoặc nguồn được duyệt.
2. **Làm được:** người đọc biết bắt đầu ở đâu, chọn gì, khi nào lưu và cách xác nhận thành công.
3. **Dễ quét:** mở đầu ngắn, heading nói rõ tác vụ, ảnh nằm sát bước liên quan, bảng chỉ chứa dữ liệu cần tra cứu.
4. **Có sức sống:** dùng tình huống vận hành, checkpoint và lựa chọn thực tế; không dùng giọng quảng cáo, emoji trang trí hoặc câu chữ khoa trương.

Không đánh đổi độ chính xác để bài viết hấp dẫn hơn.

## 2. Evidence first

Trước khi viết, phân loại thông tin:

- **Observed:** nhìn thấy trực tiếp trên UI, screenshot hoặc runtime.
- **Approved:** có trong đặc tả, vendor docs hoặc tài liệu nghiệp vụ được Human duyệt.
- **Inferred:** suy luận hợp lý nhưng chưa được xác nhận.
- **Unknown:** chưa có bằng chứng.

Chỉ trình bày **Observed** và **Approved** như sự thật. Với **Inferred**, ghi rõ đó là diễn giải hoặc khuyến nghị. Không xuất bản **Unknown**; để placeholder có kiểm soát hoặc hỏi Human.

Phải có bằng chứng cho giới hạn số ký tự/thiết bị/lần thử; giá trị mặc định, timeout, thứ tự ưu tiên; định dạng file, codec, port; quyền, billing, cước; hành vi xóa, ghi đè, gửi email, khóa hoặc retry; endpoint, authentication, schema và webhook event.

Khi UI mâu thuẫn với bài cũ, giữ bằng chứng và báo Human; không âm thầm chọn một phiên bản.

## 3. Workflow khảo sát UI

### Chuẩn bị

- Dùng tài khoản demo hoặc dữ liệu được phép công bố.
- Human tự nhập password, OTP và secret. Không ghi chúng vào chat, screenshot hay MDX.
- Chốt **một bài target** và outcome trước khi thao tác.
- Ưu tiên read-only. Trước khi submit, tạo, sửa, xóa, gọi điện, gửi chiến dịch hoặc phát sinh cước, phải có xác nhận cụ thể của Human.

### Khảo sát

1. Xác định đường dẫn menu và quyền cần có.
2. Ghi trạng thái ban đầu: title, tab, bảng, filter và CTA.
3. Mở form/modal/drawer; ghi đúng label, control type, required marker, default và helper text.
4. Thử validation bằng dữ liệu demo khi được phép.
5. Thực hiện tác vụ và ghi tín hiệu thành công: toast, trạng thái, row mới, URL hoặc thay đổi hiển thị.
6. Ghi đường lui: Cancel, rollback, disable hoặc delete, nếu UI có.
7. Chỉ ghi troubleshooting đã quan sát hoặc có nguồn.

Dừng khi đủ bằng chứng cho outcome; không click lan sang module ngoài bài.

## 4. Screenshot có chủ đích

Ảnh phải trả lời một câu hỏi, không chỉ chứng minh màn hình tồn tại.

- Lưu tại `public/media/ai-contact-center/user-guider-portal/`.
- Đặt tên `{feature}_{state-or-action}.png` theo convention hiện có.
- Chụp trạng thái có ý nghĩa: danh sách, form, validation, cấu hình hoàn chỉnh hoặc kết quả.
- Crop vừa đủ để còn ngữ cảnh và vùng thao tác.
- Loại bỏ dữ liệu khách hàng, số điện thoại, email, extension, token và identifier chưa được duyệt.
- Không dùng hai ảnh gần như giống nhau.
- Alt text mô tả trạng thái và mục đích, không viết “ảnh chụp màn hình”.

Đặt ảnh ngay sau thao tác tạo ra trạng thái đó. Khi hữu ích, thêm checkpoint: “Kết quả mong đợi: trạng thái chuyển sang **Đang bật**.”

## 5. Chọn cấu trúc theo loại bài

Không ép mọi bài vào cùng một template.

### Task guide

Dùng cho một tác vụ cụ thể:

- Mở đầu bằng outcome và khi nào nên dùng.
- **Trước khi bắt đầu:** quyền và tài nguyên cần thiết.
- **Cấu hình cần biết:** chỉ field xuất hiện trong workflow.
- **Thực hiện:** `<Steps>/<Step>`.
- **Kiểm tra kết quả:** dấu hiệu thành công và test an toàn.
- **Xử lý sự cố:** symptom → nguyên nhân đã biết → cách kiểm tra → cách xử lý.

### Concept hoặc overview

- Module giải quyết bài toán gì.
- Bản đồ khả năng bằng `<Cards>/<Card>`.
- “Chọn hướng nào?” bằng decision table hoặc tình huống.
- Trình tự triển khai khuyến nghị.
- Link sang task guide; không lặp toàn bộ thao tác.

### Multi-scenario guide

- Mở bằng bảng: nhu cầu → tính năng → kết quả.
- Mỗi scenario có prerequisites, field, steps và checkpoint riêng.
- Dùng Mermaid khi luồng có điểm rẽ nhánh khó diễn đạt.
- Nêu thứ tự ưu tiên và xung đột nếu đã được kiểm chứng.

### Reference

- Giữ prose ngắn.
- Bảng nêu label đúng UI, control, required/default và tác động.
- Link tới task guide thay vì nhúng quy trình dài.

## 6. Nhịp viết sinh động nhưng thực dụng

### Mở bài theo outcome

Trong 2–3 câu, trả lời: người đọc làm được gì, khi nào cần dùng và kết quả vận hành là gì. Tránh “Tính năng X là một tính năng mạnh mẽ...”.

### Viết theo hành động và phản hồi

Mỗi step có nhịp:

1. **Hành động:** click/chọn/nhập gì.
2. **Lý do:** lựa chọn ảnh hưởng gì, nếu không hiển nhiên.
3. **Kết quả mong đợi:** tín hiệu nào xác nhận đúng.

Tiêu đề `###` trong `<Step>` dùng động từ như “Mở danh sách máy nhánh”, “Chọn đích ngoài giờ”. Không lặp “Bước 1”, vì component đã thể hiện thứ tự.

### Giúp người đọc quyết định

Dùng decision table cho lựa chọn dễ nhầm; một ví dụ cấu hình nhất quán xuyên bài; `info` cho context, `warn` cho rủi ro thật, `error` cho nguy cơ gián đoạn/mất dữ liệu; checkpoint sau thao tác quan trọng.

Không dùng Callout để trang trí. Không nhồi mọi chi tiết vào bảng; field đơn giản có thể giải thích trong step.

### Giọng văn

- Tiếng Việt tự nhiên, trực tiếp; giữ SIP, Extension, IVR, Ring Group, Webhook.
- Dùng “bạn” cho thao tác; dùng tên vai trò khi nói về quyền.
- Câu ngắn, một câu một ý, động từ chủ động.
- Không viết “luôn”, “tuyệt đối”, “ngay lập tức” nếu chưa chứng minh.
- Không tự thêm số liệu khuyến nghị. Nếu là best practice, ghi rõ “Khuyến nghị vận hành”.

## 7. MDX và Fumadocs

Mọi file có frontmatter:

```md
---
title: "Tiêu đề theo outcome hoặc tác vụ"
description: "Người đọc sẽ làm được gì và phạm vi bài viết."
---
```

Quy ước:

- `##` cho phần chính; `###` cho nhánh hoặc tiêu đề trong `<Step>`.
- Layout render H1 từ frontmatter; không lặp `# Title` trong body.
- `Steps` cho chuỗi tuần tự; `Cards` cho bản đồ khả năng; `Tabs` chỉ cho biến thể tương đương.
- Mermaid chỉ dùng cho workflow/routing có điểm rẽ nhánh đáng kể.
- Không dùng HTML tùy ý khi component hiện có đáp ứng được.
- Link nội bộ phải tồn tại; public docs không link sang `/internal`.
- Không đặt credential, API key, dữ liệu khách hàng hoặc số điện thoại thật vào ví dụ.

## 8. Scope

Mặc định mỗi iteration hoàn thiện **một bài MDX target**. Được chạm thêm file hỗ trợ trực tiếp khi task spec cho phép: screenshot, `meta.json`, component MDX thật sự cần thiết, task spec và report.

Không refactor bài khác chỉ để đồng nhất văn phong. Ghi lỗi ngoài scope vào backlog.

## 9. Definition of Done

- Đối chiếu claim định lượng hoặc hành vi nhạy cảm với evidence.
- Kiểm tra frontmatter, heading, alt text, image path và internal link.
- Xác nhận bài có outcome, prerequisites, workflow, checkpoint và recovery phù hợp với loại bài.
- Chạy:

```bash
npm run verify:code
git diff --check
```

Nếu task yêu cầu nghiệm thu đầy đủ, chạy `npm run verify:task`.

Chỉ báo PASS khi lệnh đã chạy thật. Báo file đã sửa, evidence đã dùng, kết quả lệnh và nội dung còn Unknown/cần Human xác nhận.
