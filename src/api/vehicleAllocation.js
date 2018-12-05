import fetch from '@/utils/fetch'
import Qs from 'qs' //URLSearchParams() 这玩意兼容极差现在改用qs

//根据用户ID获取用户组织列表
export function getCarOrganizationUserList(data) {
  let queryParams = Qs.stringify(data)

  // let queryParams = new URLSearchParams();
  // queryParams.append('userId', data.userId);
  return fetch({
    url: '/system/getCarOrganizationUserList',
    method: 'post',
    data: queryParams
  })
}

//车辆调拨接口
export function carAllot(data) {
  return fetch({
    url: '/carInfo/carAllot',
    method: 'post',
    data: data
  })
}