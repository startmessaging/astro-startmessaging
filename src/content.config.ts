import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const LocalizedString = z.union([z.string(), z.record(z.string())]);

/** A single renderable component config — intentionally loose props */
const componentConfig = z.object({
  type:    z.string(),
  locales: z.array(z.string()).optional(),
  props:   z.record(z.unknown()),
});

/** Marketing pages — JSON manifests that drive the component renderer */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    locales: z.array(z.string()).optional(),
    seo: z.object({
      title:       LocalizedString,
      description: LocalizedString,
      ogImage:     z.string().optional(),
      jsonLd:      z.record(z.unknown()).optional(),
    }),
    sections: z.array(componentConfig),
  }),
});

/** Blog posts — MDX files organised by language folder */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt:   z.coerce.date().optional(),
    author:      z.string().optional(),
    tags:        z.array(z.string()).optional(),
    ogImage:     z.string().optional(),
    lang:        z.string().default('en'),
  }),
});

export const collections = { pages, blog };
