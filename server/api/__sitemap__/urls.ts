import { queryCollection } from '@nuxt/content/server'
import type { SitemapUrlInput } from '#sitemap/types'
import { articleRouteSlug } from '~/utils/articleRouteSlug'

export default defineSitemapEventHandler(async (event) => {
  const rows = await queryCollection(event, 'articles').select('id').all()
  return rows.map((row) => ({
    loc: `/articles/${articleRouteSlug(String(row.id))}`,
  })) satisfies SitemapUrlInput[]
})
