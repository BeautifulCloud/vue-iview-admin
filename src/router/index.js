/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-20 14:09:09
 * @Description:  路由index.js
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-09 10:46:10
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
// import Layout from '@/views/layout/layout-main/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'Home',
  //       component: () => import('@/views/Home.vue')
  //     },
  //     {
  //       path: 'blank',
  //       name: 'Blank',
  //       component: () => import('@/views/Blank.vue')
  //     },
  //     {
  //       path: 'test',
  //       name: 'Test',
  //       component: () => import('@/views/test')
  //     },
  //     {
  //       path: 'about',
  //       name: 'About',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //     }
  //   ]
  // },
  { path: '/401', component: () => import('@/views/error-page/401.vue'), hidden: true },
  { path: '/404', component: () => import('@/views/error-page/404.vue'), hidden: true },
  { path: '/500', component: () => import('@/views/error-page/500.vue'), hidden: true },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

let roleRoutes = []
const requireContext = require.context('./modules', true, /\.js$/)
requireContext.keys().forEach((filename) => {
  const requireModule = requireContext(filename)
  roleRoutes = [...roleRoutes, ...(requireModule.default || requireModule)]
})

const createRouter = () => new VueRouter({ routes })
const router = createRouter()
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach((route) => {
  NProgress.done()
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.match = newRouter.match
}

export default router
