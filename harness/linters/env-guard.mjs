#!/usr/bin/env node
/**
 * env-guard.mjs - Kiểm tra các file môi trường .env và cấu hình .gitignore.
 *
 * Yêu cầu:
 * 1. .env, .env.local, .env.production, .env.development phải được git ignore.
 * 2. Không được phép tồn tại file .env có nội dung trong repo (phải dùng .env.local).
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const REQUIRED_IGNORES = [
  '.env',
  '.env.local',
  '.env.production',
  '.env.development',
];

for (const pattern of REQUIRED_IGNORES) {
  try {
    execSync(`git check-ignore -q "${pattern}"`, { stdio: 'pipe' });
  } catch {
    errors.push(`File/pattern "${pattern}" chưa được loại trừ trong .gitignore`);
  }
}

// Kiểm tra nếu file .env tồn tại trên đĩa và có nội dung
const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8').trim();
  if (content.length > 0) {
    errors.push('File .env tồn tại trên đĩa và có chứa nội dung. Quy tắc dự án cấm .env (dùng .env.local cho dev).');
  }
}

if (errors.length > 0) {
  console.error('\n[env-guard FAIL]');
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  process.exit(1);
} else {
  console.log('[env-guard PASS] Toàn bộ file cấu hình môi trường đều an toàn.');
}
