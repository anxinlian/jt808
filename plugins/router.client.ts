export default defineNuxtPlugin(() => {
  // 处理锚点链接的平滑滚动
  if (import.meta.client) {
    const router = useRouter()
    let scrollTimer: ReturnType<typeof setTimeout> | null = null
    let isScrolling = false
    
    router.afterEach((to, from) => {
      // 清除之前的滚动定时器
      if (scrollTimer) {
        clearTimeout(scrollTimer)
        scrollTimer = null
      }
      
      // 如果 URL 包含锚点
      if (to.hash && !isScrolling) {
        isScrolling = true
        
        // 等待页面完全渲染（跨页面跳转需要更长时间）
        const delay = to.path !== from.path ? 600 : 100
        scrollTimer = setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            // 计算偏移量，考虑固定头部的高度
            const headerOffset = 80
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementTop - headerOffset

            // 直接滚动到目标位置，只执行一次
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
            
            // 滚动完成后重置标志
            setTimeout(() => {
              isScrolling = false
            }, 1000)
          } else {
            isScrolling = false
          }
        }, delay)
      }
    })
  }
})
