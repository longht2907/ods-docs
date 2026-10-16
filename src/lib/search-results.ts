import type { SortedResult } from 'fumadocs-core/search';

export const SEARCH_PAGE_LIMIT = 8;
export const SEARCH_SNIPPET_LIMIT = 3;
export const SEARCH_ENGINE_RESULT_LIMIT = SEARCH_PAGE_LIMIT * (SEARCH_SNIPPET_LIMIT + 1);
export const SEARCH_PRODUCT_TAGS = ['ai-contact-center', 'cloudfile'] as const;

export type SearchProductTag = (typeof SEARCH_PRODUCT_TAGS)[number];

export function parseSearchProductTag(value: string | null): SearchProductTag | undefined {
  return SEARCH_PRODUCT_TAGS.find((tag) => tag === value);
}

export function getSearchProductTag(pathname: string): SearchProductTag | undefined {
  return SEARCH_PRODUCT_TAGS.find(
    (tag) => pathname === `/docs/${tag}` || pathname.startsWith(`/docs/${tag}/`),
  );
}

export function limitSearchResults(
  results: SortedResult[],
  pageLimit = SEARCH_PAGE_LIMIT,
  snippetLimit = SEARCH_SNIPPET_LIMIT,
): SortedResult[] {
  const limited: SortedResult[] = [];
  let pages = 0;
  let snippets = 0;

  for (const item of results) {
    if (item.type === 'page') {
      if (pages >= pageLimit) break;
      pages += 1;
      snippets = 0;
      limited.push(item);
      continue;
    }

    if (pages === 0 || snippets >= snippetLimit) continue;
    snippets += 1;
    limited.push(item);
  }

  return limited;
}
