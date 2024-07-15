import type { StrapiImage } from './StrapiImage';
import type { Base } from './Base';

export interface Site extends Base {
  defaultSeo: Seo;
  mainMenu: MenuItem[];
  // footerMenuBlocks: MenuBlock[];
  showSearch: boolean;
}

export interface Seo extends Base {
  metaTitle: string;
  metaDescription: string;
  metaCover: StrapiImage | null;
}

export interface MenuItem extends Base {
  name: string;
  url: string;
  items: SubMenuItem[];
  icon: string;
}

export interface SubMenuItem extends Base {
  name: string;
  url: string;
  external: boolean;
}

export interface MenuBlock {
  title: string;
  items: SubMenuItem[];
}
