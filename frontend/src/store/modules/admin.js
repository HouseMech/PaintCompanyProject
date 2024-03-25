import axios from "axios"

const BASE_URL = import.meta.env["VITE_api_url"]

const getDefaultState = () => {
  return {
    users: []
  }
}

const state = { ...getDefaultState() }

const getters = {
  users(state) {
    return state.users
  }
}

const actions = {
  getUsers({ rootGetters, commit }) {
    new Promise((resolve, reject) => {
      const config = {
        headers: {
          authorization: rootGetters['sessions/getAuthToken']
        }
      }
      axios.get(`${BASE_URL}admin/users/`, config).then((response) => {
        commit('UPDATE_USERS', response.data)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  updateUser({ commit, rootGetters }, { userId, role, is_active }) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          authorization: rootGetters['sessions/getAuthToken']
        }
      }
      axios.patch(`${BASE_URL}admin/users/${userId}`, { role: role, is_active: is_active }, config).then(response => {
        //commit('UPDATE_USER', response.data);
        resolve(response)
      }).catch(error => {
        reject(error)
      });
    })
  },
}

const mutations = {
  UPDATE_USERS(state, users) {
    state.users = users;
  },
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}