<template>
  <div>
    <ProductsTable :paints="paints" />
  </div>
</template>

<script>
import Pusher from 'pusher-js';
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
    var pusher = new Pusher('APP_KEY', {
      cluster: 'CLUSTER',
      encrypted: true
    });

    var channel = pusher.subscribe('paint-channel');
    channel.bind('update-paint', (data) => {
      // Handle the received message
      this.$store.dispatch('paints/updateLocalPaintEntry', data.paint)
      console.log(data.paint);
    });
  },
  mounted() {
    this.getPaints()
  }
}
</script>

<style scoped></style>