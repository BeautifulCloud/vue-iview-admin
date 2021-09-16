/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-03 16:04:29
 * @Description: 用户信息
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-16 15:46:39
 */
import { resetRouter } from '@/router/index'

const state = {
  role: 'admin',
  token: '', // 退出登录,登录超时都需要清理localStorage里存储的token,防止重定向路由导致的死循环
  frontViewNames: [],
  backViewNames: [],
  childViewSettings: []
}
const mutations = {
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_FRONT_VIEW_NAMES(state, names) {
    state.frontViewNames = names
  },
  SET_BACK_VIEW_NAMES(state, names) {
    state.backViewNames = names
  },
  SET_CHILD_VIEW_SETTINGS(state, settings) {
    state.childViewSettings = settings
  }
}
const actions = {
  setRole({ commit }, role) {
    resetRouter()
    commit('SET_ROLE', role)
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  getUserViews({ commit, state }) {
    // TODO:调用接口 获取用户token未到期时可查看页面的权限
    // getInfo(state.token).then((res) => {
    //   commit('SET_FRONT_VIEW_NAMES', res.frontNames)
    //   commit('SET_BACK_VIEW_NAMES', res.backNames)
    // })
    return new Promise((resolve) => {
      const frontNames = ['Home', 'FileReceive', 'Test1', 'Test2', 'Table']
      const backNames = []
      commit('SET_FRONT_VIEW_NAMES', frontNames)
      commit('SET_BACK_VIEW_NAMES', backNames)
      // const childViewSettings = [];
      // commit('SET_CHILD_VIEW_SETTINGS', childViewSettings)
      resolve()
    })
  },
  setFrontNames({ commit }, names) {
    return new Promise((resolve) => {
      commit('SET_FRONT_VIEW_NAMES', names)
      resolve(names)
    })
  },
  setBackNames({ commit }, names) {
    return new Promise((resolve) => {
      commit('SET_BACK_VIEW_NAMES', names)
      resolve(names)
    })
  },
  setChildViewSettings({ commit }, settings) {
    commit('SET_CHILD_VIEW_SETTINGS', settings)
  }
}
export default {
  state,
  mutations,
  actions
}
