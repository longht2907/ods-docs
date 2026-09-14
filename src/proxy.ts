import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute } from '@/lib/shared';

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

function hasInternalAccess() {
  return process.env.ODS_INTERNAL_DEV_OPEN === 'true';
}

function isInternalPath(pathname: string) {
  return (
    pathname === '/internal' ||
    pathname.startsWith('/internal/') ||
    pathname === '/api/search/internal'
  );
}

export default function proxy(request: NextRequest) {
  if (isInternalPath(request.nextUrl.pathname) && !hasInternalAccess()) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'Cache-Control': 'private, no-store, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        // this URL has two representations, selected by `Accept`
        headers: { Vary: 'Accept' },
      });
    }
  }

  return NextResponse.next();
}
