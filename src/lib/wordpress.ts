import { getServerService } from '@/lib/supabase/services.server'

const WP_URL = 'https://primariabarnova.ro/wp-json/wp/v2';

export interface Post {
  id: string | number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    date: new Date().toISOString(),
    title: { rendered: 'Bine ați venit pe noul site al Comunei Bârnova' },
    content: { rendered: 'Aceasta este o platformă modernizată pentru anul 2026.' },
    excerpt: { rendered: 'Descoperiți noile funcționalități și designul modernizat al comunei noastre.' },
    slug: 'welcome-to-barnova',
  },
  {
    id: 2,
    date: new Date().toISOString(),
    title: { rendered: 'Evenimente Culturale în Weekend' },
    content: { rendered: 'Vă invităm la festivalul de tradiții locale din acest weekend.' },
    excerpt: { rendered: 'Festivalul de tradiții locale aduce împreună comunitatea noastră.' },
    slug: 'cultural-events',
  },
  {
    id: 3,
    date: new Date().toISOString(),
    title: { rendered: 'Modernizare Infrastructură Rutieră' },
    content: { rendered: 'Lucrările de asfaltare continuă pe străzile principale.' },
    excerpt: { rendered: 'Proiectul de modernizare a infrastructurii rutiere avansează conform planului.' },
    slug: 'road-infrastructure',
  },
];

export async function getPosts(): Promise<Post[]> {
  try {
    // Încearcă să preia din Supabase prima dată folosind noul serviciu (DI)
    const service = await getServerService()
    const supabasePosts = await service.getAllPosts()
    const publishedPosts = supabasePosts.filter(p => p.status === 'published')

    if (publishedPosts.length > 0) {
      return publishedPosts.slice(0, 6).map(p => ({
        id: p.id,
        date: p.published_at || p.created_at,
        title: { rendered: p.title },
        content: { rendered: p.content },
        excerpt: { rendered: p.excerpt || '' },
        slug: p.slug
      }))
    }
    // ... restul fallback-ului rămâne la fel

    // Fallback la WordPress dacă nu sunt postări în Supabase
    const res = await fetch(`${WP_URL}/posts?_embed&per_page=6`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return MOCK_POSTS;
    }

    return res.json();
  } catch (error) {
    return MOCK_POSTS;
  }
}
