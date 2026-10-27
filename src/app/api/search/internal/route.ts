import { internalSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import {
  prepareSearchResults,
  SEARCH_ENGINE_RESULT_LIMIT,
  SEARCH_SNIPPET_LIMIT,
} from '@/lib/search-results';

const search = createFromSource(internalSource, {
  search: {
    groupBy: {
      properties: ['page_id'],
      maxResult: SEARCH_SNIPPET_LIMIT + 1,
    },
  },
});

export async function GET(request: Request): Promise<Response> {
  const query = new URL(request.url).searchParams.get('query')?.trim();
  if (!query) return Response.json([]);

  const results = await search.search(query, { limit: SEARCH_ENGINE_RESULT_LIMIT });
  return Response.json(prepareSearchResults(results, query));
}
