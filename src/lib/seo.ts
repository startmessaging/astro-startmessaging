/**
 * SEO helper functions — hreflang, canonical, OG.
 * Per ASTRO_COUNTRY_PLAN.md §11.
 */
import {
  COUNTRY_CONFIG,
  HREFLANG,
  OG_LOCALE,
  ALL_COUNTRIES,
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

/**
 * Localize a relative internal URL path to the current country's routing space.
 * Prevents navigational leakage back to India root when JSON manifests contain
 * hardcoded relative paths like "/pricing" or "/whatsapp".
 *
 * Rules:
 *  - External URLs (http/https), anchors (#), mailto:, tel: → returned unchanged
 *  - India (no prefix) → returned unchanged
 *  - Already prefixed paths (e.g. /br/pricing on a /br page) → returned unchanged
 *  - All other relative paths → prefixed with the country segment (e.g. /pricing → /br/pricing)
 *
 * Per seo_geo_analysis_report.md Step 5.
 */
export function localizeUrl(url: string, country: Country): string {
  if (!url) return '';

  // Pass through external links, fragments, and protocol handlers unchanged
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('#')
  ) {
    return url;
  }

  const prefix = urlPrefix(country);
  // India has no prefix — all paths are already at root
  if (!prefix) return url;

  const path = url.startsWith('/') ? url : `/${url}`;

  // Guard against double-prefixing (e.g. if already /br/pricing)
  if (path.startsWith(`${prefix}/`) || path === prefix) {
    return path;
  }

  return `${prefix}${path}`;
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
