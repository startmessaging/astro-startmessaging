# StartMessaging — Blog Writing Guidelines

> **This is the master reference for every blog post published on StartMessaging.**  
> Every human writer and every AI agent generating blog content MUST read and follow this document before writing a single word.  
> Last updated: 2026-06-12

---

## Table of Contents

1. [Project Context](#1-project-context)
2. [Country-Based Blog Strategy](#2-country-based-blog-strategy)
3. [Frontmatter Schema — Required Fields](#3-frontmatter-schema--required-fields)
4. [Content Length & Structure Rules](#4-content-length--structure-rules)
5. [Heading Hierarchy (H1–H6 Rules)](#5-heading-hierarchy-h1h6-rules)
6. [Page Structure Template](#6-page-structure-template)
7. [SEO Rules — Technical](#7-seo-rules--technical)
8. [GEO Targeting Rules](#8-geo-targeting-rules)
9. [Country-Specific Keyword Strategy](#9-country-specific-keyword-strategy)
10. [Internal Linking Rules](#10-internal-linking-rules)
11. [Tone, Voice & Human Writing Rules](#11-tone-voice--human-writing-rules)
12. [Category-Specific Rules](#12-category-specific-rules)
13. [What Existing Blogs Get Wrong (Do Not Repeat)](#13-what-existing-blogs-get-wrong-do-not-repeat)
14. [AI Agent Special Instructions](#14-ai-agent-special-instructions)
15. [Blog Publishing Checklist](#15-blog-publishing-checklist)
16. [Quick Reference Card](#16-quick-reference-card)

---

## 1. Project Context

**StartMessaging** is an India-first SMS OTP & WhatsApp Business API platform.

| Fact | Detail |
|---|---|
| Primary market | 🇮🇳 India — OTP via SMS (non-DLT, DLT), Auth API, WhatsApp |
| Global markets | 🇧🇷 Brazil · 🇲🇽 Mexico · 🇮🇩 Indonesia · 🇦🇪 UAE · 🇹🇷 Turkey · 🇳🇬 Nigeria — WhatsApp only |
| India blog folder | `src/content/blog/in/*.mdx` |
| Other country folders | `src/content/blog/br/*.mdx`, `src/content/blog/mx/*.mdx`, etc. |
| Blog categories | `tutorials` · `guides` · `comparisons` · `compliance` · `use-cases` · `business` |
| India flagship product | OTP API at ₹0.25/OTP, no DLT registration required |
| Global flagship product | WhatsApp Business API — broadcasts, chatbots, OTP, campaigns |

Blog posts are **English by default** for India. Brazil = Portuguese. Mexico = Spanish. Indonesia = Indonesian. UAE = Arabic. Turkey = Turkish. Nigeria = English.

---

## 2. Country-Based Blog Strategy

### India (`/blog/` — folder: `in/`)

India is the primary market. Blog focus: OTP technology, SMS API, DLT compliance, TRAI regulations, India-specific developer tutorials, fintech, e-commerce, edtech, healthcare, compliance, comparisons with global providers (Twilio, MSG91, etc.).

**India content pillars:**
- OTP API integration tutorials (framework-specific: Node.js, Python, PHP, etc.)
- DLT compliance deep-dives
- Industry OTP use cases (fintech, edtech, healthcare, e-commerce, logistics)
- Competitor comparisons (Twilio vs StartMessaging, MSG91 vs StartMessaging, etc.)
- Security & best practices for OTP
- Regulatory compliance (TRAI, RBI, SEBI, IRDAI)

### Brazil (`/br/blog/` — folder: `br/`)

**Language:** Portuguese (pt-BR)  
**Focus:** WhatsApp Business API — e-commerce, broadcasts, chatbots, OTP on WhatsApp, LGPD compliance  
**Tone:** Professional but warm — Brazilian business culture is relationship-oriented  
**Currency references:** BRL (R$)  
**Avoid:** SMS OTP, DLT references — these are India-only products

### Mexico (`/mx/blog/` — folder: `mx/`)

**Language:** Spanish (es-MX)  
**Focus:** WhatsApp Business API for LATAM, e-commerce, customer service automation  
**Currency:** MXN ($)

### Indonesia (`/id/blog/` — folder: `id/`)

**Language:** Indonesian (Bahasa Indonesia)  
**Focus:** WhatsApp API for e-commerce, logistics, customer service  
**Currency:** IDR (Rp)

### UAE (`/ae/blog/` — folder: `ae/`)

**Language:** Arabic (ar)  
**Direction:** RTL — use `dir="rtl"` considerations in content formatting  
**Focus:** WhatsApp API for retail, banking, customer service  
**Currency:** AED (د.إ)

### Turkey (`/tr/blog/` — folder: `tr/`)

**Language:** Turkish (tr)  
**Focus:** WhatsApp Business API  
**Currency:** TRY (₺)

### Nigeria (`/ng/blog/` — folder: `ng/`)

**Language:** English (en-NG)  
**Focus:** WhatsApp API, business messaging, fintech  
**Currency:** NGN (₦)

---

## 3. Frontmatter Schema — Required Fields

Every blog post `.mdx` file MUST begin with this frontmatter block. No exceptions.

```yaml
---
title: "Exact, descriptive H1 title — include primary keyword naturally"
description: "150–160 character meta description. Must include primary keyword. Should read as a natural sentence, not a keyword list. Ends with a period."
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"           # Add whenever you meaningfully update the post
category: "guides"                # Must be one of: tutorials | guides | comparisons | compliance | use-cases | business
country: "in"                     # Must match the folder: in | br | mx | id | ae | tr | ng
author: "StartMessaging Team"
keywords:
  - "primary keyword phrase"      # 6–10 keywords max. All lowercase. Natural phrases, not single words.
  - "secondary keyword phrase"
  - "long-tail variant"
  - "brand + topic keyword"
relatedSlugs:
  - "related-post-slug-1"         # 2–4 related slugs from the SAME country folder
  - "related-post-slug-2"
featured: false                   # Set to true only for cornerstone/pillar content
canonicalCountry: "in"           # ONLY add this if this post is a DUPLICATE shared across countries
---
```

### Frontmatter Rules

- `title`: 50–65 characters. Include the year if writing a "best of" or annual guide (e.g., "2026"). Never wrap in `#` — Astro uses this as the document H1.
- `description`: Precisely 150–160 characters. Count them. Use a tool. Do not exceed 160 — Google truncates.
- `keywords`: 6–10 phrases maximum. Prioritise long-tail, conversational phrases over single words. First keyword = primary keyword (matches title intent). No keyword duplication across `title`, `description`, and `keywords`.
- `category`: Only the six allowed enum values. `tutorials` = code walk-throughs. `guides` = conceptual explanations. `comparisons` = vs posts. `compliance` = regulatory content. `use-cases` = industry applications. `business` = strategy, cost, ROI.
- `relatedSlugs`: Must be real, existing slugs in the same country folder. Verify before adding.
- `canonicalCountry`: Only add if this exact post content is duplicated. Points to the master copy's country folder.

---

## 4. Content Length & Structure Rules

### Minimum & Target Word Counts by Category

| Category | Minimum | Target | Maximum |
|---|---|---|---|
| `tutorials` | 1,200 words | 1,800–2,500 words | 3,500 words |
| `guides` | 1,500 words | 2,000–3,000 words | 4,000 words |
| `comparisons` | 1,200 words | 2,000–2,800 words | 3,500 words |
| `compliance` | 1,000 words | 1,500–2,500 words | 3,500 words |
| `use-cases` | 1,200 words | 2,000–3,000 words | 4,000 words |
| `business` | 1,000 words | 1,500–2,500 words | 3,000 words |

> **CRITICAL:** Posts under 800 words are NOT acceptable for any category. They lack sufficient depth for ranking. The existing short posts like `bulksms-vs-startmessaging.mdx` (78 lines, ~400 words) and several comparison stubs are BELOW MINIMUM. Do not create posts like these going forward.

### Content Density Rules

- Every major section must contain **at least 2 substantive paragraphs** before sub-sections
- No section heading followed immediately by a bullet list with no explanatory prose
- Bullet lists: maximum 6 items per list. If you have more, break into sub-sections.
- Paragraphs: 3–6 sentences. Avoid 1-sentence paragraphs except for deliberate emphasis.
- Code blocks: include a plain-language explanation before AND after every code block
- Tables: use for structured comparisons, pricing, feature matrices — avoid overuse for simple lists

### Required Sections for Every Post

1. **Introduction paragraph** (no heading — appears right after frontmatter, before first H2)
2. **At least 4 H2 sections** with substantive content
3. **FAQ section** (`## FAQ` or `## Frequently Asked Questions`) with **3–5 actual Q&As**
4. **A clear CTA at the end** — link to sign-up, pricing, API docs, or a related product page

---

## 5. Heading Hierarchy (H1–H6 Rules)

### The Rule of One H1

**There is exactly ONE H1 per blog post, and it comes from the `title` field in frontmatter.** Astro generates `<h1>` from `title`. Do NOT write `# Heading` anywhere in the MDX body — doing so creates a second H1 which destroys SEO.

### Heading Structure

```
title: "Your H1 Title Here"   ← H1 — from frontmatter ONLY, never in body
---

[Introduction prose — no heading]

## Section One                 ← H2 — major topic sections (4–8 per post)
### Sub-section                ← H3 — sub-topics within a section
#### Deep detail               ← H4 — use sparingly, only when truly needed
```

### Heading Rules

| Level | Usage | Count |
|---|---|---|
| H1 (`#`) | **Never in body.** Comes from `title` frontmatter | Exactly 1 (auto) |
| H2 (`##`) | Major sections that divide the topic | 4–8 per post |
| H3 (`###`) | Sub-sections within an H2 | 2–5 per H2 max |
| H4 (`####`) | Granular detail, code walk-through steps | Use sparingly |
| H5, H6 | Avoid entirely | 0 per post |

### Keyword-Optimised Headings

- H2s should naturally include **secondary keywords** from your `keywords[]` list
- Do NOT stuff keywords — headings must read naturally to a human
- Use questions in H2/H3 where appropriate ("How does X work?" "When should you use Y?")
- Avoid generic headings: ~~"Overview"~~ ~~"Introduction"~~ ~~"Conclusion"~~ — be specific

### Good vs Bad H2 Examples

| ❌ Bad | ✅ Good |
|---|---|
| `## Overview` | `## Why Indian E-Commerce Platforms Need OTP Verification` |
| `## Pricing` | `## Pricing Comparison: Twilio vs StartMessaging for India OTP` |
| `## FAQ` | `## Frequently Asked Questions About DLT Registration in India` |
| `## Conclusion` | `## Which OTP Provider Should You Choose?` |

---

## 6. Page Structure Template

Use this exact structural order for every blog post. Sections marked **[Required]** cannot be omitted.

```mdx
---
[frontmatter — see §3]
---

[**Required**] Opening paragraph (2–4 sentences, NO H2 heading).
Set the scene. Who is this for? What will they learn? Why does it matter NOW?
Include the primary keyword naturally in the first 100 words.

[**Required**] ## [First Major Section — What/Why framing]

2–3 paragraphs explaining the core concept or problem.
If a comparison: briefly introduce both sides here.
If a tutorial: show the "before" state / what problem we solve.

### Sub-section if needed

Prose + optionally a list or code block.

[**Required**] ## [Second Major Section — How It Works / Deep Dive]

The main content section. Substantive explanation with real-world context.
For India: include rupee figures, TRAI/RBI references where relevant.
For other countries: include local currency, regulations, cultural context.

### Sub-section

### Another sub-section

[**Required**] ## [Third Major Section — Practical Application / Steps / Comparison]

For tutorials: working code with language-specific comments.
For comparisons: feature table + pricing table.
For use-cases: real numbers, volume estimates, ROI calculations.
For guides: concrete examples, edge cases, pitfalls.

[Optional] ## [Fourth+ Major Section — Advanced / Edge Cases / Alternatives]

## [Context-specific section title — cost optimization, migration, when to use X vs Y, etc.]

[**Required**] ## Frequently Asked Questions

**Q: [Question phrased exactly as users type it in Google]?**

A: [2–4 sentence answer. Substantive. No fluff. If the answer warrants more, use a paragraph.]

**Q: [Second question]?**

A: [Answer.]

**Q: [Third question]?**

A: [Answer.]

[3–5 Q&As total. Questions must match real search intent.]

[**Required**] Final CTA paragraph (no heading — just a closing paragraph with a link)
```

---

## 7. SEO Rules — Technical

### Title Tag SEO

- **Format:** `[Primary Keyword] — [Brand/Context]` or `[Primary Keyword]: [Benefit/Context]`
- Preferred patterns:
  - `"OTP API for India: The Complete Developer Guide (2026)"`
  - `"Twilio vs StartMessaging for OTP in India: Pricing, DLT, API Comparison"`
  - `"What is DLT Registration? India SMS Compliance Explained"`
- Include the year for time-sensitive guides
- Do NOT use clickbait ("You Won't Believe…", "The Secret to…")

### Meta Description SEO

- **Must include:** primary keyword, a concrete benefit or differentiator, implicit CTA
- **Format:** `[Primary keyword action/context]. [Key benefit]. [Differentiator or CTA hint].`
- Example: `"Learn how OTP verification works in Indian e-commerce platforms. Covers login, COD confirmation, delivery OTP, volume patterns, and cost optimization at ₹0.25/OTP."`

### URL Slug (filename)

- Lowercase, hyphen-separated, no special characters
- Matches primary keyword: `otp-ecommerce-india.mdx`, `twilio-vs-startmessaging.mdx`
- Max 5–6 words, under 60 characters including the `.mdx` extension
- Never change a slug after publishing — 301s must be set up if you do

### Keyword Placement Rules

| Location | Rule |
|---|---|
| Title | Primary keyword, preferably near the start |
| First paragraph | Primary keyword in first 100 words, naturally |
| H2 headings | At least 2 H2s should contain secondary keywords |
| Body | Natural density — aim for 1–2% keyword density, never forced |
| Image alt text | Descriptive, include keyword where naturally fits |
| Internal links | Use keyword-rich anchor text, not "click here" |
| FAQ Q text | Write questions exactly as users search them |

### Structured Data / FAQ Schema

The blog layout automatically generates `Article` + `BreadcrumbList` JSON-LD from frontmatter.  
Your **FAQ section** gets picked up by `lib/jsonld.ts` as `FAQPage` schema IF you follow this exact format:

```mdx
## Frequently Asked Questions

**Q: Your question here?**

A: Your answer here.

**Q: Second question?**

A: Second answer.
```

Do not change this format. Bold `**Q:**` and plain `A:` are the signals the parser uses.

### Canonical & Duplicate Content

- Each country's blog is canonical for its URL
- If you copy a post across countries (e.g., India + Nigeria for a shared English post), add `canonicalCountry: "in"` to the duplicate's frontmatter
- Never publish identical content in two posts within the same country folder

---

## 8. GEO Targeting Rules

### How GEO Works on This Site

The site uses country-based routing:
- India content lives at `/blog/[slug]` (root path)
- Brazil content at `/br/blog/[slug]`
- Other countries similarly prefixed

The `hreflang` tags are auto-generated from the country folder. Google uses these to serve the right version to users in each country.

### Writing for GEO

**Every piece of content must feel written for ONE specific country and market.** A generic international blog post is NOT acceptable. GEO success depends on hyper-local relevance.

#### India GEO Checklist

- [ ] Mention specific Indian context: TRAI, RBI, SEBI, IRDAI, DPDP Act where relevant
- [ ] Use ₹ (INR) for all price references
- [ ] Name Indian telecom operators: Jio, Airtel, Vi (Vodafone Idea), BSNL
- [ ] Reference Indian app stores, platforms: Google Play, App Store (same globally but usage patterns differ)
- [ ] Mention Indian developer frameworks popular in Indian startups (Razorpay, Shiprocket integrations)
- [ ] Reference tier-2/tier-3 city users where relevant for e-commerce/edtech content
- [ ] Mention Indian compliance by name: "DLT platform", "PE-ID registration", "TRAI scrubbing"
- [ ] Use Indian number formatting: "Rs 2,50,000" or "₹2.5 lakh" (not $2,500)
- [ ] Reference COD (Cash on Delivery) for e-commerce — India-specific behaviour
- [ ] Use Indian English variants where appropriate: "crore", "lakh", "startup ecosystem"

#### Brazil GEO Checklist

- [ ] Write in Portuguese (pt-BR), not pt-PT
- [ ] Reference LGPD (Brazil's data protection law, equivalent to GDPR)
- [ ] Use R$ for currency
- [ ] Reference common Brazilian platforms: Mercado Livre, Shopee, Magazine Luiza, iFood, Rappi
- [ ] Mention Pix (Brazil's instant payment system) where relevant
- [ ] Reference Brazil WhatsApp adoption (Brazil has one of highest WhatsApp penetration rates)
- [ ] WhatsApp-only content — never mention SMS OTP or DLT

#### Mexico GEO Checklist

- [ ] Write in Mexican Spanish (es-MX) — use native Latin American terms, avoiding European Spanish (es-ES) idioms (e.g., use "celular" instead of "móvil", "computadora" instead of "ordenador")
- [ ] Reference LFPDPPP (Ley Federal de Protección de Datos Personales en Posesión de los Particulares - Mexico's data protection law)
- [ ] Use $ or $ MXN for currency references
- [ ] Reference common Mexican e-commerce and delivery platforms: Mercado Libre, Amazon México, Coppel, Walmart México, Rappi, Cornershop
- [ ] Mention Mexican payment methods: SPEI (instant bank transfers), OXXO Pay (extremely popular cash payment option)
- [ ] Emphasize high local WhatsApp adoption (businesses using WhatsApp for sales, catalog browsing, and support)
- [ ] WhatsApp-only content — never mention SMS OTP, DLT, or TRAI

#### Indonesia GEO Checklist

- [ ] Write in professional, standard Indonesian (Bahasa Indonesia) suitable for B2B tech and business audiences
- [ ] Reference UU PDP (Undang-Undang Pelindungan Data Pribadi - Indonesia's Personal Data Protection Law)
- [ ] Use Rp (IDR) for currency references
- [ ] Reference popular Indonesian e-commerce, ride-hailing, and logistics platforms: Tokopedia, Shopee Indonesia, Bukalapak, Gojek, Grab Indonesia, J&T Express
- [ ] Mention Indonesian payment channels: QRIS (unified QR code standard), GoPay, OVO, DANA, LinkAja, and virtual bank accounts (BCA, Mandiri, BNI)
- [ ] Emphasize local WhatsApp adoption (critical for conversational commerce, order notifications, and verification)
- [ ] WhatsApp-only content — never mention SMS OTP, DLT, or TRAI

#### UAE GEO Checklist

- [ ] Write in formal Modern Standard Arabic (MSA) suitable for business/B2B context
- [ ] Ensure right-to-left (RTL) formatting is properly styled in content code and layout
- [ ] Reference UAE PDPL (Federal Decree-Law No. 45 of 2021 on Personal Data Protection)
- [ ] Use AED (د.إ) for currency references
- [ ] Reference popular UAE/Middle East e-commerce and delivery platforms: Noon, Amazon.ae, Talabat, Careem, Majid Al Futtaim
- [ ] Mention regional payment systems: Careem Pay, Apple Pay, Samsung Pay, domestic credit cards, and Cash on Delivery (COD)
- [ ] Highlight WhatsApp's massive role in customer experience for UAE retail, luxury shopping, and travel
- [ ] WhatsApp-only content — never mention SMS OTP, DLT, or TRAI

#### Turkey GEO Checklist

- [ ] Write in proper, business-level Turkish (tr) suitable for developers and businesses
- [ ] Reference KVKK (Kişisel Verilerin Korunması Kanunu - Turkey's Personal Data Protection Law)
- [ ] Use ₺ (TRY) for currency references
- [ ] Reference common Turkish platforms: Trendyol, Hepsiburada, Yemeksepeti, Getir, n11
- [ ] Mention Turkish payment methods: Troy (national card payment system), BKM Express, and credit/debit card installment options (very common locally)
- [ ] Emphasize Turkey's strong WhatsApp engagement (support, transaction tracking, marketing broadcasts)
- [ ] WhatsApp-only content — never mention SMS OTP, DLT, or TRAI

#### Nigeria GEO Checklist

- [ ] Write in Nigerian English (en-NG) using British spelling conventions (e.g., "optimise", "categorise", "programme")
- [ ] Reference NDPA (Nigeria Data Protection Act, 2023)
- [ ] Use ₦ (NGN) for currency references
- [ ] Reference local platforms and fintech integrations: Jumia Nigeria, Konga, Moniepoint, OPay, PiggyVest
- [ ] Mention popular payment gateways: Paystack, Flutterwave, direct bank transfers (highly dominant in Nigeria), and USSD codes
- [ ] Focus on WhatsApp's crucial role in social commerce, customer onboarding, and automated notifications in Nigeria
- [ ] WhatsApp-only content — never mention SMS OTP, DLT, or TRAI

---

## 9. Country-Specific Keyword Strategy

### India — Primary Keyword Clusters

**OTP & Authentication:**
- `otp api india` / `otp api for india`
- `send otp india` / `sms otp india`
- `cheapest otp api india`
- `otp without dlt india` / `dlt free otp`
- `[framework] send otp` — (e.g., `nodejs send otp india`, `python otp api india`)

**DLT & Compliance:**
- `dlt registration india` / `what is dlt sms india`
- `trai sms regulations 2026`
- `sms template approval india`
- `pe id registration india`

**Competitor Comparison:**
- `twilio vs startmessaging`
- `msg91 vs startmessaging`
- `twilio alternative india`
- `cheap sms api india`

**Use Cases:**
- `otp for [industry] india` — ecommerce, fintech, healthcare, edtech, gaming, real estate
- `sms verification [app type] india`
- `whatsapp otp india`

**WhatsApp API (India):**
- `whatsapp business api india`
- `whatsapp otp api india`

### Brazil — Primary Keyword Clusters

**WhatsApp API:**
- `api whatsapp business brasil`
- `whatsapp marketing brasil`
- `chatbot whatsapp brasil`
- `enviar mensagens whatsapp api`
- `whatsapp otp brasil`

**Business:**
- `automação whatsapp empresa`
- `disparo whatsapp em massa`
- `api mensagem whatsapp`

### Mexico — Primary Keyword Clusters

**WhatsApp API:**
- `api whatsapp business mexico`
- `enviar whatsapp masivo mexico`
- `whatsapp marketing mexico`
- `chatbot whatsapp empresa mexico`

### Indonesia — Primary Keyword Clusters

- `api whatsapp bisnis indonesia`
- `kirim pesan whatsapp otomatis`
- `whatsapp business api indonesia`

### UAE — Primary Keyword Clusters (Arabic)

- `واجهة برمجة واتساب الأعمال` (WhatsApp Business API)
- `إرسال رسائل واتساب تلقائية`
- `بوابة واتساب للأعمال الإمارات`

### Nigeria — Primary Keyword Clusters

- `whatsapp business api nigeria`
- `whatsapp marketing nigeria`
- `bulk whatsapp messages nigeria`
- `whatsapp chatbot nigeria`

---

## 10. Internal Linking Rules

### Minimum Internal Links Per Post

| Post length | Minimum internal links | Maximum |
|---|---|---|
| Under 1,500 words | 3 | 6 |
| 1,500–2,500 words | 4 | 8 |
| Over 2,500 words | 6 | 12 |

### Priority Link Targets (link to these whenever naturally relevant)

**Product pages (high priority):**
- `/otp-api` — OTP API product page
- `/features` — Platform features
- `/pricing` — Pricing page
- `/dlt-free-otp` — DLT-free OTP landing (India)
- `/whatsapp` — WhatsApp hub
- `/auth-api` — Auth API (India)

**Conversion links:**
- `https://app.startmessaging.com` — Primary CTA (sign-up / dashboard)
- `https://app.startmessaging.com/register` — Registration page

**Related blog posts:**
- Use `relatedSlugs` in frontmatter for sidebar
- Link inline to related posts using `/blog/[slug]` paths
- Use descriptive, keyword-rich anchor text (not "click here" or "read more")

### Anchor Text Rules

| ❌ Avoid | ✅ Use Instead |
|---|---|
| `click here` | `read our guide on DLT registration` |
| `read more` | `see OTP API pricing for India` |
| `here` | `StartMessaging OTP API documentation` |
| `this link` | `how to send OTP with Node.js` |
| Exact keyword stuffed | Natural phrase that includes keyword |

---

## 11. Tone, Voice & Human Writing Rules

### The StartMessaging Voice

**Professional Developer.** Think: a senior Indian engineer who has shipped OTP in production, knows the TRAI regulations, has debugged DLT rejections, and wants to give genuine, opinionated advice to developers who are building the same thing.

- **Authoritative but not arrogant.** We know this domain. We say things directly.
- **Honest about trade-offs.** If Twilio is better for global SMS, say so. Credibility > defensiveness.
- **Developer-first language.** Developers are our audience. No marketing fluff.
- **India-context aware.** We write for Indian builders, not Silicon Valley readers.

### Tone Guidelines

| Avoid | Use Instead |
|---|---|
| "In today's digital world..." | Jump straight to the topic |
| "It is important to note that..." | Just say the thing |
| "As we all know..." | Don't assume shared knowledge — explain it |
| "Needless to say..." | If it doesn't need saying, don't say it |
| "In conclusion..." | Don't announce the conclusion — just conclude |
| "Leverage" "utilise" "facilitate" | "Use" |
| "The landscape is evolving" | Be specific: what is changing and why |
| Lists of 10+ items without prose | Group and explain |

### Human Writing Markers (Anti-AI Tells to Avoid)

AI-generated content has patterns that readers (and Google) recognise. Actively avoid:

1. **Do not open paragraphs with "In" or "When it comes to"** repeatedly
2. **Do not use transition phrases like** "Furthermore," "Additionally," "Moreover," "It is worth noting that"
3. **Do not use "tapestry" "nuanced" "delve" "embark" "realm" "landscape" "ecosystem"** — these are AI clichés
4. **Do not use rhetorical padding** like "Before we dive in, let's understand the basics"
5. **Do not write in passive voice excessively** — active voice always
6. **Do not repeat the same information** reworded in different sections
7. **Do not open with a dictionary definition** — "According to Merriam-Webster, OTP means..."
8. **Do not write the same sentence structure 3 times in a row** — vary sentence length and construction

### What Good Paragraphs Look Like

❌ **AI-sounding:**
> "In the ever-evolving landscape of digital authentication, it is important to note that OTPs play a crucial role in ensuring the security of user accounts. Furthermore, with the increasing adoption of mobile devices, SMS-based OTP verification has become a cornerstone of modern authentication systems. It is worth noting that this trend is expected to continue in the foreseeable future."

✅ **Human, developer-voice:**
> "OTP verification is the default login mechanism for most Indian consumer apps — and for good reason. A 4-6 digit code that expires in five minutes is simple, works on every phone, and requires no special app. The trade-off is SMS cost and, in India specifically, DLT compliance. Here is exactly how each part works."

### Numbers and Specificity

- Always use real, verifiable numbers where possible
- If estimating, say "roughly" or "approximately" — don't present estimates as facts
- Use Indian number formatting: ₹25,000 not $303. "5 lakh" not "500,000" (though you can write "5,00,000" for formal contexts)
- Include year when citing statistics: "as of 2026" or "2025 data from TRAI"
- Prefer specific over vague: "97-99% delivery rate" not "high delivery rates"

---

## 12. Category-Specific Rules

### `tutorials` — Framework Integration Posts

**Purpose:** Show developers exactly how to send/verify OTP (or use WhatsApp API) in a specific framework.

**Structure:**
1. What problem this solves (1–2 para)
2. Prerequisites (simple list)
3. Step-by-step implementation with **working, runnable code**
4. Error handling and edge cases
5. Testing the integration
6. FAQ

**Code rules:**
- Code must be complete and runnable — no `// ... rest of code here` shortcuts
- Show both send AND verify steps (not just send)
- Include error handling (401, 429, network errors)
- Add inline comments explaining WHY, not just WHAT
- Language-specific: use idiomatic patterns (use Laravel's `Http::` facade in PHP, not raw curl)

**For India tutorials:** The primary use case is always OTP. Include a note about DLT-free delivery.

### `guides` — Conceptual Deep-Dives

**Purpose:** Explain a concept authoritatively. The reader arrives with a question; they leave with complete understanding.

**Structure:**
1. Definition / what it is (concise, specific)
2. How it works (mechanism, not marketing)
3. Where/when it applies
4. Types or variants (if applicable)
5. Strengths and limitations (be honest)
6. Indian/country context
7. How to implement (brief, with links to tutorials)
8. FAQ

**Do NOT:** Write a definition and then immediately try to sell StartMessaging. Establish authority first.

### `comparisons` — Vs. Posts

**Purpose:** Help a developer choose the right tool for their specific situation.

**Rules:**
- Be genuinely fair. If the competitor is better in some areas, say so clearly. This builds trust.
- Always include a **feature comparison table**
- Always include a **pricing table** with real numbers
- Include "When to choose X" AND "When to choose Y" sections
- Include a **migration guide** if relevant
- Include working **code examples from both sides**
- Minimum 8 rows in the feature table

**What makes comparisons fail:**
- Stacking the deck obviously in StartMessaging's favour (readers see through it)
- Outdated pricing (verify before publishing)
- Missing DLT section for India comparisons

### `compliance` — Regulatory Content

**Purpose:** Help Indian businesses understand and meet regulatory requirements.

**Rules:**
- Always cite the specific regulation by name and year: "TRAI's Telecom Commercial Communications Customer Preference Regulations (TCCCPR), 2018 (amended 2023)"
- Include dates of regulations and note when they may change
- Add a disclaimer: "This is informational content, not legal advice. Consult a lawyer for your specific situation."
- Link to official government/TRAI/RBI sources where possible
- Keep factually accurate — do not speculate on regulatory intent

### `use-cases` — Industry Application Posts

**Purpose:** Show how a specific industry uses OTP/WhatsApp messaging, with real-world context.

**Rules:**
- Include **realistic volume estimates** (orders of magnitude, not fake precision)
- Include **cost calculations** using StartMessaging pricing (₹0.25/OTP for India)
- Include **at least one specific sub-use-case** (not just "e-commerce uses OTP" — what specific flow, what specific problem)
- Show the **business impact**: fraud reduction %, conversion improvement, cost savings
- Include a **Sample Cost Calculation** table for India posts

### `business` — Strategy & ROI Posts

**Purpose:** Help business owners and CTOs make decisions.

**Audience:** Non-developer stakeholders who influence API provider choice.  
**Tone:** More accessible, less code-heavy. Business outcomes > implementation details.

---

## 13. What Existing Blogs Get Wrong (Do Not Repeat)

After reviewing the existing blog corpus, these patterns were identified as problematic. **Do not reproduce them in new posts.**

### 🚫 Issue 1: Posts That Are Too Short (Under 800 Words)
* **Status:** **FIXED**
* **Details:** All listed stubs (`bulksms-vs-startmessaging.mdx`, `circuit-breaker-pattern-otp-services.mdx`, `otp-failed-attempt-lockout-strategies.mdx`, `should-you-hash-otp-in-database.mdx`, `clickatell-vs-startmessaging.mdx`, `kaleyra-vs-startmessaging.mdx`, and `solutions-infini-vs-startmessaging.mdx`) have been expanded to meet or exceed minimum word counts.
* **Future Reference:** Ensure all future posts adhere to the minimum word counts for their category.

### 🚫 Issue 2: FAQ Section Is a Fake Heading
* **Status:** **FIXED**
* **Details:** Resolved in `what-is-otp.mdx` by implementing 4 real, schema-compliant developer Q&As.
* **Future Reference:** `## FAQ` or `## Frequently Asked Questions` must always be followed by at least 3 real `**Q:**` / `A:` pairs.

### 🚫 Issue 3: Inconsistent HTML Tables vs Markdown in MDX
* **Status:** **PENDING / FUTURE REFERENCE**
* **Details:** Remain aware of this when editing other legacy posts that still contain raw HTML tables.
* **Fix:** Use markdown tables by default. Only use HTML tables if you need complex spanning or custom classes.

### 🚫 Issue 4: Mixed `\r\n` Line Endings Causing Render Artifacts
* **Status:** **PARTIALLY FIXED / FUTURE REFERENCE**
* **Details:** Resolved in `what-is-otp.mdx` and all newly updated files. Remains as a future check for the remaining unedited legacy files.
* **Fix:** Always save MDX files with Unix line endings (LF only). Configure your editor and `.editorconfig`.

### 🚫 Issue 5: Brazil Blog Is Nearly Empty (Only 1 Post)
* **Status:** **ONGOING / FUTURE REFERENCE**
* **Details:** While the existing `whatsapp-business-api-guide.mdx` frontmatter has been fixed, writing more localized Portuguese content remains a target.
* **Fix:** Prioritise Brazil blog content. Target Portuguese keywords, WhatsApp use cases, LGPD compliance, Brazilian e-commerce platforms.

### 🚫 Issue 6: No `updatedAt` on Any Existing Posts
* **Status:** **PARTIALLY FIXED / FUTURE REFERENCE**
* **Details:** Added `updatedAt: "2026-06-15"` to the edited files; remaining unedited files should have this added when updated.
* **Fix:** Add `updatedAt: "YYYY-MM-DD"` whenever you meaningfully update a post.

### 🚫 Issue 7: Some Posts Have Raw `tags` Field Instead of Schema-Compliant Frontmatter
* **Status:** **PARTIALLY FIXED / FUTURE REFERENCE**
* **Details:** Removed `tags` and `ogImage` and added `keywords` in the updated posts. Check other files for similar non-compliant tags fields when modifying them.
* **Fix:** Only use frontmatter fields defined in the content schema. Use `keywords` for keyword data, not `tags`.

### 🚫 Issue 8: canonicalCountry Pointing to Wrong Country
* **Status:** **FIXED**
* **Details:** Removed from `br/whatsapp-business-api-guide.mdx` as the post is a localized translation, not a duplicate.
* **Fix:** `canonicalCountry` must point to a country folder that has an IDENTICAL post (same slug). If the master copy doesn't exist, don't set `canonicalCountry`.

### 🚫 Issue 9: Incorrect API Endpoints and Authentication Headers in Code Snippets
* **Status:** **FIXED**
* **Details:** Corrected across all updated posts to use the valid `https://api.startmessaging.com/otp/send` and `/otp/verify` endpoints, `X-API-Key` headers, and `variables` payload parameters.
* **Fix:** Code snippets must use the correct endpoints, authenticate using `X-API-Key`, and nest the OTP payload inside the `variables` property.

---

## 14. AI Agent Special Instructions

> This section is specifically for AI models (Claude, Gemini, GPT-4, etc.) generating blog content for this project. Follow these instructions exactly.

### Before You Write Anything

1. **Read this entire document first.** Not just this section — all of it.
2. **Identify the country** — which folder does this post go into? Apply all relevant country rules.
3. **Confirm the category** — which of the six categories applies? Apply all category-specific rules.
4. **Count your keywords** — decide on 1 primary keyword and 5–9 secondary keywords before writing.
5. **Count the post length target** — what is the target word count for this category? Write to meet it.
6. **Verify API Endpoints and Headers** — Always check and confirm the exact documentation (under `src/content/docs/`) before including any API endpoints, request bodies, or integration code snippets in blog posts. Never assume endpoints (e.g. do not invent `/v1` prefixes or custom header schemes like `Authorization: Bearer` if the API expects `X-API-Key`).

### Mandatory Writing Constraints

**Structure you MUST follow:**
- [ ] No H1 in the body (`#` is forbidden in MDX body)
- [ ] Opening introduction paragraph — no heading
- [ ] Minimum 4 H2 sections
- [ ] FAQ section with minimum 3 real Q&A pairs in `**Q:** / A:` format
- [ ] Closing CTA paragraph (no heading)
- [ ] All frontmatter fields filled correctly

**Tone constraints:**
- [ ] Do NOT start with "In today's [adjective] world..."
- [ ] Do NOT use: "Furthermore", "Moreover", "Additionally", "It's worth noting", "It's important to"
- [ ] Do NOT use: "delve", "tapestry", "nuanced", "embark", "realm", "landscape", "ecosystem", "leverage" (use "use")
- [ ] Do NOT use passive voice in more than 20% of sentences
- [ ] Do NOT pad content to hit word count — every sentence must earn its place
- [ ] Do NOT repeat the same idea in different sections with different words
- [ ] DO vary sentence length — mix short punchy sentences with longer technical explanations

**Content accuracy:**
- [ ] All StartMessaging pricing must be exactly ₹0.25/OTP for India (not approximately, not "around")
- [ ] Do NOT invent competitor pricing — use real, cited figures or mark as "approximately"
- [ ] Do NOT invent regulatory requirements — only reference regulations that exist
- [ ] Do NOT claim delivery rates above 99% — the stated range is 97–99%
- [ ] For India: mention "no DLT registration required" where relevant — this is a key differentiator

### Country-Specific AI Rules

**India posts:**
- Default to ₹ or Rs for currency references.
- Include at least one reference to TRAI, RBI, SEBI, IRDAI, or DPDP Act (where the topic warrants).
- Reference at least one major Indian carrier (Jio, Airtel, Vi, BSNL) where relevant.
- Address the developer as a peer using professional Indian English startup terminology (e.g., crore, lakh, tech stack).
- Highlight key differentiator: no DLT registration required for StartMessaging's flagship SMS OTP.

**Brazil posts:**
- Write in Brazilian Portuguese (pt-BR) — never European Portuguese (pt-PT).
- Use "você" instead of "tu" for second-person singular addressing.
- Include at least one reference to LGPD (data protection law) or Meta's official WhatsApp policy.
- Currency: R$ (reais/BRL).
- Focus strictly on WhatsApp Business API capabilities (campaigns, chatbots, broadcasts, verification); do not mention SMS OTP or DLT compliance.

**Mexico posts:**
- Write in Mexican Spanish (es-MX) — use native Latin American terms rather than Castilian Spanish (es-ES) idioms (e.g., use "usted" or professional "tú" appropriately, "celular" instead of "móvil", "computadora" instead of "ordenador").
- Reference LFPDPPP (personal data protection law).
- Currency: $ or $ MXN (Mexican Peso).
- Focus strictly on WhatsApp Business API capabilities; do not mention SMS OTP or DLT compliance.

**Indonesia posts:**
- Write in standard, professional Indonesian (Bahasa Indonesia) suitable for B2B tech and business audiences.
- Reference UU PDP (Personal Data Protection Law).
- Currency: Rp (Indonesian Rupiah).
- Focus strictly on WhatsApp Business API capabilities; do not mention SMS OTP or DLT compliance.

**UAE posts (Arabic):**
- Must be written in right-to-left (RTL) format.
- Use formal Modern Standard Arabic (MSA) suitable for UAE/Gulf B2B commerce and enterprises.
- Reference UAE PDPL (Federal Decree-Law No. 45 of 2021 on Personal Data Protection).
- Currency: AED or د.إ (UAE Dirham).
- Focus strictly on WhatsApp Business API capabilities; do not mention SMS OTP or DLT compliance.

**Turkey posts:**
- Write in proper, business-level Turkish (tr) suitable for B2B tech communication.
- Reference KVKK (personal data protection law).
- Currency: ₺ (Turkish Lira).
- Focus strictly on WhatsApp Business API capabilities; do not mention SMS OTP or DLT compliance.

**Nigeria posts:**
- Write in Nigerian English (en-NG) using British spelling conventions (e.g., "optimise", "categorise", "programme").
- Reference NDPA (Nigeria Data Protection Act).
- Currency: ₦ (Nigerian Naira).
- Focus strictly on WhatsApp Business API capabilities; do not mention SMS OTP or DLT compliance.

### Validation Before Submitting

AI agents must self-check against this list before finalising:

```
[ ] title: is 50–65 characters?
[ ] description: is 150–160 characters exactly?
[ ] keywords: 6–10 items, all lowercase?
[ ] category: one of the 6 allowed enum values?
[ ] country: matches the intended folder?
[ ] relatedSlugs: all slugs actually exist in the same country folder?
[ ] No H1 (#) in the body?
[ ] At least 4 H2 sections?
[ ] FAQ section with at least 3 real Q&A pairs?
[ ] Post meets minimum word count for its category?
[ ] No AI clichés ("delve", "leverage", "Furthermore", etc.)?
[ ] Country-specific requirements (local currency, native context, regulations, languages) met?
[ ] All internal links use relative paths (/blog/slug, /pricing, /otp-api)?
[ ] No raw `tags:` field in frontmatter?
[ ] Line endings are LF (Unix)?
```

---

## 15. Blog Publishing Checklist

Use this before every post goes live.

### Content Quality

- [ ] Met minimum word count for the post's category
- [ ] Opening paragraph sets context without a heading
- [ ] 4–8 H2 sections with meaningful, keyword-informed titles
- [ ] No orphan H2s with only 1 paragraph — each section has substance
- [ ] FAQ section has 3–5 real questions and complete answers
- [ ] Closing CTA links to sign-up or relevant product page
- [ ] All code blocks are syntactically correct and runnable
- [ ] No passive "AI voice" phrases (see §11)

### Frontmatter

- [ ] `title` is 50–65 characters
- [ ] `description` is 150–160 characters
- [ ] `publishedAt` is a valid YYYY-MM-DD date
- [ ] `category` is one of 6 allowed values
- [ ] `country` matches the folder the file is saved in
- [ ] `keywords` has 6–10 items, all lowercase
- [ ] `relatedSlugs` are real existing slugs in the same country folder
- [ ] No extra fields (`tags`, `ogImage`, or others not in the schema)

### SEO & Technical

- [ ] No H1 (`#`) in the body
- [ ] Primary keyword appears in first 100 words
- [ ] At least 2 H2 headings contain secondary keywords naturally
- [ ] Internal links use relative paths, not absolute URLs (except for app.startmessaging.com)
- [ ] All internal links resolve (test them)
- [ ] Tables use markdown syntax (not raw HTML) unless absolutely necessary
- [ ] File saved with LF line endings

### Country/GEO

- [ ] Content is specific to the target country (not generic international)
- [ ] Currency is correct for the country
- [ ] Local regulatory context included where relevant
- [ ] Local platform/app references included where relevant (India: Jio/Airtel; Brazil: Mercado Livre/Pix; etc.)

---

## 16. Quick Reference Card

```
MINIMUM WORDS:  tutorials 1200 | guides 1500 | comparisons 1200
                compliance 1000 | use-cases 1200 | business 1000

TITLE:          50–65 chars | include primary keyword
DESCRIPTION:    150–160 chars EXACTLY | include primary keyword
KEYWORDS:       6–10 items | all lowercase | long-tail phrases

H1:             FROM FRONTMATTER TITLE ONLY — never in body
H2:             4–8 per post — major sections
H3:             2–5 per H2 — sub-sections
H4:             rarely — deep detail only
H5/H6:         never use

REQUIRED SECTIONS:
  1. Opening paragraph (no heading)
  2. 4+ H2 sections
  3. FAQ (3–5 real Q&As in **Q:** / A: format)
  4. Closing CTA

INDIA SPECIFICS:
  Currency: ₹ or Rs (₹0.25/OTP is fixed — never change)
  Carriers: Jio, Airtel, Vi, BSNL
  Regulations: TRAI, RBI, SEBI, IRDAI, DPDP Act
  Key differentiator: No DLT registration required

FORBIDDEN PHRASES:
  "In today's digital world" | "It is important to note"
  "Furthermore" | "Moreover" | "Additionally"
  "delve" | "tapestry" | "nuanced" | "leverage" | "ecosystem"
  "Let's dive in" | "In conclusion" | "As we all know"

FORBIDDEN IN FRONTMATTER:
  tags: [...]   ← use keywords: instead
  ogImage:      ← not in schema
  Any field not in content.config.ts schema
```

---

> **Questions about these guidelines?** Update this document. It is a living reference.  
> When industry regulations change (TRAI, RBI, Meta policies), update the relevant sections here first, then update affected blog posts.  
> All AI agents must re-read this file at the start of every blog-writing session — do not rely on cached context.
