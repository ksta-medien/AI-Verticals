import pkg from './package.json';
import { createResolver } from '@nuxt/kit';
import { MANDATOR } from '../../environments';
import { devtools } from 'vue';
const { resolve } = createResolver(import.meta.url);

const swrObject = { swr: process.env.ENV === 'production' ? 300 : false };

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
      imgixSecret: '',
      imgixHost: '',
      hcaptchaKey: '',
      clientVersion: pkg.version,
      blogApiUrl: '',
      blogUrl: '',
      page: '',
      mandator: MANDATOR,
      directus: {
        url: '',
      },
    },
  },
  directus: {
    token: process.env.NUXT_DIRECTUS_API_TOKEN,
    devtools: true,
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
    'nuxt-directus',
    'nuxt-swiper',
  ],
  components: true,
  imports: {
    dirs: ['types', 'utils', 'stores'],
  },
  'nuxt-jsonld': { disableOptionsAPI: true },
  schemaOrg: {
    canonicalHost: process.env.NUXT_PUBLIC_BLOG_URL as string,
  },
  image: {
    domains: ['https://picsum.photos'],
    directus: {
      baseURL: 'https://enrichment-center.dev.ds.dumont.de/assets/',
    },
    providers: {
      customProvider: {
        name: 'kdm-imgx',
        provider: '../../utils/imgxProvider.ts', // Path to custom provider
        baseURL: 'https://image.ds.dumont.de',
        options: {
          baseURL: 'https://image.ds.dumont.de',
        },
      },
    },
    quality: 90,
    format: ['avif', 'webp'],
  },
  swiper: {},
  experimental: {
    componentIslands: true,
    viewTransition: true,
  },
  routeRules: {
    '/': swrObject,
    '/img/**': { headers: { 'cache-control': 's-maxage=36000' } },
    '/assets/fonts/**': { headers: { 'cache-control': 's-maxage=36000' } },
  },
});
