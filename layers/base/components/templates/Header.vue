<template>
  <header class="sticky bg-white backdrop-blur-2xl top-0 left-0 z-10 right-0 transition-all duration-500">
    <div class="boxed-content">
      <div class="flex py-6 gap-8 justify-between items-center border-b border-primary">
        <button aria-label="Sidebar öffnen" class="block sm:hidden" @click="toggleSidebar">
          <Icon name="humbleicons:bars" class="text-3xl" />
        </button>
        <div>
          <NuxtLink
            class="flex justify-center items-center hover:brightness-105 sm:items-center gap-2"
            to="/"
            @click="dispatchEvent(TrackingEvents.LOGO_CLICK, '')"
          >
            <img :alt="$t('meta.name')" src="/img/ci/logo.png" class="h-12 object-contain" />
          </NuxtLink>
        </div>
        <div class="hidden sm:block">
          <div class="flex justify-center gap-4 items-center">
            <OrganismsMainMenu />
          </div>
        </div>
        <MoleculesSearchBar v-if="showSearch" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { TrackingEvents, dispatchEvent } from '@utils/TrackingEvents';

const { toggleSidebar } = useSidebar();
const { showSearch } = storeToRefs(useSiteStore());
</script>

<style scoped>
li {
  @apply hover:underline;
}
</style>
