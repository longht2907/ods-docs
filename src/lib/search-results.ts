import type { SortedResult } from 'fumadocs-core/search';

export const SEARCH_PAGE_LIMIT = 6;
export const SEARCH_SNIPPET_LIMIT = 2;
export const SEARCH_ENGINE_RESULT_LIMIT = SEARCH_PAGE_LIMIT * (SEARCH_SNIPPET_LIMIT + 1);
export const SEARCH_PRODUCT_TAGS = ['ai-contact-center', 'cloudfile'] as const;

export type SearchProductTag = (typeof SEARCH_PRODUCT_TAGS)[number];
export type SearchScope = SearchProductTag | 'all' | 'internal';

export interface SearchScopeOption {
  value: SearchScope;
  label: string;
}

export interface SearchClientOptions {
  api: '/api/search' | '/api/search/internal';
  tag?: SearchProductTag;
}

const publicScopeOptions: ReadonlyArray<SearchScopeOption> = [
  { value: 'all', label: 'Tất cả sản phẩm' },
  { value: 'ai-contact-center', label: 'AI Contact Center' },
  { value: 'cloudfile', label: 'CloudFile' },
];

const internalScopeOptions: ReadonlyArray<SearchScopeOption> = [
  { value: 'internal', label: 'Tài liệu nội bộ' },
  ...publicScopeOptions,
];

export function parseSearchProductTag(value: string | null): SearchProductTag | undefined {
  return SEARCH_PRODUCT_TAGS.find((tag) => tag === value);
}

export function getSearchProductTag(pathname: string): SearchProductTag | undefined {
  return SEARCH_PRODUCT_TAGS.find(
    (tag) => pathname === `/docs/${tag}` || pathname.startsWith(`/docs/${tag}/`),
  );
}

export function isInternalSearchPath(pathname: string): boolean {
  return pathname === '/internal' || pathname.startsWith('/internal/');
}

export function getSearchRouteScope(pathname: string): SearchScope {
  if (isInternalSearchPath(pathname)) return 'internal';
  return getSearchProductTag(pathname) ?? 'all';
}

export function getSearchScopeOptions(pathname: string): ReadonlyArray<SearchScopeOption> {
  return isInternalSearchPath(pathname) ? internalScopeOptions : publicScopeOptions;
}

export function getSearchClientOptions(scope: SearchScope): SearchClientOptions {
  if (scope === 'internal') return { api: '/api/search/internal' };
  return {
    api: '/api/search',
    tag: scope === 'all' ? undefined : scope,
  };
}

function cleanSearchContent(content: string): string {
  return content
    .replace(/\*\*([^*]+?)\s*\*\*/g, '$1')
    .replace(/__([^_]+?)\s*__/g, '$1');
}

function searchableText(content: string): string {
  return cleanSearchContent(content)
    .replace(/<\/?mark>/g, '')
    .normalize('NFC')
    .toLocaleLowerCase('vi')
    .trim();
}

function groupSearchResults(results: SortedResult[]): SortedResult[][] {
  const groups: SortedResult[][] = [];

  for (const item of results) {
    if (item.type === 'page' || groups.length === 0) groups.push([item]);
    else groups.at(-1)?.push(item);
  }

  return groups;
}

function getGroupPriority(group: SortedResult[], query: string): number {
  const page = group.find((item) => item.type === 'page');
  if (!page) return 0;

  const title = searchableText(page.content);
  const normalizedQuery = searchableText(query);
  if (!normalizedQuery) return 0;
  if (title === normalizedQuery) return 3;
  if (title.startsWith(normalizedQuery)) return 2;
  if (title.includes(normalizedQuery)) return 1;
  return 0;
}

export function prepareSearchResults(results: SortedResult[], query: string): SortedResult[] {
  const prioritized = groupSearchResults(results)
    .map((group, position) => ({ group, position, priority: getGroupPriority(group, query) }))
    .sort((left, right) => right.priority - left.priority || left.position - right.position)
    .flatMap(({ group }) => group)
    .map((item) => ({ ...item, content: cleanSearchContent(item.content) }));

  return limitSearchResults(prioritized);
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
