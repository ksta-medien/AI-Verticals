<template>
  <div class="boxed-content">
    <h1 class="text-3xl md:text-5xl font-serif mb-6">Durchsuche {{ $t('meta.name') }}</h1>

    <form @submit.prevent="onSearch">
      <input
        v-model="searchTerm"
        placeholder="Suchen ..."
        class="w-full font-serif text-xl px-4 py-2 bg-brownblack border border-black outline-black"
      />
    </form>
    <p v-if="result?.query" class="mt-8 mb-2 italic">
      {{ `${result.estimatedTotalHits} Ergebnisse für:` }} <q>{{ result.query }}</q>
    </p>
    <!-- <div v-if="result" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AtomsQuote v-for="quote in result.hits as Quote[]" :key="quote.content" :quote="quote" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { Post, SearchResponse } from '@types';
const searchTerm = ref('');
const result = ref<SearchResponse | null>();

const {
  query: { p },
} = useRoute();

const onSearch = async () => {
  try {
    result.value = await $fetch<SearchResponse>(`/api/search?p=${searchTerm.value}&limit=25`);
    navigateTo(`/suche?p=${searchTerm.value}`);
  } catch (e) {
    result.value = null;
  }
};

if (p) {
  console.log(p);
  searchTerm.value = p as string;
  await onSearch();
}
</script>

<style scoped>
input::placeholder {
  @apply text-black/50;
}
</style>
