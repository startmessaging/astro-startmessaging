# StartMessaging — Design System

> **Single source of truth for all design decisions.**
> To rebrand or change any visual aspect: edit `src/styles/global.css` only.
> Components must reference CSS custom properties/design tokens — they update everywhere automatically.

---

## Overview

The visual language of StartMessaging is built around a clean, typography-led SaaS aesthetic with two brand themes that adapt to the active product area:
1. **SMS / Auth Theme (Default):** Persian indigo (`#27187e`) accent with Ghost white (`#f7f7ff`) canvas.
2. **WhatsApp Theme:** Cyprus teal (`#004643`) accent with Sand gray-green (`#f0ede5`) canvas.

The system incorporates a complete dark mode layer (`[data-theme="dark"]`) using semantic tokens that swap canvas, surface, and text colors atomically.

---

## Colors

### Brand Themes

| Theme | Token | Light Value | Dark Value | Use |
|---|---|---|---|---|
| **SMS/Auth** | `--color-primary` | `#27187e` | `#a5b4fc` | Primary buttons, link accents, brand icons |
| **SMS/Auth** | `--color-primary-hover` | `#312e81` | `#c7d2fe` | Hover state of primary buttons |
| **WhatsApp** | `--color-accent-wa` | `#004643` | `#14b8a6` | WA-themed buttons, link accents, brand icons |
| **WhatsApp** | `--color-accent-wa-hover` | `#115e59` | `#99f6e4` | Hover state of WA buttons |

### Canvas & Surfaces

| Token | Light Value | Dark Value | Use |
|---|---|---|---|
| `--color-canvas` | `#f7f7ff` | `#0f0f14` | Default page background |
| `--color-surface-card` | `#ffffff` | `#161622` | Cards, forms, sidebars, floating widgets |
| `--color-surface-soft` | `#eeeef8` | `#1f1f2e` | Table headers, stats bar backgrounds, input fills |
| `--color-surface-strong` | `#e4e4f0` | `#2a2a3e` | Interactive hover fills, active tabs |
| `--color-surface-wa` | `#f0ede5` | `#0f1412` | WhatsApp-themed segment backgrounds |

### Text Hierarchy

| Token | Light Value | Dark Value | Use |
|---|---|---|---|
| `--color-ink` | `#0f0f14` | `#f3f4f6` | Headings, titles, active nav links |
| `--color-body` | `#2a2a3a` | `#d1d5db` | Body paragraphs, standard text |
| `--color-muted` | `#6b7280` | `#9ca3af` | Secondary labels, descriptions, footer links |
| `--color-muted-soft`| `#9ca3af` | `#4b5563` | Placeholders, disabled states |

### Borders

| Token | Value (Light) | Value (Dark) | Use |
|---|---|---|---|
| `--color-hairline` | `rgba(39, 24, 126, 0.1)` | `rgba(255, 255, 255, 0.1)` | Fine dividers, card borders |
| `--color-hairline-soft` | `rgba(39, 24, 126, 0.06)`| `rgba(255, 255, 255, 0.06)`| Subtle dividers, layout bands |
| `--color-border-strong` | `rgba(39, 24, 126, 0.2)` | `rgba(255, 255, 255, 0.2)` | Active outlines, focus states |

---

## Typography

We use **Inter** as our sans-serif typeface, styled with a fluid typography scale driven by `clamp()` to scale size automatically based on screen width:

| Token | Light/Mobile Size | Desktop Size | Use |
|---|---|---|---|
| `--text-display-hero` | `2.5rem` | `4.5rem` | Landing hero headlines |
| `--text-display-xl` | `2.0rem` | `3.5rem` | Major page section headlines |
| `--text-display-lg` | `1.75rem` | `2.75rem` | Standard page headers |
| `--text-display-md` | `1.5rem` | `2.25rem` | Component headers |
| `--text-display-sm` | `1.25rem` | `1.75rem` | Inner section headers |
| `--text-title-md` | `1.0rem` | `1.0rem` | Card titles, primary nav links |
| `--text-body-md` | `1.0rem` | `1.0rem` | Default body copy |
| `--text-body-sm` | `0.875rem` | `0.875rem` | Caption text, small card text |

---

## Spacing (4px Base Unit)

| Token | Value | Use |
|---|---|---|
| `--spacing-xxs` | `2px` | Borders, sub-pixel alignments |
| `--spacing-xs` | `4px` | Small list items, icon gaps |
| `--spacing-sm` | `8px` | Inner button padding, badge gaps |
| `--spacing-md` | `12px` | Badges, card headers, compact text |
| `--spacing-base` | `16px` | Standard padding, list gutters |
| `--spacing-lg` | `24px` | Card internal content, grid gaps |
| `--spacing-xl` | `32px` | Outer card padding, form section gutters |
| `--spacing-xxl` | `48px` | Column gutters, header heights |
| `--spacing-section` | `64px` | Major section vertical margins |

---

## Component Primitive Inventory

All UI modules should be built using our core design system primitives:
1. **Container:** Constrains content to `--container-max` (`80rem`) with fluid responsive padding.
2. **Section:** Defines layout vertical rhythm using `--spacing-section` and background themes.
3. **Button:** Implements semantic buttons (`variant="primary" | "secondary" | "accent-wa"`) with smooth transitions.
4. **Card:** Rounded containers utilizing `--color-surface-card` and subtle Persian-tinted shadows.
5. **Badge:** Used for small tag indicators (e.g. "Popular", "New") using theme accents.
6. **Heading & Text:** Configurable text rendering mapping to our fluid typography scale.
