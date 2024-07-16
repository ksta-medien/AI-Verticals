export interface Person extends Category {
  full_name: string;
}
export interface Haus extends Category {
  name: string;
  short_briefing: string;
  logo: string;
}
export interface Category {
  id: number;
  wikipedia_link?: string;
}
