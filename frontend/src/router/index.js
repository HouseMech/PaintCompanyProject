import { createMemoryHistory, createRouter } from 'vue-router'
import store from '../store'

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'

const routes = [
  {
    path: '/',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    component: UserView,
    meta: { requiresAdmin: true, requiresAuth: true }
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
  const requiresAdmin = to.matched.some((x) => x.meta.requiresAdmin)
  const isLoggedIn = store.getters['sessions/isLoggedIn']
  const userRole = store.getters['sessions/getUserRole']
  if (requiresAuth && !isLoggedIn) {
    next('/login')
    return
  }

  if (requiresAdmin && userRole !== 'admin') {
    next('/')
    return;
  }
  next()
})

export default router