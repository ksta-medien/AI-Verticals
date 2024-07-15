export default defineNuxtPlugin(async () => {
  await useSiteStore().loadSiteMeta();
});
