import { h, resolveComponent } from 'vue'

const skeletonRoutes = [
  {
    path: 'skeleton',
    meta: { title: '骨架屏', permission: '*', icon: 'Tools'  },
    component: {render: () => h(resolveComponent('router-view'))},
    redirect: '/skeleton/intro',
    children: [
      {
        path: 'intro',
        name: 'skeletonHome',
        meta: { permission: '*', title: '介绍', icon: 'Star' },
        component: () => import('@/pages/Skeleton/index.vue')
      }
    ]
  }
]

export default skeletonRoutes