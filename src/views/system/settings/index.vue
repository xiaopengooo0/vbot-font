<template>
  <div class="settings-container">
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
        </div>
      </template>

      <el-tabs v-model="activeTab" class="settings-tabs">
        <!-- 基本设置 -->
        <el-tab-pane label="基本设置" name="basic">
          <el-form :model="basicSettings" label-width="120px">
            <el-form-item label="系统名称">
              <el-input v-model="basicSettings.systemName" placeholder="请输入系统名称" />
            </el-form-item>
            <el-form-item label="系统Logo">
              <el-upload
                class="logo-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleLogoSuccess"
                :before-upload="beforeLogoUpload"
              >
                <img v-if="basicSettings.logo" :src="basicSettings.logo" class="logo" />
                <el-icon v-else class="logo-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="版权信息">
              <el-input v-model="basicSettings.copyright" placeholder="请输入版权信息" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveBasicSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 安全设置 -->
        <el-tab-pane label="安全设置" name="security">
          <el-form :model="securitySettings" label-width="120px">
            <el-form-item label="密码策略">
              <el-checkbox-group v-model="securitySettings.passwordPolicy">
                <el-checkbox label="requireNumber">必须包含数字</el-checkbox>
                <el-checkbox label="requireLetter">必须包含字母</el-checkbox>
                <el-checkbox label="requireSpecial">必须包含特殊字符</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="密码最小长度">
              <el-input-number v-model="securitySettings.minPasswordLength" :min="6" :max="20" />
            </el-form-item>
            <el-form-item label="登录失败锁定">
              <el-switch v-model="securitySettings.loginLock" />
              <span class="ml-2">失败 {{ securitySettings.maxLoginAttempts }} 次后锁定账号</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveSecuritySettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 个性化设置 -->
        <el-tab-pane label="个性化设置" name="personalization">
          <el-form :model="personalSettings" label-width="120px">
            <el-form-item label="主题颜色">
              <el-color-picker @change="(val: string | null) => handleThemeColorChange(val || '')" v-model="personalSettings.themeColor" />
            </el-form-item>
            <el-form-item label="导航模式">
              <el-radio-group v-model="personalSettings.navigationMode">
                <el-radio label="side">侧边栏</el-radio>
                <el-radio label="top">顶部</el-radio>
                <el-radio label="mix">混合</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="固定头部">
              <el-switch v-model="personalSettings.fixedHeader" />
            </el-form-item>
            <el-form-item label="固定侧边栏">
              <el-switch v-model="personalSettings.fixedSidebar" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="savePersonalSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// 当前激活的标签页
const activeTab = ref('basic')

// 基本设置
const basicSettings = reactive({
  systemName: '管理系统',
  logo: '',
  copyright: '© 2024 管理系统'
})

// 安全设置
const securitySettings = reactive({
  passwordPolicy: ['requireNumber', 'requireLetter'],
  minPasswordLength: 8,
  loginLock: true,
  maxLoginAttempts: 5
})

// 个性化设置
const personalSettings = reactive({
  themeColor: themeStore.themeColor,
  navigationMode: 'side',
  fixedHeader: true,
  fixedSidebar: true
})

// 处理Logo上传成功
const handleLogoSuccess = (response: any) => {
  basicSettings.logo = response.url
  ElMessage.success('上传成功')
}

// 上传前检查
const beforeLogoUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  return true
}

// 保存设置
const saveBasicSettings = () => {
  // TODO: 调用API保存设置
  ElMessage.success('基本设置保存成功')
}

const saveSecuritySettings = () => {
  // TODO: 调用API保存设置
  ElMessage.success('安全设置保存成功')
}

const savePersonalSettings = () => {
  // TODO: 调用API保存设置
  ElMessage.success('个性化设置保存成功')
}

// 处理主题颜色变化
const handleThemeColorChange = (color: string) => {
  personalSettings.themeColor = color
  themeStore.themeColor = color
}
</script>

<style scoped lang="scss">
.settings-container {
  padding: 20px;

  .settings-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .settings-tabs {
    :deep(.el-tabs__content) {
      padding: 20px;
    }
  }

  .logo-uploader {
    :deep(.el-upload) {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }
    }

    .logo-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
      line-height: 178px;
    }

    .logo {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style> 