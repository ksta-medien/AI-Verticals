<template>
  <div class="strapi-blocks">
    <StrapiBlocks :content="item.body" />
  </div>
</template>

<script lang="ts" setup>
import type { RichText } from '@types';
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';
const props = defineProps<{ item: RichText }>();
const { item } = toRefs(props);
</script>

<style scoped></style>
