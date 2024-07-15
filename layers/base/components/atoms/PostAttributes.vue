<template>
  <div class="flex">
    <div v-if="item.isPodcast" class="post-attribute">
      <Icon name="solar:calendar-mark-bold-duotone" class="text-primary" />
      <span v-if="!hideText" class="text-sm">Podcast</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '@types';

defineProps<{ item: Post; hideText?: boolean }>();
</script>

<style scoped>
.post-attribute {
  @apply flex items-center gap-2 text-primary rounded-3xl;
}
</style>
