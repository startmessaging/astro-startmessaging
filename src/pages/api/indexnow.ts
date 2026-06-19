/**
 * Manual IndexNow submission endpoint
 * POST /api/indexnow with { urls: string[] }
 * Useful for manual triggering or webhook integrations
 */
import type { APIRoute } from 'astro';
import { submitToIndexNow } from '../../lib/indexnow';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    if (!body.urls || !Array.isArray(body.urls)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid request. Expected { urls: string[] }',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await submitToIndexNow(body.urls);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
