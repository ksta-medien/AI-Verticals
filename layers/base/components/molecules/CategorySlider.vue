<template>
  <div>
    <NuxtLink
      :to="`/cat/${category.slug}`"
      class="border-b-2 border-primary/50 hover:translate-x-0.5 transition-all duration-150 pb-2 mb-4 flex items-center"
    >
      <h2 class="text-3xl font-bold fancy">{{ category.shortName }}</h2>
      <Icon class="text-2xl text-primary pt-1" name="solar:alt-arrow-right-bold-duotone" />
    </NuxtLink>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <MoleculesPostCard v-for="post in posts" :key="post.id" :item="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@types';
import type { Post } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const { find } = useStrapi();
const props = defineProps<{ category: Category }>();
const posts = ref<Post[] | null>(null);

const { category } = toRefs(props);

const { data } = await useAsyncData(`category-slider-${category.value.shortName}-posts`, () =>
  find<Post>('posts', {
    fields: ['slug', 'id', 'title', 'headline', 'intro', 'publishedAt'],
    populate: ['author', 'cover'],
    pagination: { page: 1, pageSize: 3 },
    filters: { categories: { slug: category.value.slug } },
    sort: 'publishedAt:desc',
  })
);

posts.value = normalize(data.value) as Post[];
</script>

<style scoped></style>
