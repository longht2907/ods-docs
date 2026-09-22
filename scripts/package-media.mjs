#!/usr/bin/env node
/**
 * package-media.mjs
 * Tiện ích sao lưu hoặc đóng gói toàn bộ thư mục media tách rời khỏi Git
 * Sử dụng khi cần tải dữ liệu media lên VPS lần đầu hoặc đồng bộ sang server khác.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const rootDir = process.cwd();
const mediaDir = path.join(rootDir, 'public', 'media');
const distDir = path.join(rootDir, 'dist-media');

if (!fs.existsSync(mediaDir)) {
  console.error('[Error] Không tìm thấy thư mục public/media');
  process.exit(1);
}

fs.mkdirSync(distDir, { recursive: true });

function countFiles(dir) {
  let count = 0;
  let totalBytes = 0;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      const sub = countFiles(full);
      count += sub.count;
      totalBytes += sub.totalBytes;
    } else {
      count++;
      totalBytes += stat.size;
    }
  }
  return { count, totalBytes };
}

const stats = countFiles(mediaDir);
console.log(`[Media] Tìm thấy ${stats.count} file media (Tổng dung lượng: ${(stats.totalBytes / (1024 * 1024)).toFixed(2)} MB).`);

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const archiveName = `ods-docs-media-${timestamp}.tar.gz`;
const outputPath = path.join(distDir, archiveName);

try {
  console.log(`[Media] Đang nén thành ${archiveName}...`);
  // Dùng lệnh tar (hỗ trợ sẵn trên cả Windows 10/11 và Linux)
  execFileSync('tar', ['-czf', outputPath, '-C', path.join(rootDir, 'public'), 'media'], {
    stdio: 'inherit',
  });
  console.log(`\n[Thành công] Đã tạo gói media: ${outputPath}`);
  console.log(`\n[Hướng dẫn triển khai lên VPS]:`);
  console.log(`1. Upload file "${archiveName}" lên thư mục chứa dự án trên VPS qua SCP hoặc SFTP:`);
  console.log(`   scp ${outputPath} root@<IP_VPS>:/var/www/ods-docs/`);
  console.log(`2. Giải nén trên VPS vào thư mục volume được mount:`);
  console.log(`   tar -xzf ${archiveName} -C /var/www/ods-docs/public/`);
  console.log(`   -> Thư mục media sẽ sẵn sàng tại /var/www/ods-docs/public/media/\n`);
} catch (err) {
  console.error('[Lỗi] Không thể nén file:', err.message);
  process.exitCode = 1;
}
