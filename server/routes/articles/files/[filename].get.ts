import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createError, defineEventHandler, getRouterParam, setHeader } from 'h3'

/** 显式提供 /articles/files/*，避免与 pages/articles/[id] 等路由竞争时出现 404 */
function resolvePublicFile(relativePath: string) {
  const cwd = process.cwd()
  const candidates = [
    join(cwd, 'public', relativePath),
    join(cwd, '.output/public', relativePath),
  ]
  for (const p of candidates) {
    if (existsSync(p)) return p
  }
  return join(cwd, 'public', relativePath)
}

export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, 'filename')
  if (!filename || !/^[a-zA-Z0-9._-]+\.pdf$/i.test(filename)) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }
  const filePath = resolvePublicFile(join('articles', 'files', filename))
  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }
  const buf = await readFile(filePath)
  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(event, 'Content-Disposition', `inline; filename="${filename}"`)
  return buf
})
