<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <section class="bg-gradient-primary py-12 xl:py-16">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center text-primary-foreground">
          <h1 class="text-3xl font-bold mb-4 xl:text-4xl max-sm:text-2xl">产品版本</h1>
          <p class="text-base xl:text-lg max-sm:text-sm text-primary-foreground/90">
            选择适合您的版本方案，灵活满足不同场景的业务需求
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Cards - 源码售卖 -->
    <section class="py-12 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-8 xl:mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            源码交付
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            提供完整的系统源码，支持二次开发和定制
          </p>
        </div>

        <!-- 手机端：Tab 切换版本，减少对比压迫感 -->
        <div class="xl:hidden mb-4">
          <div class="flex rounded-lg border-2 border-border bg-muted shadow-sm p-1.5">
            <button
              v-for="(pkg, index) in packages"
              :key="index"
              type="button"
              @click="sourceTab = index"
              :class="[
                'flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors',
                sourceTab === index
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              ]"
            >
              {{ pkg.name }}
            </button>
          </div>
        </div>

        <div class="grid gap-8 @container xl:grid-cols-3">
          <div
            v-for="(pkg, index) in packages"
            :key="index"
            :class="[
              'p-4 xl:p-6 rounded-lg shadow-card card-hover mobile-gradient-accent overflow-hidden',
              pkg.recommended ? 'border-2 border-primary ring-2 ring-primary/20' : 'border border-border/50',
              // 手机端只显示当前 Tab 对应卡片
              index !== sourceTab ? 'max-xl:hidden' : ''
            ]"
          >
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-xl font-bold xl:text-2xl max-sm:text-lg">{{ pkg.name }}</h3>
                <span
                  v-if="pkg.recommended"
                  class="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-md"
                >
                  推荐
                </span>
              </div>
              <p class="text-sm text-muted-foreground xl:text-base max-sm:text-xs mb-4">
                {{ pkg.description }}
              </p>
            </div>
            <!-- 功能列表：手机端默认只显示前 6 条，可展开；桌面端全部展示 -->
            <ul class="space-y-2 xl:space-y-3 mb-4 xl:mb-6">
              <li
                v-for="(feature, idx) in visibleSourceFeatures(pkg)"
                :key="idx"
                class="flex items-start gap-2 xl:gap-3"
              >
                  <Check
                    v-if="feature.included"
                    class="h-4 w-4 xl:h-5 xl:w-5 text-secondary shrink-0 mt-0.5"
                  />
                  <X
                    v-else
                    class="h-4 w-4 xl:h-5 xl:w-5 text-muted-foreground shrink-0 mt-0.5"
                  />
                <span
                  :class="[
                    'text-xs xl:text-base max-sm:text-xs',
                    !feature.included ? 'text-muted-foreground' : 'text-foreground'
                  ]"
                >
                  {{ feature.name }}
                </span>
              </li>
            </ul>
            <!-- 手机端展开/收起 -->
            <button
              v-if="pkg.features.length > mobileFeatureShowCount && index === sourceTab && !isXl"
              type="button"
              @click="sourceFeaturesExpanded = !sourceFeaturesExpanded"
              class="xl:hidden text-sm text-primary mb-4 w-full py-1"
            >
              {{ sourceFeaturesExpanded ? '收起' : `展开全部 ${pkg.features.length} 项功能` }}
            </button>
            <NuxtLink to="/about#contact">
              <button
                :class="[
                  'w-full px-4 py-2 rounded-md transition-colors text-sm xl:text-base',
                  (pkg.recommended || (!isXl && index === sourceTab))
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border hover:bg-muted'
                ]"
              >
                联系咨询
              </button>
            </NuxtLink>
          </div>
        </div>

        <!-- 注释说明：手机端略紧凑 -->
        <div class="mt-6 xl:mt-8 max-w-4xl mx-auto">
          <div class="bg-muted/50 p-3 xl:p-4 rounded-lg border border-border">
            <p class="text-xs xl:text-base max-sm:text-xs mb-1 xl:mb-2 text-muted-foreground">
              <span class="font-semibold text-foreground">注1：</span>以上版本都包含完整源码，购买后即可拥有完整知识产权
            </p>
            <p class="text-xs xl:text-base max-sm:text-xs text-muted-foreground">
              <span class="font-semibold text-foreground">注2：</span>平台支持对接温湿度、正反转、油杆、门磁、称重等传感器
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 软件独立部署选项 -->
    <section class="py-12 xl:py-20 bg-muted">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-6 xl:mb-8">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            独立部署
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm mb-4 xl:mb-6">
            独立服务器部署，数据完全自主可控，支持上万辆车使用
          </p>
          <!-- 优势标签：手机端横向滚动 -->
          <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto max-xl:flex-nowrap max-xl:overflow-x-auto max-xl:justify-start max-xl:py-2 max-xl:-mx-4 max-xl:px-4">
            <div
              v-for="(advantage, index) in deploymentAdvantages"
              :key="index"
              class="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border border-border/50 shrink-0"
            >
              <Check class="h-4 w-4 text-secondary shrink-0" />
              <span class="text-sm xl:text-base max-sm:text-xs text-foreground whitespace-nowrap">
                {{ advantage }}
              </span>
            </div>
          </div>
        </div>

        <!-- 手机端 Tab 切换 -->
        <div class="xl:hidden mb-4">
          <div class="flex rounded-lg border-2 border-border bg-muted shadow-sm p-1.5">
            <button
              v-for="(option, index) in deploymentOptions"
              :key="index"
              type="button"
              @click="deployTab = index"
              :class="[
                'flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors',
                deployTab === index ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'
              ]"
            >
              {{ option.name }}
            </button>
          </div>
        </div>

        <div class="grid gap-8 @container xl:grid-cols-3">
          <div
            v-for="(option, index) in deploymentOptions"
            :key="index"
            :class="[
              'p-4 xl:p-6 rounded-lg shadow-card card-hover',
              option.recommended ? 'border-2 border-primary ring-2 ring-primary/20' : 'border border-border/50',
              index !== deployTab ? 'max-xl:hidden' : ''
            ]"
          >
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-xl font-bold xl:text-2xl max-sm:text-lg">{{ option.name }}</h3>
                <span
                  v-if="option.recommended"
                  class="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-md"
                >
                  推荐
                </span>
              </div>
              <p class="text-sm text-muted-foreground xl:text-base max-sm:text-xs mb-4">
                {{ option.description }}
              </p>
            </div>
            <NuxtLink to="/about#contact">
              <button
                :class="[
                  'w-full px-4 py-2 rounded-md transition-colors text-sm xl:text-base',
                  (option.recommended || (!isXl && index === deployTab))
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border hover:bg-muted'
                ]"
              >
                联系咨询
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- SAAS化接入选项 -->
    <section class="py-12 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-6 xl:mb-8">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            SAAS化接入
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm mb-4 xl:mb-6">
            成本低、易上手、快速接入、不需要技术人员
          </p>
          <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto max-xl:flex-nowrap max-xl:overflow-x-auto max-xl:justify-start max-xl:py-2 max-xl:-mx-4 max-xl:px-4">
            <div
              v-for="(advantage, index) in saasAdvantages"
              :key="index"
              class="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border border-border/50 shrink-0"
            >
              <Check class="h-4 w-4 text-secondary shrink-0" />
              <span class="text-sm xl:text-base max-sm:text-xs text-foreground whitespace-nowrap">
                {{ advantage }}
              </span>
            </div>
          </div>
        </div>

        <div class="xl:hidden mb-4">
          <div class="flex rounded-lg border-2 border-border bg-muted shadow-sm p-1.5">
            <button
              v-for="(option, index) in saasOptions"
              :key="index"
              type="button"
              @click="saasTab = index"
              :class="[
                'flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors',
                saasTab === index ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'
              ]"
            >
              {{ option.name }}
            </button>
          </div>
        </div>

        <div class="grid gap-8 @container xl:grid-cols-3">
          <div
            v-for="(option, index) in saasOptions"
            :key="index"
            :class="[
              'p-4 xl:p-6 rounded-lg shadow-card card-hover',
              option.recommended ? 'border-2 border-primary ring-2 ring-primary/20' : 'border border-border/50',
              index !== saasTab ? 'max-xl:hidden' : ''
            ]"
          >
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-xl font-bold xl:text-2xl max-sm:text-lg">{{ option.name }}</h3>
                <span
                  v-if="option.recommended"
                  class="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-md"
                >
                  推荐
                </span>
              </div>
              <p class="text-sm text-muted-foreground xl:text-base max-sm:text-xs mb-4">
                {{ option.description }}
              </p>
            </div>
            <NuxtLink to="/about#contact">
              <button
                :class="[
                  'w-full px-4 py-2 rounded-md transition-colors text-sm xl:text-base',
                  (option.recommended || (!isXl && index === saasTab))
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border hover:bg-muted'
                ]"
              >
                联系咨询
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Customization Section -->
    <section class="py-12 xl:py-20 bg-muted">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-8 xl:mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            定制化服务
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            提供专业的定制化开发服务，满足您的特殊需求
          </p>
        </div>
        <div class="grid gap-4 xl:gap-6 @container max-xl:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="(item, index) in customization"
            :key="index"
            class="p-4 xl:p-6 rounded-lg shadow-card border border-border/50 hover:shadow-hover transition-shadow"
          >
            <h3 class="text-base font-bold mb-1 xl:text-xl max-sm:text-sm">{{ item.title }}</h3>
            <p class="text-xs text-muted-foreground xl:text-base max-sm:text-xs">
              {{ item.description }}
            </p>
          </div>
        </div>
        <div class="text-center mt-8 xl:mt-12">
          <NuxtLink to="/about#contact">
            <button class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              联系我们了解更多
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { Check, X } from 'lucide-vue-next'

