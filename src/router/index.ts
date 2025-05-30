import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Index from '../views/Index.vue'
import { useAppStore } from '@/stores/app'
import { post } from '@/api/axios'



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
        requiresAuth: true,
        isLink: true
      },
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        title: '404',
        requiresAuth: false
      }
    }
  ]
})


// 动态路由加载
export const loadDynamicRoutes = async () => {
  try {
    const userRoutes = await fetchUserRoutes()
    const appStore = useAppStore()
    var dynamicRoutes = transformRoutes(userRoutes)

    // console.log(dynamicRoutes);
    // 获取index路由
    const indexRoute = router.getRoutes().find(route => route.name === 'index')
    if (indexRoute) {
      // 将动态路由添加到index的子路由中
      dynamicRoutes.forEach(route => {
        // 先移除可能存在的同名路由
        // router.removeRoute(route.name as string)

        // 添加新路由
          router.addRoute('index', route)

      })
    }

    //左侧菜单隐藏路由设置
    dynamicRoutes = dynamicRoutes.map(route => ({
      ...route,
      children: route.children?.filter(child => child.name !== 'Profile')
    })) as RouteRecordRaw[]

    appStore.setRoutes(dynamicRoutes)
    return dynamicRoutes
  } catch (error) {
    console.error('加载动态路由失败:', error)
    return []
  }
}

// 从后端获取用户路由配置
const fetchUserRoutes = async () => {
  // TODO: 实现实际的API调用

  const res = await post('/admin/getMenus').then(res => {
    console.log(res);
    return res.data
  }).catch(err => {
    console.log(err);
    return []
  })

  return res
}

// 转换路由配置
const transformRoutes = (routes: any[]): RouteRecordRaw[] => {

  const modules = import.meta.glob('../views/**/*.{vue,tsx}')

  return routes.map(route => (
    
    
    {
    ...route,
    path: route.path==null?'':route.path,
    component: route.component==null?'':modules[`../views/${route.component}/index.vue`],
    children: route.children ? transformRoutes(route.children) : []
  }

))
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  const appStore = useAppStore()
  document.title = `${to.meta.title || '系统'}`
  
  // 检查是否需要登录验证
  if (to.matched.some(record => record.meta.requiresAuth !== false)) {
    // 这里添加实际的登录验证逻辑
    const isAuthenticated = localStorage.getItem('token')
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      if (to.meta.title) {
        appStore.addTab({
          title: to.meta.title as string,
          path: to.path
        })
      }
    
      // 如果是首次进入系统，加载动态路由
      if (!appStore.hasLoadedDynamicRoutes) {
        try {
          await loadDynamicRoutes()
          appStore.setHasLoadedDynamicRoutes(true)
          // 重新导航到目标路由
          next({ ...to, replace: true })
          return
        } catch (error) {
          console.error('加载动态路由失败:', error)
          next('/login')
          return
        }
      }
      next()
    }
  } else {

    // 页面刷新重新添加动态路由信息
    if (!to.name&&!appStore.hasLoadedDynamicRoutes) {
      // 动态添加路由
      console.log('页面刷新重新添加动态路由信息');
      await loadDynamicRoutes();
      next({ ...to, replace: true });
    }

    // 对于不需要认证的路由（如404、登录页），直接放行
    if (!to.matched.length) {
      next({ name: 'NotFound' }); // 正常跳转到 404 页面
    } else {
      next();
    }
  }
})

export default router
