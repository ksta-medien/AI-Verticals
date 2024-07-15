<template>
  <section class="content-frame p-8">
    <NuxtLink
      class="relative justify-start items-center flex flex-col lg:flex-row gap-8"
      external
      target="_blank"
      :to="item.url"
      @click="dispatchEvent(TrackingEvents.EXTERNAL_TEASER_CLICK, item.url)"
    >
      <Icon name="ic:baseline-launch" class="absolute top-0 right-0" />
      <img
        class="rounded-3xl w-64 aspect-square object-cover element-shadow"
        :src="getImage(item.image, ImageFormat.MEDIUM)"
        :alt="item.image.alternativeText || 'external-media'"
      />
      <div>
        <h3 class="text-primary lg:text-2xl md:text-2xl text-2xl mb-8">{{ item.title }}</h3>
        <p>{{ item.intro }}</p>
      </div>
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>
import { dispatchEvent, TrackingEvents } from '@utils/TrackingEvents';
import { getImage } from '@utils/strapiImageHelper';
import { ImageFormat } from '@types';
import type { ExternalTeaser } from '@types';

defineProps<{
  item: ExternalTeaser;
}>();
</script>

<style scoped></style>
