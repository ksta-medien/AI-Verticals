<template>
  <div>
    <p class="text-3xl fancy font-bold mb-4">Kinks</p>
    <ul class="">
      <li v-for="cat in categories" :key="cat.name" class="text-lg border-b py-1 border-primary/20">
        <NuxtLink :to="`/cat/${cat.slug}`" class="hover:text-primary transition-all duration-150 block">
          {{ cat.shortName }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { normalize } from '@utils/jsonApiNormalizer';
import type { Category } from '@types';
const { find } = useStrapi();
const categories = ref<Category[]>([]);

const { data } = await useAsyncData('category-tree', () =>
  find('categories', {
    fields: ['name', 'shortName', 'slug'],
    sort: 'shortName:asc',
    pagination: { pageSize: 100, page: 1 },
  })
);
categories.value = normalize(data.value);
</script>

<style scoped></style>
