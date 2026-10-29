#!/usr/bin/env node
/**
 * routes.test.mjs - Tự khởi động Next.js dev server trên port rảnh,
 * chạy các test route public/internal và tự tắt server khi kết thúc.
 */

import { execSync } from 'node:child_process';
import net from 'node:net';
import { spawnStandaloneServer } from './helpers/standalone-server.mjs';

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

async function checkRoute(baseUrl, path, expectedStatus, desc, expectedText = []) {
  const url = `${baseUrl}${path}`;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    let contentPass = true;
    if (expectedText.length > 0) {
      const html = await res.text();
      const visibleText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
      contentPass = expectedText.every((text) => visibleText.includes(text));
    }
    const pass = res.status === expectedStatus && contentPass;
    const mark = pass ? '✓' : '✗';
    const contentResult = expectedText.length > 0
      ? `, nội dung ${contentPass ? 'đúng' : 'thiếu dữ liệu Home'}`
      : '';
    console.log(`  ${mark} ${desc} [${path}] -> mong đợi ${expectedStatus}, thực tế ${res.status}${contentResult}`);
    return pass;
  } catch (err) {
    console.error(`  ✗ Lỗi kết nối tới ${url}: ${err.message}`);
    return false;
  }
}

async function checkRedirect(baseUrl, path, expectedLocation, desc) {
  const res = await fetch(`${baseUrl}${path}`, { redirect: 'manual' });
  const location = res.headers.get('location');
  const pass = res.status === 308 && location === expectedLocation;
  console.log(
    `  ${pass ? '✓' : '✗'} ${desc} [${path}] -> mong đợi 308 ${expectedLocation}, thực tế ${res.status} ${location ?? '(không có Location)'}`,
  );
  return pass;
}

async function checkActiveSidebarRoute(baseUrl, path) {
  const res = await fetch(`${baseUrl}${path}`);
  const html = await res.text();
  const activeLinks = [...html.matchAll(
    /<a\b(?=[^>]*\bdata-active="true")(?=[^>]*\bhref="([^"]+)")[^>]*>/gi,
  )].map((match) => match[1]);
  const pass = res.status === 200 && activeLinks.includes(path);

  console.log(
    `  ${pass ? '✓' : '✗'} Portal sidebar resolves canonical active route [${path}] -> active=${activeLinks.join(', ') || '(không có)'}`,
  );
  return pass;
}

async function checkSocialMetadata(baseUrl, path) {
  const res = await fetch(`${baseUrl}${path}`);
  const html = await res.text();
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1];
  const twitterImage = html.match(/<meta name="twitter:image" content="([^"]+)"/i)?.[1];
  const images = [ogImage, twitterImage];
  const pass =
    res.status === 200 &&
    images.every((value) =>
      value && /^https?:\/\//i.test(value) && !/localhost|127\.0\.0\.1|\[::1\]/i.test(value),
    );

  console.log(
    `  ${pass ? '✓' : '✗'} Social metadata uses non-loopback absolute URLs [${path}] -> og=${ogImage ?? '(thiếu)'}, twitter=${twitterImage ?? '(thiếu)'}`,
  );
  return pass;
}

