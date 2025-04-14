import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

interface Tab {
  title: string
  path: string
}

interface BreadcrumbItem {
  title: string
  path: string
}

export const useAppStore = defineStore('app', {
  state: () => ({
    tabs: [
      {
        title: '首页',
        path: '/'
      }
    ] as Tab[],
    cachedViews: [] as string[],
    activeTab: '' as string,
    breadcrumb: [] as BreadcrumbItem[]
  }),
  
  actions: {
    addTab(tab: Tab) {
      if (this.tabs.some(item => item.path === tab.path)) return
      this.tabs.push(tab)
      this.activeTab = tab.path
    },
    
    removeTab(path: string) {
      const index = this.tabs.findIndex(item => item.path === path)
      // 首页不能删除
      if(path === '/') return
      if (index > -1) {
        this.tabs.splice(index, 1)
      }
    },
    
    setActiveTab(path: string) {
      this.activeTab = path
    },
    
    addCachedView(view: string) {
      if (this.cachedViews.includes(view)) return
      this.cachedViews.push(view)
    },
    
    removeCachedView(view: string) {
      const index = this.cachedViews.indexOf(view)
      if (index > -1) {
        this.cachedViews.splice(index, 1)
      }
    },

    // 更新面包屑数据
    updateBreadcrumb(route: RouteLocationNormalized) {

      if(route.path === '/'){
        this.breadcrumb = []
      }else{
        this.breadcrumb = route.matched
          .filter(item => item.meta && item.meta.title)
        .map(item => ({
          title: item.meta.title as string,
          path: item.path
        }))
      }
    }
  },
  getters: {
    getTabs: (state) => {
      return state.tabs
    },
    
  }
}) 