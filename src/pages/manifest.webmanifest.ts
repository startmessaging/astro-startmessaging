/**
 * Web App Manifest: /manifest.webmanifest
 * Per ASTRO_COUNTRY_PLAN.md §9.
 */
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const manifest = {
    name: 'StartMessaging',
    short_name: 'StartMsg',
    description: 'SMS OTP & WhatsApp Business API Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f7ff',
    theme_color: '#27187e',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
