# StartMessaging — AI Agent Guidelines

> **Required reading for all AI agents working on this codebase.**
> This document details the architectural conventions, coding standards, and design restrictions that must be maintained.

---

## 1. Routing Model

The website operates on a **country-routed model** (not a language/locale model):
- **India (Default):** Served at the root path (`/`, `/pricing`, `/whatsapp`). Hardcoded as `country = 'in'`.
- **Other Countries:** Served under a country-code prefix (`/br`, `/mx`, `/id`, `/ae`, `/tr`, `/ng`).
- **One JSON page manifest per route:** Adding a page = create a JSON file in `src/content/pages`.
- **No Route Duplication:** Thin route files in `src/pages` fetch pages from the content collection, matching path params and mapping them to `ComponentRenderer`.

---

## 2. Page & Section Scheme Schema

All page manifests inside `src/content/pages` use the `pages` collection schema defined in [content.config.ts](file:///c:/Users/madha/OneDrive/Desktop/New%20folder/astro-startmessaging/src/content.config.ts):
- Use `"countries": [...]` at root to limit which countries build this page (omitted = builds for all 7 countries).
- Sections are configured as objects inside the `sections` array.
- Use `"countries": [...]` on a section object to restrict rendering to specific countries (e.g., India-only SMS features vs. WhatsApp-only global features).

```json
{
  "countries": ["in", "br", "mx", "id", "ae", "tr", "ng"],
  "theme": "sms",
  "seo": {
    "title": { "en": "Features", "pt": "Recursos" },
    "description": { "en": "Explore our API features.", "pt": "Explore os recursos de API." }
  },
  "sections": [
    {
      "type": "hero",
      "countries": ["in"],
      "props": {
        "title": { "en": "SMS & WhatsApp OTP API" }
      }
    }
  ]
}
```

---

## 3. i18n Resolution Rules

Always follow the translation hierarchy in the codebase:
1. **Page Content:** Use `r(val, country)` which resolves values in this order:
   - Country override key (e.g. `br`, `mx`)
   - Country's language key (e.g. `pt`, `es` derived from country config)
   - English fallback `en`
   - First available string in the object
2. **Global Chrome:** Common text (nav labels, buttons, footer blocks) resides in `src/i18n/chrome.json`. Retrieve text using `t(key, country)`.
3. **Structured Data:** Pricing numbers and currency symbols are loaded dynamically from `src/lib/pricing.ts` using the country code as index.

---

## 4. Coding Standards

- **Strict Primitives:** Design UI sections using primitives (`Container`, `Section`, `Heading`, `Text`, `Button`, `Badge`, `Card`). Do not write inline tailwind spacing or margins if tokens are available.
- **No Animation Libraries:** Do not install or use `framer-motion` or other animation libraries. All animations must be CSS transitions or keyframes defined in `global.css`.
- **No Language Switcher:** The nav does not have a language dropdown. The language is tied directly to the country. Country switches are handled dynamically by the Apple-style `CountryNotice` client island.
- **Dynamic Endpoints:** The route `/api/geo` is edge-rendered and must explicitly declare `export const prerender = false;`.

---

## 5. Blog Posts Guidelines

- **Storage:** Blog posts are MDX files stored in folders named after their country (e.g., `src/content/blog/in/*.mdx`, `src/content/blog/br/*.mdx`).
- **Frontmatter Schema:** Must contain `title`, `description`, `publishedAt`, `country`, and `category` (one of `'tutorials', 'guides', 'comparisons', 'compliance', 'use-cases', 'business'`).
- **Canonical Overrides:** For duplicated posts across country folders, set `canonicalCountry: "in"` (or the primary country folder) on the duplicates so their canonical tag points back to the master copy.
