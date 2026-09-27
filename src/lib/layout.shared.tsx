import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import {
  BookOpen,
  Headphones,
  Layers3,
  Newspaper,
} from 'lucide-react';
import { odsExternalLinks } from './docs-products';
import { gitConfig } from './shared';

function publicLinks(): NonNullable<BaseLayoutProps['links']> {
  return [
    {
      text: 'Tài liệu',
      url: '/docs',
      icon: <BookOpen />,
      active: 'nested-url',
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
