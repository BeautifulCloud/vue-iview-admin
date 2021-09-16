/**
 * @Autor: 刘轩亨
 * @Date: 2021-08-19 16:23:45
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-16 16:22:04
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 插件
import Axios from 'axios'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'
import Less from 'less'
// 自定义
import Utils from './utils/util'
import Request from './utils/request'
import Tools from './utils/tools'
import TypePicker from './utils/typePicker'
// 样式
// import 'view-design/dist/styles/iview.css'
import 'normalize.css'
import 'animate.css'
import 'nprogress/nprogress.css'
import 'font-awesome/less/font-awesome.less'
import '@/assets/styles/styles.less'

// 自定义修改主题方法
// import changeThemeColor from './utils/theme'

Vue.prototype.$axios = Axios
Vue.prototype.$utils = Utils
Vue.prototype.$request = Request
Vue.prototype.$tools = Tools
Vue.prototype.$typePicker = TypePicker

Vue.use(Less)
Vue.use(VueRouter)
Vue.use(ViewUI, {
  transfer: true, // 所有带浮层的组件，是否将浮层放置在 body 内，默认为不设置，详见各组件默认的 transfer 值。可选值为 true 或 false。
  size: 'default', // 所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
  capture: true, // 所有带下拉的组件是否开启 capture 模式，默认为 true。可选值为 true 或 false
  select: {
    // arrow: 'md-arrow-dropdown', //Select 下拉箭头图标
    // customArrow: 'md-arrow-dropdown', //Select 自定义下拉箭头图标
    // arrowSize: 20 //Select 下拉箭头尺寸
  },
  cell: {
    // arrow://Cell 右侧箭头图标
    // customArrow://Cell 自定义右侧箭头图标
    // arrowSize://Cell 右侧箭头尺寸
  },
  menu: {
    // arrow: //Menu 下拉箭头图
    // customArrow: //Menu 自定义下拉箭头图标
    // arrowSize: //Menu 下拉箭头尺寸
  },
  tree: {
    // arrow: //Tree 下拉箭头图标
    // customArrow: //Tree 自定义下拉箭头图标
    // arrowSize: //Tree 下拉箭头尺寸
  },
  cascader: {
    // customArrow: //Cascader 自定义下拉箭头图标
    // arrowSize: //Cascader 下拉箭头尺寸
    // itemArrow: //Cascader 右侧箭头图标
    // customItemArrow: //Cascader 自定义右侧箭头图标
    // itemArrowSize: //Cascader 右侧箭头尺寸
  },
  colorPicker: {
    // arrow: //ColorPicker 下拉箭头图标
    // customArrow: //ColorPicker 自定义下拉箭头图标
    // arrowSize: //ColorPicker 下拉箭头尺寸
  },
  datePicker: {
    // icon: //DatePicker 日期图标
    // customIcon: //DatePicker 自定义日期图标
    // iconSize: //DatePicker 日期图标尺寸
  },
  timePicker: {
    // icon: //TimePicker 时间图标
    // customIcon: //TimePicker 自定义时间图标
    // iconSize: //TimePicker 时间图标尺寸
  },
  tabs: {
    // closeIcon: //Tabs 关闭图标
    // customCloseIcon: //Tabs 自定义关闭图标
    // closeIconSize: //Tabs 关闭图标尺寸
  },
  modal: {
    // maskClosable: //Modal 的 maskClosable 属性
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    // if (Utils.selectSStorage('store')) {
    //   const oldState = Utils.getSStorage('store')
    //   this.$store.replaceState(Object.assign({}, this.$store.state, oldState))
    //   Utils.deleteSStorage('store')
    // }
    if (Utils.selectLStorage('settings')) {
      const settingsState = Utils.getLStorage('settings')
      Object.keys(settingsState).forEach((key) => {
        this.$store.commit('CHANGE_SETTINGS', { key, value: settingsState[key] })
      })
    }
    if (Utils.selectLStorage('token')) {
      const token = Utils.getLStorage('token')
      this.$store.commit('SET_TOKEN', token)
    }
    window.addEventListener('beforeunload', () => {
      Utils.setLStorage('settings', this.$store.state.settings)
    })
  },
  mounted() {
    import('./assets/themes/' + this.$store.getters.themeName + '.less')
  },
  render: (h) => h(App)
}).$mount('#app')
