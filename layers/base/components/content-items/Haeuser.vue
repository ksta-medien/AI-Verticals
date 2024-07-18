<template>
  <section v-if="haeuser" class="newset-articles my-8">
    <h2 v-if="item.headline" class="mb-8 text-4xl">{{ item.headline }}</h2>
    <Swiper
      :space-between="20"
      :breakpoints="{
        320: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }"
    >
      <SwiperSlide v-for="haus in haeuser" :key="haus.id">
        <MoleculesHausSlide :item="haus" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script lang="ts" setup>
import type { Haus, ContentItem } from '@types';

const { getItems } = useDirectusItems();
const haeuser = ref<Haus[]>();

defineProps<{
  item: ContentItem;
}>();

const parameters = {
  fields: '*.*.*.*',
  deep: {
    monarchies: { _limit: 3 },
  },
};

try {
  const result = await getItems<Haus[]>({
    collection: 'monarchies',
    params: parameters,
  });

  haeuser.value = result;

  if (!haeuser.value) {
    console.log('Keine Häuser gefunden');
  }
} catch (e) {
  console.log('Keine Häuser gefunden');
}
</script>

<style scoped></style>
