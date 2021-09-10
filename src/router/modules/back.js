/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-06 14:36:39
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-07 15:55:07
 */
import Layout from '@/views/layout/layout-main/index'
const basePath = '@/views/back-views'
const ErrorLogPath = '/user-log/error-log'
const SuccessLogPath = '/user-log/success-log'

const backRoutes = [
  {
    path: '/back',
    component: Layout,
    children: [
      {
        path: 'error-log',
        name: 'ErrorLog',
        component: () => Promise.resolve(require(`${basePath + ErrorLogPath}`).default),
        meta: {
          title: 'ErrorLog', // 设置该路由在侧边栏和面包屑中展示的名字
          icon: 'icon-error', // 设置该路由的图标
          noCache: false, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
        },
        hidden: true
      },
      {
        path: 'success-log',
        name: 'SuccessLog',
        component: () => Promise.resolve(require(`${basePath + SuccessLogPath}`).default),
        meta: {
          title: 'SuccessLog',
          icon: 'icon-success',
          noCache: false,
          breadcrumb: false,
          affix: true
        },
        hidden: true
      }
    ]
  }
]
export default backRoutes
