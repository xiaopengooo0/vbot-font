<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

    <RouterView />


</template>

<style scoped>
/* 设置全局页面宽度和高度 */
html, body {
  width: 100% ;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

</style>