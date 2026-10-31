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
    logo: `${SITE}/favicon.svg`,
    sameAs: [
      'https://twitter.com/startmessaging',
      'https://linkedin.com/company/startmessaging',
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Madhav Dadhich',
        jobTitle: 'Co-founder',
        sameAs: ['https://www.linkedin.com/in/madhavdadhich/'],
      },
    ],
    areaServed: ALL_COUNTRIES.map((c) => ({
      '@type': 'Country',
      name: COUNTRY_CONFIG[c].name,
    })),
  };
}

/** WebSite schema — homepage only */
export function buildWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: SITE,
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

/** SoftwareApplication schema — for pricing/home pages */
export function buildSoftwareApplication() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'StartMessaging',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'WhatsApp CRM on the official WhatsApp Business Platform (campaigns, shared team inbox, chatbot flows, REST API) and SMS OTP platform for India.',
    url: SITE,
    provider: { '@type': 'Organization', name: ORG_NAME, url: SITE },
  };
}

/** Product/Offer schema for pricing plans */
export function buildProductOffer(options: {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: options.name,
    applicationCategory: 'BusinessApplication',
    description: options.description,
    offers: {
      '@type': 'Offer',
      price: options.price,
      priceCurrency: options.priceCurrency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: options.price,
        priceCurrency: options.priceCurrency,
        unitCode: 'MON', // per month
      },
      availability: 'https://schema.org/InStock',
      url: options.url || SITE,
    },
  };
}

/** ContactPage schema with contact information */
export function buildContactPage(options: {
  email: string;
  telephone: string;
  availableLanguages?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: SITE,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: options.telephone,
        email: options.email,
        contactType: 'customer service',
        availableLanguage: options.availableLanguages || ['en', 'pt', 'es', 'id', 'ar', 'tr'],
        areaServed: ALL_COUNTRIES.map((c) => ({
          '@type': 'Country',
          name: COUNTRY_CONFIG[c].name,
        })),
      },
    },
  };
}

/**
 * Read the FAQ out of a docs page's Markdown so the FAQPage schema always
 * matches the visible text. Expects the docs convention: a `## FAQ` heading,
 * then `**Question?**` on its own line followed by the answer, until the next
 * question or heading. Also reads the blog convention: `**Q: Question?**` then
 * `A: answer`, with the section ending at a heading or a `---` rule (the
 * closing CTA after the rule is not part of the last answer).
 */
export function faqFromMarkdown(body: string | undefined): { question: string; answer: string }[] {
  if (!body) return [];
  // English plus the localized headings used by the country blogs (pt, es, id, tr, ar).
  const section = body.replace(/\r/g, '').split(/^##\s+(?:FAQ|Frequently Asked Questions|Perguntas Frequentes|Preguntas Frecuentes|Pertanyaan yang Sering Diajukan|Sıkça Sorulan Sorular|الأسئلة الشائعة)(?:\s.*)?$/m)[1];
  if (!section) return [];
  const faq = section.split(/^(?:##\s|---\s*$)/m)[0];
  const plain = (s: string) => s
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const items: { question: string; answer: string }[] = [];
  const re = /^\*\*(.+?)\*\*\s*$([\s\S]*?)(?=^\*\*.+?\*\*\s*$|(?![\s\S]))/gm;
  for (const m of faq.matchAll(re)) {
    const question = plain(m[1]).replace(/^Q:\s*/, '');
    // A blog `A:` answer is its own paragraph; anything after the blank line
    // (often the closing CTA) is not part of it.
    const raw = m[2].trim();
    const answer = plain(/^A:/.test(raw) ? raw.split(/\n\s*\n/)[0] : raw).replace(/^A:\s*/, '');
    if (question && answer) items.push({ question, answer });
  }
  return items;
}
