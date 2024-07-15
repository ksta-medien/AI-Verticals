import type { Base } from './Base';

export interface FreeHtml extends Base {
  html: string;
  provider: string;
  needsConsent: boolean;
}
