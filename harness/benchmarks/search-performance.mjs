#!/usr/bin/env node

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import {
  CdpClient,
  delay,
  evaluate,
  findChrome,
  killProcessTree,
  waitForFile,
  waitForServer,
} from '../tests/helpers/browser.mjs';

const queries = [
  'giám sát cuộc gọi',
  'máy nhánh',
  'may nhanh',
  'SIP',
  'webhook',
  'API',
  'gi',
  'xqzvplmnjk',
  'Class of Service',
  'ServiceName',
];

function readArgs(argv) {
  const options = {
    mode: 'dev',
    baseUrl: 'http://127.0.0.1:3000',
    samples: 30,
    output: undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const name = argv[index];
    const value = argv[index + 1];
    if (name === '--mode' && (value === 'dev' || value === 'standalone')) options.mode = value;
    else if (name === '--base-url' && value) options.baseUrl = value.replace(/\/$/, '');
    else if (name === '--samples' && Number.isInteger(Number(value)) && Number(value) > 0) {
      options.samples = Number(value);
    } else if (name === '--output' && value) options.output = value;
    else continue;
    index += 1;
  }

  return options;
}

function percentile(values, quantile) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * quantile) - 1)];
}

function summary(rows) {
  const successful = rows.filter((row) => row.status === 200);
  const times = successful.map((row) => row.ms);
  const bytes = successful.map((row) => row.bytes);
  return {
    sampleCount: rows.length,
    medianMs: percentile(times, 0.5),
    p95Ms: percentile(times, 0.95),
    medianBytes: percentile(bytes, 0.5),
    errorRate: rows.filter((row) => row.status !== 200).length / rows.length,
  };
}

function countMdx(root) {
  if (!fs.existsSync(root)) return 0;
  return fs.readdirSync(root, { withFileTypes: true }).reduce((total, entry) => {
    const location = path.join(root, entry.name);
    if (entry.isDirectory()) return total + countMdx(location);
    return total + (entry.isFile() && entry.name.endsWith('.mdx') ? 1 : 0);
  }, 0);
}

