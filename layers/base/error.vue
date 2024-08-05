<template>
  <TemplatesHeader />
  <NuxtLoadingIndicator color="#6A40A0" />
  <TemplatesSidebar />
  <div class="h-screen boxed-content">
    <div class="content-frame my-12 text-center">
      <p class="text-primary text-4xl">{{ error?.statusCode }}</p>
      <p class="mt-4">
        Fehler mit Seite: <span class="italic text-primary">{{ error?.url }}</span>
      </p>
      <button class="mt-8 form-button" @click="handleError">Zurück zur Startseite</button>
      <p class="opacity-10 mt-16 md:w-2/3 text-left">
        {{ error }}
      </p>
    </div>
  </div>
  <TemplatesFooter />
</template>

<script lang="ts" setup>
defineProps({
  error: Object,
});
useHead({
  title: '404 Not Found',
  htmlAttrs: {
    lang: 'de-DE',
  },
});

const handleError = () => clearError({ redirect: '/' });
</script>

<style scoped></style>
