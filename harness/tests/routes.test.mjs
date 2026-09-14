#!/usr/bin/env node
/**
 * routes.test.mjs - Tự khởi động Next.js dev server trên port rảnh,
 * chạy 7 test case bảo vệ ranh giới và tự tắt server khi kết thúc.
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
      process.kill(-pid, 'SIGKILL');
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
    let res = await fetch(url, { redirect: 'manual' });
    // Nếu Next.js redirect trailing slash (308), follow redirect để kiểm tra mã bảo vệ cuối cùng
    if (res.status === 308 && path.endsWith('/')) {
      res = await fetch(url);
    }
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
  console.log(`\n[test:routes] Khởi động Next dev server tại ${baseUrl}...`);

  // Ép ODS_INTERNAL_DEV_OPEN về undefined trong tiến trình con
  const env = { ...process.env };
  delete env.ODS_INTERNAL_DEV_OPEN;

  const serverProc = spawn('npx', ['next', 'dev', '-p', String(port)], {
    env,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverOutput = '';
  serverProc.stdout.on('data', (d) => {
    serverOutput += d.toString();
  });
  serverProc.stderr.on('data', (d) => {
    serverOutput += d.toString();
  });

  try {
    const ready = await waitForServer(`${baseUrl}/docs`, 45, 1000);
    if (!ready) {
      console.error('\n[test:routes FAIL] Server không khởi động kịp sau 45s.');
      console.error(serverOutput.slice(-1000));
      process.exit(1);
    }

    console.log('[test:routes] Server đã sẵn sàng. Bắt đầu kiểm tra 7 cases:');

    let allPassed = true;

    // 1. /docs public phải trả về 200
    const t1 = await checkRoute(baseUrl, '/docs', 200, 'Public docs accessible');
    allPassed = allPassed && t1;

    // 2. /internal phải bị chặn 401
    const t2 = await checkRoute(baseUrl, '/internal', 401, 'Internal root blocked');
    allPassed = allPassed && t2;

    // 3. /internal/ (trailing slash) phải bị chặn 401
    const t3 = await checkRoute(baseUrl, '/internal/', 401, 'Internal trailing slash blocked');
    allPassed = allPassed && t3;

    // 4. /internal/onboarding subpage phải bị chặn 401
    const t4 = await checkRoute(baseUrl, '/internal/onboarding', 401, 'Internal subpage blocked');
    allPassed = allPassed && t4;

    // 5. /api/search/internal phải bị chặn 401
    const t5 = await checkRoute(baseUrl, '/api/search/internal', 401, 'Internal search API blocked');
    allPassed = allPassed && t5;

    // 6. /api/search/internal/ (trailing slash) phải bị chặn 401
    const t6 = await checkRoute(baseUrl, '/api/search/internal/', 401, 'Internal search API trailing slash blocked');
    allPassed = allPassed && t6;

    // 7. /api/search public phải trả về 200
    const t7 = await checkRoute(baseUrl, '/api/search', 200, 'Public search API accessible');
    allPassed = allPassed && t7;

    if (!allPassed) {
      console.error('\n[test:routes FAIL] Một hoặc nhiều route không đạt mã HTTP mong đợi.');
      process.exit(1);
    } else {
      console.log('\n[test:routes PASS] Toàn bộ 7/7 route test case đều đạt chuẩn.\n');
    }
  } finally {
    console.log('[test:routes] Đang tắt server...');
    killProcessTree(serverProc.pid);
  }
}

main();
