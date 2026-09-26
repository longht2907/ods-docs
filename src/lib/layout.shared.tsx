import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Cloud,
  Headphones,
  Layers3,
  Library,
  Newspaper,
  PhoneCall,
  Server,
  ShieldCheck,
} from 'lucide-react';
import { docsProducts, odsExternalLinks, type DocsProductIcon } from './docs-products';
import { gitConfig } from './shared';

const productIcons: Record<DocsProductIcon, LucideIcon> = {
  phone: PhoneCall,
  cloud: Cloud,
  server: Server,
  shield: ShieldCheck,
};

function getProductIcon(icon: DocsProductIcon) {
  const ProductIcon = productIcons[icon];
  return <ProductIcon />;
}

function publicLinks(): NonNullable<BaseLayoutProps['links']> {
  return [
    {
      type: 'menu',
      text: 'Tài liệu',
      icon: <BookOpen />,
      items: [
        {
          text: 'Tất cả tài liệu',
          description: 'Duyệt không gian tài liệu và hướng dẫn theo từng sản phẩm.',
          url: '/docs',
          icon: <Library />,
          active: 'nested-url',
        },
        ...docsProducts.map((product) => ({
          text: product.name,
          description: product.description,
          url: product.href,
          icon: getProductIcon(product.icon),
          active: 'nested-url' as const,
        })),
      ],
    },
    {
      text: 'Giải pháp ODS',
      url: odsExternalLinks.website,
      icon: <Layers3 />,
      external: true,
    },
    {
      text: 'Kiến thức',
      url: odsExternalLinks.blog,
      icon: <Newspaper />,
      external: true,
    },
    {
      type: 'button',
      text: 'Hỗ trợ',
      url: odsExternalLinks.support,
      external: true,
      secondary: true,
      icon: <Headphones />,
    },
  ];
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: true,
      title: 'ODS Docs',
      url: '/',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}

export function docsOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: true,
      title: 'ODS Docs',
      url: '/',
    },
    links: publicLinks(),
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}

export function homeOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: true,
      title: 'ODS Docs',
      url: '/',
      transparentMode: 'top',
    },
    links: publicLinks(),
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
