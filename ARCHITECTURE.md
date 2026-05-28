# StartMessaging — Astro Site Architecture

> **This is the living architecture document.** Update it when decisions change.  
> AI agents working on this codebase must read this before making any structural decisions.

---

## Overview

A fully static, SEO-first international site for WhatsApp business services.  
Built with **Astro Content Collections + built-in i18n routing**.  
No Sanity, no CMS dashboard, no server runtime.

```
Content (JSON manifests + MDX)
  → Astro build (getStaticPaths + ComponentRenderer)
    → Static HTML per locale per page
      → Vercel / Cloudflare Pages CDN
```

---

## Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Astro (`output: 'static'`) | Max SEO, zero server cost |
| Content | Astro Content Collections (local JSON + MDX) | Git-native, no infra, type-safe |
| i18n | Astro built-in i18n + inline locale maps | No external plugin, zero runtime |
| Hosting | Vercel or Cloudflare Pages | Free tier, global CDN, git deploy |
| Styling | Tailwind CSS | Utility-first, consistent tokens |

---

## Folder Structure

```
astro-website/
  src/
    content/
      pages/                        ← JSON page manifests (mirrors URL structure)
        home.json                   →  /
        pricing.json                →  /pricing
        whatsapp/
          index.json                →  /whatsapp
          bulk-messaging.json       →  /whatsapp/bulk-messaging
          business-api.json         →  /whatsapp/business-api
          chatbots.json             →  /whatsapp/chatbots
        sms/
          index.json                →  /sms  (locales: ["us","uk"])
          campaigns.json            →  /sms/campaigns
      blog/
        en/
          getting-started.mdx
          whatsapp-api-guide.mdx
        hi/
          getting-started.mdx
        es/
          getting-started.mdx

    pages/
      [lang]/
        [...slug].astro             ← SINGLE dynamic route for all static pages
      blog/
        [lang]/
          [slug].astro              ← Blog post route

    components/
      componentMap.ts               ← Registry: type string → Astro component
      ComponentRenderer.astro       ← Recursive dispatcher
      sections/                     ← Top-level page sections
        HeroSection.astro
        FeaturesGrid.astro
        PricingCard.astro
        CtaBlock.astro
        ...
      cards/                        ← Leaf-level card components
        FeatureCard.astro
        StatsCard.astro
        ...
      layouts/                      ← Compound layout components
        TwoColumn.astro
        ThreeGrid.astro
        ...
      blog/
        ArticleLayout.astro
        TableOfContents.astro
        ArticleBody.astro
      ui/                           ← Primitives (Container, Stack, Heading, etc.)
        Container.astro
        Section.astro
        Heading.astro

    i18n/
      r.ts                          ← The single resolve helper: r(val, lang)
      global/
        en.json                     ← Nav, footer, common button labels
        hi.json
        es.json
        pt-BR.json

    layouts/
      BaseLayout.astro              ← <head>, nav, footer
      BlogLayout.astro              ← sidebar TOC + article chrome

    styles/
      globals.css
```

---

## Routing

### Layout groups (the Astro equivalent of Next.js route groups)

Different page files = different layouts. The folder prefix in the URL determines which layout applies.  
There is no `(group)/layout.tsx` syntax — the separation is explicit: one file per layout group.

```
src/pages/
  index.astro                 →  /                        MarketingLayout
  [...slug].astro             →  /pricing, /whatsapp/…    MarketingLayout
  [lang]/
    index.astro               →  /hi/  /es/               MarketingLayout
    [...slug].astro           →  /hi/pricing, …           MarketingLayout
  blog/
    [slug].astro              →  /blog/some-post          BlogLayout (sidebar TOC)
    [lang]/
      [slug].astro            →  /hi/blog/some-post       BlogLayout
  lp/
    [...slug].astro           →  /lp/campaign-name        MinimalLayout (no nav/footer)
    [lang]/
      [...slug].astro         →  /hi/lp/campaign-name     MinimalLayout
```

**Nav data** lives in `src/i18n/global/nav.json` with locale maps — loaded at build time in `MarketingLayout.astro`. Not hardcoded in the layout file.

### Home page

Home is handled by dedicated `index.astro` files — not through the dynamic `[...slug]` route.

