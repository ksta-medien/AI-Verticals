<template>
  <p></p>
</template>

<script lang="ts" setup>
type Props = {
  item: unknown;
};

const props = defineProps<Props>();
console.warn(`missing content item: ${props.item}`);
</script>
