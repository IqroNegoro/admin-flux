// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    secret: process.env.JWT_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET,
    bot: process.env.BOT_TOKEN,
    channelId: process.env.CHANNEL_ID
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  app: {
    pageTransition: { name: 'page', mode: 'out-in', appear: true },
    head: {
      link: [
        {
          rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
        }
      ]
    }
  },
  pinia: {
    autoImports: [
      "defineStore",
      "acceptHMRUpdate",
      "storeToRefs"
    ]
  },
  imports: {
    dirs: ['stores']
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
})
