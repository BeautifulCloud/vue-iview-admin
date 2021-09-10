/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-03 14:49:21
 * @Description:sideBar
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-10 11:16:32
 */
import router, { resetRouter } from '@/router/index'
import FrontRoutes from '@/router/modules/front'
import BackRoutes from '@/router/modules/back'

/**
 * @func
 * @desc s使用roleViews来确定是否有权限展示页面
 * @param {}
 * @return {}
 */
function inRoleViews(roleViews, route) {
  if (!route.meta || roleViews.includes(route.meta.name)) return true
  else return true
}

/**
 * @func filterRoutes
 * @desc 通过递归过滤前/后台路由表获得选中的路由
 * @param routes
 * @param roleViews
 * @return {}
 */
function filterRoutes(routes, roleViews) {
  const filteredRts = []
  routes.forEach((route) => {
    const temp = { ...route }
    if (!temp.hidden && inRoleViews(roleViews, route)) {
      if (temp.children && temp.children.length > 1) {
        temp.children = filterRoutes(temp.children, roleViews)
      }
      filteredRts.push(temp)
    }
  })
  return filteredRts
}

const state = {
  sidebarCollapsed: false,
  menuActiveName: 'home',
  dropdownActiveName: 'home',
  menuList: [
    {
      name: '首页',
      itemName: 'home',
      path: '/',
      icon: 'md-home',
      children: []
    },
    {
      name: '内容管理',
      itemName: 'nrgl',
      path: '/1',
      icon: 'md-headset',
      children: [
        { name: '文章管理', itemName: 'wzgl', path: '/2', icon: '', children: [] },
        { name: '评论管理', itemName: 'plgl', path: '/3', icon: '', children: [] },
        { name: '举报管理', itemName: 'jbgl', path: '/4', icon: '', children: [] }
      ]
    },
    {
      name: '用户管理',
      itemName: 'yhgl',
      path: '/5',
      icon: 'md-contacts',
      children: [
        { name: '新增用户', itemName: 'xzyh', path: '/6', icon: '', children: [] },
        { name: '活跃用户', itemName: 'hyyh', path: '/7', icon: '', children: [] }
      ]
    },
    {
      name: '统计分析',
      itemName: 'tjfx',
      path: '/11',
      icon: 'ios-analytics',
      children: [
        { name: '新增和启动', itemName: 'xzqd', path: '/8', icon: '', children: [] },
        { name: '活跃分析', itemName: 'hyfx', path: '/9', icon: '', children: [] },
        { name: '时段分析', itemName: 'sdfx', path: '/10', icon: '', children: [] },
        {
          name: '留存',
          itemName: 'lcxx',
          path: '/test',
          icon: '',
          children: [
            { name: '用户留存', itemName: 'yhlc', path: '/13', icon: '', children: [] },
            { name: '流失用户', itemName: 'lsyh', path: '/14', icon: '', children: [] }
          ]
        }
      ]
    },
    {
      name: '测试测试',
      itemName: 'cscs',
      path: '/test',
      icon: 'ios-paper',
      children: []
    },
    {
      name: '啊啊啊啊',
      itemName: 'aaaa',
      path: '/about',
      icon: 'logo-android',
      children: []
    }
  ],
  frontMenuList: [],
  backMenuList: []
}

const mutations = {
  CHANGE_COLLAPSED(state) {
    state.sidebarCollapsed = !state.sidebarCollapsed
  },
  CHANGE_MENU_ACTIVE_NAME(state, menuItemName) {
    state.menuActiveName = menuItemName
  },
  CHANGE_DROPDOWN_ACTIVE_NAME(state, dropdownItemName) {
    state.dropdownActiveName = dropdownItemName
  },
  GENERATE_FRONT_ROUTES(state, routes) {
    state.frontMenuList = routes
    router.addRoutes(routes)
  },
  GENERATE_BACK_ROUTES(state, routes) {
    state.backMenuList = routes
    router.addRoutes(routes)
  }
}

const actions = {
  changeCollapsed({ commit }) {
    commit('CHANGE_COLLAPSED')
  },
  changeActiveName({ commit }, data) {
    const { menuItemName, dropdownItemName } = data
    commit('CHANGE_MENU_ACTIVE_NAME', menuItemName)
    commit('CHANGE_DROPDOWN_ACTIVE_NAME', dropdownItemName)
  },
  generateRoutes({ commit }, data) {
    const { type, names } = data
    resetRouter()
    if (type === 'front') {
      return new Promise((resolve) => {
        const frontRoute = filterRoutes(FrontRoutes, names)
        commit('GENERATE_FRONT_ROUTES', frontRoute)
        resolve()
      })
    }
    if (type === 'back') {
      return new Promise((resolve) => {
        const backRoute = filterRoutes(BackRoutes, names)
        commit('GENERATE_BACK_ROUTES', backRoute)
        resolve()
      })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
