import { App } from 'vue'
import { createStore, Store } from 'vuex'
import user from './modules/user'
import menu from './modules/menu'

export const store: Store<any> = createStore({}) // initialize store

/* Dynamic Register Module */
const setStore = (app: App) => {
  store.registerModule('user', user)
  store.registerModule('menu', menu)
  app.use(store)
}

export default setStore
