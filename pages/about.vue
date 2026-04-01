<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <section class="bg-gradient-primary py-12 xl:py-16">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center text-primary-foreground">
          <h1 class="text-3xl font-bold mb-4 xl:text-4xl max-sm:text-2xl">关于我们</h1>
          <p class="text-base xl:text-lg max-sm:text-sm text-primary-foreground/90">
            了解星联互动，专业的车辆位置信息系统服务商
          </p>
        </div>
      </div>
    </section>

    <!-- Company Info -->
    <section class="py-16 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="grid gap-8 @container xl:grid-cols-2 xl:gap-12 items-center">
          <div class="flex flex-col @md:flex-row">
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 class="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-foreground xl:text-3xl max-sm:text-xl">
                    {{ companyInfo.name }}
                  </h2>
                  <div class="flex gap-2 mt-2 flex-wrap">
                    <span class="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                      成立于{{ companyInfo.founded }}
                    </span>
                    <span class="px-2 py-1 text-xs border border-border rounded-md">
                      {{ companyInfo.location }}
                    </span>
                  </div>
                </div>
              </div>
              <p class="text-base text-muted-foreground mb-4 xl:text-lg max-sm:text-sm leading-relaxed">
                {{ companyInfo.description }}
              </p>
              <p class="text-base text-muted-foreground mb-4 xl:text-lg max-sm:text-sm leading-relaxed">
                {{ companyInfo.applications }}
              </p>
              <p class="text-base text-muted-foreground mb-6 xl:text-lg max-sm:text-sm leading-relaxed">
                {{ companyInfo.achievement }}
              </p>
              <div class="grid gap-3 @container xl:grid-cols-2">
                <div
                  v-for="(advantage, index) in advantages"
                  :key="index"
                  class="flex items-start gap-3"
                >
                  <CheckCircle2 class="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span class="text-sm text-foreground xl:text-base max-sm:text-xs">
                    {{ advantage }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col @md:flex-row">
            <div class="flex-1">
              <img
                src="/images/about.jpg"
                alt="公司介绍"
                class="rounded-lg shadow-card w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 xl:py-20 bg-muted">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            企业价值观
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            坚持以下核心价值观，为客户创造更大价值
          </p>
        </div>
        <div class="grid gap-6 @container xl:grid-cols-4 xl:gap-8">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="p-4 xl:p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover flex max-xl:flex-row max-xl:items-start max-xl:gap-3 xl:flex-col"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 xl:mb-4">
              <component :is="value.icon" class="h-6 w-6 text-primary" />
            </div>
            <div class="min-w-0 flex-1 xl:contents">
              <h3 class="text-lg font-bold mb-2 xl:text-xl max-sm:text-base max-xl:mb-1">{{ value.title }}</h3>
              <p class="text-sm text-muted-foreground xl:text-base max-sm:text-xs leading-relaxed max-xl:mb-0">
                {{ value.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 xl:py-20 bg-background">
      <div class="container mx-auto px-4 xl:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-4 xl:text-3xl max-sm:text-xl">
            服务内容
          </h2>
          <p class="text-base text-muted-foreground xl:text-lg max-sm:text-sm">
            提供全方位的车辆监控管理系统服务
          </p>
        </div>
        <div class="grid gap-6 @container xl:grid-cols-4 xl:gap-8">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover"
          >
            <h3 class="text-lg font-bold mb-4 xl:text-xl max-sm:text-base">{{ service.title }}</h3>
            <ul class="space-y-2">
              <li
                v-for="(item, idx) in service.items"
                :key="idx"
                class="flex items-start gap-2"
              >
                <div class="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                <span class="text-sm text-foreground xl:text-base max-sm:text-xs">
                  {{ item }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-16 xl:py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden scroll-mt-20">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary-foreground blur-3xl" />
        <div class="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-primary-foreground blur-3xl" />
      </div>
      
      <div class="container mx-auto px-4 xl:px-8 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold mb-4 xl:text-3xl max-sm:text-xl">
            联系我们
          </h2>
          <p class="text-base xl:text-lg max-sm:text-sm text-primary-foreground/90 mb-2">
            如果您有任何问题或合作意向，可以通过以下方式与我们联系
          </p>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <div class="grid gap-6 @container xl:grid-cols-2 mb-8">
            <!-- 商务合作 -->
            <div class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover bg-card">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shrink-0">
                  <Phone class="h-7 w-7" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold mb-2 xl:text-xl max-sm:text-base text-foreground">商务合作</h3>
                  <a 
                    :href="`tel:${contact.business}`"
                    class="text-2xl font-bold text-primary hover:text-secondary transition-colors xl:text-3xl max-sm:text-xl"
                  >
                    {{ contact.business }}
                  </a>
                </div>
              </div>
            </div>

            <!-- 客户服务 -->
            <div class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover bg-card">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shrink-0">
                  <Users class="h-7 w-7" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold mb-2 xl:text-xl max-sm:text-base text-foreground">客户服务</h3>
                  <a 
                    :href="`tel:${contact.service}`"
                    class="text-2xl font-bold text-primary hover:text-secondary transition-colors xl:text-3xl max-sm:text-xl"
                  >
                    {{ contact.service }}
                  </a>
                </div>
              </div>
            </div>

            <!-- 公司邮箱 -->
            <div class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover bg-card">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shrink-0">
                  <Mail class="h-7 w-7" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold mb-2 xl:text-xl max-sm:text-base text-foreground">公司邮箱</h3>
                  <a 
                    :href="`mailto:${contact.email}`"
                    class="text-base font-semibold text-primary hover:text-secondary transition-colors xl:text-lg max-sm:text-sm break-all"
                  >
                    {{ contact.email }}
                  </a>
                </div>
              </div>
            </div>

            <!-- 公司官网 -->
            <div class="p-6 rounded-lg shadow-card border border-border/50 mobile-gradient-accent overflow-hidden card-hover bg-card">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shrink-0">
                  <Globe class="h-7 w-7" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold mb-2 xl:text-xl max-sm:text-base text-foreground">公司官网</h3>
                  <a 
                    :href="contact.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-base font-semibold text-primary hover:text-secondary transition-colors xl:text-lg max-sm:text-sm break-all"
                  >
                    {{ contact.website }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <div class="inline-block bg-card/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-primary-foreground/20">
              <p class="text-lg font-medium text-primary-foreground xl:text-xl max-sm:text-base">
                我们期待与您的沟通合作，共创美好未来！
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Building2,
  Target,
  Award,
  Users,
  Mail,
  Phone,
  Globe,
  CheckCircle2
} from 'lucide-vue-next'

useHead({
  title: '关于我们',
  meta: [
    { name: 'description', content: '了解河南星联互动科技有限公司和北斗安心联车辆定位监控系统。星联互动成立于2020年，位于河南郑州大学科技园东区，专注于北斗/GPS车辆位置信息系统，提供车务管理、位置监控、视频监控、轨迹查询、保养提醒、油量监测等服务。支持JT/T808、JT/T809、JT/T1078等协议，支持实时定位、历史轨迹、实时视频、视频回放、车辆管理、ADAS/DSM主动安全等功能。支持油量、油杆、温度、湿度、重量、载重、门磁、正反转等传感器，适用于商砼车、油罐车、大巴车、景区车、物流运输等多种车辆类型。' },
    { name: 'keywords', content: '河南星联互动,星联互动科技,车辆定位系统公司,车辆监控系统服务商,北斗定位系统公司,车辆管理系统供应商,郑州车辆定位系统,车辆监控系统厂家,车辆定位系统服务,车辆管理系统服务商' }
  ]
})

const companyInfo = {
  name: '河南星联互动科技有限公司',
  founded: '2020年',
  location: '河南郑州大学科技园东区',
  website: 'www.xlhd.info',
  description: '河南星联互动科技有限公司成立于2020年，位于河南郑州大学科技园东区。星联互动以物联网技术为基础，通过最先进的北斗/GPS卫星导航定位系统技术，为车队提供车务管理、位置监控、视频监控、轨迹查询、保养提醒、油量监测等服务。',
  applications: '公司产品已广泛应用于物流管理、汽车金融、政府事业单位车辆、汽车租赁、环卫、外勤劳务、牛羊畜牧、工程及混凝土车辆、长途客运车、景区大巴车、私家车、电瓶车、摩托车、船只、农业设备、工程机械等北斗/GPS定位追踪场景。',
  achievement: '公司已实现产品多元化、服务定制化，有效提高企业工作效率、降低企业成本、挽回经济损失、保障人财安全，受到广大客户的认可和赞赏。',
}

const values = [
  {
    icon: Target,
    title: '专业专注',
    description: '专注于车辆监控管理领域，深耕行业多年',
  },
  {
    icon: Award,
    title: '技术领先',
    description: '采用先进技术架构，持续创新优化',
  },
  {
    icon: Users,
    title: '客户至上',
    description: '以客户需求为导向，提供优质服务',
  },
  {
    icon: CheckCircle2,
    title: '品质保证',
    description: '严格的质量管理体系，确保产品稳定可靠',
  },
]

const services = [
  {
    title: '系统开发',
    items: [
      '车辆位置监控系统',
      '移动端APP开发',
      '微信小程序开发',
      '定制化功能开发',
    ],
  },
  {
    title: '技术服务',
    items: [
      '部署实施',
      '技术培训',
      '运维支持',
      '系统升级',
    ],
  },
  {
    title: '解决方案',
    items: [
      '物流运输解决方案',
      '公共交通解决方案',
      '景区大巴解决方案',
      '企业车队解决方案',
    ],
  },
  {
    title: '增值服务',
    items: [
      '数据分析',
      '报表定制',
      '接口对接',
      '系统集成',
    ],
  },
]

const advantages = [
  '10年以上行业经验',
  '服务超过100家企业',
  // '管理车辆超过1500辆',
  '系统稳定性达99.9%',
  '完善的售后服务体系',
]

const contact = {
  business: '18003857478',
  service: '13633857227',
  email: 'anxinlian@xlhd.info',
  website: 'https://www.xlhd.info',
}
</script>
