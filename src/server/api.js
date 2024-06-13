/*
 * @Description: 后台接口
 * @Autor: LSX
 * @Date: 2021-10-25 16:52
 * @LastEditTime: 2021-11-24 17:16
 */

import request from '@/utils/request';
//患者基本信息
function getPatInfo(query = {}) {
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
function getAllergy(query = {}) {
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

function getVisit(query = {}) {
  request(
    handleReq({
      url: 'MES0002',
      method: 'post',
      data: query
    })
  ).then(res => {
    timeline_timelineData(res);
  })
}

function getSurgery(query = {}) {
  request(
    handleReq({
      url: 'MES0020',
      method: 'post',
      data: query
    })
  ).then(res => {
    timeline_surgeryData(res);
  })
}

export default function () {
  getPatInfo();
  getAllergy();
  header_userInfo();

  getVisit();
  getSurgery();
}