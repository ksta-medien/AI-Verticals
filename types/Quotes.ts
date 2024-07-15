import type { Base } from './Base';
import type { StrapiImage } from './StrapiImage';

export interface Quote extends Base {
  content: string;
  author: string;
  categories: QuoteCategory[];
}

export interface QuoteCategory extends Base {
  name: string;
  shortName: string;
  slug: string;
  intro: string;
  cover: StrapiImage;
  quotes: Quote[];
  seoBottomText: string;
}
