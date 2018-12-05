import { getSingleCarRealByVins } from '@/api/carCenter'
import { getWebService } from '@/api/alarm'
const carCenter = {
  state: {
    arrSingleAll: [],
    arrSingleFlameout: [],
    arrSingleCharge: [],
    arrSingleTravel: [],
    arrSingleAbnormal: [],
    carVin: "",
    historyCarVin: "",
    alarmVin: '',
    vehicleInformation: []
  },
  mutations: {
    SET_REAL_DATA: (state, data) => {
      state.realData = data
      state.extremeDataSingle = data.extremeData,
        state.chargingDeviceTempDataSingle = data.chargingDeviceTempData,
        state.chargingDeviceTempDataSingleCharge = data.chargingDeviceTempData,
        state.carRealDataVoSingle = data.carRealDataVo
    },
    SET_CARVIN: (state, data) => {
      state.carVin = data
    },
    SET_HISTORYCARVIN: (state, data) => {
      state.historyCarVin = data
    },
    SET_ALARMVIN: (state, data) => {
      state.alarmVin = data;
    },
    STORAGE_INFO: (state, data) => {
      state.vehicleInformation = data
    }
  },

  actions: {
    getSingleCarRealByVins({ commit }, id) {
      return new Promise((resolve, reject) => {
        getSingleCarRealByVins(id).then(response => {
          const data = response.results;
          commit('SET_REAL_DATA', data);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCarVin({ commit }, vin) {
      commit('SET_CARVIN', vin);
    },
    getHistoryCarVin({ commit }, vin) {
      commit('SET_HISTORYCARVIN', vin);
    },
    getAlarmVin({ commit }, vin) {
      commit('SET_ALARMVIN', vin);
    },
    storageVehicleInformation({ commit }, data) {
      commit("STORAGE_INFO", data)
    }
  }
}

export default carCenter