import type { Post } from '@types';

export const useReco = (items: Post[]) => {
  const highlights = items.slice(0, 4);
  const rest = items.slice(4, items.length);

  return { top: highlights, bottom: rest };
};
