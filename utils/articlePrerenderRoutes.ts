import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/** 构建期从 content/articles 读取全部文章路由，供 nitro prerender 使用 */
export function getArticlePrerenderRoutes(rootDir: string): string[] {
  const dir = join(rootDir, 'content/articles')
  let files: string[] = []
  try {
    files = readdirSync(dir).filter((name) => name.endsWith('.md'))
  } catch {
    return []
  }

  return files.map((file) => {
    const raw = readFileSync(join(dir, file), 'utf8')
    const id = raw.match(/^id:\s*"(.+?)"/m)?.[1]
    const stem = file.replace(/\.md$/, '')
    return `/articles/${id ?? stem}`
  })
}
