/**
 * IndexNow key verification endpoint: /indexnow/[key]
 * Per ASTRO_COUNTRY_PLAN.md §9.
 * Returns the key itself for search engine verification.
 */
import type { APIRoute, GetStaticPaths } from 'astro';

export const prerender = true;

// IndexNow key — replace with your actual key from IndexNow dashboard
const INDEXNOW_KEY = 'startmessaging-indexnow-key';

export const getStaticPaths: GetStaticPaths = () => {
  return [{ params: { key: INDEXNOW_KEY } }];
};

export const GET: APIRoute = ({ params }) => {
  return new Response(params.key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
