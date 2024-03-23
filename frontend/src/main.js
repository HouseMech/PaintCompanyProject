/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Store
import store from './store'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.use(store)

// Retrieve JWT from local storage
let localAuthToken = localStorage.auth_token
let cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null
if (cookieExists) {
  const auth_token = localStorage.getItem('auth_token')
  const authTokenExists = auth_token !== 'undefined' && auth_token !== null
  if (authTokenExists) {
    store.dispatch('loginUserWithToken', { auth_token })
  }
}

registerPlugins(app)

app.mount('#app')