```
src/pages/index.astro           →  /         (English, no prefix)
src/pages/[lang]/index.astro    →  /hi/  /es/  etc.
```

Both import their content from `content/pages/home.json`.

### Marketing static pages

The `[...slug].astro` files handle all non-home marketing pages for their respective locales.

`getStaticPaths()` reads JSON manifests, checks each manifest's `locales[]`, and emits only the allowed combinations:

```typescript
// src/pages/[lang]/[...slug].astro  (non-English)
export async function getStaticPaths() {
  const pages = await getCollection('pages');
  return pages.flatMap((page) => {
    const slug = page.id.replace(/\.json$/, '');
    if (slug === 'home') return [];   // home has its own route files

    const allowedLocales = (page.data.locales ?? ALL_LOCALES)
      .filter(l => l !== 'en');       // English handled by [...slug].astro without [lang]

    return allowedLocales.map((lang) => ({
      params: { lang, slug },
      props: { page, lang },
    }));
  });
}
```

### URL examples

```
content/pages/ file              locales[]           Built URLs
────────────────────────────────────────────────────────────────────────────
home.json                        (all)               /
                                                     /hi/
                                                     /es/

pricing.json                     (all)               /pricing
                                                     /hi/pricing
                                                     /es/pricing

whatsapp/index.json              (all)               /whatsapp
                                                     /hi/whatsapp
                                                     /es/whatsapp

whatsapp/bulk-messaging.json     ["en","hi"]         /whatsapp/bulk-messaging
                                                     /hi/whatsapp/bulk-messaging
                                                     (es: NOT built)

whatsapp/business-api.json       ["en","hi","es"]    /whatsapp/business-api
                                                     /hi/whatsapp/business-api
                                                     /es/whatsapp/business-api

sms/campaigns.json               ["en","en-GB"]      /sms/campaigns
                                                     /en-GB/sms/campaigns
```

### URL structure config

English gets no prefix. All other locales are prefixed. Configured in `astro.config.mjs`:

```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'hi', 'es', 'pt-BR'],
  routing: { prefixDefaultLocale: false }
}
```

### Blog Routes

```
src/pages/blog/[slug].astro           →  /blog/[slug]       (English)
src/pages/blog/[lang]/[slug].astro    →  /hi/blog/[slug]    (other locales)
```

MDX files live in `content/blog/{lang}/{slug}.mdx`. Each language is a separate file — no fallback between them.

---

## Page Manifest Format

Every page is a JSON file in `content/pages/`. The folder path mirrors the URL.

```json
{
  "slug": "whatsapp/bulk-messaging",
  "locales": ["en", "hi", "es"],

  "seo": {
    "title":       { "en": "WhatsApp Bulk Messaging", "hi": "..." },
    "description": { "en": "Send to thousands at once.", "hi": "..." },
    "ogImage":     "/og/whatsapp-bulk.png"
  },

  "sections": [
    {
      "type": "hero",
      "props": {
        "title": { "en": "Reach thousands on WhatsApp", "hi": "..." },
        "subtitle": { "en": "Broadcast at scale with delivery receipts." },
        "image": "/images/hero-bulk.png"
      }
    },
    {
      "type": "featuresGrid",
      "locales": ["en", "hi"],
      "props": {
        "heading": { "en": "Why use Bulk Messaging?", "hi": "..." },
        "items": [
          {
            "icon": "broadcast",
            "title": { "en": "Instant delivery", "hi": "तुरंत डिलीवरी" },
            "description": { "en": "Messages reach users in seconds.", "hi": "..." }
          },
          {
            "icon": "chart",
            "title": { "en": "Real-time analytics", "hi": "..." },
            "description": { "en": "Track opens, clicks, and replies.", "hi": "..." }
          }
        ]
      }
    },
    {
      "type": "twoColumn",
      "props": {
        "children": [
          {
            "type": "statsCard",
            "props": { "value": "99.9%", "label": { "en": "Delivery rate" } }
          },
          {
            "type": "ctaBlock",
            "props": {
              "heading": { "en": "Ready to start?" },
              "buttonLabel": { "en": "Try Free" },
              "href": "/signup"
            }
          }
        ]
      }
    }
  ]
}
```

### Locale restriction rules

