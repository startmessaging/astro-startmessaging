/**
 * SEO helper functions — hreflang, canonical, OG.
 * Per ASTRO_COUNTRY_PLAN.md §11.
 */
import {
  COUNTRY_CONFIG,
  HREFLANG,
  OG_LOCALE,
  ALL_COUNTRIES,
  DEFAULT_COUNTRY,
  urlPrefix,
  type Country,
} from '@/config/countries';

const SITE = 'https://startmessaging.com';

/** Build hreflang link objects for a page that exists in given countries */
export function buildHreflangLinks(
  slug: string,
  pageCountries: Country[] = ALL_COUNTRIES as Country[]
): { hreflang: string; href: string }[] {
  return pageCountries
    .filter((c) => c in COUNTRY_CONFIG)
    .map((c) => {
      const prefix = urlPrefix(c);
      const path = slug ? `${prefix}/${slug}` : (prefix || '/');
      return {
        hreflang: HREFLANG[c],
        href: `${SITE}${path}`,
      };
    });
}

/** Build canonical URL for a country + slug */
export function buildCanonical(country: Country, slug: string): string {
  const prefix = urlPrefix(country);
  const path = slug ? `${prefix}/${slug}` : (prefix || '/');
  return `${SITE}${path}`;
}

/** Build x-default URL (always India root) */
export function buildXDefault(slug: string): string {
  return slug ? `${SITE}/${slug}` : SITE;
}

/** Get og:locale for a country */
export function getOgLocale(country: Country): string {
  return OG_LOCALE[country] ?? 'en_IN';
}

/** Get HTML lang attribute for a country */
export function getHtmlLang(country: Country): string {
  return COUNTRY_CONFIG[country]?.lang ?? 'en';
}

/** Get text direction for a country */
export function getDir(country: Country): 'ltr' | 'rtl' {
  return COUNTRY_CONFIG[country]?.dir ?? 'ltr';
}
