import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/wordpress';
import { getNewsFeed } from '@/lib/news';

export async function GET() {
  try {
    const [posts, news] = await Promise.all([
      getPosts(),
      getNewsFeed()
    ]);

    return NextResponse.json({
      internal_posts: posts,
      external_news: news,
      total_count: posts.length + news.length
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
