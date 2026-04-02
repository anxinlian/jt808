<template>
  <div class="flex flex-col min-h-screen">
    <section class="bg-gradient-primary py-12 xl:py-16">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center text-primary-foreground">
          <h1 class="text-3xl font-bold mb-4 xl:text-4xl max-sm:text-2xl">文章资讯</h1>
          <p class="text-base xl:text-lg max-sm:text-sm text-primary-foreground/90">
            按分类浏览文章与系统更新记录
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <!-- 分类：与 ChangelogPage TabsList 一致 — grid w-full 等分全宽 -->
        <div class="mb-8 grid w-full grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <button
            v-for="cat in categoryList"
            :key="cat"
            type="button"
            :class="[
              'w-full rounded-md px-2 py-2.5 text-center text-xs transition-colors sm:px-3 sm:text-sm',
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
            ]"
            @click="selectCategory(cat)"
          >
            <span class="inline-block leading-tight">
              {{ cat }}
              <span class="opacity-90">({{ categoryBadgeCount(cat) }})</span>
            </span>
          </button>
        </div>

        <!-- 更新日志（固定分类） -->
        <div v-if="selectedCategory === '更新日志'" class="w-full">
          <div class="w-full space-y-12">
            <div v-for="(yearData, yearIndex) in changelog" :key="yearIndex">
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                >
                  <Calendar class="h-6 w-6" />
                </div>
                <h2 class="text-2xl font-bold text-foreground xl:text-3xl max-sm:text-xl">
                  {{ yearData.year }}
                </h2>
              </div>

              <div class="space-y-6 ml-0 xl:ml-16">
                <div
                  v-for="(update, updateIndex) in yearData.updates"
                  :key="updateIndex"
                  class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <span
                      class="px-2 py-1 text-xs xl:text-sm bg-secondary text-secondary-foreground rounded-md"
                    >
                      {{ update.date }}
                    </span>
                    <span
                      v-if="update.items.some((item) => item.includes('版本上线') || item.includes('版本'))"
                      class="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-md"
                    >
                      重要更新
                    </span>
                  </div>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, itemIndex) in update.items"
                      :key="itemIndex"
                      class="flex items-start gap-3"
                    >
                      <CheckCircle2 class="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span
                        class="text-sm text-foreground xl:text-base max-sm:text-xs leading-relaxed"
                      >
                        {{ item }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 文章列表：与分类同宽；大屏为左图右文 -->
        <div v-else class="w-full flex flex-col gap-6">
          <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="rounded-lg border border-border/50 shadow-card overflow-hidden mobile-gradient-accent card-hover bg-card"
          >
            <NuxtLink
              :to="{
                path: `/articles/${articleRouteSlug(article.id)}`,
                query: { back: selectedCategory },
              }"
              class="flex flex-col md:flex-row md:items-stretch min-h-0 group"
            >
              <!-- 封面宽度与 ChangelogPage @md:w-80 一致 -->
              <div
                class="relative h-48 shrink-0 overflow-hidden bg-muted md:h-full md:min-h-[200px] md:w-80"
              >
                <img
                  :src="article.coverImage"
                  :alt="article.title"
                  class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-3 left-3 md:top-3 md:left-3">
                  <span
                    class="inline-block px-2 py-1 text-xs rounded-md bg-background/90 backdrop-blur-sm"
                  >
                    {{ article.category }}
                  </span>
                </div>
              </div>
              <div class="p-5 md:p-6 flex flex-col flex-1 min-w-0">
                <div class="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar class="h-4 w-4 mr-1 shrink-0" />
                  {{ article.date }}
                </div>
                <h2
                  class="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors xl:text-xl"
                >
                  {{ article.title }}
                </h2>
                <p class="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1 leading-relaxed">
                  {{ article.summary }}
                </p>
                <div class="flex justify-end mt-auto pt-1">
                  <span class="inline-flex items-center text-sm font-medium text-primary">
                    阅读全文
                    <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 xl:py-20 bg-muted">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            持续迭代优化
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            我们致力于为用户提供更好的产品体验
          </p>
        </div>
        <div class="grid gap-8 @container xl:grid-cols-4">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2 xl:text-5xl max-sm:text-3xl">3+</div>
            <div class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">主要版本</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2 xl:text-5xl max-sm:text-3xl">30+</div>
            <div class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">功能更新</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2 xl:text-5xl max-sm:text-3xl">50+</div>
            <div class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">优化改进</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2 xl:text-5xl max-sm:text-3xl">持续</div>
            <div class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">更新迭代</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-vue-next'
import type { ArticleListItem } from '~/types/article'
import { articleRouteSlug } from '~/utils/articleRouteSlug'

const { data: articles } = await useArticlesList()
const articlesData = computed(() => articles.value ?? [])

useHead({
  title: '文章资讯',
  meta: [
    {
      name: 'description',
      content:
        '北斗安心联动态资讯：按分类浏览行业动态、产品与技术文章，以及系统版本更新日志。',
    },
    {
      name: 'keywords',
      content:
        '车辆定位系统更新日志,文章资讯,行业动态,北斗定位,车辆监控系统版本更新,产品升级',
    },
  ],
})

/** 含固定项「更新日志」（系统版本记录）；无「全部」，默认选中更新日志 */
const categoryList = [
  '行业动态',
  '产品文档',
  '技术文档',
  '更新日志',
] as const

