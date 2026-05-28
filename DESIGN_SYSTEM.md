# StartMessaging — Design System

> **Single source of truth for all design decisions.**
> To rebrand or change any visual: edit `astro-startmessaging/src/styles/global.css` only.
> Components reference CSS custom properties — they update everywhere automatically.

---

## Overview

A clean, photography-light SaaS marketing system. White canvas with near-black ink for hierarchy and a single brand color carrying all primary CTAs and interactive moments.

- **Canvas:** Pure white `#ffffff` — the default background for every page.
- **Brand color:** `#ff385c` (placeholder — swap here when brand color is finalized).
- **Type:** Inter variable font, modest weights. Display headlines at 500–700, body at 400.
- **Shape language:** Soft. Buttons at 8px radius, cards at 14px, pills fully rounded.
- **Elevation:** Single shadow tier. Either the card shadow or nothing.
- **Spacing:** 4px base unit. Sections breathe at 64px vertical padding.

---

## Colors

### Brand
| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#ff385c` | All primary CTAs, brand links, interactive accent |
| `--color-primary-active` | `#e00b41` | Pressed / hover state of primary |
| `--color-primary-disabled` | `#ffd1da` | Disabled CTA background |
| `--color-on-primary` | `#ffffff` | Text on primary-colored surfaces |

### Surfaces
| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#ffffff` | Default page floor |
| `--color-surface-soft` | `#f7f7f7` | Stats bar, disabled fields, hover fills |
| `--color-surface-strong` | `#f2f2f2` | Icon button surfaces, stronger divider fills |

### Text
| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#222222` | Headlines, primary nav, default text |
| `--color-body` | `#3f3f3f` | Body copy inside longer prose |
| `--color-muted` | `#6a6a6a` | Subtitles, meta, inactive labels, footer links |
| `--color-muted-soft` | `#929292` | Disabled text |

### Borders
| Token | Value | Use |
|---|---|---|
| `--color-hairline` | `#dddddd` | Default 1px dividers, card borders |
| `--color-hairline-soft` | `#ebebeb` | Lighter separators, footer bands |
| `--color-border-strong` | `#c1c1c1` | Focus outlines, heavier strokes |

### Semantic
| Token | Value | Use |
|---|---|---|
| `--color-error` | `#c13515` | Form validation errors |
| `--color-scrim` | `rgba(0,0,0,0.5)` | Modal / overlay backdrop |

---

## Typography

**Font:** `Inter` (variable), with system stack fallback.  
Defined in `--font-sans`. Swap this single token to change the entire type system.

| Token | Size | Weight | Use |
|---|---|---|---|
| `--text-display-xl` | 28px | 700 | Hero h1 |
| `--text-display-lg` | 22px | 500 | Page h1 |
| `--text-display-md` | 21px | 700 | Section headings (h2) |
| `--text-display-sm` | 20px | 600 | Sub-section headings (h3) |
| `--text-title-md` | 16px | 600 | Card titles, nav links |
| `--text-title-sm` | 16px | 500 | Footer column heads |
| `--text-body-md` | 16px | 400 | Default body copy |
| `--text-body-sm` | 14px | 400 | Card meta, captions |
| `--text-caption` | 14px | 500 | Labels, field captions |
| `--text-caption-sm` | 13px | 400 | Legal copy, footer fine print |
| `--text-badge` | 11px | 600 | Floating badge text |
| `--text-button-md` | 16px | 500 | CTA button labels |
| `--text-button-sm` | 14px | 500 | Pill / small button labels |

---

## Spacing

4px base unit. Use these tokens — never raw pixel values in components.

| Token | Value | Use |
|---|---|---|
| `--spacing-xxs` | 2px | Micro gaps |
| `--spacing-xs` | 4px | Icon padding, tight gutters |
| `--spacing-sm` | 8px | Card internal gaps |
| `--spacing-md` | 12px | Compact padding |
| `--spacing-base` | 16px | Default card padding, grid gutters |
| `--spacing-lg` | 24px | Card body padding, footer gutters |
| `--spacing-xl` | 32px | Large internal sections |
| `--spacing-xxl` | 48px | Footer top padding |
| `--spacing-section` | 64px | Major section vertical padding |

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | Buttons, inputs, tags |
| `--radius-md` | 14px | Cards, images |
| `--radius-xl` | 32px | Category strips, large pills |
| `--radius-full` | 9999px | Circular elements, full pills |

