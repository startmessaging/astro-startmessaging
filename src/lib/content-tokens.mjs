/**
 * Single source for WhatsApp URLs that appear inside content.
 * Plain .mjs so both astro.config.mjs (remark plugin for MDX docs) and
 * src/lib/constants.ts (page JSON via ComponentRenderer) can import it.
 */

/**
 * Launch switch for the WhatsApp CRM app. While false, every link to
 * waba.startmessaging.com (page JSON, docs, navbar) is rewritten at build
 * time to the existing app at app.startmessaging.com. Set to true on launch day.
 */
export const WA_APP_LIVE = true;

/** WhatsApp CRM app (whatsapp-client) once live. Content may hard-code this. */
const WA_APP_LIVE_URL = 'https://waba.startmessaging.com';

/** Existing SMS console; its login page is the root. */
export const SMS_APP_URL = 'https://app.startmessaging.com';

/** Where WhatsApp CTAs actually point right now. */
export const WA_APP_URL = WA_APP_LIVE ? WA_APP_LIVE_URL : SMS_APP_URL;
export const WA_LOGIN_URL = WA_APP_LIVE ? `${WA_APP_LIVE_URL}/login` : SMS_APP_URL;

/**
 * WhatsApp public API host (whatsapp-server `PUBLIC_API_BASE_URL`), without
 * the `/api/v1` prefix — content appends it.
 */
export const WA_API_BASE = 'https://waba-api.startmessaging.com';

/** Tokens content may contain, replaced at build time. */
export const CONTENT_TOKENS = {
  '{{WA_API_BASE}}': WA_API_BASE,
  '{{WA_APP_URL}}': WA_APP_URL,
};

/** Replace content tokens, and pre-launch WhatsApp app links, in a string. */
export function replaceContentTokens(s) {
  if (typeof s !== 'string') return s;
  let out = s;
  if (out.includes('{{')) {
    for (const [token, value] of Object.entries(CONTENT_TOKENS)) out = out.replaceAll(token, value);
  }
  if (!WA_APP_LIVE && out.includes(WA_APP_LIVE_URL)) {
    out = out
      .replaceAll(`${WA_APP_LIVE_URL}/login`, WA_LOGIN_URL)
      .replaceAll(WA_APP_LIVE_URL, WA_APP_URL);
  }
  return out;
}

/**
 * Remark plugin: swap tokens in MDX code blocks, inline code, text and link URLs,
 * so docs can write `{{WA_API_BASE}}/api/v1/messages`.
 */
export function remarkContentTokens() {
  const walk = (node) => {
    if (typeof node.value === 'string') node.value = replaceContentTokens(node.value);
    if (typeof node.url === 'string') node.url = replaceContentTokens(node.url);
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}
