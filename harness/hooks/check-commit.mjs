#!/usr/bin/env node
/**
 * check-commit.mjs - Hook kiểm tra trước khi commit hoặc hoàn thành task.
 *
 * Chạy typecheck, guard, và broken-links linter.
 */

import { execSync } from 'node:child_process';

function run(cmd, desc) {
  console.log(`\n[Hook] Đang chạy: ${desc} (${cmd})...`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch {
    console.error(`\n[Hook FAIL] Thất bại tại bước: ${desc}`);
    process.exit(1);
  }
}

run('npm run typecheck', 'Kiểm tra Type Safety');
run('npm run guard', 'Kiểm tra Guardrail ranh giới bảo mật');
run('node harness/linters/broken-links.mjs', 'Kiểm tra liên kết gãy MDX');

console.log('\n[Hook PASS] Tất cả tiêu chí an toàn đều đạt chuẩn!\n');
