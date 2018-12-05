import fetch from '@/utils/fetch'
import Qs from 'qs' //URLSearchParams() 这玩意兼容极差现在改用qs


//poi
export function getServerStationByPage(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('id', data.id);

  //分割线-----------------------
  // queryParams.append('companyName', data.companyName);
  // queryParams.append('linkPhone', data.linkPhone);
  // queryParams.append('pageIndex', data.page);
  // queryParams.append('pageSize', data.limitNum);

  //分割线-----------------------

  // queryParams.append('page', data.page);

  //分割线-----------------------

  // queryParams.append('stationType', data.stationType);
  let queryParams = Qs.stringify({ 'companyName': data.companyName, 'pageIndex': data.page, 'pageSize': data.limitNum, 'stationType': data.stationType })
  return fetch({
    url: '/serverStation/getServerStationByPage',
    method: 'post',
    data: queryParams
  })
}

//机构管理注册
export function registerEnterpriseUser(data) {
  return fetch({
    url: '/system/enterprise/register',
    method: 'post',
    data: data
  })
}

//机构管理编辑&删除
export function updateEnterpriseUser(data) {
  return fetch({
    url: '/system/enterprise/update',
    method: 'post',
    data: data
  })
}

//机构管理查询
export function getEnterpriseByPage(data) {
  return fetch({
    url: '/system/enterprise/getEnterpriseByPage',
    method: 'post',
    data: data
  })
}


//获取省份市区
export function getRegion() {
  return fetch({
    url: '/system/enterprise/getRegion',
    method: 'post'
  })
}



//用来回显城市
export function getRegionByCode(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('regionCode', data.id);
  let queryParams = Qs.stringify({ 'regionCode': data.id })
  return fetch({
    url: '/system/enterprise/getRegionByCode',
    method: 'post',
    data: queryParams
  })
}

//部门管理新增
export function addOrganization(data) {
  return fetch({
    url: '/system/addOrganization',
    method: 'post',
    data: data
  })
}

//部门管理编辑
export function updateOrganization(data) {
  return fetch({
    url: '/system/updateOrganization',
    method: 'post',
    data: data
  })
}

//部门管理删除
export function deleteOrganization(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('id', data.id);
  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/system/deleteOrganization',
    method: 'post',
    data: queryParams
  })
}

//部门管理列表
export function getOrganizationList(data) {
  return fetch({
    url: '/system/getOrganizationList',
    method: 'post',
    data: data
  })
}

//部门管理新增获取机构类型
export function getOrganizationByUserId(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('userId', data.userId);
  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/system/getOrganizationByUserId',
    method: 'post',
    data: queryParams
  })
}

//账号管理新增
export function subUserRegisterAndModify(data) {
  return fetch({
    url: '/system/subUserRegisterAndModify',
    method: 'post',
    data: data
  })
}

//账号管理更新
export function update(data) {
  return fetch({
    url: '/system/account/update',
    method: 'post',
    data: data
  })
}

//账号管理启停用
export function stopUsed(data) {
  return fetch({
    url: '/system/account/stopUsed',
    method: 'post',
    data: data
  })
}

//账号管理列表查询
export function getAccountByPage(data) {
  return fetch({
    url: '/system/account/getAccountByPage',
    method: 'post',
    data: data
  })
}

//账号管理归属列表
export function getOrganizationNameListByUserId(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('userId', data.userId);
  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/system/getOrganizationNameListByUserId',
    method: 'post',
    data: queryParams
  })
}

//账号管理角色列表
export function selectOrganizationRoleMap(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('organizationId', data.organizationId);
  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/system/selectOrganizationRoleMap',
    method: 'post',
    data: queryParams
  })
}

//账号管理角色联想搜索接口
export function getRoleByKeyName(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('keyName', data.keyName);
  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/system/account/getRoleByKeyName',
    method: 'post',
    data: queryParams
  })
}

//账号管理归属联想搜索接口
export function getOrganizationByKeyName(data) {
  // let queryParams = new URLSearchParams();
  // queryParams.append('keyName', data.keyName);
  let queryParams = Qs.stringify(data)

  return fetch({
    url: '/system//account/getOrganizationByKeyName',
    method: 'post',
    data: queryParams
  })
}


//密码修改
export function updatePassword(data) {
  let queryParams = Qs.stringify(data)
  return fetch({
    url: '/system/updatePassword',
    method: 'post',
    data: queryParams
  })
}