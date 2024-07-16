<template>
  <ClientOnly>
    <div class="mb-4">
      <div v-if="breadcrumbs.length > 0">
        <div class="boxed-content text-base py-3">
          <NuxtLink v-for="b in breadcrumbs" :key="b.url" :to="b.url" class="breadcrumb-item">
            {{ b.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { breadcrumbs } = storeToRefs(useBreadcrumbStore());
</script>

<style scoped>
li {
  @apply hover:underline;
}

.breadcrumb-item {
  @apply hover:text-blue-200 text-xs lg:text-base;
}

.breadcrumb-item:not(:last-child):after {
  content: '⇢';
  @apply mx-2 text-sm hover:text-zinc-500;
}
</style>
