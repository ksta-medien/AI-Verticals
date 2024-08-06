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
    <p v-if="posts" class="mt-8 mb-2 italic">
      {{ `${posts.length} Ergebnisse für` }} <q>{{ searchTerm }}</q>
    </p>
    <div
      v-if="posts && posts.length"
      class="mt-8 grid gap-x-8 gap-y-16 sm:gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <p v-for="post in posts" :key="post.id" :item="post">{{ post.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post, SearchResponse } from '@types';
const { mandator } = usePublicConfig();

const searchTerm = ref('');

const posts = ref<Post[] | null>(null);

const {
  query: { p },
} = useRoute();

const onSearch = async () => {
  const { find } = useStrapi();

  const result = await find(`fuzzy-search/search`, {
    query: searchTerm.value,
  });

  posts.value = result[`articles-${mandator}`];

  if (!posts.value) {
    throw createError({ statusCode: 404, statusMessage: 'Strapi Inhalt nicht gefunden', fatal: true });
  }
};

if (p) {
  searchTerm.value = p as string;
  await onSearch();
}
</script>

<style scoped>
input::placeholder {
  @apply text-black/50;
}
</style>
