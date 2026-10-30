import type { SortedResult } from 'fumadocs-core/search';

export const SEARCH_PAGE_LIMIT = 6;
export const SEARCH_SNIPPET_LIMIT = 2;
export const SEARCH_ENGINE_RESULT_LIMIT = SEARCH_PAGE_LIMIT * (SEARCH_SNIPPET_LIMIT + 1);
export const SEARCH_PRODUCT_TAGS = ['ai-contact-center', 'cloudfile'] as const;
export const INTERNAL_SEARCH_SERVICE_TAGS = [
  'ai-contact-center',
  'data-center',
  'network',
  'software-license',
] as const;
export const INTERNAL_SEARCH_CACHE_CONTROL = 'private, no-store, must-revalidate';

export type SearchProductTag = (typeof SEARCH_PRODUCT_TAGS)[number];
export type InternalSearchServiceTag = (typeof INTERNAL_SEARCH_SERVICE_TAGS)[number];
export type SearchScope = SearchProductTag | InternalSearchServiceTag | 'all' | 'internal';

export interface SearchScopeOption {
  value: SearchScope;
  label: string;
}

export interface SearchClientOptions {
  api: '/api/search' | '/api/search/internal';
  tag?: SearchProductTag | InternalSearchServiceTag;
}

export function createInternalSearchResponse(results: SortedResult[]): Response {
  return Response.json(results, {
    headers: {
      'Cache-Control': INTERNAL_SEARCH_CACHE_CONTROL,
    },
  });
}

const publicScopeOptions: ReadonlyArray<SearchScopeOption> = [
  { value: 'all', label: 'Tất cả sản phẩm' },
  { value: 'ai-contact-center', label: 'AI Contact Center' },
  { value: 'cloudfile', label: 'CloudFile' },
];

const internalScopeOptions: ReadonlyArray<SearchScopeOption> = [
  { value: 'internal', label: 'Tất cả tài liệu nội bộ' },
  { value: 'ai-contact-center', label: 'Tổng đài' },
  { value: 'data-center', label: 'Data Center' },
  { value: 'network', label: 'Network' },
  { value: 'software-license', label: 'License phần mềm' },
];

export function parseSearchProductTag(value: string | null): SearchProductTag | undefined {
  return SEARCH_PRODUCT_TAGS.find((tag) => tag === value);
}

export function parseInternalSearchServiceTag(
  value: string | null,
): InternalSearchServiceTag | undefined {
  return INTERNAL_SEARCH_SERVICE_TAGS.find((tag) => tag === value);
}

export function getSearchProductTag(pathname: string): SearchProductTag | undefined {
  return SEARCH_PRODUCT_TAGS.find(
    (tag) => pathname === `/docs/${tag}` || pathname.startsWith(`/docs/${tag}/`),
  );
}

export function getInternalSearchServiceTag(
  pathname: string,
): InternalSearchServiceTag | undefined {
  return INTERNAL_SEARCH_SERVICE_TAGS.find(
    (tag) => pathname === `/internal/${tag}` || pathname.startsWith(`/internal/${tag}/`),
  );
}

export function isInternalSearchPath(pathname: string): boolean {
  return pathname === '/internal' || pathname.startsWith('/internal/');
}

export function getSearchRouteScope(pathname: string): SearchScope {
  if (isInternalSearchPath(pathname)) return getInternalSearchServiceTag(pathname) ?? 'internal';
  return getSearchProductTag(pathname) ?? 'all';
}

export function getSearchScopeOptions(pathname: string): ReadonlyArray<SearchScopeOption> {
  return isInternalSearchPath(pathname) ? internalScopeOptions : publicScopeOptions;
}

export function getSearchClientOptions(scope: SearchScope, pathname: string): SearchClientOptions {
  if (isInternalSearchPath(pathname)) {
    return {
      api: '/api/search/internal',
      tag: scope === 'internal' ? undefined : parseInternalSearchServiceTag(scope),
    };
  }

  return {
    api: '/api/search',
    tag: scope === 'all' || scope === 'internal' ? undefined : parseSearchProductTag(scope),
  };
}

function cleanSearchContent(content: string): string {
  return content
    .replace(/\*\*([^*]+?)\s*\*\*/g, '$1')
    .replace(/__([^_]+?)\s*__/g, '$1')
    .replace(/`([^`\n]+)`/g, '$1');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMissingQuery(content: string, query: string): string {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return content;

  const queryPattern = new RegExp(escapeRegExp(normalizedQuery), 'giu');
  return content
    .split(/(<mark>[\s\S]*?<\/mark>)/giu)
    .map((segment) => segment.startsWith('<mark>')
      ? segment
      : segment.replace(queryPattern, '<mark>$&</mark>'))
    .join('');
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
    .map((item) => ({
      ...item,
      content: highlightMissingQuery(cleanSearchContent(item.content), query),
    }));

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
