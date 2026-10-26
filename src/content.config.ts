import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Keep the file path (case preserved) as the id, so Jekyll-style slugs survive.
const pathId = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '');

// Jekyll accepts "a b", "a, b" or a YAML list for categories/tags.
const wordList = z
  .union([z.string(), z.array(z.string())])
  .nullish()
  .transform((v) => {
    if (!v) return [];
    const items = Array.isArray(v) ? v : [v];
    return items.flatMap((s) => s.split(/[\s,]+/)).filter(Boolean);
  });

const stringList = z
  .union([z.string(), z.array(z.string())])
  .nullish()
  .transform((v) => (!v ? [] : Array.isArray(v) ? v : [v]));

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    summary: z.string().nullish(),
    date: z.coerce.date(),
    update_date: z.coerce.date().nullish(),
    minutes: z.number().nullish(),
    categories: wordList,
    tags: wordList,
    cover: z.string().nullish(),
    redirect_from: stringList,
    canonical_url: z.string().nullish(),
    keywords: z.string().nullish(),
    sitemap: z.boolean().nullish(),
    draft: z.boolean().default(false),
    toc: z.boolean().default(true),
    games: z
      .array(z.object({ title: z.string(), url: z.string(), image: z.string() }))
      .optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/portfolio', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    summary: z.string().nullish(),
    cover: z.string().nullish(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/categories', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    summary: z.string().nullish(),
    category: z.string(),
    redirect_from: stringList,
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/tags', generateId: pathId }),
  schema: z.object({
    title: z.string(),
    summary: z.string().nullish(),
    tag: z.string(),
  }),
});

export const collections = { posts, portfolio, categories, tags };
