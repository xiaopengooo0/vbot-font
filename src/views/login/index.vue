<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-left">
        <div class="welcome-text">
          <h1>欢迎使用</h1>
        </div>
        <div class="nezha-quote">
          <p>"我命由我不由天"</p>
        </div>
      </div>
      <div class="login-right">
        <div class="login-form-container">
          <h2 class="login-title">系统登录</h2>
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            size="large"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
                @keyup.enter="handleLogin"
              />
            </el-form-item>
            <div class="remember-forgot">
              <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              <a href="javascript:;" class="forgot-link">忘记密码？</a>
            </div>
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                class="login-button"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { post } from '@/api/axios'

const router = useRouter()
const loading = ref(false)
const rememberMe = ref(false)
const loginFormRef = ref<FormInstance>()

const token  = useUserStore()

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    loading.value = true
    await loginFormRef.value.validate()
    
    post('/login/admin', {
      username: loginForm.username,
      password: loginForm.password
    }).then((res:any) => {
      if (res.ret === 200) {
        ElMessage({
          message: '登录成功',
          type: 'success',
          duration: 1000,
          showClose: true,
          onClose: () => {
            router.push('/')
          }
        })

        token.setToken(res.data)


      } else {
        ElMessage.error('登录失败')
      }
    })

    } catch (error) {
      console.error('登录验证失败:', error)
    } finally {
      loading.value = false
    }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle, rgba(243, 206, 206, 0.8) 0%, rgba(240,242,245,0.8) 100%);
    animation: rotate 30s linear infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.login-content {
  display: flex;
  width: 1000px;
  height: 600px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.login-left {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, rgba(149, 163, 177, 0.95) 0%, rgba(142, 189, 187, 0.95) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/assets/images/nezha.jpeg');
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    z-index: 1;
    filter: saturate(1.2) contrast(1.1);
    animation: subtle-move 8s ease-in-out infinite;
  }
}

@keyframes subtle-move {
  0%, 100% {
    transform: scale(1.05) translate(0, 0);
  }
  50% {
    transform: scale(1) translate(-5px, -5px);
  }
}

.welcome-text {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 42px;
    font-weight: 600;
    background: linear-gradient(45deg, #fff, #e6f7ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    animation: fade-in-up 0.8s ease-out;
  }
}

.nezha-quote {
  position: relative;
  z-index: 2;
  text-align: center;
  
  p {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    font-style: italic;
    letter-spacing: 2px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: fade-in-up 0.8s ease-out 0.2s backwards;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.5);
}

.login-form-container {
  width: 100%;
  max-width: 360px;
  animation: fade-in 0.8s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.login-title {
  text-align: center;
  margin-bottom: 40px;
  color: #1f2937;
  font-size: 28px;
  font-weight: 600;
}

.login-form {
  .el-form-item {
    margin-bottom: 24px;
  }
  
  .login-button {
    width: 100%;
    height: 44px;
    font-size: 16px;
    border-radius: 8px;
    background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
    border: none;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  .forgot-link {
    color: #1890ff;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #40a9ff;
    }
  }
}

:deep(.el-input__wrapper) {
  padding: 0 12px;
  height: 44px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 0 1px #1890ff inset;
    background: rgba(255, 255, 255, 0.95);
  }
  
  &.is-focus {
    box-shadow: 0 0 0 1px #1890ff inset;
    background: #fff;
  }
}

:deep(.el-input__inner) {
  height: 42px;
  font-size: 15px;
}

:deep(.el-checkbox__label) {
  color: #666;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #1890ff;
  border-color: #1890ff;
}
</style> 