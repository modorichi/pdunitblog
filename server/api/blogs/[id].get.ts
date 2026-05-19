import { createClient } from 'microcms-js-sdk'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const client = createClient({
    serviceDomain: config.public.microcmsServiceDomain,
    apiKey: config.microcmsApiKey,
  })

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'idがありません',
    })
  }

  return await client.get({
    endpoint: 'blogs',
    contentId: id,
  })
})
