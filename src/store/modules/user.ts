import { Module } from 'vuex'
import {
  getGlobalUserInfo
} from '@/api'

export interface User {
  hasLogin: boolean;
  userInfo: {
    name: string;
    id: string;
    phone?: string;
    avatar: string;
    permissions?: string[];
    unreadNotice?: Number;
  }
}

const user: Module<User, any> = {
  state: {
    hasLogin: false,
    userInfo: {
      name: '',
      id: '',
      phone: '',
      avatar: '',
      permissions: [],
      unreadNotice: 0,
    }
  },
  getters: {
    getUserInfo: state => state,
    getPermission: state => state.userInfo.permissions
  },
  mutations: {
    setPermission(state, permissions) {
      state.userInfo.permissions = permissions
    },
    setUserInfo(state, info) {
      state.hasLogin = true
      state.userInfo.name = info.name
      state.userInfo.id = info.id
      state.userInfo.phone = info?.phone
      state.userInfo.avatar = info?.avatar
      state.userInfo.unreadNotice = info.unreadNotice
      state.userInfo.permissions = info.permissions
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      const res = await getGlobalUserInfo()
      if (res.success) {
        commit('setUserInfo', res.data)
      }
    }
  }
}

export default user
