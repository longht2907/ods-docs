#!/usr/bin/env node

import { execFileSync, execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { spawnStandaloneServer } from './helpers/standalone-server.mjs';

const pages = [
  '/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call',
  '/docs/ai-contact-center/api/autocall/chien-dich/start-campaign',
];
const desktopWidths = [1280, 1440, 1920];
const mobileWidths = [390, 768];
const height = 900;
let navigationSequence = 0;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    // Tiến trình đã kết thúc.
  }
}

function findChrome() {
  const configured = process.env.CHROME_PATH?.trim();
  const candidates = [
    configured,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  for (const command of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    try {
      const resolved = execFileSync(process.platform === 'win32' ? 'where.exe' : 'which', [command], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim().split(/\r?\n/)[0];
      if (resolved) return resolved;
    } catch {
      // Thử candidate tiếp theo.
    }
  }

  throw new Error('Không tìm thấy Chrome/Chromium. Có thể cấu hình CHROME_PATH.');
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server đang khởi động.
    }
    await delay(500);
  }
  throw new Error(`Production server không sẵn sàng tại ${url}`);
}

async function waitForFile(filePath) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (fs.existsSync(filePath)) return;
    await delay(100);
  }
  throw new Error(`Chrome không tạo ${filePath}`);
}

class CdpClient {
  constructor(webSocketUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    this.socket = new WebSocket(webSocketUrl);
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      const handlers = this.listeners.get(message.method) ?? [];
      for (const handler of handlers) handler(message.params);
    });
  }

  on(method, handler) {
    const handlers = this.listeners.get(method) ?? [];
    handlers.push(handler);
    this.listeners.set(method, handlers);
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  close() {
    this.socket.close();
  }
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? 'Runtime.evaluate thất bại');
  }
  return result.result.value;
}

async function navigate(client, url) {
  const marker = `ods-api-navigation-${navigationSequence += 1}`;
  await evaluate(client, `window[${JSON.stringify(marker)}] = true`);
  await client.send('Page.navigate', { url });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const ready = await evaluate(
      client,
      `location.href === ${JSON.stringify(url)} &&
        !window[${JSON.stringify(marker)}] &&
        document.readyState === 'complete' &&
        Boolean(document.querySelector('[data-api-sticky-panel]'))`,
    );
    if (ready) return;
    await delay(100);
  }
  throw new Error(`Trang không render ApiReferenceCode: ${url}`);
}

async function navigateReady(client, url, selector) {
  const marker = `ods-api-navigation-${navigationSequence += 1}`;
  await evaluate(client, `window[${JSON.stringify(marker)}] = true`);
  await client.send('Page.navigate', { url });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const ready = await evaluate(
      client,
      `location.href === ${JSON.stringify(url)} &&
        !window[${JSON.stringify(marker)}] &&
        document.readyState === 'complete' &&
        Boolean(document.querySelector(${JSON.stringify(selector)}))`,
    );
    if (ready) return;
    await delay(100);
  }
  throw new Error(`Trang không render selector ${selector}: ${url}`);
}

async function openSearchDialog(client) {
  const isReady = () => evaluate(
    client,
    `(() => {
      const dialog = document.getElementById('fd-search-dialog-content');
      return Boolean(
        dialog &&
        !dialog.hasAttribute('data-closed') &&
        document.querySelector('[data-fd-search-dialog-input]') &&
        document.querySelector('#ods-search-scope')
      );
    })()`,
  );

  if (await isReady()) return;

  for (let hotkeyAttempt = 0; hotkeyAttempt < 8; hotkeyAttempt += 1) {
    await evaluate(
      client,
      `window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))`,
    );
    for (let renderAttempt = 0; renderAttempt < 10; renderAttempt += 1) {
      if (await isReady()) return;
      await delay(50);
    }
  }

  const state = await evaluate(
    client,
    `({
      pathname: location.pathname,
      dialogState: document.getElementById('fd-search-dialog-content')?.getAttribute('data-state') ?? null,
      dialogClosed: document.getElementById('fd-search-dialog-content')?.hasAttribute('data-closed') ?? null,
      hasInput: Boolean(document.querySelector('[data-fd-search-dialog-input]')),
      hasScope: Boolean(document.querySelector('#ods-search-scope')),
    })`,
  );
  throw new Error(`Ctrl+K không mở Search dialog: ${JSON.stringify(state)}`);
}

