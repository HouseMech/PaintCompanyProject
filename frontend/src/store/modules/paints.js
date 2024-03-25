import axios from "axios"

const BASE_URL = import.meta.env["VITE_api_url"]

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
  //updates a single entry based on data received from the pusher service
  updateLocalPaintEntry({ getters, commit }, { id, colour, status, stock }) {
    let paintsCopy = getters['paints']
    let foundIndex = paintsCopy.findIndex((elem) => elem.id == id)
    let newPaint = { colour: colour, status: status, stock: stock }
    paintsCopy[foundIndex] = { ...paintsCopy[foundIndex], ...newPaint }
    commit('UPDATE_PAINTS', paintsCopy)
  },
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
      axios.patch(`${BASE_URL}/paints/${id}`, {
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