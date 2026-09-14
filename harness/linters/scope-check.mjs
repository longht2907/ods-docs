#!/usr/bin/env node
/**
 * scope-check.mjs - Kiểm tra các file thay đổi có nằm trong phạm vi cho phép của task.
 *
 * Ràng buộc:
 * - Nếu không tìm thấy task file tương ứng với branch: in cảnh báo, exit 0.
 * - Chỉ FAIL khi có allowlist rõ ràng và có file vượt ngoài allowlist.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function runCmd(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

// 1. Lấy tên branch hiện tại
let branch = runCmd('git branch --show-current');
if (!branch) {
  branch = runCmd('git rev-parse --abbrev-ref HEAD');
}

if (!branch || branch === 'main' || branch === 'master' || branch === 'HEAD') {
  console.log(`[scope-check] Nhánh "${branch || 'unknown'}" không phải nhánh task. Bỏ qua.`);
  process.exit(0);
}

// 2. Trích xuất mã TASK (VD: TASK-002)
const taskMatch = branch.match(/TASK-\d+/i);
if (!taskMatch) {
  console.log(`[scope-check] Nhánh "${branch}" không chứa mã TASK-XXX. Bỏ qua.`);
  process.exit(0);
}
const taskId = taskMatch[0].toUpperCase();

// 3. Tìm task file trong tasks/
const tasksDir = path.join(root, 'tasks');
if (!fs.existsSync(tasksDir)) {
  console.log('[scope-check] Thư mục tasks/ không tồn tại. Bỏ qua.');
  process.exit(0);
}

const taskFiles = fs.readdirSync(tasksDir).filter((f) =>
  f.toUpperCase().startsWith(taskId) && f.endsWith('.md')
);

if (taskFiles.length === 0) {
  console.log(`[scope-check] Cảnh báo: Không tìm thấy file task cho "${taskId}". Bỏ qua.`);
  process.exit(0);
}

const taskRelPath = `tasks/${taskFiles[0]}`;
const taskContent = fs.readFileSync(path.join(root, taskRelPath), 'utf8');

// 4. Trích xuất allowlist từ mục "Phạm vi"
const scopeMatch = taskContent.match(/##\s+Phạm vi([\s\S]*?)(?=\n##\s+|$)/i);
if (!scopeMatch) {
  console.log(`[scope-check] Không tìm thấy mục "Phạm vi" trong ${taskRelPath}. Bỏ qua.`);
  process.exit(0);
}

const scopeText = scopeMatch[1];
const allowlist = new Set();

// Thêm chính file task và báo cáo tương ứng
allowlist.add(taskRelPath);
allowlist.add('.harness/reports/**');

// Trích xuất các file dạng `- \`path/to/file\`` hoặc `- path/to/file`
const lineRegex = /^[*-]\s+(?:`([^`]+)`|([^\s—–-]+))/gm;
let m;
while ((m = lineRegex.exec(scopeText)) !== null) {
  const item = (m[1] || m[2] || '').trim().replace(/\\/g, '/');
  if (item && !item.includes(' ')) {
    allowlist.add(item);
  }
}

// Nếu package.json được phép sửa, tự động cho phép package-lock.json
if (allowlist.has('package.json')) {
  allowlist.add('package-lock.json');
}
// File auto-generated của Next.js
allowlist.add('next-env.d.ts');

// 5. Lấy danh sách file thay đổi (git diff + untracked)
const changedFiles = new Set();

function addFilesFromDiff(cmd) {
  const out = runCmd(cmd);
  if (out) {
    for (const line of out.split('\n')) {
      const f = line.trim().replace(/\\/g, '/');
      if (f) changedFiles.add(f);
    }
  }
}

// So sánh với main
addFilesFromDiff('git diff --name-only origin/main...HEAD');
if (changedFiles.size === 0) {
  addFilesFromDiff('git diff --name-only main...HEAD');
}
// Các file modified chưa commit hoặc đã stage
addFilesFromDiff('git diff --name-only HEAD');
addFilesFromDiff('git diff --name-only --cached');
// Các file mới chưa track (bỏ qua .gitignore)
addFilesFromDiff('git ls-files --others --exclude-standard');

// 6. Đối chiếu
const violations = [];
for (const file of changedFiles) {
  // Kiểm tra file có trong allowlist không (hỗ trợ cả wildcard kết thúc bằng /** hoặc /*)
  let allowed = false;
  for (const allowedPattern of allowlist) {
    if (allowedPattern === file) {
      allowed = true;
      break;
    }
    if (allowedPattern.endsWith('/**')) {
      const prefix = allowedPattern.slice(0, -3);
      if (file.startsWith(prefix + '/') || file === prefix) {
        allowed = true;
        break;
      }
    }
    if (allowedPattern.endsWith('/*')) {
      const prefix = allowedPattern.slice(0, -2);
      if (file.startsWith(prefix + '/') || file === prefix) {
        allowed = true;
        break;
      }
    }
  }

  if (!allowed) {
    violations.push(file);
  }
}

if (violations.length > 0) {
  console.error(`\n[scope-check FAIL] Có ${violations.length} file thay đổi nằm ngoài phạm vi ${taskRelPath}:`);
  for (const v of violations) {
    console.error(`  ✗ ${v}`);
  }
  process.exit(1);
}

console.log(`[scope-check PASS] Toàn bộ file thay đổi đều nằm trong phạm vi của ${taskId}.`);
