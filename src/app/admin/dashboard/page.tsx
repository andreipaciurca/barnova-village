import { getServerService } from '@/lib/supabase/services.server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Activity,
  ArrowUpRight,
  Database,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Pencil,
  PlusCircle,
  Settings,
  Shield,
  Sparkles,
  Users as UsersIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DynamicGreeting } from '@/components/ui/DynamicGreeting'
import { HealthMetrics } from '@/components/ui/HealthMetrics'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'
import { translations } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getTimeLabel() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'day'
  return 'evening'
}

export default async function AdminDashboard() {
  const t = translations.ro.admin.dashboard
  const navT = t.sidebar

  const service = await getServerService()
  const user = await service.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const posts = await service.getAllPosts()

  const publishedCount = posts.filter((post) => post.status === 'published').length
  const draftCount = posts.filter((post) => post.status === 'draft').length
  const archivedCount = posts.filter((post) => post.status === 'archived').length
  const recentPosts = posts.slice(0, 5)
  const timeLabel = getTimeLabel()

  const quickStats = [
    {
      label: t.stats.active_posts,
      value: posts.length,
      hint: `${publishedCount} publicate`,
      icon: FileText,
      accent: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Drafturi',
      value: draftCount,
      hint: 'În lucru',
      icon: Pencil,
      accent: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Arhivate',
      value: archivedCount,
      hint: 'Istoric',
      icon: Shield,
      accent: 'from-slate-500 to-slate-700',
    },
  ]

  const navigation = [
    { href: '/admin/dashboard', label: navT.dashboard, icon: LayoutDashboard, active: true },
    { href: '/admin/posts', label: navT.posts, icon: FileText },
    { href: '/admin/users', label: navT.users, icon: UsersIcon },
    { href: '/admin/settings', label: navT.settings, icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(15,76,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(212,160,23,0.10),transparent_24%)] text-foreground">
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
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all',
                  item.active
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-6">
            <div className="rounded-[1.5rem] border border-border/60 bg-muted/30 p-4">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Conectat ca
              </div>
              <p className="truncate text-sm font-bold">{user.email}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                {navT.admin_tag}
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
                  {navT.logout}
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
                  {timeLabel === 'morning' ? 'Warm start' : timeLabel === 'day' ? 'Working session' : 'Evening review'}
                </div>
                <DynamicGreeting />
                <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  {t.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="h-14 rounded-full border-border/60 bg-background/70 px-6 font-black"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    {t.view_site}
                  </Button>
                </Link>
                <Link href="/admin/posts/new">
                  <Button className="h-14 rounded-full px-7 font-black shadow-xl shadow-primary/20">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t.new_post}
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            {quickStats.map((item) => (
              <Card
                key={item.label}
                className="overflow-hidden rounded-[2rem] border border-border/60 bg-background/80 p-5 shadow-[0_18px_60px_-40px_rgba(15,76,129,0.45)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-3 text-4xl font-black tracking-tight">{item.value}</div>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">{item.hint}</p>
                  </div>
                  <div className={cn('rounded-2xl p-3 text-white shadow-lg', `bg-gradient-to-br ${item.accent}`)}>
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            ))}
          </section>

          <section className="mb-8">
            <HealthMetrics />
          </section>

          <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 shadow-[0_24px_80px_-50px_rgba(15,76,129,0.45)]">
              <div className="flex items-center justify-between border-b border-border/50 px-6 py-5 md:px-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
                    Content Stream
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">{t.recent_posts.title}</h2>
                </div>
                <Link href="/admin/posts" className="inline-flex">
                  <Button variant="outline" className="rounded-full border-border/60 bg-background/70 px-5 font-black">
                    {t.recent_posts.view_all}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="divide-y divide-border/50">
                {recentPosts.length === 0 ? (
                  <div className="px-6 py-16 text-center text-muted-foreground">
                    {t.recent_posts.empty}
                  </div>
                ) : (
                  recentPosts.map((post) => (
                    <div key={post.id} className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-lg font-black tracking-tight">{post.title}</h3>
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
                        <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                          {post.excerpt || 'Fără descriere'}
                        </p>
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                          {formatDate(post.created_at)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {post.status === 'published' && post.slug ? (
                          <Link href={`/posts/${post.slug}`} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="outline"
                              className="h-11 rounded-full border-border/60 bg-background/70 px-5 font-black"
                            >
                              Preview
                            </Button>
                          </Link>
                        ) : null}
                        <Link href={`/admin/posts/edit/${post.id}`}>
                          <Button className="h-11 rounded-full px-5 font-black shadow-lg shadow-primary/15">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <div className="space-y-8">
              <Card className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 p-6 shadow-[0_24px_80px_-50px_rgba(15,76,129,0.45)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
                      Monitoring
                    </p>
                    <h2 className="text-xl font-black tracking-tight">Logs & live status</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-border/50 bg-muted/25 px-4 py-4 transition-all hover:-translate-y-0.5 hover:bg-muted/45"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-950 p-3 text-white">
                        <Database className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-black">Vercel Logs</p>
                        <p className="text-xs text-muted-foreground">Deploys, functions, edge runtime</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-border/50 bg-muted/25 px-4 py-4 transition-all hover:-translate-y-0.5 hover:bg-muted/45"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-emerald-500 p-3 text-white">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-black">Supabase Logs</p>
                        <p className="text-xs text-muted-foreground">Database, auth, RLS activity</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </Card>

              <Card className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 shadow-[0_24px_80px_-50px_rgba(15,76,129,0.45)]">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground">
                  Live action
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight">Endpoint sănătate</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Verifică rapid statusul infrastructurii și deschide vizualizarea JSON într-un tab separat.
                </p>
                <div className="mt-6">
                  <Link href="/api/health" target="_blank">
                    <Button className="h-12 rounded-full px-6 font-black shadow-xl shadow-primary/15">
                      Vezi Status JSON
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
