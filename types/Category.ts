export interface Person extends Category {
  full_name: string;
  avatar: {
    id: string;
    title: string;
  };
  birth_place: string;
  birth_date: string;
  death_date?: string;
  royal_title?: string;
  monarchies?: [
    {
      id: string;
      monarchies_id: Haus;
    },
  ];
}
export interface Haus extends Category {
  name: string;
  short_briefing: string;
  logo: {
    id: string;
    title: string;
  };
}
export interface Event extends Category {
  name: string;
  short_briefing: string;
  logo: {
    id: string;
    title: string;
  };
}
export interface Category {
  id: number;
  wikipedia_link?: string;
}
