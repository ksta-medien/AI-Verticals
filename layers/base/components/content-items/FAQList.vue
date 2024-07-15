<template>
  <div>
    <div v-for="(entry, index) in item.list" :key="entry.id">
      <button
        :id="`faqdetail-${index}`"
        class="border-b border-white/10 flex justify-between items-center w-full text-left py-6 text-xl"
        :class="{ 'text-primary': index === currentIndex }"
        @click="onSelectIndex(index)"
      >
        {{ entry.title }}
        <Icon
          name="solar:alt-arrow-down-bold-duotone"
          :class="{ 'rotate-90': index === currentIndex }"
          class="transition-all text-zinc-50 duration-200 ml-4 text-3xl"
        />
      </button>
      <transition-expand>
        <div v-show="currentIndex === index" class="py-6">
          <AtomsRichText class="font-serif" :text="entry.content" />
        </div>
      </transition-expand>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FAQList } from '@types';
import { TransitionExpand } from '@morev/vue-transitions';
const props = defineProps<{
  item: FAQList;
}>();

const { item } = toRefs(props);

const currentIndex = ref<number>(-1);

const onSelectIndex = (index: number) => {
  if (currentIndex.value === index) {
    currentIndex.value = -1;
  } else {
    currentIndex.value = index;
    //document.getElementById(`faqdetail-${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
</script>

<style scoped></style>
