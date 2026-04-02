/** 将 Content 列表中的 id 规范为路由单段 slug（去掉 `articles/` 前缀与 `.md` 后缀） */
export function articleRouteSlug(raw: string): string {
  let s = raw.trim()
  if (!s) return s
  while (s.startsWith('articles/')) {
    s = s.slice('articles/'.length)
  }
  if (s.endsWith('.md')) {
    s = s.slice(0, -'.md'.length)
  }
  return s
}
