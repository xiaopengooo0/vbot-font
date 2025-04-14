<template>
  <div class="tabs-container">
    <el-tabs
      v-model="activeTab"
      type="card"
      closable
      @tab-remove="handleTabRemove"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.path"
        :label="tab.title"
        :name="tab.path"
      />
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

interface Tab {
  title: string
  path: string
}

const TabsView = defineComponent({
  name: 'TabsView'
})

const router = useRouter()
const appStore = useAppStore()

// 标签页相关
const activeTab = computed({
  get: () => appStore.activeTab,
  set: (val) => appStore.setActiveTab(val)
})

const tabs = storeToRefs(appStore).tabs

// 处理标签页关闭
const handleTabRemove = (targetName: string) => {
  const currentTabs = appStore.tabs
  let activeName = activeTab.value
  if (activeName === targetName) {
    currentTabs.forEach((tab: Tab, index: number) => {
      if (tab.path === targetName) {
        const nextTab = currentTabs[index + 1] || currentTabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  
  appStore.removeTab(targetName)
  if (activeName !== targetName) {
    appStore.setActiveTab(activeName)
    // 主动触发路由跳转
    router.push(activeName)
  }
}

// 处理标签页点击
const handleTabClick = (tab: { props: { name: string } }) => {
  const path = tab.props.name
  router.push(path)
}
</script>

<style scoped lang="scss">
.tabs-container {
  padding: 0 8px;
  background-color: #fafafe;
  
  :deep(.el-tabs) {
    .el-tabs__header {
      margin: 0;
      
      .el-tabs__nav {
        border: none;
        
        .el-tabs__item {
          height: 32px;
          line-height: 32px;
          border: 1px solid var(--el-border-color-light);
          border-radius: 2px 2px 0 0;
          margin-right: 1px;
          
          &.is-active {
            background-color: var(--el-bg-color);
            border-bottom-color: var(--el-bg-color);
          }
          
          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style> 