'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

export function DocsThemeScope({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const theme = pathname.startsWith('/docs/ai-contact-center')
    ? 'ai-contact-center'
    : pathname.startsWith('/docs/cloudfile')
      ? 'cloudfile'
      : 'docs-default';

  useEffect(() => {
    document.documentElement.setAttribute('data-doc-theme', theme);
    return () => {
      document.documentElement.removeAttribute('data-doc-theme');
    };
  }, [theme]);

  return (
    <div data-doc-theme={theme} className="contents">
      {children}
    </div>
  );
}
