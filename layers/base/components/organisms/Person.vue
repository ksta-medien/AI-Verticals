<template>
  <div class="py-24">
    <p>////////////////////////////////</p>
    <p>Hier kommt Inhalt für die Person</p>
    <p>////////////////////////////////</p>
  </div>
</template>

<script lang="ts" setup>
import type { Category } from '@types';

defineProps<{
  category: Category;
}>();
</script>

<style scoped></style>
