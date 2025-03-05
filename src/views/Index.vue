<template>
  <div class="container">
    <!-- 居中显示二维码 -->
    <div class="qr-code-container">
      <div class="qr-code-overlay">
        <img v-if="qrBase64" :src="qrBase64" alt="QR Code" class="qr-code" />
        <button v-else class="refresh-button" @click="handleRefresh">刷新</button>
      </div>
    </div>
    <!-- 登录按钮 -->
    <div class="button-container">
      <button class="login-button" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

import {post} from "@/api/axios";

const qrBase64 = ref('')

const handleLogin = () => {
  console.log("登录按钮被点击");
}

const handleRefresh = () => {
  post('/api/v1/login/getQrCode', {}).then((res) => {
    if (res.ret === 200) {
      qrBase64.value = res.data.qrImgBase64
    } else {
      console.log("获取二维码失败")
    }
  })
}
</script>

<style scoped>
.container {
  width: 95vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5; /* 背景色 */
}

.qr-code-container {
  margin-bottom: 20px; /* 二维码与按钮之间的间距 */
  position: relative;
  width: 200px;
  height: 200px;
}

.qr-code-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.qr-code {
  width: 100%; /* 二维码宽度 */
  height: 100%; /* 二维码高度 */
  border: 1px solid #ccc; /* 可选：添加边框 */
  border-radius: 8px; /* 可选：圆角 */
}

.refresh-button {
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5); /* 遮罩层背景色 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-container {
  text-align: center;
}

.login-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff; /* 按钮背景色 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3; /* 鼠标悬停时的背景色 */
}
</style>