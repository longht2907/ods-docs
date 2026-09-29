import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import {
  Braces,
  Library,
} from 'lucide-react';
import { DocsMegaMenu } from '@/components/navigation/docs-mega-menu';

const brandNavTitle = (
  <div className="flex items-center gap-2.5">
    <Image
      src="/ods-logo.png"
      alt="ODS"
      width={78}
      height={26}
      className="h-5.5 w-auto object-contain dark:brightness-125"
      priority
    />
    <span className="hidden sm:inline-block text-sm font-semibold tracking-tight text-fd-foreground">
      Platform Documentation
    </span>
  </div>
);

function publicLinks(): NonNullable<BaseLayoutProps['links']> {
  return [
    {
      type: 'custom',
      children: <DocsMegaMenu />,
    },
    {
      text: 'API Reference',
      url: '/docs/ai-contact-center/api',
      icon: <Braces className="size-3.5 text-orange-500" />,
      active: 'nested-url',
    },
    {
      text: 'Tất cả tài liệu',
      url: '/docs',
      icon: <Library className="size-3.5" />,
      active: 'nested-url',
    },
  ];
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: true,
      title: brandNavTitle,
      url: '/',
    },
  };
}

export function docsOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: true,
      title: brandNavTitle,
      url: '/',
    },
    links: publicLinks(),
  };
}

export function homeOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: true,
      title: brandNavTitle,
      url: '/',
      transparentMode: 'top',
    },
    links: publicLinks(),
  };
}
