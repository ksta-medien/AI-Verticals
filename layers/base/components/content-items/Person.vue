<template>
  <div class="my-8 flex flex-col md:flex-row md:items-center gap-8">
    <div class="relative w-80 h-80 mx-auto md:mx-0 flex-none">
      <nuxt-picture
        sizes="400px"
        provider="directus"
        width="400"
        fit="inside"
        quality="80"
        :alt="category.avatar.title"
        :img-attrs="{ class: 'object-contain w-full h-full' }"
        :modifiers="{
          access_token: directus.token,
        }"
        :src="category.avatar.id"
      />
    </div>
    <div>
      <h1 class="!mb-2 text-4xl">{{ category.full_name }}</h1>
      <h2 v-if="category.royal_title" class="my-2">{{ category.royal_title }}</h2>
      <div>
        <span>* {{ category.birth_date }} in {{ category.birth_place }}</span>
        <template v-if="category.death_date"
          ><span> – † {{ category.death_date }}</span></template
        >
      </div>
      <p v-if="category.wikipedia_link" class="mt-4">
        <a target="_blank" :href="category.wikipedia_link">Mehr Informationen bei Wikipedia ⇢</a>
      </p>
      <div v-if="category.monarchies" class="tags flex flex-wrap gap-2 mt-4">
        <nuxt-link
          v-for="(mon, index) in category.monarchies"
          :key="mon.id"
          class="border px-2 rounded-full hover:border-primary text-sm transition-all"
          :to="useMonarchieUrl(mon.monarchies_id, index)"
        >
          <span>{{ mon.monarchies_id.name }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Person } from '@types';
const { directus } = usePublicConfig();

defineProps<{
  category: Person;
}>();
</script>

<style scoped></style>
