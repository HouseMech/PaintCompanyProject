<template>
  <div>
    <div v-if="isLoggedIn">
      <v-btn @click="logoutUser">Logout</v-btn>
      <div>{{ this.getUserID }}</div>
      <div>{{ this.getUserEmail }}</div>
      <div>{{ this.getAuthToken }}</div>
    </div>
    <div v-else>
      <form @submit="onLogin" class="login-form">
        <input class="login-form-email" type="text" v-model="loginEmail" placeholder="Email" />
        <br />
        <input class="login-form-password" type="password" v-model="loginPassword" placeholder="Password" />
        <br />
        <input type="submit" value="Login" class="login-form-submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      loginEmail: "",
      loginPassword: ""
    }
  },
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
  methods: {
    ...mapActions(['loginUser', 'logoutUser']),
    onLogin(event) {
      event.preventDefault()
      let data = {
        user: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      }
      this.loginUser(data)
      this.resetData()
    },
    resetData() {
      this.loginEmail = ""
      this.loginPassword = ""
    },
  }
}
</script>

<style scoped></style>