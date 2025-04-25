<template>
    <el-header>
        <div class="header-container">
            <el-icon class="fold-btn" @click="toggleSideMenu">
                <Fold v-if="!isCollapsed" />
                <Expand v-else />
            </el-icon>


            <PageHeader  />


            <div class="header-content">
              <div class="header-right">
                <el-input
                  v-model="menuSearch"
                  placeholder="搜索菜单"
                  class="menu-search"
                  clearable
                  @input="handleMenuSearch"
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
                <el-dropdown trigger="click" @command="handleCommand">
                  <div class="user-info">
                    <el-avatar :size="32" :src="userAvatar" />
                    <span class="username">{{ username }}</span>
                    <el-icon><ArrowDown /></el-icon>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                      <el-dropdown-item command="settings">系统设置</el-dropdown-item>
                      <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>


        </div>
    </el-header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useSideMenusStore } from '@/stores/side-menus'
import { ArrowDown, Expand, Fold, Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const sideMenuStore = useSideMenusStore()
const { getCollapsed: isCollapsed } = storeToRefs(sideMenuStore)

// 侧边栏折叠状态
const isCollapse = computed(() => sideMenuStore.getCollapsed)
const toggleSideMenu = () => {
  sideMenuStore.toggleCollapsed()
}

// 用户信息
const username = ref('管理员')
const userAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

// 菜单搜索
const menuSearch = ref('')
const handleMenuSearch = (value: string) => {
  // TODO: 实现菜单搜索逻辑
  console.log('Search menu:', value)
}

// 用户下拉菜单命令处理
const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push({
        name: 'Profile'
      })
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      // TODO: 实现退出登录逻辑
      localStorage.removeItem('token')
      router.push('/login')
      break
  }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 20px;

    .header-left {
        display: flex;
        align-items: center;
        gap: 16px;

        .collapse-btn {
            font-size: 20px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.3s;

            &:hover {
                background-color: #f5f7fa;
            }
        }
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 20px;

        .menu-search {
            width: 200px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            transition: all 0.3s;

            &:hover {
                background-color: #f5f7fa;
            }

            .username {
                font-size: 14px;
                color: #606266;
            }
        }
    }
}

.page-header {
    flex: 1;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
}
</style>


