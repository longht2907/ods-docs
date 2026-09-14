#!/usr/bin/env node
/**
 * broken-links.mjs - Kiểm tra các liên kết nội bộ trong file MDX.
 *
 * Quét toàn bộ content/docs và content/internal để tìm các đường dẫn gãy.
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

function walkMdx(dir) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  const files = [];
  const stack = [full];
  while (stack.length) {
    const cur = stack.pop();
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const p = path.join(cur, entry.name);
      if (entry.isDirectory()) {
        stack.push(p);
      } else if (/\.mdx?$/.test(entry.name)) {
        files.push(path.relative(root, p).replace(/\\/g, '/'));
      }
    }
  }
  return files;
}

// Tập hợp tất cả các slug hợp lệ
const validRoutes = new Set(['/docs', '/internal']);

function registerValidRoutes(baseDir, baseRoute) {
  const files = walkMdx(baseDir);
  for (const f of files) {
    // bỏ prefix baseDir
    const rel = f.replace(new RegExp(`^${baseDir}/?`), '');
    const withoutExt = rel.replace(/\.mdx?$/, '');
    const parts = withoutExt.split('/');
    if (parts[parts.length - 1] === 'index') {
      parts.pop();
    }
    const route = parts.length ? `${baseRoute}/${parts.join('/')}` : baseRoute;
    validRoutes.add(route);
  }
}

registerValidRoutes('content/docs', '/docs');
registerValidRoutes('content/internal', '/internal');

// Quét link trong từng file
const allFiles = [...walkMdx('content/docs'), ...walkMdx('content/internal')];
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

for (const file of allFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  let match;
  while ((match = LINK_RE.exec(content)) !== null) {
    const rawTarget = match[2].trim();
    // Bỏ qua external link, mailto, anchor nội bộ (#), hoặc link sang llms
    if (
      rawTarget.startsWith('http://') ||
      rawTarget.startsWith('https://') ||
      rawTarget.startsWith('mailto:') ||
      rawTarget.startsWith('#') ||
      rawTarget.startsWith('/llms')
    ) {
      continue;
    }

    // Bỏ query params và hash
    const cleanPath = rawTarget.split('?')[0].split('#')[0].replace(/\/$/, '');

    if (cleanPath.startsWith('/docs') || cleanPath.startsWith('/internal')) {
      if (!validRoutes.has(cleanPath)) {
        errors.push(`${file}: Liên kết gãy tới "${rawTarget}"`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error('\n[Linter] Phát hiện liên kết gãy:');
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log('[Linter] Toàn bộ liên kết nội bộ trong MDX đều hợp lệ.');
}
