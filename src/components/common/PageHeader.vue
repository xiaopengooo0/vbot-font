<template>
  <div class="page-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="item.path || undefined">
        <span :class="{ 'no-link': !item.path }">{{ item.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const PageHeader = defineComponent({
    name: 'PageHeader'
})

// 从 store 中获取面包屑数据
const breadcrumb = computed(() => appStore.breadcrumb)
</script>

<style scoped lang="scss">
.page-header {
  padding: 16px 0;
//   background-color: var(--el-bg-color);
  
  :deep(.el-breadcrumb) {
    font-size: 14px;
    
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        color: var(--el-text-color-regular);
        font-weight: normal;
        
        &.is-link {
          color: var(--el-text-color-primary);
          font-weight: 500;
          
          &:hover {
            color: var(--el-color-primary);
          }
        }

        .no-link {
          color: var(--el-text-color-secondary);
          cursor: default;
        }
      }
      
      &:last-child {
        .el-breadcrumb__inner {
          color: var(--el-text-color-secondary);
        }
      }
    }
  }
}
</style> 