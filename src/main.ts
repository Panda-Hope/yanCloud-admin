import { createApp } from 'vue'

import '@/styles/index.scss' // 全局公用样式

import setRouter from './router' // 注册路由
import setStore from './store' // 注册Vuex
import setIcons from './icons' // 注册Icons
import setConfig from './config' // 注册全局配置
import setElementPlus from './elementPlus' // 加载Element组件个性化配置
import App from './App.vue'

const Bootstrap = () => {
  const app = createApp(App)

  setElementPlus(app)
  setIcons(app)
  setStore(app)
  setRouter(app)
  setConfig(app)

  app.mount('#app')
}

// Initialize The App
Bootstrap()

