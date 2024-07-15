import pkg from './package.json';
import { createResolver } from '@nuxt/kit';
import { MANDATOR } from '../../environments';
const { resolve } = createResolver(import.meta.url);

const swrObject = { swr: process.env.NODE_ENV === 'production' ? 300 : false };

export default defineNuxtConfig({
  alias: {
    '@utils': resolve('../../utils'),
    '@types': resolve('../../types'),
    '@assets': resolve('/assets'),
    '@packageUtils': resolve('/utils'),
    '@base': resolve('./'),
  },
  devtools: { enabled: true },
  runtimeConfig: {
    meilisearchUrl: '',
    meilisearchPublicKey: '',
    mandator: MANDATOR,
    public: {
      hcaptchaKey: '',
      clientVersion: pkg.version,
      blogApiUrl: '',
      blogUrl: '',
      page: '',
      mandator: MANDATOR,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [resolve('./assets/css/custom.css'), resolve('./assets/fonts/font-faces.css')],
  tailwindcss: {
    exposeConfig: true,
    cssPath: resolve('./assets/css/tailwind.css'),
    configPath: '~/tailwind.config.js',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/fontaine',
    '@nuxtjs/strapi',
    '@nuxtjs/i18n',
    'nuxt-jsonld',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    '@morev/vue-transitions/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
    'nuxt-icon',
  ],
  components: true,
  imports: {
    dirs: ['types', 'utils', 'stores'],
  },
  'nuxt-jsonld': { disableOptionsAPI: true },
  schemaOrg: {
    canonicalHost: process.env.NUXT_PUBLIC_BLOG_URL as string,
  },
  experimental: {
    componentIslands: true,
  },
  routeRules: {
    '/': swrObject,
    '/img/**': { headers: { 'cache-control': 's-maxage=36000' } },
    '/assets/fonts/**': { headers: { 'cache-control': 's-maxage=36000' } },
  },
});
