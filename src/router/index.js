import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/home',
    component: Layout,
    hidden: false,
    children: [{
      path:'index',
      name:'首页',
      meta: { title: '首页', icon: 'home' },
      component: () => import('@/views/home/index')
    }]
  },
  {
    path: '/customer',
    component: Layout,
    meta: { title: '客户管理', icon: 'customer' },
    redirect: '/customer/list',
    name:'客户管理',
    children: [
      {
        path: 'list',
        name:'客户列表',
        component: () => import('@/views/customer/list'),
        meta: { title: '客户列表', icon: 'customer' }
      },
      {
        path: 'account-list',
        name:'账号列表',
        component: () => import('@/views/customer/accountList'),
        meta: { title: '账号列表', icon: 'account' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    name:'报表管理',
    meta: { title: '报表管理', icon: 'report' },
    redirect: '/report/index',
    children: [
      {
        path: 'index',
        name:'总览报表',
        component: () => import('@/views/report/index'),
        meta: { title: '总览报表', icon: 'overview' }
      },
      {
        path: 'creative-index',
        name:'创意报表',
        component: () => import('@/views/report/creativeIndex'),
        meta: { title: '创意报表', icon: 'creativeIndex' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  base:'/',
  mode:'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
