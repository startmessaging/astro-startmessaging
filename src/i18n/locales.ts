export const ALL_LOCALES = ['en', 'pt-br'] as const;
export type Locale = (typeof ALL_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** BCP 47 codes for hreflang + @astrojs/sitemap i18n.
 *  URL key is lowercase (e.g. pt-br), BCP 47 value uses standard casing. */
export const HREFLANG: Record<Locale, string> = {
  'en':    'en-US',
  'pt-br': 'pt-BR',
};

/** og:locale uses underscores */
export const OG_LOCALE: Record<Locale, string> = {
  'en':    'en_US',
  'pt-br': 'pt_BR',
};

/** Human-readable name for language pickers */
export const LOCALE_LABEL: Record<Locale, string> = {
  'en':    'English',
  'pt-br': 'Português (BR)',
};

export function isValidLocale(lang: string): lang is Locale {
  return ALL_LOCALES.includes(lang as Locale);
}
