<template>
  <div class="boxed-content">
    <component :is="componentForContentItem(type)" :category="category"></component>
    <h2 class="!my-8 text-4xl">Artikel zu {{ category.full_name || category.name }}</h2>
    <div
      v-if="posts && posts.length"
      class="mt-8 grid gap-x-8 gap-y-16 sm:gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <MoleculesPostCard v-for="post in posts" :key="post.id" :item="post" />
    </div>
    <div v-else class="mt-8">
      <p>Keine passenden Artikel gefunden</p>
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
import type { Post, Person, Haus } from '@types';
import type { PageMeta } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const { mandator } = usePublicConfig();

definePageMeta({
  path: '/:type/:category_slug([a-z,\-]*)+-:id(\\d+)/:page(\\d+)?',
});

const {
  params: { type, category_slug, id, page },
} = useRoute();

// get category details
const { getItemById } = useDirectusItems();

const category = ref<Haus | Person | null>();
const parameters = {
  fields: '*.*.*.*',
  deep: {
    monarchies: { _limit: 3 },
  },
};
const category_result = await getItemById<Haus | Person>({
  collection: useEnrichmentType(type),
  id: id as string,
  params: parameters,
});

category.value = category_result;

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Enrichtment Inhalt nicht gefunden', fatal: true });
}

// get posts for category
const posts = ref<Post[] | null>(null);
const meta = ref<PageMeta>({ pagination: { page: parseInt(page) || 1, pageSize: 15 } });

const { find } = useStrapi<Post>();

const result = await find(`articles-${mandator}`, {
  populate: '*',
  sort: 'publishedAt:desc',
  pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
  filters: { categories: { $contains: category.value?.full_name || category.value?.name } },
});

meta.value = result.meta as PageMeta;
posts.value = normalize(result.data);

if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'Strapi Inhalt nicht gefunden', fatal: true });
}

const breadcrumbs = [
  { url: '/', label: 'Startseite' },
  {
    url: `/${type}/${category_slug}-${id}`,
    label: `${category.value?.full_name || category.value?.name}`,
  },
];

const { setBreadcrumbs } = useBreadcrumbStore();
setBreadcrumbs(breadcrumbs);

// useHead(useMagazinPageMeta());
// useSchemaOrg([useOrganisationSchema(), useWebsiteSchema()]);
</script>

<style scoped></style>
