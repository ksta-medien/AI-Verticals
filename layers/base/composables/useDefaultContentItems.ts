export const useDefaultContentItems = (type: string) => {
  const contentItems = {
    person: [
      {
        content: [
          { id: 1, __component: 'content.info-person', headline: 'Test $' },
          { id: 1, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
    haus: [
      {
        content: [
          { id: 1, __component: 'content.info-haus', headline: 'Test $' },
          { id: 1, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
    event: [
      {
        content: [
          { id: 1, __component: 'content.info-event', headline: 'Test $' },
          { id: 1, __component: 'content.artikel-fuer-die-kategorie', headline: 'Neuste Artikel' },
        ],
      },
    ],
  };

  return contentItems[type] ? contentItems[type] : null;
};
