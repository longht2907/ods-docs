import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Card as FumadocsCard } from 'fumadocs-ui/components/card';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import * as StepsComponents from 'fumadocs-ui/components/steps';
import {
  Activity,
  BarChart3,
  Bot,
  Clock,
  DollarSign,
  FileText,
  GitFork,
  Layers,
  PhoneCall,
  PhoneForwarded,
  UserCheck,
  Users,
} from 'lucide-react';
import type { ComponentProps } from 'react';
import type { MDXComponents } from 'mdx/types';
import {
  ApiReferenceCode,
  ApiReferenceLayout,
  ApiReferenceMain,
} from '@/components/docs/api-reference-layout';
import { DocsProductDirectory } from '@/components/docs/docs-product-directory';

const cardIcons = {
  Activity,
  BarChart3,
  Bot,
  Clock,
  DollarSign,
  FileText,
  GitFork,
  Layers,
  PhoneCall,
  PhoneForwarded,
  UserCheck,
  Users,
};

function isCardIconName(value: string): value is keyof typeof cardIcons {
  return value in cardIcons;
}

function Card({ icon, ...props }: ComponentProps<typeof FumadocsCard>) {
  const IconComponent = typeof icon === 'string' && isCardIconName(icon) ? cardIcons[icon] : null;
  const iconNode = IconComponent ? <IconComponent className="size-4 text-fd-primary" /> : icon;

  return <FumadocsCard icon={iconNode} {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...StepsComponents,
    Card,
    ApiReferenceLayout,
    ApiReferenceMain,
    ApiReferenceCode,
    DocsProductDirectory,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
