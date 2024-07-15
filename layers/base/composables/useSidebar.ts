import { useState } from '#imports';

export default function useSidebar() {
  const showSidebar = useState<boolean>('showSidebar', () => false);

  const toggleSidebar = () => {
    console.debug('useSidebar:toggle()');
    showSidebar.value = !showSidebar.value;
  };

  return {
    showSidebar,
    toggleSidebar,
  };
}
