/** 跨页跳转到 #news-tabs 时锁定主内容可见性，定位完成后再展示 */
export function useNewsTabsScrollLock() {
  return useState('news-tabs-scroll-lock', () => false)
}
