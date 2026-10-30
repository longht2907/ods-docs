'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import type { SortedResult } from 'fumadocs-core/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  type SearchItemType,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import {
  getSearchClientOptions,
  getSearchRouteScope,
  getSearchScopeOptions,
  isInternalSearchPath,
  parseInternalSearchServiceTag,
  parseSearchProductTag,
  type SearchScope,
} from '@/lib/search-results';
import {
  clearInternalSearchCache,
  createAbortableSearchClient,
  createSearchRequestCoordinator,
} from '@/lib/search-client';

function compactBreadcrumbs(breadcrumbs: ReactNode[] | undefined): ReactNode[] | undefined {
  if (!breadcrumbs || breadcrumbs.length === 0) return undefined;
  if (breadcrumbs.length <= 2) return breadcrumbs;

  const product = breadcrumbs[1];
  const nearest = breadcrumbs.at(-1);
  return product === nearest ? [product] : [product, nearest];
}

function plainText(value: ReactNode): string {
  return typeof value === 'string' ? value.replace(/<[^>]+>/g, '') : '';
}

export default function OdsSearchDialog(props: SharedProps) {
  const pathname = usePathname();
  const routeScope = getSearchRouteScope(pathname);
  const scopeOptions = getSearchScopeOptions(pathname);
  const [scope, setScope] = useState<SearchScope>(routeScope);
  const cache = useRef(new Map<string, SortedResult[]>()).current;
  const coordinator = useMemo(createSearchRequestCoordinator, []);
  const client = useMemo(
    () => createAbortableSearchClient({
      ...getSearchClientOptions(scope, pathname),
      cache,
      coordinator,
    }),
    [cache, coordinator, pathname, scope],
  );
  const { search, setSearch, query } = useDocsSearch({ client, delayMs: 100 });

  useEffect(() => {
    coordinator.abort();
    setScope(routeScope);
    setSearch('');
    if (!isInternalSearchPath(pathname)) clearInternalSearchCache(cache);
  }, [cache, coordinator, pathname, routeScope, setSearch]);

  useEffect(() => {
    if (!props.open) {
      coordinator.abort();
      if (search) setSearch('');
    }
  }, [coordinator, props.open, search, setSearch]);

  useEffect(() => () => coordinator.abort(), [coordinator]);

  const items = query.isLoading || query.error
    ? []
    : query.data === 'empty' || query.data === undefined
      ? null
      : query.data;
  const pageCount = items?.filter((item) => item.type === 'page').length ?? 0;

  const Empty = () => (
    <div className="ods-search-state" role="status" aria-live="polite">
      {query.isLoading
        ? 'Đang tìm kiếm…'
        : query.error
          ? 'Không thể tải kết quả. Vui lòng thử lại.'
          : 'Không tìm thấy kết quả phù hợp.'}
    </div>
  );

  const Item = ({ item, onClick }: { item: SearchItemType; onClick: () => void }) => {
    if (item.type === 'action') {
      return <SearchDialogListItem item={item} onClick={onClick} />;
    }

    const fullBreadcrumb = item.breadcrumbs?.map(plainText).filter(Boolean).join(' › ');
    const accessibleContent = plainText(item.content);

    return (
      <SearchDialogListItem
        item={{ ...item, breadcrumbs: compactBreadcrumbs(item.breadcrumbs) }}
        onClick={onClick}
        data-result-type={item.type}
        className="ods-search-result"
        title={fullBreadcrumb || accessibleContent}
        aria-label={[fullBreadcrumb, accessibleContent].filter(Boolean).join(': ')}
      />
    );
  };

  return (
    <SearchDialog
      {...props}
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput aria-label="Từ khóa tìm kiếm" />
          <SearchDialogClose />
        </SearchDialogHeader>
        <div className="ods-search-scope">
          <label htmlFor="ods-search-scope">Phạm vi</label>
          <select
            id="ods-search-scope"
            value={scope}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (value === 'all' || value === 'internal') setScope(value);
              else {
                const selectedScope = isInternalSearchPath(pathname)
                  ? parseInternalSearchServiceTag(value)
                  : parseSearchProductTag(value);
                if (selectedScope) setScope(selectedScope);
              }
            }}
          >
            {scopeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {pageCount > 0 ? (
            <output className="ods-search-count" aria-live="polite">
              {pageCount} bài phù hợp
            </output>
          ) : null}
        </div>
        <SearchDialogList items={items} Empty={Empty} Item={Item} aria-label="Kết quả tìm kiếm" />
        <div className="ods-search-help" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> Di chuyển</span>
          <span><kbd>Enter</kbd> Mở</span>
          <span><kbd>Esc</kbd> Đóng</span>
        </div>
      </SearchDialogContent>
    </SearchDialog>
  );
}
