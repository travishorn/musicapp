<template>
  <nav class="nav">
    <router-link class="nav-link" to="/tracks">Tracks</router-link>
    <router-link class="nav-link" to="/artists">Artists</router-link>
    <router-link class="nav-link" to="/albums">Albums</router-link>
  </nav>
</template>

<style>
  .nav-link {
    display: block;
    color: #EFEFEF;
    text-decoration: none;
    margin: 1rem 0;
    padding: 1rem 0;
    transition: color 0.25s;
  }

  .nav-link:hover,
  .nav-link.router-link-active {
    color: #FF005D;
  }
</style>
