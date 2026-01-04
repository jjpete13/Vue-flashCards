<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
      <nav>
        <RouterLink :to="{name: 'home'}">Home</RouterLink>
      </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 100px;
  width: 100vw;
  display: inline-flex;
  place-items: center;
}

nav {
  width: 100%;
  font-size: 15px;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  border-radius: 5px;
}

@media (prefers-color-scheme: dark) {
  nav a.router-link-exact-active {
    color: var(--color-text);
  }
  
  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }
  
  nav a:first-of-type {
    border: 0;
  }
}
</style>
