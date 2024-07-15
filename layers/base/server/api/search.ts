import { MeiliSearch } from 'meilisearch';

export default defineEventHandler((event) => {
  const { meilisearchUrl, meilisearchPublicKey } = useRuntimeConfig();
  const query = getQuery<{ p: string; offset: string; limit: string; document: string }>(event);
  const client = new MeiliSearch({
    host: meilisearchUrl,
    apiKey: meilisearchPublicKey,
  });

  if (!query.p) return [];

  return client
    .index(query.document)
    .search(query.p, { offset: parseInt(query.offset) || 0, limit: parseInt(query.limit) || 5 });
});
