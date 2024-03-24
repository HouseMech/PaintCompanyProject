import { createStore } from 'vuex'
import sessions from './modules/sessions.js'
import paints from './modules/paints.js'
import admin from './modules/admin.js'

export default createStore({
  modules: {
    sessions: sessions,
    paints: paints,
    admin: admin
  },
})
