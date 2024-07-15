<template>
  <label class="container" :class="{ 'scale-75 sm:scale-100': checked && shrinkWhenChecked }">
    <input
      v-bind="$attrs"
      v-model="checked"
      class="input"
      type="checkbox"
      @change="$emit('update:checked', $event.target.checked)"
    />
    <span class="switch"></span>
    <span class="label" :class="labelClasses" v-html="label" />
  </label>
</template>

<script lang="ts" setup>
defineEmits(['update:checked']);

const props = defineProps<{
  checked: boolean;
  shrinkWhenChecked?: boolean;
  label: string;
  labelClasses: Array<string>;
}>();

const { checked, label } = toRefs(props);
</script>

<style scoped>
.container {
  @apply cursor-pointer flex items-center origin-left;
}

.label {
  @apply ml-2 overflow-hidden;
}

.label :deep(a) {
  @apply underline text-primary;
}

.input {
  @apply sr-only;
}

.switch {
  --switch-container-width: 44px;
  --switch-size: calc(var(--switch-container-width) / 2);
  @apply flex items-center relative shrink-0 transition-colors duration-300 ease-in-out rounded-full bg-gray-600 dark:bg-gray-800;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
}

.switch::before {
  @apply absolute left-[1px] rounded-full bg-white border-2 border-gray-400 transition-transform duration-300 ease-in-out;
  content: '';
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-size) - 4px);
}

.input:checked + .switch {
  @apply bg-primary;
}

.input:checked + .switch::before {
  @apply border-primary;
  transform: translateX(calc(var(--switch-container-width) - var(--switch-size)));
}

.input:focus + .switch::before {
  @apply border-gray-400;
}

.input:focus:checked + .switch::before {
  @apply border-primary;
}

.input:disabled + .switch {
  @apply bg-gray-400;
}

.input:disabled + .switch::before {
  @apply bg-gray-400 border-gray-400;
}
</style>
