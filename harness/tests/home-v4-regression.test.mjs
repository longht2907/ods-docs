#!/usr/bin/env node

import { execFileSync, execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { spawnStandaloneServer } from './helpers/standalone-server.mjs';

const desktopWidths = [1280, 1440];
const mobileWidths = [360, 390];
const viewportHeight = 900;
let navigationSequence = 0;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
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
  const candidates = [
    process.env.CHROME_PATH?.trim(),
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  for (const command of ['google-chrome', 'google-chrome-stable', 'chromium']) {
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
  for (let attempt = 0; attempt < 90; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server đang khởi động.
    }
    await delay(500);
  }
  throw new Error(`Server không sẵn sàng tại ${url}`);
}

async function waitForFile(filePath) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
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
      for (const handler of this.listeners.get(message.method) ?? []) handler(message.params);
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
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
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
    throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  }
  return result.result.value;
}

async function setViewport(client, width) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height: viewportHeight,
    deviceScaleFactor: 1,
    mobile: false,
  });
}

async function navigateHome(client, baseUrl) {
  navigationSequence += 1;
  const targetUrl = `${baseUrl}/?home_test=${navigationSequence}`;
  await client.send('Page.navigate', { url: targetUrl });
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const ready = await evaluate(
      client,
      `location.href === ${JSON.stringify(targetUrl)} && document.readyState === 'complete' && Boolean(document.querySelector('[data-home-v4]'))`,
    );
    if (ready) return;
    await delay(100);
  }
  throw new Error('Homepage V4.1 không render data-home-v4.');
}

async function setTheme(client, theme) {
  await client.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-color-scheme', value: theme }],
  });
  await evaluate(
    client,
    `(() => {
      localStorage.setItem('theme', ${JSON.stringify(theme)});
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(${JSON.stringify(theme)});
      return document.documentElement.className;
    })()`,
  );
  await delay(50);
}

