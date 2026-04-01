<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <section class="bg-gradient-primary py-12 xl:py-16">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center text-primary-foreground">
          <h1 class="text-3xl font-bold mb-4 xl:text-4xl max-sm:text-2xl">系统介绍</h1>
          <p class="text-base xl:text-lg max-sm:text-sm text-primary-foreground/90">
            全面了解北斗安心联车辆监控管理系统的技术架构与功能模块
          </p>
        </div>
      </div>
    </section>

    <!-- 在线体验 -->
    <section class="py-16 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-10 xl:mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            在线体验
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            无需安装，立即体验系统功能
          </p>
        </div>
        <div class="grid gap-4 xl:gap-6 @container xl:grid-cols-3 mb-6 xl:mb-8">
          <div class="p-4 xl:p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden bg-card">
            <div class="flex items-center gap-3 mb-2">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Globe class="h-5 w-5 text-primary" />
              </div>
              <span class="text-sm font-semibold text-foreground">体验地址</span>
            </div>
            <a
              :href="experienceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm xl:text-base text-primary hover:text-primary/80 break-all flex items-center gap-1.5"
            >
              {{ experienceUrl }}
              <ExternalLink class="h-4 w-4 shrink-0" />
            </a>
          </div>
          <div class="p-4 xl:p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden bg-card">
            <div class="flex items-center gap-3 mb-2">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <User class="h-5 w-5 text-primary" />
              </div>
              <span class="text-sm font-semibold text-foreground">登录账号</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <p class="text-sm xl:text-base text-foreground font-mono min-w-0">{{ experienceAccount }}</p>
              <button
                type="button"
                @click="copyToClipboard(experienceAccount, 'account')"
                class="shrink-0 p-2 rounded-md hover:bg-muted transition-colors"
                :title="accountCopied ? '已复制' : '复制账号'"
              >
                <Check v-if="accountCopied" class="h-4 w-4 text-secondary" />
                <Copy v-else class="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          </div>
          <div class="p-4 xl:p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden bg-card">
            <div class="flex items-center gap-3 mb-2">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Lock class="h-5 w-5 text-primary" />
              </div>
              <span class="text-sm font-semibold text-foreground">登录密码</span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <p class="text-sm xl:text-base text-foreground font-mono min-w-0">{{ experiencePassword }}</p>
              <button
                type="button"
                @click="copyToClipboard(experiencePassword, 'password')"
                class="shrink-0 p-2 rounded-md hover:bg-muted transition-colors"
                :title="passwordCopied ? '已复制' : '复制密码'"
              >
                <Check v-if="passwordCopied" class="h-4 w-4 text-secondary" />
                <Copy v-else class="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <a
            :href="experienceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            <ExternalLink class="h-5 w-5" />
            立即体验
          </a>
        </div>
        <!-- 移动端说明 -->
        <div class="mt-8 p-4 xl:p-5 rounded-lg border border-border/50 bg-muted/50">
          <div class="flex items-start gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Smartphone class="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-foreground mb-1 xl:text-base">移动端体验</h3>
              <p class="text-sm text-muted-foreground xl:text-base leading-relaxed">
                系统同时支持苹果（iOS）、安卓（Android）及微信小程序。您可在各大应用商店（App Store、华为应用市场、小米应用商店等）或微信中搜索「<strong class="text-foreground">安心联</strong>」下载或打开，随时随地体验车辆监控管理功能。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Protocols Section -->
    <section class="py-16 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            支持协议
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            兼容主流行业标准协议，支持多种设备接入
          </p>
        </div>
        <div class="grid gap-6 @container xl:grid-cols-3">
          <div
            v-for="(protocol, index) in protocols"
            :key="index"
            class="p-4 xl:p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover"
          >
            <div class="flex items-start justify-between mb-2">
              <h3 class="text-lg font-bold xl:text-xl max-sm:text-base">{{ protocol.name }}</h3>
              <span class="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                {{ protocol.status }}
              </span>
            </div>
            <p class="text-sm text-muted-foreground xl:text-base max-sm:text-xs">
              {{ protocol.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules Section -->
    <section class="py-16 xl:py-20 bg-muted">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            功能模块
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            丰富的功能模块，满足各类车辆管理需求
          </p>
        </div>
        <div class="grid gap-6 @container xl:grid-cols-4">
          <div
            v-for="(module, index) in modules"
            :key="index"
            class="p-4 xl:p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover flex max-xl:flex-row max-xl:items-start max-xl:gap-3 xl:flex-col"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 xl:mb-4">
              <component :is="module.icon" class="h-6 w-6 text-primary" />
            </div>
            <div class="min-w-0 flex-1 xl:contents">
              <h3 class="text-base font-bold mb-2 xl:text-lg max-sm:text-sm max-xl:mb-1">{{ module.name }}</h3>
              <p class="text-sm text-muted-foreground mb-4 max-sm:text-xs max-xl:mb-2">
                {{ module.description }}
              </p>
              <ul class="space-y-2 max-xl:space-y-1">
                <li
                  v-for="(feature, idx) in module.features"
                  :key="idx"
                  class="text-xs text-muted-foreground flex items-center gap-2"
                >
                  <div class="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-16 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            技术栈
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            采用主流技术栈，确保系统稳定高效
          </p>
        </div>
        <div class="w-full">
          <!-- Tabs：手机端可横向滑动 -->
          <div class="flex gap-2 mb-8 border-b border-border overflow-x-auto max-xl:-mx-4 max-xl:px-4 pb-px">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="[
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 shrink-0',
                activeTab === tab.value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              ]"
            >
              <component :is="tab.icon" class="h-4 w-4 shrink-0" />
              <span class="max-sm:text-xs whitespace-nowrap">{{ tab.label }}</span>
            </button>
          </div>

          <!-- Tab Content -->
          <div v-if="activeTab === 'backend'" class="grid gap-4 @container xl:grid-cols-4">
            <div
              v-for="(tech, index) in techStack.backend"
              :key="index"
              class="p-3 xl:p-4 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden"
            >
              <h3 class="text-base font-bold mb-2 xl:text-lg max-sm:text-sm">{{ tech.name }}</h3>
              <p class="text-sm text-muted-foreground max-sm:text-xs">
                {{ tech.description }}
              </p>
            </div>
          </div>

          <div v-if="activeTab === 'frontend'" class="grid gap-4 @container xl:grid-cols-3">
            <div
              v-for="(tech, index) in techStack.frontend"
              :key="index"
              class="p-3 xl:p-4 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden"
            >
              <h3 class="text-base font-bold mb-2 xl:text-lg max-sm:text-sm">{{ tech.name }}</h3>
              <p class="text-sm text-muted-foreground max-sm:text-xs">
                {{ tech.description }}
              </p>
            </div>
          </div>

          <div v-if="activeTab === 'mobile'" class="grid gap-4 @container xl:grid-cols-4">
            <div
              v-for="(tech, index) in techStack.mobile"
              :key="index"
              class="p-3 xl:p-4 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden"
            >
              <h3 class="text-base font-bold mb-2 xl:text-lg max-sm:text-sm">{{ tech.name }}</h3>
              <p class="text-sm text-muted-foreground max-sm:text-xs">
                {{ tech.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture Section -->
    <section class="py-16 xl:py-20 bg-muted">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            技术架构
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            分层架构设计，模块化开发，易于扩展维护
          </p>
        </div>
        <div class="max-w-6xl mx-auto">
          <div class="grid gap-6 @container xl:grid-cols-2">
            <div
              v-for="(layer, index) in architecture"
              :key="index"
              class="p-4 xl:p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover"
            >
              <div class="flex items-start gap-3 max-xl:gap-3 xl:gap-4">
                <div class="flex h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm xl:text-base font-bold shrink-0">
                  {{ index + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-bold mb-2 xl:text-xl max-sm:text-base">
                    {{ layer.layer }}
                  </h3>
                  <p class="text-sm text-muted-foreground xl:text-base max-sm:text-xs">
                    {{ layer.description }}
                  </p>
                </div>
              </div>
              <div class="mt-3 xl:mt-4 flex items-center gap-2 min-w-0">
                <Code class="h-4 w-4 text-muted-foreground shrink-0" />
                <span class="text-sm text-muted-foreground max-sm:text-xs break-words">
                  {{ layer.technologies }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Server,
  Monitor,
  Smartphone,
  MapPin,
  Activity,
  Bell,
  BarChart3,
  Users,
  Settings,
  FileText,
  Video,
  Code,
  Globe,
  User,
  Lock,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-vue-next'

const experienceUrl = 'https://iov.xlhd.cloud/login'
const experienceAccount = 'cctest'
const experiencePassword = 'abcd.1234'

const accountCopied = ref(false)
const passwordCopied = ref(false)

function setCopiedFeedback(field: 'account' | 'password') {
  if (field === 'account') accountCopied.value = true
  else passwordCopied.value = true
  setTimeout(() => {
    if (field === 'account') accountCopied.value = false
    else passwordCopied.value = false
  }, 1500)
}

function copyToClipboard(text: string, field: 'account' | 'password') {
  const doFallback = () => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    try {
      const ok = document.execCommand('copy')
      if (ok) setCopiedFeedback(field)
    } finally {
      document.body.removeChild(textarea)
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).then(() => setCopiedFeedback(field)).catch(doFallback)
  } else {
    doFallback()
  }
}

useHead({
  title: '系统介绍',
  meta: [
    { name: 'description', content: '全面了解北斗安心联车辆监控管理系统的技术架构、功能模块和支持协议。支持JT/T808、JT/T809、JT/T1078、苏标、粤标等协议，提供实时定位、历史轨迹、实时视频、视频回放、车辆管理、车务管理、排班调度、围栏管理、标注管理、路线规划、报警规则、里程报表、数据大屏等功能模块。采用Java、Spring Boot、Netty、Redis、MySQL、MongoDB等技术栈，支持ADAS/DSM高级驾驶辅助系统，支持油量、油杆、温度、湿度、重量、载重、门磁、正反转等传感器接入。' },
    { name: 'keywords', content: '车辆监控系统,系统架构,技术栈,JT/T808,JT/T809,JT/T1078,苏标协议,粤标协议,实时定位,历史轨迹,实时视频,视频回放,车辆管理,车务管理,排班调度,围栏管理,标注管理,路线规划,报警规则,里程报表,数据大屏,ADAS,DSM,高级驾驶辅助系统,Java,Spring Boot,Netty,Redis,MySQL,MongoDB,传感器,油量传感器,温度传感器,湿度传感器,载重传感器,门磁传感器,正反转传感器' }
  ]
})

const activeTab = ref('backend')

const tabs = [
  { value: 'backend', label: '后端技术', icon: Server },
  { value: 'frontend', label: '前端技术', icon: Monitor },
  { value: 'mobile', label: '移动端', icon: Smartphone },
]

const protocols = [
  {
    name: 'JT/T 808',
    description: '道路运输车辆卫星定位系统终端通信协议',
    status: '完全支持',
  },
  {
    name: 'JT/T 1078',
    description: '道路运输车辆卫星定位系统视频通信协议',
    status: '完全支持',
  },
  {
    name: 'JT/T 809',
    description: '道路运输车辆卫星定位系统平台数据交换协议',
    status: '完全支持',
  },
  {
    name: '苏标协议',
    description: '江苏省道路运输车辆主动安全智能防控系统',
    status: '完全支持',
  },
  {
    name: '粤标协议',
    description: '广东省道路运输车辆主动安全智能防控系统',
    status: '完全支持',
  },
  {
    name: '自定义协议',
    description: '支持企业自定义通信协议接入',
    status: '可定制',
  },
]

const modules = [
  {
    icon: MapPin,
    name: '实时监控',
    description: '车辆实时位置、状态、速度等信息监控',
    features: ['地图展示', '多车辆同时监控', '车辆分组管理', '实时轨迹显示'],
  },
  {
    icon: Activity,
    name: '轨迹回放',
    description: '历史轨迹查询与回放功能',
    features: ['多倍速回放', '轨迹导出', '停车点分析', '行驶报告'],
  },
  {
    icon: Bell,
    name: '报警管理',
    description: '多种报警类型的监控与处理',
    features: ['超速报警', '越界报警', '疲劳驾驶', '设备异常'],
  },
  {
    icon: BarChart3,
    name: '统计分析',
    description: '多维度数据统计与分析',
    features: ['里程统计', '油耗分析', '停车分析', '驾驶行为'],
  },
  {
    icon: Users,
    name: '车队管理',
    description: '车辆、驾驶员、车队的综合管理',
    features: ['车辆档案', '驾驶员管理', '车队分组', '权限管理'],
  },
  {
    icon: Video,
    name: '视频监控',
    description: '车载视频实时查看与录像回放',
    features: ['实时视频', '录像回放', '视频下载', '多路视频'],
  },
  {
    icon: Settings,
    name: '设备管理',
    description: '终端设备的配置与管理',
    features: ['参数设置', '远程升级', '设备诊断', '指令下发'],
  },
  {
    icon: FileText,
    name: '报表中心',
    description: '各类业务报表生成与导出',
    features: ['行驶报表', '报警报表', '统计报表', '自定义报表'],
  },
]

const techStack = {
  backend: [
    { name: 'Java', description: '后端核心开发语言' },
    { name: 'Spring Boot', description: '快速开发框架' },
    { name: 'Mybatis-plus', description: 'ORM框架' },
    { name: 'Netty', description: '高性能网络通信' },
    { name: 'Redis', description: '缓存与消息队列' },
    { name: 'MySQL', description: '关系型数据库' },
    { name: 'MongoDB', description: '文档型数据库' },
    { name: 'WebSocket', description: '实时通信' },
  ],
  frontend: [
    { name: 'Vue 3', description: '前端框架' },
    { name: 'TypeScript', description: '类型安全' },
    { name: 'Element Plus', description: 'UI组件库' },
    { name: 'ECharts', description: '数据可视化' },
    { name: 'Leaflet', description: '地图引擎' },
    { name: 'WebSocket', description: '实时通信' },
  ],
  mobile: [
    { name: 'Uniapp', description: '跨平台移动开发' },
    { name: 'Vue 3', description: '开发框架' },
    { name: 'Android', description: '原生Android支持' },
    { name: 'iOS', description: '原生iOS支持' },
  ],
}

const architecture = [
  {
    layer: '接入层',
    description: '负责设备接入、协议解析、数据转换',
    technologies: 'Netty, Protocol Buffer',
  },
  {
    layer: '数据层',
    description: '数据存储、缓存、消息队列',
    technologies: 'MySQL, MongoDB, Redis, Caffeine',
  },
  {
    layer: '业务层',
    description: '核心业务逻辑处理、数据计算分析',
    technologies: 'Spring Boot, Mybatis-plus',
  },
  {
    layer: '应用层',
    description: 'Web端、移动端应用',
    technologies: 'Vue 3, Uniapp',
  },
]
</script>
