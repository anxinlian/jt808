<template>
  <div v-if="article" class="min-h-screen bg-gradient-to-b from-background to-muted/20">
    <div class="mx-auto max-w-6xl px-4 py-12 xl:px-8">
      <div class="flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
        <!-- 主栏：标题 + 正文卡片 + 相关文章 -->
        <div class="min-w-0 flex-1 xl:max-w-3xl">
          <!-- <div class="mb-6 rounded-lg border border-border/50 bg-card p-4 shadow-card xl:hidden">
            <h2 class="text-sm font-semibold text-foreground">本文摘要</h2>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ article.summary }}
            </p>
          </div> -->
          <div class="bg-primary/5 px-8 py-12 max-sm:px-4 xl:rounded-t-lg">
            <span
              class="inline-block px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground mb-4"
            >
              {{ article.category }}
            </span>
            <h1 class="text-4xl font-bold mb-4 max-sm:text-2xl">
              {{ article.title }}
            </h1>
            <div class="flex items-center text-muted-foreground">
              <Calendar class="h-4 w-4 mr-2" />
              <span>{{ article.date }}</span>
            </div>
          </div>
          <div
            class="mt-5 rounded-lg border border-border/50 shadow-card bg-card overflow-hidden max-sm:mt-4"
          >
            <div class="relative h-96 overflow-hidden max-sm:h-64">
              <img
                :src="article.coverImage"
                :alt="article.title"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="p-8 max-sm:p-4">
              <div class="mb-8">
                <div
                  class="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-li:marker:text-muted-foreground [&_h1_a]:no-underline [&_h2_a]:no-underline [&_h3_a]:no-underline [&_h4_a]:no-underline [&_h5_a]:no-underline [&_h6_a]:no-underline [&_h1>a]:no-underline [&_h2>a]:no-underline [&_h3>a]:no-underline [&_h4>a]:no-underline [&_h5>a]:no-underline [&_h6>a]:no-underline"
                >
                  <ContentRenderer v-if="article" :value="article" />
                </div>
              </div>

              <div v-if="article.highlights?.length" class="mb-8">
                <h2 class="text-2xl font-semibold mb-4 max-sm:text-xl">核心亮点</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="(highlight, index) in article.highlights"
                    :key="index"
                    class="flex items-start space-x-3 p-4 rounded-lg bg-primary/5 border border-primary/10"
                  >
                    <CheckCircle2 class="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span class="text-muted-foreground">{{ highlight }}</span>
                  </div>
                </div>
              </div>

              <div class="flex justify-between items-center pt-8 border-t border-border">
                <NuxtLink
                  :to="newsListBackTo"
                  class="inline-flex items-center justify-center px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors text-sm font-medium"
                >
                  <ArrowLeft class="mr-2 h-4 w-4" />
                  返回列表
                </NuxtLink>
              </div>
            </div>
          </div>

          <div v-if="relatedArticles.length" class="mt-12">
            <h2 class="text-2xl font-semibold mb-6 max-sm:text-xl">相关文章</h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <NuxtLink
                v-for="related in relatedArticles"
                :key="related.id"
                :to="`/articles/${articleRouteSlug(related.id)}`"
                class="rounded-lg border border-border/50 shadow-card overflow-hidden hover:shadow-lg transition-shadow bg-card"
                @click="rememberNewsBackCategory(String(article?.category || '更新日志'))"
              >
                <div class="relative h-40 overflow-hidden bg-muted">
                  <img
                    :src="related.coverImage"
                    :alt="related.title"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div class="p-4">
                  <div class="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar class="h-3 w-3 mr-1" />
                    {{ related.date }}
                  </div>
                  <h3 class="font-semibold line-clamp-2 hover:text-primary transition-colors">
                    {{ related.title }}
                  </h3>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 侧栏：摘要 + 目录（桌面端） -->
        <aside
          class="hidden w-64 shrink-0 space-y-6 xl:sticky xl:top-24 xl:block"
        >
          <!-- <div class="rounded-lg border border-border/50 bg-card p-4 shadow-card">
            <h2 class="text-sm font-semibold text-foreground">本文摘要</h2>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
              {{ article.summary }}
            </p>
          </div> -->
          <nav
            v-if="tocFlat.length"
            class="rounded-lg border border-border/50 bg-card p-4 shadow-card"
            aria-label="文章目录"
          >
            <h2 class="text-sm font-semibold text-foreground">导航目录</h2>
            <ul class="mt-3 space-y-1.5 text-sm">
              <li v-for="item in tocFlat" :key="item.id">
                <a
                  :href="`#${item.id}`"
                  class="block break-words text-muted-foreground transition-colors hover:text-primary"
                  :style="{ paddingLeft: `${Math.max(0, item.depth - 2) * 0.75}rem` }"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, ArrowLeft, CheckCircle2 } from 'lucide-vue-next'
