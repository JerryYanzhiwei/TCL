const Login = () => import(/* webpackChunkName: "login" */ '../../views/login/index.vue')

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
