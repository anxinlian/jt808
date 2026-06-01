<template>
  <div class="flex flex-col min-h-screen">
    <LayoutsHeader />
    <main class="flex-grow" :class="{ invisible: newsTabsScrollLock }">
      <NuxtPage />
    </main>
    <LayoutsFooter />
    <CommonBackToTop />
  </div>
</template>

<script setup lang="ts">
import { fitSeoTitle } from '~/utils/seoMeta'
import { buildOrganizationJsonLd } from '~/utils/geoSchema'

const siteUrl = 'https://www.xlhd.info'
const route = useRoute()
const newsTabsScrollLock = useNewsTabsScrollLock()

// 每页 canonical URL，避免重复收录（不带尾部斜杠）
const canonical = computed(() => {
  const path = route.path === '/' ? '' : route.path.replace(/\/+$/, '')
  return `${siteUrl}${path}`
})

useHead({
  titleTemplate: (titleChunk) => {
    if (!titleChunk) {
      return fitSeoTitle('星联互动·北斗安心联车辆定位监控系统｜808/1078·星联互动')
    }
    return titleChunk
  },
  link: [{ rel: 'canonical', href: canonical }],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

// 组织/企业结构化数据，便于搜索引擎与 AI 理解站点实体
useJsonLd(buildOrganizationJsonLd())
</script>