import { rememberNewsBackCategory, resolveNewsListHref } from '~/utils/newsListBack'
import { articleRouteSlug } from '~/utils/articleRouteSlug'
import { queryArticleBySlug } from '~/utils/queryArticleBySlug'
import type { ArticleListItem } from '~/types/article'

type TocLinkLike = { id: string; text: string; depth: number; children?: TocLinkLike[] }

function flattenTocLinks(links: TocLinkLike[] | undefined) {
  if (!links?.length) return [] as { id: string; text: string; depth: number }[]
  const out: { id: string; text: string; depth: number }[] = []
  const walk = (items: TocLinkLike[]) => {
    for (const item of items) {
      out.push({ id: item.id, text: item.text, depth: item.depth })
      if (item.children?.length) walk(item.children)
    }
  }
  walk(links)
  return out
}

const route = useRoute()

const slug = computed(() => articleRouteSlug(String(route.params.id ?? '')))

const { data: articleWrap, status: articleStatus } = await useAsyncData(
  () => `article-${slug.value}`,
  async () => ({ doc: await queryArticleBySlug(slug.value) }),
  { watch: [slug] },
)

const article = computed(() => articleWrap.value?.doc ?? null)

const tocFlat = computed(() =>
  flattenTocLinks(article.value?.body?.toc?.links as TocLinkLike[] | undefined),
)

const { data: relatedArticles } = await useAsyncData(
  () => `article-related-${route.params.id}`,
  async () => {
    const a = article.value
    if (!a) return [] as ArticleListItem[]
    const list = await queryCollection('articles')
      .where('category', '=', a.category as string)
      .where('id', '<>', a.id as string)
      .select('id', 'title', 'coverImage', 'date', 'sortOrder')
      .order('sortOrder', 'DESC')
      .limit(3)
      .all()
    return list as ArticleListItem[]
  },
  { watch: [slug, () => article.value?.id], default: () => [] },
)

const newsListBackTo = computed(() => {
  const a = article.value
  if (!a) return '/news'
  return resolveNewsListHref(route.query.back as unknown, a.category as string)
})

const siteConfig = useSiteConfig()

function absoluteUrl(origin: string, pathOrUrl: string) {
  const base = origin.replace(/\/$/, '')
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const p = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${base}${p}`
}

watch(
  [article, articleStatus],
  () => {
    if (articleStatus.value === 'pending' || articleStatus.value === 'idle') return
    if (!article.value) {
      navigateTo('/news', { replace: true })
    }
  },
  { immediate: true },
)

useHead(() => {
  const a = article.value
  const origin = (siteConfig.url || 'https://www.xlhd.info').replace(/\/$/, '')
  if (!a) {
    return { title: '文章资讯' }
  }
  const path = `/articles/${slug.value}`
  const pageUrl = `${origin}${path}`
  const ogImage = absoluteUrl(origin, String(a.coverImage || ''))
  return {
    title: `${a.title} - 文章资讯`,
    meta: [
      { name: 'description', content: a.summary },
      { property: 'og:title', content: a.title },
      { property: 'og:description', content: a.summary },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:image', content: ogImage },
    ],
  }
})
</script>
