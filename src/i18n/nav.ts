/**
 * Country-specific navigation and footer configuration.
 * Per ASTRO_COUNTRY_PLAN.md §4 + §6.
 *
 * India (in) → show SMS + WhatsApp + Auth API
 * Global countries → show WhatsApp only (no SMS)
 * All nav/footer text resolved from chrome.json via t().
 */
import { type Country, hasSms, urlPrefix } from '@/config/countries';
import { t } from './t';

export interface NavItem {
  key: string;
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

/**
 * Build nav items for a given country.
 * India gets SMS + WhatsApp + Pricing.
 * Global gets WhatsApp + Pricing only.
 */
export function getNavItems(country: Country): NavItem[] {
  const prefix = urlPrefix(country);
  const items: NavItem[] = [
    { key: 'whatsapp', label: t('nav.whatsapp', country), href: `${prefix}/whatsapp` },
  ];
  if (hasSms(country)) {
    items.push({ key: 'sms', label: t('nav.sms', country), href: `${prefix}/sms` });
  }
  items.push(
    { key: 'pricing', label: t('nav.pricing', country), href: `${prefix}/pricing` },
    { key: 'blog',    label: t('nav.blog', country),    href: `${prefix}/blog` },
  );
  return items;
}

export function getNavCta(country: Country): { login: string; cta: string } {
  return {
    login: t('nav.login', country),
    cta:   t('nav.signup', country),
  };
}

/**
 * Build footer columns for a given country.
 */
export function getFooterColumns(country: Country): FooterColumn[] {
  const prefix = urlPrefix(country);
  const cols: FooterColumn[] = [];

  // Column 1: Products
  const productLinks: FooterLink[] = [
    { label: t('nav.whatsapp', country), href: `${prefix}/whatsapp` },
  ];
  if (hasSms(country)) {
    productLinks.push({ label: t('nav.sms', country), href: `${prefix}/sms` });
    productLinks.push({ label: t('nav.authApi', country), href: `${prefix}/auth-api` });
  }
  productLinks.push(
    { label: t('nav.features', country), href: `${prefix}/features` },
    { label: t('nav.pricing', country), href: `${prefix}/pricing` },
    { label: t('footer.limits', country), href: `${prefix}/limits` }
  );
  cols.push({ heading: t('footer.product', country), links: productLinks });

  // Column 2: WhatsApp Business
  const waLinks: FooterLink[] = [
    { label: t('footer.broadcast', country), href: `${prefix}/whatsapp/broadcast` },
    { label: t('footer.campaigns', country), href: `${prefix}/whatsapp/campaigns` },
    { label: t('footer.marketing', country), href: `${prefix}/whatsapp/marketing` },
    { label: t('footer.chatbot', country), href: `${prefix}/whatsapp/chatbot` },
    { label: t('footer.utility', country), href: `${prefix}/whatsapp/utility` },
    { label: t('footer.authentication', country), href: `${prefix}/whatsapp/authentication` },
    { label: t('footer.autoTrigger', country), href: `${prefix}/whatsapp/auto-trigger` },
    { label: t('footer.bulkMessaging', country), href: `${prefix}/whatsapp/bulk-messaging` },
  ];
  cols.push({ heading: t('footer.whatsappApis', country), links: waLinks });

  // Column 3: Solutions / Use Cases
  const solutionsLinks: FooterLink[] = [];
  if (hasSms(country)) {
    solutionsLinks.push(
      { label: t('footer.smsDlt', country), href: `${prefix}/sms/dlt` },
      { label: t('footer.smsNonDlt', country), href: `${prefix}/sms/non-dlt` },
      { label: t('footer.dltFreeOtp', country), href: `${prefix}/dlt-free-otp` },
      { label: t('footer.sendOtpWithoutDlt', country), href: `${prefix}/send-otp-without-dlt` },
      { label: t('footer.otpApi', country), href: `${prefix}/otp-api` },
      { label: t('footer.bulkOtpApi', country), href: `${prefix}/bulk-otp-api` }
    );
  }
  solutionsLinks.push(
    { label: t('footer.useCasesHub', country), href: `${prefix}/use-cases` },
    { label: t('footer.ecommerce', country), href: `${prefix}/use-cases/ecommerce` },
    { label: t('footer.customerSupport', country), href: `${prefix}/use-cases/customer-support` },
    { label: t('footer.marketingCampaigns', country), href: `${prefix}/use-cases/marketing-campaigns` },
    { label: t('footer.notifications', country), href: `${prefix}/use-cases/notifications` }
  );
  // otpAuthentication use case only exists in India (SMS product) — Step 6 of seo_geo_analysis_report.md
  if (hasSms(country)) {
    solutionsLinks.push(
      { label: t('footer.otpAuthentication', country), href: `${prefix}/use-cases/otp-authentication` }
    );
  }
  cols.push({ heading: t('footer.solutions', country), links: solutionsLinks });

  // Column 4: Company & Legal
  const companyLinks: FooterLink[] = [
    { label: t('footer.about', country), href: `${prefix}/about` },
    { label: t('footer.contact', country), href: `${prefix}/contact` },
    { label: t('footer.videos', country), href: `${prefix}/videos` },
    { label: t('footer.blog', country), href: `${prefix}/blog` },
    { label: t('footer.docsWhatsapp', country), href: `${prefix}/docs/whatsapp/getting-started` }
  ];
  if (hasSms(country)) {
    companyLinks.push(
      { label: t('footer.docsSms', country), href: `${prefix}/docs/sms/getting-started` },
      { label: t('footer.docsAuth', country), href: `${prefix}/docs/auth-api/getting-started` }
    );
  }
  companyLinks.push(
    { label: t('footer.privacy', country), href: `${prefix}/privacy-policy` },
    { label: t('footer.terms', country), href: `${prefix}/terms-of-use` },
    { label: t('footer.refund', country), href: `${prefix}/refund-policy` },
    { label: t('footer.accountDeletion', country), href: `${prefix}/account-deletion` }
  );
  cols.push({ heading: t('footer.company', country), links: companyLinks });

  return cols;
}

export function getFooterTagline(country: Country): string {
  return t('footer.tagline', country);
}

export function getFooterLegal(country: Country): {
  copyright: string;
  privacy: string;
  terms: string;
} {
  return {
    copyright: t('footer.copyright', country),
    privacy:   t('footer.privacy', country),
    terms:     t('footer.terms', country),
  };
}

export function getFooterLegalHrefs(country: Country): {
  privacyHref: string;
  termsHref: string;
} {
  const prefix = urlPrefix(country);
  return {
    privacyHref: `${prefix}/privacy-policy`,
    termsHref:   `${prefix}/terms-of-use`,
  };
}
