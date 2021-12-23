import { App } from 'vue'
import { router } from '@/router'
import { store } from '@/store'

/* 全局操作 */
// 获取全局用户信息
export const initGlobalUserInfo = async () => {
  await store.dispatch('getUserInfo')
}

// 获取权限菜单
export const getMenuPermission = async () => {
  await store.dispatch('getMenuPermission')
}

// 注入菜单未读标记, 配置在线医生路由未读消息Badge
export const injectRouteBadge = () => {
  const routes = router.getRoutes()
  const userInfo = store.state.user.userInfo
  routes.find(r => {
    if (r.name === 'onlineDoctor' || r.name === 'onlineCustomer') {
      r.meta.badge = userInfo.unreadNotice
      return true
    }
  })
  store.dispatch('refreshMenu') // 强制刷新菜单
}

// 刷新左侧菜单数据
export const refreshMenu = async () =>{
  await initGlobalUserInfo()
  injectRouteBadge()
}
