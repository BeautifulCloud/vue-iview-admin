/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-26 16:50:29
 * @Description:设置缓存信息
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-17 17:55:03
 */
import { CHANGE_SETTINGS } from '../mutation-types'
const state = {
  themeName: 'theme_base',
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
  fixedHeader: true,
  showTableBorder: true,
  showTableStripe: true,
  showTableHeader: true,
  showTableExport: true,
  showTableSortExport: true,
  showTableCustomExport: true,
  showTableOperation: true,
  tableColumnsSettings: {},
  fixTableColumns: true,
  tableSize: 'default'
}
const mutations = {
  [CHANGE_SETTINGS]: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) state[key] = value
  },
  CHANGE_TABLE_COLUMNS: (state, { key, arr }) => {
    state.tableColumnsSettings[key] = arr
  }
}
const actions = {
  changeSettings: ({ commit }, data) => {
    commit('CHANGE_SETTINGS', data)
  },
  changeTableColumns: ({ commit }, data) => {
    // const { key } = data
    // if (Object.prototype.hasOwnProperty.call(state.tableColumnsSettings, key))
    commit('CHANGE_TABLE_COLUMNS', data)
  }
}
export default {
  namespace: true,
  state,
  mutations,
  actions
}