const isXl = useMediaQuery('(min-width: 1280px)')
const sourceTab = ref(1) // 默认选视频版（推荐）
const sourceFeaturesExpanded = ref(false)
const deployTab = ref(1)
const saasTab = ref(1)
const mobileFeatureShowCount = 6

function visibleSourceFeatures(pkg: { features: { name: string; included: boolean }[] }) {
  if (isXl.value || sourceFeaturesExpanded.value) return pkg.features
  return pkg.features.slice(0, mobileFeatureShowCount)
}

watch(sourceTab, () => { sourceFeaturesExpanded.value = false })

useHead({
  title: '产品版本',
  meta: [
    { name: 'description', content: '查看北斗安心联车辆定位监控系统的产品版本和价格方案。提供定位版、视频版、安全版（ADAS/DSM）三种版本，支持源码售卖、独立部署和SAAS化接入。定位版支持实时定位、历史轨迹、车辆管理、围栏管理、标注管理、路线规划、报警规则、里程报表等功能。视频版增加实时视频、视频回放、排班调度功能。安全版增加ADAS/DSM主动安全功能。支持定制化开发，适用于商砼车、油罐车、大巴车、景区车、物流运输等多种车辆类型。' },
    { name: 'keywords', content: '车辆定位系统价格,车辆监控系统版本,定位版,视频版,安全版,ADAS,DSM,源码售卖,独立部署,SAAS接入,车辆管理系统价格,车辆定位系统报价,车辆监控系统购买,车辆管理系统定制,商砼车监控,油罐车监控,大巴车监控,景区车监控,物流运输监控,车辆定位系统源码,车辆监控系统源码' }
  ]
})

