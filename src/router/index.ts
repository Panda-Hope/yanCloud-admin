import { App } from 'vue';
import {
  Router,
  createRouter,
  RouteRecordRaw,
  createWebHistory,
  RouteRecordName,
} from 'vue-router';
import { pathToRegexp } from 'path-to-regexp';
import Layout from '@/components/Layout/index.vue';
import { hasPermission } from '@/utils';
import { store } from '@/store';
import { initGlobalUserInfo, injectRouteBadge, getMenuPermission } from '@/global'

import HomeRoutes from './home';

// export router instance
export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.PROD ? '/admin/parasol/page' : ''),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [],
});

// Register Application Routes
const setRouter = (app: App) => {
  // Initialized Home Route
  const AppRoute: RouteRecordRaw[] = [
    {
      path: '/',
      redirect: '/home',
      name: 'App',
      component: Layout,
      children: [],
    },
  ];
  // External Static Route
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
  ];
  // Async Route But Not Need Authorization
  const WhiteRoute: RouteRecordRaw[] = [...HomeRoutes];

  const InitializedRoutes: RouteRecordRaw[] = [...AppRoute, ...StaticRoute];
  InitializedRoutes.forEach((route) => router.addRoute(route));
  WhiteRoute.forEach((route) => router.addRoute('App', route));

  store.commit('addMenu', WhiteRoute); // Asynchronous Route To Menu

  /* Register Route Navigation Guard */
  router.beforeEach(async (to) => {
    const { name } = to;
    const menus = store.getters.getMenu;

    if (router.hasRoute(name as RouteRecordName)) {
      // In WhiteRoute Sync Load Dynamic Routes
      const hasWhiteRoute = WhiteRoute.find((r) => r.name === name);
      if (hasWhiteRoute && menus.length <= WhiteRoute.length) {
        await addAuthorizedRoute();
      }
      return true;
    }

    /* Dynamic Register Route */
    return await new Promise(async (resolve) => {
      if (menus.length <= WhiteRoute.length) {
         await addAuthorizedRoute();
      }

      // Check Whether Route Is Valid
      const isValid = router.getRoutes().find(r => !!pathToRegexp(r.path).exec(to.path))
      resolve(isValid ? to.fullPath : '/login')
    })
  })
  app.use(router)
}

/* Dynamic Register Authorized Route */
export const addAuthorizedRoute = async () => {
  // Get Global UserInfo First
  const hasLogin = store.state.user.hasLogin
  if (!hasLogin) {
    // getMenuPermission()
    // await Promise.all([initGlobalUserInfo(), getMenuPermission()])
  }

  // Async Route Need Authorization
  const AsyncRoute: RouteRecordRaw[] = [];
  // Recursively Check Route Authorization
  const nestedRouteAuth = (routes: RouteRecordRaw[]) =>
    routes.filter((r) => {
      const permission = (r.meta ? r.meta.permission : '') as string | string[];
      if (hasPermission(permission)) {
        if (r.children) {
          r.children = nestedRouteAuth(r.children);
        }
        return true;
      }
    });

  const AuthorizedRoute = nestedRouteAuth(AsyncRoute);
  store.commit('addMenu', AuthorizedRoute); // Asynchronous Route To Menu
  AuthorizedRoute.forEach((route) => router.addRoute('App', route));

  // 注入菜单未读标记
  injectRouteBadge()
};

export default setRouter;
