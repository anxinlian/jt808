// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // 开发服务器：监听所有网卡，支持通过局域网 IP 访问
  devServer: {
    host: '0.0.0.0',
  },

  // 消除启动时 "#app-manifest" 预解析告警（不影响运行，仅关闭实验性 manifest）
  experimental: {
    appManifest: false,
  },

  // 兼容性日期
  compatibilityDate: '2026-01-17',
  
  // 启用 TypeScript
  typescript: {
    strict: true,
    typeCheck: false  // 禁用类型检查，如需启用请安装 vue-tsc
  },

  // CSS 配置
  css: ['~/assets/css/main.css'],

  // 模块配置（@nuxt/content 需在 sitemap 前以便构建期解析文章路由）
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxtjs/sitemap'],

  // Tailwind CSS 配置
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },

  // PostCSS 配置
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // 站点 URL（@nuxtjs/sitemap / useSiteConfig 生成正确域名）
  site: {
    url: 'https://www.xlhd.info',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  // Nuxt Content：Node 22.5+ 使用 node:sqlite，避免依赖 better-sqlite3 原生编译
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  // 应用配置
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '星联互动 - 北斗安心联车辆定位监控系统',
      meta: [
        { name: 'description', content: '河南星联互动科技有限公司专注于北斗/GPS车辆位置信息系统，支持JT/T808、JT/T809、JT/T1078等协议，提供实时定位、历史轨迹、实时视频、视频回放、车辆管理、车务管理、排班调度、围栏管理、标注管理、路线规划、报警规则、里程报表、数据大屏等功能。支持ADAS/DSM高级驾驶辅助系统，支持油量、油杆、温度、湿度、重量、载重、门磁、正反转等传感器。适用于商砼车、油罐车、大巴车、景区车、物流运输等多种车辆类型。' },
        { name: 'keywords', content: '车辆定位,北斗定位,GPS监控,车辆管理系统,轨迹回放,实时定位,历史轨迹,实时视频,视频播放,视频回放,车辆管理,车务管理,排班调度,围栏管理,标注管理,路线规划,报警规则,里程报表,数据大屏,JT/T808,JT/T809,JT/T1078,ADAS,DSM,高级驾驶辅助系统,油量传感器,油杆传感器,温度传感器,湿度传感器,重量传感器,载重传感器,门磁传感器,正反转传感器,商砼车,油罐车,大巴车,景区车,物流运输,车辆监控系统,北斗车辆定位,车辆位置信息系统' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  // SSG/SSR 配置 - 启用静态站点生成
  nitro: {
    prerender: {
      // 从这些入口爬取站内链接并预渲染（不必逐篇写 /articles/xxx）
      crawlLinks: true,
      routes: [
        '/',
        '/sitemap.xml',
        '/system',
        '/product',
        '/cases',
        '/news',
        '/about',
        '/news/industry',
        '/news/product-doc',
        '/news/tech-doc',
      ]
    }
  },

  // 构建配置
  build: {
    transpile: []
  },

  // 运行时配置
  runtimeConfig: {
    public: {
      // 可以在这里添加公共环境变量
    }
  },

  // 兼容性配置
  compatibility: {
    date: false
  }
})