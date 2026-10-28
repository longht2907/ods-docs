#!/usr/bin/env node

import { execSync, spawn } from 'node:child_process';
import net from 'node:net';
import {
  getSearchClientOptions,
  getSearchRouteScope,
  getSearchScopeOptions,
} from '../../src/lib/search-results.ts';

const queries = [
  'nhân viên',
  'nhóm nhân viên',
  'máy nhánh',
  'click to call',
  'webhook',
  'cloudfile',
  'nhan vien',
  'may nhanh',
];

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
    server.on('error', reject);
  });
}

function killProcessTree(pid) {
  if (!pid) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /pid ${pid} /T /F`, { stdio: 'ignore' });
    } else {
      try {
        process.kill(-pid, 'SIGKILL');
      } catch {
        process.kill(pid, 'SIGKILL');
      }
    }
  } catch {
    // Process đã kết thúc.
  }
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server chưa sẵn sàng.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Search server không sẵn sàng tại ${url}`);
}

async function search(baseUrl, query, tag) {
  const url = new URL('/api/search', baseUrl);
  url.searchParams.set('query', query);
  if (tag) url.searchParams.set('tag', tag);
  const response = await fetch(url);
  const text = await response.text();
  if (!response.ok) throw new Error(`Search ${query} trả ${response.status}: ${text.slice(0, 200)}`);
  return { data: JSON.parse(text), bytes: Buffer.byteLength(text) };
}

