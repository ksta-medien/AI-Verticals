export default defineNuxtPlugin(async ({ vueApp }) => {
  vueApp.config.globalProperties.$filters = {
    headline(text: string, replace: string) {
      if (!text) return replace;

      let result = text;

      if (text && text.includes('$')) {
        result = text.replace('$', replace);
      }
      return result;
    },
  };
});
