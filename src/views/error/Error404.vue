<template>
  <div class="error-page">
    <div class="error-content">
      <!-- <img src="@/assets/images/404.png" alt="404" class="error-image" /> -->
      <h1 class="error-title">404</h1>
      <p class="error-message">抱歉，您访问的页面不存在</p>
      <div class="error-actions">
        <el-button type="primary" @click="goHome">返回首页</el-button>
        <el-button @click="goBack">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const Error404 = defineComponent({
    name: 'Error404'
})

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--el-bg-color-page);
}

.error-content {
  text-align: center;
  padding: 40px;
}

.error-image {
  width: 400px;
  margin-bottom: 20px;
}

.error-title {
  font-size: 72px;
  color: var(--el-color-primary);
  margin: 0;
  line-height: 1;
}

.error-message {
  font-size: 20px;
  color: var(--el-text-color-regular);
  margin: 20px 0;
}

.error-actions {
  margin-top: 30px;
}

.error-actions .el-button {
  margin: 0 10px;
  padding: 12px 24px;
}
</style> 