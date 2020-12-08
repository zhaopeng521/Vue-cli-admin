/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const accRouter = {
  path: '/account',
  component: Layout,
  redirect: '/account/settleCenter',
  name: 'account',
  meta: {
    title: '财务管理',
    activeMenu:'true',
    icon: 'table'
  },
  children: [
    {
      path: 'settleCenter',
      component: () => import('@/views/account/settleCenter'),
      name: 'settleCenter',
      meta: { title: '结算中心', }
    },
    {
      path: 'trade',
      component: () => import('@/views/account/trade'),
      name: 'trade',
      meta: { title: '交易管理' }
    },
    {
      path: 'accManage',
      component: () => import('@/views/account/accManage'),
      name: 'accManage',
      meta: { title: '账务管理',roles: ['level2']}
    },
    {
      path: 'refund',
      component: () => import('@/views/account/refund'),
      name: 'refund',
      meta: { title: '退款管理',}
    },
    {
      path: 'openAccount',
      component: () => import('@/views/account/openAccount'),
      hidden: true,
      name: 'openAccount',
      meta: { title: '商户进件',roles: ['admin']}
    },
    {
      path: 'openAccountInfo',
      component: () => import('@/views/account/openAccountInfo'),
      hidden: false,
      name: 'openAccountInfo',
      meta: { title: '进件信息',roles: ['admin']}
    },
    {
      path: 'distribution',
      component: () => import('@/views/account/distribution'),
      hidden: false,
      name: 'distribution',
      meta: { title: '分润设置',roles: ['admin']}
    },
    {
      path: 'test',
      component: () => import('@/views/account/test'),
      name: 'test',
      hidden: true,
      meta: { title: 'test' }
    },
  ]
}
export default accRouter
