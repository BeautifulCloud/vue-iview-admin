/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-06 14:19:26
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-10 14:36:05
 */
import Layout from '@/views/layout/layout-main/index'
const Home = 'Home.vue'
const FileReceive = 'front-views/receive/fileReceive/index.vue'
const About = 'About.vue'

const frontRoutes = [
  {
    path: '/front/home',
    component: Layout,
    redirect: '/front/home/index',
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/' + Home),
        hidden: false,
        meta: {
          title: '首页',
          icon: 'md-home',
          toPath: '/front/home/index',
          noCache: true,
          breadcrumb: false,
          affix: true
        }
      }
    ]
  },
  {
    path: '/front/receive',
    name: 'Receive',
    component: Layout,
    redirect: '/front/receive/index',
    hidden: false,
    alwaysShow: true,
    meta: { title: '档案管理', icon: 'md-headset' },
    children: [
      {
        path: 'index',
        name: 'FileReceive',
        component: () => import('@/views/' + FileReceive),
        hidden: false,
        meta: {
          title: '档案接收',
          toPath: '/front/receive/index',
          noCache: false,
          breadcrumb: false,
          affix: true
        }
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
        component: () => import('@/views/' + About),
        meta: {
          title: '文章管理',
          toPath: '/front/content/test1',
          noCache: false,
          breadcrumb: false,
          affix: true
        },
        hidden: false
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/' + About),
        meta: {
          title: '评论管理',
          toPath: '/front/content/test2',
          noCache: false,
          breadcrumb: false,
          affix: true
        },
        hidden: false
      },
      {
        path: 'test3',
        name: 'Test3',
        component: () => import('@/views/' + About),
        meta: {
          title: '举报管理',
          toPath: '/front/content/test3',
          noCache: false,
          breadcrumb: false,
          affix: true
        },
        hidden: false
      }
    ]
  }
]

export default frontRoutes
