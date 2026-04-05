import Parser from 'rss-parser';

export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
};

const parser = new Parser();
const RSS_FEED_URL = 'https://primariabarnova.ro/feed/';

export async function getNewsFeed(): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(RSS_FEED_URL);
    return feed.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      contentSnippet: item.contentSnippet?.substring(0, 150) + '...',
    })).slice(0, 6); // Limit to 6 items
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}
