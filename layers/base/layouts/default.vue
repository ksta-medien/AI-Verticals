<template>
  <TemplatesHeader />
  <NuxtLoadingIndicator color="#6A40A0" />
  <TemplatesSidebar />
  <main class="mb-8">
    <TemplatesBreadcrumb></TemplatesBreadcrumb>
    <slot v-bind="$attrs" />
  </main>
  <!-- <TemplatesFooter /> -->
</template>

<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core';
const { seo } = storeToRefs(useSiteStore());
const { path } = useRoute();
const { blogUrl } = usePublicConfig();
const { t } = useI18n();

if (path !== '/' && path.endsWith('/')) {
  navigateTo(path.slice(0, -1), { replace: true, redirectCode: 301 });
}

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${t('meta.name')}` : seo.value.metaTitle;
  },
  htmlAttrs: {
    lang: 'de-DE',
  },
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: `/favicon/app_icon.png` },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: `/favicon/app_icon.png` },
    { rel: 'manifest', href: `/favicon/site.webmanifest` },
  ],
});
</script>

<style scoped></style>
