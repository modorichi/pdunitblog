import { createClient } from 'microcms-js-sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const q = typeof query.q === 'string' ? query.q : undefined;

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

  try {
    const client = createClient({
      serviceDomain: config.public.microcmsServiceDomain,
      apiKey: config.microcmsApiKey,
    });

    return await client.get({
      endpoint: 'blogs',
      queries: q ? { q } : undefined,
    });
  } catch (error: any) {
    console.error('microCMS error:', error);

    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.message || error?.response?.data?.message || 'microCMS request failed',
    });
  }
});
