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
  },
  getUserRole() {
    return state.user?.role
  }
}

const actions = {
  loginUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}users/sign_in`, payload).then((response) => {
        commit('SET_USER_INFO', response)
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
        commit('RESET_USER_INFO')
        commit("paints/RESET_STATE", null, {
          root: true
        })
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
        commit('SET_USER_INFO_FROM_TOKEN', response)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

const mutations = {
  SET_USER_INFO(state, payload) {
    state.user = payload.data.user
    state.auth_token = payload.headers.authorization
    axios.defaults.headers.common['Authorization'] = payload.headers.authorization
    localStorage.setItem('auth_token', payload.headers.authorization)
  },
  SET_USER_INFO_FROM_TOKEN(state, payload) {
    state.user = payload.data.user
    state.auth_token = localStorage.getItem('auth_token')
  },
  RESET_USER_INFO(state) {
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