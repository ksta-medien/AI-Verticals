export const useEnrichmentType = (type: string) => {
  const typeMap = {
    person: 'people',
    haus: 'monarchies',
  };

  return typeMap[type] ? typeMap[type] : null;
};
