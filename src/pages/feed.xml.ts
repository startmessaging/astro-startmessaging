/**
 * RSS feed: /feed.xml
 * Per ASTRO_COUNTRY_PLAN.md §9.
 * Refactored to use @astrojs/rss for cleaner code.
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  
  // Sort by date (newest first) and take top 50
  const sortedPosts = posts
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .slice(0, 50);

  return rss({
    title: 'StartMessaging Blog',
    description: 'Guides, tips, and updates on WhatsApp Business API, SMS OTP, and messaging.',
    site: context.site ?? 'https://startmessaging.com',
    
    items: sortedPosts.map((post) => {
      // Extract country and slug from post.id (e.g., "in/my-post.mdx")
      const [country, ...slugParts] = post.id.split('/');
      const slug = slugParts.join('/');
      
      // Build correct URL based on country
      const link = country === 'in'
        ? `/blog/${slug}`
        : `/${country}/blog/${slug}`;

      return {
        title: post.data.title,
        description: post.data.description,
        link,
        pubDate: post.data.publishedAt,
        author: post.data.author ?? 'StartMessaging Team',
        categories: [post.data.category],
      };
    }),

    customData: '<language>en</language>',
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
  });
}
