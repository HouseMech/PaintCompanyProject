import { createMemoryHistory, createRouter } from 'vue-router'
import store from '../store'

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginView
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  const isLoggedIn = store.getters['isLoggedIn']
  if (requiresAuth) {
    if (isLoggedIn) {
      next()
      return
    }
    next('/login')
  }
  else {
    next()
  }
})

export default router