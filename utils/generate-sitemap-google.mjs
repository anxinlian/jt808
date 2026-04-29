import { readFile, writeFile } from 'node:fs/promises'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const srcPath = path.join(projectRoot, '.output', 'public', 'sitemap.xml')
const destPath = path.join(projectRoot, '.output', 'public', 'sitemap_google.xml')

function stripImageNodes(xml) {
  // Remove all image nodes used by @nuxtjs/sitemap (xmlns:image + <image:image>...</image:image>)
  // Keep the rest of the sitemap unchanged.
  return xml.replace(/<image:image\b[\s\S]*?<\/image:image>\s*/g, '')
}

async function main() {
  // Nitro/nuxt generate 会创建 `.output/public`；如果没生成就直接跑脚本，会在这里报清晰错误。
  const xml = await readFile(srcPath, 'utf8')
  const stripped = stripImageNodes(xml).replace(/\n{3,}/g, '\n\n').trimEnd() + '\n'

  await mkdir(path.dirname(destPath), { recursive: true })
  await writeFile(destPath, stripped, 'utf8')
  // eslint-disable-next-line no-console
  console.log(`[sitemap] generated: ${path.relative(projectRoot, destPath)}`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[sitemap] generate-sitemap-google failed:', err)
  process.exitCode = 1
})

