<template>
  <div class="search">
    <button v-if="!showSearch" aria-label="Suche öffnen" class="" @click="toggleSearch">
      <Icon name="humbleicons:search" class="text-3xl" />
    </button>
    <form v-else ref="searchBar" class="search-bar relative flex gap-2" @submit.prevent="onNavigateToSearch">
      <input
        v-model="searchTerm"
        placeholder="Suche ..."
        class="hidden w-[250px] md:block rounded-md border border-black focus:border-primary focus:outline-primary py-2 px-4 text-base"
      />
      <button type="submit">
        <Icon name="humbleicons:search" class="text-3xl" />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const searchTerm = ref('');
const searchBar = ref(null);
const { showSearch, toggleSearch } = useSearch();

import { onClickOutside } from '@vueuse/core';
const onNavigateToSearch = async () => {
  if (!searchTerm.value) return;
  toggleSearch();
  await navigateTo(`/suche?p=${searchTerm.value}`);
};

onClickOutside(searchBar, () => toggleSearch());
</script>

<style scoped>
.search-bar input::placeholder {
  @apply text-zinc-500;
}
</style>
