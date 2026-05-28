/**
 * Locale-specific navigation and footer configuration.
 *
 * Only items listed for a locale are rendered.
 * Add a locale key here when a new page goes live in that locale.
 *
 * hrefs are relative path segments passed to getRelativeLocaleUrl(),
 * so do NOT include a leading slash.
 */
import type { Locale } from './locales';

export interface NavItem {
  key: string;   // unique identifier — used as React key
  label: string; // already localised — no t() needed
  href: string;  // relative segment, e.g. "whatsapp/bulk-messaging"
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

// ─── Top navigation ────────────────────────────────────────────────────────

export const NAV_ITEMS: Record<Locale, NavItem[]> = {
  en: [
    { key: 'whatsapp', label: 'WhatsApp', href: 'whatsapp' },
    { key: 'sms',      label: 'SMS',      href: 'sms' },
    { key: 'pricing',  label: 'Pricing',  href: 'pricing' },
    { key: 'blog',     label: 'Blog',     href: 'blog' },
    { key: 'docs',     label: 'Docs',     href: 'docs' },
  ],
  'pt-br': [
    // SMS and Docs pages not yet available in Portuguese
    { key: 'whatsapp', label: 'WhatsApp', href: 'whatsapp' },
    { key: 'pricing',  label: 'Preços',   href: 'pricing' },
    { key: 'blog',     label: 'Blog',     href: 'blog' },
  ],
};

export const NAV_CTA: Record<Locale, { login: string; cta: string }> = {
  en:    { login: 'Login',  cta: 'Get Started Free' },
  'pt-br': { login: 'Entrar', cta: 'Começar Grátis' },
};

// ─── Footer ────────────────────────────────────────────────────────────────

export const FOOTER_BRAND_TAGLINE: Record<Locale, string> = {
  en:    'The WhatsApp Business API platform built for growth.',
  'pt-br': 'A plataforma de API WhatsApp Business feita para crescer.',
};

export const FOOTER_COLUMNS: Record<Locale, FooterColumn[]> = {
  en: [
    {
      heading: 'Product',
      links: [
        { label: 'WhatsApp API',   href: 'whatsapp' },
        { label: 'Bulk Messaging', href: 'whatsapp/bulk-messaging' },
        { label: 'Pricing',        href: 'pricing' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Blog',  href: 'blog' },
        { label: 'Docs',  href: 'docs' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About',   href: 'about' },
        { label: 'Contact', href: 'contact' },
      ],
    },
  ],
  'pt-br': [
    {
      heading: 'Produto',
      links: [
        { label: 'WhatsApp API',     href: 'whatsapp' },
        { label: 'Envio em Massa',   href: 'whatsapp/bulk-messaging' },
        { label: 'Preços',           href: 'pricing' },
      ],
    },
    {
      heading: 'Recursos',
      links: [
        { label: 'Blog', href: 'blog' },
      ],
    },
    {
      heading: 'Empresa',
      links: [
        { label: 'Contato', href: 'contact' },
      ],
    },
  ],
};

export const FOOTER_LEGAL: Record<Locale, { copyright: string; privacy: string; terms: string }> = {
  en: {
    copyright: '© 2026 StartMessaging. All rights reserved.',
    privacy:   'Privacy Policy',
    terms:     'Terms of Service',
  },
  'pt-br': {
    copyright: '© 2026 StartMessaging. Todos os direitos reservados.',
    privacy:   'Política de Privacidade',
    terms:     'Termos de Serviço',
  },
};
