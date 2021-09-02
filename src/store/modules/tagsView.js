/**
 * @Autor: 刘轩亨
 * @Date: 2021-09-02 09:19:31
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-02 10:09:48
 */
const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  ADD_VISITED_VIEWS: (state, view) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push(Object.assign({}, view, { title: view.meta.title || 'no-name' }))
  },
  ADD_CACHED_VIEWS: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_VISITED_VIEWS: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view)
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
