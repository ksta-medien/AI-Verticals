import type { StrapiImage } from './StrapiImage';
import type { Base } from './Base';

export interface ExternalTeaser extends Base {
  url: string;
  image: StrapiImage;
  title: string;
  intro: string;
}
