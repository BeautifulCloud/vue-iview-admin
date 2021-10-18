/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-20 14:09:09
 * @Description:  路由index.js
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-10-18 10:25:07
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import Utils from '@/utils/util'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/401', component: () => import('@/views/error-page/401.vue'), hidden: true },
  { path: '/404', component: () => import('@/views/error-page/404.vue'), hidden: true },
  { path: '/500', component: () => import('@/views/error-page/500.vue'), hidden: true }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

let roleRoutes = []
const requireContext = require.context('./modules', true, /\.js$/)
requireContext.keys().forEach((filename) => {
  const requireModule = requireContext(filename)
  roleRoutes = [...roleRoutes, ...(requireModule.default || requireModule)]
})

const createRouter = () => new VueRouter({ routes })
const router = createRouter()
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (Utils.getLStorage('token') && to.path !== '/') {
    const frontMenu = store.state.sidebar.frontMenuList
    const backMenu = store.state.sidebar.backMenuList
    if (to.path === '/login') {
      if (frontMenu) next({ path: '/front/home/index', replace: true })
      else if (backMenu) next({ path: '/back/home/index', replace: true })
      else next({ path: '/login', replace: true })
    } else {
      if (frontMenu.length > 0 || backMenu.length > 0) next()
      else {
        // 通过token获取用户信息 调用user中的action里的getUserViews方法
        store
          .dispatch('getUserViews')
          .then(() => {
            store.dispatch('generateRoutes', { type: 'front', names: store.state.user.frontViewNames })
          })
          .then(() => {
            store.dispatch('generateRoutes', { type: 'back', names: store.state.user.backViewNames })
          })
          .then(() => {
            next({ ...to, replace: true })
          })
      }
    }
  } else if (to.path === '/login') next()
  else next({ path: '/login', replace: true })
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
