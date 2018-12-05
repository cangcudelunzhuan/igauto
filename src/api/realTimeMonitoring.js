import fetch from '@/utils/fetch'
import Qs from 'qs'

export function getQueryPlateOrVin(type, keyName) {

  let queryParams = Qs.stringify({ 'type': type, "keyName": keyName })

  return fetch({
    url: '/home/queryPlateOrVin',
    method: 'post',
    data: queryParams
  })
}

export function getQueryCarRealByVins(vin, userId) {

  let queryParams = Qs.stringify({ 'vins': vin || "all", "userId": userId })

  return fetch({
    url: '/home/queryCarRealByVins',
    method: 'post',
    data: queryParams
  })
}

export function getQueryCarRealByPlateOrVin(type, keyName) {

  let queryParams = Qs.stringify({ 'type': type, "keyName": keyName })

  return fetch({
    url: '/home/queryCarRealByPlateOrVin',
    method: 'post',
    data: queryParams
  })
}

/**
 * 实时监控--批量查询
 *
 * @param vin
 * @param userId
 */
export function queryTidyCarRealByPoints(queryParams) {
  return fetch('/home/queryTidyCarRealByPoints', {
    method: 'post',
    data: queryParams
  })
}

/**
 * 根据VIN 查询车辆详情
 *
 * @param queryParams
 *
 */
export function queryCarDetailByVin(queryParams) {
  return fetch('/home/queryCarDetailByVin', {
    method: 'post',
    data: Qs.stringify(queryParams)
  })
}

//数据分析
export function getStatisticsByBelonger(data) {

  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/carInfo/querySyntheticalStatisticsByBelonger',
    method: 'post',
    data: queryParams
  })
}

//数据分析车辆统计
export function getStatisticByUserId(data) {

  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/carInfo/queryCarStatusStatisticByUserId',
    method: 'post',
    data: queryParams
  })
}

//实时报警
export function queryTidyCarRealByVin(vin) {

  let queryParams = Qs.stringify({ vin: vin })

  return fetch({
    url: '/home/queryTidyCarRealByVin',
    method: 'post',
    data: queryParams
  })
}

//根据用户账号查询用户列表接口

export function getUserList(userId, name) {
  let queryParams = Qs.stringify({ userId, name })

  return fetch({
    url: '/system/getUserList',
    method: 'post',
    data: queryParams
  })
}


//根据输入内容联想查询车牌或者vin(随机10条)

export function getQueryPlateOrVinNoType(keyName) {

  let queryParams = Qs.stringify({ keyName })

  return fetch({
    url: '/home/queryPlateOrVinNoType',
    method: 'post',
    data: queryParams
  })
}


//根据用户ID与车辆状态车型查询用户以及用户拥有车辆数量接口(一级)

export function getUserAndCarNumList(data) {

  return fetch({
    url: '/carInfo/getUserAndCarNumList',
    method: 'post',
    data: data
  })
}

//根据用户ID与车辆状态车型查询用户以及用户拥有车辆数量接口(二级)
export function getUserAndAllCarInfoByConditions(data) {

  return fetch({
    url: '/carInfo/getCarInfoListByUserIdAndCarStatus',
    method: 'post',
    data: data
  })
}


//查询车型列表接口
export function getCarTypeList() {

  return fetch({
    url: '/carInfo/carTypeList',
    method: 'post',
  })
}



//根据VIN或者车牌查询车辆VIN或者车牌
export function carInfoQueryCarRealByPlateOrVin(keyName) {

  let queryParams = Qs.stringify({ keyName })

  return fetch({
    url: '/carInfo/queryCarRealByPlateOrVin',
    method: 'post',
    data: queryParams
  })
}