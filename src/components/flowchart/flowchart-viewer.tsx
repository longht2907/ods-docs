'use client';

import { Dialog } from '@base-ui/react/dialog';
import { useEffect, useRef, useState } from 'react';
import { Expand, Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react';
import { FlowchartCanvas } from './flowchart-canvas';
import { flowchartSize, COL_SPACING } from './layout';
import type { FlowchartData } from './types';

const control = 'inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-foreground hover:bg-fd-accent focus-visible:outline-2 focus-visible:outline-fd-primary';

export function FlowchartViewer({ data }: { data: FlowchartData }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState<number>();
  const viewport = useRef<HTMLDivElement>(null);
  const inlineViewport = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; left: number; top: number } | null>(null);
  const size = flowchartSize(data);
  const firstNode = data.nodes.find((node) => node.type === 'start') || data.nodes[0];
  const entryX = size.padLeft + (firstNode.col + Math.abs(size.minCol)) * COL_SPACING + COL_SPACING / 2;
  useEffect(() => {
    setReady(true);
    const box = inlineViewport.current;
    if (box) box.scrollLeft = Math.max(0, entryX - box.clientWidth / 2);
  }, [entryX]);
  useEffect(() => {
    if (!open) return;
    // Base UI reserves a stable root scrollbar gutter while locked. Use the actual
    // visual viewport width so the portal covers that gutter too; no global CSS override.
    const resize = () => setViewportWidth(window.innerWidth);
    resize();
    window.addEventListener('resize', resize);
    const frame = requestAnimationFrame(() => {
      const box = viewport.current;
      if (box) box.scrollLeft = Math.max(0, entryX - box.clientWidth / 2);
    });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [open, entryX]);

  function reset() {
    setScale(1);
    requestAnimationFrame(() => {
      const box = viewport.current;
      if (box) box.scrollTo(Math.max(0, entryX - box.clientWidth / 2), 0);
    });
  }

  function fit() {
    const box = viewport.current;
    if (!box) return;
    setScale(Math.min(1, (box.clientWidth - 32) / size.width, (box.clientHeight - 32) / size.height));
    box.scrollTo(0, 0);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(value) => { setOpen(value); if (value) reset(); }}>
      <section data-flowchart={data.id} className="not-prose my-6 min-w-0 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
        <div className="flex items-center justify-between gap-3 border-b border-fd-border px-4 py-3">
          <p className="min-w-0 text-sm font-semibold text-fd-foreground">{data.title}</p>
          <Dialog.Trigger data-flowchart-ready={ready ? 'true' : 'false'} className={control} aria-label="Mở rộng lưu đồ toàn màn hình">
            <Maximize2 aria-hidden="true" className="size-4" />
          </Dialog.Trigger>
        </div>
        <div ref={inlineViewport} tabIndex={0} role="region" aria-label="Lưu đồ cuộn ngang" className="overflow-x-auto p-4 focus-visible:outline-2 focus-visible:outline-fd-primary">
          <div style={{ width: size.width }}><FlowchartCanvas data={data} /></div>
        </div>
        <p className="border-t border-fd-border px-4 py-3 text-sm text-fd-muted-foreground">
          {data.caption} Cuộn ngang để đọc; mở rộng để thu phóng. Chi tiết và các nhánh xem bên dưới.
        </p>
      </section>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/50" />
        <Dialog.Popup data-flowchart-dialog={data.id} initialFocus={closeButton}
          style={{ width: viewportWidth ?? '100vw', maxWidth: 'none' }}
          className="fixed inset-0 z-[101] flex h-dvh min-w-0 flex-col bg-fd-background text-fd-foreground outline-none">
          <header className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-fd-border p-3 sm:p-4">
            <div className="min-w-0 flex-1 basis-48">
              <Dialog.Title className="text-sm font-semibold">{data.title}</Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-fd-muted-foreground">Kéo hoặc cuộn để di chuyển. Nút thu phóng để đọc nhánh; Esc để đóng.</Dialog.Description>
            </div>
            <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Điều khiển lưu đồ">
              <button type="button" className={control} aria-label="Thu nhỏ" onClick={() => setScale((value) => Math.max(0.1, value - 0.2))}><Minus aria-hidden="true" className="size-4" /></button>
              <output aria-live="polite" aria-label="Mức thu phóng" className="w-12 text-center text-xs tabular-nums">{Math.round(scale * 100)}%</output>
              <button type="button" className={control} aria-label="Phóng to" onClick={() => setScale((value) => Math.min(3, value + 0.2))}><Plus aria-hidden="true" className="size-4" /></button>
              <button type="button" className={control} aria-label="Vừa khung" onClick={fit}><Expand aria-hidden="true" className="size-4" /></button>
              <button type="button" className={control} aria-label="Đặt lại 100%" onClick={reset}><RotateCcw aria-hidden="true" className="size-4" /></button>
              <Dialog.Close ref={closeButton} className={control} aria-label="Đóng lưu đồ"><X aria-hidden="true" className="size-4" /></Dialog.Close>
            </div>
          </header>
          <div ref={viewport} data-flowchart-viewport tabIndex={0} role="region" aria-label="Vùng xem lưu đồ"
            className="min-h-0 flex-1 touch-pan-x touch-pan-y overflow-auto overscroll-contain p-4 focus-visible:outline-2 focus-visible:outline-fd-primary"
            onPointerDown={(event) => {
              // Touch uses native two-axis scrolling; mouse/pen can drag without fighting links.
              if (event.pointerType === 'touch' || event.button !== 0 || (event.target as Element).closest('a[href]')) return;
              const box = event.currentTarget;
              drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: box.scrollLeft, top: box.scrollTop };
              box.setPointerCapture(event.pointerId);
              event.preventDefault();
            }}
            onPointerMove={(event) => {
              const start = drag.current;
              if (!start || start.id !== event.pointerId) return;
              event.currentTarget.scrollLeft = start.left - event.clientX + start.x;
              event.currentTarget.scrollTop = start.top - event.clientY + start.y;
            }}
            onPointerUp={() => { drag.current = null; }}
            onPointerCancel={() => { drag.current = null; }}
            onLostPointerCapture={() => { drag.current = null; }}
            onClick={(event) => { if ((event.target as Element).closest('a[href]')) setOpen(false); }}>
            <div className="mx-auto" style={{ width: size.width * scale, height: size.height * scale }}>
              <div style={{ width: size.width, height: size.height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <FlowchartCanvas data={data} />
              </div>
            </div>
          </div>
          <footer className="shrink-0 border-t border-fd-border px-4 py-2 text-xs text-fd-muted-foreground">100% ưu tiên chữ dễ đọc; “Vừa khung” để xem toàn cảnh. Dùng phím mũi tên khi vùng xem được focus.</footer>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
