<template>
  <form ref="searchBar" class="search-bar relative">
    <p>Override Searchbar.vue in package</p>
  </form>
</template>

<script setup lang="ts"></script>

<style scoped>
.search-bar input::placeholder {
  @apply text-zinc-500;
}
</style>
