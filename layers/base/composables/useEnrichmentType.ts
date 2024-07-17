export const useEnrichmentType = (type: string) => {
  const typeMap = {
    person: 'people',
    haus: 'monarchies',
    event: 'events',
  };

  return typeMap[type] ? typeMap[type] : null;
};
