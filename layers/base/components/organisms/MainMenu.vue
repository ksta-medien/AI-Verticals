<template>
  <nav class="hidden sm:block">
    <ul class="flex flex-wrap gap-x-8">
      <MoleculesMenuItem v-for="entry in mainMenu" :key="entry.name" :entry="entry" />
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const { mainMenu } = storeToRefs(useSiteStore());
</script>

<style scoped></style>
