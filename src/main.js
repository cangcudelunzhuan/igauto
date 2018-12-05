import 'babel-polyfill'
import es6Promise from 'es6-promise'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
// import locale from 'element-ui/lib/locale/lang/en'
import App from './App';
import VueAMap from 'vue-amap';
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import $ from "jquery"
// import Blob from '@/excel/Blob.js'
// import Export2Excel from '@/excel/Export2Excel.js'
es6Promise.polyfill()

//经纬度转化为物理地址
let geocoder = new AMap.Geocoder({
  radius: 1000,
  extensions: "all"
});
Vue.prototype.geocoder = geocoder;

//时间格式转换 "yyyy-MM-dd hh:mm:ss"
Vue.prototype.getTaskTime = (fmt, date) => {
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },

  //md5加密
  Vue.prototype.md5 = (str) => {
    const crypto = require("crypto");
    let obj = crypto.createHash("md5");
    obj.update(str);
    return obj.digest("hex");
  }

Vue.use(ElementUI, { size: "medium" })
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '8c8d08e4eaa0ac902c975c319fba506d',
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