const packages = [
  {
    name: '定位版',
    description: '仅定位',
    price: '4.98万元',
    recommended: false,
    features: [
      { name: '实时定位', included: true },
      { name: '历史轨迹', included: true },
      { name: '实时视频', included: false },
      { name: '视频回放', included: false },
      { name: '主动安全', included: false },
      { name: '车辆管理', included: true },
      { name: '车务管理', included: true },
      { name: '排班调度', included: false },
      { name: '围栏管理', included: true },
      { name: '标注管理', included: true },
      { name: '路线规划', included: true },
      { name: '报警规则', included: true },
      { name: '里程报表', included: true },
      { name: '报警报表', included: true },
      { name: '报警记录', included: true },
      { name: '数据大屏', included: true },
      { name: '企业管理', included: true },
      { name: '账号管理', included: true },
      { name: '设备管理', included: true },
      { name: '接入协议', included: true },
    ],
  },
  {
    name: '视频版',
    description: '定位+视频',
    price: '6.98万元',
    recommended: true,
    features: [
      { name: '实时定位', included: true },
      { name: '历史轨迹', included: true },
      { name: '实时视频', included: true },
      { name: '视频回放', included: true },
      { name: '主动安全', included: false },
      { name: '车辆管理', included: true },
      { name: '车务管理', included: true },
      { name: '排班调度', included: true },
      { name: '围栏管理', included: true },
      { name: '标注管理', included: true },
      { name: '路线规划', included: true },
      { name: '报警规则', included: true },
      { name: '里程报表', included: true },
      { name: '报警报表', included: true },
      { name: '报警记录', included: true },
      { name: '数据大屏', included: true },
      { name: '企业管理', included: true },
      { name: '账号管理', included: true },
      { name: '设备管理', included: true },
      { name: '接入协议', included: true },
    ],
  },
  {
    name: '安全版',
    description: '定位+视频+主动安全(ADAS/DSM)',
    price: '9.98万元',
    recommended: false,
    features: [
      { name: '实时定位', included: true },
      { name: '历史轨迹', included: true },
      { name: '实时视频', included: true },
      { name: '视频回放', included: true },
      { name: '主动安全', included: true },
      { name: '车辆管理', included: true },
      { name: '车务管理', included: true },
      { name: '排班调度', included: true },
      { name: '围栏管理', included: true },
      { name: '标注管理', included: true },
      { name: '路线规划', included: true },
      { name: '报警规则', included: true },
      { name: '里程报表', included: true },
      { name: '报警报表', included: true },
      { name: '报警记录', included: true },
      { name: '数据大屏', included: true },
      { name: '企业管理', included: true },
      { name: '账号管理', included: true },
      { name: '设备管理', included: true },
      { name: '接入协议', included: true },
    ],
  },
]

