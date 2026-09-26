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

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import babelParser from 'next/dist/compiled/babel/parser.js'

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

function unwrapTsExpression(node) {
	let current = node
	while (
		current.type === 'TSAsExpression' ||
		current.type === 'TSSatisfiesExpression' ||
		current.type === 'ParenthesizedExpression'
	) {
		current = current.expression
	}
	return current
}

function readTsLiteral(node, file) {
	const current = unwrapTsExpression(node)

	if (current.type === 'StringLiteral') {
		return current.value
	}
	if (current.type === 'NumericLiteral' || current.type === 'BooleanLiteral') {
		return current.value
	}
	if (current.type === 'NullLiteral') return null
	if (current.type === 'ArrayExpression') {
		return current.elements.map((item) => {
			if (!item) throw new Error(`${file} chua array hole khong ho tro`)
			return readTsLiteral(item, file)
		})
	}
	if (current.type === 'ObjectExpression') {
		const value = {}
		for (const property of current.properties) {
			if (property.type !== 'ObjectProperty') {
				throw new Error(`${file} chua property khong phai literal`)
			}
			const name = property.key
			const key = name.type === 'Identifier' || name.type === 'StringLiteral' ? name.name ?? name.value : null
			if (!key) throw new Error(`${file} chua property name khong ho tro`)
			value[key] = readTsLiteral(property.value, file)
		}
		return value
	}

	throw new Error(`${file} chua expression khong phai literal`)
}

function readTsConst(rel, variableName) {
	const source = readIfExists(rel)
	if (!source) throw new Error(`khong tim thay ${rel}`)
	const sourceFile = babelParser.parse(source, {
		sourceType: 'module',
		plugins: ['typescript'],
	})

	for (const statement of sourceFile.program.body) {
		if (statement.type !== 'ExportNamedDeclaration' || statement.declaration?.type !== 'VariableDeclaration') {
			continue
		}
		for (const declaration of statement.declaration.declarations) {
			if (
				declaration.id.type === 'Identifier' &&
				declaration.id.name === variableName &&
				declaration.init
			) {
				return readTsLiteral(declaration.init, rel)
			}
		}
	}

	throw new Error(`khong tim thay const ${variableName} trong ${rel}`)
}

function readJsonObject(rel, check) {
	const source = readIfExists(rel)
	if (!source) {
		fail(check, `khong tim thay ${rel}`)
		return null
	}
	try {
		return JSON.parse(source)
	} catch {
		fail(check, `${rel} khong dung dinh dang JSON`)
		return null
	}
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

// Doc phase tu .harness/phase.json neu co
let declaredPhase = null
const phaseFile = readIfExists('.harness/phase.json')
if (phaseFile) {
	try {
		const parsed = JSON.parse(phaseFile)
		declaredPhase = parsed.phase
	} catch {
		fail('10-phase-lock', '.harness/phase.json khong dung dinh dang JSON')
	}
}

// ---------------------------------------------------------------
// LUON KIEM TRA
// ---------------------------------------------------------------

// 1. Khong commit secret
const SECRET_RE =
	/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{36}|gho_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{82}|GOCSPX-[A-Za-z0-9_-]{28}|eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}|(?:postgres|mysql):\/\/[^:\s]+:[^@\s]+@/

for (const file of walk('.', (p) => /\.(ts|tsx|mjs|js|json|md|mdx|yml|yaml|sh|ps1)$/.test(p))) {
	if (file === 'package-lock.json' || file === 'harness/guard.mjs') continue
	const src = readIfExists(file)
	if (src && SECRET_RE.test(src)) {
		fail('1-secret', `${file} co the chua secret`)
	}
}

// Kiem tra env thong qua harness/linters/env-guard.mjs
try {
	execSync('node harness/linters/env-guard.mjs', { stdio: 'pipe' })
} catch (err) {
	fail('1-secret', 'harness/linters/env-guard.mjs bao loi ve file env hoac .gitignore')
}