---

## Elevation

Single shadow tier — either this or nothing. No progressive layers.

```css
--shadow-card: rgba(0,0,0,0.02) 0 0 0 1px,
               rgba(0,0,0,0.04) 0 2px 6px 0,
               rgba(0,0,0,0.10) 0 4px 8px 0;
```

Applied on: hovered cards, floating badges, nav dropdowns.  
**Not** applied on: body, hero, footer, editorial bands, stat bars.

---

## UI Primitives

These components live in `astro-startmessaging/src/components/ui/`.  
They have **no Sanity types, no page-specific logic**. Props-only, token-aware.

| Component | File | Key props | Notes |
|---|---|---|---|
| `Container` | `ui/Container.astro` | `as?`, `class?` | `max-w-7xl` centred, responsive px |
| `Section` | `ui/Section.astro` | `variant?` (`default`\|`soft`\|`strong`\|`ink`), `id?` | Outer `<section>` + bg token + `py-section` |
| `Heading` | `ui/Heading.astro` | `as` (`h1`–`h4`), `size?`, `class?` | Semantic; defaults: h1→display-xl, h2→display-md, h3→display-sm, h4→title-md |
| `Text` | `ui/Text.astro` | `as?` (`p`\|`span`\|`div`\|`li`\|`dt`\|`dd`), `size?`, `tone?`, `class?` | `as="dt"` / `as="dd"` for definition lists |
| `Button` | `ui/Button.astro` | `variant?` (`primary`\|`secondary`\|`ghost`), `size?` (`md`\|`sm`), `href?`, `disabled?` | `<a>` when `href` provided, `<button>` otherwise |
| `Badge` | `ui/Badge.astro` | `tone?` (`primary`\|`muted`\|`success`) | Pill label; `text-badge` size + uppercase |

### `Text` size scale

| `size` prop | Token | Pixels |
|---|---|---|
| `body-md` *(default)* | `--text-body-md` | 16px |
| `body-sm` | `--text-body-sm` | 14px |
| `caption` | `--text-caption` | 14px / medium |
| `caption-sm` | `--text-caption-sm` | 13px |

### `Text` tone scale

| `tone` prop | Token | Hex |
|---|---|---|
| `body` *(default)* | `--color-body` | `#3f3f3f` |
| `default` | `--color-ink` | `#222222` |
| `muted` | `--color-muted` | `#6a6a6a` |
| `muted-soft` | `--color-muted-soft` | `#929292` |
| `on-primary` | `--color-on-primary` | `#ffffff` |

### Extending primitives

Before creating a new component, check if an existing primitive handles it with a `variant`, `tone`, or `class` prop. Add variants to existing primitives rather than creating parallel components.

---

## Section Components

Live in `src/components/sections/`. Each maps 1:1 to a JSON `type` key in `componentMap.ts`.
**All section components must use UI primitives for text, headings, buttons, and badges — no raw Tailwind colour/size classes.**

| JSON `type` | Component | Description |
|---|---|---|
| `hero` | `HeroSection.astro` | Full-width hero: `Badge` + `Heading h1` + `Text` subtitle + dual `Button` CTAs + optional image |
| `statsBar` | `StatsBar.astro` | `<dl>` stat grid on soft background; `Text as="dt"` for value, `Text as="dd"` for label |
| `featuresGrid` | `FeaturesGrid.astro` | SVG icon + `Heading h3` + `Text` description cards; 2/3/4 column layout |
| `ctaBlock` | `CtaBlock.astro` | Ink-background `Section`; `Heading h2` + `Text` subtext + `Button` pair |
| `comingSoon` | `ComingSoon.astro` | Placeholder with clock icon, localized "Coming Soon" message, home `Button` |

---

## Rebranding Checklist

When the final brand identity is ready:

1. Open `src/styles/global.css`
2. Update `--color-primary` + `--color-primary-active` + `--color-primary-disabled`
3. Update `--font-sans` if using a custom typeface (add `@font-face` above the `@theme` block)
4. Update `--color-ink` / `--color-body` / `--color-canvas` if background changes
5. Run `npm run build` — every component inherits the new values

No component files need to change for a rebrand. This is the entire point of the token system.
