<template>
  <div class="boxed-content">
    <h1 class="!mb-8 text-4xl">Startseite</h1>
  </div>
</template>

<script lang="ts" setup>
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';
const { setBreadcrumbs } = useBreadcrumbStore();
setBreadcrumbs([]);
useHead(useHomepageMeta());
useSchemaOrg([useOrganisationSchema(), useWebsiteSchema()]);
</script>

<style scoped></style>
