import Vue from 'vue';
import Router from 'vue-router';
import Tracks from './views/Tracks.vue';
import Artists from './views/Artists.vue';
import Albums from './views/Albums.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/tracks',
    },
    {
      path: '/tracks',
      name: 'tracks',
      component: Tracks,
    },
    {
      path: '/artists',
      name: 'artists',
      component: Artists,
    },
    {
      path: '/albums',
      name: 'albums',
      component: Albums,
    },
  ],
});
