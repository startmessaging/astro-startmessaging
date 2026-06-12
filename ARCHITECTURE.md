# StartMessaging — Astro Site Architecture

> **This is the living architecture document.** Update it when structural decisions change.  
> AI agents working on this codebase must read this before making any structural decisions.

---

## Overview

A fully static-first, country-routed marketing website for SMS & WhatsApp business services.  
Built with **Astro Content Collections** using country-based routing (India at root `/`, other countries prefixed, e.g. `/br`, `/mx`). 

```
Content (JSON manifests + MDX)
  → Astro build (static site generation with Vercel adapter)
    → Static HTML per country per page + /api/geo Edge API
      → Vercel CDN deployment
```

---

## Stack

| Concern | Choice | Reason |
|---|---|---|
| **Framework** | Astro (`output: 'static'` + Vercel adapter) | Static-first performance, edge-based geolocation endpoint |
| **Content** | Astro Content Collections (JSON + MDX) | Type-safe schema validation, git-native editing |
| **Routing** | Country-based path parameters | Clean division of product offers and compliance by country |
| **Hosting** | Vercel CDN | Fast static asset serving, serverless edge functions |
| **Styling** | Vanilla CSS (Tailwind @theme integration) | Strict adherence to dual-theme design token system |

---

## Folder Structure

```
astro-startmessaging/
  src/
    config/
      countries.ts                  ← Single source of truth for country configurations
    content/
      pages/                        ← JSON page manifests (mirrors URL structure)
        home.json                   →  / (India), /br, /mx, /id, /ae, /tr, /ng
        pricing.json                →  /pricing, /br/pricing, etc.
        contact.json                →  /contact, /br/contact, etc.
        whatsapp/
          index.json                →  /whatsapp
          bulk-messaging.json       →  /whatsapp/bulk-messaging
      blog/
        in/                         ← Blog posts folder for India (English)
          whatsapp-guide.mdx
        br/                         ← Blog posts folder for Brazil (Portuguese)
          whatsapp-guide.mdx
    pages/
      index.astro                   ← India home page (country='in')
      [...slug].astro               ← India inner pages (country='in')
      [country]/
        index.astro                 ← Country home page (country='br'|'mx'|...)
        [...slug].astro             ← Country inner pages (country='br'|'mx'|...)
        blog/
          index.astro               ← Country blog listing
          [slug].astro              ← Country blog post viewer
      blog/
        index.astro                 ← India blog listing
        [slug].astro                ← India blog post viewer
      api/
        geo.ts                      ← Dynamic Vercel Edge API for country detection (prerender = false)
    components/
      componentMap.ts               ← Maps JSON section type strings to Astro components
      ComponentRenderer.astro       ← Resolves magic props and renders components dynamically
      sections/                     ← Astro section components (HeroSection, FeaturesGrid, etc.)
      ui/                           ← Design system primitives (Button, Section, Container)
    layouts/
      BaseLayout.astro              ← Base HTML template, handles themes, SEO, hreflangs, and JSON-LD
      MarketingLayout.astro         ← Wraps pages with country-aware Header and Footer
      BlogLayout.astro              ← Article-specific wrapping with sidebar and TOC
    i18n/
      r.ts                          ← Translation resolver helper r(val, country)
      t.ts                          ← Global chrome translation helper t(key, country)
      chrome.json                   ← Common text dictionary (Nav, Footer, buttons)
    styles/
      global.css                    ← Tailwind custom themes, brand variables, typography, and dark mode
```

---

## Country Configuration

The site is configured around **7 target countries** defined in [countries.ts](file:///c:/Users/madha/OneDrive/Desktop/New%20folder/astro-startmessaging/src/config/countries.ts). This is the single source of truth for:
- Official business language of each country
- Local currencies and symbols
- URL path prefixes
- Available services (SMS is India-only; WhatsApp is global)
- RTL layout direction (Arabic/UAE sets `dir="rtl"`)

---

## Internationalization (i18n) & Resolver

Translation is country-driven rather than language-driven:
- Content in JSON files is keyed by language codes (`"en"`, `"pt"`, `"es"`, `"id"`, `"ar"`, `"tr"`).
- Per-country overrides can be specified using the country code (e.g. `"ng"` to override English in Nigeria).
- The `r(val, country)` resolver searches in order:
  1. Per-country override key (e.g. `br`, `ng`)
  2. Language code (e.g. `pt`, `en` derived from country config)
  3. Ultimate fallback key `en`
  4. First available string in the object

---

## Routing & Page Generation

All pages are statically generated at build time using `getStaticPaths` except `/api/geo` which is serverless-rendered at the edge:
1. **India Root Pages:** `/` and `/pricing` are built by `src/pages/index.astro` and `src/pages/[...slug].astro` with `country = 'in'` hardcoded.
2. **Country-Prefixed Pages:** `/br`, `/br/pricing`, `/mx/pricing` are generated under `src/pages/[country]/` routes by iterating over `ALL_COUNTRIES` (excluding `'in'`).
3. **Product Restrictions:** Pages or sections can be excluded from other countries by setting `"countries": ["in"]` on the page manifest or section object in JSON.

---

## Geolocation Detection (Apple-Style Notice)

1. The website is 100% static and CDN-cached.
2. On page load, a lightweight client-side island `CountryNotice` triggers.
3. It makes a request to `/api/geo` which reads `x-vercel-ip-country` header and returns `{ country: "BR" }` instantly.
4. If the visitor's detected country matches a supported country different from the current URL, a clean overlay notice is shown suggesting they switch.
5. The visitor can click "Continue" (sets cookie `sm_country` and redirects) or "✕" (dismisses notice).

---

## SEO & Structured Data

- **hreflang Alternates:** Automatically generated for each page in `BaseLayout.astro` based on countries the page is enabled for.
- **Canonical URLs:** Points to the current URL. For duplicated blog posts across country folders, the duplicate lists `canonicalCountry` in its frontmatter to point canonical link to the master copy.
- **JSON-LD Schema:** Loaded dynamically from `src/lib/jsonld.ts`. Configures:
  - `Organization` and `WebSite` on home pages
  - `Service` on product detail pages
  - `FAQPage` automatically compiled from JSON FAQ sections
  - `Article` on blog posts

---

## Verification and Quality Checks

- All modifications must compile with `npm run build` cleanly.
- Type definitions and syntax must be validated via `npx astro check`.
