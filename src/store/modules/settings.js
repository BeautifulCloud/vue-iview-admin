/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-26 16:50:29
 * @Description:设置缓存信息
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-03 16:05:46
 */
import { CHANGE_SETTINGS } from '../mutation-types'
const state = {
  useSidebar: true,
  themeSidebar: false,
  fixedSidebar: true,
  showFoldIcon: true,
  showSidebarTitle: true,
  sidebarAccordion: true,
  showRefreshIcon: true,
  showSetting: true,
  showTagsView: true,
  tagsViewSpeed: 30,
  fixedHeader: true
}
const mutations = {
  [CHANGE_SETTINGS]: (state, { key, value }) => {
    // eslint-disable-next-line
    if (state.hasOwnProperty(key)) state[key] = value
    // state[key] = value
  }
}
const actions = {
  changeSettings: ({ commit }, data) => {
    commit('CHANGE_SETTINGS', data)
  }
}
export default {
  namespace: true,
  state,
  mutations,
  actions
}
