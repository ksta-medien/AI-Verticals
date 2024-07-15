<template>
  <section class="bg-black/20 border border-primary/30 element-shadow p-4">
    <NuxtLink
      class="justify-center items-center flex flex-col sm:flex-row gap-8"
      :to="`/geschichten/${item.post.slug}`"
      @click="dispatchEvent(TrackingEvents.EMBEDDED_POST_CLICK, item.post.slug)"
    >
      <nuxt-img
        format="webp"
        class="rounded-md aspect-square w-36 object-cover element-shadow"
        :src="item.post.cover.hash + item.post.cover.ext"
        :alt="item.post.title"
        sizes="sm:90vw md:30vw lg:60vw"
        loading="lazy"
      />
      <div class="flex flex-col">
        <h3 class="font-bold fancy lg:text-xl md:text-xl text-xl mb-4">{{ item.post.title }}</h3>
        <p class="text-sm">{{ item.post.intro }}</p>
        <p class="mt-4 self-end flex items-center gap-x-1 text-primary">
          Weiterlesen <Icon name="solar:alt-arrow-right-broken" />
        </p>
      </div>
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>
import { dispatchEvent, TrackingEvents } from '@utils/TrackingEvents';
import type { EmbeddedPost } from '@types';

defineProps<{
  item: EmbeddedPost;
}>();
</script>

<style scoped></style>
