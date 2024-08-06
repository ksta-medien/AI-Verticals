<template>
  <div class="bg-black/20 border border-primary/30 element-shadow px-6 py-8">
    <p class="text-3xl fancy font-bold mb-4 border-b pb-4 border-primary/30">Mehr</p>
    <ul class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <li v-for="p in posts" :key="p.id">
        <NuxtLink :to="`/geschichten/${p.slug}`">
          <p>
            <span class="text-creme fancy block text-sm mr-1">
              {{ `${p.headline} - ${p.categories.map((el) => el.shortName).join(', ')}` }}
            </span>
            <span>{{ p.title }}</span>
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
import type { Category } from '@types';
const props = defineProps<{ post: Post }>();

const { find } = useStrapi<Post>();
const { post } = toRefs(props);

const posts = ref<Post[]>([]);
try {
  const { data } = await useAsyncData(`related-posts-${post.value.id}`, () =>
    find('posts', {
      fields: ['title', 'intro', 'slug', 'headline'],
      populate: ['categories'],
      filters: { categories: { id: { $contains: post.value.categories.map((el: Category) => el.id) } } },
      pagination: { page: 1, pageSize: 12 },
    })
  );

  posts.value = normalize(data.value);
} catch (e) {
  console.log(e);
}
</script>

<style scoped>
ul {
  list-style: square outside;

  @apply ml-4;
}
li::marker {
  @apply text-primary;
}
li {
  @apply hover:text-primary text-lg transition-all duration-300;
}
</style>
