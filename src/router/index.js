import Vue from 'vue'
import Router from 'vue-router'
import Login from './login'

const teamhall = () => import(/* webpackChunkName: "login" */ '../views/teamhall/index.vue')
const moduleSelect = () => import(/* webpackChunkName: "login" */ '../views/moduleSelect/index.vue')
const main = () => import(/* webpackChunkName: "backend" */ '../views/mainpage/index.vue')
const userInfo = () => import(/* webpackChunkName: "backend" */ '../views/mainpage/pages/userInfo.vue')
const teamInfo = () => import(/* webpackChunkName: "backend" */ '../views/mainpage/pages/teamInfo.vue')
const worksSubmit = () => import(/* webpackChunkName: "backend" */ '../views/mainpage/pages/worksSubmit.vue')
const worksStatus = () => import(/* webpackChunkName: "backend" */ '../views/mainpage/pages/worksStatus.vue')
const applyList = () => import(/* webpackChunkName: "backend" */ '../views/mainpage/pages/applyList.vue')
const teamCenter = () => import(/* webpackChunkName: "backend" */ '../views/mainpage/pages/teamCenter.vue')
const teamDetail = () => import(/* webpackChunkName: "backend" */ '../views/mainpage/pages/teamDetail.vue')

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/teamhall',
    name: 'teamhall',
    component: teamhall
  },
  {
    path: '/moduleSelect',
    name: 'moduleSelect',
    component: moduleSelect
  },
  {
    path: '/main',
    component: main,
    redirect: '/main/userInfo',
    children: [
      {
        path: 'userInfo',
        component: userInfo
      },
      {
        path: 'teamInfo',
        component: teamInfo
      },
      {
        path: 'applyList',
        component: applyList
      },
      {
        path: 'worksSubmit',
        component: worksSubmit
      },
      {
        path: 'worksStatus',
        component: worksStatus
      },
      {
        path: 'teamCenter',
        component: teamCenter
      },
      {
        path: 'teamDetail',
        component: teamDetail
      }
    ]
  },
  ...Login
]

const router = new Router({
  mode: 'history',
  base: '/tcl',
  routes
})

export default router
