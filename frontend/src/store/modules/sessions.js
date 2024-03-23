import axios from "axios"

const BASE_URL = "http://localhost:3000/"

const getDefaultState = () => {
  return {
    auth_token: null,
    user: {
      id: null,
      username: null,
      email: null,
    },
  }
}

const state = { ...getDefaultState() }

const getters = {
  getAuthToken(state) {
    return state.auth_token
  },
  getUserEmail(state) {
    return state.user?.email
  },
  getUserID(state) {
    return state.user?.id
  },
  isLoggedIn(state) {
    const loggedOut = state.auth_token == null || state.auth_token == JSON.stringify(null)
    return !loggedOut
  }
}

const actions = {
  loginUser({ commit }, payload) {
    new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}users/sign_in`, payload).then((response) => {
        commit('setUserInfo', response)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  logoutUser({ commit }) {
    const config = {
      headers: {
        authorization: state.auth_token
      }
    }
    new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL}users/sign_out`, config).then(() => {
        commit('resetUserInfo')
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  loginUserWithToken({ commit }, payload) {
    const config = {
      headers: {
        authorization: payload.auth_token
      }
    }
    new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}user-data`, config).then((response) => {
        commit('setUserInfoFromToken', response)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

const mutations = {
  setUserInfo(state, payload) {
    state.user = payload.data.user
    state.auth_token = payload.headers.authorization
    axios.defaults.headers.common['Authorization'] = payload.headers.authorization
    localStorage.setItem('auth_token', payload.headers.authorization)
  },
  setUserInfoFromToken(state, payload) {
    state.user = payload.data.user
    state.auth_token = localStorage.getItem('auth_token')
  },
  resetUserInfo(state) {
    Object.assign(state, getDefaultState())
    axios.defaults.headers.common['Authorization'] = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}