<template>
    <div class="common-layout">
      <el-container class="layout-container">
        <SideLayout />
        <el-container class="right-container">
          <HeaderLayout />
          <MainLayout />
        </el-container>
      </el-container>
    </div>
  </template>

  <script setup lang="ts">
import { defineComponent } from 'vue';


const SystemLayout = defineComponent({
  name: 'SystemLayout',
})

</script>

<style scoped>




.right-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.el-aside {
  background-color: #f0f0f0;
}

.el-header {
  background-color: #30b0b4;
  color: white;
  text-align: center;
  line-height: 60px;

}

.el-main {
  background-color: rgb(214, 207, 208);
  padding: 20px;

}
</style>