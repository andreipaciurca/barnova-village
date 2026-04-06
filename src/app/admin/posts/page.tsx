'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getBrowserService } from '@/lib/supabase/services.client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  FileText, 
  PlusCircle,
  Pencil,
  Trash2,
  Calendar,
  ChevronLeft,
  Search,
  Filter,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminPosts() {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const router = useRouter()
  const service = getBrowserService()

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

  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      const s = await service.getAllPosts()
      setPosts(s)
      setLoading(false)
    }
    loadPosts()
  }, [service])

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-border/50 bg-background/50">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">Postări & Știri</h1>
              <p className="text-muted-foreground font-semibold">Gestionează tot conținutul publicat pe site.</p>
            </div>
          </div>
          <Link href="/admin/posts/new">
            <Button className="rounded-2xl font-black gap-2 h-14 px-8 shadow-xl shadow-primary/20">
              <PlusCircle className="w-5 h-5" />
              Adaugă Postare
            </Button>
          </Link>
        </header>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Caută postări..." 
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-background border-none shadow-sm focus:ring-2 focus:ring-primary/50 font-semibold"
            />
          </div>
          <Button variant="outline" className="rounded-2xl h-14 px-6 gap-2 border-border/50 bg-background">
            <Filter className="w-5 h-5" />
            Filtrează
          </Button>
        </div>

        <Card className="rounded-[3rem] border-none shadow-2xl shadow-primary/5 overflow-hidden bg-background">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b border-border/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Titlu</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Slug</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dată</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-muted/20 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="font-bold text-lg group-hover:text-primary transition-colors">{post.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">{post.excerpt || 'Fără descriere'}</div>
                      </td>
                      <td className="px-10 py-6">
                        <code className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">/{post.slug}</code>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block",
                          post.status === 'published' ? "bg-emerald-500/10 text-emerald-600" : 
                          post.status === 'draft' ? "bg-amber-500/10 text-amber-600" : 
                          "bg-slate-500/10 text-slate-600"
                        )}>
                          {post.status === 'published' ? 'Publicat' : 
                           post.status === 'draft' ? 'Draft' : 'Arhivat'}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString('ro-RO')}
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/posts/edit/${post.id}`}>
                            <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all">
                              <Pencil className="w-5 h-5" />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="w-12 h-12 rounded-xl border-border/50 text-destructive hover:bg-destructive/10 hover:border-destructive/20 transition-all"
                            onClick={() => handleDelete(post.id)}
                            disabled={isDeleting === post.id}
                          >
                            {isDeleting === post.id ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-muted-foreground">
                        <FileText className="w-12 h-12 opacity-20" />
                        <p className="font-bold">Nu există postări încă.</p>
                        <Link href="/admin/posts/new">
                          <Button variant="outline" className="rounded-xl font-bold">Creează prima postare</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
