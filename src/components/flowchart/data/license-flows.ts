import type { FlowchartData } from '../types';

export const licenseRegistrationFlow: FlowchartData = {
  id: 'license-registration',
  title: 'Đăng ký license — phân nhánh mã dịch vụ',
  caption: 'Đối chiếu “Quy đình đăng kí các License.pdf”; quy ước tài khoản và giao diện cần xác nhận hiện hành.',
  nodes: [
    { id: 'start', type: 'start', label: 'Tiếp nhận & xác minh hãng, IP', row: 1, col: 0 },
    { id: 'code', type: 'decision', label: 'Đã có mã dịch vụ?', row: 2, col: 0 },
    { id: 'has-code', type: 'reference', label: 'Khai báo theo hãng ở Bước 2', subLabel: '9602 chỉ thuộc DirectAdmin', row: 3, col: -1, stepLink: '#bước-2-trường-hợp-đã-có-mã-dịch-vụ' },
    { id: 'owner', type: 'step', label: 'Báo người phụ trách đăng ký', subLabel: 'Áp dụng cả ba hãng khi chưa có mã', row: 3, col: 1 },
    { id: 'create-code', type: 'step', label: 'Nhận phản hồi; nhờ tạo mã DV', row: 4, col: 1 },
    { id: 'record', type: 'reference', label: 'Start mã & cập nhật theo Bước 3', subLabel: 'Không tự tạo mã dịch vụ tạm', row: 5, col: 1, stepLink: '#bước-3-trường-hợp-chưa-có-mã-dịch-vụ' },
    { id: 'check', type: 'step', label: 'Đối chiếu kết quả & bàn giao', row: 6, col: 0 },
    { id: 'end', type: 'end', label: 'Ghi nhận kết quả & hoàn tất', row: 7, col: 0 },
  ],
  edges: [
    { from: 'start', to: 'code' },
    { from: 'code', to: 'has-code', label: 'Đã có', variant: 'yes' },
    { from: 'code', to: 'owner', label: 'Chưa có', variant: 'no' },
    { from: 'owner', to: 'create-code' },
    { from: 'create-code', to: 'record' },
    { from: 'has-code', to: 'check' },
    { from: 'record', to: 'check' },
    { from: 'check', to: 'end' },
  ],
};
