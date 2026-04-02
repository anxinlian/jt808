/** 与 content.config.ts / 文章 frontmatter 对齐（列表用） */
export interface ArticleListItem {
  id: string
  title: string
  summary: string
  category: '行业动态' | '产品文档' | '技术文档'
  coverImage: string
  date: string
  featured: boolean
  sortDate?: string
  highlights?: string[]
  path?: string
}
