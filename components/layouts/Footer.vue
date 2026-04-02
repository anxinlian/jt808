<template>
  <footer class="border-t border-border bg-card">
    <div class="container mx-auto px-4 py-6 xl:px-8 xl:py-8">
      <div class="grid gap-6 @container xl:grid-cols-3 md:grid-cols-2">
        <!-- 公司信息 -->
        <div class="xl:col-span-1 md:col-span-1">
          <div class="flex items-center space-x-2 mb-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
              <img 
                src="/assets/logo.png" 
                alt="星联互动" 
                class="h-full w-full object-cover"
              />
            </div>
            <span class="text-lg font-bold text-primary">北斗安心联</span>
          </div>
          <p class="text-sm text-muted-foreground max-sm:text-xs mb-1">
            河南星联互动科技有限公司
          </p>
          <p class="text-sm text-muted-foreground max-sm:text-xs">
            专注北斗车辆位置信息系统
          </p>
        </div>

        <!-- 快速链接 -->
        <div class="xl:col-span-1 md:col-span-1">
          <h3 class="text-base font-semibold text-foreground mb-3 max-sm:text-sm">快速链接</h3>
          <ul class="grid grid-cols-3 gap-x-3 gap-y-1.5">
            <li>
              <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-primary transition-colors max-sm:text-xs">
                网站首页
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/system" class="text-sm text-muted-foreground hover:text-primary transition-colors max-sm:text-xs">
                系统介绍
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/product" class="text-sm text-muted-foreground hover:text-primary transition-colors max-sm:text-xs">
                产品版本
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cases" class="text-sm text-muted-foreground hover:text-primary transition-colors max-sm:text-xs">
                项目案例
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/news" class="text-sm text-muted-foreground hover:text-primary transition-colors max-sm:text-xs">
                文章资讯
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 联系方式 -->
        <div class="xl:col-span-1 md:col-span-2 xl:col-span-1">
          <h3 class="text-base font-semibold text-foreground mb-3 max-sm:text-sm">联系我们</h3>
          <ul class="space-y-2">
            <li class="text-sm text-muted-foreground max-sm:text-xs">
              <span class="font-medium text-foreground">商务合作：</span>
              <a href="tel:18003857478" class="hover:text-primary transition-colors">18003857478</a>
            </li>
            <li class="text-sm text-muted-foreground max-sm:text-xs">
              <span class="font-medium text-foreground">客户服务：</span>
              <a href="tel:13633857227" class="hover:text-primary transition-colors">13633857227</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="mt-6 pt-6 border-t border-border">
        <div class="flex flex-col gap-2 items-center justify-center text-center xl:flex-row xl:justify-between">
          <p class="text-sm text-muted-foreground max-sm:text-xs">
            © 2025 星联互动. 保留所有权利.
          </p>
          <p class="text-sm text-muted-foreground max-sm:text-xs">
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              豫ICP备2021000157号
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer 组件不需要额外的逻辑
</script>
