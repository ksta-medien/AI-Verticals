import type { StrapiImage } from './StrapiImage';
// import type { Category } from './Category';
// import type { Author } from './Author';
import type { Seo } from './Site';
import type { Base } from './Base';

export interface Post extends Base {
  title: string;
  intro: string;
  cover: StrapiImage;
  content: string;
  Seo: Seo;
  categories?: string;
}
export interface Home extends Base {
  headline: string;
  Seo: Seo;
  content: ContentItem[];
}
export interface Post extends Base {
  title: string;
  intro: string;
  cover: StrapiImage;
  content: string;
  Seo: Seo;
  categories?: string;
}
export interface ContentItem extends Base {
  headline: string;
  start?: number;
  limit?: number;
  category_type?: string;
  category_id?: number;
}
export interface Content extends Base {
  name?: string;
  headline?: string;
  content: ContentItem[];
}
