import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { createVfm } from 'vue-final-modal';
import VuePopper from '@kalimahapps/vue-popper';
import 'vue3-toastify/dist/index.css';
export default defineNuxtPlugin(async ({ vueApp }) => {
  vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-center',
    theme: 'dark',
  } as ToastContainerOptions);
  vueApp.component('VuePopper', VuePopper);
  const vfm = createVfm() as any;
  vueApp.use(vfm);
});
