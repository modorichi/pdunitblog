// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/ui'],
  css: ['~/assets/css/main.css', 'highlight.js/styles/github-dark.css'],
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700],
        global: true,
      },
      {
        name: 'Noto Sans JP',
        provider: 'google',
        weights: [400, 500, 700],
        global: true,
      },
    ],
  },
  alias: {},
  experimental: {
    viteEnvironmentApi: true,
  },
  ssr: false,
  runtimeConfig: {
    microcmsApiKey: process.env.NUXT_MICROCMS_API_KEY,
    public: {
      microcmsServiceDomain: process.env.NUXT_MICROCMS_SERVICE_DOMAIN,
    },
  },
});
