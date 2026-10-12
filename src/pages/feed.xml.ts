import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { render } from 'astro:content';
import mdxRenderer from '@astrojs/mdx/server.js';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '../lib/posts';
import { postUrl } from '../lib/urls';
import { site } from '../site.config';

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).slice(0, 10);
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: mdxRenderer });

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.url,
    items: await Promise.all(
      posts.map(async (post) => {
        const { Content } = await render(post);
        return {
          title: post.data.title,
          link: postUrl(post),
          pubDate: post.data.date,
          description: post.data.summary,
          content: await container.renderToString(Content),
          enclosure: undefined,
        };
      }),
    ),
  });
}
