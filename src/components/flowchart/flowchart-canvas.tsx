import React from 'react';
import type { FlowchartData, FlowchartNode, FlowchartEdge } from './types';

interface CanvasProps {
  data: FlowchartData;
  className?: string;
}

const NODE_W = 204;
const NODE_H = 68;
const COL_SPACING = 380;
const ROW_SPACING = 135;
const PADDING = 48;

interface ComputedNode extends FlowchartNode {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function FlowchartCanvas({ data, className = '' }: CanvasProps) {
  // 1. Tính toán tọa độ của từng node theo row và col
  // Tìm min/max col để căn giữa
  const cols = data.nodes.map((n) => n.col);
  const rows = data.nodes.map((n) => n.row);
  const minCol = Math.min(...cols, 0);
  const maxCol = Math.max(...cols, 0);
  const minRow = Math.min(...rows, 1);
  const maxRow = Math.max(...rows, 1);

  const colOffset = Math.abs(minCol);
  const totalCols = maxCol - minCol + 1;
  const totalRows = maxRow - minRow + 1;

  // Kiểm tra xem có đường loop bên trái hoặc bên phải không để nới rộng lề cho nhãn
  const hasLeftLoop = data.edges.some((edge) => {
    return edge.fromPort === 'left' && edge.toPort === 'left';
  });
  const hasRightLoop = data.edges.some((edge) => {
    return edge.fromPort === 'right' && edge.toPort === 'right';
  });

  const padLeft = hasLeftLoop ? 120 : 60;
  const padRight = hasRightLoop ? 120 : 60;
  const padTop = 40;
  const padBottom = 40;

  const svgWidth = Math.max(totalCols * COL_SPACING + padLeft + padRight, 600);
  const svgHeight = totalRows * ROW_SPACING + padTop + padBottom + 20;

  const computedNodes: Record<string, ComputedNode> = {};

  data.nodes.forEach((n) => {
    const w = n.width || NODE_W;
    const h = n.height || NODE_H;
    // Căn giữa mỗi cột
    const cx = padLeft + (n.col + colOffset) * COL_SPACING + COL_SPACING / 2;
    const cy = padTop + (n.row - minRow) * ROW_SPACING + h / 2;
    computedNodes[n.id] = {
      ...n,
      x: cx - w / 2,
      y: cy - h / 2,
      w,
      h,
    };
  });

  // Helper tính cổng kết nối (Port)
  function getPortCoord(node: ComputedNode, port?: 'top' | 'bottom' | 'left' | 'right') {
    const cx = node.x + node.w / 2;
    const cy = node.y + node.h / 2;
    switch (port) {
      case 'top':
        return { x: cx, y: node.y };
      case 'bottom':
        return { x: cx, y: node.y + node.h };
      case 'left':
        return { x: node.x, y: cy };
      case 'right':
        return { x: node.x + node.w, y: cy };
      default:
        return { x: cx, y: node.y + node.h };
    }
  }

  // Tự động suy ra cổng kết nối nếu không chỉ định rõ
  function resolveEdgePorts(fromNode: ComputedNode, toNode: ComputedNode, edge: FlowchartEdge) {
    let fromPort = edge.fromPort;
    let toPort = edge.toPort;

    if (!fromPort || !toPort) {
      if (toNode.row > fromNode.row) {
        if (toNode.col === fromNode.col) {
          fromPort = fromPort || 'bottom';
          toPort = toPort || 'top';
        } else if (toNode.col < fromNode.col) {
          fromPort = fromPort || 'left';
          toPort = toPort || 'top';
        } else {
          fromPort = fromPort || 'right';
          toPort = toPort || 'top';
        }
      } else if (toNode.row === fromNode.row) {
        if (toNode.col > fromNode.col) {
          fromPort = fromPort || 'right';
          toPort = toPort || 'left';
        } else {
          fromPort = fromPort || 'left';
          toPort = toPort || 'right';
        }
      } else {
        // Vòng ngược lên trên (Loop)
        fromPort = fromPort || 'right';
        toPort = toPort || 'right';
      }
    }

    return { fromPort, toPort };
  }

