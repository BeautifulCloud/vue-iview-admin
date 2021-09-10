/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-03 16:04:29
 * @Description: 用户信息
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-10 11:12:29
 */
const state = {
  role: 'admin',
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
  }
}
const actions = {
  setRole({ commit }, role) {
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
