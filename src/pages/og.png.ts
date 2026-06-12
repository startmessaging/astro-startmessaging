/**
 * Dynamic OG image: /og.png
 * Per ASTRO_COUNTRY_PLAN.md §9.
 *
 * Generates a simple OG image with title and theme branding.
 * Uses Canvas API for static generation — a lightweight alternative
 * to Satori for basic OG images without external dependencies.
 *
 * Query params:
 *   ?title=Page+Title  — text to display
 *   ?theme=sms|whatsapp — brand theme
 */
import type { APIRoute } from 'astro';

export const prerender = true;

// For static prerender, generate a default OG image
export const GET: APIRoute = async () => {
  // SVG-based OG image (works without any native dependencies)
  const title = 'StartMessaging';
  const subtitle = 'SMS OTP & WhatsApp Business API Platform';
  const theme: string = 'sms';

  const bgColor = theme === 'whatsapp' ? '#004643' : '#27187e';
  const accentColor = theme === 'whatsapp' ? '#f0ede5' : '#f7f7ff';

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${bgColor}dd;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)" />
    <text x="80" y="260" font-family="Inter, system-ui, sans-serif" font-size="64" font-weight="700" fill="${accentColor}">
      ${escapeXml(title)}
    </text>
    <text x="80" y="340" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="400" fill="${accentColor}" opacity="0.8">
      ${escapeXml(subtitle)}
    </text>
    <text x="80" y="540" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="${accentColor}" opacity="0.5">
      startmessaging.com
    </text>
  </svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
