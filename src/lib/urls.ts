import type { CollectionEntry } from 'astro:content';

// Jekyll's slugify (default mode): lowercase, non-alphanumerics to "-".
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Jekyll permalink "/:categories/:title/" where :title is the filename without the date prefix.
export function postSlug(post: CollectionEntry<'posts'>): string {
  const file = post.id.split('/').pop()!;
  return file.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function postPath(post: CollectionEntry<'posts'>): string {
  return [...post.data.categories, postSlug(post)].join('/');
}

export const postUrl = (post: CollectionEntry<'posts'>) => `/${postPath(post)}/`;
export const categoryUrl = (category: string) => `/${category}/`;
export const tagUrl = (tag: string) => `/tags/${slugify(tag)}/`;
export const portfolioUrl = (item: CollectionEntry<'portfolio'>) => `/portfolio/${item.id}/`;

// Turn a redirect_from value into a route path without surrounding slashes.
export const normalizePath = (p: string) => p.replace(/^\/+|\/+$/g, '').replace(/\/index\.html$/, '');
