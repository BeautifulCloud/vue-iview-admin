/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-03 14:49:21
 * @Description:sideBar
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-06 16:52:39
 */

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
  ]
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
  }
}

export default {
  state,
  mutations,
  actions
}
