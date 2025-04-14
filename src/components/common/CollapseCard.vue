<template>
  <el-card class="collapse-card" :class="{ 'is-collapsed': isCollapsed }">
    <div class="collapse-button" @click="toggleCollapse">
      <el-icon :class="{ 'is-collapsed': isCollapsed }">
        <ArrowUp />
      </el-icon>
    </div>
    <div v-if="isCollapsed && collapsedText" class="collapsed-text">{{ collapsedText }}</div>
    <div class="collapse-content" :class="{ 'is-collapsed': isCollapsed }">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'

const props = defineProps({
  collapsedText: {
    type: String,
    default: '搜索'
  }
})

const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped lang="scss">
.collapse-card {
  position: relative;
  
  .collapse-button {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
    z-index: 1;
    
    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
    
    .el-icon {
      font-size: 16px;
      transition: transform 0.3s;
      
      &.is-collapsed {
        transform: rotate(180deg);
      }
    }
  }

  .collapsed-text {
    // padding: 12px 40px 12px 20px;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .collapse-content {
    transition: all 0.3s;
    overflow: hidden;
    
    &.is-collapsed {
      height: 0;
      padding: 0;
      margin: 0;
    }
  }
}
</style> 