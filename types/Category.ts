import type { Post } from './Post';
import type { StrapiImage } from './StrapiImage';
import type { Seo } from './Site';
import type { Base } from './Base';

export interface Category extends Base {
  name: string;
  shortName: string;
  slug: string;
  intro: string;
  seoBottomText: string;
  posts: Post[];
  cover: StrapiImage;
  seo: Seo;
}