function groupStats(results) {
  const groups = new Map();
  let currentPage;
  for (const item of results) {
    if (item.type === 'page') {
      currentPage = item.url;
      groups.set(currentPage, 0);
    } else if (currentPage) {
      groups.set(currentPage, (groups.get(currentPage) ?? 0) + 1);
    }
  }
  return {
    pages: groups.size,
    maxSnippets: Math.max(0, ...groups.values()),
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  assert(getSearchRouteScope('/internal/ai-contact-center/runbooks') === 'internal', 'Internal route không mặc định scope internal');
  assert(getSearchClientOptions('internal').api === '/api/search/internal', 'Scope internal không gọi internal Search API');
  assert(getSearchClientOptions('all').api === '/api/search', 'Scope public all không gọi public Search API');
  assert(getSearchClientOptions('cloudfile').tag === 'cloudfile', 'Scope CloudFile không truyền đúng tag');
  assert(
    !getSearchScopeOptions('/docs').some((option) => option.value === 'internal'),
    'Public Search làm lộ scope internal',
  );
  assert(
    getSearchScopeOptions('/internal').some((option) => option.value === 'internal'),
    'Internal Search thiếu scope nội bộ',
  );

  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const env = { ...process.env };
  delete env.ODS_INTERNAL_DEV_OPEN;

  const isWin = process.platform === 'win32';
  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    env,
    shell: true,
    detached: !isWin,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let output = '';
  server.stdout.on('data', (chunk) => { output += chunk.toString(); });
  server.stderr.on('data', (chunk) => { output += chunk.toString(); });

  try {
    await waitForServer(`${baseUrl}/docs`);

    for (const query of queries) {
      const { data, bytes } = await search(baseUrl, query);
      const stats = groupStats(data);
      assert(data.length > 0, `Query "${query}" không có kết quả`);
      assert(stats.pages <= 6, `Query "${query}" trả ${stats.pages} bài, vượt giới hạn 6`);
      assert(stats.maxSnippets <= 2, `Query "${query}" có ${stats.maxSnippets} snippets/bài`);
      assert(data.length <= 18, `Query "${query}" trả ${data.length} items, vượt giới hạn 18`);
      assert(bytes < 100_000, `Query "${query}" trả ${bytes} bytes, vượt 100 KB`);
      assert(data.every((item) => item.url.startsWith('/docs/') || item.url === '/docs'), `Query "${query}" có URL ngoài public docs`);
      assert(data.every((item) => !item.url.includes('/internal')), `Query "${query}" làm lộ URL internal`);
    }

    const card = await search(baseUrl, 'xóa liên hệ');
    const cardText = card.data.map((item) => item.content).join('\n');
    const cardPlainText = cardText.replace(/<\/?mark>/g, '');
    assert(cardPlainText.includes('Xóa liên hệ'), 'Search làm mất title hữu ích của Card');
    assert(cardPlainText.includes('Xóa liên hệ khỏi danh bạ'), 'Search làm mất description hữu ích của Card');
    assert(!/<\/?Card\b|\bhref=|\bicon=|\bdescription=/i.test(cardText), 'Search còn làm lộ JSX/attributes của Card');

    const supervision = await search(baseUrl, 'giám', 'ai-contact-center');
    const firstSupervisionPage = supervision.data.find((item) => item.type === 'page');
    const firstSupervisionTitle = firstSupervisionPage?.content.replace(/<\/?mark>/g, '') ?? '';
    assert(
      firstSupervisionTitle.toLocaleLowerCase('vi').includes('giám'),
      `Query giám chưa ưu tiên đúng title: ${firstSupervisionTitle || 'không có page'}`,
    );
    assert(
      supervision.data.every((item) => !/\*\*[^*]+\*\*/.test(item.content)),
      'Search còn trả Markdown emphasis thô trong snippet',
    );

    for (const keyword of ['ServiceName', 'AuthUser', 'AuthKey', 'AutoCall', 'AddExtension']) {
      const { data } = await search(baseUrl, keyword);
      assert(data.length > 0, `Không tìm thấy API keyword ${keyword}`);
    }

    const empty = await search(baseUrl, 'xqzvplmnjk');
    assert(empty.data.length === 0, 'Query vô nghĩa phải trả empty state');

    const aiScoped = await search(baseUrl, 'quản lý', 'ai-contact-center');
    assert(aiScoped.data.length > 0, 'AI Contact Center scope không có kết quả');
    assert(
      aiScoped.data.every((item) => item.url.startsWith('/docs/ai-contact-center')),
      'AI Contact Center scope trả kết quả ngoài sản phẩm',
    );

    const cloudfileScoped = await search(baseUrl, 'quản lý', 'cloudfile');
    assert(cloudfileScoped.data.length > 0, 'CloudFile scope không có kết quả');
    assert(
      cloudfileScoped.data.every((item) => item.url.startsWith('/docs/cloudfile')),
      'CloudFile scope trả kết quả ngoài sản phẩm',
    );

    const monitoring = await search(baseUrl, 'giám sát cuộc gọi', 'ai-contact-center');
    assert(
      monitoring.data.some((item) => item.url.startsWith('/docs/ai-contact-center/portal/cuoc-goi/giam-sat')),
      'Search không trả canonical URL của bài giám sát cuộc gọi',
    );
    assert(
      monitoring.data.every((item) => !item.url.includes('/user-guider-portal/')),
      'Search còn trả legacy Portal URL',
    );

    const invalidScope = await search(baseUrl, 'webhook', 'internal');
    assert(
      invalidScope.data.every((item) => !item.url.includes('/internal')),
      'Tag không hợp lệ làm lộ kết quả internal',
    );

    const anchored = (await search(baseUrl, 'webhook')).data.find((item) => item.url.includes('#'));
    assert(anchored, 'Không có kết quả heading/snippet mang anchor');
    const [pagePath, hash] = anchored.url.split('#');
    const pageResponse = await fetch(`${baseUrl}${pagePath}`);
    const html = await pageResponse.text();
    const anchor = decodeURIComponent(hash);
    assert(pageResponse.ok && html.includes(`id="${anchor}"`), `Anchor ${anchored.url} không tồn tại trong HTML`);

    const internal = await fetch(`${baseUrl}/api/search/internal?query=webhook`, { redirect: 'manual' });
    assert(internal.status === 401, `Anonymous internal Search trả ${internal.status}, mong đợi 401`);

    console.log('[test:search PASS] Extraction, grouping, anchors, Vietnamese/API keywords và public/internal boundary đều đạt.');
  } catch (error) {
    console.error(`[test:search FAIL] ${error.message}`);
    console.error(output.slice(-1200));
    process.exitCode = 1;
  } finally {
    killProcessTree(server.pid);
  }
}

await main();
