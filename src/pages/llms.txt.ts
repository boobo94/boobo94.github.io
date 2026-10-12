// /llms.txt — a Markdown index of the site for LLMs (https://llmstxt.org).
import { getCollection } from 'astro:content';
import { getPublishedPosts } from '../lib/posts';
import { portfolioUrl, postUrl } from '../lib/urls';
import { site } from '../site.config';

const abs = (path: string) => new URL(path, site.url).href;
const link = (title: string, path: string, note?: string | null) =>
  `- [${title}](${abs(path)})${note ? `: ${note.replace(/\s+/g, ' ').trim()}` : ''}`;

export async function GET() {
  // Posts whose canonical lives on another site are left out, as in the sitemap.
  const posts = (await getPublishedPosts()).filter((p) => !p.data.canonical_url);
  const categories = (await getCollection('categories')).sort((a, b) =>
    a.data.category.localeCompare(b.data.category),
  );
  const portfolio = (await getCollection('portfolio')).sort((a, b) => a.id.localeCompare(b.id));

  // Each post is listed once, under its first category.
  const byCategory = new Map<string, typeof posts>();
  for (const post of posts) {
    const key = post.data.categories[0] ?? '';
    byCategory.set(key, [...(byCategory.get(key) ?? []), post]);
  }
  const titles = new Map(categories.map((c) => [c.data.category, c.data.title]));
  const order = [
    ...categories.map((c) => c.data.category),
    ...[...byCategory.keys()].filter((k) => k && !titles.has(k)).sort(),
    '', // posts without a category go last
  ];

  const lines = [
    `# ${site.title}`,
    '',
    `> Personal blog of ${site.author}, a software engineer and startup founder, writing about programming, DevOps, startups, tools and tutorials.`,
    '',
    `Posts are plain HTML pages. The latest posts are also available as an RSS feed with full content.`,
    '',
    '## About',
    '',
    link('About me', '/about/', 'Background, current projects and portfolio'),
    link('Portfolio', '/portfolio/', 'Products and client projects'),
    '',
  ];

  for (const category of order) {
    const list = byCategory.get(category);
    if (!list?.length) continue;
    lines.push(`## ${category ? (titles.get(category) ?? category) : 'Other'}`, '');
    for (const post of list) lines.push(link(post.data.title, postUrl(post), post.data.summary));
    lines.push('');
  }

  lines.push('## Optional', '');
  for (const item of portfolio) lines.push(link(item.data.title, portfolioUrl(item), item.data.summary));
  lines.push(link('RSS feed', '/feed.xml', 'The 10 most recent posts'), link('Sitemap', '/sitemap-index.xml'), '');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