  // Tạo đường dẫn vuông góc uốn cong (Orthogonal rounded path)
  function buildPath(p1: { x: number; y: number }, p2: { x: number; y: number }, fromPort: string, toPort: string) {
    if (fromPort === 'bottom' && toPort === 'top' && Math.abs(p1.x - p2.x) < 2) {
      // Đường thẳng dọc
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
    }

    if (fromPort === 'bottom' && toPort === 'top') {
      const midY = (p1.y + p2.y) / 2;
      return `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }

    if ((fromPort === 'right' || fromPort === 'left') && toPort === 'top') {
      return `M ${p1.x} ${p1.y} H ${p2.x} V ${p2.y}`;
    }

    if (fromPort === 'top' && (toPort === 'right' || toPort === 'left')) {
      return `M ${p1.x} ${p1.y} V ${p2.y} H ${p2.x}`;
    }

    if (fromPort === 'right' && toPort === 'left') {
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
    }

    if (fromPort === 'left' && toPort === 'right') {
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
    }

    if (fromPort === 'right' && toPort === 'right') {
      // Loop quay lại bên phải
      const maxX = Math.max(p1.x, p2.x) + 45;
      return `M ${p1.x} ${p1.y} H ${maxX} V ${p2.y} H ${p2.x}`;
    }

    if (fromPort === 'left' && toPort === 'left') {
      // Loop quay lại bên trái
      const minX = Math.min(p1.x, p2.x) - 45;
      return `M ${p1.x} ${p1.y} H ${minX} V ${p2.y} H ${p2.x}`;
    }

    // Mặc định Bezier cong mượt mà
    return `M ${p1.x} ${p1.y} C ${p1.x} ${(p1.y + p2.y) / 2}, ${p2.x} ${(p1.y + p2.y) / 2}, ${p2.x} ${p2.y}`;
  }

  const prefix = `fc-${data.id}`;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className={`w-full h-auto text-fd-foreground select-none ${className}`}
      style={{
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        maxHeight: '100%',
      }}
    >
      <defs>
        {/* Mũi tên mặc định */}
        <marker
          id={`${prefix}-arrow`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-fd-muted-foreground" />
        </marker>

        {/* Mũi tên xanh (Nhánh Có / Đồng ý) */}
        <marker
          id={`${prefix}-arrow-yes`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-emerald-600 dark:fill-emerald-400" />
        </marker>

        {/* Mũi tên đỏ / cam (Nhánh Không / Chưa đạt) */}
        <marker
          id={`${prefix}-arrow-no`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-amber-600 dark:fill-amber-400" />
        </marker>
      </defs>

      {/* RENDER EDGES (ĐƯỜNG NỐI) */}
      <g className="flowchart-edges">
        {data.edges.map((edge, idx) => {
          const fromNode = computedNodes[edge.from];
          const toNode = computedNodes[edge.to];
          if (!fromNode || !toNode) return null;

          const { fromPort, toPort } = resolveEdgePorts(fromNode, toNode, edge);
          const p1 = getPortCoord(fromNode, fromPort);
          const p2 = getPortCoord(toNode, toPort);
          const d = buildPath(p1, p2, fromPort, toPort);

          // Tính tọa độ đặt nhãn cạnh
          let labelX = (p1.x + p2.x) / 2;
          let labelY = (p1.y + p2.y) / 2;
          if ((fromPort === 'right' && toPort === 'left') || (fromPort === 'left' && toPort === 'right')) {
            labelX = (p1.x + p2.x) / 2;
            labelY = (p1.y + p2.y) / 2 - 16;
          } else if (fromPort === 'right' && toPort === 'top') {
            labelX = (p1.x + p2.x) / 2;
            labelY = p1.y - 10;
          } else if (fromPort === 'left' && toPort === 'top') {
            labelX = (p1.x + p2.x) / 2;
            labelY = p1.y - 10;
          } else if (fromPort === 'bottom' && toPort === 'top') {
            labelX = (p1.x + p2.x) / 2;
            labelY = (p1.y + p2.y) / 2;
          } else if (fromPort === 'left' && toPort === 'left') {
            const minX = Math.min(p1.x, p2.x) - 45;
            labelX = minX;
            labelY = (p1.y + p2.y) / 2;
          } else if (fromPort === 'right' && toPort === 'right') {
            const maxX = Math.max(p1.x, p2.x) + 45;
            labelX = maxX;
            labelY = (p1.y + p2.y) / 2;
          } else if (fromPort === 'top' && (toPort === 'right' || toPort === 'left')) {
            labelX = (p1.x + p2.x) / 2;
            labelY = p2.y - 12;
          }

          let strokeClass = 'stroke-fd-border';
          let markerEnd = `url(#${prefix}-arrow)`;
          let labelBgClass = 'fill-fd-muted/80 stroke-fd-border';
          let labelTextClass = 'fill-fd-foreground';

          if (edge.variant === 'yes' || edge.label?.toLowerCase().includes('có') || edge.label?.toLowerCase().includes('đã') || edge.label?.toLowerCase().includes('hợp lệ') || edge.label?.toLowerCase().includes('thành công')) {
            strokeClass = 'stroke-emerald-500/70 dark:stroke-emerald-400/70';
            markerEnd = `url(#${prefix}-arrow-yes)`;
            labelBgClass = 'fill-emerald-500/15 stroke-emerald-500/40';
            labelTextClass = 'fill-emerald-700 dark:fill-emerald-300 font-semibold';
          } else if (edge.variant === 'no' || edge.label?.toLowerCase().includes('không') || edge.label?.toLowerCase().includes('chưa') || edge.label?.toLowerCase().includes('thiếu') || edge.label?.toLowerCase().includes('lỗi')) {
            strokeClass = 'stroke-amber-500/70 dark:stroke-amber-400/70';
            markerEnd = `url(#${prefix}-arrow-no)`;
            labelBgClass = 'fill-amber-500/15 stroke-amber-500/40';
            labelTextClass = 'fill-amber-700 dark:fill-amber-300 font-semibold';
          }

          const labelW = edge.label ? Math.max(edge.label.length * 8 + 18, 64) : 0;
          const labelH = 22;

          return (
            <g key={`edge-${idx}`}>
              <path
                d={d}
                fill="none"
                className={strokeClass}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                markerEnd={markerEnd}
              />
              {edge.label && (
                <g transform={`translate(${labelX}, ${labelY})`}>
                  {/* Lớp nền đục 100% che hoàn toàn đường vẽ bên dưới, chống chồng chéo chữ */}
                  <rect
                    x={-labelW / 2}
                    y={-labelH / 2}
                    width={labelW}
                    height={labelH}
                    rx="6"
                    className="fill-fd-background"
                  />
                  {/* Lớp màu badge */}
                  <rect
                    x={-labelW / 2}
                    y={-labelH / 2}
                    width={labelW}
                    height={labelH}
                    rx="6"
                    className={labelBgClass}
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    className={`text-[10.5px] select-none ${labelTextClass}`}
                  >
                    {edge.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </g>

      {/* RENDER NODES (CÁC KHỐI QUY TRÌNH) */}
      <g className="flowchart-nodes">
        {data.nodes.map((node) => {
          const n = computedNodes[node.id];
          if (!n) return null;

          const isStartOrEnd = node.type === 'start' || node.type === 'end';
          const isDecision = node.type === 'decision';
          const isReference = node.type === 'reference';

          // Màu sắc và viền theo loại
          let rectBg = 'fill-fd-card stroke-fd-border';
          let titleColor = 'fill-fd-foreground font-semibold';

          if (node.type === 'start') {
            rectBg = 'fill-blue-500/10 stroke-blue-500/40 dark:fill-blue-500/15 dark:stroke-blue-400/50';
            titleColor = 'fill-blue-800 dark:fill-blue-200 font-bold';
          } else if (node.type === 'end') {
            rectBg = 'fill-emerald-500/10 stroke-emerald-500/40 dark:fill-emerald-500/15 dark:stroke-emerald-400/50';
            titleColor = 'fill-emerald-800 dark:fill-emerald-200 font-bold';
          } else if (isDecision) {
            rectBg = 'fill-amber-500/10 stroke-amber-500/40 dark:fill-amber-500/15 dark:stroke-amber-400/50';
            titleColor = 'fill-amber-900 dark:fill-amber-200 font-bold';
          } else if (isReference) {
            rectBg = 'fill-purple-500/10 stroke-purple-500/40 dark:fill-purple-500/15 dark:stroke-purple-400/50';
            titleColor = 'fill-purple-900 dark:fill-purple-200 font-semibold';
          }

          // Chia dòng văn bản thông minh (tối đa 2 dòng)
          const words = node.label.split(' ');
          let line1 = node.label;
          let line2 = '';
          if (node.label.length > 22 && words.length > 2) {
            const mid = Math.ceil(words.length / 2);
            line1 = words.slice(0, mid).join(' ');
            line2 = words.slice(mid).join(' ');
          }

          const hasTwoLines = Boolean(line2);

          return (
            <g key={node.id} transform={`translate(${n.x}, ${n.y})`} className="transition-transform duration-150">
              {/* Khối nền */}
              <rect
                width={n.w}
                height={n.h}
                rx={isStartOrEnd ? n.h / 2 : 10}
                className={`${rectBg} transition-all duration-200 shadow-sm`}
                strokeWidth={isDecision || isStartOrEnd ? '1.6' : '1.2'}
              />

              {/* Viền phụ đối với Reference node */}
              {isReference && (
                <rect
                  x="3"
                  y="3"
                  width={n.w - 6}
                  height={n.h - 6}
                  rx="7"
                  fill="none"
                  className="stroke-purple-500/30 dark:stroke-purple-400/30"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              )}

              {/* Huy hiệu Quyết định (Decision badge) */}
              {isDecision && (
                <g transform="translate(10, 8)">
                  <polygon
                    points="6,0 12,6 6,12 0,6"
                    className="fill-amber-500 dark:fill-amber-400"
                  />
                </g>
              )}

              {/* Văn bản nhãn của Node */}
              <text
                x={isDecision ? n.w / 2 + 6 : n.w / 2}
                y={
                  hasTwoLines
                    ? n.h / 2 - 3
                    : n.h / 2 + 4
                }
                textAnchor="middle"
                className={`text-[12px] ${titleColor}`}
              >
                {line1}
              </text>

              {hasTwoLines && (
                <text
                  x={isDecision ? n.w / 2 + 6 : n.w / 2}
                  y={n.h / 2 + 13}
                  textAnchor="middle"
                  className={`text-[11px] ${titleColor} opacity-90`}
                >
                  {line2}
                </text>
              )}

              {/* Sub-label nếu có */}
              {node.subLabel && (
                <text
                  x={n.w / 2}
                  y={n.h - 8}
                  textAnchor="middle"
                  className="text-[9.5px] fill-fd-muted-foreground"
                >
                  {node.subLabel}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
