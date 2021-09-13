/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-03 16:04:29
 * @Description: 用户信息
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-13 14:42:19
 */
import { resetRouter } from '@/router/index'

const state = {
  role: 'admin',
  token: 'admin2580', // 退出登录,登录超时都需要清理localStorage里存储的token,防止重定向路由导致的死循环
  frontViewNames: [],
  backViewNames: []
}
const mutations = {
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_FRONT_VIEW_NAMES(state, names) {
    state.frontViewNames = names
  },
  SET_BACK_VIEW_NAMES(state, names) {
    state.backViewNames = names
  },
  COMMIT_USER_DATA(state, data) {
    const { key, value } = data
    state[key] = value
  }
}
const actions = {
  setRole({ commit }, role) {
    resetRouter()
    commit('SET_ROLE', role)
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
  }
}
export default {
  state,
  mutations,
  actions
}
