/**
 * Atom feed: /atom.xml
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

  const updated = sortedPosts.length > 0
    ? sortedPosts[0].data.publishedAt.toISOString()
    : new Date().toISOString();

  const entries = sortedPosts.map((post) => {
    const [country, ...slugParts] = post.id.split('/');
    const slug = slugParts.join('/');
    const url = country === 'in'
      ? `${siteUrl}blog/${slug}`
      : `${siteUrl}${country}/blog/${slug}`;

    return `  <entry>
    <title><![CDATA[${post.data.title}]]></title>
    <link href="${url}" rel="alternate" type="text/html" />
    <id>${url}</id>
    <published>${post.data.publishedAt.toISOString()}</published>
    <updated>${(post.data.updatedAt ?? post.data.publishedAt).toISOString()}</updated>
    <summary><![CDATA[${post.data.description}]]></summary>
    <author><name>${post.data.author ?? 'StartMessaging Team'}</name></author>
    <category term="${post.data.category}" />
  </entry>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>StartMessaging Blog</title>
  <subtitle>Guides, tips, and updates on WhatsApp Business API, SMS OTP, and messaging.</subtitle>
  <link href="${siteUrl}" rel="alternate" type="text/html" />
  <link href="${siteUrl}atom.xml" rel="self" type="application/atom+xml" />
  <id>${siteUrl}</id>
  <updated>${updated}</updated>
  <author><name>StartMessaging Team</name></author>
${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
