<template>
  <form ref="searchBar" class="search-bar relative">
    <button aria-label="Suche öffnen" class="">
      <Icon name="humbleicons:search" class="text-3xl" />
    </button>
  </form>
</template>

<script setup lang="ts"></script>

<style scoped>
.search-bar input::placeholder {
  @apply text-zinc-500;
}
</style>
