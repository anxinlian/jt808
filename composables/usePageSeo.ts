import { fitSeoDescription, fitSeoKeywords, fitSeoTitle } from '~/utils/seoMeta'

interface PageSeoInput {
  title: string
  description: string
  keywords: string
}

/** 统一页面 SEO：title 为完整 50–60 字，不再叠加 app.vue titleTemplate */
export function usePageSeo({ title, description, keywords }: PageSeoInput) {
  const seoTitle = fitSeoTitle(title)
  const seoDescription = fitSeoDescription(description)
  const seoKeywords = fitSeoKeywords(keywords)

  useHead({
    title: seoTitle,
    titleTemplate: '%s',
    meta: [
      { name: 'description', content: seoDescription },
      { name: 'keywords', content: seoKeywords },
    ],
  })

  return { seoTitle, seoDescription, seoKeywords }
}
