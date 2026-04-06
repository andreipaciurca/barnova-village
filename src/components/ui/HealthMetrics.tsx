'use client'

import React, { useEffect, useState } from 'react'
import { translations } from '@/lib/i18n'
import { Activity, Database, Zap } from 'lucide-react'
import { Card } from './Card'

interface HealthData {
  status: string
  postsCount: number
  timestamp: string
  version: string
}

export function HealthMetrics() {
  const [data, setData] = useState<HealthData | null>(null)
  const t = translations.ro.admin.dashboard.stats

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((payload) => setData(payload as HealthData))
      .catch(console.error)
  }, [])

  const cards = [
    {
      label: t.active_posts,
      value: data?.postsCount ?? '...',
      accent: 'from-blue-500 to-cyan-500',
      icon: Zap,
      caption: 'Articole publicate',
    },
    {
      label: t.system_health,
      value: data?.status === 'UP' ? t.status_active : t.status_inactive || 'Deconectat',
      accent: 'from-emerald-500 to-teal-500',
      icon: Activity,
      caption: data?.version ? `v${data.version}` : 'Live',
    },
    {
      label: t.visitors,
      value: '342',
      accent: 'from-amber-500 to-orange-500',
      icon: Database,
      caption: 'Trafic estimat',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="overflow-hidden rounded-[2rem] border border-border/60 bg-background/80 p-5 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
                {card.label}
              </div>
              <div className="mt-3 text-3xl font-black tracking-tight">{card.value}</div>
              <p className="mt-2 text-sm text-muted-foreground">{card.caption}</p>
            </div>
            <div className={`rounded-2xl bg-gradient-to-br ${card.accent} p-3 text-white shadow-lg`}>
              <card.icon className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
