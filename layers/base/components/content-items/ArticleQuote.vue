<template>
  <div class="flex flex-col items-center justify-center">
    <p class="quote">{{ item.body }}</p>
    <p class="" style="font-variant: small-caps">{{ item.title }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { ArticleQuote } from '@types';

defineProps<{ item: ArticleQuote }>();
</script>

<style scoped>
.quote {
  @apply italic text-xl mx-2 text-center !leading-[0.1rem];
}

.quote:before {
  @apply mr-1 text-primary text-3xl;
  content: '»';
}
.quote:after {
  @apply ml-1 text-primary text-3xl;
  content: '«';
}
</style>
