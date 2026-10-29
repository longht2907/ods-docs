import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function copyRuntimeAssets(projectRoot, standaloneRoot) {
  const publicSource = path.join(projectRoot, 'public');
  const staticSource = path.join(projectRoot, '.next', 'static');
  const staticTarget = path.join(standaloneRoot, '.next', 'static');

  if (fs.existsSync(publicSource)) {
    fs.cpSync(publicSource, path.join(standaloneRoot, 'public'), {
      recursive: true,
      force: true,
    });
  }

  if (!fs.existsSync(staticSource)) {
    throw new Error('Thiếu .next/static. Hãy chạy npm run build trước khi chạy regression test.');
  }

  fs.mkdirSync(path.dirname(staticTarget), { recursive: true });
  fs.cpSync(staticSource, staticTarget, { recursive: true, force: true });
}

export function spawnStandaloneServer(port, options = {}) {
  const projectRoot = options.projectRoot ?? process.cwd();
  const standaloneRoot = path.join(projectRoot, '.next', 'standalone');
  const serverPath = path.join(standaloneRoot, 'server.js');

  if (!fs.existsSync(serverPath)) {
    throw new Error('Thiếu .next/standalone/server.js. Hãy chạy npm run build trước khi chạy regression test.');
  }

  copyRuntimeAssets(projectRoot, standaloneRoot);

  const env = {
    ...process.env,
    ...options.env,
    HOSTNAME: '127.0.0.1',
    PORT: String(port),
  };
  for (const name of options.unsetEnv ?? []) delete env[name];

  return spawn(process.execPath, [serverPath], {
    cwd: projectRoot,
    env,
    detached: process.platform !== 'win32',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}
