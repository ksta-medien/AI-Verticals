<template>
  <footer class="py-16 bg-black/50">
    <div class="boxed-content">
      <div class="flex flex-col justify-between gap-16 items-start mt-12">
        <!-- <img :alt="$t('meta.name')" src="/img/ci/logo.webp" class="h-12" /> -->
        <nav class="flex md:flex-row flex-col justify-between gap-16">
          <div
            v-for="block in footerMenuBlocks"
            :key="block.title"
            class="flex flex-col items-start justify-start gap-x-6 text-creme"
          >
            <h3 class="text-xl fancy font-bold">{{ block.title }}</h3>
            <ul>
              <li v-for="entry in block.items" :key="entry.name" class="hover:text-primary mt-2">
                <NuxtLink
                  :external="!!entry.external"
                  :target="!!entry.external ? '_blank' : '_self'"
                  :to="entry.url"
                  :rel="entry.external ? 'noopener' : ''"
                  >{{ entry.name }}</NuxtLink
                >
              </li>
            </ul>
          </div>
        </nav>
        <ul class="flex flex-wrap border-t border-primary/30 pt-8 gap-3">
          <!-- <li v-for="cat in categories" :key="cat.name">
            <NuxtLink :to="`/cat/${cat.slug}`" class="text-primary hover:underline">
              {{ cat.name }}
            </NuxtLink>
          </li> -->
        </ul>

        <div>
          <p class="text-sm opacity-50 mb-4">© 2024 {{ $t('meta.name') }}</p>
          <div class="flex flex-wrap gap-4">
            <!-- <NuxtLink external target="_blank" to="https://www.rtalabel.org/">
              <img alt="RTA" src="/img/jj/rta.gif" class="h-7" />
            </NuxtLink>
            <NuxtLink external target="_blank" to="http://www.jugendschutzprogramm.de/download">
              <img alt="JusProg" src="/img/jj/jus.png" class="h-7" />
            </NuxtLink> -->
          </div>
        </div>
        <div class="text-xs lg:w-2/3 text-creme/40">
          Alle Models auf dieser Website sind 18 Jahre oder älter. <br /><br />Die Geschichten, alle Namen, Charaktere
          und Begebenheiten, die auf dieser Website dargestellt werden, sind fiktiv. Eine Identifizierung mit
          tatsächlichen Personen (lebenden oder verstorbenen), Orten, Gebäuden und Produkten ist nicht beabsichtigt und
          sollte auch nicht vermutet werden. <br />
          <NuxtLink class="hover:underline block mt-4 text-creme" to="/impressum">Impressum</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
// const { footerMenuBlocks } = storeToRefs(useSiteStore());
const footerMenuBlocks = {};

import { normalize } from '@utils/jsonApiNormalizer';
import type { Category } from '@types';
const { find } = useStrapi();
const categories = ref<Category[]>([]);

// const { data } = await useAsyncData('category-tree', () =>
//   find('categories', {
//     fields: ['name', 'slug'],
//     sort: 'name:asc',
//     pagination: { pageSize: 100, page: 1 },
//   })
// );
// categories.value = normalize(data.value);
</script>

<style scoped></style>
