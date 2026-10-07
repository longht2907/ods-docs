import { getMDXComponents } from '@/components/mdx';
import { internalSource } from '@/lib/source';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  AnnouncementArchive,
  LatestAnnouncements,
} from '../_components/announcement-list';
import { getAnnouncements } from '../_lib/announcements';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = internalSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const isHome = !params.slug?.length;
  const isAnnouncementArchive =
    params.slug?.length === 1 && params.slug[0] === 'announcements';
  const announcements =
    isHome || isAnnouncementArchive ? getAnnouncements() : [];

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ enabled: !page.data.full, style: 'clerk' }}
      tableOfContentPopover={{ enabled: !page.data.full, style: 'clerk' }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        {isHome && <LatestAnnouncements announcements={announcements} />}
        {isAnnouncementArchive && (
          <AnnouncementArchive announcements={announcements} />
        )}
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(internalSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return internalSource.generateParams();
}

export async function generateMetadata(
  props: PageProps,
): Promise<Metadata> {
  const params = await props.params;
  const page = internalSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}
