import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import realTimeMonitoring from "./modules/realTimeMonitoring"
import  carCenter from './modules/carCenter'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    tagsView,
    realTimeMonitoring,
    carCenter
  },
  getters
})

export default store
