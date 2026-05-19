import { createClient } from 'microcms-js-sdk';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const client = createClient({
    serviceDomain: config.public.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });

  return await client.get({
    endpoint: 'tags',
  });
});
