'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Calendar, ChevronRight, ExternalLink, X } from 'lucide-react'
import { Button } from './Button'
import { Card, CardContent, CardFooter, CardHeader } from './Card'
import { cn } from '@/lib/utils'
import type { NewsItem } from '@/lib/news'
import { stripHtml, truncateText } from '@/lib/content'

interface NewsFeedProps {
  items: NewsItem[]
  readMoreLabel: string
  officialLabel: string
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function NewsFeed({ items, readMoreLabel, officialLabel }: NewsFeedProps) {
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, idx) => {
          const isInternal = item.source === 'supabase'

          return (
            <motion.div
              key={item.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.08 }}
              className="group"
            >
              <Card className="h-full overflow-hidden rounded-[2.25rem] border border-border/40 bg-card/90 shadow-[0_20px_60px_-30px_rgba(15,76,129,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_-28px_rgba(15,76,129,0.45)]">
                <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
                  <div className="space-y-2">
                    <span className={cn(
                      'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.22em]',
                      isInternal ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-600'
                    )}>
                      {isInternal ? 'Intern' : officialLabel}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.pubDate)}
                    </div>
                  </div>

                  {isInternal ? (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs font-black transition-transform hover:scale-[1.02]"
                    >
                      Citește
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs font-black transition-transform hover:scale-[1.02]"
                    >
                      Deschide
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight text-balance group-hover:text-primary transition-colors">
                    {stripHtml(item.title)}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-4">
                    {truncateText(item.contentSnippet || item.content || '', 160) || 'Nu există rezumat disponibil.'}
                  </p>
                </CardContent>

                <CardFooter className="pt-4">
                  {isInternal ? (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-2 text-sm font-black text-primary"
                    >
                      {readMoreLabel}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-black text-primary"
                    >
                      {readMoreLabel}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-8"
          >
            <button
              type="button"
              aria-label="Închide previzualizarea"
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-[0_40px_120px_-32px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-border/50 p-6 md:p-8">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                    Intern
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black tracking-tight text-balance">{stripHtml(selectedItem.title)}</h2>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedItem.pubDate)}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-border/60 bg-background/60"
                  onClick={() => setSelectedItem(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="space-y-6">
                <div className="rounded-[1.5rem] border border-border/50 bg-muted/30 p-6 text-sm leading-7 text-foreground/90 whitespace-pre-wrap">
                    {stripHtml(selectedItem.content || selectedItem.contentSnippet || 'Conținutul complet va fi disponibil aici.')}
                  </div>
                  <div className="flex flex-wrap gap-3">
                  <Link href={selectedItem.slug ? `/posts/${selectedItem.slug}` : selectedItem.link} className="inline-flex">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-black text-primary-foreground transition-transform hover:scale-[1.02]">
                        Deschide pagina
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(null)}
                      className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background px-6 py-3 text-sm font-black"
                    >
                      Închide
                    </button>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-border/50 bg-card p-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground mb-3">
                    Rezumat
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {stripHtml(selectedItem.contentSnippet || selectedItem.content || '') || 'Nu există rezumat disponibil.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
