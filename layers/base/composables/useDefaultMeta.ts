import { getImage } from '@utils/strapiImageHelper';
import { ContentPage, ImageFormat, MagazinCategory, MagazinPost } from '@types';
import type { StrapiImage } from '@types';
import type { Post } from '@types';
import type { Ref } from 'vue';
import type { Category } from '@types';
import type { Author } from '@types';
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

export const useHomepageMeta = () => {
  const { seo } = storeToRefs(useSiteStore());
  const { blogUrl } = usePublicConfig();
  return {
    title: seo.value.metaTitle,
    meta: [
      { name: 'description', content: seo.value.metaDescription },
      { property: 'og:title', content: seo.value.metaTitle },
      { property: 'og:description', content: seo.value.metaDescription },
      { property: 'og:image', content: getImage(seo.value.metaCover as StrapiImage, ImageFormat.MEDIUM) },
      { property: 'og:image:width', content: seo.value.metaCover?.formats[ImageFormat.MEDIUM].width },
      { property: 'og:image:height', content: seo.value.metaCover?.formats[ImageFormat.MEDIUM].height },
      { name: 'twitter:title', content: seo.value?.metaTitle },
      { name: 'twitter:description', content: seo.value?.metaDescription },
      { name: 'twitter:image', content: getImage(seo.value.metaCover as StrapiImage, ImageFormat.SMALL) },
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

export const useCategoryPageMeta = (category: Ref<Category | MagazinCategory>) => {
  const { blogUrl } = usePublicConfig();
  const { fullPath } = useRoute();
  const { t } = useI18n();

  const metaDesc = category.value?.seo?.metaDescription
    ? category.value?.seo?.metaDescription
    : category.value.intro
        ?.map((el) => el.children)
        .flat()
        .filter((el) => el.type === 'text')
        .map((el) => el.text)
        .join(' ');

  return {
    title: `${category.value?.seo?.metaTitle ? category.value?.seo?.metaTitle : category.value.name}`,
    meta: [
      {
        name: 'description',
        content: metaDesc,
      },
      { name: 'author', content: t('meta.author') },
      { property: 'og:title', content: `${category.value.name} - ${t('meta.name')}` },
      { property: 'og:description', content: metaDesc },
      { property: 'og:image', content: getImage(category.value.cover as StrapiImage, ImageFormat.MEDIUM) },
      { property: 'og:image:width', content: category.value.cover?.formats[ImageFormat.MEDIUM].width },
      { property: 'og:image:height', content: category.value.cover?.formats[ImageFormat.MEDIUM].height },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:title', content: `${category.value.name} - ${t('meta.name')}` },
      { name: 'twitter:description', content: metaDesc },
      { name: 'twitter:image', content: getImage(category.value.cover as StrapiImage, ImageFormat.SMALL) },
      { property: 'og:url', content: `${blogUrl}${fullPath}` },
      ...useDefaultMeta(),
    ],
  };
};

export const useBlogPageMeta = () => {
  const { seo } = storeToRefs(useSiteStore());
  const { blogUrl } = usePublicConfig();

  const title = 'Sex Geschichten, Erotik Geschichten, erotische Geschichten zum Entspannen';
  const desc =
    'Kostenlose, geile erotische Geschichten. Sex Geschichten für jeden Fetisch. Täglich neue Erotikgeschichten.';
  return {
    title: title,
    meta: [
      {
        name: 'description',
        content: desc,
      },
      { property: 'og:title', content: title },
      {
        property: 'og:description',
        content: desc,
      },
      { property: 'og:image', content: getImage(seo.value.shareImage as StrapiImage, ImageFormat.MEDIUM) },
      { property: 'og:image:width', content: seo.value.shareImage.formats[ImageFormat.SMALL].width },
      { property: 'og:image:height', content: seo.value.shareImage.formats[ImageFormat.SMALL].height },
      { name: 'twitter:title', content: title },
      {
        name: 'twitter:description',
        content: desc,
      },
      { name: 'twitter:image', content: getImage(seo.value.shareImage as StrapiImage, ImageFormat.SMALL) },
      { property: 'og:url', content: `${blogUrl}/geschichten` },
      { property: 'og:type', content: 'website' },
      ...useDefaultMeta(),
    ],
  };
};

export const useMagazinPageMeta = () => {
  const { seo } = storeToRefs(useSiteStore());
  const { blogUrl } = usePublicConfig();
  const { t } = useI18n();
  const title = t('meta.magazinTitle');
  const desc = t('meta.magazinDesc');
  return {
    title: title,
    meta: [
      {
        name: 'description',
        content: desc,
      },
      { property: 'og:title', content: title },
      {
        property: 'og:description',
        content: desc,
      },
      { property: 'og:image', content: getImage(seo.value.shareImage as StrapiImage, ImageFormat.MEDIUM) },
      { property: 'og:image:width', content: seo.value.shareImage.formats[ImageFormat.SMALL].width },
      { property: 'og:image:height', content: seo.value.shareImage.formats[ImageFormat.SMALL].height },
      { name: 'twitter:title', content: title },
      {
        name: 'twitter:description',
        content: desc,
      },
      { name: 'twitter:image', content: getImage(seo.value.shareImage as StrapiImage, ImageFormat.SMALL) },
      { property: 'og:url', content: `${blogUrl}/magazin` },
      { property: 'og:type', content: 'website' },
      ...useDefaultMeta(),
    ],
  };
};

export const useAuthorPageMeta = (author: Ref<Author>) => {
  const { blogUrl } = usePublicConfig();
  const { fullPath } = useRoute();
  const { t } = useI18n();
  const metaDesc = author.value.bio
    .map((el) => el.children)
    .flat()
    .filter((el) => el.type === 'text')
    .map((el) => el.text)
    .join(' ');

  return {
    title: `${author.value?.seo?.metaTitle ? author.value?.seo?.metaTitle : author.value.name}`,
    meta: [
      {
        name: 'description',
        content: metaDesc,
      },
      { name: 'author', content: t('meta.author') },
      { property: 'og:title', content: `${author.value.name} - ${t('meta.name')}` },
      { property: 'og:description', content: metaDesc },
      { property: 'og:image', content: getImage(author.value.portrait as StrapiImage, ImageFormat.MEDIUM) },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:title', content: `${author.value.name} - ${t('meta.name')}` },
      { name: 'twitter:description', content: metaDesc },
      { name: 'twitter:image', content: getImage(author.value.portrait as StrapiImage, ImageFormat.SMALL) },
      { property: 'og:url', content: `${blogUrl}${fullPath}` },
      ...useDefaultMeta(),
    ],
  };
};

export const useContentPageMeta = (page: Ref<ContentPage>) => {
  const { blogUrl } = usePublicConfig();
  const { fullPath } = useRoute();
  const { t } = useI18n();

  return {
    title: `${page.value.seo.metaTitle}`,
    meta: [
      { name: 'description', content: page.value.seo.metaDescription },
      { name: 'author', content: t('meta.author') },
      { property: 'og:title', content: page.value.seo.metaTitle },
      { property: 'og:description', content: page.value.seo.metaDescription },
      { property: 'og:image', content: getImage(page.value.seo.shareImage as StrapiImage, ImageFormat.MEDIUM) },
      { property: 'og:image:width', content: page.value.seo.shareImage?.formats[ImageFormat.MEDIUM].width },
      { property: 'og:image:height', content: page.value.seo.shareImage?.formats[ImageFormat.MEDIUM].height },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:title', content: page.value.seo.metaTitle },
      { name: 'twitter:description', content: page.value.seo.metaDescription },
      { name: 'twitter:image', content: getImage(page.value.seo.shareImage as StrapiImage, ImageFormat.SMALL) },
      { property: 'og:url', content: `${blogUrl}${fullPath}` },
      ...useDefaultMeta(),
    ],
  };
};
