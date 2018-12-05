export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 车牌 */
export function validatePlate(str) {
  const reg = /^[\u4e00-\u9fa5|WJ]{1}[A-Za-z0-9]{6,7}$/;
  return reg.test(str)
}

/* 手机号 */
export function validatePhone(str) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  return reg.test(str)
}

/* 邮箱 */
export function validateEmail(str) {
  const reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/
  return reg.test(str)
}
export function  getData(val){
    if(val&&val!==-1){
      if(val===65534 ||val===65535||val===254 ||val===254){
        return '-'
      }
        return val
    }else if(val===''){
        return '-'
    } else if(val==0) {
        return 0
    }
    return '-'
}