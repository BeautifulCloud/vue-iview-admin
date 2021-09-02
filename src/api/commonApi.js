/***
 * @Autor: 刘轩亨
 * @Date: 2021-02-24 09:39:59
 * @Description:通用接口
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-19 17:00:03
 */
import { Account } from '@/services/moduleName';
import request from '@/utils/request';

//登陆接口
export function login(data) {
  return request({
    url: Account + '/login',
    method: 'post',
    data: data
  });
}
//ljx 切换角色接口
export function switchRole(data) {
  return request({
    url: Account + '/switchRole',
    method: 'post',
    data
  });
}

