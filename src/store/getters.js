/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-31 13:56:04
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-13 15:08:36
 */
const getters = {
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  frontMenuList: (state) => state.sidebar.frontMenuList,
  backMenuList: (state) => state.sidebar.backMenuList,
  themeName: (state) => state.settings.themeName
}

export default getters
