<template>
  <v-data-table :headers="headers" :items="paints">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>PAINTS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit - {{ editedItem.colour }}</span>
            </v-card-title>
            <v-form validate-on="submit lazy" @submit.prevent="save">
              <v-card-text>
                <v-container>
                  <v-row v-if="formError">
                    <v-alert color="error" icon="$error" :text="formError"></v-alert>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6" sm="6">
                      <v-select v-model="editedItem.status" :items="items" label="Select Status">
                        <template v-slot:selection="{ item }">
                          <StatusChip :status="item.title" />
                        </template>
                        <template v-slot:item="{ props, item }">
                          <v-list-item v-bind="props" title="">
                            <StatusChip :status="item.title" />
                          </v-list-item>
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="editedItem.stock" label="Stock"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" type="submit">
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ value }">
      <StatusChip :status="value" />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import StatusChip from './StatusChip.vue'

export default {
  props: {
    paints: Array
  },
  data() {
    return {
      dialog: false,
      editedItem: {
        status: '',
        stock: ''
      },
      editedIndex: -1,
      defaultItem: {
        status: '',
        stock: ''
      },
      headers: [
        { title: 'Colour', key: 'colour' },
        { title: 'Status', key: 'status', sortable: false },
        { title: 'Stock', key: 'stock' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      items: ['out of stock', 'running low', 'available'],
      formError: ''
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    updateStatusSelection(status) {
      this.editedItem.status = status
    },
    getColourForStatus(status) {
      switch (status) {
        case 'running low':
          return 'yellow'
        case 'available':
          return 'green'
        case 'out of stock':
          return 'red'
        default:
          return 'purple'
      }
    },
    close() {
      this.dialog = false
      this.formError = ''
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      this.$store.dispatch('paints/updatePaint', { id: this.editedIndex, status: this.editedItem.status, stock: this.editedItem.stock, }).then((result) => {
        if (result.status === 200) {
          //close the modal, update the dashboard.
          this.close()
        }
      }).catch((error) => {
        this.formError = "Something went wrong"
        console.log(error)
      })
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  }
}
</script>

<style scoped></style>