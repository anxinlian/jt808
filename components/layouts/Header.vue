<template>
  <header class="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
    <div class="container mx-auto flex h-16 items-center justify-between px-4 xl:px-8">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
          <img 
            src="/assets/logo.png" 
            alt="星联互动" 
            class="h-full w-full object-cover"
          />
        </div>
        <span class="text-lg font-bold text-primary xl:text-xl">北斗安心联</span>
      </NuxtLink>

      <!-- 桌面导航 -->
      <nav class="hidden items-center space-x-1 lg:flex">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
        >
          <button
            :class="[
              'text-sm font-medium px-4 py-2 rounded-md transition-colors',
              route.path === item.path 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-muted/80'
            ]"
          >
            {{ item.name }}
          </button>
        </NuxtLink>
      </nav>

      <!-- 移动端菜单 -->
      <div class="lg:hidden">
        <button
          @click="isOpen = !isOpen"
          class="p-2 rounded-md hover:bg-muted/80 transition-colors"
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">打开菜单</span>
        </button>
      </div>
    </div>

    <!-- 移动端菜单抽屉：挂到 body，避免被 header 半透明/backdrop 影响 -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="mobile-menu-overlay fixed inset-0 z-[100] lg:hidden"
        style="background-color: rgba(0,0,0,0.5)"
        @click="isOpen = false"
      >
        <div
          class="mobile-menu-panel fixed right-0 top-0 h-full w-64 border-l border-gray-200 shadow-xl"
          style="background-color: #f8fafc"
          @click.stop
        >
          <nav class="flex flex-col space-y-2 pt-8 p-4">
            <NuxtLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              @click="isOpen = false"
              :class="[
                'w-full text-left px-4 py-2 rounded-md transition-colors text-base',
                route.path === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted/80'
              ]"
            >
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'

const route = useRoute()
const isOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '系统介绍', path: '/system' },
  { name: '产品版本', path: '/product' },
  { name: '项目案例', path: '/cases' },
  { name: '文章资讯', path: '/news' },
  { name: '关于我们', path: '/about' },
]
</script>
