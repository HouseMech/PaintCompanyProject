<template>
  <div>
    <div v-for="user in users" :key="user.id">
      {{ user.email }}, {{ user.role }}, {{ user.is_active }}
      <v-btn small @click="editUser(user)">Edit</v-btn>
    </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-select v-model="editableUser.role" :items="roles" item-value="value" item-text="text" label="Role"
                required></v-select>

              <v-switch v-model="editableUser.is_active"
                :label="editableUser.is_active ? 'Active' : 'Disabled'"></v-switch>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    users: Array
  },
  data() {
    return {
      dialog: false,
      valid: true,
      editableUser: {
        id: null,
        role: '',
        is_active: false,
      },
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      },
      roles: ['default', 'painter', 'admin'],
    }
  },
  methods: {
    ...mapActions({ updateUser: 'admin/updateUser' }), // Assuming 'updateUser' is an action in your Vuex store

    editUser(user) {
      this.editableUser.id = user.id
      this.editableUser.role = user.role
      this.editableUser.is_active = user.is_active
      this.dialog = true
    },
    rolesToNum(role) {
      switch (role) {
        case 'default':
          return 0
        case 'painter':
          return 1
        case 'admin':
          return 2
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.updateUser(
          {
            userId: this.editableUser.id,
            role: this.rolesToNum(this.editableUser.role),
            is_active: this.editableUser.is_active,
          },
        ).then(() => {
          this.dialog = false
        }).catch(error => {
          console.error('Update failed:', error)
        })
      }
    },

    closeDialog() {
      this.dialog = false
    },
  },
}
</script>

<style>
/* Add any additional styles if needed */
</style>