async function main() {
  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`\n[test:routes] Khởi động Next production server tại ${baseUrl}...`);

  // Ép ODS_INTERNAL_DEV_OPEN về undefined trong tiến trình con
  const env = { ...process.env };
  delete env.ODS_INTERNAL_DEV_OPEN;

  const serverProc = spawnStandaloneServer(port, {
    env,
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

    console.log('[test:routes] Server đã sẵn sàng. Bắt đầu kiểm tra 21 cases:');

    let passedCases = true;

    // 1-8. Các route public chính phải trả về 200
    const t1 = await checkRoute(baseUrl, '/', 200, 'Home hub accessible', [
      'Trung tâm tài liệu ODS',
      'Tài liệu sản phẩm ODS',
      'AI Contact Center',
      'CloudFile',
      'Hướng dẫn sử dụng',
      'API Reference',
      'Support Portal',
    ]);
    passedCases = passedCases && t1;

    const t2 = await checkRoute(baseUrl, '/docs', 200, 'Public docs accessible');
    passedCases = passedCases && t2;

    const t3 = await checkRoute(baseUrl, '/docs/ai-contact-center', 200, 'AI Contact Center docs accessible');
    passedCases = passedCases && t3;

    const t4 = await checkRoute(baseUrl, '/docs/cloudfile', 200, 'CloudFile docs accessible');
    passedCases = passedCases && t4;

    const t5 = await checkRoute(baseUrl, '/docs/ai-contact-center/portal', 200, 'Portal guide accessible');
    passedCases = passedCases && t5;

    const t6 = await checkRoute(
      baseUrl,
      '/docs/ai-contact-center/portal/cuoc-goi/giam-sat',
      200,
      'Short monitoring guide URL accessible',
    );
    passedCases = passedCases && t6;

    const tSidebar = await checkActiveSidebarRoute(
      baseUrl,
      '/docs/ai-contact-center/portal/cuoc-goi/giam-sat',
    );
    passedCases = passedCases && tSidebar;

    const t7 = await checkRoute(baseUrl, '/docs/ai-contact-center/api', 200, 'API reference accessible');
    passedCases = passedCases && t7;

    const t8 = await checkRoute(baseUrl, '/api/search', 200, 'Public search API accessible');
    passedCases = passedCases && t8;

    // 9-10. Hai API đã loại bỏ phải giữ 404, không redirect sang API khác.
    const t9 = await checkRoute(
      baseUrl,
      '/docs/ai-contact-center/api/tong-dai/lich-su-cuoc-goi/get-call-report',
      404,
      'Removed GetCallReport stays unavailable',
    );
    passedCases = passedCases && t9;

    const t10 = await checkRoute(
      baseUrl,
      '/docs/ai-contact-center/api/tong-dai/lich-su-cuoc-goi/get-call-report-detail',
      404,
      'Removed GetCallReportDetail stays unavailable',
    );
    passedCases = passedCases && t10;

    // 11-14. Redirect legacy phải đi thẳng đến canonical URL.
    const t11 = await checkRedirect(
      baseUrl,
      '/docs/ai-contact-center/api/tong-dai/khoi-tao-cuoc-goi',
      '/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call',
      'Legacy Click-to-Call redirect',
    );
    passedCases = passedCases && t11;

    const t12 = await checkRedirect(
      baseUrl,
      '/docs/ai-contact-center/user-guider-portal',
      '/docs/ai-contact-center/portal',
      'Legacy Portal root redirect',
    );
    passedCases = passedCases && t12;

    const t13 = await checkRedirect(
      baseUrl,
      '/docs/ai-contact-center/user-guider-portal/06-quan-ly-cuoc-goi/huong-dan-giam-sat-cuoc-goi',
      '/docs/ai-contact-center/portal/cuoc-goi/giam-sat',
      'Legacy monitoring guide redirect',
    );
    passedCases = passedCases && t13;

    const t14 = await checkRedirect(
      baseUrl,
      '/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/tao-cau-hinh-may-nhanh',
      '/docs/ai-contact-center/portal/tong-dai/cai-dat/tao-cau-hinh-may-nhanh',
      'Legacy nested Portal guide redirect',
    );
    passedCases = passedCases && t14;

    // 15. Social metadata phải tuyệt đối và không dùng loopback trong production build.
    const t15 = await checkSocialMetadata(
      baseUrl,
      '/docs/ai-contact-center/api/tong-dai/cuoc-goi/click-to-call',
    );
    passedCases = passedCases && t15;

    // 16-20. Vùng internal tiếp tục fail-closed.
    const t16 = await checkRoute(baseUrl, '/internal', 401, 'Internal root blocked');
    passedCases = passedCases && t16;

    const t17 = await checkRoute(baseUrl, '/internal/', 401, 'Internal trailing slash blocked');
    passedCases = passedCases && t17;

    const t18 = await checkRoute(baseUrl, '/internal/onboarding', 401, 'Internal subpage blocked');
    passedCases = passedCases && t18;

    const t19 = await checkRoute(baseUrl, '/api/search/internal', 401, 'Internal search API blocked');
    passedCases = passedCases && t19;

    const t20 = await checkRoute(baseUrl, '/api/search/internal/', 401, 'Internal search API trailing slash blocked');
    passedCases = passedCases && t20;

    if (!passedCases) {
      console.error('\n[test:routes FAIL] Một hoặc nhiều route không đạt mã HTTP mong đợi.');
      allPassed = false;
    } else {
      console.log('\n[test:routes PASS] Toàn bộ 21/21 route test case đều đạt chuẩn.\n');
      allPassed = true;
    }
  } finally {
    console.log('[test:routes] Đang tắt server...');
    killProcessTree(serverProc.pid);
    process.exit(allPassed ? 0 : 1);
  }
}

main();
