<template>
  <div class="d-flex align-center flex-column">
    <v-data-table :headers="headers" :items="users">
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editUser(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-if="formError">
              <v-col>
                <v-alert color="error" icon="$error" :text="formError"></v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-select v-model="editableUser.role" :items="roles" item-value="value" item-text="text" label="Role"
                    required></v-select>

                  <v-switch v-model="editableUser.is_active"
                    :label="editableUser.is_active ? 'Active' : 'Disabled'"></v-switch>
                </v-form>
              </v-col>
            </v-row>
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
      headers: [
        { title: 'Email', align: 'start', key: 'email' },
        { title: 'Role', align: 'end', key: 'role' },
        { title: 'Active', align: 'end', key: 'is_active' },
        { title: 'Actions', align: 'end', key: 'actions' }
      ],
      formError: ''
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
          this.closeDialog()
        }).catch((error) => {
          this.formError = "Error " + JSON.stringify(error.message || error.response.data)
        })
      }
    },

    closeDialog() {
      this.formError = ''
      this.dialog = false
    },
  },
}
</script>

<style>
/* Add any additional styles if needed */
</style>
