import type { StrapiImage } from './StrapiImage';
import type { Seo } from './Site';
import type { Base } from './Base';

export interface Author extends Base {
  name: string;
  bio: string;
  job: string;
  slug: string;
  linkedin: string;
  instagram: string;
  website: string;
  portrait: StrapiImage;
  seo: Seo;
  backlinks: Backlink[];
}

export interface Backlink {
  title: string;
  link: string;
}
