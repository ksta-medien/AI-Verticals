<template>
  <section v-if="peoples" class="newset-articles my-8">
    <h2 v-if="item.headline" class="mb-8 text-4xl">{{ item.headline }}</h2>
    <Swiper
      :space-between="20"
      :modules="modules"
      :pagination="{ clickable: true }"
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
      <SwiperSlide v-for="person in peoples" :key="person.id">
        <MoleculesPersonSlide :item="person" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script lang="ts" setup>
import type { Person, ContentItem } from '@types';
const modules = [SwiperPagination, SwiperA11y];

const { getItems } = useDirectusItems();
const peoples = ref<Person[]>();

defineProps<{
  item: ContentItem;
}>();

const parameters = {
  fields: '*.*.*.*',
  filter: { occupations: { people_occupations_id: { name: { _contains: 'Royal' } } } },
  deep: {
    monarchies: { _limit: 3 },
  },
};

try {
  const result = await getItems<Person[]>({
    collection: 'people',
    params: parameters,
  });

  peoples.value = result;

  if (!peoples.value) {
    console.log('Keine Personen gefunden');
  }
} catch (e) {
  console.log('Keine Personen gefunden');
}
</script>

<style scoped></style>
