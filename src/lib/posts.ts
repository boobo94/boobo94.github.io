import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Strip markdown/HTML down to plain words.
function plainText(md = ''): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function readingTime(post: Post): number {
  if (post.data.minutes) return post.data.minutes;
  const words = plainText(post.body).split(' ').filter(Boolean).length;
  return Math.max(1, Math.floor(words / 180));
}

export function excerpt(post: Post, words = 28): string {
  if (post.data.summary) return post.data.summary;
  const all = plainText(post.body).split(' ');
  return all.slice(0, words).join(' ') + (all.length > words ? '...' : '');
}

// Rank by shared tags, then fill with the most recent posts.
export function relatedPosts(post: Post, all: Post[], limit = 10): Post[] {
  const tags = new Set(post.data.tags);
  const others = all.filter((p) => p.id !== post.id);
  const scored = others
    .map((p) => ({ p, score: p.data.tags.filter((t) => tags.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf())
    .map((x) => x.p);
  const picked = new Set(scored.slice(0, limit));
  for (const p of others) {
    if (picked.size >= limit) break;
    picked.add(p);
  }
  return [...picked];
}

export const formatDate = (d: Date) => d.toISOString().slice(0, 10);
