import type { MenuBlock, Seo, Site } from '@types';
import { normalize } from '@utils/jsonApiNormalizer';
type RootState = {
  site: Site;
};

export const useSiteStore = defineStore('siteStore', {
  state: (): RootState => ({
    site: {
      defaultSeo: {
        metaTitle: '',
        metaDescription: '',
        metaCover: null,
      },
      mainMenu: [],
      showSearch: true,
    },
  }),
  actions: {
    async loadSiteMeta() {
      const { mandator } = usePublicConfig();
      const { find } = useStrapi();
      try {
        const { data } = await useAsyncData('site', () => find<Site>(`site-${mandator}`, { populate: '*' }));
        this.site = normalize(data.value) as Site;
      } catch (e) {
        console.error(JSON.stringify(e));
      }
    },
  },
  getters: {
    mainMenu: (state) => state.site.mainMenu,
    seo: (state): Seo => state.site.defaultSeo,
    // footerMenuBlocks: (state): MenuBlock[] => state.site.footerMenuBlocks,
    showSearch: (state): boolean => state.site.showSearch,
  },
});
