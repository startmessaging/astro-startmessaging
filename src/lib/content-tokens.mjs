/**
 * Single source for WhatsApp URLs that appear inside content.
 * Plain .mjs so both astro.config.mjs (remark plugin for MDX docs) and
 * src/lib/constants.ts (page JSON via ComponentRenderer) can import it.
 */

/** WhatsApp CRM app (whatsapp-client). */
export const WA_APP_URL = 'https://whatsapp.startmessaging.com';

/**
 * WhatsApp public API host (whatsapp-server `PUBLIC_API_BASE_URL`).
 * TODO: confirm the production host before launch.
 */
export const WA_API_BASE = 'https://api.whatsapp.startmessaging.com';

/** Tokens content may contain, replaced at build time. */
export const CONTENT_TOKENS = {
  '{{WA_API_BASE}}': WA_API_BASE,
  '{{WA_APP_URL}}': WA_APP_URL,
};

/** Replace every content token in a string. */
export function replaceContentTokens(s) {
  if (typeof s !== 'string' || !s.includes('{{')) return s;
  let out = s;
  for (const [token, value] of Object.entries(CONTENT_TOKENS)) out = out.replaceAll(token, value);
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
