/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-20 14:09:09
 * @Description:  路由index.js
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-01 09:53:24
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blank from '../views/Blank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/layout/layout-main/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'blank',
        name: 'Blank',
        component: Blank
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test')
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
