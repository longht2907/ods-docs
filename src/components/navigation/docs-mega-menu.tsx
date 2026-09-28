'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Braces,
  ChevronDown,
  Cloud,
  FileText,
  Library,
  Mail,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { docsProducts } from '@/lib/docs-products';

export function DocsMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring ${
          isOpen
            ? 'bg-fd-accent text-fd-foreground shadow-sm'
            : 'text-fd-muted-foreground hover:bg-fd-accent/60 hover:text-fd-foreground'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <BookOpen className="size-3.5 text-orange-500" aria-hidden="true" />
        <span>Tài liệu Sản phẩm</span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Floating Panel: Tinh gọn, trực quan, chuyên biệt cho Tài liệu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[580px] origin-top-left rounded-2xl border border-fd-border/80 bg-fd-popover/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-fd-border/60 pb-3">
            <div>
              <p className="text-xs font-bold text-fd-foreground">
                Không gian Tài liệu Kỹ thuật
              </p>
              <p className="text-[11px] text-fd-muted-foreground">
                Chọn sản phẩm để mở hướng dẫn sử dụng và tài liệu tích hợp API
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-orange-600 dark:text-orange-400">
              <Sparkles className="size-3" />
              ODS Docs Hub
            </span>
          </div>

          {/* Grid các không gian tài liệu */}
          <div className="mt-3.5 grid grid-cols-2 gap-3">
            {docsProducts.map((product) => {
              const isAcc = product.slug === 'ai-contact-center';
              return (
                <div
                  key={product.slug}
                  className="flex flex-col justify-between rounded-xl border border-fd-border/70 bg-fd-card/60 p-3 transition-all hover:border-orange-500/40 hover:bg-fd-accent/30"
                >
                  <div>
                    {/* Header sản phẩm */}
                    <div className="flex items-center justify-between pb-2 border-b border-fd-border/40">
                      <div className="flex items-center gap-2">
                        <span
                          className={`grid size-7 place-items-center rounded-lg ${
                            isAcc
                              ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                              : 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                          }`}
                        >
                          {isAcc ? (
                            <PhoneCall className="size-3.5" />
                          ) : (
                            <Cloud className="size-3.5" />
                          )}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-fd-foreground">
                            {product.name}
                          </p>
                        </div>
                      </div>
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                        Sẵn sàng
                      </span>
                    </div>

                    {/* Entry links */}
                    <div className="mt-2.5 space-y-1.5">
                      {product.entries.map((entry) => (
                        <Link
                          key={entry.href}
                          href={entry.href}
                          onClick={() => setIsOpen(false)}
                          className="group/entry flex items-center justify-between rounded-lg border border-fd-border/50 bg-fd-background/90 px-2.5 py-1.5 text-[11px] font-medium text-fd-foreground transition-all hover:border-orange-500/40 hover:bg-orange-500/5 hover:text-orange-600 dark:hover:text-orange-400"
                        >
                          <div className="flex items-center gap-2 truncate">
                            {entry.icon === 'api' ? (
                              <Braces className="size-3 text-orange-500" />
                            ) : (
                              <FileText className="size-3 text-sky-500" />
                            )}
                            <span className="truncate">{entry.label}</span>
                          </div>
                          <ArrowRight className="size-3 opacity-0 transition-opacity group-hover/entry:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar: Quick links */}
          <div className="mt-4 flex items-center justify-between border-t border-fd-border/60 pt-3 text-[11px]">
            <Link
              href="/docs"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 font-bold text-fd-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              <Library className="size-3.5 text-orange-500" />
              <span>Duyệt tất cả tài liệu (/docs)</span>
              <ArrowRight className="size-3" />
            </Link>

            <a
              href="mailto:support@ods.vn"
              className="inline-flex items-center gap-1 text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              <Mail className="size-3" />
              <span>Hỗ trợ kỹ thuật</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
