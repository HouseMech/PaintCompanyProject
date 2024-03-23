<template>
  <div>
    <v-row>
      <v-col>
        <div>{{ colour }}</div>
      </v-col>
      <v-col>
        <v-chip :color="getColourForStatus()">{{ status }}</v-chip>
      </v-col>
      <v-col>
        <div>{{ stock }}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    colour: String,
    stock: Number,
    status: String,
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
          return 'purple'
      }
    }
  }
}
</script>

<style scoped></style>