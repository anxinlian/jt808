<template>
  <div class="flex flex-col min-h-screen">
    <!-- Carousel Section -->
    <section class="relative w-full">
      <div class="relative h-[400px] xl:h-[500px] max-sm:h-[350px] overflow-hidden bg-black">
        <div class="relative w-full h-full">
          <div
            v-for="(slide, index) in carouselSlides"
            :key="index"
            class="absolute inset-0 transition-opacity duration-500 ease-in-out"
            :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
          >
            <img
              :src="slide.image"
              :alt="slide.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            <div class="relative z-10 container mx-auto px-4 xl:px-8 h-full flex items-center">
              <div class="max-w-2xl">
                <p class="text-3xl font-bold mb-4 xl:text-5xl max-sm:text-2xl text-white drop-shadow-lg">
                  {{ slide.title }}
                </p>
                <p class="text-base xl:text-xl max-sm:text-sm text-white/95 leading-relaxed mb-6 xl:mb-8 drop-shadow-md">
                  {{ slide.description }}
                </p>
                <NuxtLink to="/about#contact">
                  <button class="px-6 py-3 bg-secondary text-secondary-foreground rounded-md shadow-xl hover:shadow-2xl transition-all hover:scale-105 mobile-button-enhance flex items-center">
                    了解详情
                    <ArrowRight class="ml-2 h-4 w-4" />
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <!-- 轮播控制 -->
        <button
          @click="handlePrevSlide"
          class="absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm cursor-pointer"
          aria-label="上一张"
        >
          <ChevronLeft class="h-6 w-6 text-white" />
        </button>
        <button
          @click="handleNextSlide"
          class="absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm cursor-pointer"
          aria-label="下一张"
        >
          <ChevronRight class="h-6 w-6 text-white" />
        </button>
        <!-- 轮播指示器 -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          <button
            v-for="(slide, index) in carouselSlides"
            :key="index"
            @click="() => { currentSlide = index; resetAutoPlay(); }"
            :class="[
              'h-2 rounded-full transition-all cursor-pointer',
              currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
            ]"
            :aria-label="`切换到第${index + 1}张`"
          />
        </div>
      </div>
    </section>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-background py-16 xl:py-24">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="grid gap-8 @container xl:grid-cols-2 xl:gap-12 items-center mb-16 xl:mb-24">
          <div class="flex flex-col @md:flex-row">
            <div class="flex-1">
              <span class="inline-block px-3 py-1 mb-4 bg-primary text-primary-foreground rounded-md text-sm">
                北斗安心联
              </span>
              <h1 class="text-3xl font-bold mb-4 text-foreground xl:text-5xl xl:mb-6 max-sm:text-2xl">
                车辆定位监控系统
              </h1>
              <p class="text-base mb-6 text-muted-foreground xl:text-lg xl:mb-8 max-sm:text-sm leading-relaxed">
                北斗安心联车辆定位监控系统是基于Java开发的北斗/GPS车辆动态定位监控。系统分为基础版、视频版和主动安全版，并且支持定制化开发，全方位满足不同客户的车辆管理需求。公司自主研发，拥有完整知识产权。系统长期稳定运行，支撑数万辆车同时在线，基础设备数据延迟不超过1秒。支持电脑端、安卓端、苹果端和小程序端以供不同客户选择使用。
              </p>
              <div class="flex flex-col gap-4 @md:flex-row @md:gap-4">
                <NuxtLink to="/system">
                  <button class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full @md:w-auto flex items-center">
                    了解更多
                    <ArrowRight class="ml-2 h-4 w-4" />
                  </button>
                </NuxtLink>
                <NuxtLink to="/product">
                  <button class="px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors w-full @md:w-auto">
                    查看产品
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="flex flex-col @md:flex-row">
            <div class="flex-1 relative">
              <img
                src="/images/index_realtime.png"
                alt="车辆监控管理平台"
                class="rounded-lg shadow-card w-full h-auto"
              />
            </div>
          </div>
        </div>

        <!-- 应用场景 -->
        <div class="grid gap-8 @container xl:grid-cols-2 xl:gap-12 items-center">
          <div class="flex flex-col @md:flex-row xl:order-2">
            <div class="flex-1">
              <h2 class="text-2xl font-bold mb-4 text-foreground xl:text-4xl xl:mb-6 max-sm:text-xl">
                广泛的应用场景
              </h2>
              <p class="text-base mb-6 text-muted-foreground xl:text-lg xl:mb-8 max-sm:text-sm leading-relaxed">
                平台覆盖校车、餐车、泵车、公务车、渣土车、环卫车、公交车、出租车、分期车、租赁车、冷链运输车、混凝土搅拌车、物流运输车、油品运输车、景区摆渡车等多种应用场景，提供全面的位置监控、视频监控、车队管理、排班调度、报警监控和数据分析服务。支持对接视频、油耗、载重、温度、滚筒、门磁等多种硬件传感器，实现车辆状态的全方位监控，让数据驱动决策。
              </p>
              <NuxtLink to="/cases">
                <button class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full @md:w-auto flex items-center">
                  查看案例
                  <ArrowRight class="ml-2 h-4 w-4" />
                </button>
              </NuxtLink>
            </div>
          </div>
          <div class="flex flex-col @md:flex-row xl:order-1">
            <div class="flex-1 relative">
              <img
                src="/images/index_bigdata.png"
                alt="数据大屏"
                class="rounded-lg shadow-card w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 xl:py-24 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12 xl:mb-16">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-4xl max-sm:text-xl mobile-heading-underline inline-block">
            核心功能
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm mt-6">
            全面的车辆监控管理功能，满足各类业务需求
          </p>
        </div>
        <div class="grid gap-6 @container xl:grid-cols-3 xl:gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden group card-hover flex max-xl:flex-row max-xl:items-start max-xl:gap-3 xl:flex-col"
          >
            <div class="mobile-icon-wrapper shrink-0 xl:mb-4 transition-smooth group-hover:scale-110">
              <component :is="feature.icon" class="h-6 w-6 text-primary" />
            </div>
            <div class="min-w-0 flex-1 xl:contents">
              <h3 class="text-lg font-bold mb-2 xl:text-xl max-sm:text-base mobile-title-accent max-xl:mb-1">
                {{ feature.title }}
              </h3>
              <p class="text-sm text-muted-foreground mobile-text-enhance xl:text-base max-sm:text-xs max-xl:mb-0">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section class="py-16 xl:py-24 bg-muted">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12 xl:mb-16">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-4xl max-sm:text-xl mobile-heading-underline inline-block">
            系统亮点
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm mt-6">
            专业技术与创新设计，打造卓越的车辆监控管理体验
          </p>
        </div>
        <div class="grid gap-6 @container xl:grid-cols-2 xl:gap-8">
          <div
            v-for="(highlight, index) in highlights"
            :key="index"
            class="mobile-card p-6 rounded-lg card-hover mobile-gradient-accent xl:p-8"
          >
            <h3 class="text-lg font-bold text-foreground mb-3 xl:text-xl max-sm:text-base mobile-title-accent">
              {{ highlight.title }}
            </h3>
            <p class="text-sm text-muted-foreground mobile-text-enhance xl:text-base max-sm:text-xs">
              {{ highlight.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="py-16 xl:py-24 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="grid gap-8 @container xl:grid-cols-2 xl:gap-12 items-center">
          <div class="flex flex-col @md:flex-row order-2 xl:order-1">
            <div class="flex-1">
              <img
                src="/images/index_realtime.png"
                alt="车辆GPS定位追踪"
                class="rounded-lg shadow-card w-full h-auto"
              />
            </div>
          </div>
          <div class="flex flex-col @md:flex-row order-1 xl:order-2">
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-4xl max-sm:text-xl">
                技术优势
              </h2>
              <p class="text-base text-muted-foreground mb-6 xl:text-lg max-sm:text-sm">
                采用先进的技术架构，确保系统稳定可靠、高效运行
              </p>
              <div class="grid gap-3">
                <div
                  v-for="(advantage, index) in advantages"
                  :key="index"
                  class="flex items-start gap-3"
                >
                  <CheckCircle2 class="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span class="text-sm text-foreground xl:text-base max-sm:text-xs">{{ advantage }}</span>
                </div>
              </div>
              <div class="mt-8">
                <NuxtLink to="/system">
                  <button class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full @md:w-auto flex items-center">
                    查看系统介绍
                    <ArrowRight class="ml-2 h-4 w-4" />
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 xl:py-24 bg-primary text-primary-foreground">
      <div class="container mx-auto px-4 xl:px-8 text-center">
        <h2 class="text-2xl font-bold mb-4 xl:text-4xl max-sm:text-xl">
          立即开始使用北斗安心联
        </h2>
        <p class="text-base mb-8 text-primary-foreground/90 xl:text-lg max-sm:text-sm">
          选择适合您的产品版本，开启智能车辆管理之旅
        </p>
        <div class="flex flex-col gap-4 justify-center @container xl:flex-row">
                <NuxtLink to="/product">
            <button class="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors w-full xl:w-48">
              查看产品版本
            </button>
          </NuxtLink>
          <NuxtLink to="/about#contact">
            <button class="px-6 py-3 border border-primary-foreground rounded-md hover:bg-primary-foreground/10 transition-colors w-full xl:w-48">
              联系我们
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  MapPin, 
  Activity, 
  Bell, 
  BarChart3, 
  FileText, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  Video,
  Play,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

// SEO 配置
useHead({
  title: '首页',
  meta: [
  { name: 'description', content: '河南星联互动科技有限公司专注于北斗/GPS车辆位置信息系统，支持JT/T808、JT/T809、JT/T1078等协议，提供实时定位、历史轨迹、实时视频、视频回放、车辆管理、车务管理、排班调度、围栏管理、标注管理、路线规划、报警规则、里程报表、数据大屏等功能。支持ADAS/DSM高级驾驶辅助系统，支持油量、油杆、温度、湿度、重量、载重、门磁、正反转等传感器。适用于商砼车、油罐车、大巴车、景区车、物流运输等多种车辆类型。' },
  { name: 'keywords', content: '车辆定位,北斗定位,GPS监控,车辆管理系统,轨迹回放,实时定位,历史轨迹,实时视频,视频播放,视频回放,车辆管理,车务管理,排班调度,围栏管理,标注管理,路线规划,报警规则,里程报表,数据大屏,JT/T808,JT/T809,JT/T1078,ADAS,DSM,高级驾驶辅助系统,油量传感器,油杆传感器,温度传感器,湿度传感器,重量传感器,载重传感器,门磁传感器,正反转传感器,商砼车,油罐车,大巴车,景区车,物流运输,车辆监控系统,北斗车辆定位,车辆位置信息系统' }
  ]
})

// 轮播图数据
const carouselSlides = [
{
    title: '支持免费试用',
    description: '永久免费试用，不限期限，功能完整，让您充分体验北斗安心联车辆监控管理系统的强大功能',
    image: '/images/index_181442689.jpg',
  },
  {
    title: '源码开放出售',
    description: '提供完整的系统源码，支持二次开发和定制化需求，帮助企业快速构建专属的车辆监控管理平台',
    image: '/images/index_8t6k7f6wy0ox.jpg',
  },
  {
    title: '全方位技术支持',
    description: '专业技术团队在线支持，提供系统部署、功能定制、问题排查等全方位技术服务保障',
    image: '/images/index_181442589.jpg',
  },
  {
    title: '车辆快速接入',
    description: '支持多种设备协议，快速接入各类车载终端设备，简化部署流程，让您的车辆监控系统快速上线运行',
    image: '/images/index_10382714.jpg',
  },
]

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselSlides.length) % carouselSlides.length
}

