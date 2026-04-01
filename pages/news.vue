<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <section class="bg-gradient-primary py-12 xl:py-16">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center text-primary-foreground">
          <h1 class="text-3xl font-bold mb-4 xl:text-4xl max-sm:text-2xl">动态资讯</h1>
          <p class="text-base xl:text-lg max-sm:text-sm text-primary-foreground/90">
            系统更新日志
          </p>
        </div>
      </div>
    </section>

    <!-- 更新日志 -->
    <section class="py-16 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="w-full">
          <div class="max-w-4xl mx-auto space-y-12">
            <div
              v-for="(yearData, yearIndex) in changelog"
              :key="yearIndex"
            >
              <!-- Year Header -->
              <div class="flex items-center gap-4 mb-8">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Calendar class="h-6 w-6" />
                </div>
                <h2 class="text-2xl font-bold text-foreground xl:text-3xl max-sm:text-xl">
                  {{ yearData.year }}
                </h2>
              </div>

              <!-- Updates List -->
              <div class="space-y-6 ml-0 xl:ml-16">
                <div
                  v-for="(update, updateIndex) in yearData.updates"
                  :key="updateIndex"
                  class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover"
                >
                  <div class="flex items-center gap-3 mb-4">
                    <span class="px-2 py-1 text-xs xl:text-sm bg-secondary text-secondary-foreground rounded-md">
                      {{ update.date }}
                    </span>
                    <span
                      v-if="update.items.some(item => item.includes('版本上线') || item.includes('版本'))"
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
                      <span class="text-sm text-foreground xl:text-base max-sm:text-xs leading-relaxed">
                        {{ item }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
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
            <div class="text-4xl font-bold text-primary mb-2 xl:text-5xl max-sm:text-3xl">
              3+
            </div>
            <div class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
              主要版本
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2 xl:text-5xl max-sm:text-3xl">
              30+
            </div>
            <div class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
              功能更新
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2 xl:text-5xl max-sm:text-3xl">
              50+
            </div>
            <div class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
              优化改进
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2 xl:text-5xl max-sm:text-3xl">
              持续
            </div>
            <div class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
              更新迭代
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Calendar, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: '动态资讯',
  meta: [
    { name: 'description', content: '查看北斗安心联车辆定位监控系统的更新日志。了解系统版本迭代、功能更新、优化改进等信息。支持JT/T808、JT/T809、JT/T1078等协议，提供实时定位、历史轨迹、实时视频、视频回放、车辆管理、ADAS/DSM主动安全等功能。' },
    { name: 'keywords', content: '车辆定位系统更新日志,车辆监控系统版本更新,系统更新日志,产品升级,功能更新,北斗定位系统更新,车辆监控系统更新' }
  ]
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
</script>
