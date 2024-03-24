<template>
  <v-chip :color="getColourForStatus(status)">
    {{ status }}
  </v-chip>
</template>

<script>
export default {
  props: {
    status: String
  },
  methods: {
    getColourForStatus() {
      switch (this.status) {
        case 'running low':
          return 'yellow'
        case 'available':
          return 'green'
        case 'out of stock':
          return 'red'
        default:
          return 'purple' //Easily identifiable if there's a new status that gets added to the system
      }
    },
  }
}
</script>

<style scoped></style>