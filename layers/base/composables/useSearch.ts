import { useState } from '#imports';

export default function useSearch() {
  const showSearch = useState<boolean>('showSearch', () => false);

  const toggleSearch = () => {
    console.debug('useSearch:toggle()');
    showSearch.value = !showSearch.value;
  };

  return {
    showSearch,
    toggleSearch,
  };
}
