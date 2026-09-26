#!/usr/bin/env node
/**
 * routes.test.mjs - Tự khởi động Next.js dev server trên port rảnh,
 * chạy các test route public/internal và tự tắt server khi kết thúc.
 */

import { spawn, execSync } from 'node:child_process';
import net from 'node:net';

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
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
    // Process da ket thuc hoac khong the kill tiep
  }
}

async function waitForServer(url, maxRetries = 40, interval = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.status === 200) {
        return true;
      }
    } catch {
      // Server chua san sang
    }
    await new Promise((r) => setTimeout(r, interval));
  }
  return false;
}

async function checkRoute(baseUrl, path, expectedStatus, desc) {
  const url = `${baseUrl}${path}`;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const pass = res.status === expectedStatus;
    const mark = pass ? '✓' : '✗';
    console.log(`  ${mark} ${desc} [${path}] -> mong đợi ${expectedStatus}, thực tế ${res.status}`);
    return pass;
  } catch (err) {
    console.error(`  ✗ Lỗi kết nối tới ${url}: ${err.message}`);
    return false;
  }
}

async function main() {
  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`\n[test:routes] Khởi động Next production server tại ${baseUrl}...`);

  // Ép ODS_INTERNAL_DEV_OPEN về undefined trong tiến trình con
  const env = { ...process.env };
  delete env.ODS_INTERNAL_DEV_OPEN;

  const isWin = process.platform === 'win32';
  const serverProc = spawn('npx', ['next', 'start', '-p', String(port)], {
    env,
    shell: true,
    detached: !isWin,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverOutput = '';
  serverProc.stdout.on('data', (d) => {
    serverOutput += d.toString();
  });
  serverProc.stderr.on('data', (d) => {
    serverOutput += d.toString();
  });

  let allPassed = false;
  try {
    const ready = await waitForServer(`${baseUrl}/docs`, 45, 1000);
    if (!ready) {
      console.error('\n[test:routes FAIL] Server không khởi động kịp sau 45s.');
      console.error(serverOutput.slice(-1000));
      process.exit(1);
    }

    console.log('[test:routes] Server đã sẵn sàng. Bắt đầu kiểm tra 12 cases:');

    let passedCases = true;

    // 1-7. Các route public chính phải trả về 200
    const t1 = await checkRoute(baseUrl, '/', 200, 'Home hub accessible');
    passedCases = passedCases && t1;

    const t2 = await checkRoute(baseUrl, '/docs', 200, 'Public docs accessible');
    passedCases = passedCases && t2;

    const t3 = await checkRoute(baseUrl, '/docs/ai-contact-center', 200, 'AI Contact Center docs accessible');
    passedCases = passedCases && t3;

    const t4 = await checkRoute(baseUrl, '/docs/cloudfile', 200, 'CloudFile docs accessible');
    passedCases = passedCases && t4;

    const t5 = await checkRoute(baseUrl, '/docs/ai-contact-center/user-guider-portal', 200, 'Portal guide accessible');
    passedCases = passedCases && t5;

    const t6 = await checkRoute(baseUrl, '/docs/ai-contact-center/api', 200, 'API reference accessible');
    passedCases = passedCases && t6;

    const t7 = await checkRoute(baseUrl, '/api/search', 200, 'Public search API accessible');
    passedCases = passedCases && t7;

    // 8-12. Vùng internal tiếp tục fail-closed
    const t8 = await checkRoute(baseUrl, '/internal', 401, 'Internal root blocked');
    passedCases = passedCases && t8;

    const t9 = await checkRoute(baseUrl, '/internal/', 401, 'Internal trailing slash blocked');
    passedCases = passedCases && t9;

    const t10 = await checkRoute(baseUrl, '/internal/onboarding', 401, 'Internal subpage blocked');
    passedCases = passedCases && t10;

    const t11 = await checkRoute(baseUrl, '/api/search/internal', 401, 'Internal search API blocked');
    passedCases = passedCases && t11;

    const t12 = await checkRoute(baseUrl, '/api/search/internal/', 401, 'Internal search API trailing slash blocked');
    passedCases = passedCases && t12;

    if (!passedCases) {
      console.error('\n[test:routes FAIL] Một hoặc nhiều route không đạt mã HTTP mong đợi.');
      allPassed = false;
    } else {
      console.log('\n[test:routes PASS] Toàn bộ 12/12 route test case đều đạt chuẩn.\n');
      allPassed = true;
    }
  } finally {
    console.log('[test:routes] Đang tắt server...');
    killProcessTree(serverProc.pid);
    process.exit(allPassed ? 0 : 1);
  }
}

main();
