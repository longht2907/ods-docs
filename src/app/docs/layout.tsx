import { DocsThemeScope } from '@/components/docs-theme-scope';
import {
  docsProducts,
  type DocsProductIcon,
} from '@/lib/docs-products';
import { docsOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import type { LucideIcon } from 'lucide-react';
import {
  Cloud,
  KeyRound,
  PhoneCall,
  Server,
  Wrench,
} from 'lucide-react';

const productIcons: Record<DocsProductIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  managed: Wrench,
  license: KeyRound,
};

function transformTab(tab: LayoutTab): LayoutTab {
  for (const product of docsProducts) {
    if (tab.url === product.href) {
      const ProductIcon = productIcons[product.icon];
      return {
        ...tab,
        title: product.name,
        description: product.description,
        icon: <ProductIcon className="size-4 text-fd-primary" />,
      };
    }

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
        tabs={{ transform: transformTab }}
        sidebar={{ defaultOpenLevel: 0 }}
      >
        {children}
      </DocsLayout>
    </DocsThemeScope>
  );
}
