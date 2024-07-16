import type { StrapiImage } from './StrapiImage';
// import type { Category } from './Category';
// import type { Author } from './Author';
import type { Seo } from './Site';
import type { Base } from './Base';

export interface Post extends Base {
  title: string;
  intro: string;
  cover: StrapiImage;
  // content: Base[];
  content: string;
  Seo: Seo;
  categories?: PostCategory[];
}
export type PostCategory = {
  id: number;
  name: string;
  type: string;
};

// export type AuthorAttributes = {
//   name: string;
//   slug: string;
//   path: string;
//   portrait: StrapiImage;
// };
