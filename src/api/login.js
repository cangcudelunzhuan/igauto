import fetch from '@/utils/fetch'
import Qs from 'qs' //URLSearchParams() 这玩意兼容极差现在改用qs

export function login(account, password) {
  let data = Qs.stringify({ 'account': account, 'password': password })
  return fetch({
    url: '/system/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  let data = Qs.stringify({ 'userId': token })
  return fetch({
    url: '/system/getUserPrivilegeModular',
    method: 'post',
    data: data
  })
}

export function logout(userId) {
  let data = Qs.stringify({ 'userId': userId })
  return fetch({
    url: '/system/exit',
    method: 'post',
    data: data
  })
}