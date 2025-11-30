// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0"
  },
  css: ["~/assets/css/main.css"],
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    "shadcn-nuxt",
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },
  ssr: true,
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
      NUXT_PUBLIC_SITE_URL: process.env.NUXT_PUBLIC_SITE_URL,
      NUXT_PUBLIC_STRAPI_TOKEN: process.env.NUXT_PUBLIC_STRAPI_TOKEN,
      emailjsServiceId: process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID,
      emailjsPublicKey: process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      emailjsContactTemplateId: process.env.NUXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
      emailjsBookingTemplateId: process.env.NUXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID
    }
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  },

  swiper: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    modules: ["autoplay"]
  },

  i18n: {
    detectBrowserLanguage: false,
    strategy: "prefix",
    defaultLocale: "en",
    locales: [
      { code: "ka", name: "Ka", iso: "ka-KA", file: 'ka.json' },
      { code: "en", name: "En", iso: "en-EN", file: 'en.json' },
    ],
    langDir: 'locales/'
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  fonts: {
    families: [
      { name: 'Noto Sans Georgian', provider: 'google' }
    ]
  },
})