<template>
  <div class="boxed-content">
    <h1 class="!mb-8 text-4xl">Highlights</h1>
    <div class="mt-8">
      <OrganismsHomepageOpener :posts="highlights"></OrganismsHomepageOpener>
    </div>
    <h2 class="!my-8 text-4xl">Neuste Artikel</h2>
    <div class="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <MoleculesPostCard v-for="post in rest" :key="post.id" :item="post" />
    </div>
    <div v-if="meta.pagination.page < meta.pagination.pageCount" class="flex justify-center mt-16">
      <button class="bg-primary text-white px-4 py-1 rounded-2xl" @click="onLoadMore">Load More</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const { mandator } = usePublicConfig();
import type { PageMeta } from '@types';

const posts = ref<Post[] | null>(null);
const highlights = ref<Post[] | null>(null);
const rest = ref<Post[] | null>(null);
const meta = ref<PageMeta>({ pagination: { page: 1, pageSize: 16 } });

const { find } = useStrapi<Post>();

const result = await find(`articles-${mandator}`, {
  populate: 'deep,4',
  sort: 'publishedAt:desc',
  pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
});

meta.value = result.meta as PageMeta;
posts.value = normalize(result.data);

const { top, bottom } = useReco(posts.value);
highlights.value = top;
rest.value = bottom;

const onLoadMore = async () => {
  meta.value.pagination.page++;
  try {
    const result = await find(`articles-${mandator}`, {
      populate: 'deep,3',
      pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
      sort: 'publishedAt:desc',
    });
    meta.value = result.meta as PageMeta;
    rest.value = [...rest.value, ...normalize(result.data)];
  } catch (e) {
    console.log(e);
    throw createError({ statusCode: e.error.statusCode, statusMessage: e.error.message, fatal: true });
  }
};

const { setBreadcrumbs } = useBreadcrumbStore();
setBreadcrumbs([
  { url: '/', label: 'Startseite' },
  { url: '/artikel', label: 'Artikel' },
]);

// useHead(useCategoryPageMeta(category));
// useSchemaOrg([useOrganisationSchema(), useWebsiteSchema()]);
</script>
