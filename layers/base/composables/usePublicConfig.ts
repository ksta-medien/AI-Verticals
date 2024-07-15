import type { PublicRuntimeConfig } from '@nuxt/schema';

export const usePublicConfig = (): PublicRuntimeConfig => {
  return (useRuntimeConfig().public || {}) as PublicRuntimeConfig;
};
