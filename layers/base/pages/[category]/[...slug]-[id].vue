<template>
  <article v-if="post" class="boxed-content">
    <div class="max-w-screen-lg mx-auto">
      <div class="!mb-8 text-4xl">
        <h1 class="text-primary inline-block">{{ post.title.split(':')[0] }}:&nbsp;</h1>

        <h2 v-if="post.title.split(':')[1]" class="inline-block">{{ post.title.split(':')[1] }}</h2>
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-1 text-sm mb-8">
        <time>
          Veröffentlicht:
          <span class="font-semibold">
            {{ useDateFormat(new Date(post.publishedAt as string), 'DD.MM.YYYY').value }}
          </span>
        </time>
        <span>•</span>
        <time>
          Zuletzt bearbeitet:
          <span class="font-semibold">
            {{ useDateFormat(new Date(post.updatedAt as string), 'DD.MM.YYYY').value }}
          </span>
        </time>
      </div>
    </div>
    <nuxt-img
      v-if="post.cover"
      class="element-shadow mb-8"
      :alt="post.title"
      format="webp"
      :src="post.cover.hash + post.cover.ext"
      :placeholder="[100, 50]"
      sizes="sm:90vw md:50vw lg:70vw"
      :height="post.cover.height"
      :width="post.cover.width"
    />
    <nuxt-img
      v-else
      class="element-shadow mb-8 w-full"
      :alt="post.title"
      format="webp"
      :src="`https://picsum.photos/seed/${post.id}/1280/790?random=${post.id}`"
      :placeholder="[100, 50]"
      sizes="sm:90vw md:50vw lg:70vw"
      height="790"
      width="1280"
    />

    <vue-markdown class="prose max-w-screen-lg mx-auto" :source="post.content"></vue-markdown>
  </article>
</template>

<script lang="ts" setup>
import type { MagazinPost } from '@types';
import VueMarkdown from 'vue-markdown-render';
import { normalize } from '@utils/jsonApiNormalizer';
import { ImageFormat } from '@types';
const { mandator } = usePublicConfig();
// import { componentForBlockType } from '@utils/blocks';
import { useDateFormat } from '@vueuse/core';
import { getImage } from '@utils/strapiImageHelper';

definePageMeta({
  path: '/:category/:slug+-:id(\\d+)',
});

const {
  params: { slug, id, category },
} = useRoute();

const { blogUrl } = usePublicConfig();

const post = ref<MagazinPost>(null);

const { find } = useStrapi<MagazinPost>();

const { data } = await useAsyncData(id as string, () =>
  find(`articles-${mandator}`, { populate: 'deep,5', filters: { id } })
);

post.value = normalize(data.value?.data?.[0]);
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Strapi Inhalt nicht gefunden', fatal: true });
}

const breadcrumbs = [
  { url: '/', label: 'Startseite' },
  { url: `/${category}`, label: `${category}` },
  { label: post.value.title, url: `/${category}/${slug}-${id}` },
];

const { setBreadcrumbs } = useBreadcrumbStore();
setBreadcrumbs(breadcrumbs);

useHead(useArticleMeta(post));
useSchemaOrg([
  // useWebsiteSchema(),
  useWebPageSchema({
    title: post.value.title,
    image: getImage(post.value.cover, ImageFormat.MEDIUM),
    url: `${blogUrl}${useRoute().fullPath}`,
  }),
  useArticleSchema(post),
  useBreadcrumbSchema(breadcrumbs),
]);
</script>

<style scoped></style>
