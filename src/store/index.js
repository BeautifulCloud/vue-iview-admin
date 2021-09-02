/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-20 14:09:09
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-01 13:54:39
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  state: {
    token: '',
    sidebarCollapsed: false,
    showSidebar: true,
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
    tagsViewList: [{ name: '首页', canClose: false, path: '/home' }]
  },
  mutations: {
    isSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    changeMenuActiveName(state, menuitemName) {
      state.menuActiveName = menuitemName
    },
    changeDropdownActiveName(state, dropdownItemName) {
      state.dropdownActiveName = dropdownItemName
    },
    addTag(state, data) {
      state.tagsViewList.push(data)
    }
  },
  actions: {},
  modules,
  getters
})
