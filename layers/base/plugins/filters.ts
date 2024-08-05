export default defineNuxtPlugin(async ({ vueApp }) => {
  vueApp.config.globalProperties.$filters = {
    headline(text: string, replace: string) {
      let result = text;

      if (text.includes('$')) {
        console.log('yes, found!!!!');
        result = text.replace('$', replace);
      }
      return result;
    },
  };
});
