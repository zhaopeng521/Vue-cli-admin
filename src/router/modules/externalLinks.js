/** When your routing table is too long, you can split it into small modules **/



const externalRouter = [{
  path: '/accountHRET',
  component: () => import('@/views/account/settleCenter'),
  name: 'acc',
  meta: {
    title: '结算中心',
    icon: 'table'
  },
  hidden: true,
},{
  path: '/accountHRET/trade',
  component: () => import('@/views/account/trade'),
  name: 'tradeHRET',
  hidden: true,
  meta: { title: '交易管理' },
},
  {
    path: '/accountHRET/accManage',
    component: () => import('@/views/account/accManage'),
    name: 'accManageHRET',
    hidden: true,
    meta: { title: '账务管理' }
  },
  {
    path: '/accountHRET/refund',
    component: () => import('@/views/account/refund'),
    name: 'refundHRET',
    hidden: true,
    meta: { title: '退款管理' }
  }]

export default externalRouter