async function measureHome(client) {
  return evaluate(
    client,
    `(() => {
      const home = document.querySelector('[data-home-v4]');
      const graphic = home.querySelector('[aria-label="Năm giải pháp cốt lõi của ODS"]');
      const coreProduct = home.querySelector('[data-core-product]');
      const orbitFloat = coreProduct?.querySelector('[data-orbit-float]');
      const heroHub = home.querySelector('[data-hero-hub]');
      const motionToggle = home.querySelector('[data-motion-toggle]');
      const header = document.querySelector('header');
      const heroHeading = home.querySelector('h1');
      const searchTrigger = home.querySelector('[data-home-search-trigger]');
      const suggestionLinks = [...home.querySelectorAll('div[class*="suggestions"] a')];
      const columnCount = (selector) => {
        const element = home.querySelector(selector);
        return element ? getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length : 0;
      };
      const text = home.textContent ?? '';
      const internalLinks = [...home.querySelectorAll('a[href]')]
        .map((link) => link.getAttribute('href'))
        .filter((href) => href?.startsWith('/internal'));
      const unnamedControls = [...home.querySelectorAll('a, button')]
        .filter((element) => !(element.textContent ?? '').trim() && !element.getAttribute('aria-label'))
        .length;
      return {
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        title: [...home.querySelector('h1').childNodes]
          .map((node) => node.textContent.trim())
          .filter(Boolean)
          .join(' '),
        intentCount: home.querySelectorAll('a[class*="intentCard"]').length,
        productCount: home.querySelectorAll('[data-product]').length,
        solutionGroupCount: home.querySelectorAll('[data-solution-group]').length,
        productGuideLinkCount: home.querySelectorAll('div[class*="productPathways"] a').length,
        coreProductCount: home.querySelectorAll('[data-core-product]').length,
        coreProductAnimation: orbitFloat ? getComputedStyle(orbitFloat).animationName : null,
        coreProductHrefs: [...home.querySelectorAll('[data-core-product]')]
          .map((link) => link.getAttribute('href')),
        coreProductTargetCount: [...home.querySelectorAll('[data-core-product]')]
          .filter((link) => document.querySelector(link.getAttribute('href'))).length,
        coreProductMicroLabelCount: [...home.querySelectorAll('[data-core-product]')]
          .filter((link) => /Giải pháp ODS/i.test(link.textContent ?? '')).length,
        connectionCount: home.querySelectorAll('[data-orbit-connection]').length,
        hubText: heroHub?.textContent?.replace(/\\s+/g, ' ').trim() ?? '',
        hubAnimation: heroHub ? getComputedStyle(heroHub).animationName : null,
        hubAnimationIterations: heroHub ? getComputedStyle(heroHub).animationIterationCount : null,
        motionToggleVisible: Boolean(motionToggle?.getBoundingClientRect().height),
        motionToggleSize: motionToggle
          ? Math.min(motionToggle.getBoundingClientRect().width, motionToggle.getBoundingClientRect().height)
          : 0,
        documentCount: home.querySelectorAll('[data-home-document]').length,
        libraryFilterCount: home.querySelectorAll('[data-home-filter]').length,
        librarySummary: home.querySelector('[data-home-library]')?.textContent ?? '',
        journeyTabCount: home.querySelectorAll('[data-home-journey-tab]').length,
        integrationLinkCount: home.querySelectorAll('[data-home-integration-link]').length,
        fakeStepCount: home.querySelectorAll('[data-home-integration] ol').length,
        searchVisible: Boolean(searchTrigger?.getBoundingClientRect().height),
        searchLabel: searchTrigger?.querySelector('span')?.textContent?.replace(/\\s+/g, ' ').trim() ?? '',
        searchAriaLabel: searchTrigger?.getAttribute('aria-label') ?? '',
        searchHeight: searchTrigger?.getBoundingClientRect().height ?? 0,
        suggestionMinHeight: suggestionLinks.length
          ? Math.min(...suggestionLinks.map((link) => link.getBoundingClientRect().height))
          : 0,
        heroDescriptionFontSize: Number.parseFloat(
          getComputedStyle(home.querySelector('p[class*="heroDescription"]')).fontSize,
        ),
        graphicDisplay: graphic ? getComputedStyle(graphic).display : null,
        suggestionsDisplay: getComputedStyle(home.querySelector('div[class*="suggestions"]')).display,
        productColumns: columnCount('div[class*="productGrid"]'),
        documentColumns: columnCount('div[class*="documentGrid"]'),
        navigationCoversHeroTitle: Boolean(
          header && heroHeading && header.getBoundingClientRect().bottom > heroHeading.getBoundingClientRect().top,
        ),
        supportLinks: [...home.querySelectorAll('section[id="support"] a')]
          .map((link) => ({ href: link.getAttribute('href'), text: link.textContent.replace(/\\s+/g, ' ').trim() })),
        internalLinks,
        unnamedControls,
        bannedCopy: [
          'ecosystem.ods.vn',
          'LIVE SESSION',
          'LIVE PREVIEW',
          'ONLINE',
          'SYNCED',
          '24/7/365 SLA',
          'Hệ thống tài liệu: Trực tuyến',
        ].some((label) => text.toLocaleLowerCase('vi').includes(label.toLocaleLowerCase('vi'))),
      };
    })()`,
  );
}

async function testInteractions(client) {
  const integrationState = await evaluate(
    client,
    `(() => {
      const links = [...document.querySelectorAll('[data-home-integration-link]')];
      links[0]?.focus();
      return {
        ids: links.map((link) => link.dataset.homeIntegrationLink),
        hrefs: links.map((link) => link.getAttribute('href')),
        focus: document.activeElement?.dataset.homeIntegrationLink,
        tabs: document.querySelectorAll('[role="tab"]').length,
      };
    })()`,
  );
  assert(
    integrationState.ids.join(',') === 'api,webhook',
    'Khối tích hợp không có đúng hai điểm vào API và Webhook.',
  );
  assert(
    integrationState.hrefs[0] === '/docs/ai-contact-center/api' &&
      integrationState.hrefs[1]?.includes('/webhook-va-popup'),
    'Khối tích hợp không dùng đúng route public đã xác minh.',
  );
  assert(integrationState.focus === 'api', 'Link tích hợp không nhận keyboard focus.');
  assert(integrationState.tabs === 0, 'Khối tích hợp vẫn còn tab không cần thiết.');
}

