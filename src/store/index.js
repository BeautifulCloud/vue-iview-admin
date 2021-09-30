/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-20 14:09:09
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-30 16:43:54
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
    tagsViewList: [{ name: '首页', canClose: false, path: '/home' }]
  },
  mutations: {},
  actions: {},
  modules,
  getters
})
