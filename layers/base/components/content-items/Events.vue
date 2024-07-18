<template>
  <section v-if="events" class="newset-articles my-8">
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
      <SwiperSlide v-for="event in events" :key="event.id">
        <MoleculesEventSlide :item="event" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script lang="ts" setup>
import type { Event, ContentItem } from '@types';

const { getItems } = useDirectusItems();
const events = ref<Event[]>();

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
  const result = await getItems<Event[]>({
    collection: 'events',
    params: parameters,
  });

  events.value = result;

  if (!events.value) {
    console.log('Keine Events gefunden');
  }
} catch (e) {
  console.log('Keine Events gefunden');
}
</script>

<style scoped></style>
