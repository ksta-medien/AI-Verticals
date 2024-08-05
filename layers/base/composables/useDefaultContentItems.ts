export const useDefaultContentItems = (type: string) => {
  const contentItems = {
    homepage: {
      headline: 'Alle Neuigkeiten zu den Royals dieser Welt',
      Seo: {
        id: 241,
        metaTitle: 'Royals Weltweit',
        metaDescription: 'Alle Neuigkeiten zu den Royals dieser Welt, AI Based content',
      },
      content: [
        { id: 1, __component: 'content.neuste-artikel', headline: null },
        { id: 1, __component: 'content.personen', headline: 'Interessante Personen' },
        { id: 1, __component: 'content.haeuser', headline: 'Und Ihre Häuser' },
        { id: 1, __component: 'content.events', headline: 'Wichtige Veranstaltungen' },
        {
          id: 2,
          __component: 'content.alle-artikel-limit',
          headline: 'Artikel zu Charlotte, Princess of Wales',
          limit: 9,
          category_type: 'person',
          category_id: 11,
        },
        {
          id: 2,
          __component: 'content.alle-artikel-limit',
          headline: 'Artikel zu Meghan, Duchess of Sussex',
          limit: 9,
          category_type: 'person',
          category_id: 14,
        },
      ],
    },
    person: [
      {
        headline: 'Person $',
        content: [
          { id: 1, __component: 'content.info-person', headline: '$' },
          { id: 2, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
    haus: [
      {
        headline: 'Haus $',
        content: [
          { id: 1, __component: 'content.info-haus', headline: '$' },
          { id: 2, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
    event: [
      {
        headline: 'Veranstaltung $',
        content: [
          { id: 1, __component: 'content.info-event', headline: '$' },
          { id: 2, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
  };

  return contentItems[type] ? contentItems[type] : null;
};
