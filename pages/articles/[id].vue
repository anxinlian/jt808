<template>
  <div v-if="article" class="min-h-screen bg-gradient-to-b from-background to-muted/20">
    <div class="bg-primary/5 py-12">
      <div class="container mx-auto px-4 xl:px-8">
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
    </div>

    <div class="container mx-auto px-4 py-12 xl:px-8">
      <div class="rounded-lg border border-border/50 shadow-card bg-card overflow-hidden">
        <div class="relative h-96 overflow-hidden max-sm:h-64">
          <img
            :src="article.coverImage"
            :alt="article.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="p-8 max-sm:p-4">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4 max-sm:text-xl">摘要</h2>
            <p class="text-lg text-muted-foreground leading-relaxed max-sm:text-base">
              {{ article.summary }}
            </p>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4 max-sm:text-xl">详细内容</h2>
            <div class="prose prose-neutral max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground">
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="related in relatedArticles"
            :key="related.id"
            :to="{
              path: `/articles/${articleRouteSlug(related.id)}`,
              query: { ...route.query },
            }"
            class="rounded-lg border border-border/50 shadow-card overflow-hidden hover:shadow-lg transition-shadow bg-card"
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
  </div>
</template>

<script setup lang="ts">
import { Calendar, ArrowLeft, CheckCircle2 } from 'lucide-vue-next'
import { resolveNewsListHref } from '~/utils/newsListBack'
import { articleRouteSlug } from '~/utils/articleRouteSlug'
import { queryArticleBySlug } from '~/utils/queryArticleBySlug'
import type { ArticleListItem } from '~/types/article'

const route = useRoute()

const slug = computed(() => articleRouteSlug(String(route.params.id ?? '')))

const { data: articleWrap, status: articleStatus } = await useAsyncData(
  () => `article-${slug.value}`,
  async () => ({ doc: await queryArticleBySlug(slug.value) }),
  { watch: [slug] },
)

const article = computed(() => articleWrap.value?.doc ?? null)

const { data: relatedArticles } = await useAsyncData(
  () => `article-related-${route.params.id}`,
  async () => {
    const a = article.value
    if (!a) return [] as ArticleListItem[]
    const list = await queryCollection('articles')
      .where('category', '=', a.category as string)
      .where('id', '<>', a.id as string)
      .select('id', 'title', 'coverImage', 'date', 'sortDate')
      .order('sortDate', 'DESC')
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

useHead(() => ({
  title: article.value ? `${article.value.title} - 文章资讯` : '文章资讯',
  meta: article.value ? [{ name: 'description', content: article.value.summary }] : [],
}))
</script>
