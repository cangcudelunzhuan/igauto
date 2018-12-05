import fetch from '@/utils/fetch'
import Qs from 'qs' //URLSearchParams() 这玩意兼容极差现在改用qs

//车辆档案
export function carDataList(vins, plate, startTime, endTime, carTypeName, carStatus, limit, page, userId) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('vin', vins);
  // queryParams.append('plate', plate);
  // queryParams.append('startTime', startTime);
  // queryParams.append('endTime', endTime);
  // queryParams.append('carTypeName', carTypeName);
  // queryParams.append('carStatus', carStatus);
  // queryParams.append('pageSize', limit);
  // queryParams.append('pageIndex', page);
  // queryParams.append('userId', userId);
  let queryParams = Qs.stringify({ 'vin': vins, 'plate': plate, 'startTime': startTime, 'endTime': endTime, 'carTypeName': carTypeName, 'carStatus': carStatus, 'pageSize': limit, 'pageIndex': page, 'userId': userId })
  return fetch({
    url: 'carInfo/carDataList',
    method: 'post',
    data: queryParams
  })

}
//编辑
export function editCarDataList(carId) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('carId', carId);
  let queryParams = Qs.stringify({ 'carId': carId })
  return fetch({
    url: 'carInfo/getCarEditData',
    method: 'post',
    data: queryParams
  })

}

export function addCar(data) {

  return fetch({
    url: '/carInfo/insert',
    method: 'post',
    data: data
  })
}

export function editCar(data) {

  return fetch({
    url: '/carInfo/edit',
    method: 'post',
    data: data
  })
}

///carReal/querySingleCarRealByVins獲取單車的所有信息
export function getSingleCarReal() {
  return fetch({
    url: '/carReal/querySingleCarRealByVins',
    method: 'post'
  })
}
///car/carDetail車輛詳情
export function getCarDetail(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('vin', data.vin);
  let queryParams = Qs.stringify(data)
  return fetch({
    url: '/carInfo/carDetail',
    method: 'post',
    data: queryParams
  })
}
///carReal/querySingleCarRealByVins單車詳情數據

export function getSingleCarRealByVins(type,vin) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('vin', vins);
  var queryParams = Qs.stringify({ 'vin': vin });
  if(type==0){
    queryParams = Qs.stringify({ 'value': vin,'type':type })
  }
  return fetch({
    url: '/carReal/querySingleCarRealByVins', // 假地址 自行替换
    method: 'post',
    data: queryParams
  })
}
//歷史查詢
///carInfo/queryStandardHistory
export function getHistoryData(vinData, startTime, endTime, limit, offset) {
  // var param = new URLSearchParams();
  // param.append('vin', vinData)
  // param.append('startTime', startTime)
  // param.append('endTime', endTime)
  // param.append('pageSize', limit)
  // param.append('pageIndex', offset)
  let queryParams = Qs.stringify({ 'plateOrVinValue': vinData, 'startTime': startTime, 'endTime': endTime, 'pageSize': limit, 'pageIndex': offset })
  return fetch({
    url: '/carReal/queryStandardHistory', // 假地址 自行替换
    method: 'post',
    data: queryParams
  })
}
//获取国标基本信息
export function getBaseStandardDetail() {
  return fetch({
    url: '/carReal/queryStandardField', // 假地址 自行替换
    method: 'post',
  })
}
//國標信息
///carInfo/queryStandardDetail
export function getStandardDetail(vin, activeCarName) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('vin', vin);
  // queryParams.append('standardType', activeCarName);

  let queryParams = Qs.stringify({ 'vin': vin, 'standardType': activeCarName })

  return fetch({
    url: '/carReal/queryStandardDetail',
    method: 'post',
    data: queryParams
  })
}
//carTypeList获取车型
export function getcarTypeList() {
  return fetch({
    url: '/carInfo/carTypeList',
    method: 'post',
  })
}

//下载车型模板
export function ExportExcel(data) {
  return fetch({
    url: '/excelTemplate/exportExcel',
    method: 'get',
    params: data
  })
}

//上传车型
export function excelUpload(data) {
  return fetch({
    url: '/carInfo/excelUpload',
    method: 'post',
    data: data
  })

}

//上传车辆
export function excelCarBaseUpload(data) {
  return fetch({
    url: '/carInfo/excelCarBaseUpload',
    method: 'post',
    data: data
  })

}


//再次导入时清除数据
export function clearCarImportDataByUserId(data) {
  let queryParams = Qs.stringify({ 'userId': data.userId })
  return fetch({
    url: '/carInfo/clearCarImportDataByUserId',
    method: 'post',
    data: queryParams
  })
}