<template>
  <div class="boxed-content">
    <h1 class="!mb-8 text-4xl">{{ category }}</h1>
    <div class="mt-8 grid gap-x-8 gap-y-16 sm:gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <MoleculesPostCard v-for="post in posts" :key="post.slug" :item="post" />
    </div>
    <div v-if="meta.pagination.page < meta.pagination.pageCount" class="flex justify-center mt-16">
      <button class="bg-primary px-4 py-1 rounded-2xl text-anthrazit" @click="onLoadMore">Load More</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '@types';
import VueMarkdown from 'vue-markdown-render';
import { normalize } from '@utils/jsonApiNormalizer';
import { ImageFormat } from '@types';
const { mandator } = usePublicConfig();
// import { componentForBlockType } from '@utils/blocks';
import { useDateFormat } from '@vueuse/core';
import { getImage } from '@utils/strapiImageHelper';

const {
  params: { category },
} = useRoute();

// const { blogUrl } = usePublicConfig();

const posts = ref<Post[] | null>(null);
const meta = ref<PageMeta>({ pagination: { page: 1, pageSize: 50, pageCount: 1, total: 25 } });

const { find } = useStrapi<Post>();

const result = await find(`articles-${mandator}`, {
  populate: 'deep,4',
  sort: 'publishedAt:desc',
  pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
});

meta.value = result.meta as PageMeta;
posts.value = normalize(result.data);

const onLoadMore = async () => {
  meta.value.pagination.page++;
  try {
    const result = await find(`articles-${mandator}`, {
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

const breadcrumbs = [
  { url: '/', label: 'Startseite' },
  { url: `/${category}`, label: `${category}` },
];

const { setBreadcrumbs } = useBreadcrumbStore();
setBreadcrumbs(breadcrumbs);

// useHead(useMagazinPageMeta());
// useSchemaOrg([useOrganisationSchema(), useWebsiteSchema()]);
</script>

<style scoped></style>