async function setViewport(client, width) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
}

async function setTheme(client, theme) {
  await client.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-color-scheme', value: theme }],
  });
  await evaluate(
    client,
    `(() => { document.documentElement.classList.remove('light', 'dark'); document.documentElement.classList.add(${JSON.stringify(theme)}); return true; })()`,
  );
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function measureDesktop(client) {
  return evaluate(
    client,
    `(async () => {
      const panel = document.querySelector('[data-api-sticky-panel]');
      const aside = document.querySelector('[data-api-reference-code]');
      const grid = panel.closest('.ods-api-grid');
      window.scrollTo(0, 0);
      await new Promise(requestAnimationFrame);
      const style = getComputedStyle(panel);
      const initial = panel.getBoundingClientRect();
      const asideInitial = aside.getBoundingClientRect();
      const gridInitial = grid.getBoundingClientRect();
      const top = Number.parseFloat(style.top);
      window.scrollTo(0, Math.min(800, document.documentElement.scrollHeight - innerHeight));
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      const after = panel.getBoundingClientRect();
      const gridAfter = grid.getBoundingClientRect();
      panel.scrollTop = panel.scrollHeight;
      const result = {
        position: style.position,
        top: style.top,
        topPixels: top,
        maxHeight: style.maxHeight,
        overflowY: style.overflowY,
        initialTop: initial.top,
        afterTop: after.top,
        scrollY: window.scrollY,
        panelHeight: after.height,
        panelClientHeight: panel.clientHeight,
        panelScrollHeight: panel.scrollHeight,
        panelScrollTop: panel.scrollTop,
        asideHeight: asideInitial.height,
        gridHeight: gridInitial.height,
        constrainedInsideGrid: after.bottom <= gridAfter.bottom + 1,
        responsePresent: /Response mẫu/i.test(panel.textContent),
      };
      window.scrollTo(0, 0);
      return result;
    })()`,
  );
}

async function measureMobile(client) {
  return evaluate(
    client,
    `(async () => {
      const panel = document.querySelector('[data-api-sticky-panel]');
      const grid = panel.closest('.ods-api-grid');
      const style = getComputedStyle(panel);
      return {
        position: style.position,
        columns: getComputedStyle(grid).gridTemplateColumns,
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
      };
    })()`,
  );
}

async function testInteractions(client, baseUrl) {
  await setViewport(client, 1440);
  await navigate(client, `${baseUrl}${pages[0]}`);
  const copyResult = await evaluate(
    client,
    `(async () => {
      const button = document.querySelector('button[aria-label="Sao chép URL endpoint"]');
      button.click();
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      return button.textContent.includes('Đã chép');
    })()`,
  );
  assert(copyResult, 'Copy URL không hiển thị feedback Đã chép');

  const tabStored = await evaluate(
    client,
    `(async () => {
      const tabs = [...document.querySelectorAll('[role="tab"]')];
      const python = tabs.find((tab) => tab.textContent.trim() === 'Python');
      if (!python) return { pass: false, reason: 'missing Python tab', tabs: tabs.map((tab) => tab.textContent.trim()) };
      python.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
      python.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, button: 0 }));
      python.click();
      for (let attempt = 0; attempt < 20; attempt += 1) {
        if (localStorage.getItem('api-lang') === 'python') {
          return { pass: true, selected: python.getAttribute('aria-selected') };
        }
        await new Promise(requestAnimationFrame);
      }
      return {
        pass: false,
        reason: 'storage not updated',
        selected: python.getAttribute('aria-selected'),
        local: localStorage.getItem('api-lang'),
        session: sessionStorage.getItem('api-lang'),
      };
    })()`,
  );
  assert(tabStored.pass, `Tab Python không lưu lựa chọn api-lang: ${JSON.stringify(tabStored)}`);

  await navigate(client, `${baseUrl}${pages[1]}`);
  const tabRestored = await evaluate(
    client,
    `(() => [...document.querySelectorAll('[role="tab"]')].some((tab) => tab.textContent.trim() === 'Python' && tab.getAttribute('aria-selected') === 'true'))()`,
  );
  assert(tabRestored, 'Tab Python không được khôi phục trên trang StartCampaign');
}

