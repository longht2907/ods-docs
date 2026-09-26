import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageImageUrl, getPageMarkdownUrl, gitConfig } from '@/lib/shared';

interface DocumentationContext {
  product: string;
  audience: string;
  category: string;
}

function getDocumentationContext(slugs?: string[]): DocumentationContext | null {
  if (!slugs?.length) return null;

  if (slugs[0] === 'ai-contact-center') {
    if (slugs.includes('api')) {
      return {
        product: 'AI Contact Center',
        audience: 'Developer · Solutions Engineer',
        category: 'API Reference & Webhooks',
      };
    }

    return {
      product: 'AI Contact Center',
      audience: 'Administrator · Operator',
      category: 'Portal Operations Guide',
    };
  }

  if (slugs[0] === 'cloudfile') {
    return {
      product: 'CloudFile',
      audience: 'Enterprise Administrator · End User',
      category: 'User & Admin Guide',
    };
  }

  return null;
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const documentationContext = getDocumentationContext(params.slug);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ enabled: !page.data.full }}
      tableOfContentPopover={{ enabled: !page.data.full }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      {documentationContext && !page.data.full ? (
        <aside
          aria-label="Documentation Metadata"
          className="not-prose grid gap-3 rounded-xl border bg-fd-card/50 p-3 text-sm sm:grid-cols-3"
        >
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
              Product
            </p>
            <p className="font-medium text-fd-foreground">{documentationContext.product}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
              Target Audience
            </p>
            <p className="font-medium text-fd-foreground">{documentationContext.audience}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
              Doc Type
            </p>
            <p className="font-medium text-fd-foreground">{documentationContext.category}</p>
          </div>
        </aside>
      ) : null}
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
