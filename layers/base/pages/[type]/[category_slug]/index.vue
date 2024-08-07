<template>
  <div class="boxed-content">
    <h1 class="mb-8 text-4xl font-semibold">
      {{ $filters.headline(category_content?.headline || 'Fehler $', category?.full_name || category?.name) }}
    </h1>
    <component
      :is="componentForContentItem(block.__component)"
      v-for="block in category_content.content"
      :key="`${block.id}-${block.__component}`"
      :item="block"
      :category="category"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Person, Haus, Content, Event } from '@types';
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

const category = ref<Haus | Person | Event | null>(null);
const parameters = {
  fields: '*.*.*.*',
  deep: {
    monarchies: { _limit: 3 },
  },
};
try {
  const category_result = await getItemById<Haus | Person | Event>({
    collection: useEnrichmentType(type),
    id: id as string,
    params: parameters,
  });

  category.value = category_result;

  if (!category.value) {
    throw createError({ statusCode: 404, statusMessage: 'Enrichtment Inhalt nicht gefunden', fatal: true });
  }
} catch (e) {
  throw createError({ statusCode: 404, statusMessage: e.message, fatal: true });
}

// get category content
const category_content = ref<Content | null>(null);

const { findOne } = useStrapi<Content>();

try {
  const category_content_result = await findOne(`categories-${mandator}`, {
    populate: '*',
    filters: { name: type },
  });

  category_content.value = normalize(category_content_result.data)[0];

  if (!category_content.value || category_content.value.length == 0) {
    category_content.value = useDefaultContentItems(type)[0];
  }
} catch (e) {
  category_content.value = useDefaultContentItems(type)[0];
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
useHead(useCategoryPageMeta(category, category_content));
// useSchemaOrg([useOrganisationSchema(), useWebsiteSchema()]);
</script>

<style scoped></style>
