/** GEO / 结构化数据：供搜索引擎与生成式 AI 解析站点实体与内容 */

export const GEO_SITE_URL = 'https://www.xlhd.info'

export const GEO_ORGANIZATION = {
  name: '河南星联互动科技有限公司',
  alternateName: '星联互动',
  logo: `${GEO_SITE_URL}/favicon.png`,
} as const

export function organizationRef() {
  return {
    '@type': 'Organization' as const,
    name: GEO_ORGANIZATION.name,
    alternateName: GEO_ORGANIZATION.alternateName,
    url: GEO_SITE_URL,
    logo: {
      '@type': 'ImageObject' as const,
      url: GEO_ORGANIZATION.logo,
    },
  }
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: GEO_ORGANIZATION.name,
    alternateName: GEO_ORGANIZATION.alternateName,
    url: GEO_SITE_URL,
    logo: GEO_ORGANIZATION.logo,
    description:
      '河南星联互动科技有限公司专注于北斗/GPS车辆位置信息系统，支持JT/T808、JT/T809、JT/T1078等协议，提供实时定位、历史轨迹、实时视频、车辆管理、围栏管理、数据大屏等功能。',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      addressRegion: '河南省',
    },
  }
}

/** 将 frontmatter 日期「2026年6月1日」转为 ISO 日期 */
export function parseArticleDate(raw: string): string | undefined {
  const m = raw.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
  if (!m) return undefined
  const [, y, mo, d] = m
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`
}

export interface ArticleJsonLdInput {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  keywords?: string
  category?: string
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
  const articleType =
    input.category === '技术文档'
      ? 'TechArticle'
      : input.category === '行业动态'
        ? 'NewsArticle'
        : 'Article'

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': articleType,
    headline: input.title,
    description: input.description,
    author: organizationRef(),
    publisher: organizationRef(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
    inLanguage: 'zh-CN',
  }

  if (input.image) jsonLd.image = input.image
  if (input.datePublished) jsonLd.datePublished = input.datePublished
  if (input.keywords) jsonLd.keywords = input.keywords

  return jsonLd
}

export interface SoftwareApplicationJsonLdInput {
  name: string
  description: string
  url: string
  applicationCategory?: string
  operatingSystem?: string
}

export function buildSoftwareApplicationJsonLd(input: SoftwareApplicationJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: input.applicationCategory ?? 'BusinessApplication',
    operatingSystem: input.operatingSystem ?? 'Web, Android, iOS',
    provider: organizationRef(),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${GEO_SITE_URL}/product`,
    },
  }
}

export interface ProductOfferInput {
  name: string
  description: string
  price?: string
}

export interface ProductJsonLdInput {
  name: string
  description: string
  url: string
  offers: ProductOfferInput[]
}

export function buildProductJsonLd(input: ProductJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    url: input.url,
    brand: {
      '@type': 'Brand',
      name: GEO_ORGANIZATION.alternateName,
    },
    manufacturer: organizationRef(),
    offers: input.offers.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      description: offer.description,
      ...(offer.price ? { price: offer.price.replace(/[^\d.]/g, ''), priceCurrency: 'CNY' } : {}),
      availability: 'https://schema.org/InStock',
      seller: organizationRef(),
    })),
  }
}
