import type { Post } from '@types';

export const useCategoryUrl = (item: Post, index = 0) => {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  let category = '';

  if (item.categories?.length) {
    const name = slugify(item.categories[index].name);
    category = `/${item.categories[index].type}/${name}-${item.categories[index].id}`;
  }

  return category;
};
