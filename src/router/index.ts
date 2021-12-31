import { App } from 'vue'
import {
  Router,
  createRouter,
  RouteRecordRaw,
  createWebHistory,
  RouteRecordName,
} from 'vue-router'
import { pathToRegexp } from 'path-to-regexp'
import Layout from '@/components/Layout/index.vue'
import { hasPermission } from '@/utils'
import { store } from '@/store'
import {
  initGlobalUserInfo,
  injectRouteBadge
} from '@/global'

// 路由列表
import HomeRoutes from './home'
import SkeletonRoutes from './skeleton'

// 导出路由实例
export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.PROD ? '/prod/' : ''),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [],
})

// APP根路由
const AppRoute: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home', // 默认跳转至首页
    name: 'App',
    component: Layout,
    children: [],
  },
]

// 加载外部静态路由(无需鉴权)
const StaticRoute: RouteRecordRaw[] = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/pages/401/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/index.vue'),
  }
]

// 内部白名单路由(无需授权)
const WhiteRoute: RouteRecordRaw[] = [...HomeRoutes]

// 异步动态加载路由
const AsyncRoute: RouteRecordRaw[] = [
  ...SkeletonRoutes
]

// 注册应用路由
const setRouter = (app: App) => {
  // 全部无需授权路由
  const InitializedRoutes: RouteRecordRaw[] = [...AppRoute, ...StaticRoute]
  InitializedRoutes.forEach((route) => router.addRoute(route))
  WhiteRoute.forEach((route) => router.addRoute('App', route))

  store.commit('addMenu', WhiteRoute) // Asynchronous Route To Menu

  // 注册动态路由(需经过授权)
  router.beforeEach(async (to) => {
    const { name } = to
    const menus = store.getters.getMenu

    // 校验是否白名单路由
    if (router.hasRoute(name as RouteRecordName)) {
      const hasWhiteRoute = WhiteRoute.find((r) => r.name === name)
      if (hasWhiteRoute && menus.length <= WhiteRoute.length) {
        await addAuthorizedRoute()
      }
      return true
    }

    // 开始注册动态路由
    return await new Promise(async (resolve) => {
      if (menus.length <= WhiteRoute.length) {
         await addAuthorizedRoute()
      }

      // 检测是否有效路由
      const isValid = router.getRoutes().find(r => !!pathToRegexp(r.path).exec(to.path))
      resolve(isValid ? to.fullPath : '/login') // 无效路由自动跳转登陆页
    })
  })
  app.use(router)
}

// 获取鉴权通过路由地址
export const addAuthorizedRoute = async () => {
  const hasLogin = store.state.user.hasLogin
  if (!hasLogin) {
    await Promise.all([initGlobalUserInfo()])
  }

  // 递归校验路由鉴权，过滤无鉴权路由
  const nestedRouteAuth = (routes: RouteRecordRaw[]) =>
    routes.filter((r) => {
      const permission = (r.meta ? r.meta.permission : '') as string | string[]
      if (hasPermission(permission)) {
        if (r.children) {
          r.children = nestedRouteAuth(r.children)
        }
        return true
      }
    })

  const AuthorizedRoute = nestedRouteAuth(AsyncRoute)
  store.commit('addMenu', AuthorizedRoute) // Asynchronous Route To Menu
  AuthorizedRoute.forEach((route) => router.addRoute('App', route))

  // 注入菜单未读标记
  // injectRouteBadge()
}

export default setRouter