// 2. Moi file MDX phai co frontmatter title va description
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
	if (!/^description\s*:/m.test(fm)) fail('2-frontmatter', `${file} thieu description`)
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
	const ALLOW = [
		/^src\/lib\/source\.ts$/,
		/^src\/app\/internal\//,
		/^src\/app\/api\/search\/internal\//,
	]
	for (const file of walk('.', (p) => /\.(ts|tsx)$/.test(p))) {
		if (file.startsWith('harness/')) continue
		const src = readIfExists(file)
		if (!src || !src.includes('internalSource')) continue
		if (!ALLOW.some((re) => re.test(file))) {
			fail('4-internal-source', `${file} tham chieu internalSource ngoai vung cho phep`)
		}
	}

	// 5. Public search khong duoc dung internalSource
	const publicSearch = readIfExists('src/app/api/search/route.ts')
	if (publicSearch && publicSearch.includes('internalSource')) {
		fail('5-public-search', 'src/app/api/search/route.ts dung internalSource - se lo tai lieu noi bo')
	}

	// 6. proxy.ts phai bao ve /internal
	const proxy =
		readIfExists('src/proxy.ts') ??
		readIfExists('proxy.ts') ??
		readIfExists('src/middleware.ts') ??
		readIfExists('middleware.ts')
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
// CAC CHECK MO RONG CHO HARNESS
// ---------------------------------------------------------------

// 10. Phase Lock: Doc .harness/phase.json
const PHASE_RANKS = {
	basic: 1,
	internal: 2,
	full: 3,
	deploy: 4,
}

if (declaredPhase) {
	const rank = PHASE_RANKS[declaredPhase] ?? 0
	if (rank >= PHASE_RANKS.internal && !hasInternal) {
		fail('10-phase-lock', `Phase khai bao la '${declaredPhase}' nhung content/internal khong ton tai`)
	}
}

// 11. Proxy Matcher
const proxyContent =
	readIfExists('src/proxy.ts') ??
	readIfExists('proxy.ts') ??
	readIfExists('src/middleware.ts') ??
	readIfExists('middleware.ts')

