<template>
  <div class="richtext" v-html="renderedText" />
</template>

<script lang="ts" setup>
const markdown = useMarkdownRenderer();
const props = withDefaults(defineProps<{ text: string; mode?: 'html' | 'richtext' }>(), {
  mode: 'richtext',
});

const { mode, text } = toRefs(props);

const renderedText = computed(() => (mode.value === 'richtext' ? markdown.render(text.value) : text.value));
</script>

<style scoped>
.richtext {
}
.richtext :deep(div) {
  @apply mb-12;
}

.richtext :deep(p) {
  @apply mb-2 text-base;
}

.richtext :deep(h2) {
  @apply text-xl mb-4;
}

.richtext :deep(h3) {
  @apply text-xl mt-8 mb-4 font-sans;
}

.richtext :deep(h4) {
  @apply text-lg text-primary mt-8 mb-1 font-sans;
}

.richtext :deep(a) {
  @apply underline text-primary;
}

.richtext :deep(ul) {
  @apply mt-6;
}

.richtext ol {
  counter-reset: ol-counter;
}
.richtext :deep(li) {
  counter-increment: ol-counter 1;
  @apply pl-5 leading-8 text-base relative;
}
.richtext :deep(ol > li):before {
  content: counter(ol-counter) '.';
  @apply absolute rounded-full -left-0.5 top-0 text-right text-primary;
}

.richtext :deep(ul > li):before {
  content: '';
  @apply w-2 h-2 absolute rounded-full left-0 top-3 bg-primary;
}
</style>
