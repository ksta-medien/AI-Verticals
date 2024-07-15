import type { Base } from './Base';

export interface FAQList extends Base {
  list: FAQEntry[];
}

export type FAQEntry = {
  title: string;
  content: string;
};
