/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-03 14:49:21
 * @Description:sideBar
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-30 16:21:04
 */
import router from '@/router/index'
import FrontRoutes from '@/router/modules/front'
import BackRoutes from '@/router/modules/back'

/**
 * @func
 * @desc 使用roleViews来确定是否有权限展示页面
 * @param {}
 * @return {}
 */
function inRoleViews(roleViewNames, route) {
  if (route.meta && route.name) {
    return roleViewNames.some(() => roleViewNames.includes(route.name))
  } else return true
}

/**
 * @func filterRoutes
 * @desc 通过递归过滤前000/后台路由表获得选中的路由
 * @param routes
 * @param roleViews
 * @return {}
 */
function filterRoutes(routes, roleViews) {
  const filteredRts = []
  routes.forEach((route) => {
    const temp = { ...route }
    if (!temp.hidden && inRoleViews(roleViews, route)) {
      if (temp.children) {
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
  generateRoutes({ state, commit }, data) {
    const { type, names } = data
    if (type === 'front') {
      return new Promise((resolve) => {
        const frontRoute = filterRoutes(FrontRoutes, names)
        commit(
          'GENERATE_FRONT_ROUTES',
          frontRoute.filter((route) => route.children.length > 0)
        )
        resolve()
      })
    }
    if (type === 'back') {
      return new Promise((resolve) => {
        const backRoute = filterRoutes(BackRoutes, names)
        commit(
          'GENERATE_BACK_ROUTES',
          backRoute.filter((route) => route.children.length > 0)
        )
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
