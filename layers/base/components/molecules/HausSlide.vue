<template>
  <nuxt-link :to="slug" class="flex flex-col gap-4">
    <div v-if="item.logo" class="relative w-full">
      <nuxt-picture
        sizes="400px"
        provider="directus"
        width="400"
        height="400"
        fit="contain"
        quality="100"
        :alt="item.logo.title"
        :img-attrs="{ class: 'object-contain w-full h-full' }"
        :modifiers="{
          access_token: directus.token,
          transforms: [['resize', { background: 'rgba(0,0,0,0)' }]],
        }"
        :src="item.logo.id"
      />
    </div>
    <div class="text-center">
      <h3 class="mb-2 font-bold">{{ item.name }}</h3>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { Haus } from '@types';
const { directus } = usePublicConfig();

const props = defineProps<{
  item: Haus;
}>();

const slug = useCategoryUrl(props.item, 'haus');
</script>

<style scoped></style>
