import type { ReactNode } from 'react';

export function ApiReferenceLayout({ children }: { children: ReactNode }) {
  return <div className="ods-api-grid">{children}</div>;
}

export function ApiReferenceMain({ children }: { children: ReactNode }) {
  return (
    <div className="ods-api-grid-main min-w-0 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto">
      {children}
    </div>
  );
}

export function ApiReferenceCode({ children }: { children: ReactNode }) {
  return (
    <aside className="ods-api-grid-code min-w-0">
      <div className="xl:sticky xl:top-[calc(var(--fd-nav-height)+1.5rem)] xl:max-h-[calc(100vh-var(--fd-nav-height)-3rem)] xl:overflow-y-auto space-y-6 pr-1">
        {children}
      </div>
    </aside>
  );
}

export function ApiReferenceResponse({ children }: { children: ReactNode }) {
  return (
    <div className="ods-api-grid-response min-w-0 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto">
      {children}
    </div>
  );
}

export const ApiReferenceBottom = ApiReferenceResponse;
