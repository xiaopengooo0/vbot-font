<template>




    <el-aside class="side-layout" :class="{ 'is-collapsed': isCollapsed }">
      <div class="logo-container" :class="{ 'is-collapsed': isCollapsed }">
        <img v-if="!isCollapsed" src="@/assets/logo1.png" class="logo" alt="logo" />
        <img v-else src="@/assets/logo.png" class="logo-small" alt="logo" />
      </div>
      <el-menu
        default-active="1-1"
        class="el-menu-vertical"
        :collapse="isCollapsed"
        :collapse-transition="true"
        :show-timeout="300"
        :hide-timeout="150"
        router
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>系统管理</span>
          </template>

            <el-menu-item index="/sys/user">用户管理</el-menu-item>
            <el-menu-item index="1-2">角色管理</el-menu-item>
            <el-menu-item index="1-3">权限管理</el-menu-item>

          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>   

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useSideMenusStore } from '@/stores/side-menus'
import { storeToRefs } from 'pinia'

const sideMenuStore = useSideMenusStore()
const { getCollapsed: isCollapsed } = storeToRefs(sideMenuStore)
</script>

<style scoped lang="scss">
.side-layout {
  transition: width 0.3s cubic-bezier(0.34, 1.26, 0.64, 1);
  width: 200px;
  overflow: hidden;

  &.is-collapsed {
    width: 64px;
  }
}

.logo-container {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-menu-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.23, 0.64, 1);

  .logo {
    height: 32px;
    max-width: 180px;
    object-fit: contain;
    transition: all 0.3s cubic-bezier(0.34, 1.26, 0.64, 1);
  }
  
  .logo-small {
    height: 30px;
    width: 30px;
    object-fit: contain;
    transition: all 0.3s cubic-bezier(0.34, 1.26, 0.64, 1);
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/* 折叠状态 */
.el-menu-vertical.el-menu--collapse {
  width: 64px; /* 折叠时的宽度 */
  min-height: 400px;
  transition: width 0.15s ease; /* 平滑过渡效果 */
}

:deep(.el-menu) {
  border-right: none;
}

:deep(.el-menu--collapse) {
  width: 64px;
}

:deep(.el-menu:not(.el-menu--collapse)) {
  width: 200px;
}
</style>
