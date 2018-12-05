import fetch from '@/utils/fetch'
import Qs from 'qs' //URLSearchParams() 这玩意兼容极差现在改用qs


export function getRealAlarmData(data) {
  return fetch({
    url: '/alarm/getAlarmInfoList',
    method: 'post',
    data: data
  })
}
//报警结果详情展示接口
export function getRealAlarmDetailData(alarmCode) {
  let data = Qs.stringify({ 'alarmCode': alarmCode })
  // let queryParams = new URLSearchParams();
  // queryParams.append('alarmCode', alarmCode);
  return fetch({
    url: '/alarm/getAlarmHisDetail',
    method: 'post',
    data: data
  })
}
//短信推送接口
export function getAlarmMsgData(data, type) {
  var params = {
    'alarmCode': data.alarmCode,
    'phone': data.tel,
    'alarmLevel': data.alarmLevel,
    'startTime': data.startTime,
    'alarmData': data.alarmName,
    'plate': data.plate,
    'carId': data.carId,
    'vin': data.vin,
    'msgType': type,
  }
  return fetch({
    url: '/alarm/pushMsgToBelonger',
    method: 'post',
    data: params
  })
}
//统计报警级别数据接口
export function getAlarmTotalData(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('alarmStatus', data.alarmStatus);
  // queryParams.append('userId', data.userId);
  let queryParams = Qs.stringify(data)
  return fetch({
    url: '/alarm/getAlarmInfoStatistis',
    method: 'post',
    data: queryParams
  })
}
//报警处理接口
export function getHandleAlarmData(data) {

  return fetch({
    url: '/alarm/alarmHandles',
    method: 'post',
    data: data
  })
}

//历史报警
export function getAlarmHisInfoList(data) {
  return fetch({
    url: '/alarm/getAlarmHisInfoList',
    method: 'post',
    data: data
  })
}
//获取服务网点信息
export function getWebService(data) {
    let queryParams = Qs.stringify(data)
  return fetch({
    url: '/serverStation/getServerStationByReferencePoint',
    method: 'post',
      data: queryParams
  })
}
//获取指定范围的服务网店信息
export function getRangeService(companyName) {

    let queryParams = Qs.stringify({ 'companyName':companyName})
    return fetch({
        url: '/serverStation/getServerStationByPage',
        method: 'post',
        data: queryParams
    })
}

//统计
export function getAlarmStatistics(data) {
  return fetch({
    url: '/alarm/getStatistics',
    method: 'post',
    data: data
  })
}

//车辆统计
export function getCarTypeCount(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('ascription', data.ascription);
  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/carInfo/CarTypeCount',
    method: 'post',
    data: queryParams
  })
}

//充电情况查询
export function getQueryChargingHistory(data) {
  return fetch({
    url: '/carReal/queryChargingHistory',
    method: 'post',
    data: data
  })
}

//充电详情查询
export function getQueryChargingDetail(data) {
  return fetch({
    url: '/carReal/queryChargingDetail',
    method: 'post',
    data: data
  })
}

//归属列表
export function getBelongerList() {
  return fetch({
    url: '/alarm/getBelongerList',
    method: 'post',
  })
}