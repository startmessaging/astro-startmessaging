import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * GET /api/geo
 *
 * Returns the detected country for the requesting IP.
 * Uses Cloudflare/Vercel/Netlify geo headers when available,
 * otherwise falls back to a basic IP → country lookup.
 *
 * Response: { "country": "BR" }   (ISO 3166-1 alpha-2)
 *
 * The CountryNotice component calls this endpoint client-side
 * to detect country mismatch and suggest switching.
 */
export const GET: APIRoute = ({ request }) => {
  // 1. Try platform geo headers (most reliable)
  const cfCountry = request.headers.get('cf-ipcountry');            // Cloudflare
  const vercelCountry = request.headers.get('x-vercel-ip-country'); // Vercel
  const netlifyCountry = request.headers.get('x-country');          // Netlify

  const detectedCountry = cfCountry || vercelCountry || netlifyCountry || 'IN';

  return new Response(
    JSON.stringify({ country: detectedCountry.toUpperCase() }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
};
