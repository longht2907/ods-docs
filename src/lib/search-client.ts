import type { SortedResult } from 'fumadocs-core/search';
import type { SearchClient } from 'fumadocs-core/search/client';
import type { SearchClientOptions } from './search-results';

export interface SearchRequestCoordinator {
  abort(): void;
  replace(controller: AbortController): void;
  release(controller: AbortController): void;
}

export function createSearchRequestCoordinator(): SearchRequestCoordinator {
  let activeController: AbortController | undefined;

  return {
    abort() {
      activeController?.abort();
      activeController = undefined;
    },
    replace(controller) {
      activeController?.abort();
      activeController = controller;
    },
    release(controller) {
      if (activeController === controller) activeController = undefined;
    },
  };
}

interface AbortableSearchClientOptions extends SearchClientOptions {
  cache: Map<string, SortedResult[]>;
  coordinator: SearchRequestCoordinator;
}

export function createAbortableSearchClient({
  api,
  tag,
  cache,
  coordinator,
}: AbortableSearchClientOptions): SearchClient {
  return {
    deps: [api, tag],
    async search(query) {
      const url = new URL(api, window.location.origin);
      url.searchParams.set('query', query);
      if (tag) url.searchParams.set('tag', tag);

      const cacheKey = url.toString();
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      const controller = new AbortController();
      coordinator.replace(controller);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(await response.text());

        const results = (await response.json()) as SortedResult[];
        cache.set(cacheKey, results);
        return results;
      } finally {
        coordinator.release(controller);
      }
    },
  };
}

export function clearInternalSearchCache(cache: Map<string, SortedResult[]>): void {
  for (const key of cache.keys()) {
    if (new URL(key).pathname === '/api/search/internal') cache.delete(key);
  }
}
