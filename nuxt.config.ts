// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { getArticlePrerenderRoutes } from './utils/articlePrerenderRoutes'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const articlePrerenderRoutes = getArticlePrerenderRoutes(rootDir)

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

  // 旧版静态站 .html 路径 → 新站路由（避免 Search Console 404、保留外链权重）
  routeRules: {
    '/index.html': { redirect: { to: '/', statusCode: 301 } },
    '/about.html': { redirect: { to: '/about', statusCode: 301 } },
    '/article_it/**': { redirect: { to: '/news/tech-doc', statusCode: 301 } },
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
      title: '星联互动·北斗安心联车辆定位监控系统',
      meta: [
        { name: 'description', content: '河南星联互动科技旗下北斗安心联，专注北斗/GPS车辆定位与车载视频监控管理系统研发，为物流、客运与政企车队提供定位轨迹、视频报警、主动安全与数据大屏的一体化监管平台及定制交付服务。' },
        { name: 'keywords', content: '车辆定位,北斗定位,GPS监控,JT808,车辆管理系统,轨迹回放,实时视频,视频回放,围栏报警,数据大屏,ADAS,DSM,物流监控,客运监控,星联互动' }
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
        '/about.html',
        '/article_it/codeGen.html',
        '/article_it/package.html',
        '/article_it/sql.html',
        '/sitemap.xml',
        '/system',
        '/product',
        '/cases',
        '/news',
        '/about',
        '/news/industry',
        '/news/product-doc',
        '/news/tech-doc',
        ...articlePrerenderRoutes,
      ],
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