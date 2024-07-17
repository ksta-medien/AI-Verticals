export interface Person extends Category {
  full_name: string;
  avatar: string;
  birth_place: string;
  birth_date: string;
  death_date?: string;
  royal_title?: string;
  monarchies?: Array<number>;
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
