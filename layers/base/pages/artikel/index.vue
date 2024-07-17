<template>
  <div class="boxed-content">
    <template v-if="highlights.length">
      <h1 class="!mb-8 text-4xl">Highlights</h1>
      <div class="mt-8">
        <OrganismsHomepageOpener :posts="highlights"></OrganismsHomepageOpener>
      </div>
      <h2 class="!my-8 text-4xl">Neuste Artikel</h2>
    </template>
    <template v-else>
      <h1 class="!mb-8 text-4xl">Neuste Artikel</h1>
    </template>
    <div class="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <MoleculesPostCard v-for="post in rest" :key="post.id" :item="post" />
    </div>
    <div
      v-if="
        meta.pagination.pageCount && meta.pagination.pageCount > 1 && meta.pagination.page <= meta.pagination.pageCount
      "
      class="flex justify-center mt-16"
    >
      <MoleculesPagination
        :pages-total="meta.pagination.pageCount"
        :current-page="meta.pagination.page"
      ></MoleculesPagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const { mandator } = usePublicConfig();
import type { PageMeta } from '@types';

definePageMeta({
  path: '/artikel/:page(\\d+)?',
});

const {
  params: { page },
} = useRoute();

console.log(parseInt(page));

const posts = ref<Post[] | null>(null);
const highlights = ref<Post[] | null>(null);
const rest = ref<Post[] | null>(null);
const meta = ref<PageMeta>({ pagination: { page: parseInt(page) || 1, pageSize: 15, total: 0 } });

const { find } = useStrapi<Post>();

const result = await find(`articles-${mandator}`, {
  populate: '*',
  sort: 'publishedAt:desc',
  pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
});

meta.value = result.meta as PageMeta;
posts.value = normalize(result.data);

if (meta.value.pagination.page === 1) {
  const { top, bottom } = useReco(posts.value);
  highlights.value = top;
  rest.value = bottom;
} else {
  highlights.value = [];
  rest.value = posts.value;
}

const { setBreadcrumbs } = useBreadcrumbStore();
setBreadcrumbs([
  { url: '/', label: 'Startseite' },
  { url: '/artikel', label: 'Artikel' },
]);

// useHead(useCategoryPageMeta(category));
// useSchemaOrg([useOrganisationSchema(), useWebsiteSchema()]);
</script>
