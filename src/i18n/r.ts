import { COUNTRY_CONFIG, type Country } from '@/config/countries';

/**
 * Resolve a localized value for a given country.
 * Per ASTRO_COUNTRY_PLAN.md §2.
 *
 * Content is keyed by **language code** (DRY: India + Nigeria share one `en` block).
 * A country code key may override a specific country when its prose must differ.
 *
 * Resolution order:
 *   1. Per-country override key ("ng": …)
 *   2. Country's language key ("en": …)
 *   3. English ultimate fallback
 *   4. First available value
 *
 * Usage:
 *   import { r } from '@/i18n/r';
 *   const { title, country } = Astro.props;
 *   <h1>{r(title, country)}</h1>
 */
export type Localized = string | Record<string, string>;

export function r(val: Localized | undefined | null, country: Country): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'string') return val;         // non-translatable scalar
  const lang = COUNTRY_CONFIG[country].lang;
  return val[country]                              // 1. per-country override ("ng": …)
      ?? val[lang]                                 // 2. language default ("en": …)
      ?? val['en']                                 // 3. English ultimate fallback
      ?? Object.values(val)[0] ?? '';              // 4. first available
}

/**
 * Build-time warning when a translation key is missing for a country's language.
 * Logs to console but never breaks the build.
 */
export function rWarn(val: Localized | undefined | null, country: Country, context = ''): string {
  const resolved = r(val, country);
  if (typeof val === 'object' && val !== null) {
    const lang = COUNTRY_CONFIG[country].lang;
    if (!val[country] && !val[lang]) {
      console.warn(
        `[i18n] Missing "${lang}" translation for country "${country}"${context ? ` in ${context}` : ''}. Falling back to "en".`
      );
    }
  }
  return resolved;
}
