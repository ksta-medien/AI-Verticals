<template>
  <div class="flex justify-center">
    <div class="inline-block">
      <nuxt-img
        v-if="item.file.mime.includes('image')"
        format="webp"
        :alt="item.file.alternativeText || 'media'"
        class="rounded-2xl"
        :src="item.file.hash + item.file.ext"
        sizes="sm:100vw md:60vw lg:60vw"
        loading="lazy"
      />
      <video v-if="item.file.mime.includes('video')" controls class="rounded-2xl">
        <source :src="getVideo(item.file.url)" :type="item.file.mime" />
      </video>
      <div class="flex justify-between mt-2 px-1 text-sm">
        <p class="text-primary">{{ item.title }}</p>
        <p class="dark:text-gray-300 text-gray-500">Copyright: {{ item.copyright }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getImage, getVideo } from '@utils/strapiImageHelper';
import { ImageFormat } from '@types';

defineProps<{ item: object }>();
</script>

<style scoped></style>
