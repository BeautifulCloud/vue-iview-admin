/**
 * @Autor: 刘轩亨
 * @Date: 2021-03-06 11:02:18
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-27 21:30:17
 */
// import Vue from 'vue';
// import Util from './util';
import store from '@/store'

export default {
  /**
   * 在新页面打开文件 .doc、.xls、.rar、.zip、.ppt
   * */
  fileOpen(url) {
    window.open(process.env.VUE_APP_FILE_URL + url + '?authorization=' + store.state.token, '_blank')
  },
  /**
   * 下载文件 .doc、.xls、.rar、.zip、.ppt
   * */
  fileDownload(url) {
    window.open(process.env.VUE_APP_FILE_URL + url + '?authorization=' + store.state.token, '_self')
  },
  /**
   * 返回文件完整路径
   * */
  getFileUrl(url) {
    return process.env.VUE_APP_FILE_URL + url + '?authorization=' + store.state.token
  },
  /**
   * 将 base64 转成excel
   * param: data为base64  filename需要加后缀名 test.xlsx
   * */
  saveData(data, filename) {
    const blob = dataURItoBlob(data)
    const objectUrl = URL.createObjectURL(blob)
    const aLink = document.createElement('a') // 新添加的  尝试
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', true, true)
    aLink.download = filename // 新添加的  尝试
    aLink.href = objectUrl
    aLink.click()
    // 没有清理的 DOM 元素引用
    // document.body.removeChild(aLink)
  },
  fileToBase64(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    return reader
  }
}

/**
 * base64  to blob二进制
 */
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[0]) // base64 解码
  var arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer) // 创建视图
  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: 'application/octet-stream;charset=utf-8;' }) // 修改-1
}
