/**
 * llms.txt — machine-readable site information for LLMs.
 * Per ASTRO_COUNTRY_PLAN.md §9.
 * Substantive content describing the product, services, API, and supported countries.
 */
import type { APIRoute } from 'astro';
import { WA_APP_URL, WA_API_BASE } from '@/lib/constants';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.href ?? 'https://startmessaging.com';

  const content = `# StartMessaging
> WhatsApp CRM & SMS OTP Platform

## About
StartMessaging offers a WhatsApp CRM built on the official WhatsApp Business Platform (global) and an SMS OTP API (India). Both come with REST APIs for developers.

## Products

### SMS OTP API (India Only)
- Send OTP via SMS at ₹0.25 per message
- No DLT registration required — compliance handled by StartMessaging
- Two endpoints: /otp/send and /otp/verify
- 97–99% delivery rate across Jio, Airtel, Vi, and BSNL
- Built-in rate limiting, bcrypt hashing, and fraud detection
- INR prepaid wallet billing with no monthly fees
- API key authentication via X-API-Key header

### Auth API (India Only, coming soon)
- Managed OTP verification flow
- Send OTP and verify OTP endpoints
- Configurable expiry (default 5 minutes)
- 3 verification attempts per OTP
- Idempotency key support

### WhatsApp CRM (Global — 7 Countries)
- StartMessaging is a Meta Tech Provider: customers connect their own WhatsApp Business Account through Meta Embedded Signup
- Meta bills WhatsApp messages directly to the customer's own WhatsApp Business Account; StartMessaging charges only a flat CRM subscription (no per-message markup, no wallet)
- App: ${WA_APP_URL}
- Template builder: marketing, utility and authentication templates; carousel, limited-time offer, copy-code, URL, quick-reply, WhatsApp Form, catalog buttons; 16 languages
- Campaigns: approved template to tagged contacts or a CSV audience, variable mapping, opted-out contacts skipped, pause/resume, delivery analytics
- Shared team inbox: assignment, round-robin, quick replies, 24-hour window timer, interactive buttons and lists
- CRM: contacts, tags, custom attributes, notes, kanban pipeline, CSV import/export, opt-in/opt-out handling, Click-to-WhatsApp ad attribution
- Automation: keyword auto-replies and a visual chatbot flow builder
- WhatsApp Forms (Meta Flows) with answers delivered to the inbox, API and webhooks
- Analytics: agent performance, template performance, message errors, Meta volume by pricing category
- Developer API: REST at ${WA_API_BASE}/api/v1 with Bearer API keys and scopes, idempotency keys, cursor pagination, signed webhooks (12 event types), OpenAPI reference
- Plans: 14-day free trial, then Basic or Advanced (prices to be announced)

## Supported Countries
| Country | Currency | Language | Products |
|---------|----------|----------|----------|
| India (default) | INR ₹ | English | SMS OTP, Auth API, WhatsApp |
| Brazil | BRL R$ | Portuguese | WhatsApp |
| Mexico | MXN $ | Spanish | WhatsApp |
| Indonesia | IDR Rp | Indonesian | WhatsApp |
| UAE | AED د.إ | Arabic | WhatsApp |
| Turkey | TRY ₺ | Turkish | WhatsApp |
| Nigeria | NGN ₦ | English | WhatsApp |

## Pricing
- SMS OTP (India): ₹0.25 per OTP (flat rate, no DLT required)
- SMS: no monthly fees, no minimum commitment, prepaid wallet
- WhatsApp CRM: flat subscription after a 14-day free trial (prices to be announced); Meta bills message charges directly to your WhatsApp Business Account

## API Base URLs
- [SMS API](https://api.startmessaging.com)
- [WhatsApp API](${WA_API_BASE}/api/v1) — OpenAPI: ${WA_API_BASE}/api/v1/openapi.json

## Documentation
- [WhatsApp API](${siteUrl}docs/whatsapp/getting-started)
- [WhatsApp API Reference](${siteUrl}docs/whatsapp/api-reference)
- [WhatsApp Webhooks](${siteUrl}docs/whatsapp/webhooks)
- [SMS API](${siteUrl}docs/sms/getting-started)
- [Auth API](${siteUrl}docs/auth-api/getting-started)

## Key Pages
- [Home](${siteUrl})
- [Features](${siteUrl}features)
- [Pricing](${siteUrl}pricing)
- [WhatsApp](${siteUrl}whatsapp)
- [WhatsApp Shared Team Inbox](${siteUrl}whatsapp/shared-inbox)
- [WhatsApp CRM & Pipeline](${siteUrl}whatsapp/crm)
- [WhatsApp Campaigns & Broadcasts](${siteUrl}whatsapp/broadcast)
- [WhatsApp Chatbot Flows](${siteUrl}whatsapp/chatbot)
- [WhatsApp Template Builder](${siteUrl}whatsapp/templates)
- [WhatsApp Forms](${siteUrl}whatsapp/whatsapp-forms)
- [Click-to-WhatsApp Ads](${siteUrl}whatsapp/click-to-whatsapp-ads)
- [WhatsApp Developer API](${siteUrl}whatsapp/api)
- [SMS](${siteUrl}sms)
- [Blog](${siteUrl}blog)
- [Contact](${siteUrl}contact)

## Contact
- [Website Contact Page](${siteUrl}contact)
- [SMS Console](https://app.startmessaging.com)
- [WhatsApp CRM](${WA_APP_URL})
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
