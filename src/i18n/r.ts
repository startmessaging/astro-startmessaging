import { DEFAULT_LOCALE } from './locales';

/**
 * Resolve a LocalizedString to a plain string for the given locale.
 *
 * Usage in any Astro component:
 *   import { r } from '@/i18n/r';
 *   const { title, lang } = Astro.props;
 *   <h1>{r(title, lang)}</h1>
 *
 * A LocalizedString is either:
 *   - a plain string (same in all locales)
 *   - a locale map { en: "...", "pt-BR": "..." }
 */
export type LocalizedString = string | Record<string, string>;

export function r(val: LocalizedString | undefined | null, lang: string): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'string') return val;
  return val[lang] ?? val[DEFAULT_LOCALE] ?? Object.values(val)[0] ?? '';
}

/**
 * Build warning when a translation key is missing for a locale.
 * Called during build — logs to console but does not throw.
 */
export function rWarn(val: LocalizedString | undefined | null, lang: string, context = ''): string {
  const resolved = r(val, lang);
  if (typeof val === 'object' && val !== null && !val[lang]) {
    console.warn(`[i18n] Missing "${lang}" translation${context ? ` for ${context}` : ''}. Falling back to "${DEFAULT_LOCALE}".`);
  }
  return resolved;
}
