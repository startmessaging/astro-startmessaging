/**
 * Global chrome string resolver.
 * Reads from chrome.json (all languages inline) using dot-path traversal + r().
 * Per ASTRO_COUNTRY_PLAN.md §2.
 *
 * Usage: t('nav.signup', 'br') → "Começar Grátis"
 *        t('banner.notice', 'ae') → Arabic notice text
 */
import chrome from './chrome.json';
import { r } from './r';
import type { Country } from '@/config/countries';

function get(obj: any, path: string): any {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

export function t(key: string, country: Country): string {
  const val = get(chrome, key);
  if (val === undefined) {
    console.warn(`[chrome] missing key "${key}"`);
    return key;
  }
  return r(val, country);
}
