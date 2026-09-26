import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';
import { DocsThemeScope } from '@/components/docs-theme-scope';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import { Bot, Cloud } from 'lucide-react';

function transformTab(tab: LayoutTab): LayoutTab {
  if (tab.url.startsWith('/docs/ai-contact-center')) {
    return {
      ...tab,
      title: 'AI Contact Center',
      description: 'Cloud PBX, smart IVR & voice automation',
      icon: <Bot className="size-4 text-orange-500" />,
    };
  }
  if (tab.url.startsWith('/docs/cloudfile')) {
    return {
      ...tab,
      title: 'CloudFile',
      description: 'Enterprise drive, sync & department RBAC',
      icon: <Cloud className="size-4 text-sky-500" />,
    };
  }
  return tab;
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsThemeScope>
      <DocsLayout
        tree={source.getPageTree()}
        {...docsOptions()}
        tabMode="auto"
        tabs={{
          transform: transformTab,
        }}
        sidebar={{
          defaultOpenLevel: 0,
        }}
      >
        {children}
      </DocsLayout>
    </DocsThemeScope>
  );
}
