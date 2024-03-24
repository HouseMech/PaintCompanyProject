<template>
  <div>
    <div v-if="isLoggedIn">
      <v-btn @click="logoutUser">Logout</v-btn>
      <div>{{ this.getUserID }}</div>
      <div>{{ this.getUserEmail }}</div>
      <div>{{ this.getAuthToken }}</div>
    </div>
    <div v-else>
      <v-form @submit.prevent="onLogin">
        <v-text-field v-model="loginEmail" label="Email"></v-text-field>

        <v-text-field v-model="loginPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'" counter placeholder="Password"
          @click:append="showPassword = !showPassword"></v-text-field>
        <v-btn class="mt-2" type="submit" color="blue-darken-4" block>Submit</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      showPassword: false,
      loginEmail: "",
      loginPassword: ""
    }
  },
  computed: {
    ...mapGetters({ getAuthToken: "sessions/getAuthToken", getUserEmail: "sessions/getUserEmail", getUserID: "sessions/getUserID", isLoggedIn: "sessions/isLoggedIn" }),
  },
  methods: {
    ...mapActions({ loginUser: 'sessions/loginUser', logoutUser: 'sessions/logoutUser' }),
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
  },
  watch: {
    isLoggedIn(isTrue) {
      if (isTrue) {
        this.$router.push({
          path: '/',
          replace: true
        })
      }
    }
  }
}
</script>

<style scoped></style>