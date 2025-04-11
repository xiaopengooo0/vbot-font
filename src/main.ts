import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from '@/api/axios'

import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';

const app = createApp(App)

// 将 axios 注册为全局属性
app.config.globalProperties.$axios = axios;

app.use(createPinia())
app.use(router)

app.mount('#app')
