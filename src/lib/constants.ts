/**
 * Shared constants — code snippets, language tabs, etc.
 * Per ASTRO_COUNTRY_PLAN.md §14.
 */

/** Programming language tabs for code showcase */
export const LANGUAGE_TABS = [
  { key: 'javascript', label: 'JavaScript', icon: 'js' },
  { key: 'python',     label: 'Python',     icon: 'py' },
  { key: 'php',        label: 'PHP',        icon: 'php' },
  { key: 'go',         label: 'Go',         icon: 'go' },
  { key: 'java',       label: 'Java',       icon: 'java' },
  { key: 'curl',       label: 'cURL',       icon: 'curl' },
] as const;

/** OTP API code snippets */
export const CODE_SNIPPETS = {
  sendOtp: {
    javascript: `const res = await fetch('https://api.startmessaging.com/otp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'sk_live_...'
  },
  body: JSON.stringify({ phone: '+919876543210' })
});
const data = await res.json();
console.log(data.requestId);`,

    python: `import requests

res = requests.post(
    'https://api.startmessaging.com/otp/send',
    headers={'X-API-Key': 'sk_live_...'},
    json={'phone': '+919876543210'}
)
print(res.json()['requestId'])`,

    curl: `curl -X POST https://api.startmessaging.com/otp/send \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: sk_live_..." \\
  -d '{"phone": "+919876543210"}'`,
  },
} as const;

/**
 * WhatsApp CRM app + public API host. Defined in content-tokens.mjs so the
 * MDX remark plugin and page JSON (`{{WA_API_BASE}}` tokens) share one value.
 */
import { WA_APP_URL, WA_API_BASE } from './content-tokens.mjs';
export { WA_APP_LIVE, WA_APP_URL, WA_LOGIN_URL, WA_API_BASE, replaceContentTokens, waSignupOpen, SIGNUP_URL_PATTERN } from './content-tokens.mjs';
export const WA_SIGNUP_URL = `${WA_APP_URL}/signup`;

/** External links */
export const EXTERNAL_LINKS = {
  app: 'https://app.startmessaging.com',
  signup: 'https://app.startmessaging.com/signup',
  login: 'https://app.startmessaging.com',
  apiDocs: 'https://api.startmessaging.com/api/docs',
  waApiDocs: `${WA_API_BASE}/api/v1/docs`,
  waOpenApi: `${WA_API_BASE}/api/v1/openapi.json`,
  whatsappSupport: 'https://wa.me/916376383348',
} as const;
