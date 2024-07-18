<template>
  <section class="newset-articles my-8">
    <h2 v-if="item.headline" class="mb-8 text-4xl">{{ item.headline }}</h2>
    <div
      v-if="posts && posts.length"
      class="grid gap-x-8 gap-y-16 sm:gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <MoleculesPostCard v-for="post in posts" :key="post.id" :item="post" />
      <nuxt-link class="flex items-center justify-center" to="/artikel">Alle Artikel ansehen ⇢</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Post } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const { mandator } = usePublicConfig();

defineProps<{
  item: ContentItem;
}>();

// get latest posts
const posts = ref<Post[] | null>(null);
const meta = ref<PageMeta>({ pagination: { page: 1, pageSize: 5 } });

const { find } = useStrapi<Post>();

const result = await find(`articles-${mandator}`, {
  populate: '*',
  sort: 'publishedAt:desc',
  pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
});

meta.value = result.meta as PageMeta;
posts.value = normalize(result.data);

if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'Strapi Inhalt nicht gefunden', fatal: true });
}
</script>

<style scoped></style>
