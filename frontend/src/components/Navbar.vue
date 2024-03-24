<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>Hello, {{ getUserEmail }}</v-app-bar-title>
    <div>Current Role: {{ getUserRole }}</div>
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
  },
  computed: {
    ...mapGetters({ getUserEmail: "sessions/getUserEmail", getUserRole: "sessions/getUserRole", isLoggedIn: "sessions/isLoggedIn" }),
  }
}
</script>

<style scoped></style>