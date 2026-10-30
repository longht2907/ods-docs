import { internalSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import {
  createInternalSearchResponse,
  getInternalSearchServiceTag,
  parseInternalSearchServiceTag,
  prepareSearchResults,
  SEARCH_ENGINE_RESULT_LIMIT,
  SEARCH_SNIPPET_LIMIT,
} from '@/lib/search-results';

const search = createFromSource(internalSource, {
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: getInternalSearchServiceTag(page.url),
    };
  },
  search: {
    groupBy: {
      properties: ['page_id'],
      maxResult: SEARCH_SNIPPET_LIMIT + 1,
    },
  },
});

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const query = params.get('query')?.trim();
  if (!query) return createInternalSearchResponse([]);

  const results = await search.search(query, {
    limit: SEARCH_ENGINE_RESULT_LIMIT,
    tag: parseInternalSearchServiceTag(params.get('tag')),
  });
  return createInternalSearchResponse(prepareSearchResults(results, query));
}
