// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import vercel from '@astrojs/vercel';

const __dirname = dirname(fileURLToPath(import.meta.url));

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

/**
 * Country-routed Astro config.
 * Per ASTRO_COUNTRY_PLAN.md §3 + §13.
 *
 * - output: 'hybrid' — all content pages prerendered (static) by default, api/geo dynamic
 * - No Astro i18n config — country is a normal path param
 * - Sitemap with 7-country hreflang map
 * - Vercel adapter for the /api/geo edge endpoint
 */
export default defineConfig({
  site: 'https://startmessaging.com',

  output: 'static',
  adapter: vercel({
    edgeMiddleware: false,
  }),

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en-IN',
        locales: {
          'en-IN': 'en-IN',
          'pt-BR': 'pt-BR',
          'es-MX': 'es-MX',
          'id-ID': 'id-ID',
          'ar-AE': 'ar-AE',
          'tr-TR': 'tr-TR',
          'en-NG': 'en-NG',
        },
      },
      serialize(item) {
        if (/\/blog\//.test(item.url)) item.changefreq = 'weekly';
        else item.changefreq = 'monthly';
        return item;
      },
    }),
    mdx(),
    react(),
  ],

  // No i18n config — country routing is handled by [country]/ path param
  // in src/pages/[country]/index.astro and [country]/[...slug].astro
});