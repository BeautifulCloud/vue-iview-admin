/***
 * @Autor: 刘轩亨
 * @Date: 2021-02-18 11:01:02
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-07-28 13:46:15
 */
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import NProgress from 'nprogress';
import { Message, Notification, Loading } from 'element-ui';

NProgress.configure({ showSpinner: false });
var loadingInstance;
const loadingOptions = { lock: true, text: '加载数据中', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.3)' };
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 120000,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});
//请求拦截器
request.interceptors.request.use(
  config => {
    if (config.url.indexOf('/excuteImportData') != -1) config.headers = { 'Content-Type': 'multipart/form-data' };
    config.headers['authorization'] = store.state.token;
    // 防止重复点击问题发生，添加elUI loading遮罩，判断是否启用遮罩可以通过在请求添加信息来判断
    loadingInstance = Loading.service(loadingOptions);
    NProgress.start();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  async response => {
    const resultData = response.data;
    if (response.status == 200 && !response.headers.enableredirect) {
      if (resultData.code == '200' && resultData.state == '00000') {
        NProgress.done();
        loadingInstance.close();
        if (resultData.data) return resultData.data;
        else return true;
      } else {
        NProgress.done();
        Message.error({
          message: resultData.message
        });
        loadingInstance.close();
        if (response.config.url.indexOf('/excuteImportData') != -1) return { isTrue: false };
        return false;
      }
    } else {
      NProgress.done();
      //TODO 解决超时后 多个登陆失败的提示
      Notification.error({
        title: '错误',
        message: resultData.message,
        duration: 1000,
        onClose() {
          loadingInstance.close();
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.fullPath }
          });
        }
      });
    }
  },
  async error => {
    Message.error({
      message: '连接超时'
    });
    NProgress.done();
    loadingInstance.close();
    return Promise.reject(error);
  }
);

export default request;
