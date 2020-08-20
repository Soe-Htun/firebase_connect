import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import signIn from '../views/signIn.vue'
// import home from '../views/home.vue'
import logout from '../views/logout'
import layout from '../Nav/layout'
import first from '../Nav/first';
import second from '../Nav/second';
import third from '../Nav/third';
import four from '../Nav/four'

import home from '../views/home2.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: signIn
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/logout',
    name: 'logout',
    component: logout
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '/first',
        name: 'first',
        component: first
      },
      {
        path: '/second',
        name: 'second',
        component: second
      },
      {
        path: '/third',
        name: 'third',
        component: third
      },
      {
        path: '/four',
        name: 'four',
        component: four
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
