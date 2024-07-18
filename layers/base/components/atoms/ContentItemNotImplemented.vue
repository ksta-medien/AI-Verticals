<template>
  <div class="my-8 border-b border-t py-8 border-red-800">
    <p class="text-red-800 text-xl uppercase">Content Item existiert nicht</p>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  item: unknown;
};

const props = defineProps<Props>();
console.warn(`missing content item: ${props.item}`);
</script>