| Field | Scope | Effect |
|---|---|---|
| `locales` on page root | Page | Only these locales get built. Page doesn't exist elsewhere. |
| `locales` on section | Section | Section is filtered out at render time for other locales. |
| No `locales` field | Either | Inherits parent rule (all allowed locales). |

---

## i18n — How Locale Flows

### 1. Locale comes from the URL

```
/hi/whatsapp/bulk-messaging  →  lang = "hi"
/whatsapp/bulk-messaging     →  lang = "en"  (default, no prefix)
```

### 2. `lang` is passed as a prop through the component tree

```
[...slug].astro
  └── ComponentRenderer.astro  (lang={lang})
        └── HeroSection.astro  (lang={lang})
        └── FeaturesGrid.astro (lang={lang})
              └── ComponentRenderer.astro  (lang={lang})  ← compound children
                    └── FeatureCard.astro  (lang={lang})
```

### 3. Each component resolves its own props with `r()`

```typescript
// src/i18n/r.ts
type Localizable = string | Record<string, string>;

export const r = (val: Localizable | undefined, lang: string): string => {
  if (!val) return '';
  return typeof val === 'string' ? val : (val[lang] ?? val['en'] ?? '');
};
```

Usage in any component:

```astro
---
import { r } from '@/i18n/r';
const { title, image, lang } = Astro.props;
---
<h1>{r(title, lang)}</h1>
<img src={image} />    <!-- plain scalar: no r() needed -->
```

No central resolver loop. Each component is explicit about what it resolves.

### 4. Global/shared strings (nav, footer, common labels)

```typescript
// src/i18n/t.ts
import en from './global/en.json';
import hi from './global/hi.json';

const dicts: Record<string, Record<string, string>> = { en, hi };

export const t = (key: string, lang: string): string =>
  dicts[lang]?.[key] ?? dicts['en']?.[key] ?? key;
```

---

## Component System

### Component Map

All renderable component types are registered in one place:

```typescript
// src/components/componentMap.ts
import HeroSection      from './sections/HeroSection.astro';
import FeaturesGrid     from './sections/FeaturesGrid.astro';
import PricingCard      from './sections/PricingCard.astro';
import CtaBlock         from './sections/CtaBlock.astro';
import FeatureCard      from './cards/FeatureCard.astro';
import StatsCard        from './cards/StatsCard.astro';
import TwoColumn        from './layouts/TwoColumn.astro';
import ThreeGrid        from './layouts/ThreeGrid.astro';

export const componentMap: Record<string, any> = {
  hero:         HeroSection,
  featuresGrid: FeaturesGrid,
  pricingCard:  PricingCard,
  ctaBlock:     CtaBlock,
  featureCard:  FeatureCard,
  statsCard:    StatsCard,
  twoColumn:    TwoColumn,
  threeGrid:    ThreeGrid,
};
```

### ComponentRenderer (the dispatcher)

```astro
---
// src/components/ComponentRenderer.astro
import { componentMap } from './componentMap';

interface Props {
  type: string;
  props: Record<string, unknown>;
  lang: string;
  locales?: string[];
}

const { type, props, lang, locales } = Astro.props;

// Section-level locale restriction
const allowed = !locales || locales.includes(lang);
const Component = componentMap[type];
---

{allowed && Component && <Component {...props} lang={lang} />}
{allowed && !Component && <p style="color:red">Unknown component: {type}</p>}
```

### Compound components

Any component can contain child component configs in its props.  
Layout components (`TwoColumn`, `ThreeGrid`) render their children via `ComponentRenderer`:

```astro
---
// src/components/layouts/TwoColumn.astro
import ComponentRenderer from '../ComponentRenderer.astro';
const { children, lang, gap = 16 } = Astro.props;
---
<div class={`grid grid-cols-1 md:grid-cols-2 gap-${gap}`}>
  {children?.map((child: any) => (
    <ComponentRenderer type={child.type} props={child.props} lang={lang} />
  ))}
</div>
```

JSON for compound usage:

```json
{
  "type": "twoColumn",
  "props": {
    "gap": 24,
    "children": [
      { "type": "statsCard", "props": { "value": "10M+", "label": { "en": "Messages sent" } } },
      { "type": "featureCard", "props": { "title": { "en": "Broadcasts" }, "icon": "broadcast" } }
    ]
  }
}
```