onMounted(() => {
  // 重置自动播放定时器
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  slideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})

// 点击按钮时重置自动播放
const resetAutoPlay = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  slideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const handleNextSlide = () => {
  nextSlide()
  resetAutoPlay()
}

const handlePrevSlide = () => {
  prevSlide()
  resetAutoPlay()
}

// 功能列表
const features = [
  {
    icon: MapPin,
    title: '实时定位',
    description: '基于北斗/GPS双模定位，实时掌握车辆位置信息',
  },
  {
    icon: Activity,
    title: '轨迹回放',
    description: '历史轨迹完整记录，支持多倍速回放查看',
  },
  {
    icon: Bell,
    title: '智能报警',
    description: '超速、越界以及其他传感器报警等多种报警类型',
  },
  {
    icon: Video,
    title: '实时视频',
    description: '支持车载摄像头实时视频监控，远程查看车内外情况',
  },
  {
    icon: Play,
    title: '视频回放',
    description: '历史视频录像存储与回放，支持多路视频同步查看',
  },
  {
    icon: Shield,
    title: '主动安全',
    description: '前向碰撞预警、车道偏离预警、疲劳驾驶检测等主动安全功能',
  },
  {
    icon: BarChart3,
    title: '数据统计',
    description: '里程、油耗、停车等多维度数据分析',
  },
  {
    icon: FileText,
    title: '车务管理',
    description: '车辆档案、保险、年检、维修等全生命周期管理',
  },
  {
    icon: Calendar,
    title: '排班调度',
    description: '智能排班、任务分配、调度优化，提升运营效率',
  },
]

