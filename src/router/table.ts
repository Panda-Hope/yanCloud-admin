import { h, resolveComponent } from 'vue'

const tableRoutes = [
  {
    path: 'table',
    meta: { title: '表格', permission: '*', icon: 'Tools'  },
    component: {render: () => h(resolveComponent('router-view'))},
    redirect: '/table/intro',
    children: [
      {
        path: 'intro',
        name: 'tableHome',
        meta: { permission: '*', title: '介绍', icon: 'Star' },
        component: () => import('@/pages/Table/index.vue')
      }
    ]
  }
]

export default tableRoutes