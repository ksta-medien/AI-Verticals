import { getImage } from '@utils/strapiImageHelper';
import { ImageFormat, MagazinPost } from '@types';
import type { AuthorAttributes, Post } from '@types';
import type { Ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
import type { Breadcrumb } from '@types';

export const useOrganisationSchema = () => {
  const { blogUrl } = usePublicConfig();
  const { seo } = storeToRefs(useSiteStore());
  const { t } = useI18n();
  return defineOrganization({
    name: t('meta.name'),
    logo: `${blogUrl}/img/ci/logo.png`,
    description: seo.value.metaDescription,
  });
};

export const useWebsiteSchema = () => {
  const { seo } = storeToRefs(useSiteStore());
  return defineWebSite({
    name: seo.value.metaTitle,
    potentialAction: [
      defineSearchAction({
        target: '/suche?q={search_term_string}',
      }),
    ],
  });
};

export const useWebPageSchema = ({
  title,
  image,
  url,
  description = '',
  type = null,
  hasPart = null,
  mainEntity = null,
}: Record<string, unknown>) => {
  const data: Record<string, unknown> = {
    name: title,
    image: image || '',
    url,
    description,
  };
  if (type) {
    data['@type'] = type;
  }
  if (hasPart) {
    data['hasPart'] = hasPart;
  }
  if (mainEntity) {
    data['mainEntity'] = mainEntity;
  }
  return defineWebPage(data);
};

export const useAuthorSchema = (authors: AuthorAttributes[]) => {
  return authors.map((author) =>
    definePerson({
      name: author.name,
      image: getImage(author.portrait, ImageFormat.MEDIUM),
    })
  );
};

export const useArticleSchema = (content: Ref<Post | MagazinPost>) => {
  const { blogUrl } = usePublicConfig();
  const { t } = useI18n();

  return defineArticle({
    '@type': ['BlogPosting'],
    url: `${blogUrl}${useRoute().fullPath}`,
    headline: content.value.title,
    image: getImage(content.value.cover, ImageFormat.MEDIUM),
    description: content.value?.intro,

    datePublished: useDateFormat(content.value.publishedAt, 'YYYY-MM-DD').value,
    dateModified: useDateFormat(content.value.updatedAt, 'YYYY-MM-DD').value,
    publisher: {
      '@type': 'Organization',
      sameAs: blogUrl,
      name: t('meta.name'),
    },
    isAccessibleForFree: true,
    articleBody: content.value.content,
  });
};

export const useBreadcrumbSchema = (breadcrumbs: Breadcrumb[]) => {
  const { blogUrl } = usePublicConfig();

  const items = breadcrumbs.map(({ url, label }) => ({ name: label, item: `${blogUrl}${url}` }));
  return defineBreadcrumb({
    itemListElement: [{ name: 'Home', item: '/' }, ...items],
  });
};
