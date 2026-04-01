<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <section class="bg-gradient-primary py-12 xl:py-16">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center text-primary-foreground">
          <h1 class="text-3xl font-bold mb-4 xl:text-4xl max-sm:text-2xl">项目案例</h1>
          <p class="text-base xl:text-lg max-sm:text-sm text-primary-foreground/90">
            真实案例展示，见证北斗安心联系统的实际应用效果
          </p>
        </div>
      </div>
    </section>

    <!-- Cases Section -->
    <section class="py-16 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="space-y-16">
          <div
            v-for="(caseItem, index) in cases"
            :key="index"
            :class="[
              'grid gap-8 @container xl:grid-cols-2 xl:gap-12 items-center',
              index % 2 === 1 ? 'xl:flex-row-reverse' : ''
            ]"
          >
            <!-- 图片 -->
            <div
              :class="[
                'flex flex-col @md:flex-row',
                index % 2 === 1 ? 'order-2 xl:order-1' : 'order-2 xl:order-2'
              ]"
            >
              <div class="flex-1">
                <img
                  :src="caseItem.image"
                  :alt="caseItem.title"
                  class="rounded-lg shadow-card w-full h-auto"
                />
              </div>
            </div>

            <!-- 内容 -->
            <div
              :class="[
                'flex flex-col @md:flex-row',
                index % 2 === 1 ? 'order-1 xl:order-2' : 'order-1 xl:order-1'
              ]"
            >
              <div class="flex-1">
                <div class="flex items-center gap-4 mb-4">
                  <div class="mobile-icon-wrapper">
                    <component :is="caseItem.icon" class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-foreground xl:text-3xl max-sm:text-xl mobile-title-accent">
                      {{ caseItem.title }}
                    </h2>
                    <div class="flex gap-2 mt-2 flex-wrap">
                      <span class="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                        {{ caseItem.industry }}
                      </span>
                      <span class="px-2 py-1 text-xs border border-border rounded-md">
                        {{ caseItem.scale }}
                      </span>
                    </div>
                  </div>
                </div>

                <p class="text-base text-muted-foreground mb-6 xl:text-lg max-sm:text-sm mobile-text-enhance">
                  {{ caseItem.description }}
                </p>

                <div class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden mb-4">
                  <h3 class="text-lg font-bold mb-4 xl:text-xl max-sm:text-base">功能特点</h3>
                  <div class="grid gap-3 @container @md:grid-cols-2">
                    <div
                      v-for="(feature, idx) in caseItem.features"
                      :key="idx"
                      class="flex items-start gap-2"
                    >
                      <div class="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                      <span class="text-sm text-foreground xl:text-base max-sm:text-xs">
                        {{ feature }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden">
                  <h3 class="text-lg font-bold mb-4 xl:text-xl max-sm:text-base">项目成效</h3>
                  <div class="grid gap-3 @container @md:grid-cols-2">
                    <div
                      v-for="(benefit, idx) in caseItem.benefits"
                      :key="idx"
                      class="flex items-center gap-2 bg-card p-3 rounded-lg"
                    >
                      <div class="h-2 w-2 rounded-full bg-accent shrink-0" />
                      <span class="text-sm font-medium text-foreground xl:text-base max-sm:text-xs">
                        {{ benefit }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 xl:py-20 bg-primary text-primary-foreground">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold mb-4 xl:text-3xl max-sm:text-xl">
            服务数据
          </h2>
          <p class="text-base xl:text-lg max-sm:text-sm text-primary-foreground/90">
            用数据说话，见证我们的专业与实力
          </p>
        </div>
        <div class="grid gap-8 @container xl:grid-cols-4">
          <div class="text-center">
            <div class="text-4xl font-bold mb-2 xl:text-5xl max-sm:text-3xl">10000+</div>
            <div class="text-base text-primary-foreground/90 xl:text-lg max-sm:text-sm">
              服务车辆数
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2 xl:text-5xl max-sm:text-3xl">100+</div>
            <div class="text-base text-primary-foreground/90 xl:text-lg max-sm:text-sm">
              合作企业
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2 xl:text-5xl max-sm:text-3xl">99.9%</div>
            <div class="text-base text-primary-foreground/90 xl:text-lg max-sm:text-sm">
              系统稳定性
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold mb-2 xl:text-5xl max-sm:text-3xl">24/7</div>
            <div class="text-base text-primary-foreground/90 xl:text-lg max-sm:text-sm">
              技术支持
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Bus, Banknote, Truck, Trash2, HardHat } from 'lucide-vue-next'

useHead({
  title: '项目案例',
  meta: [
    { name: 'description', content: '查看北斗安心联车辆定位监控系统的成功案例，包括校车、运钞车、快递、环卫、渣土车、商砼车、油罐车、大巴车、景区车、物流运输等多个应用场景。系统支持JT/T808、JT/T809、JT/T1078等协议，提供实时定位、历史轨迹、实时视频、视频回放、车辆管理、ADAS/DSM主动安全、围栏管理、标注管理、路线规划、报警规则、里程报表、数据大屏等功能。支持油量、油杆、温度、湿度、重量、载重、门磁、正反转等传感器，为各类车辆提供专业的监控管理解决方案。' },
    { name: 'keywords', content: '车辆定位系统案例,车辆监控系统案例,校车监控案例,运钞车监控案例,快递车辆监控,环卫车监控案例,渣土车监控案例,商砼车监控案例,油罐车监控案例,大巴车监控案例,景区车监控案例,物流运输监控案例,车辆管理系统成功案例,北斗定位系统案例,车辆监控系统应用案例' }
  ]
})

const cases = [
  {
    icon: Bus,
    title: '湖南省某市校车项目',
    industry: '校车运营',
    scale: '车辆规模: 100+',
    description: '该项目为市级标杆建设项目，通过该项目为全市建立起校车安全监管机制，按照"政府主导、公司管理、部门监管、市场运作"的原则，校车具备专业智能视频设备承担中小学生和幼儿接送任务，为近万名中小学生提供优质安全校车服务。',
    features: [
      '实时定位监控',
      '视频监控系统',
      '超速报警提醒',
      '学生上下车管理',
      '行驶轨迹回放',
      '家长实时查询',
    ],
    benefits: [
      '保障学生出行安全',
      '提升校车管理效率',
      '家长放心安心',
      '政府监管便捷',
    ],
    image: '/images/case_xiaoche.jpg',
  },
  {
    icon: Banknote,
    title: '广西省某银行运钞车视频监控项目',
    industry: '金融安全',
    scale: '车辆规模: 50+',
    description: '为广西省某银行的全省运钞车提供车载视频监控系统，搭载部标视频主机、高清摄像机、远程控制等设备，实现运钞车远程可视化监控及控制，确保资金运输全程安全可控。',
    features: [
      '高清视频监控',
      '实时定位追踪',
      '远程视频查看',
      '紧急报警功能',
      '行驶轨迹记录',
      '多级权限管理',
    ],
    benefits: [
      '资金运输安全保障',
      '实时监控可视化',
      '应急响应及时',
      '运营风险降低',
    ],
    image: '/images/case_yinhang.jpg',
  },
  {
    icon: Truck,
    title: '北京某大型快递企业车载监控系统项目',
    industry: '物流运输',
    scale: '车辆规模: 300+',
    description: '为北京某大型快递企业旗下的厢式货车、半挂牵引车等车辆，实现了远程监控、远程语音对讲、报警预录、轨迹查询、紧急报警等功能，全面提升物流运输安全性和管理效率。',
    features: [
      '实时定位监控',
      '远程语音对讲',
      '报警预录功能',
      '轨迹查询回放',
      '紧急报警响应',
      '车辆状态监测',
    ],
    benefits: [
      '运输安全提升',
      '调度效率优化',
      '货物追踪便捷',
      '管理成本降低',
    ],
    image: '/images/case_kuaidi.jpg',
  },
  {
    icon: Trash2,
    title: '江苏省多市环卫项目',
    industry: '环卫管理',
    scale: '车辆规模: 200+',
    description: '我司为江苏省多地环卫车辆提供车载监控建设方案，实现了远程监控、远程语音对讲、主动安全、轨迹查询、油耗监测等功能，整体覆盖环卫车辆运营全流程，有效提升环卫作业效率和管理水平。',
    features: [
      '实时位置监控',
      '作业轨迹记录',
      '远程语音对讲',
      '油耗数据统计',
      '主动安全预警',
      '作业质量监督',
    ],
    benefits: [
      '作业效率提升',
      '运营成本降低',
      '管理透明化',
      '服务质量提高',
    ],
    image: '/images/case_huanwei.png',
  },
  {
    icon: HardHat,
    title: '浙江省某市渣土车项目',
    industry: '工程运输',
    scale: '车辆规模: 150+',
    description: '浙江某市统一要求全市范围内渣土车辆配置车载智能设备，通过智能监控、主动安全、盲区监测、货箱监测等系统，实现全物流、主动安全、盲区监测、货箱监测等功能，从而提升运营效率，进一步降低渣土车安全驾驶风险。',
    features: [
      '智能监控系统',
      '主动安全预警',
      '盲区监测提醒',
      '货箱状态监测',
      '超速超载报警',
      '轨迹回放分析',
    ],
    benefits: [
      '安全事故减少',
      '违规行为杜绝',
      '运营效率提升',
      '环境污染降低',
    ],
    image: '/images/case_zhatu.jpg',
  },
]
</script>
