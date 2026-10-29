'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpen,
  Braces,
  ChevronDown,
  Cloud,
  FileText,
  Layers3,
  Library,
  LifeBuoy,
  PhoneCall,
} from 'lucide-react';
import { docsProducts, type DocsProductIcon } from '@/lib/docs-products';

const productIcons: Record<DocsProductIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Layers3,
  managed: LifeBuoy,
  license: Braces,
};

export function DocsMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }

    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div ref={menuRef} className="relative inline-block text-left" data-docs-menu>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring ${
          isOpen
            ? 'bg-fd-accent text-fd-foreground'
            : 'text-fd-muted-foreground hover:bg-fd-accent/60 hover:text-fd-foreground'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        data-docs-menu-trigger
      >
        <BookOpen className="size-3.5 text-orange-500" aria-hidden="true" />
        <span>Tài liệu sản phẩm</span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-150 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-[min(380px,calc(100vw-2rem))] pt-2">
          <div
            id={menuId}
            className="rounded-xl border border-fd-border bg-fd-popover p-2 text-fd-popover-foreground shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 motion-reduce:animate-none"
            data-docs-menu-panel
          >
            {docsProducts.map((product, index) => {
              const ProductIcon = productIcons[product.icon];
              return (
                <section
                  key={product.slug}
                  className={index === 0 ? 'px-2 py-2.5' : 'border-t border-fd-border px-2 py-2.5'}
                >
                  <h2 className="flex items-center gap-2 text-xs font-bold text-fd-foreground">
                    <ProductIcon className="size-3.5 text-fd-muted-foreground" aria-hidden="true" />
                    {product.shortName}
                  </h2>
                  <div className="mt-1.5">
                    {product.entries.map((entry) => (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        onClick={closeMenu}
                        className="group flex min-h-11 items-center gap-2 rounded-md px-2 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground focus-visible:bg-fd-accent focus-visible:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                        data-docs-menu-entry
                      >
                        {entry.icon === 'api' ? (
                          <Braces className="size-3.5 text-orange-500" aria-hidden="true" />
                        ) : (
                          <FileText className="size-3.5 text-sky-500" aria-hidden="true" />
                        )}
                        <span>{entry.label}</span>
                        <ArrowRight
                          className="ml-auto size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            <div className="border-t border-fd-border px-2 pt-2">
              <Link
                href="/docs"
                onClick={closeMenu}
                className="group flex min-h-11 items-center gap-2 rounded-md px-2 text-xs font-bold text-fd-foreground transition-colors hover:bg-fd-accent focus-visible:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                data-docs-menu-entry
              >
                <Library className="size-3.5 text-orange-500" aria-hidden="true" />
                <span>Duyệt tất cả tài liệu</span>
                <ArrowRight
                  className="ml-auto size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