// 系统亮点
const highlights = [
  {
    title: '精准定位高效传输',
    description: '采用北斗/GPS双模定位技术，实现高精度实时定位，误差范围小于5米，确保车辆位置信息的准确性。支持4G/5G无线通信技术，数据传输速度快、延迟低，确保监控数据实时更新。',
  },
  {
    title: '灵活定制能力',
    description: '模块化设计赋予源码极高的可塑性，无论是功能增减、界面优化还是深度改造，都能快速迭速实现，精准匹配您的独特业务场景，满足个性化需求。',
  },
  {
    title: '高效稳定架构',
    description: '采用先进设计理念，确保系统运行流畅，轻松应对业务拓展需求，降低运维成本与风险，让您的项目始终处于最佳状态。',
  },
  {
    title: '多平台支持',
    description: '系统支持电脑、安卓、苹果和小程序等多种终端，方便用户随时随地监控车辆状态。',
  },
  {
    title: '强大的兼容性',
    description: '兼容多种硬件设备，支持对接视频、油耗、载重、温度等多种传感器，实现车辆状态的全方位监控。',
  },
  {
    title: '深度优化潜力',
    description: '源码结构清晰、注释详尽，为优化与改进提供广阔空间，您可在此基础上按需提升系统、拓展新功能，持续提升产品竞争力，创造更多价值。',
  },
]

// 技术优势
const advantages = [
  '支持多种通信协议（JT/T808、JT/T1078等）',
  '支持ADAS/DSM主动安全功能',
  '支持多种设备类型接入',
  '支持私有化部署',
  '提供完整的API接口',
  '支持大规模车辆并发',
  // '7×24小时技术支持',
]
</script>

