import fetch from '@/utils/fetch'
import Qs from 'qs' //URLSearchParams() 这玩意兼容极差现在改用qs


export function getQueryTrajectoryData(plate, startTime, endTime, type) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('plate', plate);
  // queryParams.append('startTime', startTime);
  // queryParams.append('endTime', endTime)
  let queryParams = Qs.stringify({ 'keyName': plate, 'startTime': startTime, 'endTime': endTime, 'type': type })

  return fetch({
    url: '/carReal/queryTrajectoryData',
    method: 'post',
    data: queryParams
  })
}