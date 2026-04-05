'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getBrowserService } from '@/lib/supabase/services.client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ChevronLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [status, setStatus] = useState('draft')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const router = useRouter()
  const service = getBrowserService()

  useEffect(() => {
    async function fetchPost() {
      const data = await service.getPostById(params.id)

      if (!data) {
        alert('Eroare la preluarea postării')
        router.push('/admin/posts')
      } else {
        setTitle(data.title)
        setSlug(data.slug)
        setContent(data.content)
        setExcerpt(data.excerpt)
        setStatus(data.status)
      }
      setFetching(false)
    }

    fetchPost()
  }, [params.id, router, service])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await service.upsertPost({
      id: params.id,
      title,
      slug,
      content,
      excerpt,
      status,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      alert('Eroare: ' + error.message)
      setLoading(false)
    } else {
      router.push('/admin/posts')
      router.refresh()
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Link href="/admin/posts">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-border/50 bg-background/50">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-4xl font-black tracking-tight">Editează Postarea</h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 rounded-[2.5rem] border-none shadow-2xl shadow-primary/5 bg-background space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Titlu</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-xl"
                  placeholder="Titlul postării..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Slug (URL)</label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-mono text-sm">/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm"
                    placeholder="slug-postare"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Conținut (Markdown/HTML)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all font-medium min-h-[400px] resize-none"
                  placeholder="Scrie aici conținutul postării..."
                  required
                />
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="p-8 rounded-[2.5rem] border-none shadow-2xl shadow-primary/5 bg-background space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all font-bold appearance-none"
                >
                  <option value="draft">Draft (Privat)</option>
                  <option value="published">Publicat (Live)</option>
                  <option value="archived">Arhivat</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Rezumat (Excerpt)</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all font-medium h-32 resize-none text-sm"
                  placeholder="Un scurt rezumat pentru card-ul de pe prima pagină..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-16 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-primary/20"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Actualizează
                    <Save className="w-6 h-6" />
                  </>
                )}
              </Button>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
