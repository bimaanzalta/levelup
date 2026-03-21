// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    configPath: 'tailwind.config.js',
    cssPath: '~/assets/css/main.css',
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'levelup-secret-key',
    public: {
      appName: 'LevelUp',
      appUrl: process.env.APP_URL || 'http://localhost:3000',
    },
  },

  nitro: {
    externals: {
      external: ['@prisma/client', '.prisma/client'],
    },
    rollupConfig: {
      output: {
        hoistTransitiveImports: false,
      },
    },
  },

  typescript: {
    strict: true,
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lenis',
      ],
    },
  },
})
