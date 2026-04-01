<template>
  <div class="flex flex-col min-h-screen">
    <LayoutsHeader />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <LayoutsFooter />
    <CommonBackToTop />
  </div>
</template>

<script setup lang="ts">
const siteUrl = 'https://www.xlhd.info'
const route = useRoute()

// 每页 canonical URL，避免重复收录
const canonical = computed(() => {
  const path = route.path === '/' ? '' : route.path
  return `${siteUrl}${path}`
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 河南星联互动科技有限公司` : '星联互动 - 北斗安心联车辆定位监控系统'
  },
  link: [{ rel: 'canonical', href: canonical }],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: '河南星联互动科技有限公司专注于北斗/GPS车辆位置信息系统，支持JT/T808、JT/T809、JT/T1078等协议，提供实时定位、历史轨迹、实时视频、视频回放、车辆管理、车务管理、排班调度、围栏管理、标注管理、路线规划、报警规则、里程报表、数据大屏等功能。' },
    { name: 'keywords', content: '车辆定位,北斗定位,GPS监控,车辆管理系统,轨迹回放,实时定位,历史轨迹,实时视频,视频播放,视频回放,车辆管理,车务管理,排班调度,围栏管理,标注管理,路线规划,报警规则,里程报表,数据大屏,JT/T808,JT/T809,JT/T1078,ADAS,DSM,高级驾驶辅助系统,油量传感器,油杆传感器,温度传感器,湿度传感器,重量传感器,载重传感器,门磁传感器,正反转传感器,商砼车,油罐车,大巴车,景区车,物流运输,车辆监控系统,北斗车辆定位,车辆位置信息系统' }
  ]
})

// 组织/企业结构化数据，便于搜索引擎展示公司信息（百度、Google 等）
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '河南星联互动科技有限公司',
  alternateName: '星联互动',
  url: siteUrl,
  logo: `${siteUrl}/favicon.png`,
  description: '河南星联互动科技有限公司专注于北斗/GPS车辆位置信息系统，支持JT/T808、JT/T809、JT/T1078等协议，提供实时定位、历史轨迹、实时视频、车辆管理、围栏管理、数据大屏等功能。',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CN',
    addressRegion: '河南省',
  },
}
useHead({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify(organizationJsonLd),
    },
  ],
})
</script>
