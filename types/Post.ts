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
  seo: Seo;
}

// export interface PostKnowledge extends Base {
//   title: string;
//   body: string;
// }

// export type AuthorAttributes = {
//   name: string;
//   slug: string;
//   path: string;
//   portrait: StrapiImage;
// };