if (proxyContent && /export\s+const\s+config\s*=\s*\{/.test(proxyContent)) {
	const matcherMatch = proxyContent.match(/matcher\s*:\s*(\[[^\]]+\]|'[^']+'|"[^"]+")/)
	if (matcherMatch && !matcherMatch[1].includes('/internal')) {
		fail('11-proxy-matcher', 'Proxy co export config voi matcher nhung pattern khong bao phu /internal')
	}
}

// 12. Prod Flag: ODS_INTERNAL_DEV_OPEN trong production configs, Dockerfile hoac process.env
if (process.env.NODE_ENV === 'production' && process.env.ODS_INTERNAL_DEV_OPEN === 'true') {
	fail('12-prod-flag', 'ODS_INTERNAL_DEV_OPEN dang duoc bat trong moi truong production (process.env)')
}

const PROD_CONFIG_FILES = [
	'.env.production',
	'.env.prod',
	'Dockerfile',
	'docker-compose.prod.yml',
	'docker-compose.production.yml',
]

for (const prodFile of PROD_CONFIG_FILES) {
	const content = readIfExists(prodFile)
	if (content && content.includes('ODS_INTERNAL_DEV_OPEN')) {
		fail('12-prod-flag', `Tim thay ODS_INTERNAL_DEV_OPEN trong file production ${prodFile}`)
	}
}

// 13. Task Evidence: Moi task co status: done phai co report
const taskFiles = walk('tasks', (p) => /TASK-[A-Za-z0-9_-]+\.md$/.test(p))
for (const tf of taskFiles) {
	if (tf === 'tasks/TASK-TEMPLATE.md') continue
	const content = readIfExists(tf)
	if (!content) continue
	const statusMatch = content.match(/^status\s*:\s*['"]?([a-zA-Z0-9_-]+)['"]?/m)
	if (statusMatch && statusMatch[1].toLowerCase() === 'done') {
		const taskIdMatch = tf.match(/TASK-\d+/i)
		const taskId = taskIdMatch ? taskIdMatch[0].toUpperCase() : null
		if (taskId) {
			const reportFile = `.harness/reports/${taskId}-report.md`
			if (!exists(reportFile)) {
				fail('13-task-evidence', `${tf} co status: done nhung thieu ${reportFile}`)
			}
		}
	}
}

// 14. Docs Registry: catalog, presentation registry va Fumadocs roots phai dong bo
try {
	const solutionGroups = readTsConst('src/lib/ods-solutions.ts', 'odsSolutionGroups')
	const docsProfiles = readTsConst('src/lib/docs-products.ts', 'docsProductProfiles')
	if (!Array.isArray(solutionGroups) || !Array.isArray(docsProfiles)) {
		fail('14-docs-registry', 'odsSolutionGroups va docsProductProfiles phai la array literal')
	} else {
		const documentedProducts = []
		for (const group of solutionGroups) {
			if (Object.hasOwn(group, 'docsUrl')) {
				fail('14-docs-registry', `solution group ${group.id ?? 'unknown'} khong duoc khai bao docsUrl`)
			}
			if (!Array.isArray(group.products)) {
				fail('14-docs-registry', `solution group ${group.id ?? 'unknown'} thieu products array`)
				continue
			}
			for (const product of group.products) {
				if (typeof product.docsSlug === 'string') documentedProducts.push(product)
			}
		}

		const documentedSlugs = documentedProducts.map((product) => product.docsSlug)
		const profileSlugs = docsProfiles.map((profile) => profile.slug)
		if (new Set(documentedSlugs).size !== documentedSlugs.length) {
			fail('14-docs-registry', 'docsSlug bi trung trong odsSolutionGroups')
		}
		if (new Set(profileSlugs).size !== profileSlugs.length) {
			fail('14-docs-registry', 'slug bi trung trong docsProductProfiles')
		}

		const documentedSet = new Set(documentedSlugs)
		const profileSet = new Set(profileSlugs)
		for (const slug of documentedSet) {
			if (!profileSet.has(slug)) fail('14-docs-registry', `docs slug ${slug} thieu profile`)
		}
		for (const slug of profileSet) {
			if (!documentedSet.has(slug)) fail('14-docs-registry', `profile ${slug} thieu product canonical`)
		}

		const contentRoots = []
		const docsRoot = path.join(root, 'content/docs')
		for (const entry of fs.readdirSync(docsRoot, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue
			const metaRel = `content/docs/${entry.name}/meta.json`
			const meta = readJsonObject(metaRel, '14-docs-registry')
			if (meta?.root === true) contentRoots.push(entry.name)
		}
		for (const slug of documentedSet) {
			if (!contentRoots.includes(slug)) {
				fail('14-docs-registry', `content/docs/${slug}/meta.json phai co root: true`)
			}
		}
		for (const slug of contentRoots) {
			if (!documentedSet.has(slug)) {
				fail('14-docs-registry', `Fumadocs product root ${slug} thieu product canonical`)
			}
		}

		for (const product of documentedProducts) {
			const metaRel = `content/docs/${product.docsSlug}/meta.json`
			const meta = readJsonObject(metaRel, '14-docs-registry')
			if (meta && meta.title !== product.name) {
				fail('14-docs-registry', `${metaRel} title phai la "${product.name}"`)
			}
			const profile = docsProfiles.find((item) => item.slug === product.docsSlug)
			if (!profile || !Array.isArray(profile.sections)) continue

			for (const section of profile.sections) {
				if (typeof section.href !== 'string' || !section.href.startsWith('/docs/')) {
					fail('14-docs-registry', `section ${section.kind ?? 'unknown'} co href khong hop le`)
					continue
				}
				const sectionPath = section.href.slice('/docs/'.length)
				const sectionMetaRel = `content/docs/${sectionPath}/meta.json`
				const sectionMeta = readJsonObject(sectionMetaRel, '14-docs-registry')
				if (sectionMeta?.root !== true) {
					fail('14-docs-registry', `${sectionMetaRel} phai co root: true`)
				}
				if (sectionPath !== product.docsSlug && sectionMeta && sectionMeta.title !== section.title) {
					fail('14-docs-registry', `${sectionMetaRel} title phai la "${section.title}"`)
				}
			}
		}
	}
} catch (error) {
	fail('14-docs-registry', error instanceof Error ? error.message : String(error))
}

// ---------------------------------------------------------------
// KET QUA
// ---------------------------------------------------------------

const displayPhase = declaredPhase || (hasInternal
	? hasCaddy
		? 'day du (public + internal + trien khai)'
		: 'co vung noi bo'
	: 'co ban (chua co content/internal)')
console.log(`Guard - giai doan: ${displayPhase}`)

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
