/**
 * Country configuration — single source of truth for all 7 countries.
 * Per ASTRO_COUNTRY_PLAN.md §1.
 *
 * India is the root (`/`). Every other country is path-prefixed by its 2-letter code.
 * Each country maps to exactly one official language and one currency.
 *
 * To add a country: add one row here + HREFLANG/OG_LOCALE/IP_TO_COUNTRY,
 * then fill JSON keys in page manifests + chrome.json.
 */

export const COUNTRY_CONFIG = {
  in: { code: 'IN', name: 'India',       lang: 'en', currency: 'INR', symbol: '₹',   dir: 'ltr' as const, root: true,  services: ['sms-nondlt', 'sms-dlt', 'auth-api', 'whatsapp'] },
  br: { code: 'BR', name: 'Brazil',      lang: 'pt', currency: 'BRL', symbol: 'R$',  dir: 'ltr' as const, root: false, services: ['whatsapp'] },
  mx: { code: 'MX', name: 'Mexico',      lang: 'es', currency: 'MXN', symbol: '$',   dir: 'ltr' as const, root: false, services: ['whatsapp'] },
  id: { code: 'ID', name: 'Indonesia',   lang: 'id', currency: 'IDR', symbol: 'Rp',  dir: 'ltr' as const, root: false, services: ['whatsapp'] },
  ae: { code: 'AE', name: 'UAE',         lang: 'ar', currency: 'AED', symbol: 'د.إ', dir: 'rtl' as const, root: false, services: ['whatsapp'] },
  tr: { code: 'TR', name: 'Türkiye',     lang: 'tr', currency: 'TRY', symbol: '₺',   dir: 'ltr' as const, root: false, services: ['whatsapp'] },
  ng: { code: 'NG', name: 'Nigeria',     lang: 'en', currency: 'NGN', symbol: '₦',   dir: 'ltr' as const, root: false, services: ['whatsapp'] },
} as const;

/** Country key type: 'in' | 'br' | 'mx' | 'id' | 'ae' | 'tr' | 'ng' */
export type Country = keyof typeof COUNTRY_CONFIG;

/** All country codes as an array */
export const ALL_COUNTRIES = Object.keys(COUNTRY_CONFIG) as Country[];

/** Default country (India at root) */
export const DEFAULT_COUNTRY: Country = 'in';

/** Get the language code for a country */
export const langOf = (c: Country): string => COUNTRY_CONFIG[c].lang;

/** BCP 47 hreflang codes: language-REGION (Google's preferred granularity) */
export const HREFLANG: Record<Country, string> = {
  in: 'en-IN',
  br: 'pt-BR',
  mx: 'es-MX',
  id: 'id-ID',
  ae: 'ar-AE',
  tr: 'tr-TR',
  ng: 'en-NG',
};

/** og:locale uses underscores */
export const OG_LOCALE: Record<Country, string> = {
  in: 'en_IN',
  br: 'pt_BR',
  mx: 'es_MX',
  id: 'id_ID',
  ae: 'ar_AE',
  tr: 'tr_TR',
  ng: 'en_NG',
};

/**
 * Map detected IP country (ISO-3166 alpha-2) → our site country.
 * Visitors from unsupported countries land on India root (no notice shown).
 */
export const IP_TO_COUNTRY: Record<string, Country> = {
  IN: 'in',
  BR: 'br',
  MX: 'mx',
  ID: 'id',
  AE: 'ae',
  TR: 'tr',
  NG: 'ng',
  // Regional nudges (optional — expand later):
  // SA: 'ae', KW: 'ae', QA: 'ae',  // Gulf Arabic → UAE
};

/** Human-readable country labels for the country notice */
export const COUNTRY_LABEL: Record<Country, string> = {
  in: 'India',
  br: 'Brasil',
  mx: 'México',
  id: 'Indonesia',
  ae: 'الإمارات',
  tr: 'Türkiye',
  ng: 'Nigeria',
};

/** Does this country have SMS services? (India only) */
export const hasSms = (c: Country): boolean =>
  (COUNTRY_CONFIG[c].services as readonly string[]).includes('sms-nondlt');

/** Is this the India country? */
export const isIndia = (c: Country): boolean => c === 'in';

/** URL prefix for a country: '' for India (root), '/br' for Brazil, etc. */
export const urlPrefix = (c: Country): string =>
  c === DEFAULT_COUNTRY ? '' : `/${c}`;
