<template>
  <div class="transition-all group relative min-h-[60vh] h-auto rounded-lg overflow-hidden">
    <NuxtLink :to="slug" class="image-wrapper absolute top-0 bottom-0 left-0 right-0 block">
      <div v-if="!hideImage" class="image absolute top-0 bottom-0 left-0 right-0">
        <nuxt-picture
          v-if="item.cover"
          :alt="item?.cover?.alternativeText || item.title"
          loading="lazy"
          quality="90"
          :src="item.cover.url"
          sizes="sm:100vw md:30vw lg:30vw"
          :height="500"
          :width="600"
          :img-attrs="{
            class:
              'group-focus:view-image min-w-full min-h-full w-auto h-auto object-cover group-hover:scale-105 transition-all duration-[2000ms] ease-out',
          }"
        />
        <img
          v-else
          :alt="item.title"
          loading="lazy"
          quality="60"
          provider="ipx"
          src="/img/placeholder.jpg"
          height="500"
          width="600"
          class="group-focus:view-image min-w-full min-h-full w-auto h-auto object-cover group-hover:scale-105 transition-all duration-[2000ms] ease-out"
        />
      </div>
    </NuxtLink>

    <div class="content absolute z-index-10 bg-black/60 text-white bottom-0 w-full p-4">
      <div v-if="item.categories" class="tags flex flex-wrap gap-2 mb-2">
        <nuxt-link
          v-for="(cat, index) in item.categories.slice(0, 4)"
          :key="cat.id"
          class="border px-2 rounded-full hover:border-primary transition-all text-sm"
          :to="useItemCategoryUrl(item, index)"
        >
          <span>{{ cat.name }}</span>
        </nuxt-link>
      </div>
      <NuxtLink :to="slug">
        <div class="text-2xl font-semibold group-focus:view-title">
          <h3 class="text-secondary">{{ item.title.split(':')[0] }}:&nbsp;</h3>
          <h4 v-if="item.title.split(':')[1]">{{ item.title.split(':')[1] }}</h4>
        </div>

        <span class="flex gap-1 items-center text-sm mt-2">
          <Icon name="ic:baseline-calendar-month" />
          {{ useDateFormat(new Date(item.publishedAt as string), 'DD.MM.YYYY').value }}
        </span>
      </NuxtLink>
    </div>
  </div>
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
