export type FlowchartNodeType = 'start' | 'end' | 'step' | 'decision' | 'reference';

export interface FlowchartNode {
  id: string;
  type: FlowchartNodeType;
  label: string;
  subLabel?: string;
  role?: 'Sales' | 'Support' | 'Khách hàng' | 'NOC' | string;
  row: number; // Tầng theo chiều dọc (1, 2, 3...)
  col: number; // Cột theo chiều ngang (0 là trung tâm, -1 là rẽ trái, 1 là rẽ phải, v.v.)
  width?: number;
  height?: number;
  stepLink?: string; // Ví dụ: '#buoc-1-tiep-nhan-yeu-cau-mo-ticket'
  refUrl?: string; // Ví dụ: '/internal/network/processes/ip-allocation'
}

export interface FlowchartEdge {
  from: string;
  to: string;
  label?: string; // Nhãn nhánh (Có, Không, Colo, Local, v.v.)
  variant?: 'default' | 'yes' | 'no' | 'loop';
  fromPort?: 'top' | 'bottom' | 'left' | 'right';
  toPort?: 'top' | 'bottom' | 'left' | 'right';
}

export interface FlowchartData {
  id: string;
  title: string;
  caption?: string;
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
}
