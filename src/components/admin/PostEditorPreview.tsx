'use client'

import { ArrowUpRight, Calendar, Eye, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { stripHtml, truncateText } from '@/lib/content'
import { cn } from '@/lib/utils'

interface PostEditorPreviewProps {
  title: string
  slug: string
  content: string
  excerpt: string
  status: 'draft' | 'published' | 'archived'
}

export function PostEditorPreview({ title, slug, content, excerpt, status }: PostEditorPreviewProps) {
  const teaser = truncateText(excerpt || content, 180)

  return (
    <Card className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 shadow-[0_24px_80px_-50px_rgba(15,76,129,0.45)]">
      <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
              Preview
            </p>
            <h3 className="text-lg font-black tracking-tight">Public appearance</h3>
          </div>
        </div>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]',
            status === 'published'
              ? 'bg-emerald-500/10 text-emerald-600'
              : status === 'draft'
                ? 'bg-amber-500/10 text-amber-600'
                : 'bg-slate-500/10 text-slate-600'
          )}
        >
          {status === 'published' ? 'Publicat' : status === 'draft' ? 'Draft' : 'Arhivat'}
        </span>
      </div>

      <div className="space-y-6 p-6">
        <div className="rounded-[1.5rem] border border-dashed border-border/60 bg-muted/20 p-5">
          <div className="mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {new Date().toLocaleDateString('ro-RO', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
          <h4 className="text-2xl font-black tracking-tight text-balance">
            {stripHtml(title) || 'Titlul postării va apărea aici'}
          </h4>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            {teaser || 'Un rezumat scurt va ajuta cititorii să înțeleagă articolul înainte de deschidere.'}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
              /posts/{slug || 'slug'}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
              Intern preview
            </span>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border/60 bg-background p-5">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Body snapshot
          </div>
          <p className="line-clamp-6 text-sm leading-7 text-muted-foreground">
            {stripHtml(content) || 'Conținutul articolului va fi redat aici după publicare.'}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5">
          <div className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
            Reader behavior
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Articolele interne se deschid într-un viewer modern, iar URL-ul public rămâne disponibil la
            publicare.
          </p>
          <Link
            href={slug ? `/posts/${slug}` : '#'}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-black text-background transition-transform hover:scale-[1.02]"
          >
            Open reader
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  )
}
