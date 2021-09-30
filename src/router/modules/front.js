/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-06 14:19:26
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-30 17:04:50
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
    path: '/components',
    component: Layout,
    redirect: '/components/table',
    hidden: false,
    alwaysShow: true,
    meta: {
      title: '组件查看',
      icon: 'md-headset',
      name: 'Components'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/component-use/table.vue'),
        meta: {
          title: '表格',
          toPath: '/components/table',
          noCache: false,
          breadcrumb: false,
          affix: false
        },
        hidden: false
      },
      {
        path: 'formSearch',
        name: 'FormSearch',
        component: () => import('@/views/component-use/formSearch.vue'),
        meta: {
          title: '表单查询',
          toPath: '/components/formSearch',
          noCache: false,
          breadcrumb: false,
          affix: false
        },
        hidden: false
      }
    ]
  },
  {
    path: '/front/receive',
    component: Layout,
    redirect: '/front/receive/index',
    hidden: false,
    alwaysShow: true,
    meta: { title: '档案管理', icon: 'md-headset', name: 'Receive' },
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
          affix: false
        }
      }
    ]
  },
  {
    path: '/front/content',
    component: Layout,
    redirect: '/front/content/test1',
    hidden: false,
    alwaysShow: true,
    meta: {
      title: '内容管理',
      icon: 'md-headset',
      name: 'Content'
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
          affix: false
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
          affix: false
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
          affix: false
        },
        hidden: false
      }
    ]
  },
  {
    path: '/front/home1',
    component: Layout,
    redirect: '/front/home/index',
    hidden: false,
    alwaysShow: false,
    children: [
      {
        path: 'index',
        name: 'Home1',
        component: () => import('@/views/' + Home),
        hidden: false,
        meta: {
          title: '首页1',
          icon: 'md-home',
          toPath: '/front/home/index',
          noCache: true,
          breadcrumb: false,
          affix: false
        }
      }
    ]
  }
]

export default frontRoutes
