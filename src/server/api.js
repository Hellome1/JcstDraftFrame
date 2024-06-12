/*
 * @Description: 后台接口
 * @Autor: LSX
 * @Date: 2021-10-25 16:52
 * @LastEditTime: 2021-11-24 17:16
 */

import request from '@/utils/request';
//患者基本信息
export function getPatInfo(query = {}) {
  request(
    handleReq({
      url: 'MES0001',
      method: 'post',
      data: query
    })
  ).then(res => {
    header_patInfo(res);
  })
}

//患者过敏信息
export function getAllergy(query = {}) {
  request(
    handleReq({
      url: 'MES0011',
      method: 'post',
      data: query
    })
  ).then(res => {
    header_allergyData(res);
  })
}

export default function () {
  getPatInfo();
  getAllergy();
  header_userInfo();
}