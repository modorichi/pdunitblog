import { createClient } from 'microcms-js-sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'idがありません',
    });
  }

  const client = createClient({
    serviceDomain: config.public.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  });

  return await client.get({
    endpoint: 'blogs',
    queries: {
      filters: `tags[contains]${id}`,
    },
  });
});
