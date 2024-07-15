import type { Base } from './Base';

export interface ManualRedirect extends Base {
  from: string;
  to: string;
  statusCode: number;
}
