'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { docsProducts } from '@/lib/docs-products';

export function DocsThemeScope({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const product = docsProducts.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  const theme = product?.slug ?? 'docs-default';
  const accent = product?.accent;

  useEffect(() => {
    document.documentElement.setAttribute('data-doc-theme', theme);
    if (accent) document.documentElement.setAttribute('data-product-accent', accent);
    else document.documentElement.removeAttribute('data-product-accent');

    return () => {
      document.documentElement.removeAttribute('data-doc-theme');
      document.documentElement.removeAttribute('data-product-accent');
    };
  }, [accent, theme]);

  return (
    <div data-doc-theme={theme} data-product-accent={accent} className="contents">
      {children}
    </div>
  );
}
