<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="absolute top-0 left-0 right-0 rounded-xl bg-opacity-30 backdrop-blur-lg bottom-0 bg-anthrazit flex flex-col justify-center items-center"
    >
      <!-- <img alt="loading..." class="animate-bounce" width="150" src="/img/ci/logo.svg" /> -->
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps<{ loading: boolean }>();
</script>

<style scoped></style>
