<template>
  <div>
    <ProductsTable :paints="paints" />
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