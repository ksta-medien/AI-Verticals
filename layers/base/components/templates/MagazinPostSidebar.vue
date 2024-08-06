<template>
  <div class="px-4 pb-4 h-auto lg:h-[33%]">
    <div class="lg:sticky relative lg:top-[17%] top-0">
      <p class="font-bold fancy text-2xl underline-fancy inline-flex mb-8">Das könnte Dir auch gefallen</p>
      <ul class="grid gap-y-4">
        <li v-for="rp in relatedPosts" :key="rp.slug" class="border-b pb-4 border-primary/50">
          <NuxtLink :to="`/${rp.mainCategory.slug}/${rp.slug}`">
            <h3 class="text-2xl mb-2">{{ rp.title }}</h3>
            <p class="opacity-70">{{ rp.intro }}</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
  <div class="p-4 h-auto lg:h-[33%]">
    <div class="lg:sticky relative top-0 lg:top-[17%]">
      <p class="font-bold fancy text-2xl underline-fancy inline-flex mb-8">Aktuelle Themen</p>
      <ul class="grid gap-y-6">
        <li v-for="cat in categories" :key="cat.slug">
          <NuxtLink
            class="hover:text-primary transition-all duration-150 flex justify-start lg:justify-between items-center text-2xl"
            :to="`/magcat/${cat.slug}`"
          >
            <Icon name="solar:flame-bold" />
            <h3>{{ cat.name }}</h3>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MagazinCategory, MagazinPost } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
const props = defineProps<{ post: MagazinPost }>();

const { find } = useStrapi<MagazinPost>();
const { post } = toRefs(props);
const categories = ref<MagazinCategory[]>([]);
const relatedPosts = ref<MagazinPost[]>([]);
try {
  const { data } = await useAsyncData(`related-posts-${post.value.id}`, () =>
    find('magazin-posts', {
      fields: ['title', 'intro', 'slug', 'headline'],
      populate: ['mainCategory'],
      filters: {
        $and: [
          {
            $or: [
              { cats: { id: { $contains: post.value.cats.map((el: MagazinCategory) => el.id) } } },
              { mainCategory: { slug: post.value.mainCategory.slug } },
            ],
          },
          {
            id: {
              $notIn: [post.value.id],
            },
          },
        ],
      },
      sort: 'updatedAt:desc',
      pagination: { page: 1, pageSize: 2 },
    })
  );
  relatedPosts.value = normalize(data.value);
} catch (e) {
  console.log(e);
}

try {
  const { data } = await useAsyncData('hot-topics', () =>
    find('magazin-categories', {
      fields: ['name', 'slug'],
      sort: 'updatedAt:desc',
      pagination: { pageSize: 5, page: 1 },
    })
  );
  categories.value = normalize(data.value);
} catch (e) {}
</script>

<style scoped></style>
