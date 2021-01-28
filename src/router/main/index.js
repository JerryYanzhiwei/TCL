const main = () => import(/* webpackChunkName: "login" */ '../../views/mainpage/index.vue')

export default [
  {
    path: '/main',
    name: 'main',
    component: main
  }
]
