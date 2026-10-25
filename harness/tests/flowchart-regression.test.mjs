#!/usr/bin/env node
// Tests local dev-only internal opening. Never enables a production auth bypass.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { delay, getFreePort, killProcessTree, findChrome, waitForServer, waitForFile, CdpClient, evaluate } from './helpers/browser.mjs';
const port = await getFreePort();
const base = `http://localhost:${port}`;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ods-flowchart-'));
const server = spawn(process.execPath, [path.resolve('node_modules/next/dist/bin/next'), 'dev', '-p', String(port)], { detached:process.platform !== 'win32', env:{ ...process.env, ODS_INTERNAL_DEV_OPEN:'true' }, stdio:['ignore','pipe','pipe'] });
let logs = ''; server.stdout.on('data', c => logs += c); server.stderr.on('data', c => logs += c);
let chrome, client;
const errors = [];
async function until(expression, description) {
  for (let i=0;i<300;i++) { if (await evaluate(client, expression)) return; await delay(100); }
  throw new Error(`Timed out: ${description}`);
}
async function click(label) {
  await evaluate(client, `document.querySelector('[data-flowchart-dialog] button[aria-label="${label}"]').click()`);
  await delay(100);
}
async function key(key, code, modifiers=0) {
  await client.send('Input.dispatchKeyEvent', {type:'keyDown', key, code, modifiers, windowsVirtualKeyCode:key==='Tab'?9:key==='Escape'?27:40});
  await client.send('Input.dispatchKeyEvent', {type:'keyUp', key, code, modifiers});
  await delay(30); // Focus guards redirect on the following event loop tick.
}
try {
  await waitForServer(base + '/docs');
  chrome = spawn(findChrome(), ['--headless=new','--no-sandbox','--disable-dev-shm-usage','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'], { stdio:'ignore' });
  await waitForFile(path.join(profile, 'DevToolsActivePort'));
  const debugPort = fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  client = new CdpClient(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await client.connect();
  await client.send('Page.enable'); await client.send('Runtime.enable'); await client.send('Page.bringToFront');
  client.on('Runtime.exceptionThrown', e => errors.push(e.exceptionDetails?.text));
  const routes = ['/internal/data-center/processes/import-server', '/internal/software-license/processes/license-registration', '/internal/network/runbooks/ddos-mitigation'];
  let cases=0;
  for (const route of routes) for (const width of [1440,390]) for (const theme of ['light','dark']) {
    await client.send('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:false});
    await client.send('Page.navigate', {url:base+route});
    await until(`Boolean(document.querySelector('[data-flowchart-ready="true"]'))`, route);
    await evaluate(client, `document.documentElement.classList.remove('light','dark');document.documentElement.classList.add('${theme}')`);
    const inline = await evaluate(client, `(() => {
      const s=document.querySelector('[data-flowchart-svg]');const r=s.getBoundingClientRect();
      return {font:parseFloat(getComputedStyle(s.querySelector('text')).fontSize)*r.width/s.viewBox.baseVal.width, overflow:document.documentElement.scrollWidth>innerWidth+1};
    })()`);
    assert(inline.font >= 12, `${route} text shrunk: ${inline.font}`);
    assert(!inline.overflow, `${route} document overflow at ${width}`);
    await evaluate(client, `document.querySelector('[data-flowchart-ready="true"]').click()`);
    await until(`(() => {const d=document.querySelector('[data-flowchart-dialog]');return d&&Math.abs(d.getBoundingClientRect().width-innerWidth)<1;})()`, 'dialog settles to full viewport');
    await delay(100);
    const dimensions = await evaluate(client, `(() => {
      const d=document.querySelector('[data-flowchart-dialog]'),r=d.getBoundingClientRect();
      const ids=[...document.querySelectorAll('svg [id]')].map(e=>e.id);
      return {x:r.x,y:r.y,w:r.width,h:r.height,layoutWidth:document.documentElement.clientWidth,inside:d.contains(document.activeElement),duplicate:ids.length!==new Set(ids).size,
      svgLabels:[...d.querySelectorAll('[data-flowchart-svg]')].every(s=>s.getAttribute('role')==='img'&&s.querySelector('title')&&s.querySelector('desc'))};
    })()`);
    assert(Math.abs(dimensions.x)<1 && Math.abs(dimensions.y)<1 && Math.abs(dimensions.w-dimensions.layoutWidth)<1 && Math.abs(dimensions.h-900)<1, `Not fullscreen: ${JSON.stringify(dimensions)}`);
    assert(dimensions.inside && !dimensions.duplicate && dimensions.svgLabels, 'Focus / IDs / SVG accessibility');
    if(process.env.TASK025_CAPTURE_DIR) {
      fs.mkdirSync(process.env.TASK025_CAPTURE_DIR,{recursive:true});
      const image=await client.send('Page.captureScreenshot',{format:'png'});
      fs.writeFileSync(path.join(process.env.TASK025_CAPTURE_DIR,route.split('/').at(-1)+'-'+width+'-'+theme+'.png'),image.data,'base64');
    }
    const textOverflow = await evaluate(client, `(() => {
      const errors=[];
      for(const node of document.querySelectorAll('[data-flowchart-dialog] [data-flowchart-node]')) {
        const rect=node.querySelector('rect'),w=+rect.getAttribute('width'),h=+rect.getAttribute('height');
        for(const t of node.querySelectorAll('text')) {const b=t.getBBox();if(b.x<0||b.y<0||b.x+b.width>w+1||b.y+b.height>h+1)errors.push(node.dataset.flowchartNode);}
      } return errors;
    })()`);
    assert.equal(textOverflow.length,0,'Text overflows nodes: '+textOverflow.join(','));
    for (let i=0;i<36;i++) { await key('Tab','Tab',i>=18?1:0); assert(await evaluate(client, `document.querySelector('[data-flowchart-dialog]').contains(document.activeElement)`),'Focus escaped at Tab '+i+': '+await evaluate(client,`document.activeElement.outerHTML.slice(0,300)`)); }
    await click('Phóng to'); assert.equal(await evaluate(client,`document.querySelector('output[aria-label="Mức thu phóng"]').textContent`),'120%');
    await click('Thu nhỏ'); await click('Vừa khung');
    const fit = await evaluate(client,`parseInt(document.querySelector('output[aria-label="Mức thu phóng"]').textContent)`); assert(fit>0&&fit<=100,'Fit invalid');
    await click('Đặt lại 100%');
    assert.equal(await evaluate(client,`document.querySelector('output[aria-label="Mức thu phóng"]').textContent`),'100%');
    // Real keyboard scrolling of a focusable native scroll region.
    await evaluate(client,`document.querySelector('[data-flowchart-viewport]').focus()`); await key('ArrowDown','ArrowDown'); await delay(250);
    assert(await evaluate(client,`document.querySelector('[data-flowchart-viewport]').scrollTop>0`),'Keyboard scrolling failed');
    // Mouse/pen panning on blank canvas; real touch gesture uses native scroll.
    const area = await evaluate(client,`(() => {const v=document.querySelector('[data-flowchart-viewport]');v.scrollTo(0,0);const r=v.getBoundingClientRect();return {x:r.x+25,y:r.y+300};})()`);
    await client.send('Input.dispatchMouseEvent',{type:'mousePressed',x:area.x,y:area.y,button:'left',clickCount:1});
    await client.send('Input.dispatchMouseEvent',{type:'mouseMoved',x:area.x,y:area.y-120,button:'left',buttons:1});
    await client.send('Input.dispatchMouseEvent',{type:'mouseReleased',x:area.x,y:area.y-120,button:'left'});
    assert(await evaluate(client,`document.querySelector('[data-flowchart-viewport]').scrollTop>50`),'Mouse pan failed');
    if(width===390) {
      await client.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
      await evaluate(client,`document.querySelector('[data-flowchart-viewport]').scrollTo(0,0)`);
      await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:area.x,y:area.y}]});
      for(let step=1;step<=8;step++) {
        await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:area.x,y:area.y-step*20}]}); await delay(20);
      }
      await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await delay(200);
      assert(await evaluate(client,`document.querySelector('[data-flowchart-viewport]').scrollTop>30`),'Touch pan failed: '+await evaluate(client,`(() => {const v=document.querySelector('[data-flowchart-viewport]');return JSON.stringify({action:getComputedStyle(v).touchAction,top:v.scrollTop,height:v.clientHeight,scrollHeight:v.scrollHeight});})()`));
      await client.send('Emulation.setTouchEmulationEnabled',{enabled:false});
    }
    await key('Escape','Escape');
    await until(`!document.querySelector('[data-flowchart-dialog]')`, 'escape closes');
    assert(await evaluate(client,`document.activeElement.matches('[data-flowchart-ready]')`),'Focus not restored');
    cases++;
  }
  // Every registered process page also gets a DOM geometry/anchor smoke check.
  const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
  const processPages = walk('content/internal').filter(file=>file.endsWith('.mdx')&&fs.readFileSync(file,'utf8').includes('<ProcessFlowchart'));
  await client.send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  for(const file of processPages) {
    const route='/'+file.split(path.sep).join('/').replace(/^content\//,'').replace(/\([^/]+\)\//g,'').replace(/\/index\.mdx$/,'').replace(/\.mdx$/,'');
    await client.send('Page.navigate',{url:base+route});
    await until(`Boolean(document.querySelector('[data-flowchart-ready="true"]'))`,route);
    const issues=await evaluate(client,`(() => {
      const issues=[];
      for(const svg of document.querySelectorAll('[data-flowchart-svg]')) for(const node of svg.querySelectorAll('[data-flowchart-node]')) {
        const rect=node.querySelector('rect'), w=+rect.getAttribute('width'),h=+rect.getAttribute('height'),matrix=node.transform.baseVal.consolidate().matrix;
        if(matrix.e<0||matrix.f<0||matrix.e+w>svg.viewBox.baseVal.width||matrix.f+h>svg.viewBox.baseVal.height)issues.push(node.dataset.flowchartNode+':outside canvas');
        for(const text of node.querySelectorAll('text')) {const b=text.getBBox();if(b.x<0||b.y<0||b.x+b.width>w+1||b.y+b.height>h+1)issues.push(node.dataset.flowchartNode+':text overflow');}
        const link=node.querySelector('a[href^="#"]');if(link&&!document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1))))issues.push(node.dataset.flowchartNode+':missing anchor');
      }
      return issues;
    })()`);
    assert.equal(issues.length,0,route+': '+issues.join(', '));
  }
  assert.equal(errors.length,0,errors.join(' | '));
  console.log(`[test:flowchart PASS] ${cases} route/viewport/theme cases: fullscreen, readable 100%, no page overflow, IDs, SVG labels, zoom/fit/reset, focus trap/restore, Esc, keyboard/mouse/touch scroll, no text overflow. ${processPages.length} process pages geometry/anchor checks.`);
} catch(error) {
  if(client) console.error(await evaluate(client,`({root:document.documentElement.getAttribute('style'),inner:innerWidth,visibility:document.visibilityState,dialog:document.querySelector('[data-flowchart-dialog]')?.getBoundingClientRect().toJSON(),style:document.querySelector('[data-flowchart-dialog]')?.getAttribute('style')})`));
  console.error(logs.slice(-2000)); throw error;
}
finally { client?.close(); if(chrome)killProcessTree(chrome.pid); killProcessTree(server.pid); await delay(500);fs.rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200}); }
