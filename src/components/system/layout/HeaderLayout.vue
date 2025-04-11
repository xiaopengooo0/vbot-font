<template>
    <el-header>
        <div class="header-container">
            <el-icon class="fold-btn" @click="toggleSideMenu">
                <Fold v-if="!isCollapsed" />
                <Expand v-else />
            </el-icon>
            <div class="header-content">
                Header
            </div>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import { useSideMenusStore } from '@/stores/side-menus'
import { storeToRefs } from 'pinia'

const sideMenuStore = useSideMenusStore()
const { getCollapsed: isCollapsed } = storeToRefs(sideMenuStore)

const toggleSideMenu = () => {
    sideMenuStore.toggleCollapsed()
}
</script>

<style scoped lang="scss">
.header-container {
    display: flex;
    align-items: center;
    height: 100%;
}

.fold-btn {
    font-size: 20px;
    cursor: pointer;
    margin-right: 16px;
    
    &:hover {
        color: #e6e6e6;
    }
}

.header-content {
    flex: 1;
    text-align: center;
}
</style>


