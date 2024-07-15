<template>
  <div class="sidebar" :class="{ 'translate-x-0': showSidebar, '-translate-x-full': !showSidebar }">
    <teleport to="body">
      <div v-if="showSidebar" class="w-[100vw] h-screen fixed top-0 left-0 z-10"></div>
    </teleport>
    <button
      ref="closeSidebar"
      class="absolute top-1 right-2 px-1.5 py-2"
      aria-label="Schließen"
      :tabindex="showSidebar ? null : -1"
      @click="toggleSidebar"
    >
      <Icon name="humbleicons:times" class="origin-center text-3xl mt-2 text-white" />
    </button>
    <div class="flex justify-center items-center my-16">
      <!-- <img :alt="$t('meta.name')" src="/img/ci/logo.webp" class="h-12" /> -->
    </div>
    <nav class="mt-4 boxed-content w-full">
      <ul class="flex flex-col gap-y-8 text-2xl">
        <li v-for="entry in mainMenu" :key="entry.name" class="w-full">
          <NuxtLink :to="entry.url" class="w-full" @click="toggleSidebar">
            <div class="flex items-center justify-between">
              {{ entry.name }}
              <Icon class="text-3xl" name="humbleicons:chevron-right" />
            </div>
          </NuxtLink>
          <div
            v-if="entry.items?.length"
            class="flex border-t border-b border-grey_mid items-start text-lg pl-5 gap-y-3 mt-4 py-4 flex-col"
          >
            <NuxtLink
              v-for="subEntry in entry.items"
              :key="subEntry.url"
              :to="subEntry.url"
              @click="showSidebar = false"
            >
              {{ subEntry.name }}
            </NuxtLink>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const { mainMenu } = storeToRefs(useSiteStore());
const { showSidebar, toggleSidebar } = useSidebar();

const closeSidebar = ref(null);
watch(showSidebar, (val) => {
  if (val) {
    closeSidebar.value.focus();
  }
});
</script>

<style scoped>
.sidebar {
  @apply w-screen sm:hidden sm:w-96 z-50 sm:landscape:pb-0 sm:portrait:pb-4 md:landscape:pb-8 md:portrait:pb-8 flex flex-col justify-items-stretch h-full bg-black/80 text-white backdrop-blur-xl ease-in-out duration-300 fixed top-0 overflow-x-auto;
}
</style>
