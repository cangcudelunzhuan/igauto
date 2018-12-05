import { getQueryPlateOrVin, getQueryCarRealByVins } from '@/api/realTimeMonitoring'

const realTimeMonitoring = {
  state: {
    arrAll: [],
    arrFlameout: [],
    arrChargeFlameout: [],
    arrChargeTravel: [],
    arrTravel: [],
    arrAbnormal: [],
    arrFaultTravel: [],
    arrFaultFlameout: []
  },
  mutations: {
    SET_LNGLAT: (state, data) => {
      console.log(data)
    },
    SET_ARR: (state, data) => {
      state.arrAll = data.arrAll;
      state.arrFlameout = data.arrFlameout
      state.arrChargeFlameout = data.arrChargeFlameout
      state.arrChargeTravel = data.arrChargeTravel
      state.arrTravel = data.arrTravel
      state.arrAbnormal = data.arrAbnormal
      state.arrFaultTravel = data.arrFaultTravel
      state.arrFaultFlameout = data.arrFaultFlameout
    }
  },
  actions: {
    GetParams({ commit }, data) {
      commit("SET_LNGLAT", data)
    },
    GetArr({ commit }, data) {
      // console.log(data,12)
      commit("SET_ARR", data)
    }
  }
}
export default realTimeMonitoring