### Props are intentionally untyped

Components accept `Record<string, unknown>`. Each component destructures what it needs:

```astro
---
const { title, badge, variant, className, lang } = Astro.props;
// variant, badge, className are all valid — component decides what to do with them
---
<div class={`card ${variant === 'highlighted' ? 'ring-2 ring-accent' : ''} ${className ?? ''}`}>
```

This keeps the JSON flexible — pass `className`, `variant`, `badge`, `size` etc. without changing a schema.

---

## Blog / Articles

### Storage

```
src/content/blog/
  en/
    whatsapp-api-guide.mdx
    bulk-messaging-tips.mdx
  hi/
    whatsapp-api-guide.mdx   ← translated version of same slug
  es/
    whatsapp-api-guide.mdx
```

### Frontmatter

```yaml
---
title: "Complete Guide to WhatsApp Business API"
description: "Everything you need to know..."
publishedAt: 2026-05-01
author: "StartMessaging Team"
tags: ["whatsapp", "api", "guide"]
ogImage: "/og/whatsapp-api-guide.png"
---
```

### Sidebar Table of Contents

Astro provides `getHeadings()` on every MDX entry — returns `[{ depth, slug, text }]`.  
Render a sticky `<nav>` from this in `BlogLayout.astro`. No plugin needed.

```astro
---
// src/layouts/BlogLayout.astro
const { headings } = Astro.props;
const tocHeadings = headings.filter(h => h.depth === 2 || h.depth === 3);
---
<aside class="sticky top-24 hidden lg:block w-56 shrink-0">
  <nav>
    <p class="text-xs font-semibold uppercase tracking-wide text-muted mb-3">Contents</p>
    <ul class="space-y-1">
      {tocHeadings.map(h => (
        <li class={h.depth === 3 ? 'pl-3' : ''}>
          <a href={`#${h.slug}`} class="text-sm text-muted hover:text-foreground">{h.text}</a>
        </li>
      ))}
    </ul>
  </nav>
</aside>
```

---

## Content Collection Schema

> **Modern API (Astro v4+):** Config file is `src/content.config.ts` (not `src/content/config.ts`).  
> Import `z` from `astro/zod`, and use `loader: glob(...)` / `loader: file(...)`.  
> Run `astro dev` after changing the schema to re-sync the `.astro/` type layer.

```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const LocalizedString = z.union([z.string(), z.record(z.string())]);

const componentConfig = z.object({
  type: z.string(),
  locales: z.array(z.string()).optional(),
  props: z.record(z.unknown()),   // intentionally loose — see Component System
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    locales: z.array(z.string()).optional(),
    seo: z.object({
      title:       LocalizedString,
      description: LocalizedString,
      ogImage:     z.string().optional(),
    }),
    sections: z.array(componentConfig),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    lang: z.string().optional(),   // "en" | "hi" | "es" — for blog files without lang subfolders
  }),
});

export const collections = { pages, blog };
```

**IDE autocomplete for page JSON files:** Astro auto-generates JSON schemas to `.astro/collections/pages.schema.json`.  
Add to `.vscode/settings.json` to get intellisense in all page manifests:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["/src/content/pages/**/*.json"],
      "url": "./.astro/collections/pages.schema.json"
    }
  ]
}
```

---

## International SEO

> Every item in this section is **mandatory** for an international SEO site.  
> Missing any one of them can cause Google to index the wrong locale or ignore alternate versions.

### Required integrations

Install with `astro add` (not by editing `package.json` directly):

```bash
npx astro add sitemap
```

