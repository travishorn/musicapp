<template>
  <div>
    <div class="track" v-for="track in tracks" :key="track.filename">
      <div class="track-controls">
        <svg class="track-control" width="12" height="12" viewBox="0 0 50 50">
          <path fill="#FF005D"
                d="M  0  0
                   L 50 25
                   L  0 50
                   Z" />
        </svg>
      </div>
      <div class="track-info">
        <div class="track-info-title">{{ track.title }}</div>
        <div class="track-info-artist">{{ fullArtists(track) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'tracks',
  data() {
    return {
      tracks: [],
    };
  },
  methods: {
    fullArtists(track) {
      if (!track.contributingArtists) return track.albumArtist;
      const contributingArtists = track.contributingArtists.join(', ');
      return `${track.albumArtist} & ${contributingArtists}`;
    },
  },
  mounted: async function mounted() {
    const { data } = await axios.get('http://localhost:3000/api/tracks');
    this.tracks = data;
  },
};
</script>

<style>
  .track {
    display: grid;
    grid-template-columns: 1fr 11fr;
    grid-gap: 1rem;
    margin: 1.5rem 0;
    cursor: pointer;
    transition: color 0.25s;
  }

  .track-controls {
    display: grid;
  }

  .track-control {
    margin: auto 0 auto auto;
    opacity: 0;
    transition: opacity 0.25s;
  }

  .track:hover,
  .track:hover .track-info-artist {
    color: #FF005D;
  }

  .track:hover .track-control {
    opacity: 1;
  }

  .track-info-artist {
    font-size: 0.7rem;
    color: #7F7F7F;
    transition: color 0.25s;
  }
</style>
