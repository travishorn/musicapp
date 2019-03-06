<template>
  <div class="app">
    <SideNav />

    <router-view />
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue';

export default {
  name: 'app',
  components: {
    SideNav,
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    box-sizing: border-box;
  }

  html { font-size: 18px; }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #140A25;
    color: #EFEFEF;
  }

  .app {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 1rem;
    max-width: 1024px;
    margin: 0 auto;
    padding: 1rem;
  }
</style>
