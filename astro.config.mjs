import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import icon from 'astro-icon';
import rehypeExternalLinks from 'rehype-external-links';
import { readFileSync } from 'node:fs';

const site = 'https://whyboobo.com';

// Lazy-load images inside posts (covers are rendered by the layout, not here).
function rehypeLazyImages() {
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      node.properties.loading ??= 'lazy';
      node.properties.decoding ??= 'async';
    }
    node.children?.forEach(walk);
  };
  return walk;
}
const outDir = new URL('./dist/', import.meta.url);

// Like jekyll-sitemap: leave out redirect stubs (noindex) and pages whose
// canonical points elsewhere (the old `sitemap: false` posts).
function inSitemap(page) {
  const path = page.slice(site.length).replace(/^\//, '');
  let html;
  try {
    html = readFileSync(new URL(`${path}index.html`, outDir), 'utf8');
  } catch {
    return true;
  }
  if (/<meta name="robots" content="noindex"/.test(html)) return false;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  return !canonical || canonical === page;
}

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: {
    // The contact page was folded into the footer social links.
    '/contact': '/about/',
  },
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }], rehypeLazyImages],
    }),
    shikiConfig: {
      theme: 'github-dark',
      // Fence names used in old posts that Shiki doesn't know as-is.
      langAlias: { Bash: 'bash', Dockerfile: 'dockerfile', 'C++': 'cpp', conf: 'nginx', curl: 'bash', env: 'dotenv' },
    },
  },
  integrations: [
    mdx(),
    icon(),
    sitemap({ filter: inSitemap }),
  ],
});
