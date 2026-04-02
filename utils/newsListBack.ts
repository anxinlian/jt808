/** 与 pages/news.vue 分类一致，用于 ?back= 与返回列表 */
export const NEWS_ROUTE_CATEGORIES = [
  '行业动态',
  '产品文档',
  '技术文档',
  '更新日志',
] as const

export type NewsRouteCategory = (typeof NEWS_ROUTE_CATEGORIES)[number]

export function isNewsRouteCategory(s: string): s is NewsRouteCategory {
  return (NEWS_ROUTE_CATEGORIES as readonly string[]).includes(s)
}

function pickBackQuery(q: unknown): string | undefined {
  if (typeof q === 'string') return q
  if (Array.isArray(q) && typeof q[0] === 'string') return q[0]
  return undefined
}

/** 根据 ?back= 或文章分类得到资讯列表路由 */
export function resolveNewsListHref(
  backQuery: unknown,
  fallbackCategory: string,
): string | { path: string; query?: { category: string } } {
  const raw = pickBackQuery(backQuery)
  const cat = raw && isNewsRouteCategory(raw) ? raw : fallbackCategory

  if (cat === '更新日志') return '/news'
  return { path: '/news', query: { category: cat } }
}
