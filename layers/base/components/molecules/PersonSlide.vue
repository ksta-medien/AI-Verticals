<template>
  <nuxt-link :to="slug" class="flex flex-col gap-4">
    <div v-if="item.avatar" class="relative w-full">
      <nuxt-picture
        sizes="sm:320px md:300px xl:300px"
        provider="directus"
        width="400"
        height="400"
        fit="cover"
        quality="100"
        :alt="item.avatar?.title || 'empty'"
        :img-attrs="{ class: 'object-contain w-full h-full' }"
        :modifiers="{
          access_token: directus.token,
        }"
        :src="item.avatar?.id"
      />
    </div>
    <div>
      <h3 class="mb-2 font-bold">{{ item.full_name }}</h3>
      <h4 v-if="item.royal_title" class="my-2 font-semibold">{{ item.royal_title }}</h4>
      <div>
        <span>* {{ item.birth_date }} in {{ item.birth_place }}</span>
        <template v-if="item.death_date"
          ><span> – † {{ item.death_date }}</span></template
        >
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { Person } from '@types';
const { directus } = usePublicConfig();

const props = defineProps<{
  item: Person;
}>();

const slug = useCategoryUrl(props.item, 'person');
</script>

<style scoped></style>
