// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://startmessaging.com',

  output: 'static',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  },

  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        en:      'en-US',
        'pt-br': 'pt-BR',   // URL key lowercase, BCP 47 value correct
      },
    },
    serialize(item) {
      item.changefreq = /\/blog\//.test(item.url)
        ? ChangeFreqEnum.WEEKLY
        : ChangeFreqEnum.MONTHLY;
      return item;
    },
  }), mdx()],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});