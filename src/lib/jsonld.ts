/**
 * JSON-LD schema builders.
 * Per ASTRO_COUNTRY_PLAN.md §11.
 *
 * Each function returns a plain object ready for JSON.stringify().
 */
import type { Country } from '@/config/countries';
import { COUNTRY_CONFIG, ALL_COUNTRIES } from '@/config/countries';

const SITE = 'https://startmessaging.com';
const ORG_NAME = 'StartMessaging';

/** Organization schema — on every page */
export function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: SITE,
    sameAs: [
      'https://twitter.com/startmessaging',
      'https://linkedin.com/company/startmessaging',
    ],
    areaServed: ALL_COUNTRIES.map((c) => ({
      '@type': 'Country',
      name: COUNTRY_CONFIG[c].name,
    })),
  };
}

/** WebSite schema with SearchAction — homepage only */
export function buildWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: SITE,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** WebPage schema — on every page */
export function buildWebPage(title: string, description: string, url: string, hreflang: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    inLanguage: hreflang,
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Service schema — for WhatsApp sub-pages */
export function buildService(
  name: string,
  serviceType: string,
  description: string,
  url: string,
  countries: Country[] = ALL_COUNTRIES as Country[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    name: `${ORG_NAME} ${name}`,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: SITE,
    },
    areaServed: countries.map((c) => ({
      '@type': 'Country',
      name: COUNTRY_CONFIG[c].name,
    })),
  };
}

/** FAQPage schema — for pages with FAQ sections */
export function buildFaqPage(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** HowTo schema — for step-by-step guides */
export function buildHowTo(
  name: string,
  description: string,
  steps: { name: string; text: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Article schema — for blog posts */
export function buildArticle(
  title: string,
  description: string,
  url: string,
  publishedAt: Date,
  updatedAt?: Date,
  ogImage?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedAt.toISOString(),
    dateModified: (updatedAt ?? publishedAt).toISOString(),
    author: { '@type': 'Organization', name: ORG_NAME },
    publisher: { '@type': 'Organization', name: ORG_NAME, url: SITE },
    ...(ogImage ? { image: ogImage } : {}),
  };
}
