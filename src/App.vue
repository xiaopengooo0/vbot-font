<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style>
/* 设置全局页面宽度和高度 */
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#app {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

/* 确保路由视图填充整个页面 */
#app > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>