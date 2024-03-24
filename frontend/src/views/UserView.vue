<template>
  <UsersTable :users="users" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions({ getUsers: 'admin/getUsers' }),
  },
  computed: {
    ...mapGetters({ users: 'admin/users' }),
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped></style>