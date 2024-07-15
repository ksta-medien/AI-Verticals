<template>
  <MoleculesConsentLayer :bypass-consent="false" provider-name="YouTube">
    <iframe
      :src="`https://www.youtube.com/embed/${item.yId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      class="aspect-video w-full"
    ></iframe>
  </MoleculesConsentLayer>
</template>

<script setup lang="ts">
import type { YouTubeVideo } from '@types';

defineProps<{ item: YouTubeVideo }>();
</script>

<style scoped></style>