async function testSearchDialog(client, baseUrl) {
  await setViewport(client, 1440);
  await navigateReady(client, `${baseUrl}/docs`, 'body');
  await openSearchDialog(client);
  assert(
    await evaluate(client, `document.querySelector('#ods-search-scope')?.value === 'all'`),
    'Route /docs không mặc định phạm vi Tất cả sản phẩm',
  );

  let delayedWebhook = false;
  let delayedWebhookNetworkId;
  let abortedWebhook = false;
  let forceSearchError = false;
  let searchRequestCount = 0;
  await client.send('Network.enable');
  client.on('Network.loadingFailed', (event) => {
    if (event.requestId === delayedWebhookNetworkId && event.canceled) abortedWebhook = true;
  });
  client.on('Fetch.requestPaused', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.startsWith('/api/search')) searchRequestCount += 1;
    if (forceSearchError && url.searchParams.get('query') === 'ods-force-error') {
      client.send('Fetch.fulfillRequest', {
        requestId: event.requestId,
        responseCode: 500,
        responseHeaders: [{ name: 'Content-Type', value: 'text/plain; charset=utf-8' }],
        body: Buffer.from('forced search failure').toString('base64'),
      }).catch(() => {});
      return;
    }
    if (url.pathname === '/api/search' && url.searchParams.get('query') === 'webhook') {
      delayedWebhook = true;
      delayedWebhookNetworkId = event.networkId;
      setTimeout(() => {
        client.send('Fetch.continueRequest', { requestId: event.requestId }).catch(() => {});
      }, 700);
      return;
    }
    client.send('Fetch.continueRequest', { requestId: event.requestId }).catch(() => {});
  });
  await client.send('Fetch.enable', {
    patterns: [{ urlPattern: '*/api/search*', requestStage: 'Request' }],
  });

  const setSearch = (value) => evaluate(
    client,
    `(() => {
      const input = document.querySelector('[data-fd-search-dialog-input]');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, ${JSON.stringify(value)});
      input.dispatchEvent(new Event('input', { bubbles: true }));
    })()`,
  );

  await setSearch('webhook');
  for (let attempt = 0; attempt < 20 && !delayedWebhook; attempt += 1) await delay(25);
  assert(delayedWebhook, 'Không bắt được request webhook để kiểm tra race condition');

  const started = performance.now();
  await setSearch('cloudfile');
  let stable = false;
  for (let attempt = 0; attempt < 200; attempt += 1) {
    stable = await evaluate(
      client,
      `(() => {
        const text = document.getElementById('fd-search-dialog-content')?.textContent ?? '';
        return document.querySelectorAll('.ods-search-result').length > 0 &&
          /CloudFile/i.test(text) && !/Đang tìm kiếm/.test(text);
      })()`,
    );
    if (stable) break;
    await delay(25);
  }
  const stableMs = Math.round((performance.now() - started) * 10) / 10;
  assert(stable, 'Query cloudfile không render ổn định');
  await delay(800);
  const race = await evaluate(
    client,
    `(async () => {
      const dialog = document.getElementById('fd-search-dialog-content');
      const text = dialog?.textContent ?? '';
      const results = [...document.querySelectorAll('.ods-search-result')];
      const pageCount = results.filter((item) => item.dataset.resultType === 'page').length;
      const selectedBefore = results.findIndex((item) => item.getAttribute('aria-selected') === 'true');
      dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      const selectedAfter = results.findIndex((item) => item.getAttribute('aria-selected') === 'true');
      return {
        text,
        pageCount,
        resultCount: results.length,
        selectedBefore,
        selectedAfter,
        horizontalOverflow: dialog.scrollWidth > dialog.clientWidth,
      };
    })()`,
  );
  await client.send('Fetch.disable');

  assert(/CloudFile/i.test(race.text), 'Response webhook cũ đã ghi đè query cloudfile mới');
  assert(abortedWebhook, 'Request webhook cũ không bị AbortController hủy');
  assert(race.pageCount <= 8, `Search dialog render ${race.pageCount} bài`);
  assert(race.resultCount <= 32, `Search dialog render ${race.resultCount} items`);
  assert(!race.horizontalOverflow, 'Search dialog bị tràn ngang');
  assert(race.selectedAfter !== race.selectedBefore, 'ArrowDown không đổi active Search item');

  const warmStarted = performance.now();
  await setSearch('máy nhánh');
  let warmStable = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    warmStable = await evaluate(
      client,
      `(() => {
        const text = document.getElementById('fd-search-dialog-content')?.textContent ?? '';
        return document.querySelectorAll('.ods-search-result').length > 0 &&
          /máy nhánh/i.test(text) && !/Đang tìm kiếm/.test(text);
      })()`,
    );
    if (warmStable) break;
    await delay(25);
  }
  const warmStableMs = Math.round((performance.now() - warmStarted) * 10) / 10;
  assert(warmStable, 'Query warm máy nhánh không render ổn định');

  await setSearch('xqzvplmnjk');
  let noResultReady = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    noResultReady = await evaluate(
      client,
      `document.getElementById('fd-search-dialog-content')?.textContent?.includes('Không tìm thấy kết quả phù hợp.')`,
    );
    if (noResultReady) break;
    await delay(25);
  }
  assert(noResultReady, 'Query không có kết quả không hiển thị empty state riêng');

  forceSearchError = true;
  await client.send('Fetch.enable', {
    patterns: [{ urlPattern: '*/api/search*', requestStage: 'Request' }],
  });
  await setSearch('ods-force-error');
  let errorReady = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    errorReady = await evaluate(
      client,
      `document.getElementById('fd-search-dialog-content')?.textContent?.includes('Không thể tải kết quả. Vui lòng thử lại.')`,
    );
    if (errorReady) break;
    await delay(25);
  }
  assert(errorReady, 'API error bị biến thành empty state');
  forceSearchError = false;
  await client.send('Fetch.disable');

  const requestsBeforeClear = searchRequestCount;
  await setSearch('');
  await delay(250);
  assert(searchRequestCount === requestsBeforeClear, 'Query rỗng vẫn phát Search request');

  if (process.env.TASK023_WRITE_SCREENSHOT === '1') {
    const outputDir = path.join('.harness', 'reports', 'assets', 'TASK-023');
    fs.mkdirSync(outputDir, { recursive: true });
    for (const [width, label] of [[1440, 'desktop'], [390, 'mobile']]) {
      await setViewport(client, width);
      const viewportOverflow = await evaluate(
        client,
        `document.documentElement.scrollWidth > document.documentElement.clientWidth`,
      );
      assert(!viewportOverflow, `Search dialog ${width}px bị tràn ngang viewport`);
      for (const theme of ['light', 'dark']) {
        await setTheme(client, theme);
        const screenshot = await client.send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(
          path.join(outputDir, `search-may-nhanh-${label}-${theme}.png`),
          screenshot.data,
          'base64',
        );
      }
    }
  }

  await client.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
    nativeVirtualKeyCode: 27,
  });
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
    nativeVirtualKeyCode: 27,
  });
  await delay(300);
  assert(
    await evaluate(
      client,
      `(() => {
        const dialog = document.getElementById('fd-search-dialog-content');
        return !dialog || dialog.hasAttribute('data-closed');
      })()`,
    ),
    'Escape không đóng Search dialog',
  );

  await openSearchDialog(client);
  await setSearch('webhook');
  let headingReady = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    headingReady = await evaluate(
      client,
      `Boolean(document.querySelector('.ods-search-result[data-result-type="heading"]'))`,
    );
    if (headingReady) break;
    await delay(25);
  }
  assert(headingReady, 'Search webhook không có heading item để kiểm tra anchor navigation');
  await evaluate(
    client,
    `document.querySelector('.ods-search-result[data-result-type="heading"]').click()`,
  );
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await evaluate(client, `location.hash.length > 1`)) break;
    await delay(50);
  }
  assert(await evaluate(client, `location.hash.length > 1`), 'Click heading Search không điều hướng tới anchor');

  await navigateReady(client, `${baseUrl}/docs`, 'body');
  await openSearchDialog(client);
  await setSearch('cloudfile');
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (await evaluate(client, `document.querySelectorAll('.ods-search-result').length > 0`)) break;
    await delay(25);
  }
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13,
  });
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13,
  });
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await evaluate(client, `location.pathname !== '/docs'`)) break;
    await delay(50);
  }
  assert(await evaluate(client, `location.pathname !== '/docs'`), 'Enter không chọn active Search item');

  await navigateReady(client, `${baseUrl}${pages[0]}`, '[data-api-sticky-panel]');
  await openSearchDialog(client);
  const aiRouteScope = await evaluate(
    client,
    `({
      pathname: location.pathname,
      scope: document.querySelector('#ods-search-scope')?.value ?? null,
    })`,
  );
  assert(
    aiRouteScope.scope === 'ai-contact-center',
    `Route AI Contact Center không mặc định đúng product scope: ${JSON.stringify(aiRouteScope)}`,
  );

  await evaluate(
    client,
    `(() => {
      const select = document.querySelector('#ods-search-scope');
      select.value = 'all';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    })()`,
  );
  await setSearch('cloudfile');
  let allScopeReady = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    allScopeReady = await evaluate(
      client,
      `(() => {
        const text = document.getElementById('fd-search-dialog-content')?.textContent ?? '';
        return document.querySelector('#ods-search-scope')?.value === 'all' && /CloudFile/i.test(text);
      })()`,
    );
    if (allScopeReady) break;
    await delay(25);
  }
  assert(allScopeReady, 'Chuyển sang Tất cả sản phẩm không tìm được CloudFile từ route AI');

  await evaluate(
    client,
    `document.querySelector('[aria-label="Đóng tìm kiếm"]')?.click()`,
  );
  await navigateReady(client, `${baseUrl}/docs/cloudfile`, 'body');
  await openSearchDialog(client);
  const cloudfileRouteScope = await evaluate(
    client,
    `({
      pathname: location.pathname,
      scope: document.querySelector('#ods-search-scope')?.value ?? null,
    })`,
  );
  assert(
    cloudfileRouteScope.scope === 'cloudfile',
    `Route CloudFile không mặc định đúng product scope: ${JSON.stringify(cloudfileRouteScope)}`,
  );

  return { stableMs, warmStableMs, ...race };
}

