<template>
  <div class="dm-pagination">
    <NuxtLink
      class="dm-pagination__incdec"
      :class="isFirstPage ? 'text-grey pointer-events-none' : 'text-primary dark:text-lightblue'"
      :to="isValidPageNumber(currentPage - 1) ? getHrefUrl(currentPage - 1, searchParams) : '#'"
    >
      <Icon class="text-3xl" name="humbleicons:chevron-left" />
      {{ $t('pagination.previous') }}
    </NuxtLink>

    <NuxtLink
      v-for="n in paginationLables"
      :key="n"
      class="dm-pagination__page"
      :class="{ 'border-y': currentPage === n, 'pointer-events-none': !n }"
      :to="isValidPageNumber(n) ? getHrefUrl(n, searchParams) : '#'"
    >
      {{ n ? n : '…' }}
    </NuxtLink>

    <NuxtLink
      class="dm-pagination__incdec"
      :class="isLastPage ? 'text-grey pointer-events-none' : 'text-primary dark:text-lightblue'"
      :to="isValidPageNumber(currentPage + 1, pagesTotal) ? getHrefUrl(currentPage + 1, searchParams) : '#'"
    >
      {{ $t('pagination.next') }} <Icon class="text-3xl" name="humbleicons:chevron-right" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { getPaginationLabels } from '@utils/pagination';
const props = defineProps<{
  currentPage: number;
  pagesTotal: number;
  searchParams?: URLSearchParams;
}>();
defineEmits(['moveCursor', 'pick']);

const { currentPage, pagesTotal, searchParams } = toRefs(props);
const { getHrefUrl, isValidPageNumber } = usePaginationUrler();
useHead(() => {
  return currentPage.value > 1 ? { meta: [{ name: 'robots', content: 'noindex, follow' }] } : {};
});

const paginationLables = computed(() => {
  return getPaginationLabels(currentPage.value, pagesTotal.value);
});

const isFirstPage = computed<boolean>(() => {
  return currentPage.value === 1 || pagesTotal.value <= 1;
});
const isLastPage = computed<boolean>(() => {
  return currentPage.value === pagesTotal.value || pagesTotal.value <= 1;
});
</script>

<style type="scss" scoped>
.dm-pagination {
  @apply flex justify-center items-center gap-4 md:gap-10 border-y border-black py-5 mx-5 my-10;

  &__page {
    @apply flex items-center font-bold text-primary p-1 border-primary dark:text-blue-300 dark:border-blue-300;
  }

  &__incdec {
    @apply flex items-center gap-2 font-bold;
  }
}
</style>
