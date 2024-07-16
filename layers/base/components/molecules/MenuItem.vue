<template>
  <li class="relative">
    <NuxtLink
      class="inline-flex gap-x-2 font-semibold text-sm lg:text-base items-center hover:text-blue-200 transition-colors duration-200"
      :class="{ 'text-blue-400': showSubMenu }"
      :to="entry.url"
      @click="onMainMenuClick"
      @mouseover="hasSubmenu ? (showSubMenu = true) : null"
    >
      <Icon v-if="entry.icon" :name="entry.icon" />
      <span>{{ entry.name }}</span>
      <Icon v-if="entry.items?.length > 0" class="" name="solar:alt-arrow-down-bold-duotone" />
    </NuxtLink>
    <client-only>
      <transition-expand>
        <div
          v-if="showSubMenu"
          ref="submenu"
          class="absolute top-8 z-20 -left-2 bg-black/90 rounded-md shadow dark:border-zinc-700 text-base text-left w-44 flex flex-col px-2 py-2 gap-y-2"
        >
          <NuxtLink
            v-for="subEntry in entry.items"
            :key="subEntry.url"
            class="hover:text-primary text-sm transition-colors duration-200 pb-1"
            :to="subEntry.url"
            @click="showSubMenu = false"
          >
            <Icon name="solar:alt-arrow-right-broken" />
            <span>{{ subEntry.name }}</span>
          </NuxtLink>
        </div>
      </transition-expand>
    </client-only>
  </li>
</template>

<script lang="ts" setup>
import type { MenuItem } from '@types';
import { NuxtLink } from '#components';
import { TrackingEvents, dispatchEvent } from '@utils/TrackingEvents';
import { onClickOutside } from '@vueuse/core';
import { TransitionExpand } from '@morev/vue-transitions';

const props = defineProps<{ entry: MenuItem }>();
const showSubMenu = ref<boolean>(false);
const { entry } = toRefs(props);
const submenu = ref(null);
const hasSubmenu = computed(() => entry.value.items?.length > 0);

onClickOutside(submenu, () => (showSubMenu.value = false));

const onMainMenuClick = () => {
  if (!hasSubmenu.value) {
    dispatchEvent(TrackingEvents.MAIN_MENU_CLICK, entry.value.name);
    return;
  }
  showSubMenu.value = false;
};
</script>

<style scoped></style>
