import type { AuthorAttributes, Post } from '@types';
import type { StrapiImage } from '@types';
import type { MagazinPost } from '@types/Magazin';

export const usePostAuthor = (post: Post | MagazinPost): AuthorAttributes => {
  return {
    name: post.author?.name as string,
    slug: post.author?.slug as string,
    path: `/author/${post.author?.slug}`,
    portrait: post.author?.portrait as StrapiImage,
  };
};
