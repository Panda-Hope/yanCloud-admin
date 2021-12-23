import { createApp } from 'vue'

import '@/styles/index.scss'

import setRouter from './router'
import setStore from './store'
import setIcons from './icons'
import setConfig from './config'
import setElementPlus from './elementPlus'
import App from './App.vue'

const Bootstrap = () => {
  const app = createApp(App)

  setElementPlus(app)
  setIcons(app) // register icons
  setStore(app) // register store
  setRouter(app) // register route
  setConfig(app) // initialize config

  app.mount('#app')
}

// Initialize The App
Bootstrap()

