<template>
  <div class="grid gap-y-16">
    <MoleculesCategorySlider v-for="cat in categories" :key="cat.shortName" :category="cat" />
  </div>
</template>

<script setup lang="ts">
import { normalize } from '@utils/jsonApiNormalizer';
import type { Category } from '@types';
const { find } = useStrapi();
const categories = ref<Category[]>([]);

const { data } = await useAsyncData('category-tree', () =>
  find('categories', {
    fields: ['slug', 'id', 'name', 'shortName', 'createdAt'],
    sort: 'shortName:asc',
    pagination: { pageSize: 100, page: 1 },
  })
);
categories.value = normalize(data.value);
</script>

<style scoped></style>
