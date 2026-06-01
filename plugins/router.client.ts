import { NEWS_TABS_HASH } from '~/utils/newsListBack'

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  // 禁止浏览器恢复历史滚动位置，避免跨页跳转先闪到底部
  history.scrollRestoration = 'manual'

  const router = useRouter()
  const HEADER_OFFSET = 80
  let pollFrameId: number | null = null
  const newsTabsScrollLock = useNewsTabsScrollLock()

  function clearHashPoll() {
    if (pollFrameId != null) {
      cancelAnimationFrame(pollFrameId)
      pollFrameId = null
    }
  }

  function unlockScroll() {
    document.documentElement.style.overflow = ''
  }

  function scrollToHashInstant(hash: string): boolean {
    const element = document.querySelector(hash)
    if (!element) return false
    const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top, left: 0, behavior: 'auto' })
    return true
  }

  function pollScrollToHash(hash: string, attempts = 0) {
    if (scrollToHashInstant(hash)) {
      unlockScroll()
      return
    }
    if (attempts >= 60) {
      unlockScroll()
      return
    }
    pollFrameId = requestAnimationFrame(() => pollScrollToHash(hash, attempts + 1))
  }

  router.beforeEach((to, from) => {
    clearHashPoll()
    if (!to.hash || to.path === from.path) return

    const isNewsTabs = to.hash === `#${NEWS_TABS_HASH}`
    if (isNewsTabs) {
      newsTabsScrollLock.value = true
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.style.overflow = 'hidden'
  })

  router.afterEach((to, from) => {
    clearHashPoll()

    if (to.hash !== `#${NEWS_TABS_HASH}`) {
      newsTabsScrollLock.value = false
    }

    if (to.hash) {
      // #news-tabs 由 NewsPage 定位后再展示，避免先渲染顶部再滚动
      if (to.hash === `#${NEWS_TABS_HASH}`) return
      pollScrollToHash(to.hash)
      return
    }

    unlockScroll()

    if (to.path !== from.path) {
      const fromNews = from.path === '/news' || from.path.startsWith('/news/')
      const toNews = to.path === '/news' || to.path.startsWith('/news/')
      if (!(fromNews && toNews)) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }
  })
})
