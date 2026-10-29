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
import type { ComponentProps, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import {
  ApiReferenceBottom,
  ApiReferenceCode,
  ApiReferenceLayout,
  ApiReferenceMain,
  ApiReferenceResponse,
} from '@/components/docs/api-reference-layout';
import { ApiEndpoint } from '@/components/docs/api-endpoint';
import { ClickToCallFlow } from '@/components/docs/click-to-call-flow';
import { ClickToCallV2Flow } from '@/components/docs/click-to-call-v2-flow';
import { ApiArchitectureOverview } from '@/components/docs/api-architecture-overview';
import { StartCampaignFlow } from '@/components/docs/start-campaign-flow';
import { CustomerFlowDiagram } from '@/components/docs/customer-flow-diagram';
import { DocsProductDirectory } from '@/components/docs/docs-product-directory';
import { ProcessFlowchart } from '@/components/flowchart';

const {
  img: defaultImageComponent,
  ...defaultMdxComponentsWithoutImage
} = defaultMdxComponents;
void defaultImageComponent;

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

function DocsImage({ alt = '', src, ...props }: ComponentProps<'img'>) {
  const zoomSrc =
    src instanceof Blob
      ? undefined
      : (src as unknown as ComponentProps<typeof ImageZoom>['src']);

  return (
    <span className="ods-docs-figure">
      <ImageZoom alt={alt} src={zoomSrc} {...props} />
      {alt ? (
        <span className="ods-docs-figure-caption" aria-hidden="true">
          {alt}
        </span>
      ) : null}
    </span>
  );
}

function ExpectedResult({ children }: { children: ReactNode }) {
  return (
    <p className="ods-expected-result">
      <span className="ods-expected-result-label">Kết quả mong đợi</span>
      <span>{children}</span>
    </p>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponentsWithoutImage,
    ...TabsComponents,
    ...StepsComponents,
    Accordion,
    Accordions,
    img: (props: ComponentProps<'img'>) => <DocsImage {...props} />,
    Callout,
    Card,
    ExpectedResult,
    ApiEndpoint,
    ApiReferenceLayout,
    ApiReferenceMain,
    ApiReferenceCode,
    ApiReferenceResponse,
    ApiReferenceBottom,
    DocsProductDirectory,
    CustomerFlowDiagram,
    ClickToCallFlow,
    ClickToCallV2Flow,
    ApiArchitectureOverview,
    StartCampaignFlow,
    ProcessFlowchart,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
