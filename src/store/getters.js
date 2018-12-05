const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  result: state => state.user.result,
  userId: state => state.user.userId,

  arrAll: state => state.realTimeMonitoring.arrAll,
  arrFlameout: state => state.realTimeMonitoring.arrFlameout,
  arrChargeFlameout: state => state.realTimeMonitoring.arrChargeFlameout,
  arrChargeTravel: state => state.realTimeMonitoring.arrChargeTravel,
  arrTravel: state => state.realTimeMonitoring.arrTravel,
  arrAbnormal: state => state.realTimeMonitoring.arrAbnormal,
  arrFaultTravel: state => state.realTimeMonitoring.arrFaultTravel,
  arrFaultFlameout: state => state.realTimeMonitoring.arrFaultFlameout,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  realData: state => state.carCenter.realData,
  carVin: state => state.carCenter.carVin,
  historyCarVin: state => state.carCenter.historyCarVin,
  alarmVin: state => state.carCenter.alarmVin,
  vehicleInformation: state => state.carCenter.vehicleInformation
}
export default getters