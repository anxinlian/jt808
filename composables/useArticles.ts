import type { ArticleListItem } from '~/types/article'

/**
 * 文章列表（Markdown + frontmatter，构建期写入）
 */
export function useArticlesList() {
  return useAsyncData(
    'content-articles-list',
    () =>
      queryCollection('articles')
        .select(
          'id',
          'title',
          'summary',
          'category',
          'coverImage',
          'date',
          'featured',
          'sortDate',
          'highlights',
          'path',
        )
        .order('sortDate', 'DESC')
        .all() as Promise<ArticleListItem[]>,
    { default: () => [] as ArticleListItem[] },
  )
}
