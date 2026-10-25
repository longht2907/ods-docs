#!/usr/bin/env node
// Node 22.18+ supports stripping type-only imports in the flow data files.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import GithubSlugger from 'github-slugger';
import { getFreePort, killProcessTree, waitForServer } from './helpers/browser.mjs';
const root = process.cwd();
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const pages = walk('content/internal').filter(p => p.endsWith('.mdx')).map(p => ({ path: p.split(path.sep).join('/'), text: fs.readFileSync(p, 'utf8') }));
const routes = new Set(pages.map(p => '/' + p.path.replace(/^content\//,'').replace(/\([^/]+\)\//g,'').replace(/\/index\.mdx$/,'').replace(/\.mdx$/,'')));
const removed = [
  'cloudfone-4u/odoo_service_detail.png', 'cloudfone-4u/odoo_services_list.png',
  'cloudfone-4u/portal_cloudfone_add_form.png', 'cloudfone-4u/portal_cloudfone_share_list.png',
  'virtual-pbx/odoo_generate_password.png', 'virtual-pbx/odoo_service_start.png',
  'virtual-pbx/portal_allocate_service.png', 'virtual-pbx/portal_unused_ips.png',
].map(p => '/media/ai-contact-center/' + p);
for (const url of removed) {
  assert(!fs.existsSync('public' + url), `Sensitive asset remains: ${url}`);
  assert(!pages.some(p => p.text.includes(url)), `Sensitive image reference remains: ${url}`);
}
for (const page of pages.filter(p => /deployments\/(cloudfone-4u|virtual-pbx)\.mdx$/.test(p.path))) {
  assert(!/[\w.+-]+@(gmail|yahoo|outlook)\.com/i.test(page.text), `Personal contact in ${page.path}`);
  assert(!/103\.129\./.test(page.text), `Live customer infrastructure in ${page.path}`);
}
const codes = fs.readFileSync('content/internal/(home)/service-codes.mdx', 'utf8');
for (const label of ['Wadmin', 'AC', 'DC', 'DM', 'WinSer', 'Web Admin', 'Admin Cloud']) assert(codes.includes(label), `Missing taxonomy: ${label}`);
const license = fs.readFileSync('content/internal/software-license/processes/license-registration.mdx', 'utf8');
assert(license.includes('9602') && license.includes('DirectAdmin') && license.includes('License ID'), 'License source mapping absent');
const reclaim = fs.readFileSync('content/internal/network/processes/ip-reclaim.mdx', 'utf8');
assert(reclaim.includes('chưa') && reclaim.includes('xác nhận') && reclaim.includes('PDF') && reclaim.includes('Word'), 'Conflicting source warning absent');
const registry = fs.readFileSync('src/components/flowchart/index.tsx', 'utf8');
const aliases = new Map([...registry.matchAll(/'([^']+)': (\w+),/g)].map(m => [m[1], m[2]]));
let count = 0, links = 0;
const { flowchartSize, wrapLabel } = await import(pathToFileURL(path.join(root, 'src/components/flowchart/layout.ts')));
assert.throws(() => flowchartSize({ id:'bad', nodes:[], edges:[] }), /Empty/);
const valid = { id:'ok', nodes:[{id:'a',row:1,col:0,label:'test',type:'start'}], edges:[] };
assert.throws(() => flowchartSize({...valid,nodes:[...valid.nodes,...valid.nodes]}), /Duplicate/);
assert.throws(() => flowchartSize({...valid,edges:[{from:'a',to:'missing'}]}), /Missing/);
assert.throws(() => flowchartSize({...valid,nodes:[{...valid.nodes[0],row:NaN}]}), /Invalid/);
assert.deepEqual(wrapLabel('one two three', 7), ['one two', 'three']);
for (const file of walk('src/components/flowchart/data').filter(p => p.endsWith('.ts'))) {
  const exports = await import(pathToFileURL(path.join(root, file)));
  for (const [name, flow] of Object.entries(exports)) {
    const size = flowchartSize(flow);
    assert(size.width > 0 && size.height > 0);
    const flowPages = pages.filter(p => [...p.text.matchAll(/<ProcessFlowchart flowId="([^"]+)"/g)].some(m => aliases.get(m[1]) === name));
    assert(flowPages.length, `Unreferenced flow ${name}`);
    for (const page of flowPages) {
      const slugger = new GithubSlugger();
      const headings = new Set([...page.text.matchAll(/^#{1,6} (.+)$/gm)].map(m => '#' + slugger.slug(m[1].replace(/\*\*/g, ''))));
      for (const node of flow.nodes) {
        if (node.stepLink) { assert(headings.has(node.stepLink), `Broken ${flow.id}: ${node.stepLink} in ${page.path}`); links++; }
        if (node.refUrl) assert(routes.has(node.refUrl.split('#')[0]), `Missing internal reference: ${node.refUrl}`);
      }
    }
    count++;
  }
}
const port = await getFreePort();
const server = spawn(process.execPath, [path.resolve('node_modules/next/dist/bin/next'), 'start', '-p', String(port)], { detached:process.platform !== 'win32', env:{ ...process.env, ODS_INTERNAL_DEV_OPEN:undefined }, stdio:'ignore' });
try {
  const base = `http://127.0.0.1:${port}`;
  await waitForServer(base + '/docs');
  assert.equal((await fetch(base + '/internal', { redirect:'manual' })).status, 401);
  for (const url of removed) assert.equal((await fetch(base + url, { redirect:'manual' })).status, 404, `Public exposure: ${url}`);
} finally { killProcessTree(server.pid); }
console.log(`[test:internal-content PASS] ${count} flows, ${links} valid step links; sensitive assets absent/404; internal still 401. Git history is NOT covered.`);
