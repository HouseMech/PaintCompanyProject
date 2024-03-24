<template>
  <v-app>
    <v-main>
      <Navbar v-if="this.$store.getters['sessions/isLoggedIn']" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
</script>
