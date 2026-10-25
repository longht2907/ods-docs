# Hướng dẫn Xây dựng & Tích hợp Flowchart Vector SVG

Tài liệu này hướng dẫn chi tiết cách mô hình hóa và khai báo dữ liệu cho component `<ProcessFlowchart />` trong ODS Support Wiki (`src/components/flowchart/`).

---

## 1. Nguyên lý Lưới ma trận (Grid Matrix)

Hệ thống Flowchart của ODS không dựa vào layout engine nặng nề mà sử dụng ma trận tọa độ logic:
- **`row` (Hàng dọc)**: Thứ tự tầng từ trên xuống dưới (`1, 2, 3, 4...`).
- **`col` (Cột ngang)**:
  - `0`: Luồng chính ở giữa (Primary flow path).
  - `-1`: Nhánh rẽ sang trái (thường là nhánh Lỗi, Từ chối, Chưa đạt, hoặc phân nhánh 1).
  - `1`: Nhánh rẽ sang phải (thường là phân nhánh 2 hoặc trường hợp đặc biệt).
  - `-2` hoặc `2`: Nhánh phụ mở rộng khi sơ đồ có từ 4 nhánh trở lên.

Canvas tự động tính toán pixel `(x, y)` theo khoảng cách chuẩn:
- `ROW_SPACING = 135px` (Khoảng hở giữa 2 hàng đạt 67px, đủ không gian cho mũi tên dọc và nhãn rẽ nhánh).
- `COL_SPACING = 320px` (Khoảng hở giữa 2 cột đạt 116px, thoải mái cho các nhãn cạnh ngang).
- `NODE_W = 204px`, `NODE_H = 68px`

> [!IMPORTANT]
> **Chống chồng chéo chữ (Anti-overlap Engine)**:
> Hệ thống Canvas tự động lót một lớp nền đục `fill-fd-background` 100% bên dưới mọi nhãn cạnh trước khi vẽ viền màu badge. Nhờ đó, đường vẽ vector bên dưới không bao giờ bị lộ hay cắt ngang qua mặt chữ.

---

## 2. Các loại Node (`FlowchartNodeType`)

| Loại | Khai báo `type` | Mục đích | Hình dạng hiển thị |
| :--- | :--- | :--- | :--- |
| **Bắt đầu** | `'start'` | Khách hàng hoặc hệ thống khởi phát luồng | Hình viên thuốc (pill), nền xanh dương nhạt |
| **Hành động** | `'step'` | Bước thao tác kỹ thuật của Support | Hình chữ nhật bo góc 10px, nền card trung tính |
| **Rẽ nhánh** | `'decision'` | Điểm kiểm tra điều kiện (Đồng ý/Không, Đã xong/Chưa) | Hình chữ nhật bo góc viền cam, có icon quả trám |
| **Tham chiếu** | `'reference'` | Gọi đến một quy trình khác đã có wiki riêng | Viền kép đứt nét màu tím |
| **Kết thúc** | `'end'` | Hoàn tất quy trình, đóng ticket | Hình viên thuốc, nền xanh lá nhạt |

> **Quy tắc quan trọng**: Không khai báo thuộc tính `role: 'Sales'` hay `role: 'Support'` trên node để tránh làm xuất hiện badge vai trò thừa, giữ giao diện phẳng và thanh thoát.

---

## 3. Các Pattern rẽ nhánh phổ biến

### Pattern 1: Rẽ 2 nhánh nhị phân (Có / Không, Đạt / Không đạt)

```typescript
// Node rẽ nhánh tại row 2, col 0
{
  id: 'dec-check',
  type: 'decision',
  label: 'Kiểm tra điều kiện hợp lệ?',
  row: 2,
  col: 0,
},
// Nhánh Không đạt (col -1)
{
  id: 'step-fail',
  type: 'step',
  label: 'Yêu cầu xử lý lại / Báo lỗi',
  row: 3,
  col: -1,
},
// Nhánh Đạt (col 0)
{
  id: 'step-pass',
  type: 'step',
  label: 'Tiến hành thao tác kỹ thuật',
  row: 3,
  col: 0,
}

// Edges kết nối:
edges: [
  { from: 'dec-check', to: 'step-fail', label: 'Không đạt', variant: 'no', fromPort: 'left', toPort: 'top' },
  { from: 'dec-check', to: 'step-pass', label: 'Đạt yêu cầu', variant: 'yes' },
]
```

### Pattern 2: Vòng lặp thử lại (Loop Edge)

Khi một bước kiểm tra thất bại, cần quay lại bước trước đó để cấu hình lại:
```typescript
{
  from: 'step-reconfigure',
  to: 'step-apply',
  label: 'Cấu hình lại / Thử lại',
  variant: 'loop',
  fromPort: 'left',
  toPort: 'left', // Cổng left-to-left giúp đường nối vòng ra ngoài lề trái
}
```
*Hệ thống canvas sẽ tự động nới lề ngoài (`padLeft = 120px`) để nhãn văn bản của đường loop không bị cắt lề.*

### Pattern 3: Phân 3 nhánh song song

```typescript
// Node rẽ nhánh tại row 4, col 0
{ id: 'dec-vendor', type: 'decision', label: 'Phân loại theo hãng?', row: 4, col: 0 },

// 3 nhánh tại row 5
{ id: 'step-branch-1', type: 'step', label: 'Phương án A (Plesk)', row: 5, col: -1 },
{ id: 'step-branch-2', type: 'step', label: 'Phương án B (cPanel)', row: 5, col: 0 },
{ id: 'step-branch-3', type: 'step', label: 'Phương án C (DirectAdmin)', row: 5, col: 1 },

// Edges kết nối:
edges: [
  { from: 'dec-vendor', to: 'step-branch-1', label: 'Hãng A', fromPort: 'left', toPort: 'top' },
  { from: 'dec-vendor', to: 'step-branch-2', label: 'Hãng B' },
  { from: 'dec-vendor', to: 'step-branch-3', label: 'Hãng C', fromPort: 'right', toPort: 'top' },
]
```

---

## 4. Quy trình đăng ký Flow vào hệ thống

1. **Khai báo dữ liệu**: Mở file `src/components/flowchart/data/<service>-flows.ts` (hoặc tạo mới file dữ liệu cho dịch vụ mới). Export hằng số `export const <tenQuyTrinh>Flow: FlowchartData = { ... };`.
2. **Đăng ký vào Index**: Mở `src/components/flowchart/index.tsx`:
   - Import hằng số vừa tạo.
   - Thêm vào bảng băm `flowRegistry`:
     ```typescript
     const flowRegistry: Record<string, FlowchartData> = {
       ...
       '<ma-dinh-danh>': <tenQuyTrinh>Flow,
     };
     ```
3. **Nhúng vào MDX**:
   ```mdx
   ## 4. Lưu đồ quyết định

   <ProcessFlowchart flowId="<ma-dinh-danh>" />
   ```
