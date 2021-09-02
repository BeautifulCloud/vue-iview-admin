/***
 * @Autor: 刘轩亨
 * @Date: 2021-02-18 11:01:02
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-19 16:55:50
 */

import Vue from 'vue';
import XLSX from 'xlsx';

export default {
  /**
   * 图片预览方法
   * 已注入所有Vue实例，
   * template模板里调用 $imgPreview(src)
   * 组件方法里调用 this.$imgPreview(src)
   */
  imgPreview: src => {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let close = document.createElement('i');
    div.className = 'body__img__preview';
    img.src = src;
    close.className = 'body__img__close';
    close.onclick = () => {
      document.body.removeChild(div);
    };
    div.appendChild(img);
    div.appendChild(close);
    document.body.appendChild(div);
  },

  /**
   * 格式化日期方法
   * 已注入所有Vue实例，
   * template模板里调用 $dateFormat(date)
   * 组件方法里调用 this.$dateFormat(date)
   * 例：this.$dateFormat('Dec 27, 2017 3:18:14 PM') 得到 '2017-12-27 15:18:14'
   */
  dateFormat: date => {
    if (!date) return '';
    let date_format = new Date(date);
    let year = date_format.getFullYear();
    let month = date_format.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let mydate = date_format.getDate();
    if (mydate < 10) mydate = '0' + mydate;
    let hours = date_format.getHours();
    if (hours < 10) hours = '0' + hours;
    let minutes = date_format.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    let seconds = date_format.getSeconds();
    if (seconds < 10) seconds = '0' + seconds;
    let time = `${year}-${month}-${mydate} ${hours}:${minutes}:${seconds}`;
    return time;
  },

  /**
   * 格式化日期方法
   * 已注入所有Vue实例，
   * template模板里调用 $dateFormatNoTime(date)
   * 组件方法里调用 this.$dateFormatNoTime(date)
   * 例：this.$dateFormatNoTime('Dec 27, 2017 3:18:14 PM') 得到 '2017-12-27'
   */
  dateFormatNoTime: date => {
    if (!date) return '';
    let date_format = new Date(date);
    let year = date_format.getFullYear();
    let month = date_format.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let mydate = date_format.getDate();
    if (mydate < 10) mydate = '0' + mydate;
    let time = `${year}-${month}-${mydate}`;
    return time;
  },

  /**
   * 获取当天日期方法
   * 已注入所有Vue实例，
   * template模板里调用 $todayFormat
   * 组件方法里调用 this.$todayFormat
   * 例：this.$todayFormat() 得到 '2018-01-31'
   */
  todayFormat: () => {
    let date_format = new Date();
    let year = date_format.getFullYear();
    let month = date_format.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let date = date_format.getDate();
    if (date < 10) date = '0' + date;
    let time = `${year}-${month}-${date}`;
    return time;
  },

  /**
   * 导出数据报表xlsx文件
   * 已注入所有Vue实例，
   * template模板里调用 $$outputXlsxFile
   * 组件方法里调用 this.$outputXlsxFile
   * 例：this.$outputXlsxFile([['字段1', '字段2'], [1, 2]], [{wch: 10}, {wch: 50}], '测试导出') 得到 测试导出.xlsx 文件
   * 第一个参数是导出的数组对象，第二个参数是设置字段宽度，第三个参数是文件名
   */
  outputXlsxFile: (data, wscols, xlsxName) => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = wscols;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, xlsxName);
    /* generate file and send to client */
    XLSX.writeFile(wb, xlsxName + '.xlsx');
  },

  /**
   * 判断开始时间和结束时间
   * 已注入所有Vue实例，
   * template模板里调用 $checkTime
   * 组件方法里调用 this.$checkTime
   * 例：this.$checkTime(['2018-01-01', '2018-02-02']) 得到 {'2018/01/01', '2018/02/02'}
   */
  checkTime: date => {
    if (!date) {
      Vue.prototype.$notify.error({
        message: '日期不能为空'
      });
      return false;
    } else {
      let begTime = date[0].replace(/-/g, '/');
      let endTime = date[1].replace(/-/g, '/');
      if (+new Date(endTime).getTime() < +new Date(begTime).getTime()) {
        Vue.prototype.$notify.error({
          message: '开始日期不能大于结束日期'
        });
        return false;
      } else {
        begTime = date[0];
        endTime = date[1];
        return {
          begTime,
          endTime
        };
      }
    }
  },

  /**
   * 时间戳转换
   * 已注入所有Vue实例，
   * template模板里调用 $timestampToTime
   * 组件方法里调用 this.$timestampToTime
   * 例：this.$timestampToTime(1523440865000) 得到 '2018-04-11 18:1:5'
   */
  timestampToTime: timestamp => {
    var date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D + h + m + s;
  },

  /**
   * 计算文件大小（kb）
   * */
  getFileSizeKB: fileSize => {
    return (parseFloat(fileSize) / 1024).toFixed(3).toString() + ' kb';
  },
  /**
   * 计算文件大小（mb）
   * */
  getFileSizeMB: fileSize => {
    return (parseFloat(fileSize) / 1024 / 1024).toFixed(3).toString() + ' Mb';
  },
  /**
   * url传值获取方法
   * 跨页面传参正则截取
   * */
  GetQueryString: name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return null;
  },

  /**
   * 获取当前页面url
   * 获取整个 URL 为字符串
   * */
  getLocationUrl: () => {
    return window.location.href;
  },

  /**
   * 获取当前页面
   * 协议部分
   * */
  getLocationProtocol: () => {
    return window.location.protocol;
  },

  /**
   * 获取当前页面url
   *获取 URL 的主机部分(ip地址)
   * */
  getLocationHost: () => {
    return window.location.host;
  },

  /**
   * 获取当前页面url
   *获取 URL 的端口号
   * */
  getLocationPort: () => {
    return window.location.port;
  },

  /**
   * 获取当前页面url
   *获取 URL 的路径
   * */
  getLocationPathname: () => {
    console.log(window.location.pathname);
    return window.location.pathname;
  },

  /**
   * 获取当前页面url
   *获取 URL 的传值部分（?后面都部分）
   * */
  getLocationSearch: () => {
    return window.location.search;
  },

  /**
   * 获取当前页面url
   *获取 URL 的#后面的分段
   * */
  getLocationHash: () => {
    return window.location.hash;
  },
  /**
   * 字符串判空
   * ""、null、undefined
   * */
  StringIsEmpty: str => {
    if (str == '' || str == null || typeof str == 'undefined') return true;
    else return false;
  },
  /**
   * 数组判空
   * []
   * */
  ArrayIsEmpty: list => {
    if (!list.length || list.length == 0) return true;
    else return false;
  },
  /**
   * 对象判空
   * {}
   * */
  ObjectIsEmpty: data => {
    if (JSON.stringify(data) == '{}') return true;
    else return false;
  },
  /**
   * 请求参数验证
   * params 的所有属性值都不能为空
   * 参数验证
   * if(!this.paramsValidate(params)) return;
   */
  ObjParamsValidate: function(params) {
    if (JSON.stringify(params) == '{}') return true;
    else {
      for (var key in params) {
        if (
          (Array.isArray(params[key]) && params[key].length != 0) ||
          (typeof params[key] == 'string' && params[key] != '') ||
          (Object.prototype.toString.call(params[key]) === '[object Object]' && Object.keys(params[key]).length > 0)
        ) {
          return false; // 终止程序
        }
      }
      return true;
    }
  },
  /**
   * 对象置空
   */
  ObjEmpty: function(params) {
    if (JSON.stringify(params) == '{}') return {};
    else {
      for (var key in params) {
        if (Array.isArray(params[key]) && params[key].length != 0) {
          params[key] = [];
        }
        if (typeof params[key] == 'string' && params[key] != '') {
          params[key] = '';
        }
        if (Number.isFinite(params[key]) && params[key]) {
          params[key] = null;
        }
        if (Object.prototype.toString.call(params[key]) === '[object Object]' && Object.keys(params[key]).length > 0) {
          params[key] = {};
        }
      }
      return params;
    }
  },
  /**
   * 存localStorage
   * */
  setLStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 取localStorage
   * */
  getLStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },

  /**
   * 置空某个localStorage
   * */
  deleteLStorage(key) {
    window.localStorage.removeItem(key);
  },

  /**
   * 查看是否有某个localStorage
   * */
  selectLStorage(key) {
    if (Object.prototype.hasOwnProperty.call(window.localStorage, key)) return true;
    else return false;
  },

  /**
   * 清空localStorage
   * */
  clearLStorage() {
    window.localStorage.clear();
    console.log('123123');
  },

  /**
   * 存sessionStorage
   * */
  setSStorage(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 取sessionStorage
   * */
  getSStorage(key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  },

  /**
   * 置空某个sessionStorage
   * */
  deleteSStorage(key) {
    window.sessionStorage.removeItem(key);
  },

  /**
   * 查看是否有某个sessionStorage
   * */
  selectSStorage(key) {
    if (Object.prototype.hasOwnProperty.call(window.sessionStorage, key)) return true;
    else return false;
  },

  /**
   * 清空sessionStorage
   * */
  clearSStorage() {
    window.sessionStorage.clear();
  },
  /**
   * 分割数组创建二维数组封装
   * @param data 数组
   * @param newArrsLen 需要分割成子数组的长度
   * 例：sliceArrs([1.2.3.4.5.6],2)  ==> [1,2],[3.4],[5,6]
   */
  sliceArrs: (data, newArrsLen) => {
    var lists = [];
    for (let i = 0; i < data.length; i += newArrsLen) {
      lists.push(data.slice(i, i + newArrsLen));
    }
    return lists;
  },
  /**
   * 获得一个（0-1）随机数
   * */
  getRandom(num = 1) {
    return num * Math.random();
  },

  /**
   * 判断浏览器类型
   * */
  BrowserType: () => {
    let browserType = '';
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf('Firefox') > -1) browserType = 'Firefox';
    else if (userAgent.indexOf('Chrome') > -1) browserType = 'Chrome';
    else browserType = 'IE';
    if (browserType == 'IE') return true;
    else return false;
  },
  /**
   * 把url转换为blob对象继续下载
   */
  fileUrlDownload(fileUrl, fileName) {
    const a = document.createElement('a');
    let url = process.env.VUE_APP_FILE_URL + fileUrl; // 若是不完整的url则需要拼接baseURL
    // const url = binding.value; // 完整的url则直接使用
    // 这里是将url转成blob地址，
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        // 将链接地址字符内容转变成blob地址
        a.href = URL.createObjectURL(blob);
        // a.download = ''; // 下载文件的名字
        if (fileName) a.download = fileName;
        else a.download = url.split('/')[url.split('/').length - 1]; // 下载文件的名字
        document.body.appendChild(a);
        a.click();
      });
  }
};
