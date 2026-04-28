/** 与 pages/news.vue 分类一致，用于 ?back= 与返回列表 */
export const NEWS_ROUTE_CATEGORIES = [
  '行业动态',
  '产品文档',
  '技术文档',
  '更新日志',
] as const

export type NewsRouteCategory = (typeof NEWS_ROUTE_CATEGORIES)[number]
export type NewsCategorySlug = 'industry' | 'product-doc' | 'tech-doc'

export function isNewsRouteCategory(s: string): s is NewsRouteCategory {
  return (NEWS_ROUTE_CATEGORIES as readonly string[]).includes(s)
}

const CATEGORY_TO_SLUG: Record<Exclude<NewsRouteCategory, '更新日志'>, NewsCategorySlug> = {
  行业动态: 'industry',
  产品文档: 'product-doc',
  技术文档: 'tech-doc',
}

const SLUG_TO_CATEGORY: Record<NewsCategorySlug, Exclude<NewsRouteCategory, '更新日志'>> = {
  industry: '行业动态',
  'product-doc': '产品文档',
  'tech-doc': '技术文档',
}

const NEWS_BACK_CATEGORY_SESSION_KEY = 'news:lastCategory'

function pickBackQuery(q: unknown): string | undefined {
  if (typeof q === 'string') return q
  if (Array.isArray(q) && typeof q[0] === 'string') return q[0]
  return undefined
}

export function categoryToNewsHref(category: string): string {
  if (!isNewsRouteCategory(category) || category === '更新日志') return '/news'
  return `/news/${CATEGORY_TO_SLUG[category]}`
}

export function newsSlugToCategory(slug: string): Exclude<NewsRouteCategory, '更新日志'> | null {
  return SLUG_TO_CATEGORY[slug as NewsCategorySlug] ?? null
}

export function rememberNewsBackCategory(category: string) {
  if (!import.meta.client) return
  if (!isNewsRouteCategory(category)) return
  sessionStorage.setItem(NEWS_BACK_CATEGORY_SESSION_KEY, category)
}

export function readNewsBackCategory(): NewsRouteCategory | null {
  if (!import.meta.client) return null
  const saved = sessionStorage.getItem(NEWS_BACK_CATEGORY_SESSION_KEY)
  if (!saved || !isNewsRouteCategory(saved)) return null
  return saved
}

/** 根据 ?back=、sessionStorage 或文章分类得到资讯列表路由 */
export function resolveNewsListHref(
  backQuery: unknown,
  fallbackCategory: string,
): string {
  const raw = pickBackQuery(backQuery)
  if (raw && isNewsRouteCategory(raw)) return categoryToNewsHref(raw)

  const saved = readNewsBackCategory()
  if (saved) return categoryToNewsHref(saved)

  return categoryToNewsHref(fallbackCategory)
}
