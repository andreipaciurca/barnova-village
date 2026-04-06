'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save, Loader2, FileText } from 'lucide-react'
import { getBrowserService } from '@/lib/supabase/services.client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AdminShell } from '@/components/admin/AdminShell'
import { PostEditorPreview } from '@/components/admin/PostEditorPreview'
import { slugify } from '@/lib/content'

export const dynamic = 'force-dynamic'

type PostStatus = 'draft' | 'published' | 'archived'

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [status, setStatus] = useState<PostStatus>('draft')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const service = getBrowserService()

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setSlug((current) => (current === slugify(title) || current === '' ? slugify(value) : current))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const user = await service.getUser()

    if (!user) {
      alert('Trebuie să fii autentificat!')
      setLoading(false)
      return
    }

    const { error } = await service.upsertPost({
      title,
      slug: slug || slugify(title),
      content,
      excerpt,
      status,
      author_id: user.id,
      published_at: status === 'published' ? new Date().toISOString() : null,
    })

    if (error) {
      alert('Eroare: ' + error.message)
      setLoading(false)
    } else {
      router.push('/admin/posts')
      router.refresh()
    }
  }

  return (
    <AdminShell
      section="posts"
      title="Adaugă postare"
      subtitle="Construiește articole clare, moderne și pregătite pentru publicare cu o previzualizare live a rezultatului final."
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
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
                  Editorial block
                </p>
                <h3 className="text-xl font-black tracking-tight">Content settings</h3>
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-black uppercase tracking-widest text-muted-foreground">Titlu</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
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
                  Salvează
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
