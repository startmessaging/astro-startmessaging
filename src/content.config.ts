/**
 * Content collection schemas — country-routed model.
 * Per ASTRO_COUNTRY_PLAN.md §5.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const Localized = z.union([z.string(), z.record(z.string(), z.string())]);

/** A single renderable component config — intentionally loose props */
const section = z.object({
  type:      z.string(),
  countries: z.array(z.string()).optional(),
  theme:     z.enum(['sms', 'whatsapp']).optional(),
  props:     z.record(z.string(), z.unknown()),
});

/** Marketing pages — JSON manifests that drive the component renderer */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    countries: z.array(z.string()).optional(),
    theme:     z.enum(['sms', 'whatsapp']).optional(),
    seo: z.object({
      title:       Localized,
      description: Localized,
      ogImage:     z.string().optional(),
      jsonLd:      z.unknown().optional(),
    }),
    sections: z.array(section),
  }),
});

/** Blog posts — MDX files organised by country folder */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:          z.string(),
    description:    z.string(),
    publishedAt:    z.coerce.date(),
    updatedAt:      z.coerce.date().optional(),
    country:        z.string(),
    category:       z.enum(['tutorials', 'guides', 'comparisons', 'compliance', 'use-cases', 'business']),
    author:         z.string().default('StartMessaging Team'),
    keywords:       z.array(z.string()).default([]),
    tags:           z.array(z.string()).default([]),
    canonicalCountry: z.string().optional(),
    relatedSlugs:   z.array(z.string()).default([]),
    featured:       z.boolean().default(false),
    ogImage:        z.string().optional(),
  }),
});

/** Docs — MDX files organised by product folder */
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    product:     z.enum(['whatsapp', 'sms', 'auth-api']),
    order:       z.number().default(0),
    countries:   z.array(z.string()).optional(),
  }),
});

export const collections = { pages, blog, docs };
