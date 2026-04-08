<script setup lang="ts">
/**
 * 下载类链接使用原生 <a>，避免 NuxtLink 把静态资源路径当应用路由导致 404。
 * MDC 可能把 href 放在 attrs 上，需合并。
 */
const props = defineProps<{
  href?: string
}>()

const attrs = useAttrs()

const resolvedHref = computed(() => {
  const h = props.href ?? (attrs.href as string | undefined)
  return typeof h === 'string' ? h : ''
})

const isStaticDownload = computed(() =>
  /\.(pdf|zip|docx?|xlsx?|rar)$/i.test(resolvedHref.value),
)
</script>

<template>
  <a
    v-if="isStaticDownload"
    :href="resolvedHref"
    class="text-primary underline underline-offset-4 hover:text-primary/80"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
  <NuxtLink
    v-else
    :to="resolvedHref"
    class="text-primary underline underline-offset-4 hover:text-primary/80"
  >
    <slot />
  </NuxtLink>
</template>
