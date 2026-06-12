/**
 * llms.txt — machine-readable site information for LLMs.
 * Per ASTRO_COUNTRY_PLAN.md §9.
 * Substantive content describing the product, services, API, and supported countries.
 */
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.href ?? 'https://startmessaging.com';

  const content = `# StartMessaging
> SMS OTP & WhatsApp Business API Platform

## About
StartMessaging is a business messaging platform offering SMS OTP verification and WhatsApp Business API services. The platform provides REST APIs for developers to integrate phone number verification (OTP) and WhatsApp messaging into their applications.

## Products

### SMS OTP API (India Only)
- Send OTP via SMS at ₹0.25 per message
- No DLT registration required — compliance handled by StartMessaging
- Two endpoints: /otp/send and /otp/verify
- 97–99% delivery rate across Jio, Airtel, Vi, and BSNL
- Built-in rate limiting, bcrypt hashing, and fraud detection
- INR prepaid wallet billing with no monthly fees
- API key authentication via X-API-Key header

### Auth API (India Only)
- Managed OTP verification flow
- Send OTP and verify OTP endpoints
- Configurable expiry (default 5 minutes)
- 3 verification attempts per OTP
- Idempotency key support

### WhatsApp Business API (Global — 7 Countries)
- Official Meta Business Solution Provider
- Broadcast messaging to opted-in contact lists
- Campaign management with segmentation
- Marketing automation with triggers
- Authentication (OTP via WhatsApp)
- Utility/transactional messages
- Auto-trigger workflows
- Chatbot and agent routing
- Message template management
- Webhook delivery receipts
- Media message support (images, documents, video)

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
- WhatsApp: Per-conversation pricing based on Meta's rates, varies by country and message category
- No monthly fees, no minimum commitment
- Prepaid wallet model

## API Base URL
https://api.startmessaging.com

## Documentation
- WhatsApp API: ${siteUrl}docs/whatsapp/getting-started
- SMS API: ${siteUrl}docs/sms/getting-started
- Auth API: ${siteUrl}docs/auth-api/getting-started

## Key Pages
- Home: ${siteUrl}
- Features: ${siteUrl}features
- Pricing: ${siteUrl}pricing
- WhatsApp: ${siteUrl}whatsapp
- SMS: ${siteUrl}sms
- Blog: ${siteUrl}blog
- Contact: ${siteUrl}contact

## SDKs
- Node.js: @startmessaging/node
- Python: startmessaging
- PHP: startmessaging/php-sdk
- Java: com.startmessaging:sdk
- Go: github.com/startmessaging/go-sdk

## Contact
- Website: ${siteUrl}contact
- App: https://app.startmessaging.com
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