async function dispatchKey(client, key, code, windowsVirtualKeyCode) {
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyDown', key, code, windowsVirtualKeyCode,
  });
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyUp', key, code, windowsVirtualKeyCode,
  });
}

async function testHeroMotion(client) {
  await evaluate(client, `document.querySelector('[data-motion-toggle]').click()`);
  await delay(100);
  const pauseState = await evaluate(
    client,
    `(() => {
      const toggle = document.querySelector('[data-motion-toggle]');
      const root = document.querySelector('[data-hero-ecosystem]');
      const floating = document.querySelector('[data-orbit-float]');
      return {
        pressed: toggle.getAttribute('aria-pressed'),
        paused: root.dataset.motionPaused,
        playState: getComputedStyle(floating).animationPlayState,
      };
    })()`,
  );
  assert(
    pauseState.pressed === 'true' && pauseState.paused === 'true' && pauseState.playState === 'paused',
    'Nút pause không dừng motion của hero.',
  );

  await evaluate(
    client,
    `window.scrollTo(0, 0); document.querySelector('[data-motion-toggle]').click()`,
  );
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate(client, `document.querySelector('[data-hero-ecosystem]').dataset.motionPaused === 'false'`)) break;
    await delay(50);
  }
  assert(
    await evaluate(client, `document.querySelector('[data-hero-ecosystem]').dataset.motionPaused === 'false'`),
    'Nút motion không tiếp tục animation sau khi resume.',
  );
  const focusState = await evaluate(
    client,
    `(() => {
      const link = document.querySelector('[data-core-product]');
      link.focus();
      return {
        resumed: document.querySelector('[data-hero-ecosystem]').dataset.motionPaused,
        localPlayState: getComputedStyle(link.querySelector('[data-orbit-float]')).animationPlayState,
        focused: document.activeElement === link,
      };
    })()`,
  );
  assert(
    focusState.localPlayState === 'paused' && focusState.focused,
    `Focus không pause thẻ hero tương ứng: ${JSON.stringify(focusState)}.`,
  );

  await evaluate(client, `document.activeElement.blur(); window.scrollTo(0, document.body.scrollHeight)`);
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate(client, `document.querySelector('[data-hero-ecosystem]').dataset.motionPaused === 'true'`)) break;
    await delay(50);
  }
  assert(
    await evaluate(client, `document.querySelector('[data-hero-ecosystem]').dataset.motionPaused === 'true'`),
    'Hero không tự pause khi ngoài viewport.',
  );
  await evaluate(client, `window.scrollTo(0, 0)`);
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate(client, `document.querySelector('[data-hero-ecosystem]').dataset.motionPaused === 'false'`)) break;
    await delay(50);
  }
  assert(
    await evaluate(client, `document.querySelector('[data-hero-ecosystem]').dataset.motionPaused === 'false'`),
    'Hero không tiếp tục motion khi trở lại viewport.',
  );
}

