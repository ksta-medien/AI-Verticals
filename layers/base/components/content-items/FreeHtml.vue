<template>
  <MoleculesConsentLayer :bypass-consent="!item.needsConsent" :provider-name="item.provider">
    <client-only>
      <div class="free-html" v-html="item.html" />
    </client-only>
  </MoleculesConsentLayer>
</template>

<script lang="ts" setup>
import type { FreeHtml } from '@types';

defineProps<{
  item: FreeHtml;
}>();
</script>

<style scoped>
.free-html {
  @apply flex justify-center items-center;
}

.free-html :deep(iframe) {
  @apply aspect-video;
}
</style>
