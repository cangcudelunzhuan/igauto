import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  //无权限时返回
  {
    path: '',
    component: Layout,
    redirect: '/dataAnalysis/dataAnalysis',
    icon: "shebeizhongxin",
    name: 'index',
    hidden: true,
    noDropdown: true,
    children: [
      // { path: 'homePage', name: '首页', component: _import('dashboard/index'), meta: { role: ['index'] } },
      { path: 'dataAnalysis/dataAnalysis', name: '数据分析', component: _import('dataAnalysis/index'), meta: { role: ['index'] } }

    ]
  }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  //监控中心
  {
    path: '',
    component: Layout,
    // redirect: '/dataAnalysis/dataAnalysis',
    redirect: 'noredirect',
    hidden: false,
    icon: "jiankongzhongxin",
    name: "监控中心",
    meta: { role: ['监控中心'] },
    children: [
      { path: 'control', name: '实时监控', component: _import('carsCenter/carControl'), meta: { role: ['实时监控'], alias: "carControl" } },
      { path: 'dataAnalysis/dataAnalysis', name: '数据分析', component: _import('dataAnalysis/index'), meta: { role: ['数据分析'] } }
    ]
  },
  //车辆中心的显示的地址
  {
    path: '/carsCenter',
    component: Layout,
    redirect: 'noredirect',
    icon: "cheliangzhongxin",
    name: '车辆中心',
    meta: { role: ['车辆中心'] },
    children: [
      { path: 'carFiles', name: '车辆档案', component: _import('carsCenter/carFiles'), meta: { role: ['车辆档案'], alias: "car-files" } },
      { path: 'vehicleAllocation', name: '车辆调拨', component: _import('carsCenter/vehicleAllocation'), hidden: true },
      { path: 'trajectory', name: '轨迹查询', component: _import('trajectory/index'), hidden: true, meta: { alias: "trajectory" } },
      { path: 'history', name: '历史查询', component: _import('carsCenter/historyQuery'), meta: { role: ['历史查询'], alias: "history-query" }, },
      { path: 'task', name: '任务管理', component: _import('carsCenter/taskManagement'), hidden: true, meta: { alias: "task-management" } },
      { path: 'fence', name: '电子围栏', component: _import('carsCenter/electronicFence'), hidden: true },
      { path: 'qcManagement', name: '质检管理', component: _import('carsCenter/qcManagement'), hidden: true },
      { path: 'controlCar', name: '单车监控', hidden: true, component: _import('carsCenter/controlCar'), meta: { alias: "control-car" } },
      { path: 'addCars', hidden: true, component: _import('carsCenter/addCars') },
      { path: 'nationAnalysis', hidden: true, component: _import('carsCenter/nationAnalysis') },
      //National
    ]
  },
  //车辆中心隐藏的页面
  {
    path: '/device',
    component: Layout,
    redirect: 'noredirect',
    icon: "shebeizhongxin",
    name: '设备中心',
    hidden: true,
    children: [
      { path: 'index', name: 'T-Box管理', component: _import('device/deviceManagement') }
    ]
  },
  //数据中心
  {
    path: '/dataCenter',
    component: Layout,
    redirect: 'noredirect',
    icon: "shebeizhongxin",
    name: '数据中心',
    // hidden: true,
    meta: { role: ['数据中心'] },
    children: [
      { path: 'policeStatistics', name: '数据统计', component: _import('dataCenter/policeStatistics'), meta: { role: ['数据统计'], alias: "policeStatistics" } },
      { path: 'carStatistics', name: '车辆统计', component: _import('dataCenter/carStatistics'), meta: { role: ['车辆统计'] } },
      { path: 'chargingStatus', name: '充电情况', component: _import('dataCenter/chargingStatus'), meta: { role: ['充电情况'], alias: "charging-status" } }

    ]
  },
  //risk风险控制
  {
    path: '/risk',
    component: Layout,
    redirect: 'noredirect',
    name: '风险控制',
    icon: "fengxiankongzhi",
    meta: { role: ['风险控制'] },
    children: [
      { path: 'realAlerm', name: '实时报警', component: _import('risk/realAlerm'), meta: { role: ['实时报警'], alias: "real-alarm" }, },
      { path: 'historyAlerm', name: '历史报警', component: _import('risk/historyAlerm'), meta: { role: ['历史报警'], alias: "history-alerm" }, },
      { path: 'eventRemind', name: '事件提醒', component: _import('risk/eventRemind'), hidden: true },
      //Privilege
    ]
  },
  {
    path: '/manageCenter',
    component: Layout,
    redirect: 'noredirect',
    icon: "guanlizhongxin",
    name: '管理中心',
    meta: { role: ['管理中心'] },
    children: [
      { path: 'mechanism', name: '机构管理', component: _import('management/mechanismManage'), meta: { role: ['机构管理'], alias: 'mechanism-manage' } },
      { path: 'vehicleManagement', name: '车辆管理', component: _import('management/vehicleManagement'), hidden: true, meta: { alias: "vehicle-management" } },
      { path: 'divisional', name: '部门管理', component: _import('management/divisionalManagement'), meta: { role: ['部门管理'], alias: "divisional-management" } },
      { path: 'department', name: '服务站信息', component: _import('management/poi'), meta: { role: ['POI服务'], alias: "poi" }, },
      { path: 'role', name: '账号管理', component: _import('management/roleManage'), meta: { role: ['账号管理'], alias: "role-manage" } },
      { path: 'privilege', name: '权限管理', component: _import('management/privilegeManage'), hidden: true },
      //Privilege
    ]
  },


  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    hidden: true,
    children: [
      { path: 'index', name: 'Form', component: _import('page/form') },
      { path: 'upload', name: 'upload', component: _import('upload') }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: 'noredirect',
    name: 'tt',
    hidden: true,
    noDropdown: false,
    children: [{ path: 'index', name: 'Table', component: _import('table/index'), meta: { role: ['admin'] } }]
  },

  { path: '*', redirect: '/404', hidden: true }
]