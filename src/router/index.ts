import { createRouter, createWebHistory } from 'vue-router'

import Index from '../views/Index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录',
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '首页',
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/HelloWorld.vue'),
      meta: {
        title: '关于',
        requiresAuth: true
      }
    },
  ],
})

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // 设置页面标题
//   document.title = `${to.meta.title || '系统'}`
  
//   // 检查是否需要登录验证
//   if (to.matched.some(record => record.meta.requiresAuth !== false)) {
//     // 这里添加实际的登录验证逻辑
//     const isAuthenticated = localStorage.getItem('token')
//     if (!isAuthenticated) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
