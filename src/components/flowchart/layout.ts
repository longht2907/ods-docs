import type { FlowchartData } from './types';

export const NODE_WIDTH = 240;
export const NODE_HEIGHT = 82;
export const COL_SPACING = 320;
export const ROW_SPACING = 148;

export function flowchartSize(data: FlowchartData) {
  const ids = new Set<string>();
  for (const node of data.nodes) {
    if (ids.has(node.id)) throw new Error(`Duplicate flowchart node: ${data.id}/${node.id}`);
    if (!Number.isFinite(node.row) || !Number.isFinite(node.col)) throw new Error(`Invalid flowchart position: ${node.id}`);
    ids.add(node.id);
  }
  if (!ids.size) throw new Error(`Empty flowchart: ${data.id}`);
  for (const edge of data.edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) throw new Error(`Missing flowchart endpoint: ${data.id}/${edge.from}/${edge.to}`);
  }
  const minCol = Math.min(...data.nodes.map((node) => node.col), 0);
  const maxCol = Math.max(...data.nodes.map((node) => node.col), 0);
  const minRow = Math.min(...data.nodes.map((node) => node.row), 1);
  const maxRow = Math.max(...data.nodes.map((node) => node.row), 1);
  // Reserve edge-label space even for inferred loop ports, not only explicit ones.
  const padLeft = 160;
  const padRight = 160;
  return {
    minCol, minRow, padLeft,
    width: Math.max((maxCol - minCol + 1) * COL_SPACING + padLeft + padRight, 640),
    height: (maxRow - minRow + 1) * ROW_SPACING + 100,
  };
}

export function wrapLabel(text: string, maxCharacters = 27) {
  const lines: string[] = [];
  for (const word of text.split(/\s+/)) {
    if (!lines.length || `${lines.at(-1)} ${word}`.length > maxCharacters) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  return lines;
}
