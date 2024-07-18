<template>
  <div class="boxed-content">
    <h1 class="!mb-8 text-4xl">{{ homepage.headline }}</h1>
    <component
      :is="componentForContentItem(block.__component)"
      v-for="block in homepage.content"
      :key="`${block.id}-${block.__component}`"
      :item="block"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Content } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const { mandator } = usePublicConfig();

// get homepage content
const homepage = ref<Content>(useDefaultContentItems('homepage'));

const { find } = useStrapi<Content>();

try {
  const homepage_result = await find(`homepage-${mandator}`, {
    populate: '*',
  });

  homepage.value = normalize(homepage_result.data);

  if (!homepage.value) {
    homepage.value = useDefaultContentItems('homepage');
  }
} catch (e) {
  homepage.value = useDefaultContentItems('homepage');
}

const { setBreadcrumbs } = useBreadcrumbStore();
setBreadcrumbs([]);
useHead(useHomepageMeta());
useSchemaOrg([useOrganisationSchema(), useWebsiteSchema()]);
</script>

<style scoped></style>
