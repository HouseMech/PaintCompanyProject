<template>
  <div>
    <ProductsTable :paints="paints" />
  </div>
</template>

<script>
import Pusher from 'pusher-js'
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions({ getPaints: 'paints/getPaints' }),
  },
  computed: {
    ...mapGetters({ paints: 'paints/paints' }),
  },
  created() {
    var pusher = new Pusher(import.meta.env["VITE_pusher_key"], {
      cluster: import.meta.env["VITE_pusher_cluster"],
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