async function request(baseUrl, scope, query, sample) {
  const url = new URL(scope.path, baseUrl);
  url.searchParams.set('query', query);
  if (scope.tag) url.searchParams.set('tag', scope.tag);
  url.searchParams.set('_benchmark', String(sample));

  const started = performance.now();
  try {
    const response = await fetch(url, { cache: 'no-store' });
    const body = await response.arrayBuffer();
    return {
      ms: Number((performance.now() - started).toFixed(3)),
      status: response.status,
      bytes: body.byteLength,
      cacheControl: response.headers.get('cache-control'),
    };
  } catch (error) {
    return {
      ms: Number((performance.now() - started).toFixed(3)),
      status: 0,
      bytes: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function measureApi(baseUrl, samples) {
  const scopes = [
    { name: 'public-all', path: '/api/search' },
    { name: 'public-ai-contact-center', path: '/api/search', tag: 'ai-contact-center' },
    { name: 'public-cloudfile', path: '/api/search', tag: 'cloudfile' },
    { name: 'internal', path: '/api/search/internal' },
  ];
  const result = {};

  for (const scope of scopes) {
    const firstObserved = await request(baseUrl, scope, queries[0], 'first');
    const rows = [];
    for (let index = 0; index < samples; index += 1) {
      rows.push(await request(baseUrl, scope, queries[index % queries.length], index));
    }
    result[scope.name] = { firstObserved, warm: summary(rows) };
  }

  return result;
}

async function navigate(client, url) {
  await client.send('Page.navigate', { url });
  for (let attempt = 0; attempt < 150; attempt += 1) {
    const ready = await evaluate(
      client,
      `location.href === ${JSON.stringify(url)} && document.readyState === 'complete' && Boolean(document.body)`,
    );
    if (ready) {
      await delay(100);
      return;
    }
    await delay(100);
  }
  throw new Error(`Browser không tải xong ${url}`);
}

async function openDialog(client) {
  const started = await evaluate(client, 'performance.now()');
  for (let hotkeyAttempt = 0; hotkeyAttempt < 8; hotkeyAttempt += 1) {
    const ready = await evaluate(
      client,
      `(() => {
        const dialog = document.getElementById('fd-search-dialog-content');
        return Boolean(dialog && !dialog.hasAttribute('data-closed') && document.querySelector('[data-fd-search-dialog-input]'));
      })()`,
    );
    if (ready) return (await evaluate(client, 'performance.now()')) - started;

    await evaluate(
      client,
      `window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))`,
    );
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const opened = await evaluate(
        client,
        `(() => {
          const dialog = document.getElementById('fd-search-dialog-content');
          const input = document.querySelector('[data-fd-search-dialog-input]');
          if (!dialog || dialog.hasAttribute('data-closed') || !input) return false;
          input.focus();
          return true;
        })()`,
      );
      if (opened) return (await evaluate(client, 'performance.now()')) - started;
      await delay(50);
    }
  }
  throw new Error('Search dialog không mở');
}

async function closeDialog(client) {
  await evaluate(
    client,
    `document.querySelector('[aria-label="Đóng tìm kiếm"]')?.click()`,
  );
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const closed = await evaluate(
      client,
      `(() => {
        const dialog = document.getElementById('fd-search-dialog-content');
        return !dialog || dialog.hasAttribute('data-closed');
      })()`,
    );
    if (closed) return;
    await delay(50);
  }
  throw new Error('Search dialog không đóng');
}

async function setQueryAndWait(client, query, requireNetwork) {
  await evaluate(
    client,
    `(() => {
      performance.clearResourceTimings();
      window.__odsSearchBenchmarkInput = performance.now();
      const input = document.querySelector('[data-fd-search-dialog-input]');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, ${JSON.stringify(query)});
      input.dispatchEvent(new Event('input', { bubbles: true }));
    })()`,
  );

  for (let attempt = 0; attempt < 600; attempt += 1) {
    const state = await evaluate(
      client,
      `(() => {
        const dialog = document.getElementById('fd-search-dialog-content');
        const text = dialog?.textContent ?? '';
        const inputAt = window.__odsSearchBenchmarkInput;
        const stableAt = performance.now();
        if (stableAt - inputAt < 110) return null;
        const settled = !text.includes('Đang tìm kiếm') && (
          document.querySelectorAll('.ods-search-result').length > 0 ||
          text.includes('Không tìm thấy kết quả') ||
          text.includes('Không thể tải kết quả')
        );
        if (!settled) return null;
        const resources = performance.getEntriesByType('resource')
          .filter((entry) => new URL(entry.name).pathname.startsWith('/api/search'));
        const resource = resources.at(-1);
        if (${JSON.stringify(requireNetwork)} && (!resource || new URL(resource.name).searchParams.get('query') !== ${JSON.stringify(query)})) {
          return null;
        }
        return {
          totalMs: stableAt - inputAt,
          requestCount: resources.length,
          debounceMs: resource ? resource.startTime - inputAt : null,
          networkMs: resource ? resource.responseEnd - resource.startTime : null,
          renderMs: resource ? stableAt - resource.responseEnd : null,
          resultCount: document.querySelectorAll('.ods-search-result').length,
          state: text.includes('Không thể tải kết quả') ? 'error' :
            text.includes('Không tìm thấy kết quả') ? 'empty' : 'results',
        };
      })()`,
    );
    if (state) return state;
    await delay(10);
  }
  throw new Error(`Search UI không ổn định cho query ${query}`);
}

async function rapidTypingRequestCount(client) {
  await evaluate(
    client,
    `(async () => {
      performance.clearResourceTimings();
      const input = document.querySelector('[data-fd-search-dialog-input]');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      for (const value of ['i', 'in', 'int', 'inte', 'integ', 'integr', 'integra', 'integrat', 'integratio', 'integration']) {
        setter.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    })()`,
  );
  await delay(700);
  return evaluate(
    client,
    `performance.getEntriesByType('resource').filter((entry) => new URL(entry.name).pathname.startsWith('/api/search')).length`,
  );
}

async function measureUiContext(client, url, samples) {
  await navigate(client, url);
  const modalOpenMs = [];
  for (let index = 0; index < samples; index += 1) {
    modalOpenMs.push(await openDialog(client));
    await closeDialog(client);
  }

  await openDialog(client);
  const queryRows = [];
  const seenQueries = new Set();
  for (let index = 0; index < samples; index += 1) {
    const query = queries[index % queries.length];
    queryRows.push(await setQueryAndWait(client, query, !seenQueries.has(query)));
    seenQueries.add(query);
  }
  const rapidRequestCount = await rapidTypingRequestCount(client);

  return {
    modalOpen: {
      sampleCount: modalOpenMs.length,
      medianMs: percentile(modalOpenMs, 0.5),
      p95Ms: percentile(modalOpenMs, 0.95),
    },
    query: {
      sampleCount: queryRows.length,
      medianTotalMs: percentile(queryRows.map((row) => row.totalMs), 0.5),
      p95TotalMs: percentile(queryRows.map((row) => row.totalMs), 0.95),
      medianDebounceMs: percentile(queryRows.map((row) => row.debounceMs).filter(Number.isFinite), 0.5),
      medianNetworkMs: percentile(queryRows.map((row) => row.networkMs).filter(Number.isFinite), 0.5),
      medianRenderMs: percentile(queryRows.map((row) => row.renderMs).filter(Number.isFinite), 0.5),
      networkSamples: queryRows.filter((row) => row.requestCount > 0).length,
      cachedSamples: queryRows.filter((row) => row.requestCount === 0).length,
    },
    rapidTypingRequestCount: rapidRequestCount,
  };
}

async function measureBrowser(baseUrl, samples) {
  const chromeProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'ods-search-benchmark-'));
  const chrome = spawn(findChrome(), [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--remote-debugging-port=0',
    `--user-data-dir=${chromeProfile}`,
    '--window-size=1440,900',
    'about:blank',
  ], { stdio: 'ignore' });
  let client;

  try {
    const activePortFile = path.join(chromeProfile, 'DevToolsActivePort');
    await waitForFile(activePortFile);
    const [debugPort] = fs.readFileSync(activePortFile, 'utf8').trim().split(/\r?\n/);
    const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
    const pageTarget = targets.find((target) => target.type === 'page');
    if (!pageTarget) throw new Error('Chrome không có page target');

    client = new CdpClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    const docs = await measureUiContext(client, `${baseUrl}/docs`, samples);
    const internalResponse = await fetch(`${baseUrl}/internal`, { redirect: 'manual' });
    const internal = internalResponse.status === 200
      ? await measureUiContext(client, `${baseUrl}/internal`, samples)
      : { status: internalResponse.status, reason: 'production-fail-closed' };
    return { docs, internal };
  } finally {
    client?.close();
    killProcessTree(chrome.pid);
    await delay(300);
    fs.rmSync(chromeProfile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}

async function main() {
  const options = readArgs(process.argv.slice(2));
  await waitForServer(`${options.baseUrl}/docs`);

  const output = {
    generatedAt: new Date().toISOString(),
    mode: options.mode,
    baseUrl: options.baseUrl,
    environment: {
      node: process.version,
      platform: `${process.platform} ${os.release()}`,
      next: JSON.parse(fs.readFileSync('node_modules/next/package.json', 'utf8')).version,
      publicMdx: countMdx('content/docs'),
      internalMdx: countMdx('content/internal'),
    },
    queries,
    api: await measureApi(options.baseUrl, options.samples),
    ui: await measureBrowser(options.baseUrl, options.samples),
  };

  const json = `${JSON.stringify(output, null, 2)}\n`;
  if (options.output) {
    const outputPath = path.resolve(options.output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, json);
  }
  process.stdout.write(json);
}

await main();
