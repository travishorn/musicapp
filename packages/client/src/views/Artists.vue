<template>
  <div>
    <div class="artists">
      <router-link class="artist" v-for="artist in artists" :key="artist" :to="`/artist/${artist}`">
        <div class="artist-name">{{ artist }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'artists',
  data() {
    return {
      artists: [],
    };
  },
  mounted: async function mounted() {
    const { data } = await axios.get('http://localhost:3000/api/artists');
    this.artists = data;
  },
};
</script>

<style>
  .artists {
    display: grid;
    grid-template-columns: repeat(auto-fill, 10rem);
    grid-gap: 1rem;
  }

  .artist {
    color: #EFEFEF;
    text-decoration: none;
    transition: color 0.25s;
    width: 10rem;
    height: 10rem;
    display: grid;
    border: solid 1px #400D2A;
  }

  .artist:hover {
    color: #FF005D;
  }

  .artist-name {
    margin: auto;
  }
</style>
