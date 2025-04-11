<template>
    <el-main>Main

        <el-button type="primary" @click="click">消息</el-button>

    </el-main>
</template>


<script setup lang="ts">
import { defineComponent } from 'vue';
import { getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'


const MainLayout=defineComponent({
    name: 'MainLayout'
})

const click = () => {
    ElMessage({
    message: 'This is a message.',
    grouping: true,
    type: 'success',
  })
}

</script>


