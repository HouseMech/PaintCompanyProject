<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>Hello, {{ getUserEmail }}</v-app-bar-title>
    <div>Role: {{ getUserRole }}</div>
    <div v-if="getUserRole === 'admin'">
      <v-btn v-if="this.$router.currentRoute.value.name !== 'users'" icon @click="goToUsers">
        <v-icon>mdi-security</v-icon>
      </v-btn>
      <v-btn v-else icon @click="goToDashboard">
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
    </div>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions({ logoutUser: 'sessions/logoutUser' }),
    logout() {
      this.logoutUser()
      this.$router.push({
        path: '/login',
        replace: true
      })
    },
    goToUsers() {
      if (this.getUserRole === 'admin') {
        this.$router.push({
          path: '/users',
          replace: true
        })
      }
    },
    goToDashboard() {
      this.$router.push({
        path: '/',
        replace: true
      })
    }
  },
  computed: {
    ...mapGetters({ getUserEmail: "sessions/getUserEmail", getUserRole: "sessions/getUserRole", isLoggedIn: "sessions/isLoggedIn" }),
  }
}
</script>

<style scoped></style>