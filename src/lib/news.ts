import Parser from 'rss-parser';
import { cache } from 'react';
import { getPublicSupabaseClient } from '@/lib/supabase/public';

export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
  slug?: string;
  source: 'supabase' | 'rss' | 'mock';
};

const parser = new Parser();
const RSS_FEED_URL = 'https://primariabarnova.ro/feed/';

type PublicPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  created_at: string;
  published_at: string | null;
};

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function makeSnippet(value: string | undefined, fallback = '') {
  const text = stripHtml(value || fallback);
  if (!text) {
    return '';
  }

  return `${text.slice(0, 150)}${text.length > 150 ? '…' : ''}`;
}

export const getNewsFeed = cache(async function (): Promise<NewsItem[]> {
  try {
    const client = getPublicSupabaseClient();
    const publishedSupabase: NewsItem[] = client
      ? await client
          .from('posts')
          .select('id, title, slug, excerpt, content, created_at, published_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false, nullsFirst: false })
          .order('created_at', { ascending: false })
          .limit(6)
          .then(({ data }) =>
            (data || []).map((post: PublicPostRow) => ({
              title: post.title || '',
              link: `/posts/${post.slug || post.id}`,
              pubDate: post.published_at || post.created_at || new Date().toISOString(),
              contentSnippet: makeSnippet(post.excerpt, post.content),
              content: post.content || post.excerpt || '',
              slug: post.slug || post.id,
              source: 'supabase' as const,
            }))
          )
      : [];

    if (publishedSupabase.length >= 6) {
      return publishedSupabase.slice(0, 6);
    }

    try {
      const feed = await parser.parseURL(RSS_FEED_URL);
      const rssItems: NewsItem[] = feed.items.map(item => ({
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        contentSnippet: makeSnippet(item.contentSnippet || item.content),
        content: item.contentSnippet || item.content || '',
        source: 'rss' as const
      }));

      const combined: NewsItem[] = [...publishedSupabase];
      rssItems.forEach(rss => {
        if (!combined.some(s => s.title === rss.title)) {
          combined.push(rss);
        }
      });

      return combined.slice(0, 6);
    } catch (rssError) {
      console.error('Error fetching RSS feed:', rssError);
      return publishedSupabase.slice(0, 6);
    }
  } catch (error) {
    console.error('Error in getNewsFeed:', error);
    return [];
  }
});
