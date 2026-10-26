## Getting Started

This is my personal blog where I talk about programming and business mainly and probably others sometimes.

Homepage: https://whyboobo.com/

To stay updated, subscribe to the [RSS feed](https://whyboobo.com/feed.xml) or use the :eyes:Watch button on GitHub.

For any comments regarding posts or others, please feel free to reach me via the social links in the site footer, [email](mailto:militaru.bogdanalexandru@gmail.com), [DM on :bird: Twitter](https://twitter.com/militaru_bogdan) or by [Discussion Section on Github](https://github.com/boobo94/boobo94.github.io/discussions).

## Development

The site is built with [Astro](https://astro.build) and [Yarn 4](https://yarnpkg.com) (via Corepack). Node 22.12+ is required.

```sh
corepack enable
yarn install
yarn dev       # http://localhost:4321 (search needs a build first)
yarn build     # astro build + Pagefind search index into dist/
yarn preview   # serve dist/
```

Pushing to `master` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Where things live

| Path                                           | What                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| `src/content/posts/YYYY/MM/YYYY-MM-DD-slug.md` | Blog posts. URL is `/<categories>/<slug>/`                          |
| `src/content/posts/drafts/`                    | Drafts (`draft: true`), shown only in `yarn dev`                    |
| `src/content/portfolio/`                       | Portfolio items, served at `/portfolio/<file-name>/`                |
| `src/content/categories/`, `src/content/tags/` | Titles and summaries for category and tag pages                     |
| `src/site.config.ts`                           | Site title, socials, share buttons, text strings, GA4 id            |
| `src/styles/`                                  | SCSS (Pixyll-based theme)                                           |
| `public/`                                      | Static files copied as-is (images, favicons, `CNAME`, `robots.txt`) |

## Post attributes

```yaml
title: Draft Template
summary: Summary Draft Template
categories: category # space-separated; each one becomes a URL segment
tags: tag1 tag2 # space-separated or a YAML list
date: 2021-01-01 09:09:09 +0000
update_date: 2021-02-01 # optional
cover: https://example.com/img.png
minutes: 5 # optional, overrides the computed reading time
redirect_from: # old URLs that should redirect here
  - /old1-route
  - /old2-route
canonical_url: https://example.com # a page whose canonical points elsewhere is left out of the sitemap
keywords: one, two
sitemap: false # optional, leave the page out of the sitemap
toc: false # table of contents is true by default (needs 3+ h2/h3 headings); set false to hide it
draft: true # not built in production
```

External links open in a new tab automatically, so there's no need for `{:target="_blank"}`.
Use `.mdx` when a post needs components (see `2026-04-22-retro-games.mdx`).
