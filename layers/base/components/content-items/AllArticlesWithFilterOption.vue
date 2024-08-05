<template>
  <section class="articles-for-categorie">
    <h2 class="!my-8 text-4xl">
      {{ item.headline }}
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
    <p v-if="category" class="mt-8">
      <nuxt-link :to="useCategoryUrl(category, item.category_type)">Alle Artikel ansehen ⇢</nuxt-link>
    </p>
    <p v-else class="mt-8">
      <nuxt-link to="/artikel">Alle Artikel ansehen ⇢</nuxt-link>
    </p>
  </section>
</template>

<script lang="ts" setup>
import type { Post, ContentItem, Event, Person, Haus } from '@types';
import type { PageMeta } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const { mandator } = usePublicConfig();

const props = defineProps<{
  item: ContentItem;
}>();

const {
  params: { page },
} = useRoute();

const category = ref<Haus | Person | Event | null>();

if (props.item.category_type && props.item.category_id) {
  // get category details
  const { getItemById } = useDirectusItems();

  const parameters = {
    fields: '*.*.*.*',
    deep: {
      monarchies: { _limit: 3 },
    },
  };
  try {
    const category_result = await getItemById<Haus | Person | Event>({
      collection: useEnrichmentType(props.item.category_type),
      id: props.item.category_id as unknown as string,
      params: parameters,
    });

    category.value = category_result;

    if (!category.value) {
      throw createError({ statusCode: 404, statusMessage: 'Enrichtment Inhalt nicht gefunden', fatal: true });
    }
  } catch (e) {
    throw createError({ statusCode: 404, statusMessage: e.message, fatal: true });
  }
}

// get posts for category
const posts = ref<Post[] | null>(null);
const meta = ref<PageMeta>({ pagination: { page: parseInt(page) || 1, pageSize: props.item.limit || 15 } });

const { find } = useStrapi<Post>();

const result = await find(`articles-${mandator}`, {
  populate: '*',
  sort: 'publishedAt:desc',
  pagination: { pageSize: meta.value.pagination.pageSize, page: meta.value.pagination.page },
  filters: { categories: { $contains: category.value?.full_name || category.value?.name || null } },
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
