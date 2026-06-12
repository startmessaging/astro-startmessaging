/**
 * RSS feed: /feed.xml
 * Per ASTRO_COUNTRY_PLAN.md §9.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');
  const siteUrl = site?.href ?? 'https://startmessaging.com';

  const sortedPosts = posts
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .slice(0, 50);

  const items = sortedPosts.map((post) => {
    const [country, ...slugParts] = post.id.split('/');
    const slug = slugParts.join('/');
    const url = country === 'in'
      ? `${siteUrl}blog/${slug}`
      : `${siteUrl}${country}/blog/${slug}`;

    return `    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
      <author>${post.data.author ?? 'StartMessaging Team'}</author>
      <category>${post.data.category}</category>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>StartMessaging Blog</title>
    <description>Guides, tips, and updates on WhatsApp Business API, SMS OTP, and messaging.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
