import { createStore } from 'vuex'
import sessions from './modules/sessions.js'
import paints from './modules/paints.js'

export default createStore({
  modules: {
    sessions: sessions,
    paints: paints
  },
})
