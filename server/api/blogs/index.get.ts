import { createClient } from 'microcms-js-sdk';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  console.log('serviceDomain:', config.public.microcmsServiceDomain);
  console.log('apiKey exists:', !!config.microcmsApiKey);

  const client = createClient({
    serviceDomain: config.public.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });

  return await client.get({
    endpoint: 'blogs',
  });
});
