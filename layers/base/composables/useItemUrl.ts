import type { Post } from '@types';

export const useItemUrl = (item: Post) => {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const slug = slugify(item.title);
  return `${slug}-${item.id}`;
};