async function main() {
  const appPort = await getFreePort();
  const baseUrl = `http://127.0.0.1:${appPort}`;
  const server = spawnStandaloneServer(appPort, {
    unsetEnv: ['ODS_INTERNAL_DEV_OPEN'],
  });
  let serverOutput = '';
  server.stdout.on('data', (chunk) => { serverOutput += chunk.toString(); });
  server.stderr.on('data', (chunk) => { serverOutput += chunk.toString(); });

  const chromeProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'ods-task023-chrome-'));
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
  const pageErrors = [];
  const resourceErrors = [];
  try {
    await waitForServer(`${baseUrl}/docs`);
    const activePortFile = path.join(chromeProfile, 'DevToolsActivePort');
    await waitForFile(activePortFile);
    const [debugPort] = fs.readFileSync(activePortFile, 'utf8').trim().split(/\r?\n/);
    const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
    const pageTarget = targets.find((target) => target.type === 'page');
    if (!pageTarget) throw new Error('Chrome không có page target');

    client = new CdpClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();
    client.on('Runtime.exceptionThrown', (event) => {
      pageErrors.push(event.exceptionDetails?.text ?? 'Runtime exception');
    });
    client.on('Log.entryAdded', (event) => {
      if (event.entry?.level === 'error') {
        resourceErrors.push(
          `${event.entry.text}${event.entry.url ? ` (${event.entry.url})` : ''}`,
        );
      }
    });
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Log.enable');

    const measurements = [];
    for (const page of pages) {
      for (const width of desktopWidths) {
        await setViewport(client, width);
        await navigate(client, `${baseUrl}${page}`);
        for (const theme of ['light', 'dark']) {
          await setTheme(client, theme);
          const measurement = await measureDesktop(client);
          assert(measurement.position === 'sticky', `${page} ${width}px: position=${measurement.position}`);
          assert(Number.isFinite(measurement.topPixels), `${page} ${width}px: top=${measurement.top}`);
          assert(measurement.maxHeight !== 'none', `${page} ${width}px: max-height=none`);
          assert(measurement.overflowY === 'auto', `${page} ${width}px: overflow-y=${measurement.overflowY}`);
          assert(measurement.asideHeight >= measurement.gridHeight - 1, `${page} ${width}px: aside không stretch`);
          assert(measurement.scrollY > 0, `${page} ${width}px: trang không cuộn được`);
          assert(Math.abs(measurement.afterTop - measurement.topPixels) <= 2, `${page} ${width}px: sticky không giữ offset sau scroll`);
          assert(measurement.constrainedInsideGrid, `${page} ${width}px: panel vượt cuối grid`);
          assert(measurement.responsePresent, `${page} ${width}px: Response không nằm cùng wrapper`);
          if (measurement.panelScrollHeight > measurement.panelClientHeight) {
            assert(measurement.panelScrollTop > 0, `${page} ${width}px: panel dài không cuộn nội bộ`);
          }
          measurements.push({ page, width, theme, ...measurement });
        }
      }
    }

    for (const width of mobileWidths) {
      for (const theme of ['light', 'dark']) {
        await setViewport(client, width);
        await navigate(client, `${baseUrl}${pages[0]}`);
        await setTheme(client, theme);
        const mobile = await measureMobile(client);
        assert(mobile.position === 'static', `${width}px ${theme}: mobile vẫn sticky`);
        assert(mobile.documentWidth <= mobile.viewportWidth, `${width}px ${theme}: tràn ngang`);
      }
    }

    await testInteractions(client, baseUrl);
    const searchMeasurement = await testSearchDialog(client, baseUrl);
    assert(pageErrors.length === 0, `Phát hiện page error: ${pageErrors.join(' | ')}`);

    if (process.env.TASK023_WRITE_SCREENSHOT === '1') {
      await setViewport(client, 1440);
      await navigate(client, `${baseUrl}${pages[0]}`);
      await evaluate(client, 'window.scrollTo(0, 800)');
      const screenshot = await client.send('Page.captureScreenshot', { format: 'png' });
      const outputDir = path.join('.harness', 'reports', 'assets', 'TASK-023');
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(path.join(outputDir, 'click-to-call-sticky-1440x900.png'), screenshot.data, 'base64');
    }

    const sample = measurements.find((item) => item.width === 1440 && item.theme === 'light');
    console.log('[test:api-ui PASS] Desktop 1280/1440/1920 và mobile 390/768 đạt Light/Dark.');
    console.log(`[test:api-ui] Mẫu 1440px: top ${sample.initialTop.toFixed(1)} -> ${sample.afterTop.toFixed(1)} tại scrollY=${sample.scrollY}; computed top=${sample.top}; max-height=${sample.maxHeight}; aside/grid=${sample.asideHeight.toFixed(1)}/${sample.gridHeight.toFixed(1)}.`);
    console.log('[test:api-ui] Copy URL, tab persist, panel scroll/Response và pageerror đều đạt.');
    console.log(`[test:api-ui] Search cloudfile render ổn định sau ${searchMeasurement.stableMs}ms; race/keyboard/overflow đạt.`);
    console.log(`[test:api-ui] Search warm máy nhánh render ổn định sau ${searchMeasurement.warmStableMs}ms.`);
    if (resourceErrors.length > 0) {
      console.warn(`[test:api-ui] Resource console errors (không phải pageerror): ${resourceErrors.join(' | ')}`);
    }
  } catch (error) {
    console.error(`[test:api-ui FAIL] ${error.message}`);
    if (serverOutput) console.error(serverOutput.slice(-1500));
    process.exitCode = 1;
  } finally {
    client?.close();
    killProcessTree(chrome.pid);
    killProcessTree(server.pid);
    await delay(500);
    try {
      fs.rmSync(chromeProfile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch (error) {
      console.warn(`[test:api-ui] Không thể dọn Chrome profile tạm thời: ${error.message}`);
    }
  }
}

await main();
