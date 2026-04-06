'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { getBrowserService } from '@/lib/supabase/services.client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ChevronLeft, Save, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [status, setStatus] = useState('draft')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const service = getBrowserService()

  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    async function fetchPost() {
      if (!id) {
        console.warn('ID-ul postării lipsește din parametri.')
        return
      }
      
      console.log('Preluare postare cu ID:', id)
      try {
        const data = await service.getPostById(id)
        console.log('Date postare primite:', data)

        if (!data) {
          setError('Postarea nu a fost găsită în baza de date. (ID: ' + id + ')')
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val))
    }
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const user = await service.getUser()
    if (!user) {
      alert('Trebuie să fii autentificat pentru a salva!')
      setLoading(false)
      return
    }

    // Prepare data
    const now = new Date().toISOString()
    const updateData: any = {
      id: id,
      title,
      slug,
      content,
      excerpt,
      status,
      updated_at: now,
      author_id: post?.author_id || user.id, // Ensure author_id is preserved or set
    }

    // Set published_at if moving to published and it wasn't already set
    if (status === 'published' && !post.published_at) {
      updateData.published_at = now
    } else if (status === 'published' && post.published_at) {
      updateData.published_at = post.published_at
    } else if (status !== 'published') {
      updateData.published_at = null
    }

    const { error } = await service.upsertPost(updateData)

    if (error) {
      console.error('Eroare la salvare:', error)
      alert('Eroare la salvare: ' + error.message)
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
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="font-bold text-muted-foreground">Se încarcă postarea...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/10 p-6">
        <Card className="max-w-md w-full p-10 text-center rounded-[3rem] shadow-2xl border-none">
          <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black mb-4">Eroare de acces</h2>
          <p className="text-muted-foreground font-semibold mb-8">{error}</p>
          <Link href="/admin/posts">
            <Button className="w-full rounded-2xl h-14 font-black">Înapoi la Postări</Button>
          </Link>
        </Card>
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
