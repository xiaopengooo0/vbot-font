import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 主题颜色
  const themeColor = ref('#30b0b4')
//   const themeColor = ref('#409EFF')
  // 导航模式
  const navigationMode = ref<'side' | 'top' | 'mix'>('side')
  // 固定头部
  const fixedHeader = ref(true)
  // 固定侧边栏
  const fixedSidebar = ref(true)

  // 从 localStorage 加载设置
  const loadSettings = () => {
    const settings = localStorage.getItem('themeSettings')
    if (settings) {
      const { themeColor: color, navigationMode: mode, fixedHeader: header, fixedSidebar: sidebar } = JSON.parse(settings)
      themeColor.value = color
      navigationMode.value = mode
      fixedHeader.value = header
      fixedSidebar.value = sidebar
    }
  }

  // 保存设置到 localStorage
  const saveSettings = () => {
    const settings = {
      themeColor: themeColor.value,
      navigationMode: navigationMode.value,
      fixedHeader: fixedHeader.value,
      fixedSidebar: fixedSidebar.value
    }
    localStorage.setItem('themeSettings', JSON.stringify(settings))
  }

  // 监听设置变化，自动保存
  watch([themeColor, navigationMode, fixedHeader, fixedSidebar], () => {
    saveSettings()
  })

  // 初始化时加载设置
  loadSettings()

  return {
    themeColor,
    navigationMode,
    fixedHeader,
    fixedSidebar,
    loadSettings,
    saveSettings
  }
})