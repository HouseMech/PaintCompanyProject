<template>
  <v-app>
    <v-main>
      <ProductContainer colour="Gray" :stock="34" status="available" />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import ProductContainer from './components/ProductContainer.vue';
</script>
