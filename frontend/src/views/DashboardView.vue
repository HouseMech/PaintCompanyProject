<template>
  <div>
    <div v-for="paint in paints">
      <ProductContainer :colour="paint.colour" :stock="paint.stock" :status="paint.status" />
    </div>

    <v-btn @click="getPaints">Get Paints</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    getPaints() {
      this.$store.dispatch('paints/getPaints')
    }
  },
  computed: {
    paints() {
      return this.$store.getters['paints/paints']
    }
  }
}
</script>

<style scoped></style>