/**
 * IndexNow key verification endpoint: /indexnow/[key].txt
 * Returns the key itself for search engine verification.
 * Docs: https://www.indexnow.org/
 */
import type { APIRoute, GetStaticPaths } from 'astro';

export const prerender = true;

// IndexNow key for domain verification
const INDEXNOW_KEY = '973435a552dbf3f46866d05fa2438b08';

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
