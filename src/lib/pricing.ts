/**
 * Per-country pricing data.
 * Per ASTRO_COUNTRY_PLAN.md §14.
 *
 * India ₹0.25 non-DLT is LOCKED for SEO.
 */
import type { Country } from '@/config/countries';
import { COUNTRY_CONFIG } from '@/config/countries';

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  cta: string;
  ctaHref: string;
  features: string[];
  highlighted?: boolean;
}

/** Per-country WhatsApp message costs (approximate, for display) */
export const WHATSAPP_PRICING: Record<Country, { marketing: string; utility: string; auth: string }> = {
  in: { marketing: '₹0.77',  utility: '₹0.20', auth: '₹0.20' },
  br: { marketing: 'R$0.50', utility: 'R$0.16', auth: 'R$0.16' },
  mx: { marketing: '$0.50',  utility: '$0.10',  auth: '$0.10' },
  id: { marketing: 'Rp1500', utility: 'Rp300',  auth: 'Rp300' },
  ae: { marketing: 'د.إ0.27', utility: 'د.إ0.07', auth: 'د.إ0.07' },
  tr: { marketing: '₺1.00', utility: '₺0.20',  auth: '₺0.20' },
  ng: { marketing: '₦100',  utility: '₦25',    auth: '₦25' },
};

/** India SMS pricing (LOCKED values) */
export const SMS_PRICING = {
  nonDlt: { price: '₹0.25', label: 'per message', note: 'No DLT registration required' },
  dlt:    { price: '₹0.18', label: 'per message', note: 'Pre-registered DLT templates' },
};

/** Auth API pricing (India only) */
export const AUTH_PRICING = {
  price: '₹0.30',
  label: 'per verification',
};

/** Plan tiers (all countries) */
export function getPlanTiers(country: Country): { name: string; description: string }[] {
  const cfg = COUNTRY_CONFIG[country];
  return [
    {
      name: 'Pay As You Go',
      description: 'No monthly fee. Wallet-based. Start immediately.',
    },
    {
      name: 'Premium',
      description: 'Monthly subscription with volume discounts and SLA.',
    },
    {
      name: 'Enterprise',
      description: 'Custom pricing, dedicated support.',
    },
  ];
}

/** Get formatted currency for display */
export function formatCurrency(country: Country): { code: string; symbol: string } {
  const cfg = COUNTRY_CONFIG[country];
  return { code: cfg.currency, symbol: cfg.symbol };
}
