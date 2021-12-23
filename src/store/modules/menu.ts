import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { genGuid } from '@/utils'

interface MenuState {
  isCollapse: boolean;
  menus: RouteRecordRaw[];
  token: string;
}

/* Navbar Menu Lists */
const menu: Module<MenuState, any> = {
  state: {
    isCollapse: false,
    menus: [],
    token: '' // 组件刷新凭证
  },
  getters: {
    getMenu: state => state.menus,
    getIsCollapse: state => state.isCollapse,
    refresh: state => state.token
  },
  mutations: {
    addMenu: (state, menus) => state.menus = [...state.menus, ...menus],
    setIsCollapse: (state, isCollapse) => state.isCollapse = isCollapse
  },
  actions: {
    refreshMenu({ state }) {
      state.token = genGuid()
    }
  }
}
export default menu
