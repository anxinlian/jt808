import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        summary: z.string(),
        category: z.enum(['行业动态', '产品文档', '技术文档']),
        coverImage: z.string(),
        date: z.string(),
        featured: z.boolean(),
        /** 列表排序：数字越大越靠前（与日期无关，仅排序用） */
        sortOrder: z.number(),
        highlights: z.array(z.string()).optional(),
        /** 页面 title 标签（50–60 字），缺省取 title 自动规范 */
        seoTitle: z.string().optional(),
        /** meta keywords（50–90 字） */
        keywords: z.string().optional(),
      }),
    }),
  },
})
