<template>
  <div>
    <div class="albums">
      <router-link class="album" v-for="album in albums" :key="album" :to="`/artist/${album.artist}/${album.album}`">
        <div class="album-info">
          <div class="album-name">{{ album.album }}</div>
          <div class="album-artist">{{ album.artist }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'albums',
  data() {
    return {
      albums: [],
    };
  },
  mounted: async function mounted() {
    const { data } = await axios.get('http://localhost:3000/api/albums');
    this.albums = data;
  },
};
</script>

<style>
  .albums {
    display: grid;
    grid-template-columns: repeat(auto-fill, 10rem);
    grid-gap: 1rem;
  }

  .album {
    color: #EFEFEF;
    text-decoration: none;
    transition: color 0.25s;
    width: 10rem;
    height: 10rem;
    display: grid;
    border: solid 1px #400D2A;
  }

  .album:hover,
  .album:hover .album-artist {
    color: #FF005D;
  }

  .album-info {
    margin: auto;
    text-align: center;
  }

  .album-artist {
    color: #7F7F7F;
    font-size: 0.7rem;
    transition: color 0.25s;
  }
</style>
