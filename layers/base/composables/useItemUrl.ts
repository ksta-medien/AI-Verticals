import type { Post } from '@types';

export const useItemUrl = (item: Post) => {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const slug = slugify(item.title);

  let category = '';
  if (item.categories?.length) {
    const name = slugify(item.categories[0].name);
    category = `/${item.categories[0].type}/${name}-${item.categories[0].id}`;
  }

  return `${category}/${slug}-${item.id}`;
};
