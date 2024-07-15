<template>
  <section class="homepage-opener grid grid-cols-1 lg:grid-cols-2 gap-8">
    <template v-for="(post, index) in posts" :key="post.id">
      <MoleculesPostCard v-if="index === 0" class="opener" :item="post" />
      <MoleculesPostCard v-else :class="`lg:row-start-${index} lg:row-end-${index + 1} rest`" :item="post" />
    </template>
  </section>
</template>

<script setup lang="ts">
import type { Post } from '@types';

defineProps<{
  posts: Post[];
}>();
</script>

<style scoped>
.homepage-opener {
  @screen lg {
    grid-template-rows: auto;
    grid-template-areas:
      'opener rest'
      'opener rest'
      'opener rest';
  }
}
</style>
