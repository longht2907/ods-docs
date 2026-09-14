#!/usr/bin/env node
/**
 * guard.mjs - kiem tra ranh gioi public/internal cua ODS Documentation Platform.
 *
 * Chay bang may, khong ton token, ket qua giong nhau moi lan.
 *
 * Guard tu nhan biet giai doan cua repo:
 *   - Chua co content/internal  -> chi kiem tra secret + frontmatter
 *   - Da co content/internal    -> bat them cac check ranh gioi
 *   - Da co Caddyfile           -> bat them check cache CDN
 * Nho vay ban chay duoc guard ngay tu ngay dau, khong can cho du tinh nang.
 */

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const errors = []
const warnings = []

const fail = (check, msg) => errors.push(`[${check}] ${msg}`)
const warn = (check, msg) => warnings.push(`[${check}] ${msg}`)

function exists(rel) {
	return fs.existsSync(path.join(root, rel))
}

function readIfExists(rel) {
	const full = path.join(root, rel)
	if (!fs.existsSync(full)) return null
	return fs.readFileSync(full, 'utf8')
}

function walk(dir, filter) {
	const full = path.join(root, dir)
	if (!fs.existsSync(full)) return []
	const out = []
	const stack = [full]
	const skip = new Set(['node_modules', '.next', '.git', '.source', 'out', 'dist'])
	while (stack.length) {
		const cur = stack.pop()
		for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
			const p = path.join(cur, entry.name)
			if (entry.isDirectory()) {
				if (skip.has(entry.name)) continue
				stack.push(p)
			} else if (!filter || filter(p)) {
				out.push(path.relative(root, p).split(path.sep).join('/'))
			}
		}
	}
	return out.sort()
}

const hasInternal = exists('content/internal')
const hasCaddy = exists('Caddyfile')

// ---------------------------------------------------------------
// LUON KIEM TRA
// ---------------------------------------------------------------

// 1. Khong commit secret
const SECRET_RE = /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}/
for (const file of walk('.', (p) => /\.(ts|tsx|mjs|js|json|md|mdx|yml|yaml|sh|ps1)$/.test(p))) {
	if (file === 'package-lock.json' || file === 'scripts/guard.mjs') continue
	const src = readIfExists(file)
	if (src && SECRET_RE.test(src)) {
		fail('1-secret', `${file} co the chua secret`)
	}
}
for (const envFile of ['.env', '.env.local', '.env.production']) {
	if (!exists(envFile)) continue
	const ignore = readIfExists('.gitignore') ?? ''
	if (!ignore.includes('.env')) {
		fail('1-secret', `${envFile} ton tai nhung .gitignore khong loai tru .env`)
	}
}

// 2. Moi file MDX phai co frontmatter title
for (const file of walk('content', (p) => /\.mdx?$/.test(p))) {
	const src = readIfExists(file)
	if (!src) continue
	const end = src.startsWith('---') ? src.indexOf('\n---', 3) : -1
	const fm = end > 0 ? src.slice(3, end) : ''
	if (!fm) {
		fail('2-frontmatter', `${file} thieu frontmatter`)
		continue
	}
	if (!/^title\s*:/m.test(fm)) fail('2-frontmatter', `${file} thieu title`)
	if (!/^description\s*:/m.test(fm)) warn('2-frontmatter', `${file} thieu description`)
}

// 3. next.config khong duoc chuyen sang static export
const nextConfig = readIfExists('next.config.mjs') ?? readIfExists('next.config.ts')
if (nextConfig && /output\s*:\s*['"]export['"]/.test(nextConfig)) {
	fail('3-output', "next.config dat output: 'export' - auth se ngung hoat dong")
}

// ---------------------------------------------------------------
// CHI KIEM TRA KHI DA CO VUNG NOI BO
// ---------------------------------------------------------------

if (hasInternal) {
	// 4. internalSource chi duoc import o vung duoc phep
	const ALLOW = [/^lib\/source\.ts$/, /^app\/internal\//, /^app\/api\/search\/internal\//]
	for (const file of walk('.', (p) => /\.(ts|tsx)$/.test(p))) {
		if (file.startsWith('scripts/')) continue
		const src = readIfExists(file)
		if (!src || !src.includes('internalSource')) continue
		if (!ALLOW.some((re) => re.test(file))) {
			fail('4-internal-source', `${file} tham chieu internalSource ngoai vung cho phep`)
		}
	}

	// 5. Public search khong duoc dung internalSource
	const publicSearch = readIfExists('app/api/search/route.ts')
	if (publicSearch && publicSearch.includes('internalSource')) {
		fail('5-public-search', 'app/api/search/route.ts dung internalSource - se lo tai lieu noi bo')
	}

	// 6. proxy.ts phai bao ve /internal
	const proxy = readIfExists('proxy.ts') ?? readIfExists('middleware.ts')
	if (!proxy) {
		fail('6-proxy', 'da co content/internal nhung thieu proxy.ts - vung noi bo dang mo')
	} else {
		if (!proxy.includes('/internal')) fail('6-proxy', 'proxy khong bao ve /internal')
		if (!proxy.includes('/api/search/internal')) {
			warn('6-proxy', 'proxy chua bao ve /api/search/internal')
		}
	}

	// 7. Tai lieu public khong duoc link sang internal
	const LINK_TO_INTERNAL = /\]\(\/internal[\/)#]|\]\(\.{1,2}\/[^)]*internal\/|content\/internal\//
	for (const file of walk('content/docs', (p) => /\.mdx?$/.test(p))) {
		const src = readIfExists(file)
		if (src && LINK_TO_INTERNAL.test(src)) {
			fail('7-cross-link', `${file} link sang vung internal`)
		}
	}

	// 8. llms.txt khong duoc chua duong dan internal
	for (const file of ['public/llms.txt', 'public/llms-full.txt']) {
		const src = readIfExists(file)
		if (src && src.includes('/internal')) {
			fail('8-llms', `${file} chua duong dan /internal`)
		}
	}

	// 9. Caddyfile phai chan cache cho /internal
	if (hasCaddy) {
		const caddy = readIfExists('Caddyfile') ?? ''
		const ok = /@internal\s+path\s+\/internal/.test(caddy) && /no-store/.test(caddy)
		if (!ok) {
			fail('9-cdn-cache', 'Caddyfile phai co matcher @internal va Cache-Control no-store')
		}
	}
}

// ---------------------------------------------------------------
// KET QUA
// ---------------------------------------------------------------

const phase = hasInternal
	? hasCaddy
		? 'day du (public + internal + trien khai)'
		: 'co vung noi bo'
	: 'co ban (chua co content/internal)'
console.log(`Guard - giai doan: ${phase}`)

if (warnings.length) {
	console.log('\nCanh bao:')
	for (const w of warnings) console.log('  ' + w)
}

if (errors.length) {
	console.error('\nGuard FAIL:')
	for (const e of errors) console.error('  ' + e)
	console.error(`\n${errors.length} loi.`)
	process.exit(1)
}

console.log('\nGuard PASS.')
