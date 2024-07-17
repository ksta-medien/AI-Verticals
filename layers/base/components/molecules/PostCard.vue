<template>
  <div class="hover:scale-[1.02] transition-all group">
    <div class="inner flex flex-col gap-4 text-left border-black">
      <NuxtLink :to="slug" class="image-wrapper">
        <div v-if="!hideImage" class="image relative rounded-lg overflow-hidden">
          <nuxt-picture
            v-if="item.cover"
            :alt="item?.cover?.alternativeText || item.title"
            loading="lazy"
            quality="60"
            :src="item.cover.url"
            sizes="sm:100vw md:30vw lg:30vw"
            :height="400"
            :width="600"
            :img-attrs="{
              class:
                'group-focus:view-image min-w-full group-hover:scale-105 transition-all duration-[2000ms] ease-out',
            }"
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
            class="group-focus:view-image min-w-full group-hover:scale-105 transition-all duration-[2000ms] ease-out"
          />
        </div>
      </NuxtLink>

      <div class="content">
        <div v-if="item.categories" class="tags flex flex-wrap gap-2 mb-2">
          <nuxt-link
            v-for="(cat, index) in item.categories.slice(0, 4)"
            :key="cat.id"
            class="border px-2 rounded-full hover:border-primary transition-all text-sm"
            :to="useCategoryUrl(item, index)"
          >
            <span>{{ cat.name }}</span>
          </nuxt-link>
        </div>
        <NuxtLink :to="slug">
          <div class="text-2xl font-semibold group-focus:view-title">
            <h2 class="text-primary">{{ item.title.split(':')[0] }}:&nbsp;</h2>
            <h3 v-if="item.title.split(':')[1]">{{ item.title.split(':')[1] }}</h3>
          </div>

          <p class="">{{ item.intro }}</p>
          <span class="flex gap-1 items-center text-sm mt-2">
            <Icon name="ic:baseline-calendar-month" />
            {{ useDateFormat(new Date(item.publishedAt as string), 'DD.MM.YYYY').value }}
          </span>
        </NuxtLink>
      </div>
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
