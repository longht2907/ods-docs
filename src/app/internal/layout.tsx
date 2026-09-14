import { internalSource } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={internalSource.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
