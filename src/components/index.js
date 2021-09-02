/***
 * @Autor: 刘轩亨
 * @Date: 2021-08-19 17:06:10
 * @Description: 全局注册组件
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-24 13:32:47
 */
import Vue from 'vue';

const requireContext = require.context('./global', true, /\.vue$/);

requireContext.keys().forEach(fileName => {
  const componentConfig = requireContext(fileName);
  Vue.component(componentConfig.default.name || componentConfig.name, componentConfig.default || componentConfig);
});