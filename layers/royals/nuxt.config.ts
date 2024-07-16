import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);
const urls = {
  production: 'https://royals.de',
  staging: 'https://staging.royals.de',
  development: 'http://localhost:1337',
};

export default defineNuxtConfig({
  extends: ['../base'],
  css: [resolve('./assets/css/royals.css')],

  // image: {
  //   providers: {
  //     localImageSharp: {
  //       provider: resolve('../base/providers/localImageSharp'),
  //       options: {
  //         baseURL: `${urls[process.env.ENV]}/uploads/`,
  //       },
  //     },
  //   },
  //   provider: 'localImageSharp',
  // },

  i18n: {
    defaultLocale: `de-DE`,
    vueI18n: './i18n.options.ts',
  },

  robots: {
    rules: {
      UserAgent: '*',
      Disallow: '',
      Sitemap: 'https://api.erotik-magazin.online/api/sitemap/index.xml',
    },
  },

  compatibilityDate: '2024-07-10',
});
