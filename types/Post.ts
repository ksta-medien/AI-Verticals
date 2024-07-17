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
export interface ContentItem extends Base {
  headline: string;
}
export interface Content extends Base {
  name?: string;
  content: ContentItem[];
}
