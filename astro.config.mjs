// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import vercel from '@astrojs/vercel';

const __dirname = dirname(fileURLToPath(import.meta.url));

import mdx from '@astrojs/mdx';

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
        // defaultLocale must match the URL path segment for the India root.
        // India pages live at '/' (no prefix) — 'in' is the sentinel key.
        defaultLocale: 'in',
        locales: {
          // Keys = URL path segment (must match what Astro generates in /dist)
          // Values = BCP-47 hreflang code Google uses
          in: 'en-IN',   // India root  → /
          br: 'pt-BR',   // Brazil      → /br/
          mx: 'es-MX',   // Mexico      → /mx/
          id: 'id-ID',   // Indonesia   → /id/
          ae: 'ar-AE',   // UAE         → /ae/
          tr: 'tr-TR',   // Turkey      → /tr/
          ng: 'en-NG',   // Nigeria     → /ng/
        },
      },
      /** @param {any} item */
      serialize(item) {
        // Add build-time lastmod to every URL
        item.lastmod = new Date().toISOString();
        if (/\/blog\//.test(item.url)) item.changefreq = 'weekly';
        else item.changefreq = 'monthly';
        return item;
      },
    }),
    mdx(),
  ],

  // No i18n config — country routing is handled by [country]/ path param
  // in src/pages/[country]/index.astro and [country]/[...slug].astro
});