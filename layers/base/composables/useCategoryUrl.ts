import type { Post } from '@types';

export const useCategoryUrl = (item: Post) => {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  let category = '';

  if (item.categories?.length) {
    const name = slugify(item.categories[0].name);
    category = `/${item.categories[0].type}/${name}-${item.categories[0].id}`;
  }

  return category;
};