async function testDocsMenu(client) {
  assert(
    await evaluate(
      client,
      `(() => {
        const trigger = document.querySelector('[data-docs-menu-trigger]');
        trigger.focus();
        trigger.click();
        return trigger.tagName === 'BUTTON' && document.activeElement === trigger;
      })()`,
    ),
    'Menu trigger không dùng button semantics hoặc không nhận focus.',
  );
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate(client, `Boolean(document.querySelector('[data-docs-menu-panel]'))`)) break;
    await delay(50);
  }
  assert(
    await evaluate(client, `Boolean(document.querySelector('[data-docs-menu-panel]'))`),
    'Button trigger không mở menu tài liệu sản phẩm.',
  );

  const menuState = await evaluate(
    client,
    `(() => {
      const panel = document.querySelector('[data-docs-menu-panel]');
      const entries = [...panel.querySelectorAll('[data-docs-menu-entry]')];
      return {
        width: panel.getBoundingClientRect().width,
        labels: entries.map((entry) => entry.textContent.replace(/\\s+/g, ' ').trim()),
        hrefs: entries.map((entry) => entry.getAttribute('href')),
        minHeight: Math.min(...entries.map((entry) => entry.getBoundingClientRect().height)),
        text: panel.textContent,
      };
    })()`,
  );
  assert(menuState.width >= 340 && menuState.width <= 400, `Menu rộng ngoài 340–400px: ${menuState.width}.`);
  assert(menuState.minHeight >= 44, 'Entry menu nhỏ hơn touch target 44px.');
  assert(
    menuState.labels.join('|') ===
      'Hướng dẫn sử dụng|API Reference|Hướng dẫn sử dụng|Duyệt tất cả tài liệu',
    'Menu không có đúng các entry canonical.',
  );
  assert(
    menuState.hrefs.join('|') ===
      '/docs/ai-contact-center/portal|/docs/ai-contact-center/api|/docs/cloudfile|/docs',
    'Menu không dùng đúng route tài liệu hiện có.',
  );
  assert(
    !/ODS Docs Hub|Sẵn sàng|Không gian Tài liệu Kỹ thuật|\/docs\)/.test(menuState.text),
    'Menu còn badge, intro hoặc technical path không cần thiết.',
  );

  await dispatchKey(client, 'Tab', 'Tab', 9);
  assert(
    await evaluate(client, `document.activeElement?.hasAttribute('data-docs-menu-entry')`),
    'Tab không đưa focus vào entry đầu tiên của menu.',
  );
  await dispatchKey(client, 'Escape', 'Escape', 27);
  await delay(100);
  assert(
    await evaluate(
      client,
      `!document.querySelector('[data-docs-menu-panel]') && document.activeElement === document.querySelector('[data-docs-menu-trigger]')`,
    ),
    'Escape không đóng menu và trả focus về trigger.',
  );

  await evaluate(
    client,
    `(() => {
      const trigger = document.querySelector('[data-docs-menu-trigger]');
      trigger.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' }));
      trigger.click();
    })()`,
  );
  await delay(100);
  assert(
    await evaluate(
      client,
      `document.querySelector('[data-docs-menu-trigger]').getAttribute('aria-expanded') === 'true' && Boolean(document.querySelector('[data-docs-menu-panel]'))`,
    ),
    'Touch không mở menu tài liệu sản phẩm.',
  );
  await evaluate(
    client,
    `document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' }))`,
  );
  await delay(100);
  assert(
    await evaluate(client, `!document.querySelector('[data-docs-menu-panel]')`),
    'Pointer outside không đóng menu.',
  );
}

async function setSearch(client, value) {
  await evaluate(
    client,
    `(() => {
      const input = document.querySelector('[data-fd-search-dialog-input]');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, ${JSON.stringify(value)});
      input.dispatchEvent(new Event('input', { bubbles: true }));
    })()`,
  );
}

async function testSearch(client) {
  await evaluate(client, `document.querySelector('[data-home-search-trigger]')?.click()`);
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (await evaluate(client, `Boolean(document.querySelector('[data-fd-search-dialog-input]'))`)) break;
    await delay(50);
  }
  assert(
    await evaluate(client, `Boolean(document.querySelector('[data-fd-search-dialog-input]'))`),
    'Click search trigger không mở Fumadocs search.',
  );
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27,
  });
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27,
  });
  await delay(250);

  await evaluate(
    client,
    `window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))`,
  );
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (await evaluate(client, `Boolean(document.querySelector('[data-fd-search-dialog-input]'))`)) break;
    await delay(50);
  }
  assert(
    await evaluate(client, `Boolean(document.querySelector('[data-fd-search-dialog-input]'))`),
    'Ctrl+K không mở Fumadocs search.',
  );
  assert(
    await evaluate(
      client,
      `document.querySelector('#ods-search-scope')?.value === 'all' && ![...document.querySelector('#ods-search-scope').options].some((option) => option.value === 'internal')`,
    ),
    'Search homepage không dùng public scope an toàn.',
  );

  await setSearch(client, 'máy nhánh');
  let resultReady = false;
  for (let attempt = 0; attempt < 200; attempt += 1) {
    resultReady = await evaluate(
      client,
      `document.querySelectorAll('.ods-search-result').length > 0 && !/Đang tìm kiếm/.test(document.getElementById('fd-search-dialog-content')?.textContent ?? '')`,
    );
    if (resultReady) break;
    await delay(100);
  }
  assert(resultReady, 'Search máy nhánh không trả kết quả.');
  assert(
    await evaluate(
      client,
      `![...document.querySelectorAll('.ods-search-result[href]')].some((item) => item.getAttribute('href')?.startsWith('/internal'))`,
    ),
    'Public search trả link internal.',
  );

  await setSearch(client, 'zzzzzzzzzzzzzzzzzzzzzzzzzzzz');
  let emptyReady = false;
  let emptySnapshot = null;
  for (let attempt = 0; attempt < 200; attempt += 1) {
    emptySnapshot = await evaluate(
      client,
      `(() => {
        const content = document.getElementById('fd-search-dialog-content')?.textContent ?? '';
        return {
          content,
          input: document.querySelector('[data-fd-search-dialog-input]')?.value,
          resultCount: document.querySelectorAll('.ods-search-result').length,
          loading: /Đang tìm kiếm/.test(content),
        };
      })()`,
    );
    emptyReady = /Không tìm thấy kết quả/i.test(emptySnapshot.content);
    if (emptyReady) break;
    await delay(100);
  }
  assert(
    emptyReady,
    `Search không hiển thị empty state: ${JSON.stringify(emptySnapshot)}`,
  );

  await client.send('Input.dispatchKeyEvent', {
    type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27,
  });
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27,
  });
  await delay(250);
  assert(
    await evaluate(
      client,
      `!document.getElementById('fd-search-dialog-content') || document.getElementById('fd-search-dialog-content').hasAttribute('data-closed')`,
    ),
    'Escape không đóng Search dialog.',
  );
}

