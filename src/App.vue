<template>
  <div class="app-container">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';


</script>

<style scoped>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>