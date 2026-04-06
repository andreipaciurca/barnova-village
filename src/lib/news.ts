import Parser from 'rss-parser';
import { cache } from 'react';
import { getServerService } from '@/lib/supabase/services.server';

export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source: 'supabase' | 'rss' | 'mock';
};

const parser = new Parser();
const RSS_FEED_URL = 'https://primariabarnova.ro/feed/';

export const getNewsFeed = cache(async function (): Promise<NewsItem[]> {
  try {
    // 1. Preluăm postările din Supabase (prioritate maximă)
    const service = await getServerService();
    const supabasePosts = await service.getAllPosts();
    const publishedSupabase = supabasePosts
      .filter(p => p.status === 'published')
      .map(p => ({
        title: p.title,
        link: `/posts/${p.slug || p.id}`,
        pubDate: p.published_at || p.created_at,
        contentSnippet: (p.excerpt || p.content?.substring(0, 150) || '') + '...',
        source: 'supabase' as const
      }));

    if (publishedSupabase.length >= 6) {
      return publishedSupabase.slice(0, 6);
    }

    // 2. Preluăm din RSS feed (fallback secundar)
    try {
      const feed = await parser.parseURL(RSS_FEED_URL);
      const rssItems = feed.items.map(item => ({
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        contentSnippet: item.contentSnippet?.substring(0, 150) + '...',
        source: 'rss' as const
      }));

      // Combinăm și eliminăm duplicatele (bazat pe titlu)
      const combined = [...publishedSupabase];
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
