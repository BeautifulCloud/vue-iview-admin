/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-06 14:19:26
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-09 09:13:49
 */
import Layout from '@/views/layout/layout-main/index'
const basePath = '@/views/front-views'
const ReceivePath = '/receive/index'

const frontRoutes = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '首页', // 设置该路由在侧边栏和面包屑中展示的名字
          icon: 'md-home', // 设置该路由的图标
          noCache: true, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
        },
        hidden: false
      }
    ],
    hidden: false
  },
  {
    path: '/front/receive',
    component: Layout,
    redirect: '/front/receive/index',
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'Receive',
        component: () => Promise.resolve(require(`${basePath + ReceivePath}`).default),
        meta: {
          title: '档案接收', // 设置该路由在侧边栏和面包屑中展示的名字
          icon: 'icon-receive', // 设置该路由的图标
          noCache: false, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
        },
        hidden: false
      }
    ]
  },
  {
    path: '/front/content',
    name: 'Content',
    component: Layout,
    redirect: '/front/content/test1',
    hidden: false,
    meta: {
      title: '内容管理',
      icon: 'md-headset'
    },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => Promise.resolve(require(`${basePath + ReceivePath}`).default),
        meta: {
          title: '文章管理', // 设置该路由在侧边栏和面包屑中展示的名字
          noCache: false, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
        },
        hidden: false
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => Promise.resolve(require(`${basePath + ReceivePath}`).default),
        meta: {
          title: '评论管理', // 设置该路由在侧边栏和面包屑中展示的名字
          noCache: false, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
        },
        hidden: false
      },
      {
        path: 'test3',
        name: 'Test3',
        component: () => Promise.resolve(require(`${basePath + ReceivePath}`).default),
        meta: {
          title: '举报管理', // 设置该路由在侧边栏和面包屑中展示的名字
          noCache: false, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          breadcrumb: false, //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
          affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
        },
        hidden: false
      }
    ]
  }
]

export default frontRoutes