async function writeFullPageScreenshot(client, filePath, viewportWidth) {
  await evaluate(
    client,
    `(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    })()`,
  );
  await delay(150);
  const { contentSize } = await client.send('Page.getLayoutMetrics');
  const screenshot = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    fromSurface: true,
    clip: {
      x: 0,
      y: 0,
      width: viewportWidth,
      height: Math.ceil(contentSize.height),
      scale: 1,
    },
  });
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, screenshot.data, 'base64');
}

async function main() {
  const configuredBaseUrl = process.env.HOME_V4_BASE_URL?.replace(/\/$/, '');
  const appPort = configuredBaseUrl ? null : await getFreePort();
  const baseUrl = configuredBaseUrl ?? `http://127.0.0.1:${appPort}`;
  const server = configuredBaseUrl
    ? null
    : spawnStandaloneServer(appPort, {
        unsetEnv: ['ODS_INTERNAL_DEV_OPEN'],
      });
  let serverOutput = '';
  server?.stdout.on('data', (chunk) => { serverOutput += chunk.toString(); });
  server?.stderr.on('data', (chunk) => { serverOutput += chunk.toString(); });

  const chromeProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'ods-task030-chrome-'));
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
  try {
    await waitForServer(baseUrl);
    const activePortFile = path.join(chromeProfile, 'DevToolsActivePort');
    await waitForFile(activePortFile);
    const [debugPort] = fs.readFileSync(activePortFile, 'utf8').trim().split(/\r?\n/);
    const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
    const pageTarget = targets.find((target) => target.type === 'page');
    if (!pageTarget) throw new Error('Chrome không có page target.');

    client = new CdpClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();
    client.on('Runtime.exceptionThrown', (event) => {
      pageErrors.push(event.exceptionDetails?.exception?.description ?? event.exceptionDetails?.text);
    });
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    const results = [];
    for (const width of [...desktopWidths, ...mobileWidths]) {
      await setViewport(client, width);
      await navigateHome(client, baseUrl);
      for (const theme of ['light', 'dark']) {
        await setTheme(client, theme);
        const measurement = await measureHome(client);
        assert(
          measurement.documentWidth <= measurement.viewportWidth,
          `${width}px ${theme}: homepage tràn ngang ${measurement.documentWidth}/${measurement.viewportWidth}.`,
        );
        assert(measurement.title === 'Tài liệu sản phẩm ODS', `${width}px ${theme}: H1 không đúng.`);
        assert(measurement.intentCount === 0, `${width}px ${theme}: còn lớp intent card trùng lặp.`);
        assert(measurement.coreProductCount === 5, `${width}px ${theme}: cần đúng 5 giải pháp cốt lõi.`);
        assert(
          measurement.coreProductHrefs.join(',') ===
            '#solution-ai-customer-experience,#solution-cloud-services,#solution-digital-infrastructure,#solution-managed-services,#solution-software-license',
          `${width}px ${theme}: thẻ hero không trỏ đúng anchor giải pháp.`,
        );
        assert(measurement.coreProductTargetCount === 5, `${width}px ${theme}: thiếu target cho thẻ hero.`);
        assert(measurement.coreProductMicroLabelCount === 0, `${width}px ${theme}: còn micro-label Giải pháp ODS.`);
        assert(measurement.connectionCount === 5, `${width}px ${theme}: thiếu đường kết nối hero.`);
        assert(
          measurement.hubText === 'ODS Documentation Một nơi tra cứu. Hướng dẫn theo từng giải pháp.',
          `${width}px ${theme}: nội dung hub không đúng (${JSON.stringify(measurement.hubText)}).`,
        );
        assert(measurement.solutionGroupCount === 5, `${width}px ${theme}: cần đúng 5 nhóm giải pháp.`);
        assert(measurement.productCount === 2, `${width}px ${theme}: số product card không đúng.`);
        assert(measurement.productGuideLinkCount === 6, `${width}px ${theme}: số điểm vào sản phẩm không đúng.`);
        assert(measurement.documentCount === 6, `${width}px ${theme}: số tài liệu không đúng.`);
        assert(measurement.libraryFilterCount === 0, `${width}px ${theme}: còn bộ lọc thư viện không cần thiết.`);
        assert(measurement.librarySummary.includes('6 tài liệu'), `${width}px ${theme}: tổng tài liệu không chính xác.`);
        assert(measurement.journeyTabCount === 0, `${width}px ${theme}: còn journey tab không cần thiết.`);
        assert(measurement.integrationLinkCount === 2, `${width}px ${theme}: khối tích hợp không có đúng 2 điểm vào.`);
        assert(measurement.fakeStepCount === 0, `${width}px ${theme}: còn bước tích hợp giả.`);
        assert(measurement.searchVisible, `${width}px ${theme}: search trigger không hiển thị.`);
        assert(
          measurement.searchLabel === 'Tìm sản phẩm, chức năng hoặc tài liệu…' &&
            measurement.searchAriaLabel === 'Tìm sản phẩm, chức năng hoặc tài liệu',
          `${width}px ${theme}: nhãn search không đúng (${JSON.stringify({ visible: measurement.searchLabel, aria: measurement.searchAriaLabel })}).`,
        );
        assert(measurement.internalLinks.length === 0, `${width}px ${theme}: homepage link sang internal.`);
        assert(measurement.unnamedControls === 0, `${width}px ${theme}: có control không có accessible name.`);
        assert(!measurement.bannedCopy, `${width}px ${theme}: còn nhãn/trạng thái giả bị cấm.`);
        assert(
          measurement.supportLinks.length === 2 &&
            measurement.supportLinks[0].href === 'mailto:support@ods.vn' &&
            measurement.supportLinks[0].text.includes('support@ods.vn') &&
            measurement.supportLinks[1].href === 'tel:19006634' &&
            measurement.supportLinks[1].text.includes('1900 6634'),
          `${width}px ${theme}: kênh hỗ trợ không đúng.`,
        );
        if (mobileWidths.includes(width)) {
          assert(measurement.graphicDisplay === 'none', `${width}px ${theme}: hero graphic chưa ẩn trên mobile.`);
          assert(measurement.suggestionsDisplay !== 'none', `${width}px ${theme}: quick suggestion bị ẩn.`);
          assert(measurement.productColumns === 1, `${width}px ${theme}: product card chưa về một cột.`);
          assert(measurement.documentColumns === 1, `${width}px ${theme}: danh sách tài liệu chưa về một cột.`);
          assert(measurement.searchHeight >= 44, `${width}px ${theme}: search nhỏ hơn touch target 44px.`);
          assert(measurement.suggestionMinHeight >= 44, `${width}px ${theme}: suggestion nhỏ hơn touch target 44px.`);
          assert(measurement.heroDescriptionFontSize >= 16, `${width}px ${theme}: mô tả hero nhỏ hơn 16px.`);
          assert(!measurement.navigationCoversHeroTitle, `${width}px ${theme}: navigation che tiêu đề hero.`);
        } else {
          assert(measurement.graphicDisplay !== 'none', `${width}px ${theme}: hero graphic bị ẩn trên desktop.`);
          assert(measurement.motionToggleVisible, `${width}px ${theme}: thiếu nút điều khiển motion.`);
          assert(measurement.motionToggleSize >= 44, `${width}px ${theme}: nút motion nhỏ hơn 44px.`);
          assert(
            measurement.hubAnimation?.includes('hero-hub-enter') && measurement.hubAnimationIterations === '1',
            `${width}px ${theme}: hub không có entrance một lần.`,
          );
          assert(
            measurement.coreProductAnimation?.includes('hero-product'),
            `${width}px ${theme}: animation giải pháp cốt lõi chưa hoạt động.`,
          );
        }
        results.push({ width, theme, ...measurement });
      }
    }

    await setViewport(client, 1440);
    await navigateHome(client, baseUrl);
    await setTheme(client, 'light');
    await client.send('Emulation.setEmulatedMedia', {
      features: [
        { name: 'prefers-color-scheme', value: 'light' },
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ],
    });
    const reducedMotion = await evaluate(
      client,
      `(async () => {
          await new Promise(requestAnimationFrame);
          await new Promise(requestAnimationFrame);
          const item = document.querySelector('[data-core-product]').closest('div[class*="orbitItem"]');
          return {
            floatAnimation: getComputedStyle(document.querySelector('[data-orbit-float]')).animationName,
            signalAnimation: getComputedStyle(document.querySelector('[data-orbit-connection] i')).animationName,
            itemOpacity: Number.parseFloat(getComputedStyle(item).opacity),
          };
        })()`,
    );
    assert(
      reducedMotion.floatAnimation === 'none' &&
        reducedMotion.signalAnimation === 'none' &&
        reducedMotion.itemOpacity === 1,
      `Reduced Motion chưa tắt floating/signal hoặc chưa hiển thị nội dung ngay: ${JSON.stringify(reducedMotion)}.`,
    );
    await setTheme(client, 'light');
    await testInteractions(client);
    await testHeroMotion(client);
    await testDocsMenu(client);
    await testSearch(client);

    const outputDir = path.join('.harness', 'reports', 'assets', 'TASK-030');
    for (const [width, label] of [[1440, 'desktop'], [390, 'mobile']]) {
      await setViewport(client, width);
      for (const theme of ['light', 'dark']) {
        await evaluate(client, `localStorage.setItem('theme', ${JSON.stringify(theme)})`);
        await navigateHome(client, baseUrl);
        await setTheme(client, theme);
        await delay(250);
        await writeFullPageScreenshot(
          client,
          path.join(outputDir, `home-${label}-${width}-${theme}.png`),
          width,
        );
      }
    }

    assert(pageErrors.length === 0, `Phát hiện page error: ${pageErrors.join(' | ')}`);
    console.log('[test:home-ui PASS] Homepage V4.1 đạt 1440/1280/390/360 ở Light/Dark.');
    console.log('[test:home-ui] Hero anchors/motion, menu sản phẩm, support channels và Fumadocs search đạt.');
    console.log(`[test:home-ui] Đã tạo 4 screenshot full page tại ${outputDir}.`);
    console.log(`[test:home-ui] ${results.length} tổ hợp viewport/theme không tràn ngang.`);
  } catch (error) {
    console.error(`[test:home-ui FAIL] ${error.message}`);
    if (serverOutput) console.error(serverOutput.slice(-1800));
    process.exitCode = 1;
  } finally {
    client?.close();
    killProcessTree(chrome.pid);
    killProcessTree(server?.pid);
    await delay(500);
    try {
      fs.rmSync(chromeProfile, { recursive: true, force: true, maxRetries: 8, retryDelay: 250 });
    } catch (error) {
      console.warn(`[test:home-ui] Không thể dọn Chrome profile tạm: ${error.message}`);
    }
  }
}

await main();
