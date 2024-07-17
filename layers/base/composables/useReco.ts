import type { Post } from '@types';

export const useReco = (items: Post[]) => {
  const highlights = items.slice(0, 3);
  const rest = items.slice(3, items.length);

  return { top: highlights, bottom: rest };
};
