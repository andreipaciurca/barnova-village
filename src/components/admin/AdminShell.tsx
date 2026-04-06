'use client'

import type { ComponentType, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users as UsersIcon,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

type AdminSection = 'dashboard' | 'posts' | 'users' | 'settings'

interface AdminShellProps {
  title: string
  subtitle: string
  section: AdminSection
  userEmail?: string
  children: ReactNode
  actions?: ReactNode
}

const NAV_ITEMS: Array<{
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
  section: AdminSection
}> = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'dashboard' },
  { href: '/admin/posts', label: 'Postări', icon: FileText, section: 'posts' },
  { href: '/admin/users', label: 'Utilizatori', icon: UsersIcon, section: 'users' },
  { href: '/admin/settings', label: 'Setări', icon: Settings, section: 'settings' },
]

export function AdminShell({ title, subtitle, section, userEmail, children, actions }: AdminShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(15,76,129,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(212,160,23,0.08),transparent_24%)] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-[18rem] shrink-0 border-r border-border/60 bg-background/70 p-6 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="mb-8 rounded-[1.75rem] border border-border/60 bg-card/80 p-5 shadow-[0_24px_80px_-50px_rgba(15,76,129,0.45)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-foreground shadow-lg shadow-primary/20">
                B
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Admin Studio</p>
                <h1 className="text-xl font-black tracking-tight">Bârnova Village</h1>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = item.section === section || pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all',
                    active
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto space-y-4 pt-6">
            <div className="rounded-[1.5rem] border border-border/60 bg-muted/30 p-4">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Conectat ca
              </div>
              <p className="truncate text-sm font-bold">{userEmail || 'admin@barnova.ro'}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Administrator
              </p>
            </div>

            <div className="flex items-center justify-between">
              <ThemeToggle />
              <form action="/auth/signout" method="post">
                <Button
                  variant="outline"
                  className="rounded-full border-border/60 bg-background/70 px-4 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Ieșire
                </Button>
              </form>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">
          <header className="mb-8 overflow-hidden rounded-[2rem] border border-border/60 bg-background/75 p-6 shadow-[0_24px_80px_-55px_rgba(15,76,129,0.45)] backdrop-blur-xl md:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Admin workspace
                </div>
                <h2 className="text-4xl font-black tracking-tight md:text-5xl">{title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  {subtitle}
                </p>
              </div>

              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          </header>

          {children}
        </main>
      </div>
    </div>
  )
}
