<template>
  <section class="articles-for-categorie">
    <h2 class="!my-8 text-4xl">
      {{ $filters.headline(item.headline, category.full_name || category.name) }}
    </h2>
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
  </section>
</template>

<script lang="ts" setup>
import type { Post, Person, Haus, ContentItem } from '@types';
import type { PageMeta } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const { mandator } = usePublicConfig();

const props = defineProps<{
  category: Person | Haus;
  item: ContentItem;
}>();

const {
  params: { page },
} = useRoute();

// get posts for category
const posts = ref<Post[] | null>(null);
const meta = ref<PageMeta>({ pagination: { page: parseInt(page) || 1, pageSize: 15 } });

const { find } = useStrapi<Post>();

const result = await find(`articles-${mandator}`, {
  populate: '*',
  sort: 'publishedAt:desc',
  pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
  filters: { categories: { $contains: props.category?.full_name || props.category?.name } },
});

meta.value = result.meta as PageMeta;
posts.value = normalize(result.data);

if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'Strapi Inhalt nicht gefunden', fatal: true });
}

// useHead(useMagazinPageMeta());
// useSchemaOrg([useOrganisationSchema(), useWebsiteSchema()]);
</script>

<style scoped></style>