### `astro.config.mjs` — required fields

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://startmessaging.com',   // REQUIRED — canonical origin, used everywhere
  output: 'static',
  integrations: [
    sitemap({
      // Tells the sitemap to emit xhtml:link alternate tags for every locale
      i18n: {
        defaultLocale: 'en',
        locales: {
          en:     'en-US',
          hi:     'hi-IN',
          es:     'es-ES',
          'pt-BR': 'pt-BR',
        },
      },
      // Blog changes frequently; pages change rarely
      serialize(item) {
        if (/\/blog\//.test(item.url)) item.changefreq = 'weekly';
        else item.changefreq = 'monthly';
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi', 'es', 'pt-BR'],
    routing: { prefixDefaultLocale: false },
  },
});
```

### Locale → language code map

Used for `hreflang`, `og:locale`, and `<html lang>`. Keep one source of truth:

```typescript
// src/i18n/locales.ts
export const ALL_LOCALES = ['en', 'hi', 'es', 'pt-BR'] as const;
export type Locale = typeof ALL_LOCALES[number];

// BCP 47 codes for hreflang and og:locale
export const HREFLANG: Record<Locale, string> = {
  en:     'en-US',
  hi:     'hi-IN',
  es:     'es-ES',
  'pt-BR': 'pt-BR',
};

// og:locale uses underscores
export const OG_LOCALE: Record<Locale, string> = {
  en:     'en_US',
  hi:     'hi_IN',
  es:     'es_ES',
  'pt-BR': 'pt_BR',
};
```

### `<head>` — what every page must emit

All of this lives in `BaseLayout.astro`. The page manifest's `seo{}` block and `locales[]` array drive everything automatically.

```astro
---
// src/layouts/BaseLayout.astro
import { getRelativeLocaleUrl } from 'astro:i18n';
import { r } from '@/i18n/r';
import { HREFLANG, OG_LOCALE, ALL_LOCALES } from '@/i18n/locales';

interface Props {
  seo: { title: any; description: any; ogImage?: string };
  lang: string;
  pageLocales: string[];  // from page manifest locales[] — only build hreflang for pages that exist
  slug: string;           // e.g. "whatsapp/bulk-messaging"
}

const { seo, lang, pageLocales, slug } = Astro.props;

const canonicalURL   = new URL(Astro.url.pathname, Astro.site);
const title          = r(seo.title, lang);
const description    = r(seo.description, lang);
const ogImage        = seo.ogImage ? new URL(seo.ogImage, Astro.site).href : undefined;

// hreflang: only for locales this page actually exists in (driven by locales[])
const hreflangLinks = pageLocales.map(locale => ({
  hreflang: HREFLANG[locale as keyof typeof HREFLANG] ?? locale,
  href: new URL(getRelativeLocaleUrl(locale, slug), Astro.site).href,
}));
---

<html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Primary SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- hreflang: tell Google about all locale versions of this page -->
    {hreflangLinks.map(l => (
      <link rel="alternate" hreflang={l.hreflang} href={l.href} />
    ))}
    <!-- x-default: points to English (or a language selector if you build one) -->
    <link rel="alternate" hreflang="x-default"
      href={new URL(getRelativeLocaleUrl('en', slug), Astro.site).href} />

    <!-- Open Graph -->
    <meta property="og:type"        content="website" />
    <meta property="og:title"       content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url"         content={canonicalURL} />
    <meta property="og:locale"      content={OG_LOCALE[lang as keyof typeof OG_LOCALE] ?? lang} />
    {hreflangLinks
      .filter(l => l.hreflang !== HREFLANG[lang as keyof typeof HREFLANG])
      .map(l => <meta property="og:locale:alternate" content={l.hreflang.replace('-','_')} />)
    }
    {ogImage && <meta property="og:image" content={ogImage} />}

    <!-- Twitter / X card -->
    <meta name="twitter:card"        content="summary_large_image" />
    <meta name="twitter:title"       content={title} />
    <meta name="twitter:description" content={description} />
    {ogImage && <meta name="twitter:image" content={ogImage} />}

    <!-- Sitemap discovery -->
    <link rel="sitemap" href="/sitemap-index.xml" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

**The key insight:** `pageLocales` comes directly from the page manifest's `locales[]`. Pages restricted to `["en", "hi"]` will only emit `hreflang` tags for those two locales — no broken alternate links pointing to pages that don't exist.

### Blog article `<head>` additions

Blog posts additionally need `Article` structured data and `og:type = article`:

```astro
<!-- Inside BlogLayout.astro <head> -->
<meta property="og:type"              content="article" />
<meta property="article:published_time" content={publishedAt.toISOString()} />
{updatedAt && <meta property="article:modified_time" content={updatedAt.toISOString()} />}
{tags?.map(tag => <meta property="article:tag" content={tag} />)}

<!-- JSON-LD: Article structured data -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "datePublished": publishedAt.toISOString(),
  "dateModified": (updatedAt ?? publishedAt).toISOString(),
  "author": { "@type": "Organization", "name": "StartMessaging" },
  "publisher": {
    "@type": "Organization",
    "name": "StartMessaging",
    "url": Astro.site?.href
  },
  "url": canonicalURL.href,
  ...(ogImage ? { "image": ogImage } : {}),
})} />
```

### JSON-LD for marketing pages

Add to `BaseLayout.astro` for all pages:

```astro
<!-- Organization structured data — on every page -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "StartMessaging",
  "url": Astro.site?.href,
  "sameAs": [
    "https://twitter.com/startmessaging",
    "https://linkedin.com/company/startmessaging"
  ]
})} />

<!-- WebPage on every static page -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": title,
  "description": description,
  "url": canonicalURL.href,
  "inLanguage": HREFLANG[lang] ?? lang,
})} />
```

Add a `FAQPage` schema in the page manifest's `seo` block when the page has a FAQ section:

```json
"seo": {
  "title": { "en": "WhatsApp Bulk Messaging" },
  "description": { "en": "..." },
  "jsonLd": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is WhatsApp bulk messaging?",
        "acceptedAnswer": { "@type": "Answer", "text": "..." }
      }
    ]
  }
}
```

`BaseLayout` renders any `seo.jsonLd` block as an additional JSON-LD script tag.

### `robots.txt` — dynamic (reads `site` from config)

```typescript
// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL.href}`
  );
};
```

### SEO checklist per page

When adding a new page manifest, verify:

- [ ] `seo.title` — LocalizedString, all locales filled
- [ ] `seo.description` — LocalizedString, 120–160 chars in English
- [ ] `seo.ogImage` — 1200×630px image at `/og/{slug}.png`
- [ ] `locales[]` — only locales where the page is actually translated
- [ ] If page has FAQ section → add `seo.jsonLd` with `FAQPage` schema
- [ ] Blog posts → `publishedAt` date set correctly

---

## Adding a New Page

1. Create `src/content/pages/[path/to/page].json`
2. Add `locales[]` if restricted, otherwise it appears in all locales
3. Compose sections from existing component types
4. No code changes needed unless a new component type is required

## Adding a New Component Type

1. Create `src/components/{category}/MyComponent.astro`
2. Register it in `src/components/componentMap.ts`
3. Document example JSON in a comment at the top of the component file

## Adding a New Locale

1. Add locale to `astro.config.mjs` `i18n.locales[]`
2. Add locale to `sitemap({ i18n: { locales: {...} } })` in `astro.config.mjs`
3. Add entry to `HREFLANG` and `OG_LOCALE` maps in `src/i18n/locales.ts`
4. Add `{lang}.json` to `src/i18n/global/`
5. Add locale to `locales[]` in relevant page manifests
6. Fill in all locale map values in those page manifests (build warning fires if you miss any)
7. Translate MDX blog files for that locale (optional — blog can stay English-only)

---

## AI Development Guidelines

When using AI tools (Cursor agents, etc.) to build on this codebase:

- **Use `astro add` for integrations.** Never edit `package.json` directly for Astro integrations. Example: `npx astro add tailwind`, `npx astro add sitemap`.
- **Verify current Astro APIs.** Content collections, i18n routing, and actions have changed significantly between versions. The current patterns are documented in this file. Check [docs.astro.build](https://docs.astro.build) for anything not covered here.
- **Content config file is `src/content.config.ts`.** The old `src/content/config.ts` path is no longer used. Import `z` from `astro/zod`.
- **Use `getRelativeLocaleUrl()` from `astro:i18n`** for all locale-aware links — never construct `/lang/path` strings manually.
- **All new section types need:** schema update in `content.config.ts`, component file, registration in `componentMap.ts`.
- **Never skip the SEO checklist** when adding a new page manifest.

---

## Documentation Pages (WhatsApp / SMS Docs)

Documentation pages share the same JSON + component architecture but need three additional things: a sidebar navigation tree, prev/next page navigation, and a `DocsLayout` that wraps all doc pages.

### Route structure

```
src/pages/
  docs/
    [product]/
      [...slug].astro          → /docs/whatsapp/getting-started  (English)
    [lang]/
      [product]/
        [...slug].astro        → /pt-BR/docs/whatsapp/getting-started
