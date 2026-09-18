import type { ReactNode } from 'react';

export function ApiReferenceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      {children}
    </div>
  );
}

export function ApiReferenceMain({ children }: { children: ReactNode }) {
  return <div className="min-w-0">{children}</div>;
}

export function ApiReferenceCode({ children }: { children: ReactNode }) {
  return (
    <aside className="min-w-0 xl:block">
      <div className="xl:sticky xl:top-[calc(var(--fd-nav-height)+1.5rem)]">
        {children}
      </div>
    </aside>
  );
}
