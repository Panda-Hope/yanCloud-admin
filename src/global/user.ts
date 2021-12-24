import { router } from '@/router'
import { store } from '@/store'

// 获取全局用户信息
export const initGlobalUserInfo = async () => {
  await store.dispatch('getUserInfo')
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
