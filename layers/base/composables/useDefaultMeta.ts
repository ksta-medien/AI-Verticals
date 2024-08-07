import { getImage } from '@utils/strapiImageHelper';
import { ImageFormat } from '@types';
import type { ContentPage, Home, StrapiImage, Post, Author, Haus, Person, Event, Content } from '@types';
import type { Ref } from 'vue';

const headline = function (text: string, replace: string) {
  if (!text) return replace;

  let result = text;

  if (text && text.includes('$')) {
    result = text.replace('$', replace);
  }
  return result;
};

export const useDefaultMeta = () => {
  const { t } = useI18n();

  return [
    { name: 'copyright', content: t('meta.copyright') },
    { name: 'msapplication-TileColor', content: '#121316' },
    { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
    { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
    { name: 'theme-color', content: '#121316' },
    { name: 'og:locale', content: 'de_DE' },
    { name: 'RATING', content: 'RTA-5042-1996-1400-1577-RTA' },
  ];
};

export const useHomepageMeta = (home: Ref<Home>) => {
  const { blogUrl } = usePublicConfig();
  return {
    title: home.value?.Seo.metaTitle,
    meta: [
      { name: 'description', content: home.value?.Seo.metaDescription },
      { property: 'og:title', content: home.value?.Seo.metaTitle },
      { property: 'og:description', content: home.value?.Seo.metaDescription },
      { property: 'og:image', content: getImage(home.value?.Seo.metaCover as StrapiImage, ImageFormat.MEDIUM) },
      { property: 'og:image:width', content: home.value?.Seo.metaCover?.formats[ImageFormat.MEDIUM].width },
      { property: 'og:image:height', content: home.value?.Seo.metaCover?.formats[ImageFormat.MEDIUM].height },
      { name: 'twitter:title', content: home.value?.Seo?.metaTitle },
      { name: 'twitter:description', content: home.value?.Seo?.metaDescription },
      { name: 'twitter:image', content: getImage(home.value?.Seo.metaCover as StrapiImage, ImageFormat.SMALL) },
      { property: 'og:url', content: `${blogUrl}` },
      { property: 'og:type', content: 'website' },
      ...useDefaultMeta(),
    ],
  };
};

export const useArticleMeta = (post: Ref<Post>) => {
  const { blogUrl, blogApiUrl } = usePublicConfig();
  const { fullPath } = useRoute();

  return {
    title: `${post.value?.Seo?.metaTitle ? post.value?.Seo?.metaTitle : post.value.title}`,
    meta: [
      {
        name: 'description',
        content: post.value?.Seo?.metaDescription ? post.value?.Seo?.metaDescription : post.value.intro,
      },
      { property: 'og:title', content: post.value.title },
      {
        property: 'og:description',
        content: post.value?.Seo?.metaDescription
          ? post.value?.Seo?.metaDescription
          : post.value.intro.substring(0, 150) + `${post.value.intro.length > 150 ? '...' : ''}`,
      },
      { property: 'og:image', content: `${blogApiUrl}${post.value.cover?.url}` },
      { property: 'og:image:width', content: post.value.cover?.width },
      { property: 'og:image:height', content: post.value.cover?.height },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:title', content: post.value?.title },
      {
        name: 'twitter:description',
        content: post.value?.seo?.metaDescription ? post.value?.seo?.metaDescription : post.value.intro,
      },
      { name: 'twitter:image', content: getImage(post.value.cover, ImageFormat.SMALL) },
      { property: 'og:url', content: `${blogUrl}${fullPath}` },
      { property: 'article:publisher', content: blogUrl },
      { property: 'article:published_time', content: new Date(post.value.publishedAt).toISOString() },
      { property: 'article:modified_time', content: new Date(post.value.updatedAt).toISOString() },
      ...useDefaultMeta(),
    ],
  };
};

export const useCategoryPageMeta = (category: Ref<Haus | Person | Event>, content: Ref<Content>) => {
  const { blogUrl } = usePublicConfig();
  const { fullPath } = useRoute();
  const { t } = useI18n();

  const metaDesc = category.value?.Seo?.metaDescription
    ? category.value?.Seo?.metaDescription
    : category.value.short_briefing;

  return {
    title: headline(content.value?.headline || '$', category.value?.full_name || category.value?.name),
    meta: [
      {
        name: 'description',
        content: metaDesc,
      },
      {
        property: 'og:title',
        content: headline(content.value?.headline || '$', category.value?.full_name || category.value?.name),
      },
      { property: 'og:description', content: metaDesc },
      // { property: 'og:image', content: getImage(category.value.cover as StrapiImage, ImageFormat.MEDIUM) },
      // { property: 'og:image:width', content: category.value.cover?.formats[ImageFormat.MEDIUM].width },
      // { property: 'og:image:height', content: category.value.cover?.formats[ImageFormat.MEDIUM].height },
      { property: 'og:type', content: 'website' },
      {
        name: 'twitter:title',
        content: headline(content.value?.headline || '$', category.value?.full_name || category.value?.name),
      },
      { name: 'twitter:description', content: metaDesc },
      // { name: 'twitter:image', content: getImage(category.value.cover as StrapiImage, ImageFormat.SMALL) },
      { property: 'og:url', content: `${blogUrl}${fullPath}` },
      ...useDefaultMeta(),
    ],
  };
};
