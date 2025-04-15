<template>
  <div class="main-layout">
    <div class="main-header">
      <tabs-view />
    </div>
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appStore = useAppStore()

// 监听路由变化，更新面包屑和标签页
watch(
  () => route.path,
  (path) => {
    // 更新面包屑
    appStore.updateBreadcrumb(route)
    // 更新当前激活的标签页
    appStore.setActiveTab(path)
  },
  { immediate: true }
)

// 缓存的视图
const cachedViews = computed(() => appStore.cachedViews)
</script>

<style scoped lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .main-header {
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color-light);
  }
  
  .main-content {
    flex: 1;
    padding: 16px;
    overflow: auto;
    background-color: var(--el-bg-color-page);
  }
}

// 路由切换动画
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>


