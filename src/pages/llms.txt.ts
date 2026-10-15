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
- Campaigns (Team and up): approved template to tagged contacts, saved audiences or a CSV (up to 50,000 rows), variable mapping, opted-out contacts skipped; send now or schedule 2 minutes to 60 days ahead, campaign calendar, quiet hours, pre-launch check with a Meta cost estimate, pause/resume/cancel, funnel report with Meta charge and recipients export
- Business campaign tools: A/B tests with automatic winner, up to 3 follow-ups that stop on reply, repeating campaigns, engagement segments, retargeting, birthday/date and pipeline-stage audiences, conversions
- Shared team inbox (Team and up): assignment, round-robin, quick replies, search, media viewer, campaign reply context, 24-hour window timer, interactive buttons and lists
- CRM: contacts, tags, custom attributes, notes, CSV import/export, opt-in/opt-out handling, Click-to-WhatsApp ad attribution; kanban sales pipeline with conversions and reply routing on Business
- Automation: keyword auto-replies (Team and up) and a visual chatbot flow builder (Business)
- WhatsApp Forms (Meta Flows, Business) with answers delivered to the inbox, API and webhooks
- Analytics: template performance, message errors, Meta volume and charges by pricing category; agent performance and Meta template insights on Business
- Developer API (every plan): REST at ${WA_API_BASE}/api/v1 with Bearer API keys and 10 scopes, idempotency keys, cursor pagination, signed webhooks (12 event types), OpenAPI reference; send templates (including carousels and limited-time offers) and session messages; conversions API (POST /api/v1/conversions, Business, scope conversions:write); GET /me shows the plan and this month's API message count
- Plans (INR, GST included): Developer (API + view-only dashboard, by API messages a month: Developer Free ₹0 for 100, then 1K / 10K / 100K from ₹100 a month), Team ₹999 a month (3 seats), Business ₹2,999 a month (10 seats), Enterprise custom contract; extra seats ₹199 a month, viewers free; a year costs ten months. Every workspace starts with a 14-day free trial of Business; a workspace without a paid plan moves to Developer Free
- Meta pricing (since 1 Oct 2026): every delivered template is charged, utility included even inside the 24-hour window; service replies are free up to a monthly allowance per number; Click-to-WhatsApp ad chats get a 72-hour free entry point window

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
- WhatsApp CRM: flat subscription after a 14-day free trial of Business — Developer from ₹100 a month (Developer Free ₹0), Team ₹999, Business ₹2,999 a month, GST included; Enterprise custom. Meta bills message charges directly to your WhatsApp Business Account

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
- [WhatsApp API Developer Plan (API-only, free to start)](${siteUrl}whatsapp/developer)
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
