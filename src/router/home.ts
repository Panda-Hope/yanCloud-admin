import { RouteRecordRaw } from 'vue-router'

/* Home Route Module */
const HomeRoutes: RouteRecordRaw[] = [
  {
    path: 'home',
    name: 'Home',
    meta: { title: '主页', icon: 'HomeFilled' },
    component: () => import('@/pages/WhiteRoutes/Home/index.vue')
  }
]
export default HomeRoutes
