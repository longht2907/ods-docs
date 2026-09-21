import type * as PageTree from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';

export type DocsNavigationIcon =
  | 'library'
  | 'bot'
  | 'cloud'
  | 'book-open'
  | 'braces'
  | 'folder';

export interface DocsNavigationSection {
  title: string;
  url: string;
  matchUrls: readonly string[];
  icon: DocsNavigationIcon;
}

export interface DocsNavigationSolution {
  title: string;
  description: string;
  url: string;
  matchUrls: readonly string[];
  icon: DocsNavigationIcon;
  sections: readonly DocsNavigationSection[];
}

const fallbackSolutions: readonly DocsNavigationSolution[] = [
  {
    title: 'Trung tâm tài liệu',
    description: 'Bắt đầu và khám phá tài liệu ODS',
    url: '/docs',
    matchUrls: ['/docs'],
    icon: 'library',
    sections: [
      {
        title: 'Tổng quan',
        url: '/docs',
        matchUrls: ['/docs'],
        icon: 'library',
      },
    ],
  },
  {
    title: 'AI Contact Center',
    description: 'Tổng đài AI, hướng dẫn Portal và API',
    url: '/docs/ai-contact-center',
    matchUrls: ['/docs/ai-contact-center'],
    icon: 'bot',
    sections: [
      {
        title: 'Tổng quan',
        url: '/docs/ai-contact-center',
        matchUrls: ['/docs/ai-contact-center'],
        icon: 'bot',
      },
      {
        title: 'Hướng dẫn Portal',
        url: '/docs/ai-contact-center/huong-dan',
        matchUrls: [
          '/docs/ai-contact-center/user-guider-portal',
          '/docs/ai-contact-center/user-guide-portal',
          '/docs/ai-contact-center/huong-dan',
        ],
        icon: 'book-open',
      },
      {
        title: 'API Reference',
        url: '/docs/ai-contact-center/api',
        matchUrls: ['/docs/ai-contact-center/api'],
        icon: 'braces',
      },
    ],
  },
  {
    title: 'CloudFile',
    description: 'Lưu trữ đám mây doanh nghiệp',
    url: '/docs/cloudfile',
    matchUrls: ['/docs/cloudfile'],
    icon: 'cloud',
    sections: [
      {
        title: 'Tổng quan',
        url: '/docs/cloudfile',
        matchUrls: ['/docs/cloudfile'],
        icon: 'cloud',
      },
    ],
  },
];

function asText(value: ReactNode): string | undefined {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function findRootFolder(
  tree: PageTree.Root,
  solutionUrl: string,
): PageTree.Folder | undefined {
  const pending: PageTree.Node[] = [...tree.children];

  while (pending.length > 0) {
    const node = pending.shift();
    if (!node || node.type !== 'folder') continue;
    if (node.root && node.index?.url === solutionUrl) return node;
    pending.push(...node.children);
  }

  return undefined;
}

function enrichSections(
  solution: DocsNavigationSolution,
  root: PageTree.Folder | undefined,
): readonly DocsNavigationSection[] {
  if (!root) return solution.sections;

  return solution.sections.map((section) => {
    if (section.url === solution.url) {
      return {
        ...section,
        title: asText(root.index?.name) ?? section.title,
      };
    }

    const folder = root.children.find(
      (node): node is PageTree.Folder =>
        node.type === 'folder' &&
        section.matchUrls.some((url) => node.index?.url === url),
    );

    if (!folder?.index) return section;

    return {
      ...section,
      url: folder.index.url,
      title:
        section.icon === 'book-open'
          ? 'Hướng dẫn Portal'
          : asText(folder.name) ?? section.title,
    };
  });
}

/**
 * Project the stable product navigation onto the current Fumadocs page tree.
 * The fallback paths keep the header usable while content is being imported;
 * metadata supplies canonical URLs and labels whenever the root is visible.
 */
export function buildDocsNavigation(
  tree: PageTree.Root,
): readonly DocsNavigationSolution[] {
  return fallbackSolutions.map((solution) => {
    const root = findRootFolder(tree, solution.url);

    return {
      ...solution,
      title: asText(root?.name) ?? solution.title,
      description: asText(root?.description) ?? solution.description,
      sections: enrichSections(solution, root),
    };
  });
}

export function findBestRouteMatch<T extends { matchUrls: readonly string[] }>(
  pathname: string,
  items: readonly T[],
): T | undefined {
  return items
    .flatMap((item) => item.matchUrls.map((url) => ({ item, url })))
    .filter(
      ({ url }) => pathname === url || pathname.startsWith(`${url}/`),
    )
    .sort((left, right) => right.url.length - left.url.length)[0]?.item;
}
