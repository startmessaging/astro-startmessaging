import type { Locale } from './locales';
import { DEFAULT_LOCALE } from './locales';

import en from './global/en.json';
import ptBR from './global/pt-br.json';

const dicts: Record<Locale, Record<string, string>> = {
  'en':    en,
  'pt-br': ptBR,
};

/**
 * Translate a global key for the given locale.
 * Falls back to English, then returns the raw key if not found.
 *
 * Usage: t('nav.home', lang)
 */
export function t(key: string, lang: string): string {
  const dict = dicts[lang as Locale] ?? dicts[DEFAULT_LOCALE];
  return dict[key] ?? dicts[DEFAULT_LOCALE][key] ?? key;
}
