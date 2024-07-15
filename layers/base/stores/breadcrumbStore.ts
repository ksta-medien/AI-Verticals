import type { Breadcrumb } from '@types';
type RootState = {
  breadcrumbs: Breadcrumb[];
};

export const useBreadcrumbStore = defineStore('breadcrumbStore', {
  state: (): RootState => ({
    breadcrumbs: [],
  }),
  actions: {
    setBreadcrumbs(c: Breadcrumb[]) {
      this.breadcrumbs = c;
    },
  },
});
