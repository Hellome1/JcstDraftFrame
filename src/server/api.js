/*
 * @Description: 后台接口
 * @Autor: LSX
 * @Date: 2021-10-25 16:52
 * @LastEditTime: 2021-11-24 17:16
 */

import request from './utils';
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

export function getVisitAll(query = {}) {
  request(
    handleReq({
      url: 'MES0002',
      method: 'post',
      data: query
    })
  ).then(res => {
    tlSwitch_data(res);
  })
}

function getSurgery(query = { from: 'surgery' }) {
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

export function getVitals(query = {}, cb) {
  request(
    handleReq({
      url: 'MES0014',
      method: 'post',
      data: query
    })
  ).then(res => {
    cb ? cb(res) : vitalsigns_data(res);
  }).catch(e => {
    throw e;
  })
}

export function getMedicalOrder(query = { from: 'medicalOrder' }) {
  request(
    handleReq({
      url: 'MES005',
      method: 'post',
      data: query
    })
  ).then(res => {
    medicalOrder_data(res);
  }).catch(e => {
    throw e;
  })
}

export function getPacs(query = { from: 'pacs' }) {
  request(
    handleReq({
      url: 'MES0012',
      method: 'post',
      data: query
    })
  ).then(res => {
    pacs_data(res);
  }).catch(e => {
    throw e;
  })
}

export function getLis(query = { from: 'lis' }) {
  request(
    handleReq({
      url: 'MES0024',
      method: 'post',
      data: query
    })
  ).then(res => {
    lis_data(res);
  }).catch(e => {
    throw e;
  })
}

export function getLisnorm(query = { from: 'lisnorm' }) {
  request(
    handleReq({
      url: 'MES0024',
      method: 'post',
      data: query
    })
  ).then(res => {
    lis_data(res);
  }).catch(e => {
    throw e;
  })
}

export function getSurgeryDetail(query = { from: 'surgeryDetail' }) {
  request(
    handleReq({
      url: 'MES0021',
      method: 'post',
      data: query
    })
  ).then(res => {
    surgery_data_detail(res);
  })
}

export function getConsult(query = { from: 'consult' }) {
  request(
    handleReq({
      url: 'MES0017',
      method: 'post',
      data: query
    })
  ).then(res => {
    consult_data(res);
  })
}

export function ajax({action, method = 'post', query = {}}) {
  return request(
    handleReq({
      url: action,
      method: method,
      data: query
    })
  );
}

export function getLisNorm() {}
export function getLoop() {}

export default function () {
  getPatInfo();
  getAllergy();
  header_userInfo();

  getVisit({ from: 'timeline' });
  getSurgery();
}