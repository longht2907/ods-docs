#!/usr/bin/env node
/**
 * routes.test.mjs - Kiểm thử runtime các route và ranh giới bảo mật HTTP.
 *
 * Yêu cầu: Next.js dev server hoặc preview server đang chạy.
 * Mặc định: http://127.0.0.1:3000 (hoặc qua biến môi trường TEST_BASE_URL).
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';

async function checkRoute(path, expectedStatus, description) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const pass = res.status === expectedStatus;
    const mark = pass ? '✓' : '✗';
    console.log(`  ${mark} ${description} [${path}] -> mong đợi ${expectedStatus}, thực tế ${res.status}`);
    return pass;
  } catch (err) {
    console.error(`  ✗ Lỗi kết nối tới ${url}: ${err.message}`);
    return false;
  }
}

async function run() {
  console.log(`\nKiểm thử các route HTTP trên: ${BASE_URL}`);

  let allPassed = true;

  // 1. /docs public phải trả về 200
  const t1 = await checkRoute('/docs', 200, 'Public docs accessible');
  allPassed = allPassed && t1;

  // 2. /internal mặc định phải bị chặn 401
  const t2 = await checkRoute('/internal', 401, 'Internal docs blocked by proxy');
  allPassed = allPassed && t2;

  // 3. /internal subpath phải bị chặn 401
  const t3 = await checkRoute('/internal/onboarding', 401, 'Internal subpage blocked by proxy');
  allPassed = allPassed && t3;

  // 4. /api/search/internal phải bị chặn 401
  const t4 = await checkRoute('/api/search/internal', 401, 'Internal search API blocked by proxy');
  allPassed = allPassed && t4;

  // 5. /api/search public phải trả về 200
  const t5 = await checkRoute('/api/search', 200, 'Public search API accessible');
  allPassed = allPassed && t5;

  if (!allPassed) {
    console.error('\n=> Kiểm thử thất bại: Một hoặc nhiều route không đạt mã HTTP mong đợi.');
    process.exit(1);
  } else {
    console.log('\n=> TẤT CẢ ROUTE ĐỀU ĐẠT TIÊU CHÍ BẢO VỆ.\n');
  }
}

run();
