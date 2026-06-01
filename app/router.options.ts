import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // 带锚点的跳转由 plugins/router.client.ts 与目标页 onMounted 瞬时定位
    if (to.hash) return false

    if (savedPosition) return savedPosition

    const fromNews = from.path === '/news' || from.path.startsWith('/news/')
    const toNews = to.path === '/news' || to.path.startsWith('/news/')
    if (to.path !== from.path && fromNews && toNews) return false

    return { top: 0, left: 0 }
  },
}
