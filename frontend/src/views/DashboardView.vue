<template>
  <div>
    <div v-for="paint in paints">
      <ProductContainer :colour="paint.colour" :stock="paint.stock" :status="paint.status" />
    </div>
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
  },
  mounted() {
    this.getPaints()
  }
}
</script>

<style scoped></style>