import { deDE } from './locales/';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: `de-DE`,
  messages: {
    'de-DE': deDE,
  },
}));
