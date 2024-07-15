<template>
  <div class="boxed-content">
    <div class="flex flex-col items-center mb-16">
      <h1 class="text-7xl fancy font-bold">Erotik Geschichten</h1>
      <p class="text-sm">{{ meta.pagination.total }} Einträge</p>
    </div>
    <transition-fade
      tag="div"
      group
      class="mt-8 grid gap-x-8 gap-y-16 sm:gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <MoleculesPostCard
        v-for="post in posts"
        :key="post.slug"
        :item="post"
        @click="dispatchEvent(TrackingEvents.BLOG_PAGE_BLOGPOST_CLICK, post.title)"
      />
    </transition-fade>
    <div
      v-if="meta.pagination.page < meta.pagination.pageCount"
      class="flex justify-center border-t pt-6 border-primary/50 mt-16"
    >
      <button class="border border-primary text-2xl font-bold fancy px-4 py-1 rounded-md" @click="onLoadMore">
        Mehr anzeigen
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TrackingEvents, dispatchEvent } from '@utils/TrackingEvents';
import type { Post } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
import type { PageMeta } from '@types';

const posts = ref<Post[] | null>(null);
const meta = ref<PageMeta>({ pagination: { page: 1, pageSize: 20, pageCount: 1, total: 25 } });

const { find } = useStrapi<Post>();

const result = await find('posts', {
  populate: 'deep,4',
  sort: 'publishedAt:desc',
  pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
});

meta.value = result.meta as PageMeta;
posts.value = normalize(result.data);

const onLoadMore = async () => {
  meta.value.pagination.page++;
  try {
    const result = await find('posts', {
      populate: 'deep,3',
      pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
      sort: 'publishedAt:desc',
    });
    meta.value = result.meta as PageMeta;
    posts.value = [...posts.value, ...normalize(result.data)];
  } catch (e) {
    console.log(e);
    throw createError({ statusCode: e.error.statusCode, statusMessage: e.error.message, fatal: true });
  }
};
</script>

<style scoped></style>
