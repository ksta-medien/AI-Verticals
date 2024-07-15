import type { Seo } from './Site';
import type { Base } from './Base';

export interface ContentPage extends Base {
  title: string;
  route: string;
  seo: Seo;
  content: object[];
}
