const WP_URL = 'https://primariabarnova.ro/wp-json/wp/v2';

export interface Post {
  id: number;
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
    const res = await fetch(`${WP_URL}/posts?_embed&per_page=6`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.warn('WordPress API failed, falling back to mock data');
      return MOCK_POSTS;
    }

    return res.json();
  } catch (error) {
    console.warn('WordPress API error, falling back to mock data:', error);
    return MOCK_POSTS;
  }
}
