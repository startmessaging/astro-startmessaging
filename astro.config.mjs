// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { readFileSync, readdirSync } from 'fs';
import vercel from '@astrojs/vercel';

const __dirname = dirname(fileURLToPath(import.meta.url));

import mdx from '@astrojs/mdx';

/* ------------------------------------------------------------------ */
/*  Content date map — built once at config-load time (sync fs reads) */
/* ------------------------------------------------------------------ */

const SITE = 'https://startmessaging.com';
const ALL_COUNTRIES = ['in', 'br', 'mx', 'id', 'ae', 'tr', 'ng'];
const DEFAULT_COUNTRY = 'in';

/**
 * Reads every page JSON and blog MDX to build a Map<urlPath, YYYY-MM-DD>.
 * urlPath is the pathname without leading/trailing slashes, e.g. "br/pricing".
 */
function buildContentDateMap() {
  /** @type {Map<string, string>} */
  const dateMap = new Map();

  // --- Pages (JSON manifests) ---
  const pagesDir = resolve(__dirname, 'src/content/pages');

  /** @param {string} dir  @param {string} prefix */
  function readPages(dir, prefix = '') {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        readPages(fullPath, prefix + entry.name + '/');
        continue;
      }
      if (!entry.name.endsWith('.json')) continue;

      const json = JSON.parse(readFileSync(fullPath, 'utf-8'));
      if (!json.updatedAt) continue;

      const rawSlug = (prefix + entry.name.replace('.json', '')).replace(/\/index$/, '');
      const pageSlug = rawSlug === 'home' ? '' : rawSlug;
      const countries = json.countries || ALL_COUNTRIES;

      for (const c of countries) {
        const urlPath =
          c === DEFAULT_COUNTRY
            ? pageSlug                                    // '' or 'pricing'
            : pageSlug ? `${c}/${pageSlug}` : c;          // 'br' or 'br/pricing'
        dateMap.set(urlPath, json.updatedAt);
      }
    }
  }

  // --- Blogs (MDX frontmatter) ---
  const blogDir = resolve(__dirname, 'src/content/blog');

  /** @param {string} dir */
  function readBlogs(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = resolve(dir, entry.name);
      if (entry.isDirectory()) { readBlogs(fullPath); continue; }
      if (!/\.(md|mdx)$/.test(entry.name)) continue;

      const content = readFileSync(fullPath, 'utf-8');
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!fmMatch) continue;
      const fm = fmMatch[1];

      const updatedAt  = fm.match(/^updatedAt:\s*"?([^"\n]+)"?/m);
      const publishedAt = fm.match(/^publishedAt:\s*"?([^"\n]+)"?/m);
      const countryM   = fm.match(/^country:\s*"?([^"\n]+)"?/m);

      const date    = updatedAt?.[1] || publishedAt?.[1];
      const country = countryM?.[1];
      const slug    = entry.name.replace(/\.(md|mdx)$/, '');

      if (!date || !country) continue;

      const urlPath =
        country === DEFAULT_COUNTRY
          ? `blog/${slug}`
          : `${country}/blog/${slug}`;
      dateMap.set(urlPath, date);
    }
  }

  readPages(pagesDir);
  readBlogs(blogDir);

  return dateMap;
}

const contentDateMap = buildContentDateMap();
const todayStr = new Date().toISOString().split('T')[0];
const todayCount = [...contentDateMap.values()].filter((d) => d === todayStr).length;
console.log(`📅 Content date map: ${contentDateMap.size} URLs mapped, ${todayCount} modified today (${todayStr})`);

/* ------------------------------------------------------------------ */

/**
 * Country-routed Astro config.
 * Per ASTRO_COUNTRY_PLAN.md §3 + §13.
 *
 * - output: 'static' — all content pages prerendered, api/geo + api/indexnow server-rendered
 * - No Astro i18n config — country is a normal path param
 * - Sitemap with 7-country hreflang map, lastmod from content dates
 * - Vercel adapter for the /api/geo edge endpoint
 */
export default defineConfig({
  site: SITE,

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
        defaultLocale: 'in',
        locales: {
          in: 'en-IN',
          br: 'pt-BR',
          mx: 'es-MX',
          id: 'id-ID',
          ae: 'ar-AE',
          tr: 'tr-TR',
          ng: 'en-NG',
        },
      },
      /** @param {any} item */
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/^\/|\/$/g, '');
        const dateStr = contentDateMap.get(path);

        if (dateStr) {
          item.lastmod = new Date(dateStr).toISOString();
        }

        if (/\/blog\//.test(item.url)) {
          item.changefreq = 'weekly';
          item.priority = 0.7;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.5;
        }
        return item;
      },
    }),
    mdx(),
    // IndexNow: submit only URLs whose content was modified today
    {
      name: 'indexnow-submit',
      hooks: {
        'astro:build:done': async () => {
          // Vercel sets VERCEL=1 during remote builds; skip local npm run build
          if (process.env.VERCEL !== '1') return;

          const { submitToIndexNow } = await import('./src/lib/indexnow.ts');
          const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

          const urlsToSubmit = [];
          for (const [path, dateStr] of contentDateMap) {
            if (dateStr === today) {
              urlsToSubmit.push(path ? `${SITE}/${path}` : `${SITE}/`);
            }
          }

          if (urlsToSubmit.length === 0) {
            console.log('ℹ️  No content modified today — skipping IndexNow submission');
            return;
          }

          console.log(`📡 Submitting ${urlsToSubmit.length} modified-today URLs to IndexNow…`);

          try {
            const result = await submitToIndexNow(urlsToSubmit);
            if (result.success) {
              console.log('✅ IndexNow:', result.message);
            } else {
              console.warn('⚠️  IndexNow failed:', result.message);
            }
          } catch (error) {
            console.error('❌ IndexNow error:', error);
          }
        },
      },
    },
  ],
});
