'use client'

import { useEffect, use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, ChevronLeft, Loader2, Save } from 'lucide-react'
import { getBrowserService } from '@/lib/supabase/services.client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AdminShell } from '@/components/admin/AdminShell'
import { PostEditorPreview } from '@/components/admin/PostEditorPreview'
import { slugify } from '@/lib/content'

type PostStatus = 'draft' | 'published' | 'archived'

type PostRecord = {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  status: PostStatus
  author_id: string
  published_at: string | null
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [status, setStatus] = useState<PostStatus>('draft')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [post, setPost] = useState<PostRecord | null>(null)
  const router = useRouter()
  const service = getBrowserService()

  useEffect(() => {
    async function fetchPost() {
      if (!id) return

      try {
        const data = (await service.getPostById(id)) as PostRecord | null

        if (!data) {
          setError(`Postarea nu a fost găsită în baza de date. (ID: ${id})`)
        } else {
          setPost(data)
          setTitle(data.title || '')
          setSlug(data.slug || '')
          setContent(data.content || '')
          setExcerpt(data.excerpt || '')
          setStatus(data.status || 'draft')
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Eroare la preluarea postării. Verifică conexiunea la baza de date.')
      } finally {
        setFetching(false)
      }
    }

    fetchPost()
  }, [id, service])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const user = await service.getUser()
    if (!user) {
      alert('Trebuie să fii autentificat pentru a salva!')
      setLoading(false)
      return
    }

    const now = new Date().toISOString()
    const updateData = {
      id,
      title,
      slug: slug || slugify(title),
      content,
      excerpt,
      status,
      updated_at: now,
      author_id: post?.author_id || user.id,
      published_at:
        status === 'published'
          ? post?.published_at || now
          : null,
    }

    const { error: saveError } = await service.upsertPost(updateData)

    if (saveError) {
      alert('Eroare la salvare: ' + saveError.message)
      setLoading(false)
    } else {
      router.push('/admin/posts')
      router.refresh()
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/10">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="font-bold text-muted-foreground">Se încarcă postarea...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <AdminShell
        section="posts"
        title="Eroare de acces"
        subtitle="Nu am putut încărca articolul pentru editare."
        actions={
          <Link href="/admin/posts">
            <Button variant="outline" className="h-14 rounded-full border-border/60 bg-background/70 px-6 font-black">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Înapoi
            </Button>
          </Link>
        }
      >
        <Card className="mx-auto max-w-xl rounded-[2rem] border border-border/60 bg-background/80 p-8 text-center shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)]">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-black tracking-tight">Articol indisponibil</h3>
          <p className="mt-3 text-muted-foreground">{error}</p>
        </Card>
      </AdminShell>
    )
  }

  return (
    <AdminShell
      section="posts"
      title="Editează postarea"
      subtitle="Actualizează textul, statusul și metadatele articolului, cu o previzualizare live a rezultatului final."
      actions={
        <Link href="/admin/posts">
          <Button variant="outline" className="h-14 rounded-full border-border/60 bg-background/70 px-6 font-black">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Înapoi
          </Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="space-y-8">
          <Card className="space-y-6 rounded-[2.25rem] border border-border/60 bg-background/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)] md:p-8">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">Titlu</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-border/60 bg-muted/30 px-6 py-4 text-xl font-bold outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
                placeholder="Titlul postării..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-2xl border border-border/60 bg-muted/30 px-6 py-4 font-mono text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
                placeholder="slug-postare"
                required
              />
              <p className="ml-1 text-xs text-muted-foreground">
                URL final: <span className="font-mono text-foreground">/posts/{slug || 'slug-postare'}</span>
              </p>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Conținut
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[420px] w-full rounded-[1.75rem] border border-border/60 bg-muted/30 px-6 py-4 text-sm leading-7 outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
                placeholder="Scrie aici conținutul postării..."
                required
              />
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="space-y-6 rounded-[2.25rem] border border-border/60 bg-background/80 p-6 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)] md:p-8">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="w-full rounded-2xl border border-border/60 bg-muted/30 px-6 py-4 font-bold outline-none transition-all focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
              >
                <option value="draft">Draft</option>
                <option value="published">Publicat</option>
                <option value="archived">Arhivat</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Rezumat
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="h-32 w-full rounded-[1.5rem] border border-border/60 bg-muted/30 px-6 py-4 text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
                placeholder="Un scurt rezumat pentru cardul de pe prima pagină..."
              />
            </div>

            <Button
              type="submit"
              className="h-16 w-full rounded-2xl text-lg font-black shadow-xl shadow-primary/20"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  Actualizează
                  <Save className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </Card>

          <PostEditorPreview
            title={title}
            slug={slug || slugify(title)}
            content={content}
            excerpt={excerpt}
            status={status}
          />
        </div>
      </form>
    </AdminShell>
  )
}
