export default defineAppConfig({
  mandator: '',
  lang: 'de',
  isApp: false,
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    mandator: 'royals' | '';
    lang: 'de';
    isApp?: boolean;
  }
}
