import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getPublicSupabaseClient } from '@/lib/supabase/public'
import { Button } from '@/components/ui/Button'

export const revalidate = 3600

type PostRecord = {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  created_at: string
  published_at: string | null
}

async function getPost(slug: string) {
  const client = getPublicSupabaseClient()

  if (!client) {
    return null
  }

  const { data } = await client
    .from('posts')
    .select('id, title, slug, content, excerpt, created_at, published_at')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  return data as PostRecord | null
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(15,76,129,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(212,160,23,0.10),transparent_24%)]" />
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex">
            <Button variant="outline" className="rounded-full border-border/60 bg-background/70 backdrop-blur">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi la site
            </Button>
          </Link>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
            Articol intern
          </span>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-border/50 bg-card/95 shadow-[0_30px_100px_-40px_rgba(15,76,129,0.4)]">
          <div className="border-b border-border/50 p-6 md:p-10">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.published_at || post.created_at).toLocaleDateString('ro-RO', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-balance">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="rounded-[1.5rem] border border-border/50 bg-background p-6 text-base leading-8 text-foreground/90 whitespace-pre-wrap">
              {post.content || post.excerpt || 'Nu există conținut disponibil pentru acest articol.'}
            </div>
            <aside className="rounded-[1.5rem] border border-border/50 bg-muted/30 p-6">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground mb-4">
                Acces rapid
              </div>
              <div className="space-y-3 text-sm leading-7 text-muted-foreground">
                <p>Acest articol face parte din conținutul intern publicat în portal.</p>
                <Link href="/" className="inline-flex text-primary font-black">
                  Citește și alte anunțuri
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  )
}
