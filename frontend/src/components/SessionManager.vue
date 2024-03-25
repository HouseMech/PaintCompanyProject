<template>
  <div>
    <v-row v-if="formError">
      <v-alert color="error" icon="$error" :text="formError"></v-alert>
    </v-row>
    <v-row>
      <v-col>
        <v-row v-if="formError">
          <v-alert color="error" icon="$error" :text="formError"></v-alert>
        </v-row>
        <v-form v-model="form" @submit.prevent="onLogin">
          <v-text-field v-model="loginEmail" :rules="[rules.required]" label="Email"></v-text-field>

          <v-text-field v-model="loginPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'" :rules="[rules.required]" counter placeholder="Password"
            @click:append="showPassword = !showPassword" clearable></v-text-field>
          <v-btn class="mt-2" type="submit" color="blue-darken-4" :loading="loading" :disabled="!form"
            block>Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      showPassword: false,
      loginEmail: "",
      loginPassword: "",
      formError: "",
      rules: {
        required: value => !!value || 'Field is required',
      },
      form: false,
      loading: false
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
      this.loading = true
      this.loginUser(data).then(() => {
        this.resetData()
      }).catch((error) => {
        console.log(error)
        this.formError = error.response.data
      }).finally(() => {
        this.loading = false
      })

    },
    resetData() {
      this.formError = ''
      this.loginEmail = ''
      this.loginPassword = ''
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