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
        /** ISO 日期字符串，用于列表排序（降序） */
        sortDate: z.string(),
        highlights: z.array(z.string()).optional(),
      }),
    }),
  },
})
