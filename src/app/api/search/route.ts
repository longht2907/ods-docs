import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import {
  getSearchProductTag,
  limitSearchResults,
  parseSearchProductTag,
  SEARCH_ENGINE_RESULT_LIMIT,
} from '@/lib/search-results';

const search = createFromSource(source, {
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: getSearchProductTag(page.url),
    };
  },
  search: {
    groupBy: {
      properties: ['page_id'],
      maxResult: 4,
    },
  },
});

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const query = params.get('query')?.trim();
  if (!query) return Response.json([]);

  const results = await search.search(query, {
    limit: SEARCH_ENGINE_RESULT_LIMIT,
    tag: parseSearchProductTag(params.get('tag')),
  });
  return Response.json(limitSearchResults(results));
}
