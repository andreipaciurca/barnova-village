'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowUpRight,
  Calendar,
  Filter,
  Loader2,
  Pencil,
  PlusCircle,
  Search,
  Trash2,
  FileText,
  Sparkles,
} from 'lucide-react'
import { getBrowserService } from '@/lib/supabase/services.client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AdminShell } from '@/components/admin/AdminShell'
import { cn } from '@/lib/utils'

type AdminPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  status: 'draft' | 'published' | 'archived'
  created_at: string
  published_at: string | null
}

export const dynamic = 'force-dynamic'

export default function AdminPosts() {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [posts, setPosts] = useState<AdminPost[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const service = getBrowserService()

  useEffect(() => {
    async function loadPosts() {
      const s = (await service.getAllPosts()) as AdminPost[]
      setPosts(s)
      setLoading(false)
    }

    loadPosts()
  }, [service])

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return posts
    }

    return posts.filter((post) =>
      [post.title, post.slug, post.excerpt, post.content]
        .filter(Boolean)
        .some((field) => field?.toLowerCase().includes(normalized))
    )
  }, [posts, query])

  const handleDelete = async (id: string) => {
    if (!confirm('Ești sigur că vrei să ștergi această postare?')) return

    setIsDeleting(id)
    try {
      const { error } = await service.deletePost(id)
      if (error) {
        alert('Eroare la ștergere: ' + error.message)
      } else {
        router.refresh()
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('Eroare neașteptată la ștergere.')
    } finally {
      setIsDeleting(null)
    }
  }

  const total = posts.length
  const published = posts.filter((post) => post.status === 'published').length
  const drafts = posts.filter((post) => post.status === 'draft').length

  return (
    <AdminShell
      section="posts"
      title="Postări & știri"
      subtitle="Gestionează articolele din portal, vezi ce e public, ce e draft și deschide instant un preview pentru postările live."
      actions={
        <>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="h-14 rounded-full border-border/60 bg-background/70 px-6 font-black">
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/posts/new">
            <Button className="h-14 rounded-full px-7 font-black shadow-xl shadow-primary/20">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adaugă postare
            </Button>
          </Link>
        </>
      }
    >
      <section className="mb-8 grid gap-4 md:grid-cols-3">
        {[
          { label: 'Total postări', value: total, icon: FileText, tone: 'from-blue-500 to-cyan-500' },
          { label: 'Publicate', value: published, icon: Sparkles, tone: 'from-emerald-500 to-teal-500' },
          { label: 'Drafturi', value: drafts, icon: Pencil, tone: 'from-amber-500 to-orange-500' },
        ].map((item) => (
          <Card
            key={item.label}
            className="overflow-hidden rounded-[2rem] border border-border/60 bg-background/80 p-5 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">{item.label}</div>
                <div className="mt-3 text-4xl font-black tracking-tight">{item.value}</div>
              </div>
              <div className={cn('rounded-2xl bg-gradient-to-br p-3 text-white shadow-lg', item.tone)}>
                <item.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută după titlu, slug sau conținut"
            className="w-full rounded-full border border-border/60 bg-background/80 py-4 pl-14 pr-5 text-sm font-medium shadow-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/70 focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(15,76,129,0.08)]"
          />
        </div>
        <Button variant="outline" className="h-14 rounded-full border-border/60 bg-background/70 px-6 font-black">
          <Filter className="mr-2 h-4 w-4" />
          Filtrează
        </Button>
      </section>

      {loading ? (
        <Card className="rounded-[2rem] border border-border/60 bg-background/80 p-10 text-center shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)]">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 font-semibold text-muted-foreground">Se încarcă postările...</p>
        </Card>
      ) : filteredPosts.length === 0 ? (
        <Card className="rounded-[2rem] border border-border/60 bg-background/80 p-12 text-center shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)]">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-2xl font-black">Nu există postări încă</h3>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Creează prima postare pentru a începe fluxul editorial din portal.
          </p>
          <Link href="/admin/posts/new" className="mt-6 inline-flex">
            <Button className="rounded-full px-6 font-black">
              <PlusCircle className="mr-2 h-4 w-4" />
              Creează postare
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden rounded-[2rem] border border-border/60 bg-background/85 p-6 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_80px_-30px_rgba(15,76,129,0.45)]"
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]',
                          post.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : post.status === 'draft'
                              ? 'bg-amber-500/10 text-amber-600'
                              : 'bg-slate-500/10 text-slate-600'
                        )}
                      >
                        {post.status === 'published' ? 'Publicat' : post.status === 'draft' ? 'Draft' : 'Arhivat'}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">
                      {post.excerpt || post.content || 'Fără descriere'}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Slug</div>
                    <div className="mt-1 truncate font-mono text-sm">/{post.slug}</div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">Dată</div>
                    <div className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(post.created_at).toLocaleDateString('ro-RO')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <Button className="rounded-full px-5 font-black shadow-lg shadow-primary/15">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  {post.status === 'published' ? (
                    <Link href={`/posts/${post.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="rounded-full border-border/60 bg-background/70 px-5 font-black">
                        Preview
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : null}
                  <Button
                    variant="outline"
                    className="rounded-full border-border/60 px-5 font-black text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(post.id)}
                    disabled={isDeleting === post.id}
                  >
                    {isDeleting === post.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Șterge
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
