<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>Hello, {{ getUserEmail }}</v-app-bar-title>
    <div>Role: {{ getUserRole }}</div>
    <v-btn v-if="getUserRole === 'admin'" icon @click="goToUsers">
      <v-icon>mdi-security</v-icon>
    </v-btn>
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
    }
  },
  computed: {
    ...mapGetters({ getUserEmail: "sessions/getUserEmail", getUserRole: "sessions/getUserRole", isLoggedIn: "sessions/isLoggedIn" }),
  }
}
</script>

<style scoped></style>