type Category = (typeof categoryList)[number]

const route = useRoute()

const selectedCategory = computed<Category>(() => {
  const q = route.query.category
  const s = Array.isArray(q) ? q[0] : q
  if (typeof s === 'string' && (categoryList as readonly string[]).includes(s)) {
    return s as Category
  }
  return '更新日志'
})

async function selectCategory(cat: Category) {
  if (cat === '更新日志') {
    await navigateTo({ path: '/news' }, { replace: true })
  } else {
    await navigateTo({ path: '/news', query: { category: cat } }, { replace: true })
  }
}

const categoryCounts = computed(() => {
  const counts: Record<string, number> = {
    行业动态: 0,
    产品文档: 0,
    技术文档: 0,
  }
  for (const a of articlesData.value) {
    counts[a.category] = (counts[a.category] ?? 0) + 1
  }
  return counts
})

const changelog = [
  {
    year: '2026年',
    updates: [
      {
        date: '2026年3月12日',
        items: ['中标某省会城市公交车辆监控管理平台建设项目。'],
      },
    ],
  },
  {
    year: '2025年',
    updates: [
      {
        date: '2025年12月06日',
        items: ['优化路线规划功能操作体验。'],
      },
      {
        date: '2025年10月15日',
        items: ['针对景区车辆，上线景交车辆会车预警功能。'],
      },
      {
        date: '2025年8月18日',
        items: ['优化用户角色和菜单权限控制功能。'],
      },
      {
        date: '2025年6月27日',
        items: ['增加路线规划和偏离路线报警功能。'],
      },
      {
        date: '2025年5月6日',
        items: ['优化标注点在监控页面的隐藏和显示等功能。'],
      },
      {
        date: '2025年3月19日',
        items: ['优化车辆各种报警弹窗的显示规则。'],
      },
    ],
  },
  {
    year: '2024年',
    updates: [
      {
        date: '2024年12月8日',
        items: ['优化APP端数据请求，使车辆状态更精准。'],
      },
      {
        date: '2024年11月11日',
        items: ['优化APP端地图页面的车辆状态图标。'],
      },
      {
        date: '2024年10月24日',
        items: ['优化车辆视频画面展示形式。'],
      },
      {
        date: '2024年10月10日',
        items: ['优化实时监控页面搜索功能。'],
      },
      {
        date: '2024年9月28日',
        items: ['增加混凝土搅拌车正反转传感器校准功能。'],
      },
      {
        date: '2024年9月6日',
        items: ['优化APP和PC端车辆历史轨迹回放功能，增加轨迹回放时其他传感器的数据展示。'],
      },
      {
        date: '2024年8月19日',
        items: ['APP端增加车辆自编号的展示和修改功能。'],
      },
      {
        date: '2024年7月25日',
        items: ['优化主动安全报警信息的展示形式。'],
      },
      {
        date: '2024年7月10日',
        items: ['优化运营平台上车辆和设备的添加与绑定流程。'],
      },
      {
        date: '2024年6月19日',
        items: ['微信小程序版本上线。'],
      },
      {
        date: '2024年6月10日',
        items: ['iOS版本上线APPstore。'],
      },
      {
        date: '2024年6月5日',
        items: ['安卓版本上线华为、荣耀、小米等应用市场。'],
      },
      {
        date: '2024年5月29日',
        items: ['增加油量变动曲线、油量报表等功能。'],
      },
      {
        date: '2024年5月15日',
        items: [
          'V2.0.0版本上线。',
          '优化更新界面整体风格。',
          '运营管理端和企业端合并入口，通过账号权限区分管理。',
          '新增标注点管理功能。',
          '新增对油量传感器的对接。',
        ],
      },
    ],
  },
  {
    year: '2023年',
    updates: [
      {
        date: '2023年11月',
        items: [
          'V1.3.0版本上线。',
          '支持主动安全设备接入。',
          '主动安全相关报警记录及报警详情展示。',
        ],
      },
      {
        date: '2023年10月19日',
        items: [
          'V1.2.0版本上线。',
          '支持视频设备接入。',
          '新增实时视频功能。',
          '新增视频回放功能。',
        ],
      },
      {
        date: '2023年8月12日',
        items: [
          'V1.1.0版本上线。',
          '新增报警规则设置功能。',
          '新增超速报警功能。',
          '新增非法驶入报警。',
          '新增非法驶出报警功能。',
        ],
      },
      {
        date: '2023年5月3日',
        items: [
          'V1.0.0版上线。',
          '支持实时定位功能。',
          '支持历史轨迹回放功能。',
          '支持里程报表查询功能。',
          '支持电子围栏功能。',
          '支持车辆管理和设备管理功能。',
        ],
      },
    ],
  },
]

const changelogUpdateCount = computed(() =>
  changelog.reduce((sum, y) => sum + y.updates.length, 0),
)

function categoryBadgeCount(cat: Category): number {
  if (cat === '更新日志') return changelogUpdateCount.value
  return categoryCounts.value[cat] ?? 0
}

const filteredArticles = computed<ArticleListItem[]>(() => {
  const cat = selectedCategory.value
  if (cat === '更新日志') return []
  return articlesData.value.filter((a) => a.category === cat)
})
</script>
