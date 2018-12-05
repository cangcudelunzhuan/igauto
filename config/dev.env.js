var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://10.200.64.3:8080/igauto/"' //开发
  // BASE_API: '"http://10.200.179.177:8089/igauto/"' //杨汇贤
  BASE_API: '"http://igauto.intelligentgeely.com/igauto/igauto"' //生产
  // BASE_API: '"http://api.igauto.test.intelligentgeely.com/igauto/"' //测试
  // BASE_API: '"http://10.200.64.9:8081/igauto/"' //测试

})