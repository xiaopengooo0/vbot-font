<template>
    <el-aside class="side-layout" :class="{ 'is-collapsed': isCollapsed }">
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        :collapse="isCollapsed"
        :collapse-transition="true"
        close-on-click-outside=true
        :show-timeout="200"
        :hide-timeout="150"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
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
import { tr } from 'element-plus/es/locales.mjs'

const sideMenuStore = useSideMenusStore()
const { getCollapsed: isCollapsed } = storeToRefs(sideMenuStore)
</script>

<style scoped lang="scss">
.side-layout {
  transition: width 0.3s ease-out;
  width: 200px;
  overflow: hidden;

  &.is-collapsed {
    width: 64px;
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




</style>
