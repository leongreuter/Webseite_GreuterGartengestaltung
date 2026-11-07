// Writes a static, fully rendered HTML file per route into dist/ so every page
// works on any static web host (no server, no rewrite rules) and is indexable.
// Runs after `vite build` and `vite build --ssr` (see package.json "build").
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, pages, notFoundMeta, localBusinessJsonLd, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page(meta, url, { index = true, jsonLd = false } = {}) {
  const canonical = SITE_URL + meta.path
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)

  const head = [`<meta property="og:url" content="${canonical}" />`]
  if (!index) head.push('<meta name="robots" content="noindex" />')
  if (jsonLd) head.push(`<script type="application/ld+json">${JSON.stringify(localBusinessJsonLd)}</script>`)
  return html
    .replace('<!--app-head-->', head.join('\n    '))
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-path="${meta.path}">${render(url)}</div>`)
}

for (const meta of pages) {
  const outDir = path.join(dist, meta.path)
  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, 'index.html'), page(meta, meta.path, { jsonLd: true }))
  console.log(`prerendered ${meta.path}`)
}

await writeFile(path.join(dist, '404.html'), page(notFoundMeta, '/404', { index: false }))
console.log('prerendered /404.html')

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
await writeFile(path.join(dist, 'sitemap.xml'), sitemap)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log('wrote sitemap.xml, robots.txt')

await rm(ssrDir, { recursive: true, force: true })