const deploymentOptions = [
  {
    name: '定位版',
    description: '仅定位',
    recommended: false,
  },
  {
    name: '视频版',
    description: '定位+视频',
    recommended: true,
  },
  {
    name: '安全版',
    description: '定位+视频+主动安全(ADAS/DSM)',
    recommended: false,
  },
]

const deploymentAdvantages = [
  '独立服务器部署',
  '数据完全自主可控',
  '支持上万辆并发限制',
]

const saasOptions = [
  {
    name: '定位版',
    description: '仅定位',
    recommended: false,
  },
  {
    name: '视频版',
    description: '定位+视频',
    recommended: true,
  },
  {
    name: '安全版',
    description: '定位+视频+主动安全(ADAS/DSM)',
    recommended: false,
  },
]

const saasAdvantages = [
  '成本低，按需付费',
  '易上手，开箱即用',
  // '不需要技术人员',
  '免运维，自动升级',
  '快速接入，即开即用',
]

const customization = [
  {
    title: '功能定制',
    description: '根据客户需求定制开发特殊功能模块',
  },
  {
    title: '协议对接',
    description: '支持对接客户自有设备协议',
  },
  {
    title: '系统集成',
    description: '与客户现有系统进行集成对接',
  },
  {
    title: '界面定制',
    description: '根据客户品牌形象定制界面风格',
  },
]
</script>
