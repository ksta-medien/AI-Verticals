import type { Base } from './Base';
import type { Author } from './Author';
import type { Seo } from './Site';
import type { StrapiImage } from './StrapiImage';
import type { PostKnowledge } from './Post';

export interface MagazinPost extends Base {
  title: string;
  headline: string;
  slug: string;
  intro: string;
  author: Author;
  seo: Seo;
  cover: StrapiImage;
  mainCategory: MagazinCategory;
  cats: MagazinCategory[];
  content: Base[];
  knowledge: PostKnowledge;
}
export interface MagazinCategory extends Base {
  name: string;
  intro: string;
  slug: string;
  cover: StrapiImage;
  seoBottomText: string;
}
