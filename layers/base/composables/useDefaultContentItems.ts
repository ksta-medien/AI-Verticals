export const useDefaultContentItems = (type: string) => {
  const contentItems = {
    homepage: {
      headline: 'Startseite',
      content: [{ id: 1, __component: 'content.neuste-artikel', headline: null }],
    },
    person: [
      {
        headline: 'Person $',
        content: [
          { id: 1, __component: 'content.info-person', headline: '$' },
          { id: 1, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
    haus: [
      {
        headline: 'Haus $',
        content: [
          { id: 1, __component: 'content.info-haus', headline: '$' },
          { id: 1, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
    event: [
      {
        headline: 'Veranstaltung $',
        content: [
          { id: 1, __component: 'content.info-event', headline: '$' },
          { id: 1, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
  };

  return contentItems[type] ? contentItems[type] : null;
};
