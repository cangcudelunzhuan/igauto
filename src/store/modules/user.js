import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, setUserName, getUserName, removeUserName } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userId: "",
    id: "",
    result: ""
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER: (state, userId) => {
      state.userId = userId
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_RESULT: (state, result) => {
      state.result = result
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.results
          setToken(data.token)
          setUserId(data.userId)
          setUserName(data.name)
          commit('SET_TOKEN', data.token)
          commit('SET_USER', data.userId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        //state.token,state.username
        let userId = state.userId || getUserId()
        getInfo(userId).then(response => {
          const data = response.results
          let id = [],
            value = []
          if (data) {
            for (let i = 0, len = data.length; i < len; i++) {
              if (data[i]) {
                id.push(data[i].id)
                value.push(data[i].result)
              }
            }
          }

          commit('SET_ID', id)
          commit('SET_RESULT', value)
          // commit('SET_ROLES', data.role)
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          resolve(value)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }, userId) {
      return new Promise((resolve, reject) => {
        if (!userId) {
          userId = getUserId()
        }
        logout(userId).then(res => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_RESULT', '')
          removeToken()
          removeUserId()
          removeUserName()
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_RESULT', '')
        removeToken()
        removeUserId()
        removeUserName()
        resolve()
      })
    }
  }
}

export default user