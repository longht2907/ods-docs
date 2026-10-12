import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card as FumadocsCard } from 'fumadocs-ui/components/card';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import * as StepsComponents from 'fumadocs-ui/components/steps';
import {
  Activity,
  BarChart3,
  Bot,
  CircleHelp,
  Clock,
  DollarSign,
  Download,
  FileText,
  GitFork,
  Headphones,
  Layers,
  ListChecks,
  MessageSquare,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Settings,
  ShieldCheck,
  Tags,
  Upload,
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
import { CustomerFlowDiagram } from '@/components/docs/customer-flow-diagram';
import { DocsProductDirectory } from '@/components/docs/docs-product-directory';

const cardIcons = {
  Activity,
  BarChart3,
  Bot,
  CircleHelp,
  Clock,
  DollarSign,
  Download,
  FileText,
  GitFork,
  Headphones,
  Layers,
  ListChecks,
  MessageSquare,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Settings,
  ShieldCheck,
  Tags,
  Upload,
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
    Accordion,
    Accordions,
    img: (props) => <ImageZoom {...(props as any)} />,
    Callout,
    Card,
    ApiReferenceLayout,
    ApiReferenceMain,
    ApiReferenceCode,
    DocsProductDirectory,
    CustomerFlowDiagram,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
