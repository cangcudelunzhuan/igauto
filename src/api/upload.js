import fetch from '@/utils/fetch'

export function getToken() {
  return fetch({
    url: '/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
