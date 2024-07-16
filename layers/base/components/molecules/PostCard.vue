<template>
  <NuxtLink :to="slug" class="hover:scale-[1.02] transition-all group">
    <div class="inner flex flex-col gap-4 text-left border-black">
      <div class="image-wrapper">
        <div v-if="!hideImage" class="image relative rounded-lg overflow-hidden">
          <nuxt-picture
            v-if="item.cover"
            provider="strapi"
            :alt="item?.cover?.alternativeText || item.title"
            loading="lazy"
            quality="60"
            :src="item.cover.hash + item.cover.ext"
            sizes="sm:100vw md:30vw lg:30vw"
            :height="item.cover.height"
            :width="item.cover.width"
            :img-attrs="{ class: 'min-w-full group-hover:scale-105 transition-all duration-[2000ms] ease-out' }"
          />
          <img
            v-else
            :alt="item.title"
            loading="lazy"
            quality="60"
            provider="ipx"
            src="/img/placeholder.jpg"
            height="400"
            width="600"
            class="min-w-full group-hover:scale-105 transition-all duration-[2000ms] ease-out"
          />
        </div>
      </div>

      <div class="content">
        <div class="text-2xl font-semibold">
          <h2 class="text-primary">{{ item.title.split(':')[0] }}:&nbsp;</h2>
          <h3 v-if="item.title.split(':')[1]">{{ item.title.split(':')[1] }}</h3>
        </div>

        <p class="">{{ item.intro }}</p>
        <span class="flex gap-1 items-center text-sm mt-2">
          <Icon name="ic:baseline-calendar-month" />
          {{ useDateFormat(new Date(item.publishedAt as string), 'DD.MM.YYYY').value }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Post } from '@types';
import { useDateFormat } from '@vueuse/core';

const props = defineProps<{
  item: Post;
  hideImage?: boolean;
}>();

const slug = useItemUrl(props.item);
</script>

<style scoped>
.opener {
  @screen lg {
    grid-row: 1 / 4;
    grid-area: opener;
  }
}
.opener .inner {
  gap: 0;
}
.opener .image {
  @apply rounded-b-none;
}
.opener .content {
  @apply bg-primary text-white p-4 rounded-b-lg;
}
.opener .content h2 {
  @apply text-highlight;
}
.rest .inner {
  @screen lg {
    flex-direction: row;
  }
}
.rest .inner {
  @screen lg {
    flex-direction: row;
  }
}
.rest .inner .image-wrapper {
  @screen lg {
    flex: 40% 0 0;
  }
}
</style>
