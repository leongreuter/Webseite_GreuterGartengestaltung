// Converts the original images in assets-src/original into optimised WebP files
// in public/assets and records their dimensions in src/data/image-meta.json.
// Run with: npm run images
import { readdir, mkdir, writeFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'assets-src', 'original')
const outDir = path.join(root, 'public', 'assets')
const metaFile = path.join(root, 'src', 'data', 'image-meta.json')

// Full-width hero slides get more pixels than gallery images.
const maxWidth = (name) => (name.startsWith('greuter-home-') ? 2400 : 2000)
const SMALL_WIDTH = 960

await mkdir(outDir, { recursive: true })
const meta = {}

for (const file of (await readdir(srcDir)).sort()) {
  const ext = path.extname(file).toLowerCase()
  const base = path.basename(file, ext)
  const input = path.join(srcDir, file)

  if (ext === '.svg') {
    await copyFile(input, path.join(outDir, file))
    continue
  }
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue

  // The logo stays a PNG with transparency; everything else becomes WebP.
  const keepPng = file === 'home-0.png'
  const outName = keepPng ? 'greuter-logo.png' : `${base}.webp`
  let pipeline = sharp(input).rotate().resize({ width: maxWidth(base), withoutEnlargement: true })
  pipeline = keepPng ? pipeline.png({ compressionLevel: 9 }) : pipeline.webp({ quality: 80 })
  const info = await pipeline.toFile(path.join(outDir, outName))
  meta[`/assets/${outName}`] = { width: info.width, height: info.height }

  // Smaller variant for gallery tiles and phones (used via srcset).
  if (!keepPng && info.width > SMALL_WIDTH * 1.25) {
    const smallName = `${base}-${SMALL_WIDTH}.webp`
    await sharp(input).rotate().resize({ width: SMALL_WIDTH }).webp({ quality: 76 }).toFile(path.join(outDir, smallName))
    meta[`/assets/${outName}`].small = `/assets/${smallName}`
  }
  console.log(`${file} -> ${outName} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`)
}

await writeFile(metaFile, JSON.stringify(meta, null, 2) + '\n')
console.log(`\n${Object.keys(meta).length} images written, meta -> ${path.relative(root, metaFile)}`)
