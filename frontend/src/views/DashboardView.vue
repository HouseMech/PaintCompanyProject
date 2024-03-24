<template>
  <div>
    <ProductsTable :paints="paints" />
  </div>
</template>

<script>
import Pusher from 'pusher-js'
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
  created() {
    var pusher = new Pusher('5966b6fdb432f7002104', {
      cluster: 'us3',
      encrypted: true
    })

    var channel = pusher.subscribe('paint-channel')
    channel.bind('update-paint', (data) => {
      // Handle the received message
      this.$store.dispatch('paints/updateLocalPaintEntry', data.paint)
    })
  },
  mounted() {
    this.getPaints()
  }
}
</script>

<style scoped></style>