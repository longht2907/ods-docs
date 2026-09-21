'use client';

import { useEffect, useState, type ComponentProps, type CSSProperties } from 'react';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';

type DocsContainerStyle = CSSProperties & {
  '--fd-docs-row-1'?: string;
  '--fd-docs-row-2'?: string;
  '--fd-docs-row-3'?: string;
  '--fd-sidebar-col'?: string;
};

export function DocsContainer({
  className,
  style,
  ...props
}: ComponentProps<'div'>) {
  const { slots } = useDocsLayout();
  const { collapsed } = slots.sidebar?.useSidebar?.() ?? {};
  const [previousCollapsed, setPreviousCollapsed] = useState(collapsed);
  const columnChanged = previousCollapsed !== collapsed;

  useEffect(() => {
    if (columnChanged) setPreviousCollapsed(collapsed);
  }, [collapsed, columnChanged]);

  const containerStyle: DocsContainerStyle = {
    gridTemplate: `"header header header header header"
"sidebar sidebar toc-popover toc toc"
"sidebar sidebar main toc toc" 1fr / minmax(min-content, 1fr) var(--fd-sidebar-col) minmax(0, calc(var(--fd-layout-width,97rem) - var(--fd-sidebar-width) - var(--fd-toc-width))) var(--fd-toc-width) minmax(min-content, 1fr)`,
    '--fd-docs-row-1': 'var(--fd-header-height)',
    '--fd-docs-row-2': 'var(--fd-header-height)',
    '--fd-docs-row-3':
      'calc(var(--fd-header-height) + var(--fd-toc-popover-height))',
    '--fd-sidebar-col': collapsed ? '0px' : 'var(--fd-sidebar-width)',
    ...style,
  };

  return (
    <div
      id="nd-docs-layout"
      data-sidebar-collapsed={collapsed}
      data-column-changed={columnChanged}
      {...props}
      style={containerStyle}
      className={`ods-docs-layout grid min-h-dvh overflow-x-clip [--fd-docs-height:100dvh] [--fd-header-height:3.5rem] [--fd-sidebar-width:0px] [--fd-toc-popover-height:0px] [--fd-toc-width:0px] data-[column-changed=true]:transition-[grid-template-columns] ${className ?? ''}`}
    />
  );
}
