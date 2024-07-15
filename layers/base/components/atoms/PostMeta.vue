<template>
  <div class="flex items-center gap-x-2 text-sm">
    <nuxt-img
      v-if="author?.portrait?.hash && !hideImage"
      format="webp"
      :alt="author.name || 'author'"
      class="w-8 rounded-full aspect-square object-cover"
      :src="author.portrait?.hash + author.portrait?.ext"
      sizes="sm:50px md:50px lg:50px"
      loading="lazy"
    />
    <component
      :is="showLink ? NuxtLink : 'div'"
      :href="author.path"
      class="transition-all duration-150"
      :class="{ 'text-primary px-2 py-1 rounded-lg shadow bg-primary/10 backdrop-blur hover:bg-primary/20': showLink }"
    >
      <p class="font-bold fancy">{{ author.name }}</p>
    </component>
    <p class="text-xs text-zinc-400 flex items-center gap-1">
      <Icon name="solar:calendar-bold-duotone" class="text-xl" />
      {{ useDateFormat(new Date(createdAt), 'DD.MM.YYYY').value }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components';
import { useDateFormat } from '@vueuse/core';
import type { AuthorAttributes } from '@types';

defineProps<{
  createdAt: string;
  author: AuthorAttributes;
  showLink?: boolean;
  hideImage?: boolean;
}>();
</script>

<style scoped></style>
