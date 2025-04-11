<template>
    <div class="container">
      <!-- 居中显示二维码 -->
      <div class="qr-code-container">
        <div class="qr-code-overlay">
          <img v-if="qrBase64" :src="qrBase64" alt="QR Code" class="qr-code" />
          <button v-else class="refresh-button" @click="handleRefresh">刷新</button>
        </div>
      </div>
  
      <!-- 验证码输入框 -->
      <div class="capture-code-container">
        <input type="text" v-model="captureCode" placeholder="请输入验证码(如果有)"  />
      </div>
      <!-- 登录按钮 -->
      <div class="button-container">
        <button class="login-button" @click="handleLogin">登录</button>
      </div>
  
      <!-- 登录结果显示 -->
       <div class="login-result">
        <p>登录结果：</p>
        <span >{{ loginResult }}</span>
      </div>
  
            <!-- 报文显示 -->
        <div class="login-result-message">
          <p>响应报文：</p>
          <span>{{ resJson }}</span>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  import { ref } from 'vue'
  
  import {post} from "@/api/axios";
  
  const qrBase64 = ref('')
  const appid = ref('')
  const uuid = ref('')
  const captureCode = ref('')
  
  const loginResult = ref('')
  
  const resJson = ref('')
  
  const handleLogin = () => {
    post('/api/v1/login/checkLogin', {
      appid: appid.value,
      uuid: uuid.value,
      captureCode: captureCode.value
    }).then((res:any) => {
      resJson.value = JSON.stringify(res)
      loginResult.value = res.msg
      if (res.ret === 200&& res.data) {
        console.log("登录成功")
        loginResult.value = "登录成功"    
      }
    })
    
  }
  
  
  /**
   * 获取二维码
   */
  const handleRefresh = () => {
    post('/api/v1/login/getQrCode', {}).then((res:any) => {
      // resJson.value = JSON.stringify(res)
      if (res.ret === 200) {
        console.log("获取二维码成功")
        qrBase64.value = res.data.qrImgBase64
        appid.value = res.data.appId
        uuid.value = res.data.uuid
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
  .capture-code-container{
    margin-bottom: 20px;
  }
  .capture-code-container input {
      height: 25px;
      line-height: 25px;
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
  
  
  .login-result {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    margin-bottom: 10px; /* 可选：设置底部间距 */
  }
  
  .login-result p {
    margin: 0; /* 去除默认的段落间距 */
     /* 设置文本和结果之间的间距 */
     /* margin-right: 10px; */
     margin-top: 10px;
  }
  
  /* .login-result span {
    min-width: 60px;
  } */
  
  .login-result-message {
    margin-top: 10px;  
  }
  </style>