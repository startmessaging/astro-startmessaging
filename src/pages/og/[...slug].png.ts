/**
 * Dynamic OG image generator: /og/[...slug].png
 *
 * RUNTIME edge function — generates blog post OG images on first request,
 * cached at CDN edge permanently after. Zero build-time cost regardless
 * of blog post count.
 *
 * Handles:
 *   /og/default.png                        → branded fallback
 *   /og/in/blog/[slug].png                 → India blog posts
 *   /og/[country]/blog/[slug].png          → other country blog posts
 *
 * Static marketing pages use handcrafted JPGs in public/og/ directly.
 * Those never hit this endpoint.
 */

import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const prerender = false;

// Load local fonts once at module level (edge cold start, then cached)
const regularFont = readFileSync(join(process.cwd(), 'src/assets/fonts/Inter-Regular.ttf'));
const boldFont = readFileSync(join(process.cwd(), 'src/assets/fonts/Inter-Bold.ttf'));

// Supported country slugs
const COUNTRY_SLUGS = new Set(['in', 'br', 'mx', 'id', 'ae', 'tr', 'ng']);

// Country → WhatsApp theme mapping
const WA_COUNTRIES = new Set(['br', 'mx', 'id', 'ae', 'tr', 'ng']);

function formatTitle(rawSlug: string): string {
  return rawSlug
    .split(/[-/]/)
    .map((w) => {
      const lower = w.toLowerCase();
      if (lower === 'vs') return 'vs';
      if (['sms', 'otp', 'rcs', 'dlt', 'trai', 'api', 'ivr', 'cli', 'og', 'seo', 'gfm'].includes(lower)) {
        return w.toUpperCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

function parseSlug(slug: string | undefined): {
  title: string;
  theme: 'sms' | 'whatsapp';
  pill: string;
} {
  if (!slug || slug === 'default') {
    return { title: 'StartMessaging', theme: 'sms', pill: 'SMS & WhatsApp Platform' };
  }

  const parts = slug.split('/');
  const country = parts[0];
  const isBlog = parts[1] === 'blog';
  const isCountryPath = COUNTRY_SLUGS.has(country);

  // Handle India/root blog posts (no country prefix: blog/[slug])
  if (country === 'blog' && parts.length > 1) {
    const rawSlug = parts.slice(1).join('/');
    const title = formatTitle(rawSlug);
    const theme = rawSlug.toLowerCase().includes('whatsapp') ? 'whatsapp' : 'sms';
    const pill = theme === 'whatsapp' ? 'WhatsApp Business API' : 'SMS & OTP API';
    return { title, theme, pill };
  }

  // Handle blog posts with country prefix: /[country]/blog/[slug]
  if (isBlog && isCountryPath) {
    const rawSlug = parts.slice(2).join('/');
    const title = formatTitle(rawSlug);
    const theme = WA_COUNTRIES.has(country) ? 'whatsapp' : 'sms';
    const pill = theme === 'whatsapp' ? 'WhatsApp Business API' : 'SMS & OTP API';
    return { title, theme, pill };
  }

  // Handle country-specific marketing pages: /[country]/[page]
  if (isCountryPath && !isBlog) {
    const pagePath = parts.slice(1).join('/');
    const title = formatTitle(pagePath);
    const theme = WA_COUNTRIES.has(country) ? 'whatsapp' : 'sms';
    const pill = theme === 'whatsapp' ? 'WhatsApp Business API' : 'SMS & WhatsApp Platform';
    return { title, theme, pill };
  }

  // Handle India marketing pages (no country prefix): /limits, /use-cases/otp
  const title = formatTitle(slug);
  const theme = slug.toLowerCase().includes('whatsapp') ? 'whatsapp' : 'sms';
  const pill = theme === 'whatsapp' ? 'WhatsApp Business API' : 'SMS & WhatsApp Platform';
  
  return { title, theme, pill };
}


export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug as string | undefined;
  const { title, theme, pill } = parseSlug(slug);

  const displayTitle = title.length > 80 ? title.substring(0, 77) + '...' : title;

  // Theme tokens
  const bg = theme === 'whatsapp' ? '#f0fdf9' : '#f7f7ff';
  const primary = theme === 'whatsapp' ? '#003d3a' : '#27187e';
  const accent = theme === 'whatsapp' ? '#2dd4bf' : '#818cf8';
  const pillBg = theme === 'whatsapp' ? '#ccfbf1' : '#ede9fe';
  const pillText = theme === 'whatsapp' ? '#0f766e' : '#5b21b6';

  // Blob colors
  const blob1 = theme === 'whatsapp' ? '#99f6e4' : '#c4b5fd';
  const blob2 = theme === 'whatsapp' ? '#2dd4bf' : '#818cf8';

  const fontSize = displayTitle.length > 50 ? 48 : 60;

  const html = {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 90px',
        background: bg,
        fontFamily: 'Inter',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Blob 1 — top right
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '-120px',
              right: '-80px',
              width: '520px',
              height: '520px',
              borderRadius: '50%',
              background: blob1,
              opacity: 0.35,
            },
          },
        },
        // Blob 2 — bottom right
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '-100px',
              right: '80px',
              width: '340px',
              height: '340px',
              borderRadius: '50%',
              background: blob2,
              opacity: 0.2,
            },
          },
        },
        // Dot grid — decorative
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '40px',
              right: '40px',
              width: '200px',
              height: '200px',
              backgroundImage: `radial-gradient(circle, ${primary}22 1.5px, transparent 1.5px)`,
              backgroundSize: '20px 20px',
              opacity: 0.5,
            },
          },
        },
        // Content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative',
            },
            children: [
              // Category pill
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: pillBg,
                    border: `1px solid ${accent}`,
                    borderRadius: '100px',
                    padding: '6px 16px',
                    alignSelf: 'flex-start',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: accent,
                        },
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '14px',
                          fontWeight: 600,
                          color: pillText,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        },
                        children: pill,
                      },
                    },
                  ],
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: `${fontSize}px`,
                    fontWeight: 700,
                    color: primary,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    maxWidth: '720px',
                  },
                  children: displayTitle,
                },
              },
              // Accent bar
              {
                type: 'div',
                props: {
                  style: {
                    width: '60px',
                    height: '4px',
                    background: accent,
                    borderRadius: '2px',
                  },
                },
              },
            ],
          },
        },
        // Bottom bar
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  },
                  children: [
                    {
                      type: 'svg',
                      props: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        width: '32',
                        height: '32',
                        viewBox: '0 0 32 32',
                        fill: 'none',
                        children: [
                          {
                            type: 'defs',
                            props: {
                              children: [
                                {
                                  type: 'linearGradient',
                                  props: {
                                    id: 'sms-grad',
                                    x1: '0%',
                                    y1: '0%',
                                    x2: '100%',
                                    y2: '100%',
                                    children: [
                                      { type: 'stop', props: { offset: '0%', 'stop-color': theme === 'whatsapp' ? '#003d3a' : '#27187e' } },
                                      { type: 'stop', props: { offset: '100%', 'stop-color': theme === 'whatsapp' ? '#2dd4bf' : '#818cf8' } },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            type: 'rect',
                            props: {
                              width: '32',
                              height: '32',
                              rx: '8',
                              fill: theme === 'whatsapp' ? '#f0fdf9' : '#f7f7ff',
                            },
                          },
                          {
                            type: 'path',
                            props: {
                              d: 'M18 13a2 2 0 0 1-2 2H10l-4 4V8c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z',
                              fill: 'none',
                              stroke: 'url(#sms-grad)',
                              'stroke-width': '2.5',
                              'stroke-linecap': 'round',
                              'stroke-linejoin': 'round',
                            },
                          },
                          {
                            type: 'path',
                            props: {
                              d: 'M22 13h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1',
                              fill: 'none',
                              stroke: 'url(#sms-grad)',
                              'stroke-width': '2.5',
                              'stroke-linecap': 'round',
                              'stroke-linejoin': 'round',
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '24px',
                          fontWeight: 700,
                          color: primary,
                        },
                        children: 'StartMessaging',
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '16px',
                    fontWeight: 400,
                    color: primary,
                    opacity: 0.4,
                  },
                  children: 'startmessaging.com',
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: regularFont,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: boldFont,
        weight: 700,
        style: 'normal',
      },
    ],
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
