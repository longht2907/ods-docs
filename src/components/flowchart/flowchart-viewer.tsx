'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  GitFork,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Move,
} from 'lucide-react';
import { FlowchartCanvas } from './flowchart-canvas';
import type { FlowchartData } from './types';

interface FlowchartViewerProps {
  data: FlowchartData;
}

export function FlowchartViewer({ data }: FlowchartViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    setPan({ x: 0, y: 0 });
    setTimeout(() => {
      triggerButtonRef.current?.focus();
    }, 50);
  }, []);

  // Xử lý phím Escape để đóng Dialog
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
      closeButtonRef.current?.focus();
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  // Xử lý Pan kéo thả chuột
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card/40 shadow-xs backdrop-blur-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-fd-primary/10 text-fd-primary">
            <GitFork className="size-3.5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-fd-foreground">
            {data.title}
          </span>
        </div>

        <button
          ref={triggerButtonRef}
          type="button"
          onClick={handleOpen}
          aria-label="Mở rộng lưu đồ toàn màn hình"
          className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-background/80 px-2.5 py-1 text-xs font-medium text-fd-muted-foreground shadow-xs transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-2 focus-visible:outline-fd-primary"
        >
          <Maximize2 className="size-3.5" />
          <span className="hidden sm:inline">Mở rộng lưu đồ</span>
        </button>
      </div>

      {/* Inline Canvas Area */}
      <div className="overflow-x-auto p-4 sm:p-6">
        <div className="min-w-[500px]">
          <FlowchartCanvas data={data} />
        </div>
      </div>

      {/* Caption nếu có */}
      {data.caption && (
        <div className="border-t border-fd-border/50 bg-fd-muted/10 px-4 py-2 text-center text-[11px] text-fd-muted-foreground">
          {data.caption}
        </div>
      )}

      {/* Fullscreen Dialog Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={data.title}
          className="fixed inset-0 z-50 flex flex-col bg-fd-background/95 backdrop-blur-md animate-in fade-in duration-150"
        >
          {/* Modal Toolbar */}
          <div className="flex items-center justify-between border-b border-fd-border bg-fd-card/80 px-4 py-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-md bg-fd-primary/10 text-fd-primary">
                <GitFork className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-fd-foreground leading-none">
                  {data.title}
                </h3>
                <p className="mt-1 text-xs text-fd-muted-foreground">
                  Dùng chuột kéo (Pan) hoặc nút thu phóng để xem chi tiết các nhánh
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(s + 0.2, 2.5))}
                title="Phóng to"
                className="flex size-8 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
              >
                <ZoomIn className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(s - 0.2, 0.4))}
                title="Thu nhỏ"
                className="flex size-8 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
              >
                <ZoomOut className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setScale(1);
                  setPan({ x: 0, y: 0 });
                }}
                title="Đặt lại vị trí ban đầu"
                className="flex size-8 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
              >
                <RotateCcw className="size-4" />
              </button>
              <div className="hidden sm:inline-block px-2 text-xs font-mono text-fd-muted-foreground">
                {Math.round(scale * 100)}%
              </div>

              <div className="mx-1 h-5 w-px bg-fd-border" />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                title="Đóng (Escape)"
                className="flex size-8 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-foreground hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Modal Pan/Zoom Container */}
          <div
            className={`flex-1 overflow-hidden select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-75"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                transformOrigin: 'center center',
              }}
            >
              <div className="w-[85vw] max-w-[1200px] p-6">
                <FlowchartCanvas data={data} />
              </div>
            </div>
          </div>

          {/* Footer Guide */}
          <div className="flex items-center justify-between border-t border-fd-border bg-fd-muted/20 px-4 py-2 text-[11px] text-fd-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Move className="size-3.5" />
              Kéo chuột để di chuyển • Phím Esc để đóng
            </span>
            <span>Support Wiki ODS Flowchart System</span>
          </div>
        </div>
      )}
    </div>
  );
}
