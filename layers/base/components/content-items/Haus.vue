<template>
  <div class="my-8 flex flex-col md:flex-row md:items-center gap-8">
    <div class="relative w-80 h-80 mx-auto md:mx-0 flex-none">
      <nuxt-picture
        sizes="400px"
        provider="directus"
        width="400"
        height="400"
        fit="inside"
        quality="100"
        :alt="category.logo.title"
        :img-attrs="{ class: 'object-contain w-full h-full' }"
        :modifiers="{
          access_token: directus.token,
        }"
        :src="category.logo.id"
      />
    </div>
    <div>
      <h1 class="!mb-4 text-4xl">{{ category.name }}</h1>
      <p>{{ category.short_briefing }}</p>
      <p v-if="category.wikipedia_link" class="mt-4">
        <a target="_blank" :href="category.wikipedia_link">Mehr Informationen bei Wikipedia ⇢</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Haus } from '@types';
const { directus } = usePublicConfig();

defineProps<{
  category: Haus;
}>();
</script>

<style scoped></style>
