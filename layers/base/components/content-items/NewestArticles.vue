<template>
  <section class="newset-articles my-12">
    <h2 v-if="item.headline" class="mb-8 text-4xl">{{ item.headline }}</h2>
    <Swiper
      v-if="posts && posts.length"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide v-for="post in posts" :key="post.id">
        <MoleculesPostCardSlider :item="post" />
      </SwiperSlide>
    </Swiper>
    <p class="mt-8"><nuxt-link to="/artikel">Alle Artikel ansehen ⇢</nuxt-link></p>
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
