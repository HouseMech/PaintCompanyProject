import axios from "axios"

const BASE_URL = "http://localhost:3000/"

const getDefaultState = () => {
  return {
    paints: []
  }
}

const state = { ...getDefaultState() }

const getters = {
  paints(state) {
    return state.paints
  }
}

const actions = {
  getPaints({ rootGetters, commit }) {
    new Promise((resolve, reject) => {
      const config = {
        headers: {
          authorization: rootGetters['sessions/getAuthToken']
        }
      }
      axios.get(`${BASE_URL}paints`, config).then((response) => {
        commit('UPDATE_PAINTS', response.data)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  updatePaint({ rootGetters }, { id, stock, status }) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          authorization: rootGetters['sessions/getAuthToken']
        }
      }
      axios.patch(`http://localhost:3000/paints/${id}`, {
        paint: {
          status: status,
          stock: stock
        }
      }, config)
        .then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
    })
  }
}

const mutations = {
  UPDATE_PAINTS(state, new_paints) {
    state.paints = new_paints
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}