```

The `[product]` segment (`whatsapp`, `sms`) allows per-product sidebars and locale restrictions (e.g., SMS docs only for `["en", "en-GB"]`).

### Content structure

```
src/content/
  docs/
    whatsapp/
      nav.json                 ← sidebar structure + page order
      getting-started.mdx
      authentication.mdx
      send-message.mdx
      webhooks.mdx
    sms/
      nav.json
      getting-started.mdx      (locales: ["en", "en-GB"] only)
```

### `nav.json` — sidebar + page order

This single file drives the sidebar render AND the prev/next navigation. Order in the file = order of navigation.

```json
{
  "product": "whatsapp",
  "locales": ["en", "pt-BR"],
  "sections": [
    {
      "title": { "en": "Getting Started", "pt-BR": "Primeiros Passos" },
      "pages": [
        { "slug": "getting-started",  "title": { "en": "Introduction",    "pt-BR": "Introdução" } },
        { "slug": "authentication",   "title": { "en": "Authentication",  "pt-BR": "Autenticação" } },
        { "slug": "quick-start",      "title": { "en": "Quick Start",     "pt-BR": "Início Rápido" } }
      ]
    },
    {
      "title": { "en": "API Reference", "pt-BR": "Referência da API" },
      "pages": [
        { "slug": "send-message",     "title": { "en": "Send Message",    "pt-BR": "Enviar Mensagem" } },
        { "slug": "webhooks",         "title": { "en": "Webhooks",        "pt-BR": "Webhooks" } },
        { "slug": "message-templates","title": { "en": "Templates",       "pt-BR": "Modelos" } }
      ]
    }
  ]
}
```

### Prev/Next — computed from nav order, not stored in content

At build time, `getStaticPaths()` reads `nav.json`, flattens all pages into an ordered array, and computes prev/next for each page automatically. **Never hardcode prev/next in MDX frontmatter.**

```typescript
// In docs/[product]/[...slug].astro
export async function getStaticPaths() {
  const nav = await getEntry('docs-nav', 'whatsapp/nav');
  const allPages = nav.data.sections.flatMap((s) => s.pages);

  return allPages.map((page, idx) => ({
    params: { product: 'whatsapp', slug: page.slug },
    props: {
      slug: page.slug,
      prev: allPages[idx - 1] ?? null,
      next: allPages[idx + 1] ?? null,
      nav: nav.data,
    },
  }));
}
```

### `DocsLayout.astro` structure

```
DocsLayout
├── BaseLayout          ← SEO head (same as all pages)
│   └── MarketingLayout nav (sticky top nav)
│       ├── DocsSidebar ← rendered from nav.json sections
│       │   ├── Section heading (localized)
│       │   └── Page links (active state on current slug)
│       ├── DocsContent ← MDX body via <slot />
│       │   ├── Article heading (from frontmatter)
│       │   ├── <slot /> — MDX rendered with .prose styles
│       │   └── PrevNextNav ← prev/next from getStaticPaths props
│       └── (optional) TableOfContents ← from entry.getHeadings()
```

### MDX frontmatter for doc pages

```yaml
---
title: "Send a WhatsApp Message"
description: "How to send your first message via the REST API."
publishedAt: 2026-05-01
---
```

Prev/next titles come from `nav.json`, not frontmatter — so renaming a page in the nav updates navigation labels everywhere without touching MDX files.

---

## Decisions Log

| Decision | Choice | Reason |
|---|---|---|
| Section reuse (CTA, contact on every page) | Duplicate in each page JSON | Page JSON is single source of truth. Simple, explicit, greppable. |
| Missing translation fallback | Build warning + fallback to English | Errors would block launches; silent is too risky. Warn is the right middle ground. |
| Nav / footer data | `src/i18n/global/nav.json` with locale maps | Locale-aware, editable without touching layout code. |
| Layout groups | Separate page files per route group | Astro equivalent of Next.js route groups — explicit and clear. |
| Rich text in sections | Array of paragraph strings | Safe, translatable, no HTML injection. Upgrade to MDX reference if needed later. |

## Open Questions

None currently. All blocking decisions are resolved.
