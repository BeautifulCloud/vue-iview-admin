/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-06 14:19:26
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-06 16:43:26
 */
import Layout from '@/views/layout/layout-main/index'
const basePath = '@/views/front-views'
const ReceivePath = '/receive/index'

export default [
  {
    path: '/front',
    component: Layout,
    children: [
      {
        path: 'receive',
        name: 'Receive',
        component: () => Promise.resolve(require(`${basePath + ReceivePath}`).default),
        meta: {
          title: 'Receive', // 设置该路由在侧边栏和面包屑中展示的名字
          icon: 'icon-receive', // 设置该路由的图标
          noCache: false, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
        },
        hidden: true
      }
    ]
  }
]
