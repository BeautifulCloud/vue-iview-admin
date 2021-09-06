/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-31 13:56:04
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-06 16:45:53
 */
const getters = {
  // sidebar:state => state.app.sidebar
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  menuList: (state) => state.sidebar.menuList
}

export default getters
