import type { Post, Haus, Person, Event } from '@types';

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

export const useCategoryUrl = (item: Post, index = 0) => {
  let category = '';

  if (item.categories?.length) {
    const name = slugify(item.categories[index].name);
    category = `/${item.categories[index].type}/${name}-${item.categories[index].id}`;
  }

  return category;
};

export const useMonarchieUrl = (item: Haus) => {
  let category = '';

  const name = slugify(item.name);
  category = `/haus/${name}-${item.id}`;

  return category;
};
export const usePersonUrl = (item: Person) => {
  let category = '';

  const name = slugify(item.full_name);
  category = `/person/${name}-${item.id}`;

  return category;
};
export const useEventUrl = (item: Event) => {
  let category = '';

  const name = slugify(item.name);
  category = `/event/${name}-${item.id}`;

  return category;
};
