<template>
    <SystemLayout />
</template>

<script setup lang="ts">
import { post } from "@/api/axios"
import {ref,reactive, defineComponent} from "vue"
import { useUserStore } from "@/stores/user"
import { useAppStore } from "@/stores/app"


const userStore = useUserStore()
const appStore = useAppStore()


const Index = defineComponent({
    name:"Index"
})

const onBeforeMount = () => {
    // 获取用户权限
    post('/sys/getPermission').then((res:any) => {
      if (res.ret === 200) {
        userStore.setPermission(res.data.permission)       
      }
    })
}
</script>

<style lang="scss" scoped>

</style>
