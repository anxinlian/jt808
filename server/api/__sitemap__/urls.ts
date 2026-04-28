import { queryCollection } from '@nuxt/content/server'
import type { SitemapUrlInput } from '#sitemap/types'
import { articleRouteSlug } from '~/utils/articleRouteSlug'

export default defineSitemapEventHandler(async (event) => {
  const rows = await queryCollection(event, 'articles').select('id').all()
  const articleUrls = rows.map((row) => ({
    loc: `/articles/${articleRouteSlug(String(row.id))}`,
  })) satisfies SitemapUrlInput[]

  const newsCategoryUrls: SitemapUrlInput[] = [
    { loc: '/news' },
    { loc: '/news/industry' },
    { loc: '/news/product-doc' },
    { loc: '/news/tech-doc' },
  ]

  return [...newsCategoryUrls, ...articleUrls]
})
