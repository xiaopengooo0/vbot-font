<template>
    <el-aside class="side-layout" :class="{ 'is-collapsed': isCollapsed }">
      <div class="logo-container" :class="{ 'is-collapsed': isCollapsed }">
        <img v-if="!isCollapsed" src="@/assets/logo1.png" class="logo" alt="logo" />
        <img v-else src="@/assets/logo.png" class="logo-small" alt="logo" />
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        :collapse="isCollapsed"
        :collapse-transition="true"
        :hide-timeout="150"
        router
        @select="handleSelect"
      >
        <template v-for="route in routes" :key="route.path">
          <!-- 有子菜单的情况 -->
          <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
            <template #title>
              <el-icon v-if="route.meta?.icon"><component :is="route.meta.icon" /></el-icon>
              <span>{{ route.name }}</span>
            </template>
            <template v-for="child in route.children" :key="child.path">
              <el-menu-item :index="child.path">
                <!-- <el-icon v-if="child.meta?.icon"><component :is="child.meta.icon" /></el-icon> -->
                <span>{{ child.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <!-- 没有子菜单的情况 -->
          <el-menu-item v-else :index="route.path">
            <el-icon v-if="route.meta?.icon"><component :is="route.meta.icon" /></el-icon>
            <span>{{ route.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSideMenusStore } from '@/stores/side-menus'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const sideMenuStore = useSideMenusStore()
const { getCollapsed: isCollapsed } = storeToRefs(sideMenuStore)
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

// 获取路由配置
const routes = computed(() => {
  return appStore.dynamicRoutes
})

// 当前激活的菜单
const activeMenu = computed(() => {
  return route.path
})

// 菜单选择处理
const handleSelect = (path: string) => {
  // 如果当前路由已经是目标路由，则不进行跳转
  if (route.path === path) return
  
  // 更新当前激活的标签页
  appStore.setActiveTab(path)
  // 直接使用 router.push 而不是 replace，因为 replace 会导致页面重新加载
  router.push(path)
}
</script>

<style scoped lang="scss">
.side-layout {
  height: 100%;
  background-color: var(--el-menu-bg-color);
  transition: width 0.3s;
  
  &.is-collapsed {
    width: 64px;
  }
  
  .logo-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-bottom: 1px solid var(--el-border-color-light);
    
    .logo {
      height: 40px;
      transition: all 0.3s;
    }
    
    .logo-small {
      height: 30px;
      transition: all 0.3s;
    }
  }
  
  .el-menu-vertical {
    border-right: none;
  }
}
</style>
