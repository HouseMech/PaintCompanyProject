<template>
  <div>
    <v-row>
      <v-col>
        <div>{{ colour }}</div>
      </v-col>
      <v-col>
        <div>{{ stock }}</div>
      </v-col>
      <v-col>
        <div>{{ status }}</div>
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
  }
}
</script>

<style scoped></style>