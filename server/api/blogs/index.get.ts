import { createClient } from 'microcms-js-sdk';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  if (!config.public.microcmsServiceDomain) {
    throw createError({
      statusCode: 500,
      statusMessage: 'MICROCMS_SERVICE_DOMAIN is missing',
    });
  }

  if (!config.microcmsApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'MICROCMS_API_KEY is missing',
    });
  }

  const client = createClient({
    serviceDomain: config.public.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });

  return await client.get({
    endpoint: 'blogs',
  });
});
