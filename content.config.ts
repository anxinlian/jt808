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
      }),
    }),
  },
})
